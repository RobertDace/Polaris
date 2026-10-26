import * as THREE from "three";
import { ActId } from "../WorldBridge";

interface ParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  phase: number;
  speed: number;
  type: number; // 0: ambient flake, 1: ember/streak, 2: core halo
}

export class MorphParticleSystem {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private count: number = 1400;

  private positions: Float32Array;
  private colors: Float32Array;
  private particles: ParticleData[] = [];

  // Current visual interpolation values
  private currentAct: ActId = 1;
  private actProgress: number = 0; // 0 (Hero) to 1 (Act 5)
  private warpFactor: number = 0;
  private whatIfBlend: number = 0;

  // Cached color palettes for zero garbage collection
  private colorTarget = new THREE.Color();
  private currentColor = new THREE.Color();

  constructor() {
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);

    // Generate soft circular glow sprite for particles
    const spriteTexture = this.createCircleTexture();

    this.material = new THREE.PointsMaterial({
      size: 1.15,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Initialize particles across the corridor
    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 50;
      const z = Math.random() * 45 - 20;

      this.positions[i3] = x;
      this.positions[i3 + 1] = y;
      this.positions[i3 + 2] = z;

      // Initial Winter palette (ice blue & white)
      this.colors[i3] = 0.58;
      this.colors[i3 + 1] = 0.77;
      this.colors[i3 + 2] = 0.99;

      this.particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        vz: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.015,
        type: i % 4,
      });
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.points = new THREE.Points(this.geometry, this.material);
  }

  private createCircleTexture(): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.35, "rgba(255, 255, 255, 0.7)");
      grad.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0.0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  public setAct(act: ActId): void {
    this.currentAct = act;
  }

  public setProgress(progress: number): void {
    this.actProgress = THREE.MathUtils.clamp(progress, 0, 1);
  }

  public setWarp(warpFactor: number): void {
    this.warpFactor = warpFactor;
  }

  public setWhatIf(blend: number): void {
    this.whatIfBlend = blend;
  }

  public update(delta: number, elapsed: number, cameraZ: number): void {
    const pos = this.positions;
    const col = this.colors;

    // Determine seasonal stage from progress (0: Hero, ~0.2: Act 1, ~0.4: Act 2, ~0.6: Act 3, ~0.8: Act 4, ~1.0: Act 5)
    const p = this.actProgress;

    // Dynamic seasonal center Z follows the camera corridor closely
    const corridorCenterZ = THREE.MathUtils.lerp(35, -80, p);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const part = this.particles[i];
      part.phase += 0.025;

      let targetR = 1;
      let targetG = 1;
      let targetB = 1;

      // -------------------------------------------------------------
      // 1. BEHAVIOR MORPHING BASED ON SEASON PROGRESS
      // -------------------------------------------------------------
      if (p < 0.28) {
        // --- BABAK 1: MUSIM DINGIN (Crystalline Ice Flakes Drifting Down) ---
        // Downward gentle falling
        pos[i3 + 1] -= part.speed * 1.2;
        pos[i3] += Math.sin(part.phase) * 0.02;

        // Wrap within Act 1 bounds
        if (pos[i3 + 1] < -25) pos[i3 + 1] = 25;
        if (pos[i3 + 2] < 5 || pos[i3 + 2] > 40) {
          pos[i3 + 2] = THREE.MathUtils.lerp(10, 35, Math.random());
        }

        // Palette: Ice Blue (#93C5FD), Indigo (#1E3A8A), White
        if (part.type === 0) {
          targetR = 0.58; targetG = 0.77; targetB = 0.99; // #93C5FD
        } else if (part.type === 1) {
          targetR = 0.12; targetG = 0.23; targetB = 0.54; // #1E3A8A
        } else {
          targetR = 0.95; targetG = 0.98; targetB = 1.0;
        }

      } else if (p >= 0.28 && p < 0.48) {
        // --- BABAK 2: MUSIM SEMI (Thermal Upward Lift: Matcha Petals & Sizzling Golden Embers) ---
        // Warm thermal updraft!
        pos[i3 + 1] += part.speed * 1.5;
        pos[i3] += Math.cos(part.phase) * 0.035;
        pos[i3 + 2] += Math.sin(part.phase * 0.8) * 0.02;

        // Wrap around Spring bounds
        if (pos[i3 + 1] > 25) pos[i3 + 1] = -25;
        if (pos[i3 + 2] < -15 || pos[i3 + 2] > 15) {
          pos[i3 + 2] = THREE.MathUtils.lerp(-12, 10, Math.random());
        }

        // Palette: Matcha Green (#00C853), Cyan (#00F5D4), Golden Kitchen Ember (#FFD700)
        if (part.type === 0) {
          targetR = 0.0; targetG = 0.78; targetB = 0.33; // Matcha #00C853
        } else if (part.type === 1) {
          targetR = 0.0; targetG = 0.96; targetB = 0.83; // Cyan #00F5D4
        } else {
          targetR = 1.0; targetG = 0.84; targetB = 0.0; // Ember Gold #FFD700
        }

      } else if (p >= 0.48 && p < 0.68) {
        // --- BABAK 3: MUSIM PANAS (Resonant Stillness & Lavender Torus Orbit) ---
        // Slow floating suspended in quiet space
        const angle = part.phase * 0.5;
        const radius = 6 + (part.type * 2.5);
        pos[i3] = Math.cos(angle) * radius;
        pos[i3 + 1] = Math.sin(angle) * (radius * 0.4) + Math.sin(elapsed * 1.2 + part.phase) * 0.4;
        pos[i3 + 2] += (corridorCenterZ - pos[i3 + 2]) * 0.04;

        // Palette: Lavender Doubt (#C084FC), Muted Slate (#94A3B8), Electric Grit (#38BDF8)
        if (part.type === 0) {
          targetR = 0.75; targetG = 0.52; targetB = 0.99; // #C084FC
        } else if (part.type === 1) {
          targetR = 0.22; targetG = 0.74; targetB = 0.97; // #38BDF8
        } else {
          targetR = 0.58; targetG = 0.64; targetB = 0.72; // #94A3B8
        }

      } else if (p >= 0.68 && p < 0.88) {
        // --- BABAK 4: MUSIM GUGUR (Autumn Leaves Falling + Bus Speed Streaks + Moscow Snow) ---
        if (part.type === 0 || part.type === 1) {
          // Falling Red & Amber Autumn Leaves
          pos[i3 + 1] -= part.speed * 1.6;
          pos[i3] += Math.sin(part.phase) * 0.04;
          if (pos[i3 + 1] < -25) pos[i3 + 1] = 25;

          targetR = 1.0; targetG = 0.12; targetB = 0.25; // Crimson #FF1E40
        } else if (part.type === 2) {
          // Highway Night Speed Streaks forward (23 Juni Probolinggo -> Jogja)
          pos[i3 + 2] += 1.2 + (this.warpFactor * 2.5);
          if (pos[i3 + 2] > cameraZ + 5) {
            pos[i3 + 2] = cameraZ - 45;
            pos[i3] = (Math.random() - 0.5) * 35;
            pos[i3 + 1] = -12 + Math.random() * 4;
          }
          targetR = 1.0; targetG = 0.72; targetB = 0.01; // Highway Amber #FFB703
        } else {
          // Moscow Soft Diagonal Snow Drift
          pos[i3 + 1] -= 0.04;
          pos[i3] -= 0.018;
          if (pos[i3 + 1] < -25) pos[i3 + 1] = 25;
          targetR = 0.98; targetG = 0.98; targetB = 1.0;
        }

        if (pos[i3 + 2] < -70 || pos[i3 + 2] > -35) {
          pos[i3 + 2] = THREE.MathUtils.lerp(-65, -40, Math.random());
        }

      } else {
        // --- BABAK 5: POLARIS ABADI (Celestial Stardust Swirling Around the Centerpiece) ---
        const orbitSpeed = elapsed * 0.35 + part.phase;
        const orbitRadius = 8 + (part.type * 4);
        pos[i3] = Math.cos(orbitSpeed) * orbitRadius;
        pos[i3 + 1] = Math.sin(orbitSpeed) * (orbitRadius * 0.6) + Math.sin(part.phase) * 0.5;
        pos[i3 + 2] = -90 + (Math.sin(orbitSpeed * 1.5) * 6);

        // Palette: Pure Polaris Gold (#FFD700), Robit Blue (#0047FF), Naiqo Emerald (#00C853)
        if (part.type === 0 || part.type === 1) {
          targetR = 1.0; targetG = 0.84; targetB = 0.0; // Pure Gold #FFD700
        } else if (part.type === 2) {
          targetR = 0.0; targetG = 0.28; targetB = 1.0; // Robit Blue #0047FF
        } else {
          targetR = 0.0; targetG = 0.78; targetB = 0.33; // Naiqo Matcha #00C853
        }
      }

      // -------------------------------------------------------------
      // 2. OVERRIDES: WARP & WHAT-IF TRANSFORMATION
      // -------------------------------------------------------------
      if (this.warpFactor > 0.05) {
        // Stretch forward in hyperspace
        pos[i3 + 2] += this.warpFactor * 3.5;
        if (pos[i3 + 2] > cameraZ + 5) {
          pos[i3 + 2] = cameraZ - 50;
        }
      }

      if (this.whatIfBlend > 0.05) {
        // In What-If mode, desaturate into cold dark moss teal and compress inward
        targetR = THREE.MathUtils.lerp(targetR, 0.08, this.whatIfBlend);
        targetG = THREE.MathUtils.lerp(targetG, 0.22, this.whatIfBlend);
        targetB = THREE.MathUtils.lerp(targetB, 0.18, this.whatIfBlend);
      }

      // Smooth color lerp per particle
      col[i3] += (targetR - col[i3]) * 0.06;
      col[i3 + 1] += (targetG - col[i3 + 1]) * 0.06;
      col[i3 + 2] += (targetB - col[i3 + 2]) * 0.06;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;

    // Adjust particle size during What-If and Warp
    this.material.size = THREE.MathUtils.lerp(
      1.15 + this.warpFactor * 0.4,
      0.75,
      this.whatIfBlend
    );
  }

  public dispose(): void {
    this.geometry.dispose();
    if (this.material.map) this.material.map.dispose();
    this.material.dispose();
  }
}
