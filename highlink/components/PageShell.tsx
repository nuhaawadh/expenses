import type { Locale } from "@/lib/content";
import { WaveBackground } from "./WaveBackground";
import { Footer } from "./Footer";

/** Page frame shared by every route: fixed wave field, content, footer. */
export function PageShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <WaveBackground />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
