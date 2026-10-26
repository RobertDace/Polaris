"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeMoscowDome3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);
    camera.lookAt(0, 0.4, 0);

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

    // 2. Lighting Setup (Cold Moscow Winter Night)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xbbe1fa, 2.8);
    moonLight.position.set(4, 7, 5);
    scene.add(moonLight);

    const warmLanternFill = new THREE.PointLight(0xf59e0b, 2.5, 15);
    warmLanternFill.position.set(-4, -1, 3);
    scene.add(warmLanternFill);

    const goldSpireLight = new THREE.PointLight(0xffd700, 2.0, 10);
    goldSpireLight.position.set(0, 3.5, 0);
    scene.add(goldSpireLight);

    // 3. St. Basil's 3D Cathedral Onion Dome Model Assembly
    const domeGroup = new THREE.Group();
    scene.add(domeGroup);

    // Base Drum Tower (Brick & Stone Arcade)
    const drumGeom = new THREE.CylinderGeometry(1.4, 1.45, 1.2, 32);
    const drumMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b, // Red brick
      roughness: 0.6,
      metalness: 0.1,
    });
    const drum = new THREE.Mesh(drumGeom, drumMat);
    drum.position.y = -0.8;
    domeGroup.add(drum);

    // Cornice Ring
    const corniceGeom = new THREE.TorusGeometry(1.42, 0.08, 16, 40);
    const corniceMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.3,
      metalness: 0.4,
    });
    const cornice = new THREE.Mesh(corniceGeom, corniceMat);
    cornice.rotation.x = Math.PI / 2;
    cornice.position.y = -0.2;
    domeGroup.add(cornice);

    // Iconic Russian Onion Dome Profile using LatheGeometry
    const onionPoints: THREE.Vector2[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Formula for classic bulbous onion dome curve
      let r = 0;
      let y = t * 2.4;
      if (t < 0.35) {
        // Bulbous expansion
        r = 1.35 * Math.sin((t / 0.35) * (Math.PI / 2));
      } else {
        // Tapering graceful point
        const pt = (t - 0.35) / 0.65;
        r = 1.35 * Math.cos(pt * (Math.PI / 2)) * Math.pow(1 - pt, 0.4);
      }
      onionPoints.push(new THREE.Vector2(Math.max(0.02, r), y));
    }

    const onionGeom = new THREE.LatheGeometry(onionPoints, 36);
    const onionMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Imperial Russian Blue
      roughness: 0.22,
      metalness: 0.75,
      emissive: 0x0f172a,
      emissiveIntensity: 0.3,
    });
    const onionMesh = new THREE.Mesh(onionGeom, onionMat);
    onionMesh.position.y = -0.2;
    domeGroup.add(onionMesh);

    // Golden Chevron Spiral Ribs
    const spiralRibGroup = new THREE.Group();
    const ribGeom = new THREE.TorusGeometry(1.36, 0.05, 12, 36);
    const goldRibMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xb45309,
      emissiveIntensity: 0.4,
    });

    for (let i = 0; i < 4; i++) {
      const rib = new THREE.Mesh(ribGeom, goldRibMat);
      rib.rotation.x = Math.PI / 2.6;
      rib.rotation.z = (i * Math.PI) / 2;
      rib.position.y = 0.5;
      spiralRibGroup.add(rib);
    }
    domeGroup.add(spiralRibGroup);

    // Golden Spire & Cross
    const spireGeom = new THREE.CylinderGeometry(0.04, 0.1, 1.2, 16);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.92,
      roughness: 0.12,
    });
    const spire = new THREE.Mesh(spireGeom, spireMat);
    spire.position.y = 2.8;
    domeGroup.add(spire);

    // Cross Horizontal Arm
    const crossArmGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 12);
    crossArmGeom.rotateZ(Math.PI / 2);
    const crossArm = new THREE.Mesh(crossArmGeom, spireMat);
    crossArm.position.y = 3.1;
    domeGroup.add(crossArm);

    // 4. Local Swirling Russian Snowflakes
    const snowCount = 45;
    const snowGeom = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowSpeeds = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      const i3 = i * 3;
      snowPositions[i3] = (Math.random() - 0.5) * 5;
      snowPositions[i3 + 1] = Math.random() * 6 - 2;
      snowPositions[i3 + 2] = (Math.random() - 0.5) * 4;
      snowSpeeds[i] = Math.random() * 0.025 + 0.015;
    }
    snowGeom.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
    });
    const snowPoints = new THREE.Points(snowGeom, snowMat);
    scene.add(snowPoints);

    // 5. Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 0.6;
      targetMouseY = -((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 0.4;
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      domeGroup.rotation.y = elapsed * 0.35 + mouseX;
      domeGroup.rotation.x = mouseY * 0.4 + Math.sin(elapsed * 0.6) * 0.03;

      // Animate Snow
      const pos = snowGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] -= snowSpeeds[i];
        pos[i3] -= 0.008; // Diagonal wind
        if (pos[i3 + 1] < -2.2) {
          pos[i3 + 1] = 4.2;
          pos[i3] = (Math.random() - 0.5) * 5;
        }
      }
      snowGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
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
      container.removeEventListener("mouseleave", handlePointerLeave);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      drumGeom.dispose();
      drumMat.dispose();
      corniceGeom.dispose();
      corniceMat.dispose();
      onionGeom.dispose();
      onionMat.dispose();
      ribGeom.dispose();
      goldRibMat.dispose();
      spireGeom.dispose();
      spireMat.dispose();
      crossArmGeom.dispose();
      snowGeom.dispose();
      snowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor-portal="Kubah Moscow 3D"
      className="relative w-full h-64 sm:h-72 cursor-pointer flex items-center justify-center select-none"
      title="Kubah Katedral Moscow 3D (Sentuh untuk memutar)"
    />
  );
}
