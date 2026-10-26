"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeHeartConflict3DProps {
  state: "keraguan" | "tekad";
  className?: string;
}

export default function ThreeHeartConflict3D({
  state,
  className = "w-full h-80 sm:h-96",
}: ThreeHeartConflict3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let isMounted = true;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const stateLight = new THREE.PointLight(
      state === "tekad" ? 0xffb703 : 0x7c3aed,
      3.5,
      12
    );
    stateLight.position.set(0, 0, 1.5);
    scene.add(stateLight);

    const rimLight = new THREE.DirectionalLight(
      state === "tekad" ? 0xffd700 : 0xa855f7,
      2.8
    );
    rimLight.position.set(-4, -4, -3);
    scene.add(rimLight);

    // 3. Central Kinetic 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central Faceted Amethyst / Golden Octahedron Core
    const coreGeometry = new THREE.OctahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: state === "tekad" ? 0xf59e0b : 0x4c1d95,
      emissive: state === "tekad" ? 0xd97706 : 0x2e1065,
      emissiveIntensity: state === "tekad" ? 0.6 : 0.25,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Wireframe Outer Cage
    const wireGeometry = new THREE.OctahedronGeometry(1.28, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: state === "tekad" ? 0xfef08a : 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    coreGroup.add(wireMesh);

    // Gyroscopic Rings (Resolution & Vows)
    const ringMats: THREE.MeshStandardMaterial[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    const ringRadii = [1.7, 2.05, 2.4];
    ringRadii.forEach((rad, idx) => {
      const ringGeo = new THREE.TorusGeometry(rad, 0.04, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: state === "tekad" ? 0xffd700 : 0x6b21a8,
        metalness: 0.95,
        roughness: 0.15,
        emissive: state === "tekad" ? 0xf59e0b : 0x3b0764,
        emissiveIntensity: state === "tekad" ? 0.5 : 0.1,
      });
      ringMats.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = (idx * Math.PI) / 3;
      ringMesh.rotation.y = (idx * Math.PI) / 4;
      coreGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    });

    // Surrounding Shard Crystals
    const shardCount = 18;
    const shardGroup = new THREE.Group();
    coreGroup.add(shardGroup);

    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < shardCount; i++) {
      const sGeo = new THREE.TetrahedronGeometry(0.12 + Math.random() * 0.08);
      const sMat = new THREE.MeshStandardMaterial({
        color: state === "tekad" ? 0xfef08a : 0x9333ea,
        metalness: 0.8,
        roughness: 0.2,
      });
      const shard = new THREE.Mesh(sGeo, sMat);
      const theta = (i / shardCount) * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const radius = 2.6 + Math.random() * 0.5;
      shard.position.set(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.sin(theta) * Math.cos(phi)
      );
      shardGroup.add(shard);
      shards.push(shard);
    }

    // 4. Interactive Mouse Drag / Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.015;
        targetRotX += deltaY * 0.015;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        targetRotY = normX * 0.5;
        targetRotX = normY * 0.35;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // 5. Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const currentState = stateRef.current;
      const isTekad = currentState === "tekad";

      // Dynamically morph materials based on state
      const targetCoreColor = isTekad ? new THREE.Color(0xf59e0b) : new THREE.Color(0x4c1d95);
      const targetEmissive = isTekad ? new THREE.Color(0xd97706) : new THREE.Color(0x2e1065);
      const targetWireColor = isTekad ? new THREE.Color(0xfef08a) : new THREE.Color(0xc084fc);

      coreMaterial.color.lerp(targetCoreColor, 0.08);
      coreMaterial.emissive.lerp(targetEmissive, 0.08);
      coreMaterial.emissiveIntensity = THREE.MathUtils.lerp(
        coreMaterial.emissiveIntensity,
        isTekad ? 0.7 : 0.25,
        0.08
      );
      wireMaterial.color.lerp(targetWireColor, 0.08);

      stateLight.color.lerp(isTekad ? new THREE.Color(0xffb703) : new THREE.Color(0x7c3aed), 0.08);
      rimLight.color.lerp(isTekad ? new THREE.Color(0xffd700) : new THREE.Color(0xa855f7), 0.08);

      ringMats.forEach((mat) => {
        mat.color.lerp(isTekad ? new THREE.Color(0xffd700) : new THREE.Color(0x6b21a8), 0.08);
        mat.emissive.lerp(isTekad ? new THREE.Color(0xf59e0b) : new THREE.Color(0x3b0764), 0.08);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isTekad ? 0.6 : 0.1, 0.08);
      });

      // Core rotation: smooth and fast when Tekad, erratic and slow when Keraguan
      const spinSpeed = isTekad ? 1.4 : 0.6;
      coreMesh.rotation.y += 0.015 * spinSpeed;
      coreMesh.rotation.x = Math.sin(elapsed * 0.8) * 0.2;
      wireMesh.rotation.y = -coreMesh.rotation.y;
      wireMesh.rotation.z += 0.008 * spinSpeed;

      // Gyroscopic rings rotation
      ringMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.01 * (idx + 1) * spinSpeed;
        mesh.rotation.y += 0.008 * (3 - idx) * spinSpeed;
      });

      // Shards orbit
      shardGroup.rotation.y -= 0.006 * spinSpeed;
      shardGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.15;

      // Bobbing
      coreGroup.position.y = Math.sin(elapsed * 1.6) * 0.1;

      // Mouse drag lerp
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringMats.forEach((m) => m.dispose());
    };
  }, []);

  return (
    <div
      className={`relative rounded-3xl border border-purple-500/30 bg-neutral-950/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(124,58,237,0.25)] flex flex-col items-center justify-center select-none group ${className}`}
    >
      <div
        ref={mountRef}
        data-cursor-portal="Putar Patung Resonansi 3D"
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating 3D Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
        <span
          className="w-2.5 h-2.5 rounded-full animate-ping"
          style={{ background: state === "tekad" ? "#FFD700" : "#A855F7" }}
        />
        <span className="text-[10px] font-mono tracking-widest text-slate-200 font-bold uppercase bg-black/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
          {state === "tekad" ? "3D CORE: TEKAD EMAS ROBIT" : "3D CORE: TITIK BEKU KERAGUAN"}
        </span>
      </div>

      <div className="absolute bottom-3 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-wider text-slate-400 bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
          Klik & Geser untuk Memutar Patung Dual-Resonansi 3D
        </span>
      </div>
    </div>
  );
}
