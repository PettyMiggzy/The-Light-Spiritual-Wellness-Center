const motes = Array.from({ length: 22 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = (n: number) => ((seed * (n + 3)) % 1000) / 1000;
  return { left: `${r(1) * 100}%`, top: `${20 + r(2) * 75}%`, size: 4 + r(3) * 9, delay: r(4) * 6, dur: 5 + r(5) * 5 };
});

/** Slow drifting points of light. Decorative; stops under reduced motion. */
export function Motes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size, ["--delay" as string]: `${m.delay}s`, ["--d" as string]: `${m.dur}s` }}
        />
      ))}
    </div>
  );
}
