"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

export function ProcessSection({ t }: { t: Dict["process"] }) {
  const STEPS = t.steps;
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="how-it-works" className="section relative" aria-labelledby="process-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <Eyebrow index="04">{t.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="process-title"
              lines={t.title}
              dimFrom={1}
              className="t-display-sm mt-8"
            />
            <div className="mt-12 hidden items-end gap-4 lg:flex" aria-hidden>
              <span className="relative block h-[1.1em] overflow-hidden font-mono text-5xl tabular-nums tracking-[-0.04em] text-fg">
                <motion.span
                  key={active}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.6, ease }}
                >
                  0{active + 1}
                </motion.span>
              </span>
              <span className="pb-1.5 font-mono text-xs tracking-[0.2em] text-dim">/ 0{STEPS.length}</span>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-5 lg:col-start-8">
          <span aria-hidden className="absolute start-0 top-0 bottom-0 w-px bg-line-2" />
          <motion.span
            aria-hidden
            className="absolute start-0 top-0 bottom-0 w-px origin-top bg-accent"
            style={{ scaleY: progress }}
          />
          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} step={s} active={active === i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  active,
  onActive,
}: {
  index: number;
  step: { title: string; body: string };
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  return (
    <li
      ref={ref}
      className={`relative py-10 ps-8 transition-opacity duration-700 md:ps-14 lg:py-16 ${active ? "opacity-100" : "opacity-100 lg:opacity-30"}`}
    >
      <span
        aria-hidden
        className={`absolute -start-[4px] top-[3.35rem] h-[9px] w-[9px] rounded-full border transition-colors duration-500 lg:top-[4.6rem] ${
          active ? "border-accent bg-accent" : "border-line-2 bg-ink"
        }`}
      />
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent">0{index + 1}</p>
        <h3 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.045em]">
          {step.title}
        </h3>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-mute md:text-lg">{step.body}</p>
      </Reveal>
    </li>
  );
}
