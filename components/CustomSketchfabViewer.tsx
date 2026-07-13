"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { heroModelReadySignal, splashCompleteSignal } from "@/lib/heroSignals";

const HERO_MODEL_PATH = "/nissan_fairlady_z_s30240z_1978.meshopt.glb";

function Model() {
  const { scene } = useGLTF(HERO_MODEL_PATH);

  useEffect(() => {
    heroModelReadySignal.notify();
  }, []);

  return (
    <Center>
      <primitive object={scene} rotation={[0, -0.25, 0]} scale={2} />
    </Center>
  );
}

function ModelFallback() {
  return (
    <Html center>
      <div className="hero-model-fallback">Loading 3D car</div>
    </Html>
  );
}

function FrameInvalidator() {
  const { invalidate } = useThree();

  useEffect(() => {
    const interval = window.setInterval(() => {
      invalidate();
    }, 33);

    return () => window.clearInterval(interval);
  }, [invalidate]);

  return null;
}

export function CustomSketchfabViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [splashComplete, setSplashComplete] = useState(() =>
    splashCompleteSignal.get()
  );

  useEffect(() => {
    if (splashCompleteSignal.get()) {
      setSplashComplete(true);
      return;
    }

    const unsubscribe = splashCompleteSignal.subscribe(() =>
      setSplashComplete(true)
    );

    const fallback = window.setTimeout(() => {
      setSplashComplete(true);
    }, 2000);

    return () => {
      unsubscribe();
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "80px 0px 80px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const shouldAnimateHero = splashComplete && isHeroVisible;

  return (
    <div
      ref={viewerRef}
      className="relative h-full w-full cursor-grab bg-transparent"
    >
      <Canvas
        dpr={[0.6, 1]}
        frameloop="demand"
        camera={{ position: [0, 1.1, 8], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={2.8} />
        <hemisphereLight args={["#ffffff", "#510008", 1.35]} />
        <directionalLight position={[4, 5, 6]} intensity={4.2} />
        <directionalLight position={[-3, 2, -4]} intensity={1.8} color="#ff3148" />
        <pointLight position={[0, 1.5, 3]} intensity={2.2} color="#ffffff" distance={7} />
        <Suspense fallback={<ModelFallback />}>
          <Model />
        </Suspense>
        <OrbitControls
          makeDefault
          autoRotate={shouldAnimateHero}
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
        {shouldAnimateHero && <FrameInvalidator />}
      </Canvas>
    </div>
  );
}

useGLTF.preload(HERO_MODEL_PATH);
