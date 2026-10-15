import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift cards",
  description: "Give a gift card to The Light Spiritual Wellness Center in South Boston, Virginia, for crystals, sessions, and events.",
};

export default function GiftCardsPage() {
  return (
    <>
      <PageHero eyebrow="Gift cards" title="Give someone a little light." lede="For crystals, sessions, and events. The easiest way to send someone a reason to slow down." art="/images/art/gift.jpg" />
      <section className="bg-ivory py-16 text-ink md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/art/gift.jpg" alt="An open indigo gift box with a gold ribbon, glowing crystals, and a lit candle" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-5xl leading-[1.02] text-balance">Buy a gift card online.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">Gift cards are sold on our current store page. You can also pick one up in the shop on Main Street, or call us and we will help.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-14 rounded-full bg-ink px-8 text-base text-ivory hover:bg-iris" render={<a href={site.giftCardUrl} target="_blank" rel="noreferrer" />}>Buy a gift card</Button>
              <Button variant="outline" className="h-14 rounded-full border-ink/30 bg-transparent px-8 text-base text-ink hover:bg-ink/5" render={<a href={`tel:${site.phoneTel}`} />}>Call {site.phone}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
