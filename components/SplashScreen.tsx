"use client";

import { useEffect, useState, useCallback } from "react";
import { useProgress } from "@react-three/drei";
import { usePathname } from "next/navigation";

const SPLASH_FADE_DURATION_MS = 900;
const MIN_SPLASH_DURATION_MS = 2500; // Reduced from 5000ms to 2500ms

export function SplashScreen() {
  const pathname = usePathname();
  const { active, progress } = useProgress();
  const isHomePage = pathname === "/";

  const [showText, setShowText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [heroModelReady, setHeroModelReady] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Skip splash entirely on non-home pages
  const shouldSkip = !isHomePage;

  useEffect(() => {
    if (shouldSkip) {
      setIsRemoved(true);
      return;
    }

    const splashWindow = window as Window & { __muktaHeroModelReady?: boolean };

    if (splashWindow.__muktaHeroModelReady) {
      setHeroModelReady(true);
    }

    const handleHeroModelReady = () => setHeroModelReady(true);
    window.addEventListener("mukta:hero-model-ready", handleHeroModelReady);

    return () =>
      window.removeEventListener("mukta:hero-model-ready", handleHeroModelReady);
  }, [shouldSkip]);

  // Timed text reveals start from component mount (video autoplays immediately).
  useEffect(() => {
    if (shouldSkip) return;

    const t1 = setTimeout(() => setShowText(true), 1200);
    const t2 = setTimeout(() => setShowSubText(true), 2000);
    const t3 = setTimeout(() => setMinTimeElapsed(true), MIN_SPLASH_DURATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [shouldSkip]);

  // Fade out once minimum time + model loaded
  const startFadeOut = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    const timeout = setTimeout(() => {
      (window as Window & { __muktaSplashComplete?: boolean }).__muktaSplashComplete = true;
      window.dispatchEvent(new Event("mukta:splash-complete"));
      setIsRemoved(true);
    }, SPLASH_FADE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [isFading]);

  useEffect(() => {
    if (shouldSkip) return;

    const loadingReady = isHomePage
      ? heroModelReady
      : !active || progress === 100;

    if (!minTimeElapsed || !loadingReady || isFading) {
      return;
    }

    return startFadeOut();
  }, [
    minTimeElapsed,
    active,
    progress,
    heroModelReady,
    isFading,
    isHomePage,
    shouldSkip,
    startFadeOut,
  ]);

  // Fully remove from DOM after fade
  if (isRemoved) return null;

  return (
    <div
      className={`splash-screen ${isFading ? "splash-screen--fading" : ""}`}
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="splash-video"
      >
        <source src="/video/520.mp4" type="video/mp4" />
      </video>

      <div className="splash-text-overlay">
        <h1 className={`splash-mgd ${showText ? "splash-visible" : ""}`}>
          MGD
        </h1>
        <p className={`splash-fullname ${showSubText ? "splash-visible" : ""}`}>
          MUKTA GAME &amp; DEVELOPMENT
        </p>
      </div>
    </div>
  );
}
