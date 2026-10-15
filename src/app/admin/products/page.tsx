import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell, btn, btnGhost } from "@/components/admin-ui";
import { deleteProduct, toggleProduct } from "@/lib/admin-actions";
import { isAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { money } from "@/lib/products";

export const dynamic = "force-dynamic";

type Row = { slug: string; name: string; price: number; category: string; images: string[]; sold: boolean; hidden: boolean; badge: string | null };

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ q?: string; saved?: string; deleted?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const params = await searchParams;
  const db = sql();
  const rows = db ? ((await db`SELECT slug, name, price, category, images, sold, hidden, badge FROM products ORDER BY position ASC, created_at DESC`) as Row[]) : [];
  const q = (params.q ?? "").toLowerCase();
  const shown = q ? rows.filter((r) => `${r.name} ${r.category}`.toLowerCase().includes(q)) : rows;
  return (
    <AdminShell title="Products" notice={params.saved ? "Saved." : params.deleted ? "Deleted." : null}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <form className="flex gap-2"><input name="q" defaultValue={params.q} placeholder="Search products" className="h-12 w-64 rounded-xl border border-ink/20 bg-white px-4" /><button className={btnGhost}>Search</button></form>
        <Link href="/admin/products/new" className={btn}>+ Add a product</Link>
      </div>
      {rows.length === 0 ? <p className="mt-8 text-ink/70">No products saved yet. Load the starter catalog from the Home page, or import from Wix.</p> : null}
      <ul className="mt-6 divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/15 bg-white">
        {shown.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-ink/10">{p.images[0] ? <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" /> : null}</div>
            <div className="min-w-[12rem] flex-1">
              <Link href={`/admin/products/${p.slug}`} className="font-heading text-2xl hover:text-iris">{p.name}</Link>
              <p className="text-sm text-ink/60">{money(p.price)} · {p.category}{p.badge ? ` · ${p.badge}` : ""}{p.hidden ? " · Hidden" : ""}{p.sold ? " · Sold" : ""}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={toggleProduct.bind(null, p.slug, "sold")}><button className={btnGhost}>{p.sold ? "Mark available" : "Mark sold"}</button></form>
              <form action={toggleProduct.bind(null, p.slug, "hidden")}><button className={btnGhost}>{p.hidden ? "Show" : "Hide"}</button></form>
              <Link href={`/admin/products/${p.slug}`} className={btnGhost}>Edit</Link>
              <form action={deleteProduct.bind(null, p.slug)}><button className="inline-flex h-10 items-center rounded-full border border-red-300 px-4 text-sm text-red-700 hover:bg-red-50">Delete</button></form>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
