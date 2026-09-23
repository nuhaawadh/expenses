import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const en = site.url;
  const ar = `${site.url}/ar`;
  const languages = { en, ar };
  return [
    { url: en, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: ar, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
  ];
}
