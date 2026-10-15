"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, maxQty, type Product } from "@/lib/products";

const KEY = "light-cart-v1";
export type CartLine = { product: Product; qty: number };

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const clean: Record<string, number> = {};
        for (const [slug, qty] of Object.entries(parsed)) {
          const product = getProduct(slug);
          if (product && Number.isInteger(qty) && qty > 0) clean[slug] = Math.min(qty, product.unique ? 1 : maxQty);
        }
        setItems(clean);
      }
    } catch {
      // storage blocked: the cart lasts for this visit only
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const limit = (slug: string) => (getProduct(slug)?.unique ? 1 : maxQty);

  const add = useCallback((slug: string, qty = 1) => {
    if (!getProduct(slug)) return;
    setItems((cur) => ({ ...cur, [slug]: Math.min((cur[slug] ?? 0) + qty, limit(slug)) }));
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((cur) => {
      const next = { ...cur };
      if (qty <= 0) delete next[slug];
      else next[slug] = Math.min(qty, limit(slug));
      return next;
    });
  }, []);
  const remove = useCallback((slug: string) => setQty(slug, 0), [setQty]);
  const clear = useCallback(() => setItems({}), []);

  const value = useMemo<CartState>(() => {
    const lines = Object.entries(items).flatMap(([slug, qty]) => {
      const product = getProduct(slug);
      return product ? [{ product, qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
