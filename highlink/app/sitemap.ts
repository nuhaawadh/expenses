import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${site.url}${p}`;
  return ["", "/privacy", "/terms"].flatMap((p) => {
    const languages = { ar: url(`/ar${p}`), en: url(`/en${p}`) };
    return [
      { url: url(`/ar${p}`), alternates: { languages } },
      { url: url(`/en${p}`), alternates: { languages } },
    ];
  });
}
