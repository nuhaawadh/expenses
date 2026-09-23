import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./Providers";
import { getDict, type Locale } from "@/lib/i18n";

/** <html> for each locale: sets lang/dir so the whole page flips for Arabic. */
export function RootShell({
  locale,
  fontClass = "",
  children,
}: {
  locale: Locale;
  fontClass?: string;
  children: React.ReactNode;
}) {
  const t = getDict(locale);
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${GeistSans.variable} ${GeistMono.variable} ${fontClass}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          {t.common.skip}
        </a>
        <div aria-hidden className="veil pointer-events-none fixed inset-0 z-[90] bg-ink" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
