"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sunburst } from "@/components/sunburst";
import { CartButton } from "@/components/cart-drawer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({ announcement }: { announcement?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-300", scrolled ? "border-b border-white/10 bg-night" : "bg-transparent")}>
      {announcement ? <p className="bg-gold px-4 py-2 text-center text-sm font-medium text-ink">{announcement}</p> : null}
      <div className="mx-auto flex h-[4.5rem] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={site.name}>
          <Sunburst className="size-10 text-gold transition-transform duration-700 group-hover:rotate-45" />
          <span className="leading-none">
            <span className="block font-heading text-2xl tracking-[0.22em] text-ivory">THE LIGHT</span>
            <span className="mt-1 hidden font-heading text-[13px] tracking-[0.12em] text-gold-soft italic sm:block">spiritual wellness center</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors", active ? "bg-white/10 text-gold" : "text-ivory/85 hover:text-gold")}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <Button className="hidden h-11 rounded-full px-6 md:inline-flex" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book a session</Button>
          <Sheet>
            <SheetTrigger render={<button type="button" aria-label="Open menu" className="grid size-11 place-items-center rounded-full border border-white/20 text-ivory lg:hidden" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-popover sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-3xl tracking-[0.18em]">THE LIGHT</SheetTitle>
                <SheetDescription>South Boston, Virginia</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4">
                {nav.map((item) => (
                  <SheetClose key={item.href} render={<Link href={item.href} className="border-b border-white/10 py-4 font-heading text-4xl" />}>{item.label}</SheetClose>
                ))}
              </nav>
              <div className="mt-auto grid gap-3 p-4">
                <Button className="h-12 rounded-full" render={<a href={site.bookingUrl} target="_blank" rel="noreferrer" />}>Book a session</Button>
                <a className="text-center text-sm text-gold-soft" href={`tel:${site.phoneTel}`}>{site.phone}</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
