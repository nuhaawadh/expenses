import { LegalPage } from "@/components/LegalPage";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ar", "/ar/privacy", content.ar.legal.privacy.title);

export default function Page() {
  return <LegalPage locale="ar" kind="privacy" />;
}
