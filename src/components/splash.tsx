"use client";

import { useEffect, useRef, useState } from "react";
import { Starfield } from "@/components/starfield";

const rays = Array.from({ length: 36 }, (_, i) => i);
const q = (n: number) => Math.round(n * 100) / 100;

/**
 * The site opens in darkness. Your pointer is a beam of light that reveals the mark, the name and the stars.
 * Click or tap to flood the screen with light. Plays once per visit on the home page.
 */
export function Splash() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.splash !== "pending") { setDone(true); return; }
    const root = rootRef.current!;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let W = window.innerWidth, H = window.innerHeight;
    let tx = W * 0.2, ty = H * 0.75, x = tx, y = ty, r = Math.min(W, H) * (coarse ? 0.3 : 0.26);
    let lastMove = 0, raf = 0, entering = false, enterStart = 0, enterFrom = r;
    const t0 = performance.now();
    const baseR = r;

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; lastMove = performance.now(); };
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; };
    const enter = () => {
      if (entering) return;
      entering = true; enterStart = performance.now(); enterFrom = r;
      try { sessionStorage.setItem("light-splash", "1"); } catch { /* ignore */ }
    };
    (window as unknown as { __enterLight?: () => void }).__enterLight = enter;

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      if (!entering) {
        // Until the visitor moves, the beam wanders on its own and finds the mark.
        if (now - lastMove > 1400 && (lastMove === 0 || coarse)) {
          const k = Math.min(1, t / 2.6);
          tx = W * (0.2 + 0.3 * k) + Math.sin(t * 0.9) * W * 0.12 * (1 - k * 0.7);
          ty = H * (0.75 - 0.27 * k) + Math.cos(t * 0.7) * H * 0.08 * (1 - k * 0.7);
        }
        x += (tx - x) * 0.11; y += (ty - y) * 0.11;
        r += (baseR * (1 + 0.05 * Math.sin(t * 2.2)) - r) * 0.1;
        if (t > 1.4) setReady(true);
      } else {
        const k = Math.min(1, (now - enterStart) / 1100);
        const e = 1 - Math.pow(1 - k, 3);
        r = enterFrom + (Math.hypot(W, H) * 1.3 - enterFrom) * e;
        x += (W / 2 - x) * 0.08; y += (H / 2 - y) * 0.08;
        if (k >= 1) {
          delete html.dataset.splash;
          setDone(true);
          return;
        }
      }
      root.style.setProperty("--x", `${x}px`);
      root.style.setProperty("--y", `${y}px`);
      root.style.setProperty("--r", `${r}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("resize", onResize);
    const onKey = () => enter();
    window.addEventListener("keydown", onKey);
    // Never trap anyone: open by itself after a while.
    const auto = window.setTimeout(enter, 14000);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(auto); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerdown", onMove); window.removeEventListener("resize", onResize); window.removeEventListener("keydown", onKey); };
  }, []);

  if (done) return null;

  return (
    <div id="splash" ref={rootRef} className="fixed inset-0 z-[100] cursor-none bg-black [--r:240px] [--x:20vw] [--y:75vh]" role="dialog" aria-label="Welcome to The Light" onPointerUp={() => (window as unknown as { __enterLight?: () => void }).__enterLight?.()}>
      {/* The world that only the beam shows */}
      <div className="absolute inset-0 grid place-items-center bg-night">
        <Starfield />
        <div className="relative text-center">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="mx-auto size-56 text-gold sm:size-72" fill="none" stroke="currentColor" strokeLinecap="round">
            {rays.map((i) => {
              const a = (i / rays.length) * Math.PI * 2; const long = i % 2 === 0;
              const r1 = long ? 64 : 68, r2 = long ? 96 : 84;
              return <line key={i} x1={q(100 + Math.cos(a) * r1)} y1={q(100 + Math.sin(a) * r1)} x2={q(100 + Math.cos(a) * r2)} y2={q(100 + Math.sin(a) * r2)} strokeWidth={long ? 1.6 : 1.1} />;
            })}
            <path d="M112 50a50 50 0 1 0 0 100 39 39 0 0 1 0-100Z" strokeWidth="2" />
          </svg>
          <p className="mt-6 font-heading text-4xl tracking-[0.35em] text-ivory sm:text-6xl">THE LIGHT</p>
          <p className="mt-2 font-heading text-xl text-gold-soft italic sm:text-2xl">spiritual wellness center</p>
          <p className={`mt-8 text-xs tracking-[0.3em] text-gold uppercase transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>Click to enter the light</p>
        </div>
      </div>
      {/* Darkness with a hole where the beam points */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ WebkitMaskImage: "radial-gradient(circle at var(--x) var(--y), transparent 0, transparent calc(var(--r) * 0.25), rgba(0,0,0,0.88) calc(var(--r) * 0.7), #000 var(--r))", maskImage: "radial-gradient(circle at var(--x) var(--y), transparent 0, transparent calc(var(--r) * 0.25), rgba(0,0,0,0.88) calc(var(--r) * 0.7), #000 var(--r))" }} />
      {/* A soft warm glow right at the beam */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ background: "radial-gradient(circle at var(--x) var(--y), rgba(255,236,176,0.22) 0, rgba(232,194,106,0.08) calc(var(--r) * 0.5), transparent calc(var(--r) * 0.95))" }} />
      <button type="button" onClick={(e) => { e.stopPropagation(); (window as unknown as { __enterLight?: () => void }).__enterLight?.(); }} className="absolute right-5 bottom-5 cursor-pointer rounded-full border border-white/50 bg-black/60 px-5 py-2.5 text-sm text-ivory hover:bg-white/10">Enter the light</button>
    </div>
  );
}
