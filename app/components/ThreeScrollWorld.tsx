"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeScrollWorldProps {
  currentAct: number | "what-if";
  isWarping?: boolean;
}

export default function ThreeScrollWorld({ currentAct, isWarping = false }: ThreeScrollWorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    currentAct,
    isWarping,
    scrollProgress: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    warpFactor: 0,
  });

  // Keep stateRef up to date without recreating the Three.js scene
  useEffect(() => {
    stateRef.current.currentAct = currentAct;
    stateRef.current.isWarping = isWarping;
  }, [currentAct, isWarping]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050814, 0.015);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Primary Blue Point Light (Robit)
    const blueLight = new THREE.PointLight(0x0047ff, 2.5, 80);
    blueLight.position.set(-15, 10, 10);
    scene.add(blueLight);

    // Primary Green Point Light (Naiqo Matcha)
    const greenLight = new THREE.PointLight(0x00c853, 2.5, 80);
    greenLight.position.set(15, -10, 10);
    scene.add(greenLight);

    // Golden Polaris Star Light
    const goldLight = new THREE.PointLight(0xffd700, 3, 100);
    goldLight.position.set(0, 0, -60);
    scene.add(goldLight);

    // -------------------------------------------------------------
    // 3. LAYER A: Massive 3D Cosmic Starfield
    // -------------------------------------------------------------
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starBasePositions = new Float32Array(starCount * 3);

    const starColorPalette = [
      new THREE.Color(0xffffff), // Starlight
      new THREE.Color(0x0047ff), // Robit Blue
      new THREE.Color(0x00c853), // Naiqo Matcha
      new THREE.Color(0x00f5d4), // Cyan
      new THREE.Color(0xffd700), // Polaris Gold
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 140;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 160;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 200 - 40;

      starBasePositions[i3] = starPositions[i3];
      starBasePositions[i3 + 1] = starPositions[i3 + 1];
      starBasePositions[i3 + 2] = starPositions[i3 + 2];

      const c = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // -------------------------------------------------------------
    // 4. BABAK 1 (WINTER 02:14 AM): Crystalline Ice Crystals & Digital Grid
    // -------------------------------------------------------------
    const iceGroup = new THREE.Group();
    const iceCount = 65;
    const iceMeshes: THREE.Mesh[] = [];

    const iceGeom = new THREE.OctahedronGeometry(0.7, 0);
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = 0; i < iceCount; i++) {
      const mesh = new THREE.Mesh(iceGeom, iceMat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 45 + 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const s = Math.random() * 0.7 + 0.35;
      mesh.scale.set(s, s * 1.4, s);
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        fallSpeed: Math.random() * 0.025 + 0.012,
        swayPhase: Math.random() * Math.PI * 2,
      };
      iceGroup.add(mesh);
      iceMeshes.push(mesh);
    }
    scene.add(iceGroup);

    // 02:14 AM Phosphor Grid Floor
    const digitalGrid = new THREE.GridHelper(90, 30, 0x0047ff, 0x1e293b);
    digitalGrid.position.set(0, -18, 5);
    (digitalGrid.material as THREE.Material).transparent = true;
    (digitalGrid.material as THREE.Material).opacity = 0.45;
    scene.add(digitalGrid);

    // -------------------------------------------------------------
    // 5. BABAK 2 (SPRING): Matcha/Cyan Blossom Petals & Sizzling Embers
    // -------------------------------------------------------------
    const petalGroup = new THREE.Group();
    const petalCount = 70;
    const petalMeshes: THREE.Mesh[] = [];

    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.4, 0.6, 0.6, 1.2, 0, 1.6);
    petalShape.bezierCurveTo(-0.6, 1.2, -0.4, 0.6, 0, 0);

    const petalGeom = new THREE.ShapeGeometry(petalShape);
    const petalMatMatcha = new THREE.MeshStandardMaterial({
      color: 0x00c853,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      emissive: 0x004d20,
      emissiveIntensity: 0.4,
    });
    const petalMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      emissive: 0x00554a,
      emissiveIntensity: 0.5,
    });

    for (let i = 0; i < petalCount; i++) {
      const mat = i % 2 === 0 ? petalMatMatcha : petalMatCyan;
      const mesh = new THREE.Mesh(petalGeom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = Math.random() * 0.7 + 0.4;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        driftSpeedY: Math.random() * 0.03 + 0.015,
        swayPhase: Math.random() * Math.PI * 2,
      };

      petalGroup.add(mesh);
      petalMeshes.push(mesh);
    }
    scene.add(petalGroup);

    // Sizzling Golden Kitchen Embers
    const emberCount = 60;
    const emberGeometry = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      const i3 = i * 3;
      emberPositions[i3] = (Math.random() - 0.5) * 35;
      emberPositions[i3 + 1] = Math.random() * -20 - 5;
      emberPositions[i3 + 2] = (Math.random() - 0.5) * 30 - 8;
      emberSpeeds[i] = Math.random() * 0.08 + 0.04;
    }
    emberGeometry.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 1.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeometry, emberMat);
    scene.add(emberPoints);

    // -------------------------------------------------------------
    // 6. BABAK 3 (SUMMER): Resonant Geometric Torus & Dual Energy Collision
    // -------------------------------------------------------------
    const summerGroup = new THREE.Group();
    summerGroup.position.set(0, -6, -18);

    // Resonant pulsing Torus
    const torusGeom = new THREE.TorusGeometry(8.5, 0.28, 16, 80);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const resonantTorus = new THREE.Mesh(torusGeom, torusMat);
    summerGroup.add(resonantTorus);

    const innerRingGeom = new THREE.TorusGeometry(6.2, 0.15, 16, 60);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerTorus = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerTorus.rotation.x = Math.PI / 2.5;
    summerGroup.add(innerTorus);

    // Dual Collision Energy Streams (Lavender Doubt vs Blue/Purple Grit)
    const streamCount = 50;
    const streamLavenderGeom = new THREE.BufferGeometry();
    const streamLavenderPos = new Float32Array(streamCount * 3);
    const streamBlueGeom = new THREE.BufferGeometry();
    const streamBluePos = new Float32Array(streamCount * 3);

    for (let i = 0; i < streamCount; i++) {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      const i3 = i * 3;
      streamLavenderPos[i3] = Math.cos(angle) * radius - 4;
      streamLavenderPos[i3 + 1] = Math.sin(angle) * radius * 0.4;
      streamLavenderPos[i3 + 2] = (Math.random() - 0.5) * 5;

      streamBluePos[i3] = Math.cos(-angle) * radius + 4;
      streamBluePos[i3 + 1] = Math.sin(-angle) * radius * 0.4;
      streamBluePos[i3 + 2] = (Math.random() - 0.5) * 5;
    }
    streamLavenderGeom.setAttribute("position", new THREE.BufferAttribute(streamLavenderPos, 3));
    streamBlueGeom.setAttribute("position", new THREE.BufferAttribute(streamBluePos, 3));

    const streamLavenderPoints = new THREE.Points(
      streamLavenderGeom,
      new THREE.PointsMaterial({ color: 0xd8b4fe, size: 1.1, transparent: true, opacity: 0.85 })
    );
    const streamBluePoints = new THREE.Points(
      streamBlueGeom,
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 1.1, transparent: true, opacity: 0.85 })
    );
    summerGroup.add(streamLavenderPoints);
    summerGroup.add(streamBluePoints);

    scene.add(summerGroup);

    // -------------------------------------------------------------
    // 7. BABAK 4 (AUTUMN): Leaves + Bus Highway Streaks + Moscow Snow
    // -------------------------------------------------------------
    const autumnGroup = new THREE.Group();

    // 3D Autumn Leaves
    const leafGroup = new THREE.Group();
    const leafCount = 45;
    const leafMeshes: THREE.Mesh[] = [];

    const leafGeom = new THREE.TetrahedronGeometry(0.8, 0);
    const leafMatRed = new THREE.MeshStandardMaterial({
      color: 0xff1e40,
      emissive: 0x880010,
      emissiveIntensity: 0.5,
      roughness: 0.4,
    });
    const leafMatAmber = new THREE.MeshStandardMaterial({
      color: 0xffb703,
      emissive: 0x664400,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });

    for (let i = 0; i < leafCount; i++) {
      const mesh = new THREE.Mesh(leafGeom, i % 2 === 0 ? leafMatRed : leafMatAmber);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 25
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const s = Math.random() * 0.6 + 0.3;
      mesh.scale.set(s, s * 1.5, s * 0.2);

      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
        fallSpeed: Math.random() * 0.04 + 0.02,
        sway: Math.random() * Math.PI * 2,
      };

      leafGroup.add(mesh);
      leafMeshes.push(mesh);
    }
    autumnGroup.add(leafGroup);

    // Highway Light Speed Streaks (Probolinggo -> Jogja 23 Juni)
    const streakCount = 28;
    const streakGroup = new THREE.Group();
    const streakMeshes: THREE.Mesh[] = [];
    const streakCylGeom = new THREE.CylinderGeometry(0.04, 0.04, 8, 8);
    streakCylGeom.rotateX(Math.PI / 2); // Point forward

    const streakMatRed = new THREE.MeshBasicMaterial({ color: 0xff1e40, transparent: true, opacity: 0.85 });
    const streakMatYellow = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.85 });

    for (let i = 0; i < streakCount; i++) {
      const isRed = i % 2 === 0;
      const mesh = new THREE.Mesh(streakCylGeom, isRed ? streakMatRed : streakMatYellow);
      mesh.position.set(
        (Math.random() - 0.5) * 45 + (isRed ? -10 : 10),
        -14 + Math.random() * 3,
        (Math.random() - 0.5) * 50 - 25
      );
      mesh.userData = {
        speed: Math.random() * 0.8 + 0.6,
      };
      streakGroup.add(mesh);
      streakMeshes.push(mesh);
    }
    autumnGroup.add(streakGroup);

    // Moscow Architectural Soft Snow
    const moscowSnowCount = 90;
    const moscowSnowGeom = new THREE.BufferGeometry();
    const moscowSnowPos = new Float32Array(moscowSnowCount * 3);
    for (let i = 0; i < moscowSnowCount; i++) {
      const i3 = i * 3;
      moscowSnowPos[i3] = (Math.random() - 0.5) * 55;
      moscowSnowPos[i3 + 1] = Math.random() * 60 - 30;
      moscowSnowPos[i3 + 2] = (Math.random() - 0.5) * 40 - 25;
    }
    moscowSnowGeom.setAttribute("position", new THREE.BufferAttribute(moscowSnowPos, 3));
    const moscowSnowPoints = new THREE.Points(
      moscowSnowGeom,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.9,
        transparent: true,
        opacity: 0.8,
      })
    );
    autumnGroup.add(moscowSnowPoints);

    scene.add(autumnGroup);

    // -------------------------------------------------------------
    // 8. BABAK 5 (POLARIS): The Grand 3D Polaris Star & Constellation Compass
    // -------------------------------------------------------------
    const polarisGroup = new THREE.Group();
    polarisGroup.position.set(0, 0, -48);

    // Golden Icosahedron Core
    const coreGeom = new THREE.IcosahedronGeometry(3.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffb700,
      emissiveIntensity: 1.3,
      roughness: 0.2,
      metalness: 0.8,
    });
    const polarisCore = new THREE.Mesh(coreGeom, coreMat);
    polarisGroup.add(polarisCore);

    // Outer wireframe starlight cage
    const wireGeom = new THREE.IcosahedronGeometry(5.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const wireCage = new THREE.Mesh(wireGeom, wireMat);
    polarisGroup.add(wireCage);

    // Gyroscopic Ring 1 (Electric Blue - Robit)
    const ring1Geom = new THREE.TorusGeometry(6.6, 0.09, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x0047ff, transparent: true, opacity: 0.85 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    polarisGroup.add(ring1);

    // Gyroscopic Ring 2 (Emerald Matcha - Naiqo)
    const ring2Geom = new THREE.TorusGeometry(8.4, 0.09, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00c853, transparent: true, opacity: 0.85 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    polarisGroup.add(ring2);

    // Gyroscopic Ring 3 (Pure Gold - Destination)
    const ring3Geom = new THREE.TorusGeometry(10.2, 0.11, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.95 });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    polarisGroup.add(ring3);

    // Constellation Vector Lines pointing towards Polaris
    const lineIndices = [
      new THREE.Vector3(-14, 8, -48),
      new THREE.Vector3(0, 0, -48),
      new THREE.Vector3(14, 8, -48),
      new THREE.Vector3(0, 0, -48),
      new THREE.Vector3(0, -12, -48),
      new THREE.Vector3(0, 0, -48),
    ];
    const constellationGeom = new THREE.BufferGeometry().setFromPoints(lineIndices);
    const constellationMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.45,
    });
    const constellationLines = new THREE.LineSegments(constellationGeom, constellationMat);
    polarisGroup.add(constellationLines);

    scene.add(polarisGroup);

    // -------------------------------------------------------------
    // 9. Event Listeners: Mouse Parallax & Scroll Tracking
    // -------------------------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        stateRef.current.scrollProgress = window.scrollY / maxScroll;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // -------------------------------------------------------------
    // 10. The Render Loop: Distinct Animations per Section & Hyperspace
    // -------------------------------------------------------------
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      const { currentAct, isWarping, scrollProgress, targetMouseX, targetMouseY } = stateRef.current;

      // Mouse lerp
      stateRef.current.mouseX += (targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (targetMouseY - stateRef.current.mouseY) * 0.05;
      const lerpedMouseX = stateRef.current.mouseX;
      const lerpedMouseY = stateRef.current.mouseY;

      // Warp Factor easing
      if (isWarping) {
        stateRef.current.warpFactor = THREE.MathUtils.lerp(stateRef.current.warpFactor, 1, 0.1);
      } else {
        stateRef.current.warpFactor = THREE.MathUtils.lerp(stateRef.current.warpFactor, 0, 0.08);
      }
      const warp = stateRef.current.warpFactor;

      // Dynamic FOV for Hyperspace
      camera.fov = 45 + warp * 22;
      camera.updateProjectionMatrix();

      // Camera Position on Scroll Spline
      const targetCamZ = 30 - scrollProgress * 55 - warp * 18;
      const targetCamY = -scrollProgress * 30;

      camera.position.x += (lerpedMouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + lerpedMouseY * 3 - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * (warp > 0.1 ? 0.15 : 0.05);

      camera.lookAt(
        lerpedMouseX * 1.5,
        targetCamY - 2 + lerpedMouseY * 1.5,
        targetCamZ - 25
      );

      // Starfield Rotation & Hyperspace Stretch
      starField.rotation.y = elapsedTime * (0.015 + warp * 0.1);
      starField.rotation.x = elapsedTime * (0.01 + warp * 0.05);

      if (warp > 0.02) {
        const positions = starGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < starCount; i++) {
          const i3 = i * 3;
          positions[i3 + 2] += warp * 3.5;
          if (positions[i3 + 2] > 35) {
            positions[i3 + 2] = -160;
          }
        }
        starGeometry.attributes.position.needsUpdate = true;
      }

      // -------------------------------------------------------------
      // ACT-SPECIFIC 3D WORLDS
      // -------------------------------------------------------------
      const isWhatIf = currentAct === "what-if";

      if (isWhatIf) {
        scene.fog = new THREE.FogExp2(0x060f0f, 0.04);
        blueLight.intensity = 0.2;
        greenLight.intensity = 0.2;
        goldLight.intensity = 0.1;
        iceGroup.visible = false;
        digitalGrid.visible = false;
        petalGroup.visible = false;
        emberPoints.visible = false;
        summerGroup.visible = false;
        autumnGroup.visible = false;
        polarisGroup.rotation.y += 0.002;
      } else {
        // Lighting and Fog Modulation
        if (currentAct === 1) {
          scene.fog = new THREE.FogExp2(0x040816, 0.018); // Winter Midnight
          blueLight.color.setHex(0x0047ff);
          greenLight.color.setHex(0x00c853);
        } else if (currentAct === 2) {
          scene.fog = new THREE.FogExp2(0x022c22, 0.015); // Spring Emerald Deep
          blueLight.color.setHex(0x00f5d4);
          greenLight.color.setHex(0x00c853);
        } else if (currentAct === 3) {
          scene.fog = new THREE.FogExp2(0x181824, 0.018); // Summer Lavender Gray
        } else if (currentAct === 4) {
          scene.fog = new THREE.FogExp2(0x1a0508, 0.018); // Autumn Crimson
        } else {
          scene.fog = new THREE.FogExp2(0x0a0c16, 0.012); // Polaris Deep Space
        }

        blueLight.intensity = 2.5;
        greenLight.intensity = 2.5;
        goldLight.intensity = currentAct === 5 ? 5.0 : 1.5;

        // --- 1. Animate Winter (Act 1): Ice crystals and Phosphor Grid ---
        const isWinter = currentAct === 1;
        iceGroup.visible = true;
        iceMat.opacity = isWinter ? 0.9 : 0.2;
        digitalGrid.visible = isWinter;
        (digitalGrid.material as THREE.Material).opacity = isWinter
          ? 0.45 + Math.sin(elapsedTime * 2) * 0.1
          : 0.0;

        iceMeshes.forEach((crystal) => {
          crystal.rotation.x += crystal.userData.rotSpeedX;
          crystal.rotation.y += crystal.userData.rotSpeedY;
          crystal.userData.swayPhase += 0.02;
          crystal.position.x += Math.sin(crystal.userData.swayPhase) * 0.015;
          crystal.position.y -= crystal.userData.fallSpeed;
          if (crystal.position.y < -35) crystal.position.y = 35;
        });

        // --- 2. Animate Spring (Act 2): Petals and Cooking Embers ---
        const isSpring = currentAct === 2;
        petalGroup.visible = true;
        petalMatMatcha.opacity = isSpring ? 0.95 : 0.3;
        petalMatCyan.opacity = isSpring ? 0.95 : 0.3;
        emberPoints.visible = true;
        emberMat.opacity = isSpring ? 0.9 : 0.15;

        petalMeshes.forEach((petal) => {
          petal.rotation.x += petal.userData.rotSpeedX;
          petal.rotation.y += petal.userData.rotSpeedY;
          petal.rotation.z += petal.userData.rotSpeedZ;
          petal.userData.swayPhase += 0.02;
          petal.position.x += Math.sin(petal.userData.swayPhase) * 0.025;
          petal.position.y += isSpring ? petal.userData.driftSpeedY : -petal.userData.driftSpeedY * 0.5;
          if (petal.position.y > 35) petal.position.y = -35;
          if (petal.position.y < -35) petal.position.y = 35;
        });

        // Sizzling Embers upward jump
        const emberPos = emberGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < emberCount; i++) {
          const i3 = i * 3;
          emberPos[i3 + 1] += emberSpeeds[i];
          if (emberPos[i3 + 1] > 20) {
            emberPos[i3 + 1] = -20;
            emberPos[i3] = (Math.random() - 0.5) * 35;
          }
        }
        emberGeometry.attributes.position.needsUpdate = true;

        // --- 3. Animate Summer (Act 3): Resonant Torus & Dual Energy ---
        const isSummer = currentAct === 3;
        summerGroup.visible = true;
        torusMat.opacity = isSummer ? 0.75 : 0.2;
        innerRingMat.opacity = isSummer ? 0.6 : 0.15;

        const pulseScale = 1 + Math.sin(elapsedTime * 1.6) * 0.08;
        summerGroup.scale.set(pulseScale, pulseScale, pulseScale);
        resonantTorus.rotation.z += 0.008;
        innerTorus.rotation.y += 0.012;

        streamLavenderPoints.rotation.z = elapsedTime * 0.35;
        streamBluePoints.rotation.z = -elapsedTime * 0.35;

        // --- 4. Animate Autumn (Act 4): Leaves + Highway Streaks + Moscow Snow ---
        const isAutumn = currentAct === 4;
        autumnGroup.visible = true;
        leafMatRed.opacity = isAutumn ? 0.92 : 0.25;
        streakMatRed.opacity = isAutumn ? 0.9 : 0.15;
        streakMatYellow.opacity = isAutumn ? 0.9 : 0.15;

        leafMeshes.forEach((leaf) => {
          leaf.rotation.x += leaf.userData.rotX;
          leaf.rotation.y += leaf.userData.rotY;
          leaf.userData.sway += 0.025;
          leaf.position.x += Math.sin(leaf.userData.sway) * 0.03;
          leaf.position.y -= leaf.userData.fallSpeed;
          if (leaf.position.y < -35) leaf.position.y = 35;
        });

        // Fast highway streaks
        streakMeshes.forEach((streak) => {
          streak.position.z += streak.userData.speed;
          if (streak.position.z > 25) {
            streak.position.z = -45;
          }
        });

        // Moscow slow snow drift
        const snowPos = moscowSnowGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < moscowSnowCount; i++) {
          const i3 = i * 3;
          snowPos[i3 + 1] -= 0.035;
          snowPos[i3] -= 0.015; // Gentle diagonal drift
          if (snowPos[i3 + 1] < -30) {
            snowPos[i3 + 1] = 30;
            snowPos[i3] = (Math.random() - 0.5) * 55;
          }
        }
        moscowSnowGeom.attributes.position.needsUpdate = true;

        // --- 5. Animate Polaris (Act 5): Star Centerpiece & Compass ---
        const isPolaris = currentAct === 5;
        polarisCore.rotation.y += 0.008;
        polarisCore.rotation.x += 0.005;
        wireCage.rotation.y -= 0.006;
        wireCage.rotation.z += 0.004;

        ring1.rotation.z += 0.012;
        ring2.rotation.x += 0.009;
        ring3.rotation.y += 0.007;

        const starPulse = 1 + Math.sin(elapsedTime * 2.2) * (isPolaris ? 0.1 : 0.03);
        polarisCore.scale.set(starPulse, starPulse, starPulse);
        wireCage.scale.set(starPulse, starPulse, starPulse);

        constellationMat.opacity = isPolaris ? 0.75 + Math.sin(elapsedTime * 2) * 0.2 : 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // Cleanup on Unmount
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose all geometries and materials
      starGeometry.dispose();
      starMaterial.dispose();
      iceGeom.dispose();
      iceMat.dispose();
      digitalGrid.geometry.dispose();
      (digitalGrid.material as THREE.Material).dispose();
      petalGeom.dispose();
      petalMatMatcha.dispose();
      petalMatCyan.dispose();
      emberGeometry.dispose();
      emberMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      innerRingGeom.dispose();
      innerRingMat.dispose();
      streamLavenderGeom.dispose();
      streamBlueGeom.dispose();
      leafGeom.dispose();
      leafMatRed.dispose();
      leafMatAmber.dispose();
      streakCylGeom.dispose();
      streakMatRed.dispose();
      streakMatYellow.dispose();
      moscowSnowGeom.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      constellationGeom.dispose();
      constellationMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
