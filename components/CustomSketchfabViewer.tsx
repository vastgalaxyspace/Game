"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

function Model(props: any) {
  const { scene } = useGLTF("/nissan_fairlady_z_s30240z_1978.glb");
  return <primitive object={scene} {...props} />;
}

export function CustomSketchfabViewer() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", cursor: "grab", background: "transparent" }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          autoRotate
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
