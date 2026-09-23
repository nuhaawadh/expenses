import type { Metadata, Viewport } from "next";
import { content, paths, type Locale } from "./content";
import { site } from "./site";

export function pageMetadata(locale: Locale, path: string = paths[locale].home, title?: string): Metadata {
  const t = content[locale].meta;
  return {
    metadataBase: new URL(site.url),
    title: title ? `${title} | ${site.name}` : t.title,
    description: t.description,
    applicationName: site.name,
    alternates: {
      canonical: path,
      languages: { ar: path.replace(/^\/en/, "/ar"), en: path.replace(/^\/ar/, "/en"), "x-default": "/ar" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: t.title,
      description: t.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050909" },
    { media: "(prefers-color-scheme: light)", color: "#050909" },
  ],
};
