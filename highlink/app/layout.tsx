import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI systems",
    "AI automation agency",
    "AI agents for business",
    "business automation",
    "AI operating system",
    "workflow automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "We Build the System. You Scale the Business.",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Build the System. You Scale the Business.",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <div aria-hidden className="veil pointer-events-none fixed inset-0 z-[90] bg-ink" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
