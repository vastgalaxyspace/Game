"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SPLASH_MIN_DURATION_MS = 1200;
const SPLASH_FADE_DURATION_MS = 600;
const SPLASH_MAX_MODEL_WAIT_MS = 9000;

type SplashWindow = Window & {
  __muktaSplashComplete?: boolean;
  __muktaHeroModelReady?: boolean;
};

export function SplashScreen() {
  const pathname = usePathname();
  const [showText, setShowText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [heroModelReady, setHeroModelReady] = useState(false);
  const [modelWaitExpired, setModelWaitExpired] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const splashWindow = window as SplashWindow;

    if (splashWindow.__muktaHeroModelReady) {
      setHeroModelReady(true);
    }

    const handleHeroModelReady = () => setHeroModelReady(true);
    window.addEventListener("mukta:hero-model-ready", handleHeroModelReady);

    const textTimer = window.setTimeout(() => setShowText(true), 180);
    const subTextTimer = window.setTimeout(() => setShowSubText(true), 520);
    const minTimer = window.setTimeout(() => setMinTimeElapsed(true), SPLASH_MIN_DURATION_MS);
    const maxWaitTimer = window.setTimeout(() => setModelWaitExpired(true), SPLASH_MAX_MODEL_WAIT_MS);

    return () => {
      window.removeEventListener("mukta:hero-model-ready", handleHeroModelReady);
      window.clearTimeout(textTimer);
      window.clearTimeout(subTextTimer);
      window.clearTimeout(minTimer);
      window.clearTimeout(maxWaitTimer);
    };
  }, []);

  useEffect(() => {
    const isHomePage = pathname === "/";
    const canFinish = minTimeElapsed && (!isHomePage || heroModelReady || modelWaitExpired);

    if (!canFinish || isFading) {
      return;
    }

    setIsFading(true);
    const removeTimer = window.setTimeout(() => {
      const splashWindow = window as SplashWindow;
      splashWindow.__muktaSplashComplete = true;
      window.dispatchEvent(new Event("mukta:splash-complete"));
      setIsRemoved(true);
    }, SPLASH_FADE_DURATION_MS);

    return () => {
      window.clearTimeout(removeTimer);
    };
  }, [heroModelReady, isFading, minTimeElapsed, modelWaitExpired, pathname]);

  if (isRemoved) return null;

  return (
    <div className={`splash-screen ${isFading ? "splash-screen--fading" : ""}`} aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="splash-video"
      >
        <source src="/video/520.mp4" type="video/mp4" />
      </video>

      <div className="splash-text-overlay">
        <h1 className={`splash-mgd ${showText ? "splash-visible" : ""}`}>MGD</h1>
        <p className={`splash-fullname ${showSubText ? "splash-visible" : ""}`}>
          MUKTA GAME &amp; DEVELOPMENT
        </p>
      </div>
    </div>
  );
}
