import type { Metadata } from "next";
import { EventRow } from "@/components/event-row";
import { PageHero } from "@/components/page-hero";
import { upcomingEventsList } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Yoga, qigong, sound, breathwork, and book signings at The Light Spiritual Wellness Center, 435 Main Street, South Boston, Virginia.",
};

export default async function EventsPage() {
  const events = await upcomingEventsList();
  return (
    <>
      <PageHero eyebrow="Gather" title="Events with The Light." lede="Movement, breath, and sound in good company. Tickets and RSVPs run through our events page." art="/images/art/corporate.jpg" />
      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          {events.length > 0 ? (
            <ul className="divide-y divide-white/10 border-y border-white/10">{events.map((event) => (<EventRow key={event.id} event={event} />))}</ul>
          ) : (
            <p className="text-lg text-muted-foreground">No events are scheduled right now. Follow us on <a className="text-gold underline" href={site.instagram}>Instagram</a> or <a className="text-gold underline" href={site.facebook}>Facebook</a> to hear first.</p>
          )}
          <p className="mt-8 text-sm text-muted-foreground">All events are at {site.street}, {site.city}.</p>
        </div>
      </section>
    </>
  );
}
