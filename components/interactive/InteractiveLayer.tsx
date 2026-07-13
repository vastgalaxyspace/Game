"use client";

import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { PixelTrail } from "./PixelTrail";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Site-wide interaction layer (nudot-style): Lenis smooth scrolling,
 * custom labelled cursor, pixel mouse trail, and scroll progress bar.
 * Mounted once in the root layout.
 */
export function InteractiveLayer() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <PixelTrail />
      <CustomCursor />
    </>
  );
}
