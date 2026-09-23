import { LegalPage } from "@/components/LegalPage";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ar", "/ar/terms", content.ar.legal.terms.title);

export default function Page() {
  return <LegalPage locale="ar" kind="terms" />;
}
