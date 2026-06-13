import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // glassfx ships plain ESM source (no build step) — let Next compile it.
  transpilePackages: ["glassfx"],
  // The package is linked from the parent dir (file:..). Point file tracing at
  // the repo root so Vercel bundles the package source that lives outside this
  // app's directory.
  outputFileTracingRoot: path.join(dir, ".."),
};

export default nextConfig;
