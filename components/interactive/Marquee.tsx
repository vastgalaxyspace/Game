"use client";

import React, { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scrollState";

type MarqueeProps = {
  children: React.ReactNode;
  /** -1 = leftwards (default), 1 = rightwards */
  direction?: -1 | 1;
  /** Base speed in px per frame at 60fps. */
  speed?: number;
  className?: string;
};

/**
 * Infinite marquee whose speed reacts to scroll velocity (nudot-style).
 * The single child "set" is duplicated enough times to cover the viewport,
 * then translated each frame; scrolling fast makes it whoosh.
 */
export function Marquee({
  children,
  direction = -1,
  speed = 1,
  className = "",
}: MarqueeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const firstSet = setRef.current;
    if (!outer || !inner || !firstSet) return;

    let setWidth = 0;
    let x = 0;
    let rafId = 0;
    let running = false;

    const rebuild = () => {
      // Remove clones (keep the first, React-owned set).
      Array.from(inner.children)
        .slice(1)
        .forEach((c) => c.remove());
      setWidth = firstSet.scrollWidth;
      if (!setWidth) return;
      const need = Math.max(2, Math.ceil((outer.clientWidth + setWidth * 2) / setWidth));
      for (let i = 1; i < need; i++) {
        inner.appendChild(firstSet.cloneNode(true));
      }
    };

    const tick = () => {
      rafId = 0;
      if (!running) return;
      const vel = scrollState.velocity * 0.25;
      x += (speed + Math.abs(vel)) * direction;
      if (setWidth > 0) {
        while (x <= -setWidth) x += setWidth;
        while (x >= setWidth) x -= setWidth;
      }
      inner.style.transform = `translate3d(${x}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
    };

    rebuild();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px 0px" }
    );
    io.observe(outer);

    const onResize = () => rebuild();
    window.addEventListener("resize", onResize, { passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(rebuild).catch(() => {});
    }

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      running = false;
    };
  }, [direction, speed]);

  return (
    <div ref={outerRef} className={`marquee ${className}`.trim()} aria-hidden="true">
      <div ref={innerRef} className="marquee__inner">
        <div ref={setRef} className="marquee__set">
          {children}
        </div>
      </div>
    </div>
  );
}
