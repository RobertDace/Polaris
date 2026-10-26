"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeSmartphone3DProps {
  chatText?: string;
  className?: string;
}

export default function ThreeSmartphone3D({
  chatText = "belum tidur kah kamu?",
  className = "w-full h-72 sm:h-80",
}: ThreeSmartphone3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let isMounted = true;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 300;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

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

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x0047ff, 3.5);
    blueRimLight.position.set(-4, -2, -3);
    scene.add(blueRimLight);

    const greenFillLight = new THREE.PointLight(0x00c853, 2.0, 10);
    greenFillLight.position.set(2, -3, 3);
    scene.add(greenFillLight);

    // 3. Dynamic Screen Texture using 2D Canvas
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 1024;
    const ctx = screenCanvas.getContext("2d");

    const updateScreenTexture = () => {
      if (!ctx) return;
      // Dark glass background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, 512, 1024);

      // Subtle gradient wallpaper
      const grad = ctx.createLinearGradient(0, 0, 512, 1024);
      grad.addColorStop(0, "#051329");
      grad.addColorStop(0.5, "#030712");
      grad.addColorStop(1, "#071A0E");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 1024);

      // Status Bar
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("02:14", 45, 60);

      // Dynamic Island / Speaker notch
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(196, 30, 120, 36, 18);
      ctx.fill();

      // Battery & Signal icons
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(430, 42, 35, 18);
      ctx.fillRect(465, 47, 4, 8);

      // Header App Bar: Naiqo
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(25, 110, 462, 80);

      // Matcha status circle
      ctx.fillStyle = "#00C853";
      ctx.beginPath();
      ctx.arc(65, 150, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("Naiqo 🍵", 95, 160);

      // Incoming Chat Bubble (Naiqo)
      ctx.fillStyle = "#022C22";
      ctx.strokeStyle = "rgba(0, 200, 83, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(35, 240, 442, 160, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#A7F3D0";
      ctx.font = "30px sans-serif";
      ctx.fillText(`"${chatText}"`, 60, 310);

      ctx.fillStyle = "#6EE7B7";
      ctx.font = "22px monospace";
      ctx.fillText("02:14 AM · Memori Pertama", 60, 360);

      // Response Preview (Robit)
      ctx.fillStyle = "#0047FF";
      ctx.beginPath();
      ctx.roundRect(140, 430, 335, 110, 24);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "28px sans-serif";
      ctx.fillText("blm kenapa?", 170, 485);

      ctx.fillStyle = "#93C5FD";
      ctx.font = "20px monospace";
      ctx.fillText("02:15 AM ✓✓", 360, 520);

      // Bottom Home Indicator bar
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.roundRect(166, 980, 180, 8, 4);
      ctx.fill();
    };

    updateScreenTexture();
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;

    // 4. Smartphone 3D Geometry
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // Chassis (Deep Space Blue metallic frame)
    const phoneWidth = 2.0;
    const phoneHeight = 4.0;
    const phoneDepth = 0.16;

    // Outer Beveled Frame
    const frameGeometry = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a1128,
      metalness: 0.9,
      roughness: 0.25,
      envMapIntensity: 1.5,
    });
    const phoneFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    phoneGroup.add(phoneFrame);

    // Edge Metallic Band
    const bandGeometry = new THREE.BoxGeometry(phoneWidth + 0.04, phoneHeight + 0.04, phoneDepth - 0.02);
    const bandMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.95,
      roughness: 0.15,
    });
    const phoneBand = new THREE.Mesh(bandGeometry, bandMaterial);
    phoneGroup.add(phoneBand);

    // Front OLED Screen
    const screenGeometry = new THREE.PlaneGeometry(phoneWidth * 0.93, phoneHeight * 0.94);
    const screenMaterial = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.65,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.005;
    phoneGroup.add(screenMesh);

    // Back Camera Island
    const islandGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.06);
    const islandMaterial = new THREE.MeshStandardMaterial({
      color: 0x050d1f,
      metalness: 0.8,
      roughness: 0.2,
    });
    const cameraIsland = new THREE.Mesh(islandGeometry, islandMaterial);
    cameraIsland.position.set(-phoneWidth / 4, phoneHeight / 3.2, -phoneDepth / 2 - 0.03);
    phoneGroup.add(cameraIsland);

    // Camera Lenses
    for (let i = 0; i < 3; i++) {
      const lensGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.9,
        roughness: 0.1,
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(
        -phoneWidth / 4 + (i === 2 ? 0.14 : (i % 2 === 0 ? -0.14 : 0.14)),
        phoneHeight / 3.2 + (i === 2 ? -0.14 : 0.14),
        -phoneDepth / 2 - 0.07
      );
      phoneGroup.add(lens);
    }

    // Gentle Initial Tilt
    phoneGroup.rotation.y = -0.35;
    phoneGroup.rotation.x = 0.2;

    // 5. Interactive Mouse Orbit & Drag
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = -0.35;
    let targetRotX = 0.2;

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
        targetRotY = -0.35 + normX * 0.55;
        targetRotX = 0.2 + normY * 0.4;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // 6. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth bobbing
      phoneGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Rotation lerping
      phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.08;
      phoneGroup.rotation.x += (targetRotX - phoneGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 300;
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
      frameGeometry.dispose();
      frameMaterial.dispose();
      bandGeometry.dispose();
      bandMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      screenTexture.dispose();
    };
  }, [chatText]);

  return (
    <div
      className={`relative rounded-3xl border border-blue-500/30 bg-[#030712]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,71,255,0.25)] flex flex-col items-center justify-center select-none group ${className}`}
    >
      <div
        ref={mountRef}
        data-cursor-portal="Putar Smartphone 3D"
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating 3D Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0047FF] animate-ping" />
        <span className="text-[10px] font-mono tracking-widest text-blue-200 font-bold uppercase bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-400/40 backdrop-blur-md">
          REAL 3D THREE.JS SMARTPHONE
        </span>
      </div>

      <div className="absolute bottom-3 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-wider text-slate-400 bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
          Klik & Geser untuk Memutar Smartphone 3D
        </span>
      </div>
    </div>
  );
}
