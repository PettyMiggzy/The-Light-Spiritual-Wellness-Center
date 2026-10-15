"use client";

import { useEffect, useState } from "react";

const SYNODIC = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
const notes = [
  "A blank page. Set an intention.",
  "Momentum builds. Take the first step.",
  "Decide, then act.",
  "Refine and trust the process.",
  "Peak light. Celebrate and release.",
  "Share what you have learned.",
  "Let go of what is finished.",
  "Rest. Reset. Make room.",
];

export function phaseFor(date: Date) {
  const days = ((date.getTime() - NEW_MOON) / 86400000) % SYNODIC;
  const age = days < 0 ? days + SYNODIC : days;
  const frac = age / SYNODIC;
  return { age, frac, index: Math.floor(((frac + 1 / 16) % 1) * 8), lit: (1 - Math.cos(frac * Math.PI * 2)) / 2 };
}

export function MoonPhase() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) return <div className="h-40" />;
  const { frac, index, lit } = phaseFor(now);
  // The terminator is an ellipse whose x-radius shrinks to 0 at the quarters.
  const k = Math.cos(frac * Math.PI * 2);
  const waxing = frac < 0.5;
  const rx = Math.abs(k) * 40;
  const litOnRight = waxing;
  const path = `M50 10 A40 40 0 0 ${litOnRight ? 1 : 0} 50 90 A${rx} 40 0 0 ${(k > 0) === litOnRight ? 0 : 1} 50 10Z`;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="size-28 shrink-0 drop-shadow-[0_0_24px_rgba(243,223,168,0.45)]" role="img" aria-label={`${names[index]}, about ${Math.round(lit * 100)} percent lit`}>
        <circle cx="50" cy="50" r="40" fill="#161d52" stroke="rgba(243,223,168,0.35)" />
        <path d={path} fill="#f6ecc9" />
      </svg>
      <div>
        <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">The moon tonight</p>
        <p className="mt-1 font-heading text-4xl">{names[index]}</p>
        <p className="mt-1 text-sm text-muted-foreground">{notes[index]} <span className="opacity-70">({Math.round(lit * 100)}% lit)</span></p>
      </div>
    </div>
  );
}
