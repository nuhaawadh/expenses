"use client";

import { motion } from "framer-motion";
import { ctas } from "@/lib/site";
import { dur, ease } from "@/lib/motion";
import { SplitHeadline } from "../ui/SplitHeadline";
import { MagneticButton } from "../ui/MagneticButton";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: dur.base, ease, delay },
});

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-16 md:pt-48 md:pb-24" aria-labelledby="hero-title">
      <div className="frame flex flex-col items-center text-center">
        <motion.p {...fadeUp(0.35)} className="t-eyebrow mb-8 flex items-center gap-3 md:mb-10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ring absolute inset-0 rounded-full bg-accent" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Build your AI operating system
        </motion.p>

        <SplitHeadline
          as="h1"
          id="hero-title"
          immediate
          delay={0.45}
          stagger={0.07}
          lines={["We Build the System.", "You Scale the Business."]}
          dimFrom={1}
          className="t-hero balance max-w-[14ch] sm:max-w-none"
        />

        <motion.p {...fadeUp(1.05)} className="t-lead pretty mt-8 max-w-[34rem] md:mt-10">
          Your business already has the people, tools, knowledge, and processes. We connect them into an AI-powered
          system designed to help your company operate and scale.
        </motion.p>

        <motion.div
          {...fadeUp(1.2)}
          className="mt-10 flex w-full flex-col items-stretch gap-3 xs:w-auto xs:flex-row xs:items-center md:mt-12"
        >
          <MagneticButton href={ctas.primary.href} arrow size="lg">
            {ctas.primary.label}
          </MagneticButton>
          <MagneticButton href={ctas.secondary.href} variant="ghost" size="lg">
            {ctas.secondary.label}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
