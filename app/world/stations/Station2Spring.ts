import * as THREE from "three";
import { Station, StationContext } from "./types";
import { worldBridge } from "../WorldBridge";

export class Station2Spring implements Station {
  public id = 2;
  public name = "Musim Semi Aglio Olio";
  public position = new THREE.Vector3(4.5, -0.4, -15);
  public lookAt = new THREE.Vector3(4.5, -0.4, -15);

  public group: THREE.Group;
  private panGroup: THREE.Group;
  private oilMesh!: THREE.Mesh;
  private flameLight!: THREE.PointLight;
  private ingredientsMeshes: THREE.Mesh[] = [];
  private steamPoints!: THREE.Points;
  private steamPositions!: Float32Array;
  private steamCount = 35;

  private isCooking: boolean = false;
  private cookingIntensity: number = 0;
  private unsubscribers: Array<() => void> = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.panGroup = new THREE.Group();
  }

  public init(ctx: StationContext): void {
    // 1. Skillet Body
    const skilletMat = new THREE.MeshStandardMaterial({
      color: 0x1f242c,
      metalness: 0.85,
      roughness: 0.3,
    });

    const bodyGeom = new THREE.CylinderGeometry(2.4, 2.0, 0.65, 36);
    const bodyMesh = new THREE.Mesh(bodyGeom, skilletMat);
    this.panGroup.add(bodyMesh);

    // Rim
    const rimGeom = new THREE.TorusGeometry(2.4, 0.09, 16, 45);
    const rimMesh = new THREE.Mesh(rimGeom, skilletMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.32;
    this.panGroup.add(rimMesh);

    // Handle
    const handleGeom = new THREE.CylinderGeometry(0.14, 0.17, 2.9, 16);
    const handleMesh = new THREE.Mesh(handleGeom, skilletMat);
    handleMesh.rotation.z = Math.PI / 2;
    handleMesh.position.set(3.6, 0.22, 0);
    this.panGroup.add(handleMesh);

    // 2. Translucent Golden Olive Oil Layer
    const oilGeom = new THREE.CylinderGeometry(2.1, 2.1, 0.05, 32);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.75,
    });
    this.oilMesh = new THREE.Mesh(oilGeom, oilMat);
    this.oilMesh.position.y = 0.18;
    this.panGroup.add(this.oilMesh);

    // 3. Garlic & Chili Flakes in Pan
    const garlicGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 12);
    const garlicMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.4,
    });
    const chiliGeom = new THREE.BoxGeometry(0.2, 0.08, 0.04);
    const chiliMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.3,
    });

    for (let i = 0; i < 8; i++) {
      const g = new THREE.Mesh(garlicGeom, garlicMat);
      g.position.set(
        (Math.random() - 0.5) * 2.4,
        0.22,
        (Math.random() - 0.5) * 2.4
      );
      g.rotation.y = Math.random() * Math.PI;
      this.panGroup.add(g);
      this.ingredientsMeshes.push(g);

      const c = new THREE.Mesh(chiliGeom, chiliMat);
      c.position.set(
        (Math.random() - 0.5) * 2.5,
        0.22,
        (Math.random() - 0.5) * 2.5
      );
      c.rotation.y = Math.random() * Math.PI;
      this.panGroup.add(c);
      this.ingredientsMeshes.push(c);
    }

    // 4. Stove Flame Light under skillet
    this.flameLight = new THREE.PointLight(0xff5500, 2.0, 8);
    this.flameLight.position.set(0, -0.6, 0);
    this.panGroup.add(this.flameLight);

    // 5. Sizzling Steam / Micro-ember particles
    const steamGeom = new THREE.BufferGeometry();
    this.steamPositions = new Float32Array(this.steamCount * 3);
    for (let i = 0; i < this.steamCount; i++) {
      const i3 = i * 3;
      this.steamPositions[i3] = (Math.random() - 0.5) * 2.6;
      this.steamPositions[i3 + 1] = Math.random() * 2 + 0.3;
      this.steamPositions[i3 + 2] = (Math.random() - 0.5) * 2.6;
    }
    steamGeom.setAttribute("position", new THREE.BufferAttribute(this.steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    this.steamPoints = new THREE.Points(steamGeom, steamMat);
    this.panGroup.add(this.steamPoints);

    // Slight angle so user sees the inside of the pan
    this.panGroup.rotation.set(0.35, -0.4, 0.1);
    this.group.add(this.panGroup);

    // 6. Listen to cooking events from DOM
    const unsub = worldBridge.on("cooking:state", ({ isCooking }: { isCooking: boolean }) => {
      this.isCooking = isCooking;
    });
    this.unsubscribers.push(unsub);

    ctx.scene.add(this.group);
  }

  public enter(): void {
    this.group.visible = true;
  }

  public exit(): void {
    this.group.visible = false;
  }

  public update(delta: number, elapsed: number, localProgress: number): void {
    if (!this.group.visible) return;

    // Smooth cooking intensity transition
    const targetIntensity = this.isCooking ? 1.0 : 0.0;
    this.cookingIntensity += (targetIntensity - this.cookingIntensity) * 0.1;

    // Gentle hover
    this.panGroup.position.y = Math.sin(elapsed * 1.5) * 0.1;
    this.panGroup.rotation.y = -0.4 + Math.sin(elapsed * 0.6) * 0.06;

    // Flame flicker
    this.flameLight.intensity = THREE.MathUtils.lerp(
      1.5 + Math.sin(elapsed * 10) * 0.3,
      5.0 + Math.sin(elapsed * 25) * 1.2,
      this.cookingIntensity
    );

    // Sizzling oil glow
    (this.oilMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(
      0.3,
      1.2,
      this.cookingIntensity
    );

    // Animate steam / ember pops
    const pos = this.steamPositions;
    const speed = 0.04 + this.cookingIntensity * 0.12;
    for (let i = 0; i < this.steamCount; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += speed;
      pos[i3] += Math.sin(elapsed * 5 + i) * 0.01;
      if (pos[i3 + 1] > 3.5) {
        pos[i3 + 1] = 0.3;
        pos[i3] = (Math.random() - 0.5) * 2.6;
        pos[i3 + 2] = (Math.random() - 0.5) * 2.6;
      }
    }
    this.steamPoints.geometry.attributes.position.needsUpdate = true;
  }

  public dispose(): void {
    this.unsubscribers.forEach((u) => u());
  }
}
