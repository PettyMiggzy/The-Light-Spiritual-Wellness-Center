"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { checkPassword, endSession, isAdmin, startSession } from "@/lib/auth";
import { parseCsv, slugify } from "@/lib/csv";
import { sql } from "@/lib/db";
import { events as seedEvents } from "@/lib/events";
import { seedProducts } from "@/lib/products";

async function guard() {
  if (!(await isAdmin())) redirect("/admin");
  const db = sql();
  if (!db) throw new Error("No database is connected.");
  return db;
}

function refresh() {
  revalidateTag("catalog");
  revalidatePath("/", "layout");
}

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const flag = (f: FormData, k: string) => f.get(k) === "on";

let failures = 0;
export async function loginAction(formData: FormData) {
  await new Promise((r) => setTimeout(r, 600 + Math.min(failures, 6) * 400));
  if (checkPassword(String(formData.get("password") ?? ""))) {
    failures = 0;
    await startSession();
    redirect("/admin");
  }
  failures += 1;
  redirect("/admin?error=1");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin");
}

/** Resize any photo to web size and store it in the database. Returns its URL on this site. */
async function storeImage(db: NonNullable<ReturnType<typeof sql>>, input: Buffer) {
  const jpeg = await sharp(input).rotate().resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  const id = randomBytes(8).toString("hex");
  await db`INSERT INTO images (id, mime, data) VALUES (${id}, 'image/jpeg', ${"\\x" + jpeg.toString("hex")}::bytea)`;
  return `/api/img/${id}`;
}

async function dropImages(db: NonNullable<ReturnType<typeof sql>>, urls: string[]) {
  for (const url of urls) {
    const m = /^\/api\/img\/([a-z0-9]+)$/.exec(url);
    if (m) await db`DELETE FROM images WHERE id = ${m[1]}`;
  }
}

export async function saveProduct(formData: FormData) {
  const db = await guard();
  await ensureSeeded(db);
  const original = text(formData, "original_slug");
  const name = text(formData, "name");
  const price = Math.round(Number(text(formData, "price").replace(/[^0-9.]/g, "")));
  if (name.length < 2 || !Number.isFinite(price) || price < 0) redirect(`/admin/products/${original || "new"}?error=1`);

  let slug = original;
  if (!slug) {
    const base = slugify(name);
    slug = base;
    for (let n = 2; ; n++) {
      const hit = (await db`SELECT 1 FROM products WHERE slug = ${slug}`) as unknown[];
      if (hit.length === 0) break;
      slug = `${base}-${n}`;
    }
  }

  const keep = formData.getAll("keep").map(String).filter(Boolean);
  const before = original ? (((await db`SELECT images FROM products WHERE slug = ${original}`) as Array<{ images: string[] }>)[0]?.images ?? []) : [];
  const added: string[] = [];
  for (const file of formData.getAll("photos")) {
    if (file instanceof File && file.size > 0) added.push(await storeImage(db, Buffer.from(await file.arrayBuffer())));
  }
  const images = [...keep, ...added];
  await dropImages(db, before.filter((u) => !keep.includes(u)));

  const category = text(formData, "category") || "Crystals";
  const badge = text(formData, "badge") || null;
  const description = text(formData, "description");
  const isUnique = flag(formData, "unique");
  const sold = flag(formData, "sold");
  const hidden = flag(formData, "hidden");

  await db`INSERT INTO products (slug, name, price, category, images, badge, description, is_unique, sold, hidden, position)
    VALUES (${slug}, ${name}, ${price}, ${category}, ${JSON.stringify(images)}::jsonb, ${badge}, ${description}, ${isUnique}, ${sold}, ${hidden}, ${original ? 0 : -1})
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, category = EXCLUDED.category, images = EXCLUDED.images,
      badge = EXCLUDED.badge, description = EXCLUDED.description, is_unique = EXCLUDED.is_unique, sold = EXCLUDED.sold, hidden = EXCLUDED.hidden`;
  refresh();
  redirect("/admin/products?saved=1");
}

