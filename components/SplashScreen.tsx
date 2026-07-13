"use client";

import { useEffect, useState, useCallback } from "react";
import { useProgress } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { heroModelReadySignal, splashCompleteSignal } from "@/lib/heroSignals";

const SPLASH_FADE_DURATION_MS = 900;
const MIN_SPLASH_DURATION_MS = 2500;

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

    if (heroModelReadySignal.get()) {
      setHeroModelReady(true);
      return;
    }

    const unsubscribe = heroModelReadySignal.subscribe(() =>
      setHeroModelReady(true)
    );

    return unsubscribe;
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

  // Fade out once minimum time + optimized model loaded.
  const startFadeOut = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    const timeout = setTimeout(() => {
      splashCompleteSignal.notify();
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
