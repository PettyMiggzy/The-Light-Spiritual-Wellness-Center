export type EventItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD, Eastern time
  time?: string;
  blurb: string;
  cta: "tickets" | "rsvp";
};

// From the current Events page. Tickets and RSVPs still run through the existing Wix events page.
export const events: EventItem[] = [
  {
    id: "fall-into-wellness",
    title: "Fall into Wellness Series",
    date: "2026-09-01",
    blurb: "A 12-part wellness series at The Light.",
    cta: "tickets",
  },
  {
    id: "yoga-flow-kassie",
    title: "Yoga Flow with Kassie",
    date: "2026-10-20",
    blurb: "Fall into Wellness with Kassie at The Light.",
    cta: "tickets",
  },
  {
    id: "qigong-tai-chi-ray",
    title: "Qigong + Tai Chi with Ray",
    date: "2026-10-27",
    blurb: "Fall into Wellness with Ray at The Light.",
    cta: "tickets",
  },
  {
    id: "inhale-exhale-patsy",
    title: "Inhale, Exhale & Unwind with Patsy",
    date: "2026-11-03",
    blurb: "Fall into Wellness with Patsy at The Light.",
    cta: "tickets",
  },
  {
    id: "fascia-sound-brooks",
    title: "Fascia & Sound Alignment with Brooks",
    date: "2026-11-10",
    blurb: "Fall into Wellness with Brooks at The Light.",
    cta: "tickets",
  },
  {
    id: "breathe-friday",
    title: "Breathe Friday: Fall Fusion",
    date: "2026-11-27",
    blurb: "Join Kassie and Ray for a Yoga + Qigong fusion.",
    cta: "tickets",
  },
  {
    id: "book-signing-ray",
    title: "Book Signing with Ray Robertson",
    date: "2026-11-28",
    time: "1:00 – 3:00 pm",
    blurb: "Ray debuts “Buddha Crane Qigong” and “Thoughts on Mindful Living” at The Light.",
    cta: "rsvp",
  },
];

export function todayET() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

export function upcomingEvents() {
  const today = todayET();
  return events.filter((event) => event.date >= today);
}

export function formatEventDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  return {
    weekday: dt.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
    month: dt.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
    day: String(d),
  };
}
