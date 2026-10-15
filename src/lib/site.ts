export const site = {
  name: "The Light Spiritual Wellness Center",
  short: "The Light",
  tagline: "Crystals, energy healing, and community in South Boston, Virginia.",
  street: "435 Main Street",
  city: "South Boston",
  region: "VA",
  postal: "24592",
  phone: "561-336-5456",
  phoneTel: "+15613365456",
  email: "thelightspiritualwellness@gmail.com",
  instagram: "https://instagram.com/thelightspiritualwellness",
  facebook: "https://www.facebook.com/TheLightSpiritualWellness/",
  linktree: "https://linktr.ee/TheLightSpiritualWellness",
  // Square appointment page the shop already uses for every bookable service.
  bookingUrl: "https://squareup.com/appointments/book/tssej00280qq7x/LXJER45S93QSE/services",
  // The existing Wix pages stay the source of truth for tickets and gift cards until payments move here.
  ticketsUrl: "https://www.thelightspiritualwellness.com/ourevents",
  giftCardUrl: "https://www.thelightspiritualwellness.com/gift-card",
  mapEmbed:
    "https://maps.google.com/maps?q=435+Main+Street+South+Boston+VA&z=15&output=embed",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=435+Main+Street,+South+Boston,+VA",
  promo: { code: "FreeShip", minimum: 25, text: 'Free shipping on orders over $25 with code "FreeShip"' },
  timeZone: "America/New_York",
} as const;

export const address = `${site.street}, ${site.city}, ${site.region}`;

/**
 * Opening hours. The current website shows two different versions (the footer says Wed–Sat 11–6 and Sun 12–5,
 * the Contact page says Wed–Fri 11–5, Sat 10–5, Sun 12–4). This uses the footer version. Confirm with the owner
 * and edit here once; every page reads from this list.
 */
export const hours: Array<{ day: number; label: string; open: number | null; close: number | null }> = [
  { day: 0, label: "Sunday", open: 12 * 60, close: 17 * 60 },
  { day: 1, label: "Monday", open: null, close: null },
  { day: 2, label: "Tuesday", open: null, close: null },
  { day: 3, label: "Wednesday", open: 11 * 60, close: 18 * 60 },
  { day: 4, label: "Thursday", open: 11 * 60, close: 18 * 60 },
  { day: 5, label: "Friday", open: 11 * 60, close: 18 * 60 },
  { day: 6, label: "Saturday", open: 11 * 60, close: 18 * 60 },
];

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

export function hoursFor(day: number) {
  const row = hours.find((item) => item.day === day)!;
  return row.open == null ? "Closed" : `${formatMinutes(row.open)} – ${formatMinutes(row.close!)}`;
}

/** Hours collapsed into readable groups for footers and the visit page. */
export const hoursSummary = [
  { days: "Wednesday – Saturday", time: "11am – 6pm" },
  { days: "Sunday", time: "12pm – 5pm" },
  { days: "Monday – Tuesday", time: "Closed" },
];

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Sessions" },
  { href: "/events", label: "Events" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/visit", label: "Visit" },
] as const;
