import Link from "next/link";
import { logoutAction } from "@/lib/admin-actions";

export const field = "h-12 w-full rounded-xl border border-ink/20 bg-white px-4 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-iris";
export const label = "mb-1.5 block text-sm font-medium text-ink";
export const btn = "inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-ivory hover:bg-iris disabled:opacity-50";
export const btnGhost = "inline-flex h-10 items-center justify-center rounded-full border border-ink/25 px-4 text-sm font-medium text-ink hover:bg-ink/5";

export function AdminShell({ title, children, notice }: { title: string; children: React.ReactNode; notice?: string | null }) {
  const nav = [["/admin", "Home"], ["/admin/products", "Products"], ["/admin/events", "Events"], ["/admin/import", "Import"], ["/admin/settings", "Site message"]];
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/admin" className="font-heading text-2xl tracking-[0.18em]">THE LIGHT · ADMIN</Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {nav.map(([href, name]) => (<Link key={href} href={href} className="rounded-full px-3 py-2 hover:bg-ink/5">{name}</Link>))}
            <Link href="/" target="_blank" className="rounded-full px-3 py-2 text-iris hover:bg-ink/5">View site ↗</Link>
            <form action={logoutAction}><button className="rounded-full px-3 py-2 text-ink/70 hover:bg-ink/5">Sign out</button></form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-5xl">{title}</h1>
        {notice ? <p role="status" className="mt-5 rounded-xl border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-emerald-900">{notice}</p> : null}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
