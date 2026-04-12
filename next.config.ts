import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid local sharp binary issues during builds; serve images as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
