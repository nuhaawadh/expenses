import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function FounderSection({ t }: { t: Dict["founder"] }) {
  return (
    <section className="section relative" aria-labelledby="brand-title">
      <div className="frame">
        <div className="hairline mb-24 md:mb-40" />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow index="09">{t.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="brand-title"
            lines={[t.title]}
            className="t-display balance mt-8"
          />
          <SplitHeadline
            as="p"
            delay={0.25}
            lines={[t.subtitle]}
            className="t-display balance mt-1 text-mute"
          />
          <Reveal delay={0.25}>
            <p className="t-lead pretty mt-10 max-w-xl">
              {t.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
