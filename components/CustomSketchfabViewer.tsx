"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
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
    return () => window.removeEventListener("mukta:splash-complete", handleSplashComplete);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", cursor: "grab", background: "transparent" }}>
      <Canvas
        shadows={splashComplete}
        dpr={splashComplete ? [1, 2] : 1}
        frameloop={splashComplete ? "always" : "demand"}
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
          autoRotateSpeed={3}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/nissan_fairlady_z_s30240z_1978.glb");
