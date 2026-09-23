import { ctas } from "@/lib/site";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-36 md:py-56" aria-labelledby="cta-title">
      {/* horizon */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(95,212,180,0.13),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <div className="frame relative flex flex-col items-center text-center">
        <SplitHeadline
          id="cta-title"
          lines={["Ready to Build", "Your AI System?"]}
          dimFrom={1}
          className="t-hero balance"
          stagger={0.07}
        />
        <Reveal delay={0.3}>
          <p className="t-lead pretty mt-10 max-w-lg">
            Tell us how your business works.
            <br className="hidden xs:block" /> We’ll identify where AI can create the most leverage.
          </p>
        </Reveal>
        <Reveal delay={0.4} className="mt-12 flex w-full flex-col gap-3 xs:w-auto xs:flex-row">
          <MagneticButton href={ctas.primary.href} arrow size="lg">
            {ctas.primary.label}
          </MagneticButton>
          <MagneticButton href={ctas.call.href} variant="ghost" size="lg">
            {ctas.call.label}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
