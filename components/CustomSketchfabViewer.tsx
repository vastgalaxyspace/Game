"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

type SplashWindow = Window & {
  __muktaHeroModelReady?: boolean;
  __muktaSplashComplete?: boolean;
};

function Model(props: any) {
  const { scene } = useGLTF("/nissan_fairlady_z_s30240z_1978.glb");

  useEffect(() => {
    const splashWindow = window as SplashWindow;
    splashWindow.__muktaHeroModelReady = true;
    window.dispatchEvent(new Event("mukta:hero-model-ready"));
  }, []);

  return <primitive object={scene} {...props} />;
}

/* Periodically invalidate frames for auto-rotate in "demand" mode */
function FrameInvalidator() {
  const { invalidate } = useThree();

  useEffect(() => {
    let id: number;
    const loop = () => {
      invalidate();
      id = requestAnimationFrame(loop);
    };
    // Invalidate at ~30fps instead of 60fps for auto-rotate
    const interval = setInterval(() => {
      invalidate();
    }, 33);

    return () => {
      cancelAnimationFrame(id);
      clearInterval(interval);
    };
  }, [invalidate]);

  return null;
}

export function CustomSketchfabViewer() {
  const [splashComplete, setSplashComplete] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean((window as SplashWindow).__muktaSplashComplete);
  });

  useEffect(() => {
    const handleSplashComplete = () => setSplashComplete(true);

    window.addEventListener("mukta:splash-complete", handleSplashComplete);

    // Fallback: if event was missed or never fired, poll briefly then force-enable
    const fallback = setTimeout(() => {
      setSplashComplete(true);
    }, 4000); // Absolute max wait — 4s after mount

    return () => {
      window.removeEventListener(
        "mukta:splash-complete",
        handleSplashComplete
      );
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "grab",
        background: "transparent",
      }}
    >
      <Canvas
        shadows={splashComplete}
        dpr={splashComplete ? [1, 1.5] : [0.5, 1]}
        frameloop="demand"
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          autoRotate={splashComplete}
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
        {splashComplete && <FrameInvalidator />}
      </Canvas>
    </div>
  );
}

useGLTF.preload("/nissan_fairlady_z_s30240z_1978.glb");