export async function toggleProduct(slug: string, field: "sold" | "hidden") {
  const db = await guard();
  if (field === "sold") await db`UPDATE products SET sold = NOT sold WHERE slug = ${slug}`;
  else await db`UPDATE products SET hidden = NOT hidden WHERE slug = ${slug}`;
  refresh();
  revalidatePath("/admin/products");
}

export async function deleteProduct(slug: string) {
  const db = await guard();
  const row = ((await db`SELECT images FROM products WHERE slug = ${slug}`) as Array<{ images: string[] }>)[0];
  if (row) await dropImages(db, row.images);
  await db`DELETE FROM products WHERE slug = ${slug}`;
  refresh();
  redirect("/admin/products?deleted=1");
}

/** Loads the built-in starter catalog and events the first time the admin writes anything, so the shop never shrinks to one item. */
async function ensureSeeded(db: NonNullable<ReturnType<typeof sql>>) {
  const count = ((await db`SELECT count(*)::int AS n FROM products`) as Array<{ n: number }>)[0].n;
  if (count === 0) {
    let pos = 0;
    for (const p of seedProducts) {
      await db`INSERT INTO products (slug, name, price, category, images, badge, description, is_unique, sold, position) VALUES (${p.slug}, ${p.name}, ${p.price}, ${p.category}, ${JSON.stringify(p.images)}::jsonb, ${p.badge ?? null}, '', ${p.unique}, false, ${pos++}) ON CONFLICT DO NOTHING`;
    }
  }
  const ev = ((await db`SELECT count(*)::int AS n FROM events`) as Array<{ n: number }>)[0].n;
  if (ev === 0) {
    for (const e of seedEvents) await db`INSERT INTO events (id, title, date, time, blurb, cta) VALUES (${e.id}, ${e.title}, ${e.date}, ${e.time ?? null}, ${e.blurb}, ${e.cta}) ON CONFLICT DO NOTHING`;
  }
}

export async function seedStarter() {
  const db = await guard();
  await ensureSeeded(db);
  refresh();
  redirect("/admin?seeded=1");
}

export async function saveEvent(formData: FormData) {
  const db = await guard();
  await ensureSeeded(db);
  const id = text(formData, "id") || randomBytes(5).toString("hex");
  const title = text(formData, "title");
  const date = text(formData, "date");
  if (title.length < 2 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) redirect("/admin/events?error=1");
  const time = text(formData, "time") || null;
  const blurb = text(formData, "blurb");
  const cta = text(formData, "cta") === "rsvp" ? "rsvp" : "tickets";
  await db`INSERT INTO events (id, title, date, time, blurb, cta) VALUES (${id}, ${title}, ${date}::date, ${time}, ${blurb}, ${cta})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, date = EXCLUDED.date, time = EXCLUDED.time, blurb = EXCLUDED.blurb, cta = EXCLUDED.cta`;
  refresh();
  redirect("/admin/events?saved=1");
}

export async function deleteEvent(id: string) {
  const db = await guard();
  await db`DELETE FROM events WHERE id = ${id}`;
  refresh();
  redirect("/admin/events?deleted=1");
}

