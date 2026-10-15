import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { OpenStatus } from "@/components/open-status";
import { PageHero } from "@/components/page-hero";
import { address, hoursSummary, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description: "Hours, directions, and contact details for The Light Spiritual Wellness Center, 435 Main Street, South Boston, Virginia.",
};

export default function VisitPage() {
  return (
    <>
      <PageHero eyebrow="Visit" title="Find us on Main Street." lede="Stop in to browse the crystals, ask about a session, or just say hello." art="/images/art/shop.jpg" />
      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <ul className="space-y-6 text-lg">
              <li className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" /><span>{address}<br /><a className="text-sm text-gold underline" href={site.mapsUrl} target="_blank" rel="noreferrer">Get directions</a></span></li>
              <li className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" /><a href={`tel:${site.phoneTel}`} className="hover:text-gold">{site.phone}</a></li>
              <li className="flex gap-4"><Mail className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" /><a href={`mailto:${site.email}`} className="break-all hover:text-gold">{site.email}</a></li>
            </ul>
            <h2 className="mt-10 text-3xl">Hours</h2>
            <ul className="mt-4 max-w-sm space-y-2">
              {hoursSummary.map((row) => (<li key={row.days} className="flex justify-between gap-6 border-b border-white/10 pb-2"><span>{row.days}</span><span className="text-ivory/90">{row.time}</span></li>))}
            </ul>
            <div className="mt-5"><OpenStatus className="text-gold-soft" /></div>
            <iframe title={`Map of ${site.name}`} src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-10 h-72 w-full rounded-3xl border border-white/10" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-card p-8">
            <h2 className="text-4xl">Send us a message</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">This opens an email to the shop. We will reply as soon as we can.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
