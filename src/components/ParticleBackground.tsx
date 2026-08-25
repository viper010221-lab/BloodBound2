"use client";

import { useEffect, useRef } from "react";
import { playLightningSound } from "@/lib/sound";

type Particle = {
  x: number; y: number; size: number; speedY: number; speedX: number;
  opacity: number; flickerSpeed: number; flickerDir: number;
  type: "ember" | "ash" | "spark";
};

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lightningOpacity = 0;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    let nextLightning = Date.now() + rnd(8000, 15000);

    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    const makeParticle = (): Particle => {
      const roll = Math.random();
      const type: Particle["type"] = roll < 0.7 ? "ember" : roll < 0.92 ? "ash" : "spark";
      return {
        x: Math.random() * width, y: Math.random() * height,
        size: type === "spark" ? rnd(4, 8) : type === "ember" ? rnd(1, 3.5) : rnd(0.5, 2),
        speedY: type === "ash" ? rnd(0.2, 0.6) : rnd(0.5, 2),
        speedX: (Math.random() - 0.5) * (type === "ash" ? 0.8 : 0.4),
        opacity: type === "spark" ? rnd(0.6, 1) : rnd(0.2, 0.7),
        flickerSpeed: rnd(0.005, 0.02), flickerDir: Math.random() > 0.5 ? 1 : -1, type,
      };
    };

    const particles: Particle[] = Array.from({ length: 150 }, makeParticle);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();
      if (now >= nextLightning) {
        lightningOpacity = 0.12;
        playLightningSound();
        nextLightning = now + rnd(8000, 15000);
      }
      if (lightningOpacity > 0) {
        ctx.fillStyle = `rgba(180,0,0,${lightningOpacity})`;
        ctx.fillRect(0, 0, width, height);
        lightningOpacity = Math.max(0, lightningOpacity - 0.004);
      }
      particles.forEach((p) => {
        p.y -= p.speedY; p.x += p.speedX;
        p.opacity += p.flickerSpeed * p.flickerDir;
        if (p.opacity > 0.9 || p.opacity < 0.05) p.flickerDir *= -1;
        if (p.y < -10) Object.assign(p, makeParticle(), { y: height + 10, x: Math.random() * width });

        if (p.type === "spark") {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          grad.addColorStop(0, `rgba(255,80,80,${p.opacity})`);
          grad.addColorStop(0.4, `rgba(220,38,38,${p.opacity * 0.6})`);
          grad.addColorStop(1, "rgba(180,0,0,0)");
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grad; ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,200,200,${p.opacity})`; ctx.fill();
        } else if (p.type === "ember") {
          ctx.shadowBlur = p.size * 5; ctx.shadowColor = "#dc2626";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,38,38,${p.opacity})`; ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,160,160,${p.opacity * 0.5})`; ctx.fill();
        }
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.85 }} />;
}
