"use client";

import React, {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: React.ReactNode;
  /**
   * "line"  — child slides up out of an overflow-clipped wrapper (default)
   * "words" — string content is split into words, each masked + staggered
   * "fade"  — fade + drift up
   */
  variant?: "line" | "words" | "fade";
  /** Extra delay in seconds once visible. */
  delay?: number;
  /** Stagger between words in seconds (words variant). */
  stagger?: number;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
};

/**
 * Scroll-triggered masked reveal (nudot-style) built on IntersectionObserver
 * + CSS transitions. Fires once; content already in view on mount still
 * animates in on first paint.
 */
export function Reveal({
  children,
  variant = "line",
  delay = 0,
  stagger = 0.055,
  as = "div",
  className = "",
}: RevealProps) {
  // Cast keeps TS from expanding the full intrinsic-element union (which
  // collides with @react-three/fiber's augmented JSX namespace).
  const Tag = as as unknown as React.FC<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const state = visible ? "is-in" : "";

  if (variant === "words") {
    const words: React.ReactNode[] = [];
    let wordIndex = 0;

    Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => {
            words.push(
              <span className="rv-word" key={`w-${wordIndex}`}>
                <span
                  className="rv-word__inner"
                  style={{ transitionDelay: `${delay + wordIndex * stagger}s` }}
                >
                  {w}
                  {" "}
                </span>
              </span>
            );
            wordIndex++;
          });
      } else if (isValidElement(child)) {
        words.push(
          <span className="rv-word" key={`w-${wordIndex}`}>
            <span
              className="rv-word__inner"
              style={{ transitionDelay: `${delay + wordIndex * stagger}s` }}
            >
              {child}
            </span>
          </span>
        );
        wordIndex++;
      }
    });

    return (
      <Tag ref={ref} className={`rv rv--words ${state} ${className}`.trim()}>
        {words}
      </Tag>
    );
  }

  if (variant === "fade") {
    return (
      <Tag
        ref={ref}
        className={`rv rv--fade ${state} ${className}`.trim()}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`rv rv--line ${state} ${className}`.trim()}>
      <span className="rv-line__inner" style={{ transitionDelay: `${delay}s` }}>
        {children}
      </span>
    </Tag>
  );
}
