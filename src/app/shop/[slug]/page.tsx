import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { getProduct, getProducts } from "@/lib/data";
import { money, shippingNote } from "@/lib/products";
import { site } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name}, ${money(product.price)}. ${product.category} from The Light Spiritual Wellness Center in South Boston, Virginia.`,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = (await getProducts()).filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((src) => `https://www.thelightspiritualwellness.com${src}`),
    category: product.category,
    offers: { "@type": "Offer", priceCurrency: "USD", price: product.price, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: site.name } },
  };

  return (
    <div className="bg-ivory pt-28 pb-20 text-ink md:pt-36 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <p className="text-sm text-ink/60"><Link href="/shop" className="hover:underline">Shop</Link> / {product.category}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-4">
            {product.images.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-3xl bg-ink">
                <Image src={src} alt={`${product.name}, photo ${i + 1}`} fill priority={i === 0} sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            {product.badge ? <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold tracking-wide uppercase">{product.badge}</span> : null}
            <h1 className="mt-3 text-5xl leading-[1.02] text-balance sm:text-6xl">{product.name}</h1>
            <p className="mt-4 font-heading text-4xl">{money(product.price)}</p>
            <div className="mt-8"><AddToCart slug={product.slug} /></div>
            <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-sm leading-relaxed text-ink/75">
              {product.unique ? <li>A one-of-one piece. Once it is gone, it is gone.</li> : null}
              <li>{shippingNote}</li>
              <li>Local to South Boston? Ask to pick it up in the shop: {site.phone}.</li>
            </ul>
          </div>
        </div>
        {related.length > 0 ? (
          <div className="mt-24">
            <h2 className="text-4xl">More {product.category.toLowerCase()}</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (<ProductCard key={p.slug} product={p} />))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
