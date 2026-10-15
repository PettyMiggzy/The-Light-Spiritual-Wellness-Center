import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Reiki, vibro-acoustic sound bed, crystal light therapy, aura photography, massage, tarot, and energy cleansing in South Boston, Virginia.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Sessions" title="Ways to come back to yourself." lede="Energy work, sound, light, touch, and guidance. Choose a session, then book it in a few taps." art="/images/art/ultimate.jpg" />
      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (<ServiceCard key={service.slug} service={service} />))}
          </ul>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/30 p-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-4xl">Ready to book?</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">Bookings and pricing live on our Square appointment page. These are complementary wellness experiences and are not medical treatment.</p>
            </div>
            <Button className="h-14 rounded-full px-8 text-base" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book a session</Button>
          </div>
        </div>
      </section>
    </>
  );
}
