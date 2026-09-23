"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";

export const FLOW_STEPS = [
  "Mapping the business — people, tools, knowledge, processes",
  "AI brain structures company knowledge into usable context",
  "Agents assigned to content, sales, operations and support",
  "Automations triggered across connected workflows",
  "CRM, marketing, sales and operations updated in sync",
  "Growth — more output without more headcount",
];

const STEP_MS = 1900;

type Node = { id: string; label: string; sub?: string; stage: number; kind?: "core" | "fn" | "goal" };
type Pos = Record<string, [number, number]>;

const NODES: Node[] = [
  { id: "business", label: "Business", sub: "People · Tools · Knowledge", stage: 0 },
  { id: "brain", label: "AI Brain", sub: "Context + reasoning", stage: 1, kind: "core" },
  { id: "agents", label: "AI Agents", sub: "Digital workers", stage: 2 },
  { id: "auto", label: "Automations", sub: "Workflows · Triggers", stage: 3 },
  { id: "crm", label: "CRM", stage: 4, kind: "fn" },
  { id: "mkt", label: "Marketing", stage: 4, kind: "fn" },
  { id: "sales", label: "Sales", stage: 4, kind: "fn" },
  { id: "ops", label: "Operations", stage: 4, kind: "fn" },
  { id: "growth", label: "Growth", sub: "Scale", stage: 5, kind: "goal" },
];

const FNS = ["crm", "mkt", "sales", "ops"];
const EDGES: [string, string][] = [
  ["business", "brain"],
  ["brain", "agents"],
  ["agents", "auto"],
  ...FNS.map((f) => ["auto", f] as [string, string]),
  ...FNS.map((f) => [f, "growth"] as [string, string]),
];

const LAYOUTS = {
  wide: {
    w: 1600,
    h: 900,
    dir: "h" as const,
    pos: {
      business: [150, 450],
      brain: [430, 450],
      agents: [710, 450],
      auto: [990, 450],
      crm: [1240, 190],
      mkt: [1240, 363],
      sales: [1240, 537],
      ops: [1240, 710],
      growth: [1470, 450],
    } as Pos,
  },
  tall: {
    w: 400,
    h: 600,
    dir: "v" as const,
    pos: {
      business: [200, 52],
      brain: [200, 146],
      agents: [200, 240],
      auto: [200, 334],
      crm: [108, 420],
      mkt: [292, 420],
      sales: [108, 476],
      ops: [292, 476],
      growth: [200, 556],
    } as Pos,
  },
};

function edgePath([x1, y1]: [number, number], [x2, y2]: [number, number], dir: "h" | "v") {
  if (dir === "h") {
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
}

const stageOf = (id: string) => NODES.find((n) => n.id === id)!.stage;

export function SystemFlow({ onStep }: { onStep?: (s: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const drawn = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(FLOW_STEPS.length - 1);
      return;
    }
    if (!inView) return;
    const t = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % FLOW_STEPS.length;
        if (next === 0) setCycle((c) => c + 1);
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(t);
  }, [inView, reduce]);

  useEffect(() => onStep?.(step), [step, onStep]);

  return (
    <div ref={ref} className="relative">
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div aria-hidden className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-accent/[0.035] to-transparent" />

      <Canvas layout="wide" className="hidden aspect-video md:block" step={step} cycle={cycle} drawn={drawn} />
      <Canvas layout="tall" className="aspect-[2/3] md:hidden" step={step} cycle={cycle} drawn={drawn} />

      <p className="sr-only">
        Diagram: Business flows into an AI Brain, which directs AI Agents, which run Automations across CRM,
        Marketing, Sales and Operations, producing Business Growth.
      </p>
    </div>
  );
}

function Canvas({
  layout,
  className,
  step,
  cycle,
  drawn,
}: {
  layout: keyof typeof LAYOUTS;
  className: string;
  step: number;
  cycle: number;
  drawn: boolean;
}) {
  const L = LAYOUTS[layout];
  const wide = layout === "wide";

  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="absolute inset-0 h-full w-full" fill="none">
        {EDGES.map(([a, b], i) => {
          const d = edgePath(L.pos[a], L.pos[b], L.dir);
          const s = stageOf(a);
          const lit = s < step || (step === FLOW_STEPS.length - 1 && s <= step);
          return (
            <g key={`${a}-${b}`}>
              <motion.path
                d={d}
                stroke={lit ? "rgba(95,212,180,0.38)" : "rgba(255,255,255,0.13)"}
                strokeWidth={wide ? 1.5 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: drawn ? 1 : 0 }}
                transition={{ duration: 1.4, ease, delay: 0.2 + i * 0.06 }}
                style={{ transition: "stroke 0.6s" }}
              />
              {s === step && drawn && (
                <path
                  key={`${cycle}-${step}`}
                  d={d}
                  pathLength={1}
                  className="comet"
                  stroke="#5fd4b4"
                  strokeWidth={wide ? 3 : 2}
                  strokeLinecap="round"
                  style={{ ["--comet-dur" as string]: `${STEP_MS * 0.8}ms`, filter: "drop-shadow(0 0 6px #5fd4b4)" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((n, i) => {
        const [x, y] = L.pos[n.id];
        const active = n.stage === step;
        const done = n.stage < step;
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={drawn ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.07 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / L.w) * 100}%`, top: `${(y / L.h) * 100}%` }}
          >
            <Chip node={n} active={active} done={done} wide={wide} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Chip({ node, active, done, wide }: { node: Node; active: boolean; done: boolean; wide: boolean }) {
  const core = node.kind === "core";
  const goal = node.kind === "goal";
  const tone = active
    ? "ring-accent/70 bg-[#0f1a18] text-fg shadow-[0_0_40px_-6px_rgba(95,212,180,0.55)]"
    : done
      ? "ring-accent/25 bg-ink-2 text-fg"
      : "ring-line-2 bg-ink-2 text-mute";

  return (
    <div
      className={`relative flex items-center gap-2 whitespace-nowrap rounded-md ring-1 ring-inset transition-all duration-700 ${tone} ${
        wide ? "px-2.5 py-2 lg:px-3.5 lg:py-2.5" : "px-2.5 py-1.5"
      } ${core && wide ? "lg:px-4 lg:py-3" : ""} ${node.kind === "fn" && wide ? "justify-center lg:w-[8.5rem]" : ""}`}
    >
      {(core || goal) && (
        <span className="relative flex h-2 w-2 shrink-0">
          {active && <span className="animate-ring absolute inset-0 rounded-full bg-accent" />}
          <span className={`relative h-2 w-2 rounded-full ${active || done ? "bg-accent" : "bg-dim"}`} />
        </span>
      )}
      <span className="flex flex-col">
        <span className={`font-mono uppercase tracking-[0.14em] ${wide ? "text-[9px] lg:text-[11px]" : "text-[9.5px]"}`}>
          {node.label}
          {goal && " ↗"}
        </span>
        {node.sub && wide && (
          <span className="mt-1 hidden text-[10.5px] tracking-normal text-dim lg:block">{node.sub}</span>
        )}
      </span>
    </div>
  );
}
