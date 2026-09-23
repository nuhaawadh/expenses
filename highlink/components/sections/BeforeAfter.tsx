"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Scroll-scrubbed transformation: the section pins, and each "before"
 * gets struck through as its "after" comes online.
 */
export function BeforeAfter({ t, rtl }: { t: Dict["beforeAfter"]; rtl: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));

  const headlineDim = useTransform(p, [0, 0.12], [1, 0.9]);
  const glow = useTransform(p, [0.1, 0.9], [0, 1]);
  const meter = useTransform(p, [0.08, 0.72], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh]" aria-labelledby="ba-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="pointer-events-none absolute inset-x-0 bottom-[-30%] mx-auto h-[70%] w-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(95,212,180,0.14),transparent)] blur-2xl"
        />
        <div className="frame relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow index="05">{t.eyebrow}</Eyebrow>
              <motion.h2 id="ba-title" style={{ opacity: headlineDim }} className="t-display mt-6 md:mt-8">
                {t.title[0]} <span className="text-mute">{t.title[1]}</span>
              </motion.h2>
            </div>
            <div className="flex items-center gap-3 md:pb-3" aria-hidden>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{t.before}</span>
              <span className="relative h-px w-24 bg-line-2 md:w-40">
                <motion.span style={{ scaleX: meter }} className="absolute inset-0 origin-left bg-accent rtl:origin-right" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{t.after}</span>
            </div>
          </div>

          <div className="mt-10 md:mt-16">
            <div className="hidden grid-cols-12 gap-10 pb-4 md:grid" aria-hidden>
              <span className="col-span-5 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{t.before}</span>
              <span className="col-span-6 col-start-7 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{t.after}</span>
            </div>
            <ul>
              {t.rows.map(([before, after], i) => (
                <Row key={before} p={p} i={i} before={before} after={after} labels={[t.before, t.after]} rtl={rtl} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  p,
  i,
  before,
  after,
  labels,
  rtl,
}: {
  p: MotionValue<number>;
  i: number;
  before: string;
  after: string;
  labels: [string, string];
  rtl: boolean;
}) {
  const start = 0.08 + i * 0.105;
  const end = start + 0.09;
  const strike = useTransform(p, [start, end], [0, 1]);
  const beforeOpacity = useTransform(p, [start, end], [1, 0.4]);
  const afterOpacity = useTransform(p, [start, end], [0.12, 1]);
  const afterX = useTransform(p, [start, end], [rtl ? 12 : -12, 0]);
  const dot = useTransform(p, [start, end], [0, 1]);

  return (
    <li className="grid grid-cols-1 gap-1 border-t border-line py-3 md:grid-cols-12 md:items-center md:gap-10 md:py-5">
      <motion.span style={{ opacity: beforeOpacity }} className="relative w-fit text-[15px] text-mute md:col-span-5 md:text-2xl md:tracking-[-0.03em]">
        <span className="sr-only">{labels[0]}: </span>
        {before}
        <motion.span
          aria-hidden
          style={{ scaleX: strike }}
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-mute rtl:origin-right"
        />
      </motion.span>
      <span aria-hidden className="hidden text-center font-mono text-dim md:col-span-1 md:block rtl:-scale-x-100">
        →
      </span>
      <motion.span
        style={{ opacity: afterOpacity, x: afterX }}
        className="flex items-center gap-3 text-xl font-medium tracking-[-0.035em] md:col-span-6 md:text-[2rem] md:leading-tight"
      >
        <motion.span aria-hidden style={{ scale: dot }} className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span className="sr-only">{labels[1]}: </span>
        {after}
      </motion.span>
    </li>
  );
}
