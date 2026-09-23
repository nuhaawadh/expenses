import { Atmosphere } from "./ui/Atmosphere";
import { Nav } from "./Nav";
import { Hero } from "./sections/Hero";
import { VideoSection } from "./sections/VideoSection";
import { ProblemSection } from "./sections/ProblemSection";
import { SolutionSection } from "./sections/SolutionSection";
import { SystemsSection } from "./sections/SystemsSection";
import { ProcessSection } from "./sections/ProcessSection";
import { BeforeAfter } from "./sections/BeforeAfter";
import { AgentsSection } from "./sections/AgentsSection";
import { MethodSection } from "./sections/MethodSection";
import { CaseStudies } from "./sections/CaseStudies";
import { FounderSection } from "./sections/FounderSection";
import { CTASection } from "./sections/CTASection";
import { BookingSection } from "./sections/BookingSection";
import { Footer } from "./Footer";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const other: Locale = locale === "en" ? "ar" : "en";
  const rtl = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url + (locale === "ar" ? "/ar" : ""),
    description: t.meta.description,
    inLanguage: locale,
    serviceType: ["AI systems", "Business automation", "AI agents"],
  };

  const langSwitch = { href: localePath[other], label: t.common.switchLabel, aria: t.common.switchAria, lang: other };

  return (
    <>
      <Atmosphere />
      <Nav t={t} langSwitch={langSwitch} />
      <main id="main" className="relative z-10 overflow-x-clip">
        <Hero t={t.hero} cta={t.cta} />
        <VideoSection t={t.video} flow={t.flow} rtl={rtl} />
        <ProblemSection t={t.problem} />
        <SolutionSection t={t.solution} />
        <SystemsSection t={t.systems} />
        <ProcessSection t={t.process} />
        <BeforeAfter t={t.beforeAfter} rtl={rtl} />
        <AgentsSection t={t.agents} />
        <MethodSection t={t.method} />
        <CaseStudies t={t.cases} />
        <FounderSection t={t.founder} />
        <CTASection t={t.final} cta={t.cta} />
        <BookingSection t={t.booking} />
      </main>
      <div className="relative z-10">
        <Footer t={t} langSwitch={langSwitch} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export type LangSwitch = { href: string; label: string; aria: string; lang: string };
