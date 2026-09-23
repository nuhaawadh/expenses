import type { NextConfig } from "next";

/** PREVIEW_EXPORT=1 builds a static export for the self-contained preview (scripts/build-preview.mjs). */
const preview = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["framer-motion"] },
  ...(preview ? { output: "export" as const, distDir: ".next-preview" } : {}),
};

export default nextConfig;
