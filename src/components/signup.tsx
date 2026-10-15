"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Email capture. If NEXT_PUBLIC_SIGNUP_URL is set (a Formspree, Mailchimp, Klaviyo or any form endpoint that accepts
 * a JSON POST with `email`), subscribers go straight to that list. Otherwise it opens an email to the shop so no
 * sign-up is ever lost.
 */
export function Signup({ tone = "dark", id }: { tone?: "dark" | "light"; id?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const endpoint = process.env.NEXT_PUBLIC_SIGNUP_URL;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState("error");
    if (!endpoint) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Add me to The Light list")}&body=${encodeURIComponent(`Please add me to the list: ${email}`)}`;
      return setState("done");
    }
    setState("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, source: "website" }) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const light = tone === "light";
  return (
    <form id={id} onSubmit={onSubmit} noValidate className="w-full max-w-xl">
      {state === "done" ? (
        <p role="status" className={`rounded-2xl border px-5 py-4 text-lg ${light ? "border-ink/20 text-ink" : "border-gold/40 text-gold-soft"}`}>You are on the list. Watch your inbox for light. ✦</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor={`${id ?? "signup"}-email`}>Email</label>
            <input id={`${id ?? "signup"}-email`} type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }} placeholder="your@email.com" className={`h-14 min-w-0 flex-1 rounded-full border px-6 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold ${light ? "border-ink/25 bg-white text-ink" : "border-white/25 bg-white/5 text-ivory placeholder:text-ivory/50"}`} />
            <Button type="submit" disabled={state === "sending"} className="h-14 rounded-full px-8 text-base">{state === "sending" ? "Joining…" : "Join the list"}</Button>
          </div>
          {state === "error" ? <p role="alert" className="mt-3 text-sm text-destructive">Check your email address and try again.</p> : null}
        </>
      )}
    </form>
  );
}
