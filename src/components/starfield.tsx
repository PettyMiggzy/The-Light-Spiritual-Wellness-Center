"use client";

import { useEffect, useRef } from "react";

/** A slow twinkling starfield with an occasional shooting star. Static under reduced motion. */
export function Starfield({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null, nextShoot = 3000;
    let stars: Array<{ x: number; y: number; r: number; p: number; s: number; gold: boolean }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(220, (W * H) / 5500));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, p: Math.random() * 6.28, s: Math.random() * 1.2 + 0.4, gold: Math.random() < 0.18 }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = reduce ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * s.s + s.p));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.gold ? "#f3dfa8" : "#ffffff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce) {
        if (!shoot && t > nextShoot) {
          shoot = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.35, vx: 7 + Math.random() * 4, vy: 3 + Math.random() * 2, life: 1 };
          nextShoot = t + 6000 + Math.random() * 7000;
        }
        if (shoot) {
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14);
          g.addColorStop(0, `rgba(255,246,214,${shoot.life})`); g.addColorStop(1, "rgba(255,246,214,0)");
          ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14); ctx.stroke();
          shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= 0.018;
          if (shoot.life <= 0 || shoot.x > W + 50 || shoot.y > H + 50) shoot = null;
        }
        raf = requestAnimationFrame(draw);
      }
    };
    resize();
    if (reduce) draw(0); else raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
