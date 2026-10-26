import * as THREE from "three";
import { worldBridge, ActId } from "./WorldBridge";
import { MorphParticleSystem } from "./systems/MorphParticleSystem";
import { Station1Winter } from "./stations/Station1Winter";
import { Station2Spring } from "./stations/Station2Spring";
import { Station3Summer } from "./stations/Station3Summer";
import { Station4Autumn } from "./stations/Station4Autumn";

export class WorldEngine {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number = 0;
  private clock: THREE.Clock;
  private isDestroyed: boolean = false;
  private isPaused: boolean = false;

  // Unified Morphing Seasonal Particle System
  private morphParticles: MorphParticleSystem;

  // Stations for Acts 1 to 4
  private station1: Station1Winter;
  private station2: Station2Spring;
  private station3: Station3Summer;
  private station4: Station4Autumn;

  // Camera Paths & Navigation
  private cameraCurve: THREE.CatmullRomCurve3;
  private lookAtCurve: THREE.CatmullRomCurve3;
  private currentProgress: number = 0;
  private targetProgress: number = 0;
  private currentAct: ActId = 1;

  // Mouse Parallax
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;

  // Warp & WhatIf States
  private warpFactor: number = 0;
  private isWarping: boolean = false;
  private isWhatIf: boolean = false;
  private whatIfBlend: number = 0; // 0 normal, 1 fully what-if

  // Lights
  private ambientLight: THREE.AmbientLight;
  private blueLight: THREE.PointLight;
  private greenLight: THREE.PointLight;
  private goldLight: THREE.PointLight;
  private targetFogColor: THREE.Color = new THREE.Color(0x050814);
  private currentFogColor: THREE.Color = new THREE.Color(0x050814);

  // Background Cosmic Starfield
  private starField: THREE.Points;
  private starGeometry: THREE.BufferGeometry;
  private starPositions: Float32Array;
  private starBasePositions: Float32Array;
  private starCount = 2200;

  // Eternal Polaris Star in the Distance (Station 5 Destination at z = -90)
  private polarisGroup: THREE.Group;
  private polarisCore: THREE.Mesh;
  private wireCage: THREE.Mesh;
  private ringRobit: THREE.Mesh;
  private ringNaiqo: THREE.Mesh;
  private ringGold: THREE.Mesh;
  private constellationLines: THREE.LineSegments;

  // Listeners cleanup
  private unsubscribers: Array<() => void> = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    // 1. Scene & Persistent Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050814, 0.012);

