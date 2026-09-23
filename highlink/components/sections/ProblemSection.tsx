"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function ProblemSection({ t }: { t: Dict["problem"] }) {
  return (
    <section className="section relative" aria-labelledby="problem-title">
      <div className="frame">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow index="01">{t.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="problem-title"
              lines={t.title}
              dimFrom={1}
              className="t-display mt-8"
            />
          </div>
          <div className="flex flex-col justify-end gap-5 lg:col-span-4">
            <Reveal delay={0.1}>
              <p className="text-lg font-medium tracking-[-0.02em] text-fg md:text-xl">
                {t.lead}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="t-lead pretty">
                {t.body}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-20 md:mt-28">
          {t.items.map((p, i) => (
            <motion.li
              key={p.title}
              initial="hidden"
              whileInView="shown"
              viewport={viewportOnce}
              className="group relative grid grid-cols-[3rem_1fr] gap-x-4 gap-y-3 py-8 md:grid-cols-12 md:gap-10 md:py-11"
            >
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-line-2 rtl:origin-right"
                variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.2, ease, delay: i * 0.08 } } }}
              />
              <motion.span
                className="pt-2 font-mono text-[11px] tracking-[0.2em] text-dim transition-colors duration-500 group-hover:text-accent md:col-span-2"
                variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.8, delay: 0.2 + i * 0.08 } } }}
              >
                0{i + 1}
              </motion.span>
              <motion.h3
                className="text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:col-span-5 md:group-hover:translate-x-2 rtl:md:group-hover:-translate-x-2"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.15 + i * 0.08 } },
                }}
              >
                {p.title}
              </motion.h3>
              <motion.p
                className="col-start-2 max-w-md text-[15px] leading-relaxed text-mute md:col-span-5 md:col-start-8 md:pt-2 md:text-base"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.25 + i * 0.08 } },
                }}
              >
                {p.body}
              </motion.p>
            </motion.li>
          ))}
          <li aria-hidden className="h-px bg-line-2" />
        </ol>
      </div>
    </section>
  );
}
