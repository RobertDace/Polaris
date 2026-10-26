"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sparkles, Box, Upload, Compass } from "lucide-react";

interface ModelViewerGLBProps {
  modelPath: string;
  fallbackTitle?: string;
  fallbackDesc?: string;
  accentColor?: string;
  autoRotateSpeed?: number;
  scaleMultiplier?: number;
  className?: string;
}

export default function ModelViewerGLB({
  modelPath,
  fallbackTitle = "Model 3D (.GLB)",
  fallbackDesc = "Letakkan file .glb di folder public/models untuk melihatnya secara interaktif",
  accentColor = "#FFD700",
  autoRotateSpeed = 0.5,
  scaleMultiplier = 1.0,
  className = "w-full h-72 sm:h-80",
}: ModelViewerGLBProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadStatus, setLoadStatus] = useState<"loading" | "loaded" | "not-found">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isMounted = true;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 300;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentColor), 2.8);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    // 3. Interactive Mouse / Drag Controls
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.012;
        targetRotX += deltaY * 0.012;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        targetRotY = normX * 0.45;
        targetRotX = normY * 0.35;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    // 4. Load the .GLB model
    const loader = new GLTFLoader();
    let loadedScene: THREE.Group | null = null;

    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;
        setLoadStatus("loaded");
        loadedScene = gltf.scene;

        // Auto-center and normalize model scale
        const box = new THREE.Box3().setFromObject(loadedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Center model origin
        loadedScene.position.x = -center.x;
        loadedScene.position.y = -center.y;
        loadedScene.position.z = -center.z;

        // Normalize size to ~2.6 units
        const scale = (2.6 / (maxDim || 1)) * scaleMultiplier;
        modelGroup.scale.set(scale, scale, scale);

        // Enable shadows and enhance materials
        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.castShadow = true;
            m.receiveShadow = true;
            if (m.material) {
              const mat = m.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness ?? 0.4, 0.5);
              mat.metalness = Math.max(mat.metalness ?? 0.2, 0.4);
            }
          }
        });

        modelGroup.add(loadedScene);
      },
      undefined,
      (error) => {
        if (!isMounted) return;
        // File does not exist yet in public/models
        setLoadStatus("not-found");
      }
    );

    // 5. Render Loop with gentle floating and mouse lerp
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle floating bob
      modelGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;

      // Smooth rotation lerp
      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.08;
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.08;

      // Ambient slow auto-rotation if not dragging
      if (!isDragging) {
        modelGroup.rotation.y += 0.005 * autoRotateSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
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
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Cleanup GLTF scene meshes and materials
      if (loadedScene) {
        loadedScene.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const m = obj as THREE.Mesh;
            m.geometry?.dispose();
            if (Array.isArray(m.material)) {
              m.material.forEach((mat) => mat.dispose());
            } else if (m.material) {
              m.material.dispose();
            }
          }
        });
      }
      renderer.dispose();
    };
  }, [modelPath, accentColor, autoRotateSpeed, scaleMultiplier]);

  return (
    <div
      className={`relative rounded-3xl border border-white/15 bg-neutral-950/70 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center select-none group ${className}`}
    >
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        data-cursor-portal="Putar Model 3D"
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating 3D Badge on Top */}
      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
        <div
          className="w-2.5 h-2.5 rounded-full animate-ping"
          style={{ background: accentColor }}
        />
        <span className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
          REAL 3D MODEL (.GLB)
        </span>
      </div>

      {/* Not-Found / Upload Prompt Overlay (shown gracefully if user hasn't dropped the .glb yet) */}
      {loadStatus === "not-found" && (
        <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-3 pointer-events-none">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
            style={{
              borderColor: `${accentColor}60`,
              background: `${accentColor}15`,
              color: accentColor,
            }}
          >
            <Box size={28} className="animate-bounce" />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-lg text-white font-bold">
              {fallbackTitle}
            </h4>
            <p className="text-xs text-slate-300 font-light max-w-xs leading-relaxed">
              {fallbackDesc}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300 font-bold">
            <Upload size={12} />
            <span>Target: public{modelPath}</span>
          </div>
        </div>
      )}

      {/* Interactive Helper Label */}
      {loadStatus === "loaded" && (
        <div className="absolute bottom-3 text-center pointer-events-none">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
            Drag / Klik & Geser untuk Memutar 3D
          </span>
        </div>
      )}
    </div>
  );
}
