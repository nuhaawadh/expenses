import { LegalPage } from "@/components/LegalPage";
import { content } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "/en/privacy", content.en.legal.privacy.title);

export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
