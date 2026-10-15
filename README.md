# The Light Spiritual Wellness Center

A new site for [The Light](https://www.thelightspiritualwellness.com/), the crystal and metaphysical shop at 435 Main Street, South Boston, Virginia.

Content, prices, photos, services, events and hours come from the current Wix site and the Linktree. The hero, service and gift images were generated for this site. No stock photos.

## Run it

```bash
npm install
npm run dev     # http://127.0.0.1:43500
npm run build
```

## What is real and what is a placeholder

- **Shop and admin:** products, photos, events and the site banner live in a Neon database and are managed at `/admin` (see below). Until something is saved there the site shows a built-in starter set of 18 products.
- **Cart and checkout:** a real cart that prepares an order note to email, text or copy. It does **not** take payment. Adding Square or Stripe is the next step.
- **Booking:** every session links to the shop's existing Square appointment page.
- **Events and gift cards:** tickets, RSVPs and gift cards still go through the existing Wix pages (`site.ticketsUrl`, `site.giftCardUrl` in `src/lib/site.ts`).
- **Hours:** the current site shows two different sets. This uses the footer's (Wed–Sat 11–6, Sun 12–5). Confirm and edit `hours` in `src/lib/site.ts`.
- **Event dates** are from the current Events page and need updating in `src/lib/events.ts`.
- **Zip code** `24592` for South Boston should be confirmed.

Sessions are described as complementary wellness experiences, not medical treatment.

## Email list

The signup forms post to `NEXT_PUBLIC_SIGNUP_URL` when it is set (copy `.env.example` to `.env.local`, or add it in Vercel). When it is empty they open an email to the shop so no sign-up is lost.

## Admin (`/admin`)

The owner signs in at `/admin`. From there she can add and edit products (photos are resized in the browser before upload), mark pieces sold or hide them, add and edit events, set a banner message for the top of the site, and import the whole catalog from a Wix export (Wix > Store Products > More Actions > Export, then upload the CSV, then press "Copy photos to this site").

Environment variables (set in Vercel, see `.env.example`): `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`. The password is never stored in the code. The first time anything is saved, the starter catalog and events are copied into the database so the shop never shrinks to a single item.

Tables: `products`, `images` (resized photos), `events`, `settings`.
