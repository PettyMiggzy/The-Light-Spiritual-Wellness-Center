import { AdminShell, btn, field, label } from "@/components/admin-ui";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { loginAction, seedStarter } from "@/lib/admin-actions";
import { sql } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ error?: string; seeded?: string }> }) {
  const q = await searchParams;
  if (!(await isAdmin())) {
    return (
      <div className="grid min-h-screen place-items-center bg-night px-5 text-ivory">
        <form action={loginAction} className="w-full max-w-sm rounded-3xl border border-white/15 bg-card p-8">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">The Light</p>
          <h1 className="mt-2 text-4xl">Owner sign in</h1>
          {!adminConfigured() ? <p className="mt-4 text-sm text-destructive">Admin is not configured yet. Set ADMIN_PASSWORD and ADMIN_SECRET.</p> : null}
          <label htmlFor="password" className="mt-6 mb-1.5 block text-sm">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" autoFocus required className="h-12 w-full rounded-xl border border-white/25 bg-white/5 px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold" />
          {q.error ? <p role="alert" className="mt-3 text-sm text-destructive">That password is not right.</p> : null}
          <button className="mt-6 h-12 w-full rounded-full bg-gold text-sm font-semibold text-ink hover:opacity-90">Sign in</button>
        </form>
      </div>
    );
  }

  const db = sql();
  let counts = { products: 0, sold: 0, events: 0 };
  if (db) {
    const a = (await db`SELECT count(*)::int AS n, count(*) FILTER (WHERE sold)::int AS s FROM products`) as Array<{ n: number; s: number }>;
    const e = (await db`SELECT count(*)::int AS n FROM events`) as Array<{ n: number }>;
    counts = { products: a[0].n, sold: a[0].s, events: e[0].n };
  }
  const tiles = [
    { href: "/admin/products", title: "Products", body: "Add crystals, change prices, upload photos, mark pieces sold." },
    { href: "/admin/events", title: "Events", body: "Add or edit the events shown on the site." },
    { href: "/admin/import", title: "Import from Wix", body: "Bring in the whole catalog from a Wix export." },
    { href: "/admin/settings", title: "Site message", body: "A banner across the top for sales or news." },
  ];
  return (
    <AdminShell title="Welcome back." notice={q.seeded ? "The starter catalog is loaded. You can edit everything now." : null}>
      {!db ? <p className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">No database is connected, so changes cannot be saved. Add DATABASE_URL in Vercel.</p> : null}
      <p className="text-lg text-ink/75">{counts.products} products ({counts.sold} sold) · {counts.events} events</p>
      {db && counts.products === 0 ? (
        <form action={seedStarter} className="mt-6 rounded-2xl border border-ink/15 bg-white p-6">
          <h2 className="text-3xl">Start with what is on the site now</h2>
          <p className="mt-2 text-ink/70">The site is showing a starter set of 18 products and the current events. Load them here so you can edit them, then import the rest from Wix.</p>
          <button className={`${btn} mt-4`}>Load the starter catalog</button>
        </form>
      ) : null}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tiles.map((t) => (<li key={t.href}><Link href={t.href} className="block h-full rounded-2xl border border-ink/15 bg-white p-6 hover:border-ink"><h2 className="text-3xl">{t.title}</h2><p className="mt-2 text-ink/70">{t.body}</p></Link></li>))}
      </ul>
      <p className="mt-10 text-sm text-ink/60">Tip: after you save, the public site updates within a few seconds.</p>
      <span className="hidden">{field}{label}</span>
    </AdminShell>
  );
}
