"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scrollState";

/** Thin accent progress bar fixed to the top of the viewport (nudot-style). */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let current = 0;
    let last = -1;
    let rafId = 0;

    const tick = () => {
      current += (scrollState.progress - current) * 0.14;
      if (Math.abs(current - last) > 0.0004) {
        bar.style.transform = `scaleX(${current})`;
        last = current;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
