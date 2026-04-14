import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bergen-transport",
  images: { unoptimized: true },
};

export default nextConfig;
