"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

type Sort = "featured" | "low" | "high" | "name";

export function ShopBrowser() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => (category === "All" || p.category === category) && (q === "" || `${p.name} ${p.category}`.toLowerCase().includes(q)));
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, sort, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search the shop</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/50" aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search crystals, clusters, spheres..." className="h-12 w-full rounded-full border border-ink/15 bg-white pr-4 pl-11 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-iris" />
        </label>
        <label className="flex items-center gap-3 text-sm text-ink/70">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-12 rounded-full border border-ink/15 bg-white px-4 text-ink">
            <option value="featured">Featured</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="rail mt-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button key={item} type="button" aria-pressed={item === category} onClick={() => setCategory(item)} className={cn("shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors", item === category ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink hover:border-ink")}>
            {item}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink/60" aria-live="polite">{shown.length} {shown.length === 1 ? "piece" : "pieces"}</p>
      {shown.length === 0 ? (
        <p className="mt-8 text-ink/70">Nothing matches that. Try another category or search.</p>
      ) : (
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((product, i) => (<ProductCard key={product.slug} product={product} priority={i < 4} />))}
        </ul>
      )}
    </div>
  );
}
