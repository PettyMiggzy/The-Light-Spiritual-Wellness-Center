import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, MapPin } from "lucide-react";
import { EventRow } from "@/components/event-row";
import { Motes } from "@/components/motes";
import { OpenStatus } from "@/components/open-status";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/lib/events";
import { products } from "@/lib/products";
import { featuredServiceSlugs, getService } from "@/lib/services";
import { address, hoursSummary, site } from "@/lib/site";

export const revalidate = 3600;

const marquee = ["Clusters", "Spheres", "Raw Pieces", "Carvings", "Palm-Stones", "Rare Pieces", "Jewelry", "Crystal Kits", "Reiki", "Sound Bed", "Aura Photography", "Crystal Light Therapy", "Tarot"];

export default function HomePage() {
  const featured = featuredServiceSlugs.map((slug) => getService(slug)!);
  const shelf = [...products].sort((a, b) => Number(!!b.badge) - Number(!!a.badge)).filter((p) => p.images.length > 0).slice(0, 8);
  const events = upcomingEvents().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night">
        <div className="breathe absolute inset-0 -z-20">
          <Image src="/images/art/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[60%_55%]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-night/45 md:bg-night/30" />
        <Motes />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-28 pb-20 sm:px-8">
          <p className="rise text-xs font-semibold tracking-[0.3em] text-gold uppercase">South Boston, Virginia</p>
          <h1 className="rise mt-5 max-w-4xl text-[3.4rem] leading-[0.95] text-balance sm:text-8xl lg:text-[8.5rem]" style={{ animationDelay: "0.1s" }}>
            Come into <em className="text-gold-soft not-italic">the Light.</em>
          </h1>
          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-ivory/90 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            Crystals, Reiki, sound and light sessions, and a community that gathers around them. A crystal and metaphysical shop on Main Street.
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.3s" }}>
            <Button className="h-14 rounded-full px-8 text-base" render={<Link href="/shop" />}>Shop crystals</Button>
            <Button variant="outline" className="h-14 rounded-full border-white/50 bg-transparent px-8 text-base text-ivory hover:bg-white/10 hover:text-ivory" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book a session</Button>
          </div>
          <div className="rise mt-8" style={{ animationDelay: "0.4s" }}>
            <OpenStatus className="text-ivory/90" />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="marquee overflow-hidden border-y border-white/10 bg-night py-5" aria-hidden="true">
        <ul className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((word, i) => (
            <li key={i} className="font-heading text-2xl text-gold-soft italic">✦ <span className="ml-12 not-italic text-ivory/80">{word}</span></li>
          ))}
        </ul>
      </div>

      {/* Sessions */}
      <section className="bg-night py-24 md:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Sessions</p>
            <h2 className="mt-4 max-w-2xl text-5xl leading-[1.02] text-balance sm:text-7xl">Rest. Reset. Return to yourself.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">Energy work, sound, light, and touch, offered in a quiet room on Main Street.</p>
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (<ServiceCard key={service.slug} service={service} />))}
          </ul>
          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">See every session <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="bg-ivory py-24 text-ink md:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-iris uppercase">The crystal shop</p>
              <h2 className="mt-4 max-w-2xl text-5xl leading-[1.02] text-balance sm:text-7xl">Fresh from the case.</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-iris hover:underline">Shop everything <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </Reveal>
          <p className="mt-4 text-sm text-ink/60">{site.promo.text}.</p>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {shelf.map((product, i) => (<ProductCard key={product.slug} product={product} priority={i < 4} />))}
          </ul>
        </div>
      </section>

      {/* Ultimate session */}
      <section className="relative isolate overflow-hidden bg-night py-28 md:py-44">
        <Image src="/images/art/geode.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-night/60" />
        <Motes />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">The full experience</p>
            <h2 className="mt-4 text-5xl leading-[1.02] text-balance sm:text-7xl">The Ultimate Session.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ivory/90">Sound, vibration, color, light, aromatherapy, and energy, together. An immersive hour built to restore body, mind, and spirit.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-14 rounded-full px-8 text-base" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book the Ultimate Session</Button>
              <Button variant="outline" className="h-14 rounded-full border-white/50 bg-transparent px-8 text-base text-ivory hover:bg-white/10 hover:text-ivory" render={<Link href="/services/ultimate-session" />}>What it includes</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Events */}
      <section className="bg-night py-24 md:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Gather</p>
            <h2 className="mt-4 max-w-2xl text-5xl leading-[1.02] text-balance sm:text-7xl">Upcoming at The Light.</h2>
          </Reveal>
          {events.length > 0 ? (
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {events.map((event) => (<EventRow key={event.id} event={event} />))}
            </ul>
          ) : (
            <p className="mt-10 text-muted-foreground">New events are on the way. Follow along on Instagram or Facebook.</p>
          )}
          <div className="mt-8"><Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">All events <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        </div>
      </section>

      {/* Gift + Visit */}
      <section className="bg-ivory py-24 text-ink md:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/art/gift.jpg" alt="An open indigo gift box with a gold ribbon, glowing crystals, and a lit candle" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-iris uppercase"><Gift className="size-4" aria-hidden="true" /> Gift cards</p>
            <h2 className="mt-4 text-5xl leading-[1.02] text-balance sm:text-6xl">Give someone a little light.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">A gift card works for crystals, sessions, and events. It is the easiest way to send someone a reason to slow down.</p>
            <Button className="mt-8 h-14 rounded-full bg-ink px-8 text-base text-ivory hover:bg-iris" render={<Link href="/gift-cards" />}>Give a gift card</Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-night py-24 md:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-gold uppercase"><MapPin className="size-4" aria-hidden="true" /> Visit</p>
            <h2 className="mt-4 text-5xl leading-[1.02] text-balance sm:text-6xl">Find us on Main Street.</h2>
            <p className="mt-5 text-lg text-ivory/90">{address}</p>
            <ul className="mt-6 max-w-sm space-y-2 text-ivory/90">
              {hoursSummary.map((row) => (<li key={row.days} className="flex justify-between gap-6 border-b border-white/10 pb-2"><span>{row.days}</span><span>{row.time}</span></li>))}
            </ul>
            <div className="mt-6"><OpenStatus className="text-gold-soft" /></div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 rounded-full px-6" render={<a href={site.mapsUrl} target="_blank" rel="noreferrer" />}>Get directions</Button>
              <Button variant="outline" className="h-12 rounded-full border-white/40 bg-transparent px-6 text-ivory hover:bg-white/10 hover:text-ivory" render={<a href={`tel:${site.phoneTel}`} />}>{site.phone}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <iframe title={`Map of ${site.name}`} src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-3xl border border-white/10 lg:h-full lg:min-h-[26rem]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
