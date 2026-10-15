import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** A service presented as a tarot card. */
export function ArcanaCard({ service, index }: { service: Service; index: number }) {
  return (
    <li>
      <Link href={`/services/${service.slug}`} className="group relative block aspect-[2/3] overflow-hidden rounded-3xl border border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_0_50px_rgba(232,194,106,0.3)] motion-reduce:transition-none">
        <Image src={service.art} alt="" fill sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        <div className="absolute inset-2 rounded-[1.3rem] border border-gold/30" />
        <p className="absolute top-5 left-0 w-full text-center font-heading text-xl tracking-[0.4em] text-gold">{numerals[index] ?? ""}</p>
        <div className="absolute inset-x-0 bottom-0 p-6 text-center">
          <h3 className="text-3xl leading-tight">{service.name}</h3>
          <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-relaxed text-ivory/80">{service.short}</p>
        </div>
      </Link>
    </li>
  );
}
