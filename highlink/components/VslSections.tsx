"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import type { Content } from "@/lib/content";
import { useBookingUnlock } from "@/lib/useBookingUnlock";
import { Hero } from "./Hero";
import { BookingSection } from "./BookingSection";

/** The page's sections. The booking section only exists once it is unlocked. */
export function VslSections({ t }: { t: Content }) {
  const { unlocked, unlock } = useBookingUnlock();
  const [progress, setProgress] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <Hero
        t={t.hero}
        video={t.video}
        unlocked={unlocked}
        progress={progress}
        onProgress={setProgress}
        onUnlock={unlock}
      />
      {unlocked && <BookingSection t={t.booking} />}
    </MotionConfig>
  );
}
