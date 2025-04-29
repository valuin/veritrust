import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    remotePatterns: [new URL("https://flagsapi.com/**/**/*.png")],
  },
};

export default nextConfig;
