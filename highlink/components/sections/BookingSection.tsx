import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";
import { BookingEmbed } from "../BookingEmbed";

export function BookingSection({ t }: { t: Dict["booking"] }) {
  return (
    <section id="booking" className="section relative" aria-labelledby="booking-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow index="10">{t.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline id="booking-title" lines={t.title} className="t-title mt-8" />
          <Reveal delay={0.15}>
            <p className="t-lead mt-6">{t.sub}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {t.expect.map((e, i) => (
                <li key={e} className="flex gap-4 text-[15px] leading-relaxed text-mute">
                  <span className="pt-[3px] font-mono text-[10px] tracking-[0.2em] text-accent">0{i + 1}</span>
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
          {site.email !== "[EMAIL]" && (
            <Reveal delay={0.3}>
              <p className="mt-10 text-sm text-dim">
                {t.email}{" "}
                <a href={`mailto:${site.email}`} className="text-fg underline decoration-line-2 underline-offset-4 hover:decoration-accent">
                  {site.email}
                </a>
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <BookingEmbed t={t} />
        </Reveal>
      </div>
    </section>
  );
}
