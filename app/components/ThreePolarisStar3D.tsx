"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { Sparkles, Compass } from "lucide-react";
import { playChimeSFX, playPopSFX } from "../utils/sfx";

interface ThreePolarisStar3DProps {
  onUnlockPromise: () => void;
}

export default function ThreePolarisStar3D({ onUnlockPromise }: ThreePolarisStar3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3b0, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00c853, 2.0); // Matcha rim
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const blueFill = new THREE.PointLight(0x0047ff, 2.5, 20); // Robit blue fill
    blueFill.position.set(0, -4, 4);
    scene.add(blueFill);

    // 3. Central Faceted 3D Polaris Star
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    // Core Star: Faceted Icosahedron Gem
    const starGeom = new THREE.IcosahedronGeometry(1.6, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.88,
      roughness: 0.15,
      flatShading: true,
      emissive: 0x996515,
      emissiveIntensity: 0.4,
    });
    const starMesh = new THREE.Mesh(starGeom, starMat);
    starGroup.add(starMesh);

    // Wireframe Starlight Shell
    const wireGeom = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    starGroup.add(wireMesh);

    // 4. 3D Concentric Gyroscopic Rings
    // Ring 1: Robit Electric Blue
    const ring1Geom = new THREE.TorusGeometry(2.7, 0.05, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x0047ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x002288,
      emissiveIntensity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    starGroup.add(ring1);

    // Ring 2: Naiqo Emerald Matcha
    const ring2Geom = new THREE.TorusGeometry(3.3, 0.05, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00c853,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x00441a,
      emissiveIntensity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    starGroup.add(ring2);

    // Ring 3: Pure Gold Destination
    const ring3Geom = new THREE.TorusGeometry(3.9, 0.06, 16, 90);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x664400,
      emissiveIntensity: 0.5,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    starGroup.add(ring3);

    // 5. Surrounding 3D Orbiting Sparkle Spheres
    const sparkleCount = 14;
    const sparkleGroup = new THREE.Group();
    const sparkleGeom = new THREE.SphereGeometry(0.08, 8, 8);
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = new THREE.Mesh(sparkleGeom, sparkleMat);
      const angle = (i / sparkleCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.5;
      sparkle.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius
      );
      sparkleGroup.add(sparkle);
    }
    starGroup.add(sparkleGroup);

    // 6. Interactive Mouse Parallax & Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 1.2;
      targetMouseY = -((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 1.2;
    };

    const handlePointerEnter = () => {
      isHovering = true;
      setIsHovered(true);
      playPopSFX();
    };

    const handlePointerLeave = () => {
      isHovering = false;
      setIsHovered(false);
      targetMouseX = 0;
      targetMouseY = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Group tilt towards pointer
      starGroup.rotation.y = mouseX * 0.6 + elapsed * 0.35;
      starGroup.rotation.x = -mouseY * 0.6 + Math.sin(elapsed * 0.8) * 0.1;

      // Individual component rotations
      starMesh.rotation.y += isHovering ? 0.03 : 0.01;
      starMesh.rotation.z += 0.006;
      wireMesh.rotation.y -= 0.008;

      ring1.rotation.z += isHovering ? 0.04 : 0.018;
      ring2.rotation.x += isHovering ? 0.035 : 0.014;
      ring3.rotation.y += isHovering ? 0.03 : 0.01;

      sparkleGroup.rotation.y -= 0.015;

      // Pulse scale
      const scale = 1 + Math.sin(elapsed * 2.5) * (isHovering ? 0.1 : 0.04);
      starMesh.scale.set(scale, scale, scale);
      wireMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseenter", handlePointerEnter);
      container.removeEventListener("mouseleave", handlePointerLeave);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      starGeom.dispose();
      starMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      sparkleGeom.dispose();
      sparkleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    playChimeSFX();
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#00C853", "#0047FF", "#FFFFFF"],
      });
    } catch {}
    onUnlockPromise();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-10 select-none">
      {/* Dynamic Background Starlight Glow */}
      <div
        className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-400/25 via-emerald-400/20 to-blue-600/15 blur-[90px] transition-transform duration-700 pointer-events-none ${
          isHovered ? "scale-125 opacity-100" : "scale-100 opacity-60"
        }`}
      />

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        onClick={handleClick}
        data-cursor-portal="Sentuh Bintang"
        className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
        title="Klik Bintang Polaris 3D untuk Membuka Janji & Surat Rahasia"
      />

      {/* Tactile Subtitle & CTA */}
      <div className="relative z-10 mt-2 text-center space-y-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase shadow-lg backdrop-blur-md">
          <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>BINTANG POLARIS 3D INTERAKTIF</span>
        </div>
        <p className="text-xs text-neutral-600 font-mono">
          Sentuh / Klik bintang 3D di atas untuk membuka Surat Rahasia & Kotak Janji
        </p>
      </div>
    </div>
  );
}
