"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  sway: number;
  swaySpeed: number;
  type?: "circle" | "spark" | "star";
}

interface CosmicCanvasProps {
  currentAct: number | "what-if";
}

export default function CosmicCanvas({ currentAct }: CosmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Palette Generator based on Act
    const getParticleConfig = (act: number | "what-if") => {
      if (act === "what-if") {
        return {
          count: 45,
          colors: ["#134e4a", "#0f2b26", "#164e63", "#064e3b"],
          speedFactor: 0.35,
          directionY: 0.1,
          type: "circle" as const,
        };
      }
      switch (act) {
        case 1:
          return {
            count: 55,
            colors: ["#38bdf8", "#60a5fa", "#93c5fd", "#cbd5e1"],
            speedFactor: 0.45,
            directionY: 0.4, // Snowfall
            type: "circle" as const,
          };
        case 2:
          return {
            count: 65,
            colors: ["#2dd4bf", "#5eead4", "#38bdf8", "#06b6d4"],
            speedFactor: 0.55,
            directionY: -0.2, // Drifting upward underwater bubbles
            type: "circle" as const,
          };
        case 3:
          return {
            count: 40,
            colors: ["#c4b5fd", "#a78bfa", "#94a3b8", "#cbd5e1"],
            speedFactor: 0.25,
            directionY: 0.1, // Slow melancholic dust
            type: "circle" as const,
          };
        case 4:
          return {
            count: 75,
            colors: ["#ef4444", "#f87171", "#f59e0b", "#fbbf24"],
            speedFactor: 0.85,
            directionY: -0.7, // Rising embers / sparks
            type: "spark" as const,
          };
        case 5:
        default:
          return {
            count: 90,
            colors: ["#fbbf24", "#fef08a", "#4ade80", "#86efac", "#e0f2fe"],
            speedFactor: 0.4,
            directionY: 0.05, // Celestial twinkle
            type: "star" as const,
          };
      }
    };

    const config = getParticleConfig(currentAct);
    const particles: Particle[] = [];

    for (let i = 0; i < config.count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * config.speedFactor,
        speedY: (Math.random() - 0.5) * 0.3 + config.directionY,
        opacity: Math.random() * 0.6 + 0.2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        type: config.type,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!reduceMotion) {
          p.sway += p.swaySpeed;
          p.x += p.speedX + Math.sin(p.sway) * 0.4;
          p.y += p.speedY;

          // Gentle mouse repulsion
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }

          // Wrap boundaries
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === "star" && currentAct === 5) {
          // Draw a soft 4-point twinkle star
          ctx.beginPath();
          const r = p.size;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Subtle cross shine for larger stars
          if (p.size > 2.5) {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x - r * 2.5, p.y);
            ctx.lineTo(p.x + r * 2.5, p.y);
            ctx.moveTo(p.x, p.y - r * 2.5);
            ctx.lineTo(p.x, p.y + r * 2.5);
            ctx.stroke();
          }
        } else if (p.type === "spark") {
          // Embers / spark diamond
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size * 1.5);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.lineTo(p.x, p.y + p.size * 1.5);
          ctx.lineTo(p.x - p.size, p.y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Smooth circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentAct]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: currentAct === "what-if" ? 0.45 : 0.8 }}
      aria-hidden="true"
    />
  );
}
