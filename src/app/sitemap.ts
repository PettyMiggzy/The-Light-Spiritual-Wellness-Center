import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.thelightspiritualwellness.com";
  const pages = ["", "/shop", "/services", "/events", "/gift-cards", "/visit"].map((p) => ({ url: `${base}${p}` }));
  return [
    ...pages,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
    ...products.map((p) => ({ url: `${base}/shop/${p.slug}` })),
  ];
}
