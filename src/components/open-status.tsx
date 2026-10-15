"use client";

import { useEffect, useState } from "react";
import { formatMinutes, hours, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function compute(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: site.timeZone, weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")!.value;
  const hh = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const mm = Number(parts.find((p) => p.type === "minute")!.value);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const minutes = hh * 60 + mm;
  const today = hours.find((h) => h.day === day)!;
  if (today.open != null && minutes >= today.open && minutes < today.close!) {
    return { open: true, text: `Open now · until ${formatMinutes(today.close!)}` };
  }
  if (today.open != null && minutes < today.open) return { open: false, text: `Opens today at ${formatMinutes(today.open)}` };
  for (let i = 1; i <= 7; i++) {
    const next = hours.find((h) => h.day === (day + i) % 7)!;
    if (next.open != null) return { open: false, text: `Opens ${i === 1 ? "tomorrow" : next.label} at ${formatMinutes(next.open)}` };
  }
  return { open: false, text: "Closed" };
}

export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof compute> | null>(null);
  useEffect(() => {
    setStatus(compute());
    const id = window.setInterval(() => setStatus(compute()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!status) return <span className={cn("inline-block h-5", className)} />;
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className={cn("size-2 rounded-full", status.open ? "bg-emerald-400" : "bg-gold-soft/60")} />
      {status.text}
    </span>
  );
}
