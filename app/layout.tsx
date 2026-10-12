import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
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
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.className}>
      <body>{children}</body>
    </html>
  );
}
