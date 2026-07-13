"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

function ShowcaseCard({
  card,
  index,
  isVisible,
}: {
  card: CardData;
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (card.type !== "video") return;

    const cardEl = cardRef.current;
    const videoEl = videoRef.current;
    if (!cardEl || !videoEl) return;

    const pauseVideo = () => {
      videoEl.pause();
    };

    const playVideo = () => {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(pauseVideo);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
          return;
        }

        pauseVideo();
      },
      { threshold: 0.2, rootMargin: "120px 0px 120px 0px" }
    );

    observer.observe(cardEl);
    pauseVideo();

    return () => {
      observer.disconnect();
      pauseVideo();
    };
  }, [card.type]);

  return (
    <div
      className={`sc-card-container ${
        index % 2 === 0 ? "sc-card-container--left" : "sc-card-container--right"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 420ms ease, transform 420ms ease",
      }}
    >
      <div
        ref={cardRef}
        className={`sc-card sc-card--${card.glow}`}
        data-cursor={card.type === "video" ? "PLAY" : "VIEW"}
      >
        <div
          className="sc-card__media-wrap"
          style={{
            background: card.fit === "contain" ? "#000" : undefined,
          }}
        >
          {card.type === "video" ? (
            <video
              ref={videoRef}
              src={card.src}
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
        </div>

        <div className="sc-card__vignette" />
        <div className="sc-card__overlay" />
      </div>

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
              className="mr-2 align-middle"
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
              className="mr-2 align-middle"
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

export function ShowcaseReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "120px 0px 120px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="sc-section">
      <div className="sc-header">
        <div className="sc-header__kicker">
          <span className="sc-header__line" />
          Showcase Reel
          <span className="sc-header__line" />
        </div>
        <h2 className="sc-header__title">
          OUR LATEST <span className="gradient-text">CREATIONS</span>
        </h2>
        <p className="sc-header__subtitle">
          From 3D characters to immersive environments - see what our Blender +
          Unity pipeline brings to life.
        </p>
      </div>

      <div className="sc-cards">
        {CARDS.map((card, i) => (
          <ShowcaseCard
            key={card.title}
            card={card}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
