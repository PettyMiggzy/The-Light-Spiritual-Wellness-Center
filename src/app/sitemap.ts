import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";
import { services } from "@/lib/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const base = "https://www.thelightspiritualwellness.com";
  const pages = ["", "/shop", "/services", "/events", "/gift-cards", "/visit"].map((p) => ({ url: `${base}${p}` }));
  return [
    ...pages,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
    ...products.map((p) => ({ url: `${base}/shop/${p.slug}` })),
  ];
}
