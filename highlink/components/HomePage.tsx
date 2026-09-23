import { content, type Locale } from "@/lib/content";
import { PageShell } from "./PageShell";
import { VslSections } from "./VslSections";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <PageShell locale={locale}>
      <VslSections t={content[locale]} />
    </PageShell>
  );
}
