"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { playSizzlingSFX, playPopSFX } from "../utils/sfx";

interface ThreeCookingSkillet3DProps {
  isCooking: boolean;
  ingredients: string[];
  onCookClick?: () => void;
}

export default function ThreeCookingSkillet3D({
  isCooking,
  ingredients,
  onCookClick,
}: ThreeCookingSkillet3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    isCooking,
    ingredientsCount: ingredients.length,
    hovered: false,
  });

  useEffect(() => {
    stateRef.current.isCooking = isCooking;
    stateRef.current.ingredientsCount = ingredients.length;
  }, [isCooking, ingredients]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 280;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 6.2);
    camera.lookAt(0, 0, 0);

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

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.DirectionalLight(0xffe8b0, 3.0);
    warmKeyLight.position.set(4, 8, 4);
    scene.add(warmKeyLight);

    const cyanFillLight = new THREE.PointLight(0x00f5d4, 2.0, 15);
    cyanFillLight.position.set(-5, 2, -2);
    scene.add(cyanFillLight);

    const stoveFlameLight = new THREE.PointLight(0xff4500, 3.5, 12);
    stoveFlameLight.position.set(0, -1.8, 0);
    scene.add(stoveFlameLight);

    // 3. Pan Geometry Assembly
    const panGroup = new THREE.Group();
    scene.add(panGroup);

    // Cast Iron Skillet Body
    const skilletMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      metalness: 0.85,
      roughness: 0.28,
      flatShading: false,
    });

    // Outer Pan
    const panBodyGeom = new THREE.CylinderGeometry(2.2, 1.8, 0.6, 40, 1, false);
    const panBody = new THREE.Mesh(panBodyGeom, skilletMat);
    panGroup.add(panBody);

    // Top Rim
    const rimGeom = new THREE.TorusGeometry(2.2, 0.08, 16, 50);
    const rim = new THREE.Mesh(rimGeom, skilletMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.3;
    panGroup.add(rim);

    // Long Cast-Iron Handle
    const handleGeom = new THREE.CylinderGeometry(0.12, 0.16, 2.8, 16);
    const handle = new THREE.Mesh(handleGeom, skilletMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(3.4, 0.2, 0);
    panGroup.add(handle);

    // Golden Shimmering Olive Oil Surface
    const oilGeom = new THREE.CylinderGeometry(2.05, 2.05, 0.05, 36);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
      emissive: 0x854d0e,
      emissiveIntensity: 0.5,
    });
    const oilSurface = new THREE.Mesh(oilGeom, oilMat);
    oilSurface.position.y = 0.18;
    panGroup.add(oilSurface);

    // 4. 3D Garlic Cloves (Sliced pieces)
    const garlicGroup = new THREE.Group();
    const garlicGeom = new THREE.CylinderGeometry(0.18, 0.2, 0.06, 8);
    const garlicMat = new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      roughness: 0.35,
      metalness: 0.05,
    });
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Mesh(garlicGeom, garlicMat);
      const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.4;
      const radius = 0.5 + Math.random() * 1.1;
      g.position.set(Math.cos(angle) * radius, 0.23, Math.sin(angle) * radius);
      g.rotation.set(Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2);
      garlicGroup.add(g);
    }
    panGroup.add(garlicGroup);

    // 5. 3D Red Chili Flakes
    const chiliGroup = new THREE.Group();
    const chiliGeom = new THREE.TetrahedronGeometry(0.1, 0);
    const chiliMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });
    for (let i = 0; i < 16; i++) {
      const c = new THREE.Mesh(chiliGeom, chiliMat);
      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.3 + Math.random() * 1.4;
      c.position.set(Math.cos(angle) * radius, 0.24, Math.sin(angle) * radius);
      c.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      chiliGroup.add(c);
    }
    panGroup.add(chiliGroup);

    // 6. Sizzling Steam / Smoke Points
    const steamCount = 30;
    const steamGeom = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamSpeeds = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      const i3 = i * 3;
      steamPos[i3] = (Math.random() - 0.5) * 2.5;
      steamPos[i3 + 1] = 0.25 + Math.random() * 2.5;
      steamPos[i3 + 2] = (Math.random() - 0.5) * 2.5;
      steamSpeeds[i] = Math.random() * 0.04 + 0.02;
    }
    steamGeom.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.25,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeom, steamMat);
    panGroup.add(steamPoints);

    // 7. Mouse Tilt Interaction
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetTiltY = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 0.35;
      targetTiltX = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 0.25;
    };

    const handlePointerEnter = () => {
      stateRef.current.hovered = true;
    };

    const handlePointerLeave = () => {
      stateRef.current.hovered = false;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);

    // 8. Render Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const { isCooking, ingredientsCount } = stateRef.current;

      // Tilt lerp
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      // Sizzle vibration if cooking
      const sizzleShake = isCooking ? Math.sin(elapsed * 55) * 0.03 : 0;
      panGroup.position.y = sizzleShake + Math.sin(elapsed * 1.5) * 0.04;
      panGroup.rotation.x = 0.35 + tiltX + (isCooking ? Math.cos(elapsed * 40) * 0.02 : 0);
      panGroup.rotation.y = -0.3 + tiltY + elapsed * 0.2;
      panGroup.rotation.z = isCooking ? Math.sin(elapsed * 50) * 0.02 : 0;

      // Oil Surface Shimmer
      const oilScale = 1 + Math.sin(elapsed * 6) * 0.015;
      oilSurface.scale.set(oilScale, 1, oilScale);
      oilMat.emissiveIntensity = isCooking ? 0.8 + Math.sin(elapsed * 8) * 0.3 : 0.4;

      // Stove flame light modulation
      stoveFlameLight.intensity = isCooking ? 5.5 + Math.sin(elapsed * 25) * 2.0 : 1.5;

      // Steam animation
      const pos = steamGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += steamSpeeds[i] * (isCooking ? 2.2 : 0.8);
        pos[i3] += Math.sin(elapsed * 3 + i) * 0.01;
        if (pos[i3 + 1] > 3.2) {
          pos[i3 + 1] = 0.25;
          pos[i3] = (Math.random() - 0.5) * 2.2;
          pos[i3 + 2] = (Math.random() - 0.5) * 2.2;
        }
      }
      steamGeom.attributes.position.needsUpdate = true;
      steamMat.opacity = isCooking ? 0.65 : 0.25;

      // Ingredients visibility based on selection
      garlicGroup.visible = ingredientsCount >= 1;
      chiliGroup.visible = ingredientsCount >= 2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 280;
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

      panBodyGeom.dispose();
      rimGeom.dispose();
      handleGeom.dispose();
      skilletMat.dispose();
      oilGeom.dispose();
      oilMat.dispose();
      garlicGeom.dispose();
      garlicMat.dispose();
      chiliGeom.dispose();
      chiliMat.dispose();
      steamGeom.dispose();
      steamMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onCookClick}
      data-cursor-portal="Wajan Aglio Olio"
      className="relative w-full h-64 sm:h-72 cursor-pointer flex items-center justify-center select-none"
      title="Wajan 3D Aglio Olio (Sentuh untuk melihat bahan dan menumis)"
    />
  );
}
