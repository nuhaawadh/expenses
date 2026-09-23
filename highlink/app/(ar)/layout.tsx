import localFont from "next/font/local";
import { RootShell } from "@/components/RootShell";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

/**
 * IBM Plex Sans Arabic, limited to the Arabic Unicode blocks (plus spaces
 * and shared punctuation, so Arabic word spacing is right) — Latin letters
 * and digits (HIGHLink, CRM, 01) keep rendering in Geist.
 */
const plexArabic = localFont({
  src: [
    { path: "../fonts/plex-arabic-400.woff2", weight: "400" },
    { path: "../fonts/plex-arabic-500.woff2", weight: "500" },
    { path: "../fonts/plex-arabic-600.woff2", weight: "600" },
  ],
  variable: "--font-arabic",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0020, U+00A0, U+00AB, U+00B7, U+00BB, U+2013-2014, U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC",
    },
  ],
});

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("ar");

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell locale="ar" fontClass={plexArabic.variable}>
      {children}
    </RootShell>
  );
}
