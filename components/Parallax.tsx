"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook that returns a scroll progress value (0–1) for an element
 * as it enters and exits the viewport.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // 0 when bottom edge enters viewport, 1 when top edge leaves
      const raw = (windowH - rect.top) / (windowH + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, progress };
}

/**
 * Hook that returns the raw window.scrollY value, throttled via rAF.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // parallax strength: 0 = none, positive = moves up slower
  fadeIn?: boolean;
  slideUp?: boolean;
  slideDistance?: number;
  delay?: number; // stagger delay in ms
  id?: string;
};

/**
 * A wrapper component that applies parallax translation, fade-in, and
 * slide-up effects based on scroll position.
 */
export function ParallaxSection({
  children,
  className,
  style,
  speed = 0,
  fadeIn = true,
  slideUp = true,
  slideDistance = 60,
  delay = 0,
  id,
}: ParallaxSectionProps) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Map progress to visual values
  const eased = easeOutCubic(progress);
  const opacity = fadeIn ? Math.min(1, eased * 2.5) : 1;
  const translateY = slideUp
    ? slideDistance * (1 - Math.min(1, eased * 2))
    : 0;
  const parallaxY = speed * (progress - 0.5) * -100;

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        ...style,
        transform: `translateY(${translateY + parallaxY}px)`,
        opacity,
        transition: `opacity 0.1s ease ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </section>
  );
}

type ParallaxChildProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Lightweight inline parallax for individual elements (headings, images, etc.)
 */
export function ParallaxLayer({
  children,
  className,
  style,
  speed = 0.15,
  as: Tag = "div",
}: ParallaxChildProps) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const y = speed * (progress - 0.5) * -120;

  return (
    // @ts-ignore – dynamic tag
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translateY(${y}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </Tag>
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
