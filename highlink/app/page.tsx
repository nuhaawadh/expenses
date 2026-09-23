import { Atmosphere } from "@/components/ui/Atmosphere";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { AgentsSection } from "@/components/sections/AgentsSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FounderSection } from "@/components/sections/FounderSection";
import { CTASection } from "@/components/sections/CTASection";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  serviceType: ["AI systems", "Business automation", "AI agents"],
};

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <main id="main" className="relative z-10 overflow-x-clip">
        <Hero />
        <VideoSection />
        <ProblemSection />
        <SolutionSection />
        <SystemsSection />
        <ProcessSection />
        <BeforeAfter />
        <AgentsSection />
        <MethodSection />
        <CaseStudies />
        <FounderSection />
        <CTASection />
        <BookingSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
