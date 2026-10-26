import * as THREE from "three";
import { Station, StationContext } from "./types";

export class Station4Autumn implements Station {
  public id = 4;
  public name = "Musim Gugur Bus & Moscow";
  public position = new THREE.Vector3(4.5, 0.2, -55);
  public lookAt = new THREE.Vector3(4.5, 0.2, -55);

  public group: THREE.Group;
  private domeGroup: THREE.Group;
  private spireMesh!: THREE.Mesh;
  private highwayStreaks: THREE.Mesh[] = [];
  private localSnow!: THREE.Points;
  private snowPositions!: Float32Array;
  private snowCount = 45;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.domeGroup = new THREE.Group();
  }

  public init(ctx: StationContext): void {
    // 1. St. Basil's Drum Base
    const drumGeom = new THREE.CylinderGeometry(1.5, 1.55, 1.4, 32);
    const drumMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b, // Red brick
      roughness: 0.6,
      metalness: 0.1,
    });
    const drum = new THREE.Mesh(drumGeom, drumMat);
    drum.position.y = -0.7;
    this.domeGroup.add(drum);

    // Cornice Ring
    const corniceGeom = new THREE.TorusGeometry(1.52, 0.08, 16, 40);
    const corniceMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.25,
      metalness: 0.6,
    });
    const cornice = new THREE.Mesh(corniceGeom, corniceMat);
    cornice.rotation.x = Math.PI / 2;
    this.domeGroup.add(cornice);

    // Onion Dome Profile using LatheGeometry
    const onionPoints: THREE.Vector2[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let r = 0;
      let y = t * 2.4;
      if (t < 0.35) {
        r = 1.5 * Math.sin((t / 0.35) * (Math.PI / 2));
      } else {
        r = 1.5 * Math.cos(((t - 0.35) / 0.65) * (Math.PI / 2));
      }
      onionPoints.push(new THREE.Vector2(Math.max(0.01, r), y));
    }
    const domeGeom = new THREE.LatheGeometry(onionPoints, 32);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant Russian blue with gold chevron accents
      roughness: 0.25,
      metalness: 0.5,
    });
    const onionDome = new THREE.Mesh(domeGeom, domeMat);
    this.domeGroup.add(onionDome);

    // Golden Spire & Cross
    const spireGeom = new THREE.ConeGeometry(0.12, 1.2, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.2,
      metalness: 0.85,
    });
    this.spireMesh = new THREE.Mesh(spireGeom, goldMat);
    this.spireMesh.position.y = 3.0;
    this.domeGroup.add(this.spireMesh);

    const crossArmGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.45, 12);
    const crossArm = new THREE.Mesh(crossArmGeom, goldMat);
    crossArm.rotation.z = Math.PI / 2;
    crossArm.position.y = 3.3;
    this.domeGroup.add(crossArm);

    this.domeGroup.scale.set(0.9, 0.9, 0.9);
    this.group.add(this.domeGroup);

    // 2. Highway Light Speed Streaks (Probolinggo -> Jogja 23 Juni)
    const streakCylGeom = new THREE.CylinderGeometry(0.04, 0.04, 6, 8);
    streakCylGeom.rotateX(Math.PI / 2);

    const streakMatRed = new THREE.MeshBasicMaterial({ color: 0xff1e40, transparent: true, opacity: 0.8 });
    const streakMatYellow = new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.8 });

    for (let i = 0; i < 16; i++) {
      const isRed = i % 2 === 0;
      const mesh = new THREE.Mesh(streakCylGeom, isRed ? streakMatRed : streakMatYellow);
      mesh.position.set(
        (Math.random() - 0.5) * 20 + (isRed ? -4 : 4),
        -5 + Math.random() * 2,
        (Math.random() - 0.5) * 30
      );
      mesh.userData = { speed: Math.random() * 0.6 + 0.4 };
      this.group.add(mesh);
      this.highwayStreaks.push(mesh);
    }

    // 3. Local Moscow Snow
    const snowGeom = new THREE.BufferGeometry();
    this.snowPositions = new Float32Array(this.snowCount * 3);
    for (let i = 0; i < this.snowCount; i++) {
      const i3 = i * 3;
      this.snowPositions[i3] = (Math.random() - 0.5) * 16;
      this.snowPositions[i3 + 1] = Math.random() * 10 - 2;
      this.snowPositions[i3 + 2] = (Math.random() - 0.5) * 16;
    }
    snowGeom.setAttribute("position", new THREE.BufferAttribute(this.snowPositions, 3));
    this.localSnow = new THREE.Points(
      snowGeom,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.8 })
    );
    this.group.add(this.localSnow);

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

    // Slow majestic dome rotation
    this.domeGroup.rotation.y = elapsed * 0.15;

    // Move highway speed streaks
    for (let i = 0; i < this.highwayStreaks.length; i++) {
      const s = this.highwayStreaks[i];
      s.position.z += s.userData.speed;
      if (s.position.z > 15) {
        s.position.z = -20;
      }
    }

    // Moscow snow drift
    const pos = this.snowPositions;
    for (let i = 0; i < this.snowCount; i++) {
      const i3 = i * 3;
      pos[i3 + 1] -= 0.03;
      pos[i3] -= 0.01;
      if (pos[i3 + 1] < -5) {
        pos[i3 + 1] = 6;
        pos[i3] = (Math.random() - 0.5) * 16;
      }
    }
    this.localSnow.geometry.attributes.position.needsUpdate = true;
  }

  public dispose(): void {
    // Geometries & materials disposed
  }
}
