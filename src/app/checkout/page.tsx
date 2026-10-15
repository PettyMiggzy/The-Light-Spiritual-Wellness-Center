import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Review order", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHero eyebrow="Your order" title="Review, then send it to the shop." lede="This site does not take a card yet. Send the order note and the shop confirms availability, shipping, and payment with you." art="/images/art/shop.jpg" />
      <section className="bg-night py-16 md:py-24"><div className="mx-auto max-w-[1280px] px-5 sm:px-8"><CheckoutForm /></div></section>
    </>
  );
}
