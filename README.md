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

- **Shop:** 18 real products with their photos and prices. `npm run import:products -- ./wix-products.csv` loads the full catalog from a Wix Stores export and downloads the photos.
- **Cart and checkout:** a real cart that prepares an order note to email, text or copy. It does **not** take payment. Adding Square or Stripe is the next step.
- **Booking:** every session links to the shop's existing Square appointment page.
- **Events and gift cards:** tickets, RSVPs and gift cards still go through the existing Wix pages (`site.ticketsUrl`, `site.giftCardUrl` in `src/lib/site.ts`).
- **Hours:** the current site shows two different sets. This uses the footer's (Wed–Sat 11–6, Sun 12–5). Confirm and edit `hours` in `src/lib/site.ts`.
- **Event dates** are from the current Events page and need updating in `src/lib/events.ts`.
- **Zip code** `24592` for South Boston should be confirmed.

Sessions are described as complementary wellness experiences, not medical treatment.
