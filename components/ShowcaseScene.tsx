"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useAnimations,
  useGLTF
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

type AnimationMode = "idle" | "action";

type ShowcaseSceneProps = {
  autoRotate: boolean;
  animationMode: AnimationMode;
  zoomSignal: number;
};

const MODEL_PATH = "/models/pixellabs-robot-3332.glb";
const MIN_CAMERA_DISTANCE = 3.2;
const MAX_CAMERA_DISTANCE = 8.5;

export function ShowcaseScene({ autoRotate, animationMode, zoomSignal }: ShowcaseSceneProps) {
  return (
    <div className="scene-canvas">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.8, 2.2, 6.8], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#f5f5f7"]} />
        <fog attach="fog" args={["#f5f5f7", 8, 18]} />
        <Suspense fallback={<LoadingLabel />}>
          <CinematicCameraRig zoomSignal={zoomSignal} />
          <CinematicLights />
          <ShowcaseModel autoRotate={autoRotate} animationMode={animationMode} />
          <Platform />
          <ContactShadows
            opacity={0.55}
            scale={8}
            blur={2.5}
            far={4}
            position={[0, -0.02, 0]}
          />
          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingLabel() {
  return (
    <Html center>
      <div style={{ color: "#f4f3ef", fontSize: "0.95rem" }}>Loading model...</div>
    </Html>
  );
}

function CinematicCameraRig({ zoomSignal }: { zoomSignal: number }) {
  const { camera } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const targetDistance = useRef(5.7);
  const lastZoomSignal = useRef(0);
  const introStart = useRef(performance.now());
  const introSkipped = useRef(false);

  useEffect(() => {
    const skipIntro = () => {
      introSkipped.current = true;
    };

    window.addEventListener("pointerdown", skipIntro);
    window.addEventListener("wheel", skipIntro, { passive: true });
    window.addEventListener("keydown", skipIntro);

    return () => {
      window.removeEventListener("pointerdown", skipIntro);
      window.removeEventListener("wheel", skipIntro);
      window.removeEventListener("keydown", skipIntro);
    };
  }, []);

  useEffect(() => {
    if (zoomSignal === lastZoomSignal.current) {
      return;
    }

    const direction = zoomSignal > lastZoomSignal.current ? -0.7 : 0.7;
    targetDistance.current = THREE.MathUtils.clamp(
      targetDistance.current + direction,
      MIN_CAMERA_DISTANCE,
      MAX_CAMERA_DISTANCE
    );
    lastZoomSignal.current = zoomSignal;
    introSkipped.current = true;
  }, [zoomSignal]);

  useFrame((_, delta) => {
    const elapsed = (performance.now() - introStart.current) / 1000;
    const introT = introSkipped.current ? 1 : THREE.MathUtils.smoothstep(elapsed / 2.4, 0, 1);
    const startPosition = new THREE.Vector3(0.3, 2.4, 8.2);
    const endDirection = new THREE.Vector3(0.62, 0.26, 0.74).normalize();
    const desiredDistance = THREE.MathUtils.lerp(7.6, targetDistance.current, introT);
    const desiredPosition = endDirection.multiplyScalar(desiredDistance);

    camera.position.lerpVectors(startPosition, desiredPosition, introT);

    if (introSkipped.current) {
      const currentDistance = camera.position.length();
      const smoothedDistance = THREE.MathUtils.damp(
        currentDistance,
        targetDistance.current,
        4.8,
        delta
      );
      camera.position.setLength(smoothedDistance);
    }

    camera.lookAt(0, 1.05, 0);
    controls.current?.target.lerp(new THREE.Vector3(0, 1.05, 0), 0.16);
    controls.current?.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={MIN_CAMERA_DISTANCE}
      maxDistance={MAX_CAMERA_DISTANCE}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.56}
      target={[0, 1.05, 0]}
    />
  );
}

function CinematicLights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <spotLight
        castShadow
        position={[2.8, 4.8, 4.2]}
        angle={0.36}
        penumbra={0.7}
        intensity={4}
        color="#f7efe9"
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3.5, 2.5, -2.8]} intensity={6} color="#ff1f38" distance={8} />
      <pointLight position={[3.8, 1.2, -3.4]} intensity={3.2} color="#d01628" distance={7} />
      <directionalLight position={[0, 5, -4]} intensity={1.25} color="#ff3148" />
    </>
  );
}

function ShowcaseModel({
  autoRotate,
  animationMode
}: {
  autoRotate: boolean;
  animationMode: AnimationMode;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    if (!names.length) {
      return;
    }

    const lowerMode = animationMode.toLowerCase();
    const preferredName =
      names.find((name) => name.toLowerCase().includes(lowerMode)) ??
      names.find((name) => name.toLowerCase().includes(animationMode === "idle" ? "stand" : "attack")) ??
      names[0];

    Object.values(actions).forEach((action) => action?.fadeOut(0.2));
    actions[preferredName]?.reset().fadeIn(0.25).play();
  }, [actions, animationMode, names]);

  useFrame((_, delta) => {
    if (!group.current || !autoRotate) {
      return;
    }

    group.current.rotation.y += delta * 0.34;
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0, -0.35, 0]}>
      <primitive object={clonedScene} scale={1.65} position={[0, 0, 0]} />
    </group>
  );
}

function Platform() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[1.9, 2.15, 0.18, 96]} />
        <meshStandardMaterial color="#15161b" roughness={0.74} metalness={0.28} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[2.02, 0.018, 16, 128]} />
        <meshStandardMaterial
          color="#ff3148"
          emissive="#d01628"
          emissiveIntensity={1.6}
          roughness={0.4}
        />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, 0]}>
        <circleGeometry args={[5.8, 128]} />
        <meshStandardMaterial color="#07080b" roughness={0.86} metalness={0.08} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
