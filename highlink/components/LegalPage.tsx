import { content, paths, type Locale } from "@/lib/content";
import { PageShell } from "./PageShell";

/** Privacy / Terms pages linked from the footer (content to be supplied). */
export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const t = content[locale].legal;
  return (
    <PageShell locale={locale}>
      <section className="px-5 pt-10 pb-16 md:pt-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-semibold md:text-5xl">{t[kind].title}</h1>
          <p className="font-mono text-sm text-muted">{t[kind].body}</p>
          <a href={paths[locale].home} className="mt-10 inline-block text-sm underline underline-offset-2">
            {t.back}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
