import * as THREE from "three";

export interface StationContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export interface Station {
  id: number;
  name: string;
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  init(ctx: StationContext): void;
  enter(): void;
  exit(): void;
  update(delta: number, elapsed: number, localProgress: number): void;
  dispose(): void;
}
