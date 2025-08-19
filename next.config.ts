import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['gsap', '@gsap/react']
  },
  images: {
    domains: [],
    unoptimized: false
  }
};

export default nextConfig;