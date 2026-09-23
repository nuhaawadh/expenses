import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function FounderSection() {
  return (
    <section className="section relative" aria-labelledby="brand-title">
      <div className="frame">
        <div className="hairline mb-24 md:mb-40" />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow index="09">Why HIGHLink</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="brand-title"
            lines={["AI Is Not the Business."]}
            className="t-display balance mt-8"
          />
          <SplitHeadline
            as="p"
            delay={0.25}
            lines={["The System Behind It Is."]}
            className="t-display balance mt-1 text-mute"
          />
          <Reveal delay={0.25}>
            <p className="t-lead pretty mt-10 max-w-xl">
              HIGHLink helps ambitious businesses turn AI from a collection of tools into an operating system designed
              around the way their business actually works.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
