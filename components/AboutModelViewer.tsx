"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import * as THREE from "three";

function BridgeModel(props: any) {
  const { scene } = useGLTF("/fantasy_wooden_bridge.glb");
  return <primitive object={scene} {...props} />;
}

export function AboutModelViewer() {
  const controlsRef = useRef<any>(null);

  return (
    <div className="relative h-full w-full cursor-grab bg-transparent">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={0.8}>
            <BridgeModel />
          </Stage>
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          autoRotate
          autoRotateSpeed={2}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/fantasy_wooden_bridge.glb");
