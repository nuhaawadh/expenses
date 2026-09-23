"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Content } from "@/lib/content";
import { ArrowDownIcon, LockIcon } from "./icons";
import { VslPlayer } from "./VslPlayer";

type Props = {
  t: Content["hero"];
  video: Content["video"];
  unlocked: boolean;
  progress: number;
  onProgress: (p: number) => void;
  onUnlock: () => void;
};

/** Section 01 — headline, sales video, locked booking button. */
export function Hero({ t, video, unlocked, progress, onProgress, onUnlock }: Props) {
  const goToBooking = () => {
    const el = document.getElementById("booking-heading");
    if (!el) return;
    el.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] px-5 pt-10 pb-24 md:pt-14 md:pb-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase">{t.eyebrow}</p>
        <h1 className="mb-5 text-4xl leading-[1.1] font-semibold md:text-5xl lg:text-[56px]">{t.title}</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{t.body}</p>

        <div className="mx-auto mb-4 max-w-3xl md:mb-6">
          <VslPlayer t={video} onProgress={onProgress} onUnlock={onUnlock} />
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/30" aria-hidden data-vsl-progress>
            <div
              className="h-full origin-left bg-progress transition-transform duration-300 ease-linear motion-reduce:transition-none rtl:origin-right"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        <p className="mb-2 text-xs text-white md:text-sm">{t.caption}</p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={!unlocked}
            aria-describedby="booking-availability"
            onClick={goToBooking}
            className="inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-3 rounded-lg bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-cta"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={unlocked ? "open" : "locked"}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {unlocked ? <ArrowDownIcon className="motion-safe:animate-bounce" /> : <LockIcon />}
              </motion.span>
            </AnimatePresence>
            {t.cta}
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={unlocked ? "open" : "locked"}
              id="booking-availability"
              role="status"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-white"
            >
              {unlocked ? t.unlocked : t.locked}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