export async function saveSettings(formData: FormData) {
  const db = await guard();
  const announcement = text(formData, "announcement");
  if (announcement) await db`INSERT INTO settings (key, value) VALUES ('announcement', ${announcement}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;
  else await db`DELETE FROM settings WHERE key = 'announcement'`;
  refresh();
  redirect("/admin/settings?saved=1");
}

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

/** Imports a Wix Stores product export. Photos are linked first, then copied into this site by copyPhotos(). */
export async function importCsv(formData: FormData) {
  const db = await guard();
  await ensureSeeded(db);
  const file = formData.get("csv");
  if (!(file instanceof File) || file.size === 0) redirect("/admin/import?error=1");
  const rows = parseCsv(await file.text());
  const head = (rows.shift() ?? []).map((h) => h.trim().toLowerCase());
  const col = (n: string) => head.indexOf(n.toLowerCase());
  const iType = col("fieldtype"), iName = col("name"), iImg = col("productimageurl"), iColl = col("collection"), iPrice = col("price"), iRibbon = col("ribbon"), iVisible = col("visible"), iDesc = col("description"), iInv = col("inventory"), iHandle = col("handle");
  if (iName < 0 || iPrice < 0) redirect("/admin/import?error=2");
  let count = 0;
  let pos = 1000;
  for (const r of rows) {
    if (iType >= 0 && r[iType] && r[iType] !== "Product") continue;
    const name = (r[iName] ?? "").trim();
    const price = Math.round(Number((r[iPrice] ?? "").replace(/[^0-9.]/g, "")));
    if (!name || !Number.isFinite(price)) continue;
    const slug = slugify(iHandle >= 0 && r[iHandle] ? r[iHandle] : name);
    const images = (iImg >= 0 ? r[iImg] ?? "" : "").split(";").map((u) => u.trim()).filter(Boolean).map((u) => (u.startsWith("http") ? u : `https://static.wixstatic.com/media/${u}`));
    const category = ((iColl >= 0 ? r[iColl] : "") || "Crystals").split(";")[0].trim() || "Crystals";
    const badge = iRibbon >= 0 && /new/i.test(r[iRibbon] ?? "") ? "New" : null;
    const hidden = iVisible >= 0 && /^false$/i.test(r[iVisible] ?? "");
    const sold = iInv >= 0 && /out/i.test(r[iInv] ?? "");
    const description = iDesc >= 0 ? stripHtml(r[iDesc] ?? "").slice(0, 2000) : "";
    await db`INSERT INTO products (slug, name, price, category, images, badge, description, is_unique, sold, hidden, position)
      VALUES (${slug}, ${name}, ${price}, ${category}, ${JSON.stringify(images)}::jsonb, ${badge}, ${description}, true, ${sold}, ${hidden}, ${pos++})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, category = EXCLUDED.category, images = CASE WHEN jsonb_array_length(products.images) > 0 THEN products.images ELSE EXCLUDED.images END, badge = EXCLUDED.badge, description = EXCLUDED.description, sold = EXCLUDED.sold, hidden = EXCLUDED.hidden`;
    count++;
  }
  refresh();
  redirect(`/admin/import?imported=${count}`);
}

/** Copies a few externally-linked photos (from the old Wix site) into this site's own storage. Call repeatedly until remaining is 0. */
export async function copyPhotos(): Promise<{ remaining: number; copied: number }> {
  const db = await guard();
  const todo = (await db`SELECT slug, images FROM products WHERE EXISTS (SELECT 1 FROM jsonb_array_elements_text(images) u WHERE u LIKE 'http%') ORDER BY position LIMIT 4`) as Array<{ slug: string; images: string[] }>;
  let copied = 0;
  for (const p of todo) {
    const next: string[] = [];
    for (const url of p.images) {
      if (!url.startsWith("http")) { next.push(url); continue; }
      try {
        const sized = /static\.wixstatic\.com\/media\/[^/]+$/.test(url) ? `${url}/v1/fit/w_1600,h_1600,q_85/img.jpg` : url;
        const res = await fetch(sized, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error(String(res.status));
        next.push(await storeImage(db, Buffer.from(await res.arrayBuffer())));
        copied++;
      } catch {
        next.push(url);
      }
    }
    // Mark attempted products so one broken photo never blocks the queue.
    const stuck = next.some((u) => u.startsWith("http"));
    await db`UPDATE products SET images = ${JSON.stringify(next)}::jsonb, position = position + ${stuck ? 100000 : 0} WHERE slug = ${p.slug}`;
  }
  const remaining = ((await db`SELECT count(*)::int AS n FROM products WHERE EXISTS (SELECT 1 FROM jsonb_array_elements_text(images) u WHERE u LIKE 'http%') AND position < 100000`) as Array<{ n: number }>)[0].n;
  refresh();
  return { remaining, copied };
}
