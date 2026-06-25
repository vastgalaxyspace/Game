"use client";

import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

export function SplashScreen() {
  const { active, progress } = useProgress();
  const [showText, setShowText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const videoLeftRef = useRef<HTMLVideoElement>(null);
  const videoRightRef = useRef<HTMLVideoElement>(null);

  // Sync both videos to the same playback time
  useEffect(() => {
    const syncVideos = () => {
      if (videoLeftRef.current && videoRightRef.current) {
        videoRightRef.current.currentTime = videoLeftRef.current.currentTime;
      }
    };
    const interval = setInterval(syncVideos, 100);
    return () => clearInterval(interval);
  }, []);

  // Timed text reveals
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 2000);
    const t2 = setTimeout(() => setShowSubText(true), 3200);
    const t3 = setTimeout(() => setMinTimeElapsed(true), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Tear open once minimum time + model loaded
  useEffect(() => {
    if (minTimeElapsed && (!active || progress === 100)) {
      setIsTearing(true);
      setTimeout(() => setIsRemoved(true), 1600);
    }
  }, [minTimeElapsed, active, progress]);

  if (isRemoved) return null;

  return (
    <div className={`splash-screen ${isTearing ? "splash-tearing" : ""}`} aria-hidden="true">
      {/* Left half */}
      <div className="splash-half splash-half--left">
        <div className="splash-inner">
          <video
            ref={videoLeftRef}
            src="/mukta-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="splash-video"
          />
          <div className="splash-text-overlay">
            <h1 className={`splash-mgd ${showText ? "splash-visible" : ""}`}>MGD</h1>
            <p className={`splash-fullname ${showSubText ? "splash-visible" : ""}`}>
              MUKTA GAME &amp; DEVELOPMENT
            </p>
          </div>
        </div>
      </div>

      {/* Right half */}
      <div className="splash-half splash-half--right">
        <div className="splash-inner splash-inner--right">
          <video
            ref={videoRightRef}
            src="/mukta-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="splash-video"
          />
          <div className="splash-text-overlay">
            <h1 className={`splash-mgd ${showText ? "splash-visible" : ""}`}>MGD</h1>
            <p className={`splash-fullname ${showSubText ? "splash-visible" : ""}`}>
              MUKTA GAME &amp; DEVELOPMENT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
