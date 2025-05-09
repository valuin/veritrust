import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    remotePatterns: [
      new URL("https://flagsapi.com/**/**/*.png"),
      new URL("https://placehold.co/**"),
      new URL("https://cdn.rri.co.id/**"),
    ],
  },
};

export default nextConfig;
