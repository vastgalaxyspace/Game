/**
 * Shared mutable scroll state, written each frame by the Lenis provider
 * (SmoothScroll) and read by velocity-reactive components (Marquee).
 * ES-module singleton, same pattern as lib/heroSignals.ts.
 */
export const scrollState = {
  /** Lenis scroll velocity (px/frame-ish). 0 when idle or Lenis disabled. */
  velocity: 0,
  /** Current scroll position in px. */
  scroll: 0,
  /** 0..1 progress through the document. */
  progress: 0,
};

type ScrollToTarget = HTMLElement | string | number;

let scrollToImpl: ((target: ScrollToTarget) => void) | null = null;

/** Registered by SmoothScroll when Lenis is active. */
export function registerScrollTo(fn: ((target: ScrollToTarget) => void) | null) {
  scrollToImpl = fn;
}

/** Smooth-scroll to a target through Lenis when available, else natively. */
export function smoothScrollTo(target: ScrollToTarget) {
  if (scrollToImpl) {
    scrollToImpl(target);
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
