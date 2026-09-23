"use client";

import { motion } from "framer-motion";
import { dur, ease, viewportOnce } from "@/lib/motion";

type Props = {
  /** Each entry renders on its own line. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Lines at or after this index render in the muted tone. */
  dimFrom?: number;
  delay?: number;
  /** Animate on mount instead of on scroll (used above the fold). */
  immediate?: boolean;
  stagger?: number;
  id?: string;
};

/**
 * Word-by-word masked rise. Words slide up from behind their own
 * clipping box, so the headline "types" itself in without fading text.
 */
export function SplitHeadline({
  lines,
  as = "h2",
  className = "",
  dimFrom,
  delay = 0,
  immediate = false,
  stagger = 0.055,
  id,
}: Props) {
  const Tag = motion[as];
  let wordIndex = 0;

  const trigger = immediate
    ? { initial: "hidden", animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport: viewportOnce };

  return (
    <Tag id={id} className={className} {...trigger} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={`block ${dimFrom !== undefined && li >= dimFrom ? "text-mute" : ""}`}>
          {line.split(" ").map((word, wi) => {
            const i = wordIndex++;
            return (
              <span key={wi} className="split-word inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "105%" },
                    shown: {
                      y: "0%",
                      transition: { duration: dur.slow, ease, delay: delay + i * stagger },
                    },
                  }}
                >
                  {word}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
