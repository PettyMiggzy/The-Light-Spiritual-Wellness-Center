import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <li>
      <Link href={`/services/${service.slug}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-card">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={service.art} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
        </div>
        <div className="p-6">
          <h3 className="text-3xl leading-tight">{service.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
        </div>
      </Link>
    </li>
  );
}
