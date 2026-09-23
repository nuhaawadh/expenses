import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";
import { SystemDiagram } from "../SystemDiagram";

export function SolutionSection() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="solution-title">
      <div className="frame">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow index="02">The solution</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="solution-title"
            lines={["Your Business Needs a System.", "Not Another Tool."]}
            dimFrom={1}
            className="t-display balance mt-8"
          />
          <Reveal delay={0.2}>
            <p className="t-lead mt-8 max-w-md">We design and build the AI infrastructure behind your business.</p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}
