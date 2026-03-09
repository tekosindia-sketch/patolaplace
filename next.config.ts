import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'assets.vercel.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ],
  },
  // other config options can be added here
};

export default nextConfig;
