import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    remotePatterns: [new URL("https://flagsapi.com/**/**/*.png"), new URL("https://placehold.co/**")],
  },
};

export default nextConfig;
