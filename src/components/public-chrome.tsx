"use client";

import { usePathname } from "next/navigation";

/** Hides the public header, footer, cart and effects on /admin pages. */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
