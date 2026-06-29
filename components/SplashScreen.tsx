"use client";

import { useEffect, useState } from "react";

const SPLASH_MIN_DURATION_MS = 1200;
const SPLASH_FADE_DURATION_MS = 600;

type SplashWindow = Window & {
  __muktaSplashComplete?: boolean;
};

export function SplashScreen() {
  const [showText, setShowText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const splashWindow = window as SplashWindow;

    if (sessionStorage.getItem("mukta:splash-seen") === "true") {
      splashWindow.__muktaSplashComplete = true;
      setIsRemoved(true);
      return;
    }

    const textTimer = window.setTimeout(() => setShowText(true), 180);
    const subTextTimer = window.setTimeout(() => setShowSubText(true), 520);
    const fadeTimer = window.setTimeout(() => setIsFading(true), SPLASH_MIN_DURATION_MS);
    const removeTimer = window.setTimeout(() => {
      sessionStorage.setItem("mukta:splash-seen", "true");
      splashWindow.__muktaSplashComplete = true;
      window.dispatchEvent(new Event("mukta:splash-complete"));
      setIsRemoved(true);
    }, SPLASH_MIN_DURATION_MS + SPLASH_FADE_DURATION_MS);

    return () => {
      window.clearTimeout(textTimer);
      window.clearTimeout(subTextTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

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
