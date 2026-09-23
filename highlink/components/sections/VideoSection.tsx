"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { dur, ease } from "@/lib/motion";
import { SystemFlow, FLOW_STEPS } from "../SystemFlow";

/**
 * Cinematic demonstration frame directly under the hero.
 * With `site.heroVideo.src` set it lazy-loads the real video;
 * otherwise it runs the live system visualization.
 */
export function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const [step, setStep] = useState(0);
  const hasVideo = Boolean(site.heroVideo.src);

  return (
    <section aria-label="System demonstration" className="relative pb-28 md:pb-44">
      <div className="frame" style={{ perspective: 1600 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.35 }}
          style={reduce ? undefined : { scale, rotateX, transformOrigin: "50% 0%" }}
          className="relative mx-auto max-w-[1180px]"
        >
          {/* halo */}
          <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(95,212,180,0.12),transparent)] blur-2xl" />

          <div className="relative overflow-hidden rounded-[14px] bg-ink-2 ring-1 ring-line-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            {/* player chrome — top */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
              <div className="flex items-center gap-2.5">
                <span className="animate-blink h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                  Live system <span className="hidden xs:inline">· HIGHLink OS</span>
                </span>
              </div>
              <span className="font-mono text-[10px] tabular-nums tracking-[0.15em] text-dim">
                {hasVideo ? "DEMO" : `STEP 0${step + 1} / 0${FLOW_STEPS.length}`}
              </span>
            </div>

            {hasVideo ? <LazyVideo /> : <SystemFlow onStep={setStep} />}

            {/* player chrome — bottom */}
            {!hasVideo && (
              <div className="border-t border-line px-4 py-3.5 md:px-5">
                <div className="flex items-center justify-between gap-4">
                  <motion.p
                    key={step}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="truncate font-mono text-[11px] tracking-[0.04em] text-fg/80"
                  >
                    <span className="text-accent">›</span> {FLOW_STEPS[step]}
                  </motion.p>
                  <div className="hidden gap-1 sm:flex" aria-hidden>
                    {FLOW_STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-[3px] w-6 rounded-full transition-colors duration-500 ${i <= step ? "bg-accent" : "bg-line-2"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.slow, ease, delay: 2 }}
          className="mx-auto mt-6 max-w-md text-center text-[13px] leading-relaxed text-dim"
        >
          How HIGHLink turns the way your business already works into one connected AI system.
        </motion.p>
      </div>
    </section>
  );
}

function LazyVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="aspect-[4/5] w-full object-cover sm:aspect-video"
      poster={site.heroVideo.poster || undefined}
      src={load ? site.heroVideo.src : undefined}
      preload="none"
      playsInline
      muted
      loop
      autoPlay
      controls
    />
  );
}
