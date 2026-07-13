"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerScrollTo, scrollState } from "@/lib/scrollState";

/**
 * Site-wide Lenis smooth scrolling (desktop pointers only — touch devices
 * keep native scrolling). Publishes velocity/progress into scrollState for
 * the marquee and progress bar.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    if (prefersReducedMotion || isTouch) {
      // Still track native scroll for progress bar / marquee.
      const onScroll = () => {
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        scrollState.scroll = window.scrollY;
        scrollState.progress = window.scrollY / max;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenis.on("scroll", (e: { velocity: number; scroll: number; progress: number }) => {
      scrollState.velocity = e.velocity;
      scrollState.scroll = e.scroll;
      scrollState.progress = e.progress;
    });

    registerScrollTo((target) => lenis.scrollTo(target, { duration: 1.3 }));

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      registerScrollTo(null);
      lenis.destroy();
      scrollState.velocity = 0;
    };
  }, []);

  return null;
}
