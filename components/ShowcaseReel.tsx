"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   ADVANCED SHOWCASE REEL
   - Scroll-driven 3D perspective transforms
   - Mouse-tracking tilt (per-card)
   - Staggered reveal with spring physics
   - Ambient floating particles
   - Cinematic spotlight tracking scroll
   ═══════════════════════════════════════════════════════════════ */

interface CardData {
  type: "video" | "image";
  src: string;
  captionSrc?: string;
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
    captionSrc: "/video/card1.vtt",
    tag: "3D Animation",
    tagIcon: "play",
    title: "Character Animation Reel",
    desc: "Fluid motion-captured animations blended with hand-keyed expressions for lifelike character performance.",
    glow: "red",
  },
  {
    type: "video",
    src: "/video/card2.mp4",
    captionSrc: "/video/card2.vtt",
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

/* ── Particle system ── */
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

/* ── Single showcase card with 3D tilt + scroll transforms ── */
function ShowcaseCard({
  card,
  index,
  sectionProgress,
  isVisible,
}: {
  card: CardData;
  index: number;
  sectionProgress: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setTilt({ x: y * -12, y: x * 12 });
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  useEffect(() => {
    if (card.type !== "video" || !videoRef.current) {
      return;
    }

    if (isVisible) {
      videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
    }
  }, [card.type, isVisible]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Scroll-driven transforms per card
  const staggerOffset = index * 0.15;
  const cardProgress = Math.max(0, Math.min(1, (sectionProgress - staggerOffset) / (1 - staggerOffset)));
  
  // Entry animation values
  const entryScale = 0.7 + cardProgress * 0.3;
  const entryY = (1 - cardProgress) * 120;
  const entryRotateX = (1 - cardProgress) * 15;
  const entryOpacity = Math.min(1, cardProgress * 2.5);
  
  // Continuous scroll parallax (different rate per card)
  const scrollParallaxY = (sectionProgress - 0.5) * (30 + index * 20);
  const scrollParallaxX = (sectionProgress - 0.5) * (index === 1 ? 0 : index === 0 ? -15 : 15);
  
  // Rotation based on scroll
  const scrollRotateZ = (sectionProgress - 0.5) * (index === 0 ? -2 : index === 2 ? 2 : 0);

  const transform = isVisible
    ? `
        perspective(1200px)
        translateY(${entryY + scrollParallaxY}px)
        translateX(${scrollParallaxX}px)
        scale(${entryScale})
        rotateX(${entryRotateX + tilt.x}deg)
        rotateY(${tilt.y}deg)
        rotateZ(${scrollRotateZ}deg)
      `
    : `perspective(1200px) translateY(200px) scale(0.5) rotateX(30deg)`;

  return (
    <div
      ref={cardRef}
      className={`sc-card sc-card--${card.glow}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        opacity: isVisible ? entryOpacity : 0,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Reflective border highlight */}
      <div
        className="sc-card__border-light"
        style={{
          background: `radial-gradient(
            circle at ${50 + tilt.y * 4}% ${50 + tilt.x * 4}%,
            ${card.glow === "red" ? "rgba(227,0,11,0.5)" : card.glow === "cyan" ? "rgba(0,212,255,0.5)" : "rgba(245,166,35,0.5)"},
            transparent 70%
          )`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Media */}
      <div className="sc-card__media-wrap" style={{ background: card.fit === "contain" ? "#000" : undefined }}>
        {card.type === "video" ? (
          <video
            ref={videoRef}
            src={isVisible ? card.src : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className="sc-card__media"
            style={card.fit === "contain" ? { objectFit: "contain" } : undefined}
          >
            {card.captionSrc && (
              <track kind="captions" src={card.captionSrc} srcLang="en" label="English" />
            )}
          </video>
        ) : (
          <Image
            src={card.src}
            alt={card.title}
            className="sc-card__media"
            width={600}
            height={800}
            style={{ width: "100%", height: "100%", objectFit: card.fit || "cover" }}
          />
        )}
        
        {/* Ken Burns zoom driven by scroll */}
        <div
          className="sc-card__media-zoom"
          style={{
            transform: `scale(${1 + sectionProgress * 0.08 + (isHovered ? 0.05 : 0)})`,
          }}
        />
      </div>

      {/* Cinematic vignette */}
      <div className="sc-card__vignette" />

      {/* Overlay content */}
      <div className={`sc-card__overlay ${isHovered ? "sc-card__overlay--active" : ""}`}>
        <span className="sc-card__tag">
          {card.tagIcon === "play" ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
          {card.tag}
        </span>
        <h3 className="sc-card__title">{card.title}</h3>
        <p className="sc-card__desc">{card.desc}</p>
      </div>

      {/* Glow orb */}
      <div
        className={`sc-card__glow sc-card__glow--${card.glow}`}
        style={{
          transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
          opacity: isHovered ? 0.8 : 0.2 + sectionProgress * 0.15,
        }}
      />

      {/* Corner accent lines */}
      <div className="sc-card__corner sc-card__corner--tl" />
      <div className="sc-card__corner sc-card__corner--br" />
    </div>
  );
}

/* ── Main showcase component ── */
export function ShowcaseReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const particles = useParticles(20);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let isIntersecting = false;
    let rafId = 0;

    const updateProgress = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
      setIsVisible(clamped > 0.05);
      rafId = 0;
    };

    const scheduleUpdate = () => {
      if (!isIntersecting || rafId) return;
      rafId = requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          scheduleUpdate();
          window.addEventListener("scroll", scheduleUpdate, { passive: true });
          window.addEventListener("resize", scheduleUpdate);
          return;
        }

        setIsVisible(false);
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
        cancelAnimationFrame(rafId);
        rafId = 0;
      },
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Spotlight position driven by scroll
  const spotlightX = 20 + progress * 60;
  const spotlightY = 30 + progress * 40;

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
      {/* Floating particles */}
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
              opacity: p.opacity * (0.5 + progress * 0.5),
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
          transform: `translateY(${(1 - Math.min(1, progress * 3)) * 60}px)`,
          opacity: Math.min(1, progress * 4),
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
          From 3D characters to immersive environments — see what our Blender + Unity pipeline brings to life.
        </p>
      </div>

      {/* Cards container with perspective */}
      <div
        className="sc-cards"
        style={{
          perspective: "1600px",
          perspectiveOrigin: `${50 + (progress - 0.5) * 10}% ${50 + (progress - 0.5) * 20}%`,
        }}
      >
        {CARDS.map((card, i) => (
          <ShowcaseCard
            key={i}
            card={card}
            index={i}
            sectionProgress={progress}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="sc-scroll-indicator" style={{ opacity: progress < 0.3 ? 1 : 0 }}>
        <div className="sc-scroll-indicator__mouse">
          <div className="sc-scroll-indicator__wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
