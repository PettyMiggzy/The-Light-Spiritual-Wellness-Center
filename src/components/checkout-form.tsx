"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/products";
import { site } from "@/lib/site";

export function CheckoutForm() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"pickup" | "ship">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (lines.length === 0 && !summary) {
    return (
      <div className="rounded-3xl border border-white/10 bg-card p-8">
        <p className="font-heading text-4xl">Your cart is empty.</p>
        <Button className="mt-5 h-12 rounded-full px-6" render={<Link href="/shop" />}>Browse the shop</Button>
      </div>
    );
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Add your name.");
    if (phone.trim().length < 7 && !/^\S+@\S+\.\S+$/.test(email)) return setError("Add a phone number or an email so the shop can reach you.");
    if (method === "ship" && address.trim().length < 8) return setError("Add a shipping address.");
    setError(null);
    setSummary([
      `${site.name} order request`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim() || "n/a"}`,
      `Email: ${email.trim() || "n/a"}`,
      method === "pickup" ? "Pickup in the shop" : `Ship to: ${address.trim()}`,
      "",
      ...lines.map(({ product, qty }) => `${qty} × ${product.name} (${money(product.price)}) = ${money(product.price * qty)}`),
      `Subtotal: ${money(subtotal)}`,
      notes.trim() ? `\nNotes: ${notes.trim()}` : "",
    ].filter((l) => l !== "").join("\n"));
  }

  async function copy() {
    if (!summary) return;
    try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); }
  }

  if (summary) {
    const mail = `mailto:${site.email}?subject=${encodeURIComponent("Order request")}&body=${encodeURIComponent(summary)}`;
    const sms = `sms:${site.phoneTel}?&body=${encodeURIComponent(summary.slice(0, 320))}`;
    return (
      <div className="rounded-3xl border border-white/10 bg-card p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Ready to send</p>
        <h2 className="mt-2 text-4xl">Send this to the shop.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Nothing was sent or charged. Email, text, or copy the note, and the shop will confirm availability, shipping, and payment with you.</p>
        <pre className="mt-5 max-h-80 overflow-auto rounded-2xl border border-white/10 bg-night p-4 text-sm leading-relaxed whitespace-pre-wrap">{summary}</pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="h-12 rounded-full px-6" render={<a href={mail} />}>Email the shop</Button>
          <Button variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-6 text-ivory hover:bg-white/10 hover:text-ivory" render={<a href={sms} />}>Text this</Button>
          <Button variant="secondary" className="h-12 rounded-full px-6" type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</Button>
        </div>
        <div className="mt-5 flex gap-5 text-sm text-muted-foreground">
          <button type="button" className="underline-offset-4 hover:text-ivory hover:underline" onClick={() => setSummary(null)}>Edit the order</button>
          <button type="button" className="underline-offset-4 hover:text-ivory hover:underline" onClick={() => { clear(); setSummary(null); }}>Clear the cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h2 className="text-4xl">Your order</h2>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {lines.map(({ product, qty }) => (
            <li key={product.slug} className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 py-5">
              <div className="relative size-20 overflow-hidden rounded-xl bg-night"><Image src={product.images[0]} alt="" fill sizes="80px" className="object-cover" /></div>
              <div>
                <Link href={`/shop/${product.slug}`} className="font-heading text-xl hover:text-gold">{product.name}</Link>
                <div className="mt-2 flex items-center gap-4">
                  {product.unique ? <span className="text-xs text-muted-foreground">One of one</span> : <QtyStepper value={qty} onChange={(v) => setQty(product.slug, v)} label={product.name} />}
                  <button type="button" onClick={() => remove(product.slug)} className="text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline">Remove</button>
                </div>
              </div>
              <p className="tabular-nums">{money(product.price * qty)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-baseline justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-heading text-4xl">{money(subtotal)}</span></div>
        <p className="mt-3 text-sm text-gold-soft">{site.promo.text}.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid h-fit gap-5 rounded-3xl border border-white/10 bg-card p-8">
        <h2 className="text-4xl">Who is this for?</h2>
        <div className="grid gap-2"><Label htmlFor="c-name">Name</Label><Input id="c-name" autoComplete="name" value={name} className="h-12" onChange={(e) => setName(e.target.value)} /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor="c-phone">Phone</Label><Input id="c-phone" type="tel" autoComplete="tel" value={phone} className="h-12" onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="grid gap-2"><Label htmlFor="c-email">Email</Label><Input id="c-email" type="email" autoComplete="email" value={email} className="h-12" onChange={(e) => setEmail(e.target.value)} /></div>
        </div>
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium">How would you like it?</legend>
          <div className="grid grid-cols-2 gap-3">
            {([["pickup", "Pick up in the shop"], ["ship", "Ship it to me"]] as const).map(([value, label]) => (
              <label key={value} className={`cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm ${method === value ? "border-gold bg-gold/10 text-gold-soft" : "border-white/20"}`}>
                <input type="radio" name="method" value={value} checked={method === value} onChange={() => setMethod(value)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        {method === "ship" ? <div className="grid gap-2"><Label htmlFor="c-address">Shipping address</Label><Textarea id="c-address" value={address} className="min-h-20" onChange={(e) => setAddress(e.target.value)} /></div> : null}
        <div className="grid gap-2"><Label htmlFor="c-notes">Notes</Label><Textarea id="c-notes" value={notes} className="min-h-20" onChange={(e) => setNotes(e.target.value)} /></div>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="h-12 rounded-full">Prepare my order note</Button>
      </form>
    </div>
  );
}
