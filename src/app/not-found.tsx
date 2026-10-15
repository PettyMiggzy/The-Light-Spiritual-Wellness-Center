import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-night px-5 pt-24 text-center">
      <div>
        <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">404</p>
        <h1 className="mt-4 text-6xl sm:text-8xl">This path is dark.</h1>
        <p className="mt-4 text-muted-foreground">The page you wanted isn&apos;t here. Let&apos;s find the light.</p>
        <Button className="mt-8 h-12 rounded-full px-8" render={<Link href="/" />}>Back home</Button>
      </div>
    </section>
  );
}
