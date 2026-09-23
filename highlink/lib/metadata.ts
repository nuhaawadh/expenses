import type { Metadata, Viewport } from "next";
import { getDict, localePath, type Locale } from "./i18n";
import { site } from "./site";

export function buildMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    applicationName: site.name,
    alternates: {
      canonical: localePath[locale],
      languages: { en: localePath.en, ar: localePath.ar, "x-default": localePath.en },
    },
    openGraph: {
      type: "website",
      url: localePath[locale],
      siteName: site.name,
      title: t.ogTitle,
      description: t.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#07090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
