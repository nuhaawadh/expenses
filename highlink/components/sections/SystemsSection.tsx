"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function SystemsSection({ t }: { t: Dict["systems"] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="systems" className="section relative" aria-labelledby="systems-title">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow index="03">{t.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="systems-title"
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

        <ul className="mt-16 border-b border-line-2 md:mt-24">
          {t.items.map((s, i) => {
            const open = active === i;
            return (
              <Reveal as="li" key={s.name} delay={i * 0.06} className="border-t border-line-2">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`system-panel-${i}`}
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-6 text-start md:grid-cols-12 md:gap-10 md:py-9"
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 md:col-span-2 ${open ? "text-accent" : "text-dim"}`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-[clamp(1.55rem,4.4vw,4rem)] font-medium leading-[1] tracking-[-0.045em] transition-colors duration-500 md:col-span-9 ${
                        open ? "text-fg" : "text-fg/30 group-hover:text-fg/60"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span
                      aria-hidden
                      className={`relative h-3 w-3 justify-self-end transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:col-span-1 ${open ? "rotate-45" : ""}`}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-fg/70" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-fg/70" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`system-panel-${i}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                      className="overflow-hidden"
                    >
                      <Pipeline steps={s.flow} marks={t.stepMarks} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Pipeline({ steps, marks }: { steps: string[]; marks: string[] }) {
  return (
    <div className="pb-10 md:grid md:grid-cols-12 md:gap-10 md:pb-14">
      <ol className="relative md:col-span-10 md:col-start-3 md:grid md:grid-cols-5">
        {/* connector */}
        <motion.span
          aria-hidden
          className="absolute start-[5px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent/70 to-accent/10 md:start-0 md:end-0 md:top-[5px] md:bottom-auto md:h-px md:w-auto md:origin-left md:bg-gradient-to-r rtl:md:origin-right rtl:md:bg-gradient-to-l"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
        />
        {steps.map((step, j) => (
          <motion.li
            key={step}
            className="relative flex items-center gap-5 py-2.5 md:block md:py-0 md:pe-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 + j * 0.09 }}
          >
            <span className="relative z-10 block h-[11px] w-[11px] shrink-0 rounded-full border border-accent/70 bg-ink">
              <span className="absolute inset-[3px] rounded-full bg-accent" />
            </span>
            <span className="md:mt-6 md:block">
              <span className="me-3 font-mono text-[10px] tracking-[0.18em] text-dim md:mb-2 md:me-0 md:block">
                {marks[j]}
              </span>
              <span className="text-[17px] tracking-[-0.02em] text-fg md:text-lg">{step}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
