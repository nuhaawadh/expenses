"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function MethodSection({ t }: { t: Dict["method"] }) {
  let n = 0;
  return (
    <section className="section relative" aria-labelledby="method-title">
      <div className="frame grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <Eyebrow index="07">{t.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="method-title"
              lines={t.title}
              className="t-display-sm mt-8"
            />
            <SplitHeadline
              as="p"
              delay={0.2}
              lines={t.subtitle}
              className="t-display-sm mt-2 text-mute"
            />
            <Reveal delay={0.2}>
              <p className="t-lead pretty mt-10 max-w-md">
                {t.body}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {t.phases.map((phase, pi) => (
            <div key={phase.label} className={pi > 0 ? "mt-14 md:mt-20" : ""}>
              <Reveal>
                <p className="t-eyebrow flex items-center gap-3">
                  <span className={pi === 1 ? "text-accent" : ""}>{phase.label}</span>
                  {pi === 1 && (
                    <span className="rounded-full px-2 py-1 text-[9px] text-accent ring-1 ring-inset ring-accent/40">
                      {t.aiBadge}
                    </span>
                  )}
                </p>
              </Reveal>
              <ol className="mt-6" start={n + 1}>
                {phase.steps.map((step) => {
                  const i = n++;
                  return (
                    <motion.li
                      key={step}
                      initial="hidden"
                      whileInView="shown"
                      viewport={viewportOnce}
                      className="group relative flex items-baseline gap-6 py-6 md:gap-10 md:py-7"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px origin-left bg-line-2 rtl:origin-right"
                        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.1, ease } } }}
                      />
                      <span className="w-8 shrink-0 font-mono text-[11px] tracking-[0.2em] text-dim transition-colors duration-500 group-hover:text-accent">
                        0{i + 1}
                      </span>
                      <motion.span
                        className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-tight tracking-[-0.035em]"
                        variants={{
                          hidden: { opacity: 0, y: 16 },
                          shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.1 } },
                        }}
                      >
                        {step}
                      </motion.span>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
