"use client";

import { useEffect, useRef } from "react";

/**
 * Nudot-style custom cursor: a small dot that sticks to the pointer plus a
 * trailing ring that expands into a labelled pill over interactive elements.
 * Labels come from `data-cursor` attributes (falls back to "EXPLORE" for
 * links/buttons). Desktop-only — disabled for touch/coarse pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const disable = window.matchMedia(
      "(max-width: 1024px), (hover: none), (pointer: coarse)"
    ).matches;
    if (disable) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;
    let lastWake = 0;
    let leaveTimer = 0;

    const wake = () => {
      lastWake = performance.now();
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    function loop() {
      rafId = 0;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot!.style.transform = `translate(${mx}px, ${my}px)`;
      ring!.style.transform = `translate(${rx}px, ${ry}px)`;

      const settled = Math.abs(rx - mx) < 0.1 && Math.abs(ry - my) < 0.1;
      if (!settled || performance.now() - lastWake < 260) {
        rafId = requestAnimationFrame(loop);
      }
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      wake();
    };

    const selector = "a, button, [data-cursor], .expertise-card, .sc-card";
    const getTarget = (node: EventTarget | null): HTMLElement | null =>
      node instanceof Element ? node.closest<HTMLElement>(selector) : null;

    const showLabel = (label: string) => {
      window.clearTimeout(leaveTimer);
      ring.setAttribute("data-cursor-label", label);
      dot.classList.add("is-link");
      ring.classList.add("is-link");
      wake();
    };

    const hideLabel = () => {
      ring.classList.remove("is-link");
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        dot.classList.remove("is-link");
        ring.setAttribute("data-cursor-label", "EXPLORE");
      }, 160);
      wake();
    };

    const onOver = (e: MouseEvent) => {
      const el = getTarget(e.target);
      if (!el) return;
      if (getTarget(e.relatedTarget) === el) return;
      showLabel(el.dataset.cursor || "EXPLORE");
    };

    const onOut = (e: MouseEvent) => {
      const el = getTarget(e.target);
      if (!el) return;
      if (getTarget(e.relatedTarget)) return;
      hideLabel();
    };

    const onLeaveDoc = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterDoc = () => {
      dot.style.opacity = "";
      ring.style.opacity = "";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
      cancelAnimationFrame(rafId);
      window.clearTimeout(leaveTimer);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        id="cursor-ring"
        data-cursor-label="EXPLORE"
        aria-hidden="true"
      />
    </>
  );
}
