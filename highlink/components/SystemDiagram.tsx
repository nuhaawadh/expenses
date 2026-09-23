"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/motion";

const PARTS = ["Content", "Leads", "Sales", "Customers", "Operations", "Data", "Team"];

const W = 1000;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const RX = 400;
const RY = 235;

const points = PARTS.map((_, i) => {
  const a = -Math.PI / 2 + (i / PARTS.length) * Math.PI * 2;
  return [CX + Math.cos(a) * RX, CY + Math.sin(a) * RY] as const;
});

/** HIGHLink core connected to every function of the business. */
export function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref}>
      <p className="sr-only">
        Diagram: the HIGHLink AI System at the center, connected to Content, Leads, Sales, Customers, Operations,
        Data, and Team.
      </p>

      {/* Radial — tablet and up */}
      <div aria-hidden className="relative mx-auto hidden aspect-[1000/620] max-w-[1080px] md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
          <motion.ellipse
            cx={CX}
            cy={CY}
            rx={RX}
            ry={RY}
            stroke="rgba(255,255,255,0.08)"
            className="animate-flow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.8 }}
          />
          <ellipse cx={CX} cy={CY} rx={RX * 0.55} ry={RY * 0.55} stroke="rgba(255,255,255,0.04)" />
          {points.map(([x, y], i) => {
            const d = `M${CX} ${CY} L${x} ${y}`;
            return (
              <g key={i}>
                <motion.path
                  d={d}
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.09 }}
                />
                {inView && (
                  <path
                    d={i % 2 ? `M${x} ${y} L${CX} ${CY}` : d}
                    pathLength={1}
                    stroke="#5fd4b4"
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="comet"
                    style={{
                      animationIterationCount: "infinite",
                      animationDelay: `${1.6 + i * 0.55}s`,
                      ["--comet-dur" as string]: "3.2s",
                      strokeDashoffset: 0.14,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        <Core inView={inView} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        {points.map(([x, y], i) => (
          <motion.div
            key={PARTS[i]}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.9 + i * 0.09 }}
          >
            <PartChip label={PARTS[i]} />
          </motion.div>
        ))}
      </div>

      {/* Stacked tree — mobile: spine runs out of the core, parts branch left/right. */}
      <div className="md:hidden">
        <Core inView={inView} className="mx-auto" />
        <div className="relative mx-auto max-w-sm">
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-0 bottom-5 w-px origin-top bg-line-2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          />
          <ul className="pt-4">
            {PARTS.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={p}
                  className="relative grid grid-cols-2 py-1.5"
                  initial={{ opacity: 0, x: left ? 8 : -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, ease, delay: 0.5 + i * 0.08 }}
                >
                  <span
                    aria-hidden
                    className={`absolute top-1/2 h-px w-5 bg-line-2 ${left ? "right-1/2" : "left-1/2"}`}
                  />
                  <span aria-hidden className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                  <span className={left ? "col-start-1 justify-self-end pr-5" : "col-start-2 justify-self-start pl-5"}>
                    <PartChip label={p} />
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Core({ inView, className = "" }: { inView: boolean; className?: string }) {
  return (
    <motion.div
      className={`relative grid h-36 w-36 place-items-center md:h-44 md:w-44 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, ease }}
    >
      <span className="animate-ring absolute inset-6 rounded-full border border-accent/40" />
      <span className="animate-ring absolute inset-6 rounded-full border border-accent/30 [animation-delay:1.4s]" />
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(95,212,180,0.22),transparent)]" />
      <span className="relative grid h-24 w-24 place-items-center rounded-full bg-ink-2 ring-1 ring-accent/50 shadow-[0_0_60px_-10px_rgba(95,212,180,0.6)] md:h-28 md:w-28">
        <span className="text-center">
          <span className="block text-[13px] font-semibold tracking-[-0.03em] md:text-sm">HIGHLink</span>
          <span className="mt-1 block font-mono text-[8.5px] uppercase tracking-[0.18em] text-accent">AI System</span>
        </span>
      </span>
    </motion.div>
  );
}

function PartChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-ink-2 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg/85 ring-1 ring-inset ring-line-2 lg:text-[11.5px]">
      <span className="h-1 w-1 rounded-full bg-accent/70" />
      {label}
    </span>
  );
}
