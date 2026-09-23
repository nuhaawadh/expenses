import type { Locale } from "@/lib/content";
import { themeInitScript } from "./ThemeToggle";

/** <html> per language: lang/dir flip the whole page for Arabic. */
export function RootShell({
  locale,
  fontClass = "",
  children,
}: {
  locale: Locale;
  fontClass?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontClass} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
