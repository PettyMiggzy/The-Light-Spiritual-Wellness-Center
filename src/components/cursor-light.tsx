"use client";

import { useEffect, useRef } from "react";

/** A soft gold light that follows the pointer across the site. Desktop mice only; off under reduced motion. */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    let x = -400, y = -400, tx = -400, ty = -400, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.style.opacity = "1"; };
    const leave = () => { el.style.opacity = "0"; };
    const tick = () => { x += (tx - x) * 0.14; y += (ty - y) * 0.14; el.style.transform = `translate(${x - 260}px, ${y - 260}px)`; raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-30 size-[520px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 print:hidden" style={{ background: "radial-gradient(circle, rgba(255,232,170,0.16) 0%, rgba(232,194,106,0.06) 38%, transparent 70%)" }} />;
}
