import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jpjucrwq8l.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
