"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

type ModelProps = {
  onReady: () => void;
};

type SplashWindow = Window & {
  __muktaHeroModelReady?: boolean;
};

const HERO_MODEL_URL = "/nissan_fairlady_z_s30240z_1978.optimized.glb";

function Model({ onReady }: ModelProps) {
  const { scene } = useGLTF(HERO_MODEL_URL);

  useEffect(() => {
    const splashWindow = window as SplashWindow;
    splashWindow.__muktaHeroModelReady = true;
    window.dispatchEvent(new Event("mukta:hero-model-ready"));
    onReady();
  }, [onReady]);

  return (
    <primitive
      object={scene}
      position={[1.45, -0.9, 0]}
      rotation={[0, -0.45, 0]}
      scale={1.35}
    />
  );
}

export function CustomSketchfabViewer() {
  const [modelReady, setModelReady] = useState(false);

  return (
    <div className="hero-model-viewer">
      {!modelReady && <div className="hero-model-viewer__loading" aria-hidden="true" />}
      <Canvas
        dpr={[0.75, 1.25]}
        frameloop="demand"
        camera={{ position: [0, 0.85, 13], fov: 42 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#050507"]} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <pointLight position={[-4, 2, 3]} intensity={1.2} color="#e3000b" />
        <Suspense fallback={null}>
          <Model onReady={() => setModelReady(true)} />
        </Suspense>
        <OrbitControls
          makeDefault
          enableDamping
          enableZoom={false}
          enablePan={false}
          target={[1.45, -0.35, 0]}
          minPolarAngle={0.15}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  );
}
