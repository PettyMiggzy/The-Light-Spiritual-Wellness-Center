#!/usr/bin/env node
// Usage: npm run import:products -- path/to/wix-products.csv
// Reads a Wix Stores product export (Store > Products > More actions > Export) and writes
// src/lib/products.imported.json plus downloads each product's photos into public/images/products.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2];
if (!file) {
  console.error("Pass the path to the Wix products CSV: npm run import:products -- ./products.csv");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); cell = ""; if (row.some(Boolean)) rows.push(row); row = []; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const [head, ...rows] = parseCsv(readFileSync(file, "utf8"));
const col = (name) => head.findIndex((h) => h.trim().toLowerCase() === name.toLowerCase());
const iType = col("fieldType"), iName = col("name"), iImg = col("productImageUrl"), iColl = col("collection"), iPrice = col("price"), iRibbon = col("ribbon"), iVisible = col("visible");

const outDir = resolve(root, "public/images/products");
mkdirSync(outDir, { recursive: true });
const products = [];

for (const r of rows) {
  if (iType >= 0 && r[iType] !== "Product") continue;
  if (iVisible >= 0 && /^false$/i.test(r[iVisible])) continue;
  const name = r[iName]?.trim();
  const price = Number(r[iPrice]);
  if (!name || !Number.isFinite(price)) continue;
  const slug = slugify(name);
  const urls = (r[iImg] || "").split(";").map((u) => u.trim()).filter(Boolean);
  const images = [];
  for (let n = 0; n < urls.length; n++) {
    const id = urls[n].replace(/^wix:image:\/\/v1\//, "").split("#")[0].split("/")[0];
    const href = urls[n].startsWith("http") ? urls[n] : `https://static.wixstatic.com/media/${id}`;
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error(String(res.status));
      writeFileSync(resolve(outDir, `${slug}${n ? `-${n + 1}` : ""}.jpg`), Buffer.from(await res.arrayBuffer()));
      images.push(`/images/products/${slug}${n ? `-${n + 1}` : ""}.jpg`);
    } catch (e) {
      console.warn(`Skipped image for ${name}: ${e.message}`);
    }
  }
  products.push({
    slug,
    name,
    price,
    category: (r[iColl] || "Crystals").split(";")[0].trim() || "Crystals",
    images,
    ...(/new/i.test(r[iRibbon] || "") ? { badge: "New" } : {}),
    unique: true,
  });
}

writeFileSync(resolve(root, "src/lib/products.imported.json"), JSON.stringify(products, null, 2));
console.log(`Imported ${products.length} products.`);
