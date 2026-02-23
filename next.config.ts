import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io", // Whitelist TinaCMS Cloud Media
      },
    ],
  },
};

export default nextConfig;
