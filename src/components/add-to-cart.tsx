"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { getProduct } from "@/lib/products";

export function AddToCart({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const product = getProduct(slug);
  const { add, lines } = useCart();
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const inCart = lines.find((l) => l.product.slug === slug)?.qty ?? 0;
  const soleInCart = product.unique && inCart >= 1;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {product.unique || compact ? null : <QtyStepper value={qty} onChange={setQty} label={product.name} />}
      <Button type="button" disabled={soleInCart} className="h-11 rounded-full px-6" onClick={() => add(slug, product.unique ? 1 : qty)}>
        <ShoppingBag aria-hidden="true" />
        {soleInCart ? "In your cart" : "Add to cart"}
      </Button>
    </div>
  );
}
