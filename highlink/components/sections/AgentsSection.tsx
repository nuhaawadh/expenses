"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/motion";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SplitHeadline } from "../ui/SplitHeadline";

/** Example tasks are illustrative UI states, not client data. */
const AGENTS = [
  {
    name: "Content Agent",
    body: "Creates and organizes content workflows.",
    tasks: ["Outlining next week’s scripts", "Repurposing a long-form piece", "Scheduling approved posts"],
  },
  {
    name: "Sales Agent",
    body: "Qualifies leads and follows up.",
    tasks: ["Scoring a new inbound lead", "Drafting a follow-up", "Booking a discovery call"],
  },
  {
    name: "Operations Agent",
    body: "Moves work between systems.",
    tasks: ["Syncing CRM to project board", "Routing a new request", "Compiling the weekly report"],
  },
  {
    name: "Customer Agent",
    body: "Handles repetitive customer interactions.",
    tasks: ["Answering a policy question", "Updating an order status", "Escalating to the team"],
  },
  {
    name: "Research Agent",
    body: "Finds, analyzes, and summarizes information.",
    tasks: ["Scanning market signals", "Summarizing call notes", "Comparing competitor offers"],
  },
];

export function AgentsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 2600);
    return () => clearInterval(t);
  }, [inView, reduce]);

  return (
    <section className="section relative" aria-labelledby="agents-title">
      <div className="frame">
        <Reveal>
          <Eyebrow index="06">AI agents</Eyebrow>
        </Reveal>
        <SplitHeadline
          id="agents-title"
          lines={["Your Business Doesn’t Need", "More Employees."]}
          className="t-display balance mt-8 max-w-5xl text-mute"
        />
        <SplitHeadline
          as="p"
          delay={0.25}
          lines={["It Needs Digital Workers."]}
          className="t-display mt-2 text-fg"
        />
        <Reveal delay={0.2}>
          <p className="t-lead pretty mt-10 max-w-xl">
            AI agents are digital workers with a defined role, access to the right knowledge, and clear rules for
            when to hand off to a human.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* system bus */}
          <div aria-hidden className="absolute left-[11px] top-0 bottom-0 w-px bg-line-2 lg:left-0 lg:right-0 lg:top-[11px] lg:bottom-auto lg:h-px lg:w-auto">
            <motion.span
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent/70 via-accent/30 to-transparent lg:origin-left lg:bg-gradient-to-r"
              initial={{ scale: 0 }}
              animate={seen ? { scale: 1 } : {}}
              transition={{ duration: 1.8, ease }}
            />
          </div>

          <ul className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {AGENTS.map((a, i) => {
              const live = (tick + i) % AGENTS.length === 0;
              return (
                <motion.li
                  key={a.name}
                  className="relative pl-12 lg:pl-0 lg:pt-14"
                  initial={{ opacity: 0, y: 20 }}
                  animate={seen ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.12 }}
                >
                  <span aria-hidden className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center">
                    {live && <span className="animate-ring absolute inset-0 rounded-full bg-accent/60" />}
                    <span
                      className={`relative grid h-[23px] w-[23px] place-items-center rounded-full border bg-ink transition-colors duration-500 ${
                        live ? "border-accent" : "border-line-2"
                      }`}
                    >
                      <span className={`h-[7px] w-[7px] rounded-full transition-colors duration-500 ${live ? "bg-accent" : "bg-fg/40"}`} />
                    </span>
                  </span>

                  <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg">{a.name}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-mute lg:min-h-[3.4rem]">{a.body}</p>

                  <div className="mt-5 flex h-9 items-center gap-2.5 overflow-hidden rounded-md bg-white/[0.02] px-3 ring-1 ring-inset ring-line">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${live ? "animate-blink bg-accent" : "bg-dim"}`}
                    />
                    <span className="relative h-4 flex-1 overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={Math.floor((tick + i) / AGENTS.length)}
                          className="absolute inset-0 truncate font-mono text-[10.5px] leading-4 text-fg/70"
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -14, opacity: 0 }}
                          transition={{ duration: 0.5, ease }}
                        >
                          {a.tasks[Math.floor((tick + i) / AGENTS.length) % a.tasks.length]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
