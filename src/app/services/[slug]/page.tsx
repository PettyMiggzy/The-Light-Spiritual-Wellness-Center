import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: `${service.name} in South Boston, VA`, description: `${service.short} At The Light Spiritual Wellness Center, 435 Main Street, South Boston, Virginia.` };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(service.name)}&body=${encodeURIComponent(`Hello, I'd like to ask about: ${service.name}.\n\nName:\nPhone:\nBest time to reach me:\n`)}`;

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-night pt-36 pb-16 md:pt-44 md:pb-24">
        <Image src={service.art} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-night/60" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gold-soft hover:text-gold"><ArrowLeft className="size-4" aria-hidden="true" /> All sessions</Link>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] text-balance sm:text-7xl">{service.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/90">{service.short}</p>
        </div>
      </section>
      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ivory/90">
            {service.body.map((paragraph) => (<p key={paragraph}>{paragraph}</p>))}
            {service.note ? <p className="rounded-2xl border border-gold/30 p-4 text-base text-gold-soft">{service.note}</p> : null}
            <p className="text-sm text-muted-foreground">This is a complementary wellness experience and is not medical treatment. It does not replace care from a doctor.</p>
          </div>
          <aside className="h-fit rounded-3xl border border-white/10 bg-card p-8">
            <h2 className="text-3xl">{service.action === "consult" ? "Request a consultation" : service.action === "remote" ? "Book your reading" : "Book this session"}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.action === "consult" ? "Pricing varies, so tell us about your space or group and we will reply." : service.action === "remote" ? "After you book, the reader contacts you within 48 hours to schedule." : "Choose a time on our Square appointment page. Pricing is shown when you book."}
            </p>
            <div className="mt-6 grid gap-3">
              {service.action === "consult" ? (
                <Button className="h-12 rounded-full" render={<a href={mail} />}>Email us</Button>
              ) : (
                <Button className="h-12 rounded-full" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book now</Button>
              )}
              <Button variant="outline" className="h-12 rounded-full border-white/30 bg-transparent text-ivory hover:bg-white/10 hover:text-ivory" render={<a href={`tel:${site.phoneTel}`} />}>Call {site.phone}</Button>
            </div>
          </aside>
        </div>
      </section>
      <section className="border-t border-white/10 bg-night py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="text-4xl">Also at The Light</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{others.map((s) => (<ServiceCard key={s.slug} service={s} />))}</ul>
        </div>
      </section>
    </article>
  );
}
