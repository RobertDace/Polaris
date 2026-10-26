import * as THREE from "three";
import { Station, StationContext } from "./types";
import { worldBridge } from "../WorldBridge";

export class Station3Summer implements Station {
  public id = 3;
  public name = "Musim Panas Titik Hadap";
  public position = new THREE.Vector3(-4.5, 0.4, -35);
  public lookAt = new THREE.Vector3(-4.5, 0.4, -35);

  public group: THREE.Group;
  private coreGroup: THREE.Group;
  private coreMesh!: THREE.Mesh;
  private outerTorus!: THREE.Mesh;
  private innerTorus!: THREE.Mesh;
  private doubtStream!: THREE.Points;
  private gritStream!: THREE.Points;
  private centerLight!: THREE.PointLight;

  private perspectiveMode: "fear" | "grit" = "grit";
  private perspectiveBlend: number = 1.0; // 0 for fear, 1 for grit
  private unsubscribers: Array<() => void> = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.coreGroup = new THREE.Group();
  }

  public init(ctx: StationContext): void {
    // 1. Central Faceted Crystal Core
    const coreGeom = new THREE.OctahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    this.coreMesh = new THREE.Mesh(coreGeom, coreMat);
    this.coreGroup.add(this.coreMesh);

    // 2. Resonant Outer Torus
    const outerTorusGeom = new THREE.TorusGeometry(4.2, 0.08, 16, 70);
    const outerTorusMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    this.outerTorus = new THREE.Mesh(outerTorusGeom, outerTorusMat);
    this.coreGroup.add(this.outerTorus);

    // 3. Inner Tilted Ring
    const innerTorusGeom = new THREE.TorusGeometry(3.0, 0.06, 16, 60);
    const innerTorusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    this.innerTorus = new THREE.Mesh(innerTorusGeom, innerTorusMat);
    this.innerTorus.rotation.x = Math.PI / 2.8;
    this.coreGroup.add(this.innerTorus);

    // 4. Center State Point Light
    this.centerLight = new THREE.PointLight(0x38bdf8, 3.0, 15);
    this.coreGroup.add(this.centerLight);

    // 5. Dual Energy Streams (Lavender Doubt vs Blue Grit)
    const count = 40;
    const doubtGeom = new THREE.BufferGeometry();
    const doubtPos = new Float32Array(count * 3);
    const gritGeom = new THREE.BufferGeometry();
    const gritPos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.6 + Math.random() * 0.8;
      const i3 = i * 3;

      doubtPos[i3] = Math.cos(angle) * radius - 1.5;
      doubtPos[i3 + 1] = Math.sin(angle) * (radius * 0.35);
      doubtPos[i3 + 2] = (Math.random() - 0.5) * 2;

      gritPos[i3] = Math.cos(-angle) * radius + 1.5;
      gritPos[i3 + 1] = Math.sin(-angle) * (radius * 0.35);
      gritPos[i3 + 2] = (Math.random() - 0.5) * 2;
    }

    doubtGeom.setAttribute("position", new THREE.BufferAttribute(doubtPos, 3));
    gritGeom.setAttribute("position", new THREE.BufferAttribute(gritPos, 3));

    this.doubtStream = new THREE.Points(
      doubtGeom,
      new THREE.PointsMaterial({ color: 0xc084fc, size: 0.9, transparent: true, opacity: 0.85 })
    );
    this.gritStream = new THREE.Points(
      gritGeom,
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.9, transparent: true, opacity: 0.85 })
    );
    this.coreGroup.add(this.doubtStream);
    this.coreGroup.add(this.gritStream);

    this.group.add(this.coreGroup);

    // 6. Listen to perspective switch
    const unsub = worldBridge.on("conflict:perspective", (mode: "fear" | "grit") => {
      this.perspectiveMode = mode;
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

    // Smoothly blend perspective mode
    const targetBlend = this.perspectiveMode === "grit" ? 1.0 : 0.0;
    this.perspectiveBlend += (targetBlend - this.perspectiveBlend) * 0.08;

    // Rotate core and rings
    this.coreMesh.rotation.y += 0.012;
    this.coreMesh.rotation.x += 0.008;

    this.outerTorus.rotation.z += 0.009;
    this.innerTorus.rotation.y -= 0.014;

    this.doubtStream.rotation.z = elapsed * 0.45;
    this.gritStream.rotation.z = -elapsed * 0.45;

    // Pulse core
    const pulse = 1 + Math.sin(elapsed * 2.0) * 0.08;
    this.coreMesh.scale.set(pulse, pulse, pulse);

    // Color interpolation for perspective shift
    const mat = this.coreMesh.material as THREE.MeshPhysicalMaterial;
    if (this.perspectiveBlend > 0.5) {
      mat.color.setHex(0x38bdf8); // Grit blue
      mat.emissive.setHex(0x0284c7);
      this.centerLight.color.setHex(0x38bdf8);
      (this.gritStream.material as THREE.PointsMaterial).opacity = 0.95;
      (this.doubtStream.material as THREE.PointsMaterial).opacity = 0.35;
    } else {
      mat.color.setHex(0x7c3aed); // Amethyst fear
      mat.emissive.setHex(0x4c1d95);
      this.centerLight.color.setHex(0xa855f7);
      (this.gritStream.material as THREE.PointsMaterial).opacity = 0.35;
      (this.doubtStream.material as THREE.PointsMaterial).opacity = 0.95;
    }
  }

  public dispose(): void {
    this.unsubscribers.forEach((u) => u());
  }
}
