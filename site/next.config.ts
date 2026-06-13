import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // glassfx ships plain ESM source (no build step) — let Next compile it.
  transpilePackages: ["glassfx"],
};

export default nextConfig;
