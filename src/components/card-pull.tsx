"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dailyIndex, deck } from "@/lib/tarot";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const KEY = "light-card-day";

export function CardPull() {
  const [picked, setPicked] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    const day = new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone }).format(new Date());
    setToday(day);
    try {
      const saved = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as { day: string; i: number } | null;
      if (saved && saved.day === day) { setPicked(saved.i); setFlipped(true); }
    } catch { /* ignore */ }
  }, []);

  function pull() {
    let seed = "light";
    try {
      seed = window.localStorage.getItem("light-seed") ?? String(Math.random());
      window.localStorage.setItem("light-seed", seed);
    } catch { seed = String(Math.random()); }
    const i = dailyIndex(seed, today);
    setPicked(i);
    window.setTimeout(() => setFlipped(true), 120);
    try { window.localStorage.setItem(KEY, JSON.stringify({ day: today, i })); } catch { /* ignore */ }
  }

  const card = picked != null ? deck[picked] : null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-[18rem] [perspective:1200px] sm:max-w-xs">
        <button type="button" onClick={() => (picked == null ? pull() : undefined)} aria-label={card ? `Your card: ${card.name}` : "Draw your card for today"} className={cn("relative block aspect-[2/3] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gold", picked == null && "hover:-translate-y-1 transition-transform")}>
          <div className={cn("absolute inset-0 transition-transform duration-[900ms] [transform-style:preserve-3d] motion-reduce:duration-0", flipped && "[transform:rotateY(180deg)]")}>
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-gold/50 shadow-[0_0_60px_rgba(232,194,106,0.25)] [backface-visibility:hidden]">
              <Image src="/images/art/cardback.jpg" alt="" fill sizes="320px" className="object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between rounded-2xl border-2 border-gold bg-[#10163f] p-5 text-center shadow-[0_0_60px_rgba(232,194,106,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="font-heading text-2xl tracking-[0.3em] text-gold">{card?.n}</p>
              <p aria-hidden="true" className="text-8xl leading-none text-gold-soft drop-shadow-[0_0_20px_rgba(243,223,168,0.6)]">{card?.glyph}</p>
              <div>
                <p className="font-heading text-3xl leading-tight">{card?.name}</p>
                <p className="mt-2 text-[11px] tracking-[0.2em] text-gold-soft uppercase">{card?.keywords}</p>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Card of the day</p>
        {card && flipped ? (
          <div aria-live="polite">
            <h3 className="mt-4 text-5xl leading-tight sm:text-6xl">{card.name}</h3>
            <p className="mt-5 max-w-lg text-xl leading-relaxed text-ivory/90">{card.message}</p>
            <p className="mt-3 text-xs text-muted-foreground">For reflection and entertainment. Your card is saved for today. Come back tomorrow for a new one.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-13 rounded-full px-7 text-base" render={<Link href="/services/tarot-reading" />}>Book a full reading</Button>
              <Button variant="outline" className="h-13 rounded-full border-white/40 bg-transparent px-7 text-base text-ivory hover:bg-white/10 hover:text-ivory" render={<Link href="/services" />}>Explore sessions</Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="mt-4 text-5xl leading-tight text-balance sm:text-6xl">Take a breath. Pull one card.</h3>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">Quiet your mind, think of what you want clarity on, then tap the card to turn it over.</p>
            <Button className="mt-8 h-14 rounded-full px-8 text-base" onClick={pull}>Draw my card</Button>
          </div>
        )}
      </div>
    </div>
  );
}
