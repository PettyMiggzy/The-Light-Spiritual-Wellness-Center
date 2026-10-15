import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShopBrowser } from "@/components/shop-browser";
import { shippingNote } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop crystals",
  description: "Clusters, spheres, raw pieces, carvings, and crystal kits from The Light Spiritual Wellness Center in South Boston, Virginia.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero eyebrow="The crystal shop" title="Pieces worth holding." lede="Clusters, spheres, carvings, raw pieces, and crystal kits, chosen and photographed in our shop on Main Street." art="/images/art/shop.jpg" />
      <section className="bg-ivory py-12 text-ink md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <p className="mb-8 rounded-2xl bg-ink px-5 py-3 text-center text-sm text-gold-soft">{shippingNote}</p>
          <ShopBrowser />
        </div>
      </section>
    </>
  );
}
