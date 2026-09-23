import type { NextConfig } from "next";

/** PREVIEW_EXPORT=1 builds a static export for the self-contained preview (scripts/build-preview.mjs). */
const preview = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["framer-motion"] },
  // The preview is a static export (scripts/export-preview.sh sets the API route aside);
  // NEXT_PUBLIC_PREVIEW tells the booking form not to submit.
  ...(preview ? { output: "export" as const, distDir: ".next-preview", env: { NEXT_PUBLIC_PREVIEW: "1" } } : {}),
};

export default nextConfig;
