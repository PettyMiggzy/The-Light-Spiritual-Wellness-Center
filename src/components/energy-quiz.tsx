"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { questions, results, type Energy } from "@/lib/quiz";

export function EnergyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Energy[]>([]);

  const done = step >= questions.length;
  let result = null as (typeof results)[Energy] | null;
  if (done) {
    const tally: Record<string, number> = {};
    answers.forEach((a) => (tally[a] = (tally[a] ?? 0) + 1));
    const top = (Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "rest") as Energy;
    result = results[top];
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-card/80 p-8 sm:p-10">
      {!done ? (
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Question {step + 1} of {questions.length}</p>
          <div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
          <h3 className="mt-6 text-4xl leading-tight">{questions[step].q}</h3>
          <ul className="mt-6 grid gap-3">
            {questions[step].options.map((o) => (
              <li key={o.label}>
                <button type="button" onClick={() => { setAnswers([...answers, o.e]); setStep(step + 1); }} className="w-full rounded-2xl border border-white/15 px-5 py-4 text-left text-lg transition-colors hover:border-gold hover:bg-gold/10">{o.label}</button>
              </li>
            ))}
          </ul>
        </div>
      ) : result ? (
        <div aria-live="polite">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Your energy right now</p>
          <h3 className="mt-3 text-5xl leading-tight">{result.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-ivory/90">{result.blurb}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button className="h-13 rounded-full px-7 text-base" render={<Link href={`/services/${result.slug}`} />}>{result.cta}</Button>
            <Button variant="outline" className="h-13 rounded-full border-white/40 bg-transparent px-7 text-base text-ivory hover:bg-white/10 hover:text-ivory" onClick={() => { setStep(0); setAnswers([]); }}>Take it again</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">A little reflection, just for fun.</p>
        </div>
      ) : null}
    </div>
  );
}
