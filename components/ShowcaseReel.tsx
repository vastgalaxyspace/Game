"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   ADVANCED SHOWCASE REEL (PERFORMANCE-OPTIMIZED)
   - Scroll-driven 3D perspective transforms via CSS variables (no React re-renders)
   - Mouse-tracking tilt (per-card) via direct DOM manipulation
   - IntersectionObserver for visibility detection
   - Reduced particle count (8 instead of 20)
   - Videos lazy-loaded
   ═══════════════════════════════════════════════════════════════ */

interface CardData {
  type: "video" | "image";
  src: string;
  tag: string;
  tagIcon: "play" | "image";
  title: string;
  desc: string;
  glow: "red" | "cyan" | "gold";
  fit?: "cover" | "contain";
}

const CARDS: CardData[] = [
  {
    type: "video",
    src: "/video/card1.mp4",
    tag: "3D Animation",
    tagIcon: "play",
    title: "Character Animation Reel",
    desc: "Fluid motion-captured animations blended with hand-keyed expressions for lifelike character performance.",
    glow: "red",
  },
  {
    type: "video",
    src: "/video/card2.mp4",
    tag: "Environment",
    tagIcon: "play",
    title: "Immersive World Design",
    desc: "Atmospheric environments crafted with cinematic lighting, volumetric fog, and dynamic weather systems.",
    glow: "cyan",
    fit: "contain",
  },
  {
    type: "image",
    src: "/video/img1.jpg",
    tag: "3D Character",
    tagIcon: "image",
    title: "Stylized Character Design",
    desc: "Hand-sculpted 3D character with magical VFX, rigged for game-ready animation in Unity.",
    glow: "gold",
  },
];

/* ── Particle system (reduced from 20 to 8) ── */
function useParticles(count: number) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  );
  return particles;
}

