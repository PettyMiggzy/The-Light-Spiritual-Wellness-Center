import { ArrowUpRight } from "lucide-react";
import { formatEventDate, type EventItem } from "@/lib/events";
import { site } from "@/lib/site";

export function EventRow({ event }: { event: EventItem }) {
  const d = formatEventDate(event.date);
  return (
    <li className="grid grid-cols-[4.5rem_1fr] items-center gap-5 py-6 sm:grid-cols-[5rem_1fr_auto] sm:gap-8">
      <div className="rounded-2xl border border-gold/40 py-3 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">{d.month}</p>
        <p className="font-heading text-4xl leading-none">{d.day}</p>
        <p className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">{d.weekday}</p>
      </div>
      <div>
        <h3 className="text-2xl leading-tight sm:text-3xl">{event.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {event.time ? `${event.time} · ` : ""}{event.blurb}
        </p>
      </div>
      <a href={site.ticketsUrl} target="_blank" rel="noreferrer" className="col-span-2 inline-flex h-11 w-fit items-center gap-2 rounded-full border border-gold/60 px-5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink sm:col-span-1">
        {event.cta === "rsvp" ? "RSVP" : "Buy tickets"}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </li>
  );
}
