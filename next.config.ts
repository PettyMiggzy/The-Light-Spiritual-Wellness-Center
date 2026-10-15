import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }] },
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
};

export default nextConfig;