    // 2. Camera Setup
    const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 4, 44);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(this.ambientLight);

    // Robit Blue Point Light
    this.blueLight = new THREE.PointLight(0x0047ff, 2.5, 90);
    this.blueLight.position.set(-16, 12, 10);
    this.scene.add(this.blueLight);

    // Naiqo Matcha Green Point Light
    this.greenLight = new THREE.PointLight(0x00c853, 2.5, 90);
    this.greenLight.position.set(16, -10, 10);
    this.scene.add(this.greenLight);

    // Eternal Golden Polaris Beacon
    this.goldLight = new THREE.PointLight(0xffd700, 3.5, 120);
    this.goldLight.position.set(0, 0, -90);
    this.scene.add(this.goldLight);

    // 5. Spline Curves (Camera Flight Journey)
    // Points correspond to: [0: Hero, 1: Act 1 Winter, 2: Act 2 Spring, 3: Act 3 Summer, 4: Act 4 Autumn, 5: Act 5 Polaris]
    const camPoints = [
      new THREE.Vector3(0, 2.5, 36),     // Hero (looking down cosmic corridor)
      new THREE.Vector3(0, 0, 16),       // Act 1 (02:14 AM quiet room - phone on left flank)
      new THREE.Vector3(0, 0, -4),       // Act 2 (Warm kitchen - skillet on right flank)
      new THREE.Vector3(0, 0, -24),      // Act 3 (Resonant torus - left flank)
      new THREE.Vector3(0, 0, -44),      // Act 4 (Highway streaks - right flank)
      new THREE.Vector3(0, 0, -68),      // Act 5 (Grand Arrival in front of Polaris)
    ];
    this.cameraCurve = new THREE.CatmullRomCurve3(camPoints, false, "catmullrom", 0.35);

    const lookPoints = [
      new THREE.Vector3(0, 0, -90),       // Hero: Look directly at Polaris in distance
      new THREE.Vector3(0, 0, -70),       // Act 1: Look straight forward down cosmic corridor
      new THREE.Vector3(0, 0, -75),       // Act 2: Look straight forward down cosmic corridor
      new THREE.Vector3(0, 0, -80),       // Act 3: Look straight forward down cosmic corridor
      new THREE.Vector3(0, 0, -85),       // Act 4: Look straight forward down cosmic corridor
      new THREE.Vector3(0, 0, -90),       // Act 5: Direct gaze into glowing Polaris Core
    ];
    this.lookAtCurve = new THREE.CatmullRomCurve3(lookPoints, false, "catmullrom", 0.35);

    // 6. Eternal Polaris Star (Positioned at destination z = -90)
    this.polarisGroup = new THREE.Group();
    this.polarisGroup.position.set(0, 0, -90);

    // Golden Faceted Icosahedron Core
    const coreGeom = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xff9900,
      emissiveIntensity: 1.4,
      roughness: 0.15,
      metalness: 0.85,
    });
    this.polarisCore = new THREE.Mesh(coreGeom, coreMat);
    this.polarisGroup.add(this.polarisCore);

    // Outer Starlight Wireframe Cage
    const wireGeom = new THREE.IcosahedronGeometry(5.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    this.wireCage = new THREE.Mesh(wireGeom, wireMat);
    this.polarisGroup.add(this.wireCage);

    // Ring 1: Robit Electric Blue
    const r1Geom = new THREE.TorusGeometry(7.8, 0.1, 16, 100);
    const r1Mat = new THREE.MeshBasicMaterial({ color: 0x0047ff, transparent: true, opacity: 0.85 });
    this.ringRobit = new THREE.Mesh(r1Geom, r1Mat);
    this.ringRobit.rotation.x = Math.PI / 3;
    this.polarisGroup.add(this.ringRobit);

    // Ring 2: Naiqo Matcha Green
    const r2Geom = new THREE.TorusGeometry(9.6, 0.1, 16, 100);
    const r2Mat = new THREE.MeshBasicMaterial({ color: 0x00c853, transparent: true, opacity: 0.85 });
    this.ringNaiqo = new THREE.Mesh(r2Geom, r2Mat);
    this.ringNaiqo.rotation.y = Math.PI / 4;
    this.polarisGroup.add(this.ringNaiqo);

    // Ring 3: Destination Pure Gold
    const r3Geom = new THREE.TorusGeometry(11.4, 0.12, 16, 100);
    const r3Mat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.95 });
    this.ringGold = new THREE.Mesh(r3Geom, r3Mat);
    this.ringGold.rotation.z = Math.PI / 6;
    this.polarisGroup.add(this.ringGold);

    // Constellation lines pointing towards Polaris
    const lineVertices = [
      new THREE.Vector3(-18, 12, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(18, 10, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -16, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-10, -12, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(12, -14, 0),
      new THREE.Vector3(0, 0, 0),
    ];
    const constellationGeom = new THREE.BufferGeometry().setFromPoints(lineVertices);
    const constellationMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.35,
    });
    this.constellationLines = new THREE.LineSegments(constellationGeom, constellationMat);
    this.polarisGroup.add(this.constellationLines);

    this.scene.add(this.polarisGroup);

    // 7. Cosmic Starfield
    this.starGeometry = new THREE.BufferGeometry();
    this.starPositions = new Float32Array(this.starCount * 3);
    this.starBasePositions = new Float32Array(this.starCount * 3);
    const starColors = new Float32Array(this.starCount * 3);

    const palette = [
      new THREE.Color(0xffffff), // Starlight white
      new THREE.Color(0x93c5fd), // Ice blue
      new THREE.Color(0x0047ff), // Robit Blue
      new THREE.Color(0x00c853), // Naiqo Matcha
      new THREE.Color(0x00f5d4), // Cyan
      new THREE.Color(0xffd700), // Polaris Gold
    ];

    for (let i = 0; i < this.starCount; i++) {
      const i3 = i * 3;
      // Spread across the flight corridor (-110 <= z <= 55)
      const x = (Math.random() - 0.5) * 140;
      const y = (Math.random() - 0.5) * 140;
      const z = (Math.random() - 0.5) * 170 - 25;

      this.starPositions[i3] = x;
      this.starPositions[i3 + 1] = y;
      this.starPositions[i3 + 2] = z;

      this.starBasePositions[i3] = x;
      this.starBasePositions[i3 + 1] = y;
      this.starBasePositions[i3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;
    }

    this.starGeometry.setAttribute("position", new THREE.BufferAttribute(this.starPositions, 3));
    this.starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.starField = new THREE.Points(this.starGeometry, starMaterial);
    this.scene.add(this.starField);

    // 8. Seasonal Morphing Particle System
    this.morphParticles = new MorphParticleSystem();
    this.scene.add(this.morphParticles.points);

    // 9. Initialize 3D Seasonal Stations
    const stationCtx = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    };

    this.station1 = new Station1Winter();
    this.station1.init(stationCtx);

    this.station2 = new Station2Spring();
    this.station2.init(stationCtx);

    this.station3 = new Station3Summer();
    this.station3.init(stationCtx);

    this.station4 = new Station4Autumn();
    this.station4.init(stationCtx);

    // 10. Bind Events
    this.initEvents();

    // 11. Start Unified Animation Loop
    this.render();
  }

  private initEvents(): void {
    // Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    this.unsubscribers.push(() => window.removeEventListener("mousemove", handleMouseMove));

    // Window Resize
    const handleResize = () => {
      if (this.isDestroyed) return;
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener("resize", handleResize);
    this.unsubscribers.push(() => window.removeEventListener("resize", handleResize));

    // Visibility change (pause render on background tab to save battery)
    const handleVisibility = () => {
      this.isPaused = document.hidden;
      if (!this.isPaused) {
        this.clock.getDelta(); // reset delta clock
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    this.unsubscribers.push(() => document.removeEventListener("visibilitychange", handleVisibility));

    // WorldBridge Subscriptions
    const unsubAct = worldBridge.on("act:change", (act: ActId) => {
      this.currentAct = act;
      this.updateActTheme(act);

      const actProgressMap: Record<ActId, number> = {
        1: 0.2,
        2: 0.4,
        3: 0.6,
        4: 0.8,
        5: 1.0,
        "what-if": 1.0,
      };

      if (actProgressMap[act] !== undefined) {
        this.targetProgress = actProgressMap[act];
        this.morphParticles.setProgress(this.targetProgress);
      }
    });
    this.unsubscribers.push(unsubAct);

    const unsubWarp = worldBridge.on("warp:state", ({ isWarping }: { isWarping: boolean }) => {
      this.isWarping = isWarping;
    });
    this.unsubscribers.push(unsubWarp);

    const unsubWhatIf = worldBridge.on("whatif:state", (isHolding: boolean) => {
      this.isWhatIf = isHolding;
    });
    this.unsubscribers.push(unsubWhatIf);
  }

  // Set normalized progress along the camera spline (0: Hero, 1: Act 5 Polaris)
  public setScrollProgress(progress: number): void {
    this.targetProgress = THREE.MathUtils.clamp(progress, 0, 1);
    this.morphParticles.setProgress(this.targetProgress);
  }

  private updateActTheme(act: ActId): void {
    this.morphParticles.setAct(act);

    if (act === "what-if") {
      this.targetFogColor.setHex(0x050c0c);
      return;
    }

    switch (act) {
      case 1:
        this.targetFogColor.setHex(0x050816); // Midnight blue
        this.blueLight.color.setHex(0x0047ff);
        this.greenLight.color.setHex(0x00c853);
        break;
      case 2:
        this.targetFogColor.setHex(0x02241d); // Spring emerald
        this.blueLight.color.setHex(0x00f5d4);
        this.greenLight.color.setHex(0x00c853);
        break;
      case 3:
        this.targetFogColor.setHex(0x1a1628); // Lavender gray
        this.blueLight.color.setHex(0x38bdf8);
        this.greenLight.color.setHex(0xc084fc);
        break;
      case 4:
        this.targetFogColor.setHex(0x1f060a); // Autumn red/amber
        this.blueLight.color.setHex(0xff1e40);
        this.greenLight.color.setHex(0xffb703);
        break;
      case 5:
        this.targetFogColor.setHex(0x090b16); // Polaris starlight cosmos
        this.blueLight.color.setHex(0x0047ff);
        this.greenLight.color.setHex(0x00c853);
        break;
    }
  }

  private render = (): void => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.render);

    if (this.isPaused) return;

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsed = this.clock.getElapsedTime();

    // 1. Mouse Lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // 2. Warp Factor Lerp
    const targetWarp = this.isWarping ? 1.0 : 0.0;
    this.warpFactor += (targetWarp - this.warpFactor) * 0.1;

    // 3. WhatIf Blend Lerp
    const targetWhatIf = this.isWhatIf ? 1.0 : 0.0;
    this.whatIfBlend += (targetWhatIf - this.whatIfBlend) * 0.08;

    // 4. Smooth Camera Spline Interpolation
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.065;
    const progress = THREE.MathUtils.clamp(this.currentProgress, 0, 1);

    const baseCamPos = this.cameraCurve.getPointAt(progress);
    const baseLookAt = this.lookAtCurve.getPointAt(progress);

    // Dynamic FOV for Hyperspace Warp
    this.camera.fov = 45 + this.warpFactor * 20 - this.whatIfBlend * 5;
    this.camera.updateProjectionMatrix();

    // Apply mouse parallax with dampened translation and lookAt, honoring prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallaxIntensityX = prefersReducedMotion ? 0.3 : 2.8;
    const parallaxIntensityY = prefersReducedMotion ? 0.2 : 1.8;
    const effectiveWarp = prefersReducedMotion ? 0 : this.warpFactor;

    this.camera.position.set(
      baseCamPos.x + this.mouseX * parallaxIntensityX,
      baseCamPos.y + this.mouseY * parallaxIntensityY,
      baseCamPos.z - effectiveWarp * 8
    );

    this.camera.lookAt(
      baseLookAt.x + this.mouseX * (prefersReducedMotion ? 0.1 : 0.8),
      baseLookAt.y + this.mouseY * (prefersReducedMotion ? 0.1 : 0.6),
      baseLookAt.z
    );

    // 5. Fog Smooth Color & Density Lerp
    this.currentFogColor.lerp(this.targetFogColor, 0.05);
    (this.scene.fog as THREE.FogExp2).color.copy(this.currentFogColor);
    (this.scene.fog as THREE.FogExp2).density = THREE.MathUtils.lerp(
      0.012,
      0.038,
      this.whatIfBlend
    );

    // 6. Animate Background Starfield (drift + hyperspace stretch)
    this.starField.rotation.y = elapsed * (0.015 + this.warpFactor * 0.12);
    this.starField.rotation.x = elapsed * (0.01 + this.warpFactor * 0.06);

    if (this.warpFactor > 0.02) {
      const positions = this.starGeometry.attributes.position.array as Float32Array;
      const speed = this.warpFactor * 4.2;
      for (let i = 0; i < this.starCount; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += speed;
        if (positions[i3 + 2] > 55) {
          positions[i3 + 2] = -120;
        }
      }
      this.starGeometry.attributes.position.needsUpdate = true;
    }

    // 7. Animate Eternal Polaris Centerpiece
    this.polarisCore.rotation.y += 0.008;
    this.polarisCore.rotation.x += 0.005;
    this.wireCage.rotation.y -= 0.006;
    this.wireCage.rotation.z += 0.004;

    this.ringRobit.rotation.z += 0.012 * (1 - this.whatIfBlend * 0.7);
    this.ringNaiqo.rotation.x += 0.009 * (1 - this.whatIfBlend * 0.7);
    this.ringGold.rotation.y += 0.007 * (1 - this.whatIfBlend * 0.7);

    // When WhatIf is active, rings separate outwards and dim; when normal, they align and pulse warmly
    const ringSeparation = 1 + this.whatIfBlend * 0.45;
    this.ringRobit.scale.set(ringSeparation, ringSeparation, ringSeparation);
    this.ringNaiqo.scale.set(ringSeparation, ringSeparation, ringSeparation);
    this.ringGold.scale.set(ringSeparation, ringSeparation, ringSeparation);

    const isNearPolaris = progress > 0.75;
    const pulseRate = isNearPolaris ? 2.4 : 1.4;
    const pulseMagnitude = isNearPolaris ? 0.12 : 0.05;
    const starPulse = (1 + Math.sin(elapsed * pulseRate) * pulseMagnitude) * (1 - this.whatIfBlend * 0.3);
    this.polarisCore.scale.set(starPulse, starPulse, starPulse);
    this.wireCage.scale.set(starPulse, starPulse, starPulse);

    // Light modulation
    this.goldLight.intensity = THREE.MathUtils.lerp(
      isNearPolaris ? 4.8 : 2.0,
      0.4,
      this.whatIfBlend
    );

    // 8. Animate Seasonal Morphing Particles
    this.morphParticles.setWarp(this.warpFactor);
    this.morphParticles.setWhatIf(this.whatIfBlend);
    this.morphParticles.update(delta, elapsed, this.camera.position.z);

    // 9. Update Active Stations with Distance Visibility
    this.station1.group.visible = progress < 0.38;
    this.station2.group.visible = progress >= 0.15 && progress < 0.58;
    this.station3.group.visible = progress >= 0.35 && progress < 0.78;
    this.station4.group.visible = progress >= 0.55 && progress < 0.96;

    this.station1.update(delta, elapsed, progress);
    this.station2.update(delta, elapsed, progress);
    this.station3.update(delta, elapsed, progress);
    this.station4.update(delta, elapsed, progress);

    this.renderer.render(this.scene, this.camera);
  };

  public dispose(): void {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);

    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];

    // Dispose Geometries and Materials
    this.starGeometry.dispose();
    (this.starField.material as THREE.Material).dispose();

    this.polarisCore.geometry.dispose();
    (this.polarisCore.material as THREE.Material).dispose();

    this.wireCage.geometry.dispose();
    (this.wireCage.material as THREE.Material).dispose();

    this.ringRobit.geometry.dispose();
    (this.ringRobit.material as THREE.Material).dispose();

    this.ringNaiqo.geometry.dispose();
    (this.ringNaiqo.material as THREE.Material).dispose();

    this.ringGold.geometry.dispose();
    (this.ringGold.material as THREE.Material).dispose();

    this.constellationLines.geometry.dispose();
    (this.constellationLines.material as THREE.Material).dispose();

    // Dispose Morph Particle System
    this.morphParticles.dispose();

    // Dispose Stations
    this.station1.dispose();
    this.station2.dispose();
    this.station3.dispose();
    this.station4.dispose();

    this.renderer.dispose();
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  // Getters for child stations in upcoming step
  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }
}
