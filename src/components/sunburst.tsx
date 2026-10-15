import { cn } from "@/lib/utils";

// Rounded so the server and browser agree on the last digits.
const pt = (n: number) => Math.round(n * 100) / 100;

/** A small sunburst-and-crescent mark echoing the shop's logo. */
export function Sunburst({ className }: { className?: string }) {
  const rays = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-9", className)} fill="none" stroke="currentColor" strokeLinecap="round">
      {rays.map((i) => {
        const a = (i / rays.length) * Math.PI * 2;
        const long = i % 2 === 0;
        const r1 = long ? 20 : 22;
        const r2 = long ? 30 : 27;
        return (
          <line
            key={i}
            x1={pt(32 + Math.cos(a) * r1)}
            y1={pt(32 + Math.sin(a) * r1)}
            x2={pt(32 + Math.cos(a) * r2)}
            y2={pt(32 + Math.sin(a) * r2)}
            strokeWidth={long ? 1.4 : 1}
          />
        );
      })}
      <path d="M38 16a16 16 0 1 0 0 32 12.5 12.5 0 0 1 0-32Z" strokeWidth="1.5" />
    </svg>
  );
}
