"use client";

import { useEffect, useRef } from "react";

const GRID = 6; // px cell size
const MAX_BLOCKS = 48;
const FADE_MS = 900;

/**
 * Nudot-style pixel mouse trail: tiny grid-snapped squares that light up
 * along the pointer path and fade out. Uses a pooled set of divs + WAAPI —
 * no per-move allocations. Desktop only.
 */
export function PixelTrail() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const disable = window.matchMedia(
      "(max-width: 1024px), (hover: none), (pointer: coarse)"
    ).matches;
    if (disable) return;

    const host = hostRef.current;
    if (!host) return;

    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < MAX_BLOCKS; i++) {
      const el = document.createElement("div");
      el.className = "pixel-trail__block";
      host.appendChild(el);
      pool.push(el);
    }

    let poolIndex = 0;
    const active = new Set<string>();
    let prevX: number | null = null;
    let prevY: number | null = null;

    const draw = (x: number, y: number) => {
      const key = `${x},${y}`;
      if (active.has(key)) return;

      const el = pool[poolIndex];
      poolIndex = (poolIndex + 1) % MAX_BLOCKS;

      if (el.dataset.pos) active.delete(el.dataset.pos);
      el.dataset.pos = key;
      active.add(key);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      el.getAnimations().forEach((a) => a.cancel());
      const anim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: FADE_MS,
        fill: "forwards",
      });
      anim.onfinish = () => {
        active.delete(key);
        el.dataset.pos = "";
      };
    };

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      if (prevX !== null && prevY !== null) {
        const dx = cx - prevX;
        const dy = cy - prevY;
        const steps = Math.max(Math.abs(dx), Math.abs(dy)) / GRID;
        for (let i = 0; i <= steps; i++) {
          const t = steps > 0 ? i / steps : 0;
          const x = Math.floor((prevX + dx * t) / GRID) * GRID;
          const y = Math.floor((prevY + dy * t) / GRID) * GRID;
          draw(x, y);
        }
      }
      prevX = cx;
      prevY = cy;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      pool.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={hostRef} className="pixel-trail" aria-hidden="true" />;
}
