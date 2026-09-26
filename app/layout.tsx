import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "الدفتر",
  description: "سجّل مصروفاتك بجملة عربية واحدة، واعرف وين راحت فلوسك.",
  applicationName: "الدفتر",
  // يخفي شريط المتصفح حين يُفتح من شاشة الجوال الرئيسية على iOS
  appleWebApp: { capable: true, title: "الدفتر", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a130d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={plex.className}>
      <body>{children}</body>
    </html>
  );
}
