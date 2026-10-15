import { unstable_cache } from "next/cache";
import { sql } from "@/lib/db";
import { events as seedEvents, type EventItem } from "@/lib/events";
import { seedProducts, type Product } from "@/lib/products";

type ProductRow = { slug: string; name: string; price: number; category: string; images: string[]; badge: string | null; description: string; is_unique: boolean; sold: boolean; hidden: boolean };

function rowToProduct(r: ProductRow): Product {
  return { slug: r.slug, name: r.name, price: r.price, category: r.category, images: r.images ?? [], badge: (r.badge as Product["badge"]) ?? undefined, description: r.description || undefined, unique: r.is_unique, sold: r.sold };
}

/** Every product shoppers can see. Falls back to the starter catalog until the admin has added products. */
export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const db = sql();
    if (!db) return seedProducts;
    try {
      const rows = (await db`SELECT slug, name, price, category, images, badge, description, is_unique, sold, hidden FROM products ORDER BY position ASC, created_at DESC`) as ProductRow[];
      if (rows.length === 0) return seedProducts;
      return rows.filter((r) => !r.hidden).map(rowToProduct);
    } catch {
      return seedProducts;
    }
  },
  ["catalog-products"],
  { tags: ["catalog"], revalidate: 300 },
);

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export const getEvents = unstable_cache(
  async (): Promise<EventItem[]> => {
    const db = sql();
    if (!db) return seedEvents;
    try {
      const rows = (await db`SELECT id, title, to_char(date, 'YYYY-MM-DD') AS date, time, blurb, cta FROM events ORDER BY date ASC`) as Array<{ id: string; title: string; date: string; time: string | null; blurb: string; cta: string }>;
      if (rows.length === 0) return seedEvents;
      return rows.map((r) => ({ id: r.id, title: r.title, date: r.date, time: r.time ?? undefined, blurb: r.blurb, cta: r.cta === "rsvp" ? "rsvp" : "tickets" }));
    } catch {
      return seedEvents;
    }
  },
  ["catalog-events"],
  { tags: ["catalog"], revalidate: 300 },
);

export const getSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const db = sql();
    if (!db) return {};
    try {
      const rows = (await db`SELECT key, value FROM settings`) as Array<{ key: string; value: string }>;
      return Object.fromEntries(rows.map((r) => [r.key, r.value]));
    } catch {
      return {};
    }
  },
  ["catalog-settings"],
  { tags: ["catalog"], revalidate: 300 },
);

export async function upcomingEventsList() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  return (await getEvents()).filter((e) => e.date >= today);
}
