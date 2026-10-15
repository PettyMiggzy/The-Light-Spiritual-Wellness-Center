"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { money, type Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add, lines } = useCart();
  const sole = product.unique && lines.some((l) => l.product.slug === product.slug);
  const sold = Boolean(product.sold);
  return (
    <li className="group flex flex-col">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden rounded-2xl bg-ink">
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw" className={`object-cover transition-opacity duration-500 ${product.images[1] ? "group-hover:opacity-0" : "transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"}`} />
        {product.images[1] ? <Image src={product.images[1]} alt="" fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> : null}
        {sold ? <span className="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold tracking-wide text-ivory uppercase">Sold</span> : product.badge ? <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold tracking-wide text-ink uppercase">{product.badge}</span> : null}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/shop/${product.slug}`} className="font-heading text-xl leading-snug hover:text-iris">{product.name}</Link>
        <p className="mt-1 text-sm text-ink/60">{product.category}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-heading text-2xl">{money(product.price)}</span>
          <button type="button" disabled={sole || sold} onClick={() => add(product.slug)} aria-label={sole ? `${product.name} is in your cart` : `Add ${product.name} to cart`} className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-ivory transition-colors hover:bg-iris disabled:opacity-50">
            <ShoppingBag className="size-4" aria-hidden="true" />
            {sold ? "Sold" : sole ? "In cart" : "Add"}
          </button>
        </div>
      </div>
    </li>
  );
}
