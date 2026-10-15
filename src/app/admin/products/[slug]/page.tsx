import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell, btn, btnGhost, field, label } from "@/components/admin-ui";
import { ImagePicker } from "@/components/image-picker";
import { saveProduct } from "@/lib/admin-actions";
import { isAdmin } from "@/lib/auth";
import { categoriesFor } from "@/lib/categories";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type Row = { slug: string; name: string; price: number; category: string; images: string[]; badge: string | null; description: string; is_unique: boolean; sold: boolean; hidden: boolean };

export default async function EditProduct({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ error?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const { slug } = await params;
  const q = await searchParams;
  const db = sql();
  const all = db ? ((await db`SELECT category FROM products`) as Array<{ category: string }>) : [];
  const cats = categoriesFor(all).filter((c) => c !== "All");
  let p: Row | null = null;
  if (slug !== "new") {
    p = db ? (((await db`SELECT slug, name, price, category, images, badge, description, is_unique, sold, hidden FROM products WHERE slug = ${slug}`) as Row[])[0] ?? null) : null;
    if (!p) notFound();
  }
  return (
    <AdminShell title={p ? "Edit product" : "Add a product"}>
      {q.error ? <p role="alert" className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">Add a name and a price, then try again.</p> : null}
      <form action={saveProduct} className="grid max-w-2xl gap-6">
        <input type="hidden" name="original_slug" value={p?.slug ?? ""} />
        <div><label className={label} htmlFor="name">Name</label><input id="name" name="name" defaultValue={p?.name} required className={field} /></div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label className={label} htmlFor="price">Price (US dollars)</label><input id="price" name="price" inputMode="numeric" defaultValue={p?.price} required className={field} /></div>
          <div><label className={label} htmlFor="category">Category</label><input id="category" name="category" list="cats" defaultValue={p?.category ?? "Clusters"} className={field} /><datalist id="cats">{cats.map((c) => (<option key={c} value={c} />))}</datalist></div>
        </div>
        <div><label className={label} htmlFor="description">Description <span className="font-normal text-ink/60">(optional)</span></label><textarea id="description" name="description" defaultValue={p?.description} rows={4} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-iris" /></div>
        <ImagePicker existing={p?.images ?? []} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="badge">Badge</label><select id="badge" name="badge" defaultValue={p?.badge ?? ""} className={field}><option value="">None</option><option value="New">New</option><option value="Pre-order">Pre-order</option></select></div>
        </div>
        <fieldset className="grid gap-3 text-base">
          <label className="flex items-center gap-3"><input type="checkbox" name="unique" defaultChecked={p?.is_unique ?? true} className="size-5" /> One of a kind (can only be bought once)</label>
          <label className="flex items-center gap-3"><input type="checkbox" name="sold" defaultChecked={p?.sold} className="size-5" /> Sold</label>
          <label className="flex items-center gap-3"><input type="checkbox" name="hidden" defaultChecked={p?.hidden} className="size-5" /> Hide from the site</label>
        </fieldset>
        <div className="flex gap-3"><button className={btn}>Save product</button><Link href="/admin/products" className={btnGhost}>Cancel</Link></div>
      </form>
    </AdminShell>
  );
}
