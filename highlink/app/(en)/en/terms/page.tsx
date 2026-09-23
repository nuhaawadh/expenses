import { LegalPage } from "@/components/LegalPage";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "/en/terms", content.en.legal.terms.title);

export default function Page() {
  return <LegalPage locale="en" kind="terms" />;
}
