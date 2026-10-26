"use client";

import React, { useEffect, useRef } from "react";
import { WorldEngine } from "../world/WorldEngine";
import { worldBridge, ActId } from "../world/WorldBridge";

interface ThreeWorldCanvasProps {
  currentAct: ActId;
}

export default function ThreeWorldCanvas({ currentAct }: ThreeWorldCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<WorldEngine | null>(null);

  // Sync currentAct prop to worldBridge
  useEffect(() => {
    worldBridge.setAct(currentAct);
  }, [currentAct]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Single Persistent WorldEngine Instance
    const engine = new WorldEngine(container);
    engineRef.current = engine;

    // Set initial camera position along spline
    const actProgressMap: Record<ActId, number> = {
      1: 0.2,
      2: 0.4,
      3: 0.6,
      4: 0.8,
      5: 1.0,
      "what-if": 1.0,
    };
    engine.setScrollProgress(actProgressMap[currentAct] ?? 0.2);

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
