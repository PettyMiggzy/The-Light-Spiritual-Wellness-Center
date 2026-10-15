const preferred = ["Clusters", "Spheres", "Raw Pieces", "Carvings", "Palm-Stones", "Towers & Points", "Rare & Statement Pieces", "Home & Display", "Jewelry", "Gift Boxes & Crystal Kits", "Gifts & Books"];

/** "All" plus the categories in use, in a sensible order. */
export function categoriesFor(products: Array<{ category: string }>) {
  const used = [...new Set(products.map((p) => p.category))];
  used.sort((a, b) => {
    const ia = preferred.indexOf(a), ib = preferred.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  return ["All", ...used];
}
