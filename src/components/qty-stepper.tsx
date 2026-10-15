"use client";

import { Minus, Plus } from "lucide-react";
import { maxQty } from "@/lib/products";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex h-10 items-center rounded-full border border-white/20" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" aria-label="One fewer" disabled={value <= 1} onClick={() => onChange(value - 1)} className="grid size-10 place-items-center text-gold-soft/80 hover:text-gold disabled:opacity-30">
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="One more" disabled={value >= maxQty} onClick={() => onChange(value + 1)} className="grid size-10 place-items-center text-gold-soft/80 hover:text-gold disabled:opacity-30">
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
