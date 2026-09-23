"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
};

/**
 * CTA that leans toward the cursor. The label moves a little further than
 * the shell, which gives the "magnetic" depth without feeling gimmicky.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  size = "md",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const lx = useSpring(useMotionValue(0), spring);
  const ly = useSpring(useMotionValue(0), spring);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.3);
    lx.set(dx * 0.08);
    ly.set(dy * 0.1);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
    lx.set(0);
    ly.set(0);
  }

  const sizing = size === "lg" ? "h-14 px-8 text-[15px]" : "h-12 px-6 text-sm";
  const look =
    variant === "primary"
      ? "bg-fg text-ink hover:shadow-[0_0_0_1px_rgba(95,212,180,0.5),0_12px_48px_-8px_rgba(95,212,180,0.45)]"
      : "text-fg ring-1 ring-inset ring-line-2 hover:ring-fg/40 hover:bg-white/[0.03]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={`group relative inline-flex select-none items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[box-shadow,background-color] duration-500 ${sizing} ${look} ${className}`}
    >
      <motion.span style={{ x: lx, y: ly }} className="relative inline-flex items-center gap-2.5">
        {children}
        {arrow && (
          <span aria-hidden className="relative inline-block h-[1em] w-[1em] overflow-hidden rtl:-scale-x-100">
            <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-full">→</span>
            <span className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0">→</span>
          </span>
        )}
      </motion.span>
    </motion.a>
  );
}
