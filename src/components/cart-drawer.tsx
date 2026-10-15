"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { money } from "@/lib/products";
import { site } from "@/lib/site";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid size-11 place-items-center rounded-full border border-white/20 text-ivory hover:border-gold/70 hover:text-gold"
    >
      <ShoppingBag className="size-5" aria-hidden="true" />
      {count > 0 ? (
        <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">{count}</span>
      ) : null}
    </button>
  );
}

export function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, remove } = useCart();
  const toFree = Math.max(0, site.promo.minimum - subtotal);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full bg-popover sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-3xl">Your cart</SheetTitle>
          <SheetDescription>Review your order, then send it to the shop. Nothing is charged here.</SheetDescription>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start gap-4 px-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button className="h-11 rounded-full px-6" render={<Link href="/shop" onClick={() => setOpen(false)} />}>Browse the shop</Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-4">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4">
                  <div className="relative size-[4.5rem] overflow-hidden rounded-xl bg-night">
                    <Image src={product.images[0]} alt="" fill sizes="72px" className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/shop/${product.slug}`} onClick={() => setOpen(false)} className="font-heading text-lg leading-tight hover:text-gold">{product.name}</Link>
                      <button type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(product.slug)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {product.unique ? <span className="text-xs text-muted-foreground">One of one</span> : <QtyStepper value={qty} onChange={(v) => setQty(product.slug, v)} label={product.name} />}
                      <span className="text-sm tabular-nums">{money(product.price * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 border-t border-white/10 p-4">
              <p className="text-xs leading-relaxed text-gold-soft">
                {toFree > 0 ? `Add ${money(toFree)} more for free shipping with code “${site.promo.code}”.` : `You qualify for free shipping with code “${site.promo.code}”.`}
              </p>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-3xl">{money(subtotal)}</span>
              </div>
              <Button className="h-12 rounded-full" render={<Link href="/checkout" onClick={() => setOpen(false)} />}>Review order</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
