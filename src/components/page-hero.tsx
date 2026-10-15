import Image from "next/image";
import { Motes } from "@/components/motes";

export function PageHero({ eyebrow, title, lede, art }: { eyebrow: string; title: string; lede?: string; art: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-night pt-36 pb-16 md:pt-44 md:pb-24">
      <Image src={art} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-night/55" />
      <Motes />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] text-balance sm:text-7xl">{title}</h1>
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/85">{lede}</p> : null}
      </div>
    </section>
  );
}
