"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

/**
 * Case studies use placeholders (lib/i18n.ts → cases.items) until real
 * client data exists. Never publish invented results.
 */
export function CaseStudies({ t }: { t: Dict["cases"] }) {
  const motifs = ["order", "align"] as const;
  return (
    <section id="case-studies" className="section relative" aria-labelledby="cases-title">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow index="08">{t.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="cases-title"
              lines={t.title}
              dimFrom={1}
              className="t-display mt-8"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="t-lead pretty">
              {t.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6 md:mt-24 md:space-y-8">
          {t.items.map((c, i) => (
            <Reveal key={i}>
              <article className="group relative overflow-hidden rounded-[14px] bg-ink-2/80 ring-1 ring-inset ring-line transition-[box-shadow] duration-700 hover:ring-line-2">
                <div className="grid lg:grid-cols-12">
                  <div className="relative flex flex-col justify-between gap-12 p-6 md:p-10 lg:col-span-7 lg:p-14">
                    <p className="t-eyebrow">
                      {t.label} <span className="text-accent">0{i + 1}</span>
                    </p>
                    <h3 className="t-case text-[clamp(2.2rem,5.4vw,5rem)] font-medium uppercase leading-[0.92] tracking-[-0.05em]">
                      {c.title[0]}
                      <br />
                      <span className="text-mute">{c.title[1]}</span>
                    </h3>
                    <Motif kind={motifs[i % motifs.length]} />
                  </div>

                  <dl className="border-t border-line lg:col-span-5 lg:border-s lg:border-t-0">
                    {(
                      [
                        [t.fields.industry, c.industry],
                        [t.fields.challenge, c.challenge],
                        [t.fields.system, c.system],
                        [t.fields.result, c.result],
                      ] as const
                    ).map(([k, v], j) => (
                      <div
                        key={k}
                        className={`flex flex-col gap-2 px-6 py-6 md:px-10 lg:px-10 lg:py-8 ${j > 0 ? "border-t border-line" : ""}`}
                      >
                        <dt className="t-eyebrow">{k}</dt>
                        <dd className={`font-mono text-sm ${j === 3 ? "text-accent/80" : "text-fg/60"}`}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Abstract motif: scattered marks resolve into an ordered system on view. */
function Motif({ kind }: { kind: "order" | "align" }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const count = 14;
  const seeded = (n: number) => {
    const x = Math.sin(n * 999) * 10000;
    return x - Math.floor(x);
  };

  return (
    <svg ref={ref} viewBox="0 0 420 60" className="h-auto w-full max-w-[420px]" aria-hidden fill="none">
      {Array.from({ length: count }).map((_, i) => {
        const x = 8 + i * 29;
        const chaosY = 10 + seeded(i + (kind === "order" ? 1 : 7)) * 40;
        const chaosR = (seeded(i + 3) - 0.5) * 120;
        return kind === "order" ? (
          <motion.rect
            key={i}
            width="2"
            height="18"
            fill={i === count - 1 ? "#5fd4b4" : "rgba(236,238,237,0.5)"}
            initial={{ x: x + (seeded(i) - 0.5) * 30, y: chaosY - 9, rotate: chaosR, opacity: 0.4 }}
            animate={inView ? { x, y: 21, rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.04 }}
          />
        ) : (
          <motion.circle
            key={i}
            r="2.5"
            fill={i === count - 1 ? "#5fd4b4" : "rgba(236,238,237,0.5)"}
            initial={{ cx: x + (seeded(i + 2) - 0.5) * 40, cy: chaosY, opacity: 0.35 }}
            animate={inView ? { cx: x, cy: 30, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.04 }}
          />
        );
      })}
      {kind === "align" && (
        <motion.line
          x1="8"
          y1="30"
          x2={8 + (count - 1) * 29}
          y2="30"
          stroke="rgba(95,212,180,0.35)"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 1.2 }}
        />
      )}
    </svg>
  );
}
