import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Serve images directly — avoids /_next/image 400 errors on Coolify/Docker
    unoptimized: true,
  },
};

export default nextConfig;
