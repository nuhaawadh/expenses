"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { dur, ease, viewportOnce } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
};

/** Fade + rise + de-blur on first entry into the viewport. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: dur.base, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
