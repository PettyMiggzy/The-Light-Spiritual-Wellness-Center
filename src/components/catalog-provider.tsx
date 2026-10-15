"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Product } from "@/lib/products";

type Catalog = { products: Product[]; get: (slug: string) => Product | undefined };
const Ctx = createContext<Catalog | null>(null);

/** Gives client components (cart, shop filters) the live product list loaded on the server. */
export function CatalogProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const value = useMemo<Catalog>(() => ({ products, get: (slug) => products.find((p) => p.slug === slug) }), [products]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalog() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCatalog must be used inside CatalogProvider");
  return c;
}
