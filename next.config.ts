import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfigDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: nextConfigDir,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
