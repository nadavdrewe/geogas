import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const configuredDistDir = process.env.NEXT_DIST_DIR;

const nextConfig: NextConfig = {
  // Keep dev and prod artifacts separate so running builds don't corrupt a live dev server.
  distDir: configuredDistDir || (isProduction ? ".next-prod" : ".next-dev"),
  serverExternalPackages: ["better-sqlite3"],
  // Avoid local sharp binary issues during builds; serve images as-is.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    // This box has repeatedly hit corrupted filesystem cache entries during production builds.
    // Disabling webpack's persistent cache avoids the resolver loop/OOM path.
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
