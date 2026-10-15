import Image from "next/image";
import Link from "next/link";
import { address, hoursSummary, nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/brand/logo-gold.png" alt={site.name} width={308} height={390} className="h-36 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/20 text-ivory hover:border-gold hover:text-gold"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg></a>
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full border border-white/20 text-ivory hover:border-gold hover:text-gold"><svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" /></svg></a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Visit</h2>
          <p className="mt-4 text-sm leading-relaxed">{site.street}<br />{site.city}, {site.region}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {hoursSummary.map((row) => (<li key={row.days} className="flex justify-between gap-4"><span>{row.days}</span><span className="text-ivory/90">{row.time}</span></li>))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Talk to us</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-gold" href={`tel:${site.phoneTel}`}>{site.phone}</a></li>
            <li><a className="break-all hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="hover:text-gold" href={site.linktree} target="_blank" rel="noreferrer">All our links</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (<li key={item.href}><Link className="hover:text-gold" href={item.href}>{item.label}</Link></li>))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. {address}.</p>
          <p>
            Built and maintained by{" "}
            <a href="https://www.simplicitybuilds.com/" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-gold hover:underline">Simplicity Builds</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
