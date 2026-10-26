import * as THREE from "three";
import { Station, StationContext } from "./types";
import { worldBridge } from "../WorldBridge";

export class Station1Winter implements Station {
  public id = 1;
  public name = "Musim Dingin 02:14 AM";
  public position = new THREE.Vector3(-4.5, 0.1, 5);
  public lookAt = new THREE.Vector3(-4.5, 0.1, 5);

  public group: THREE.Group;
  private phoneMesh: THREE.Group;
  private screenMaterial!: THREE.MeshBasicMaterial;
  private screenTexture!: THREE.CanvasTexture;
  private phosphorGrid!: THREE.GridHelper;
  private iceCrystals: THREE.Mesh[] = [];
  private unsubscribers: Array<() => void> = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.phoneMesh = new THREE.Group();
  }

  public init(ctx: StationContext): void {
    // 1. OLED Screen Canvas Texture
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx2d = canvas.getContext("2d");

    if (ctx2d) {
      // Midnight gradient background
      const grad = ctx2d.createLinearGradient(0, 0, 512, 1024);
      grad.addColorStop(0, "#051329");
      grad.addColorStop(0.5, "#030712");
      grad.addColorStop(1, "#071A0E");
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, 512, 1024);

      // Status Bar
      ctx2d.fillStyle = "#94a3b8";
      ctx2d.font = "bold 26px sans-serif";
      ctx2d.fillText("02:14", 45, 60);

      // Dynamic Island Pill
      ctx2d.fillStyle = "#000000";
      ctx2d.beginPath();
      ctx2d.roundRect(196, 30, 120, 36, 18);
      ctx2d.fill();

      // Battery & Signal
      ctx2d.fillStyle = "#94a3b8";
      ctx2d.fillRect(425, 42, 35, 18);
      ctx2d.fillRect(460, 47, 4, 8);

      // Top Bar (Naiqo 🍵)
      ctx2d.fillStyle = "rgba(255,255,255,0.08)";
      ctx2d.fillRect(25, 110, 462, 80);

      ctx2d.fillStyle = "#00C853";
      ctx2d.beginPath();
      ctx2d.arc(65, 150, 14, 0, Math.PI * 2);
      ctx2d.fill();

      ctx2d.fillStyle = "#ffffff";
      ctx2d.font = "bold 30px sans-serif";
      ctx2d.fillText("Naiqo 🍵", 95, 160);

      // Incoming Bubble
      ctx2d.fillStyle = "rgba(0, 200, 83, 0.22)";
      ctx2d.beginPath();
      ctx2d.roundRect(30, 230, 370, 95, 20);
      ctx2d.fill();

      ctx2d.fillStyle = "#ffffff";
      ctx2d.font = "24px sans-serif";
      ctx2d.fillText("belum tidur kah kamu?", 55, 275);
      ctx2d.fillStyle = "#6ee7b7";
      ctx2d.font = "18px monospace";
      ctx2d.fillText("02:14 AM", 310, 310);

      // Outgoing Bubble
      ctx2d.fillStyle = "rgba(0, 71, 255, 0.35)";
      ctx2d.beginPath();
      ctx2d.roundRect(150, 360, 330, 90, 20);
      ctx2d.fill();

      ctx2d.fillStyle = "#ffffff";
      ctx2d.font = "24px sans-serif";
      ctx2d.fillText("blm kenapa?", 180, 405);
      ctx2d.fillStyle = "#93c5fd";
      ctx2d.font = "18px monospace";
      ctx2d.fillText("02:15 AM ✓✓", 370, 435);
    }

    this.screenTexture = new THREE.CanvasTexture(canvas);
    this.screenTexture.generateMipmaps = false;
    this.screenTexture.minFilter = THREE.LinearFilter;

    // 2. 3D Smartphone Body
    const phoneMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.2,
    });
    const phoneGeom = new THREE.BoxGeometry(2.4, 4.8, 0.18);
    const bodyMesh = new THREE.Mesh(phoneGeom, phoneMat);
    this.phoneMesh.add(bodyMesh);

    // Front OLED Screen
    this.screenMaterial = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
    });
    const screenGeom = new THREE.PlaneGeometry(2.25, 4.6);
    const screenMesh = new THREE.Mesh(screenGeom, this.screenMaterial);
    screenMesh.position.z = 0.095;
    this.phoneMesh.add(screenMesh);

    // Camera bump on back
    const bumpGeom = new THREE.BoxGeometry(1.0, 1.0, 0.08);
    const bumpMesh = new THREE.Mesh(bumpGeom, phoneMat);
    bumpMesh.position.set(-0.55, 1.7, -0.1);
    this.phoneMesh.add(bumpMesh);

    // Rotation & Scale for Station 1 view
    this.phoneMesh.rotation.set(-0.08, 0.45, -0.04);
    this.phoneMesh.scale.set(0.72, 0.72, 0.72);
    this.group.add(this.phoneMesh);

    // 3. Phosphor Perspective Floor Grid
    this.phosphorGrid = new THREE.GridHelper(50, 22, 0x0047ff, 0x1e293b);
    this.phosphorGrid.position.set(0, -6, 0);
    (this.phosphorGrid.material as THREE.Material).transparent = true;
    (this.phosphorGrid.material as THREE.Material).opacity = 0.45;
    this.group.add(this.phosphorGrid);

    // 4. Floating Ice Octahedrons
    const iceGeom = new THREE.OctahedronGeometry(0.65, 0);
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.7,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < 28; i++) {
      const mesh = new THREE.Mesh(iceGeom, iceMat);
      mesh.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 18
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const s = Math.random() * 0.6 + 0.3;
      mesh.scale.set(s, s * 1.3, s);
      this.group.add(mesh);
      this.iceCrystals.push(mesh);
    }

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

    // Gentle floating breathing for phone
    this.phoneMesh.position.y = Math.sin(elapsed * 1.4) * 0.12;
    this.phoneMesh.rotation.y = 0.35 + Math.sin(elapsed * 0.8) * 0.08;
    this.phoneMesh.rotation.x = -0.1 + Math.cos(elapsed * 0.7) * 0.04;

    // Slowly rotate ice crystals
    for (let i = 0; i < this.iceCrystals.length; i++) {
      const c = this.iceCrystals[i];
      c.rotation.x += 0.008;
      c.rotation.y += 0.012;
    }
  }

  public dispose(): void {
    this.unsubscribers.forEach((u) => u());
    if (this.screenTexture) this.screenTexture.dispose();
    this.screenMaterial.dispose();
  }
}
