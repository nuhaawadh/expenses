import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";
import { SystemDiagram } from "../SystemDiagram";

export function SolutionSection({ t }: { t: Dict["solution"] }) {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="solution-title">
      <div className="frame">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow index="02">{t.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="solution-title"
            lines={t.title}
            dimFrom={1}
            className="t-display balance mt-8"
          />
          <Reveal delay={0.2}>
            <p className="t-lead mt-8 max-w-md">{t.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <SystemDiagram parts={t.parts} core={t.core} sr={t.sr} />
        </div>
      </div>
    </section>
  );
}