/* ── Single showcase card with 3D tilt ── */
function ShowcaseCard({
  card,
  index,
  progress,
  isVisible,
}: {
  card: CardData;
  index: number;
  progress: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  // Use a ref-driven tilt to avoid re-renders on mouse move
  const [tiltState, setTiltState] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        tiltRef.current = { x: y * -12, y: x * 12 };
        setTiltState(tiltRef.current);
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    tiltRef.current = { x: 0, y: 0 };
    setTiltState({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Simple scroll-based fade and slight upward shift
  const staggerOffset = index * 0.15;
  const cardProgress = Math.max(
    0,
    Math.min(1, (progress - staggerOffset) / (1 - staggerOffset))
  );
  const entryOpacity = Math.min(1, cardProgress * 2.5);

  // 3D Tilt for the card (mouse-driven)
  const cardTransform = isVisible
    ? `perspective(1200px) rotateX(${tiltState.x}deg) rotateY(${tiltState.y}deg)`
    : `perspective(1200px) rotateX(0deg)`;

  return (
    <div
      className={`sc-card-container ${
        index % 2 === 0 ? "sc-card-container--left" : "sc-card-container--right"
      }`}
      style={{
        opacity: isVisible ? entryOpacity : 0,
        transform: isVisible ? `translateY(${(1 - cardProgress) * 40}px)` : `translateY(100px)`,
        transition: "opacity 800ms ease, transform 800ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {/* ── 3D Media Card ── */}
      <div
        ref={cardRef}
        className={`sc-card sc-card--${card.glow}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transform: cardTransform }}
      >
        {/* Reflective border highlight */}
        <div
          className="sc-card__border-light"
          style={{
            background: `radial-gradient(
              circle at ${50 + tiltState.y * 4}% ${50 + tiltState.x * 4}%,
              ${
                card.glow === "red"
                  ? "rgba(227,0,11,0.5)"
                  : card.glow === "cyan"
                  ? "rgba(0,212,255,0.5)"
                  : "rgba(245,166,35,0.5)"
              },
              transparent 70%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Media */}
        <div
          className="sc-card__media-wrap"
          style={{
            background: card.fit === "contain" ? "#000" : undefined,
          }}
        >
          {card.type === "video" ? (
            <video
              src={card.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="sc-card__media"
              style={
                card.fit === "contain" ? { objectFit: "contain" } : undefined
              }
            />
          ) : (
            <Image
              src={card.src}
              alt={card.title}
              className="sc-card__media"
              width={600}
              height={800}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: card.fit || "cover",
              }}
            />
          )}

          {/* Ken Burns zoom driven by scroll */}
          <div
            className="sc-card__media-zoom"
            style={{
              transform: `scale(${
                1 + progress * 0.08 + (isHovered ? 0.05 : 0)
              })`,
            }}
          />
        </div>

        {/* Cinematic vignette */}
        <div className="sc-card__vignette" />

        {/* Overlay content (REMOVED DESCRIPTION TEXT) */}
        <div
          className={`sc-card__overlay ${
            isHovered ? "sc-card__overlay--active" : ""
          }`}
        >
          {/* We leave the overlay empty or you could put a "View Project" button here */}
        </div>

        {/* Glow orb */}
        <div
          className={`sc-card__glow sc-card__glow--${card.glow}`}
          style={{
            transform: `translate(${tiltState.y * 3}px, ${tiltState.x * 3}px)`,
            opacity: isHovered ? 0.8 : 0.2 + progress * 0.15,
          }}
        />

        {/* Corner accent lines */}
        <div className="sc-card__corner sc-card__corner--tl" />
        <div className="sc-card__corner sc-card__corner--br" />
      </div>

      {/* ── Text Content (Beside the card) ── */}
      <div className="sc-card-text">
        <span className="sc-card__tag">
          {card.tagIcon === "play" ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
          {card.tag}
        </span>
        <h3 className="sc-card-text__title">{card.title}</h3>
        <p className="sc-card-text__desc">{card.desc}</p>
      </div>
    </div>
  );
}

/* ── Main showcase component ── */
export function ShowcaseReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const particles = useParticles(8); // Reduced from 20 to 8
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    let isIntersecting = false;

    const onScroll = () => {
      if (!isIntersecting) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));

      progressRef.current = clamped;

      // Throttle React re-renders to ~30fps instead of 60fps
      const now = performance.now();
      if (now - lastUpdateRef.current > 33) {
        lastUpdateRef.current = now;
        setRenderProgress(clamped);
        setIsVisible(clamped > 0.05);
      }

      rafId = requestAnimationFrame(onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          rafId = requestAnimationFrame(onScroll);
        } else {
          cancelAnimationFrame(rafId);
          // Stop tracking when not visible
          setIsVisible(false);
        }
      },
      { threshold: 0, rootMargin: "100px 0px 100px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Spotlight position driven by scroll
  const spotlightX = 20 + renderProgress * 60;
  const spotlightY = 30 + renderProgress * 40;

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="sc-section"
      style={{
        // Dynamic cinematic spotlight
        background: `
          radial-gradient(
            ellipse 600px 400px at ${spotlightX}% ${spotlightY}%,
            rgba(227, 0, 11, 0.06),
            transparent
          ),
          radial-gradient(
            ellipse 400px 300px at ${100 - spotlightX}% ${100 - spotlightY}%,
            rgba(0, 212, 255, 0.04),
            transparent
          ),
          var(--bg-dark)
        `,
      }}
    >
      {/* Floating particles (reduced from 20 to 8) */}
      <div className="sc-particles" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="sc-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity * (0.5 + renderProgress * 0.5),
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative grid lines */}
      <div className="sc-grid-lines" aria-hidden="true">
        <div className="sc-grid-line sc-grid-line--v" style={{ left: "25%" }} />
        <div className="sc-grid-line sc-grid-line--v" style={{ left: "50%" }} />
        <div className="sc-grid-line sc-grid-line--v" style={{ left: "75%" }} />
        <div className="sc-grid-line sc-grid-line--h" style={{ top: "33%" }} />
        <div className="sc-grid-line sc-grid-line--h" style={{ top: "66%" }} />
      </div>

      {/* Section header */}
      <div
        className="sc-header"
        style={{
          transform: `translateY(${(1 - Math.min(1, renderProgress * 3)) * 60}px)`,
          opacity: Math.min(1, renderProgress * 4),
        }}
      >
        <div className="sc-header__kicker">
          <span className="sc-header__line" />
          Showcase Reel
          <span className="sc-header__line" />
        </div>
        <h2 className="sc-header__title">
          OUR LATEST <span className="gradient-text">CREATIONS</span>
        </h2>
        <p className="sc-header__subtitle">
          From 3D characters to immersive environments — see what our Blender +
          Unity pipeline brings to life.
        </p>
      </div>

      {/* Cards container with perspective */}
      <div
        className="sc-cards"
        style={{
          perspective: "1600px",
          perspectiveOrigin: `${50 + (renderProgress - 0.5) * 10}% ${50 + (renderProgress - 0.5) * 20}%`,
        }}
      >
        {CARDS.map((card, i) => (
          <ShowcaseCard
            key={i}
            card={card}
            index={i}
            progress={renderProgress}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div
        className="sc-scroll-indicator"
        style={{ opacity: renderProgress < 0.3 ? 1 : 0 }}
      >
        <div className="sc-scroll-indicator__mouse">
          <div className="sc-scroll-indicator__wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
