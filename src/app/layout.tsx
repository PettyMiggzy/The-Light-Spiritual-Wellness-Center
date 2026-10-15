import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { address, hours, site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant" });

const description = "Crystals, Reiki, sound bed and crystal light sessions, aura photography, and community events at 435 Main Street, South Boston, Virginia.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thelightspiritualwellness.com"),
  title: { default: `${site.name} · Crystals & energy healing in South Boston, VA`, template: `%s · ${site.short}` },
  description,
  openGraph: { title: site.name, description, siteName: site.name, locale: "en_US", type: "website", images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }] },
  twitter: { card: "summary_large_image", title: site.name, description, images: ["/images/og.jpg"] },
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const pad = (n: number) => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Store", "HealthAndBeautyBusiness"],
  name: site.name,
  description,
  telephone: site.phone,
  email: site.email,
  url: "https://www.thelightspiritualwellness.com",
  image: "https://www.thelightspiritualwellness.com/images/og.jpg",
  address: { "@type": "PostalAddress", streetAddress: site.street, addressLocality: site.city, addressRegion: site.region, postalCode: site.postal, addressCountry: "US" },
  sameAs: [site.instagram, site.facebook],
  openingHoursSpecification: hours.filter((h) => h.open != null).map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[h.day], opens: pad(h.open!), closes: pad(h.close!) })),
  hasMap: site.mapsUrl,
  areaServed: address,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
        <CartProvider>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
