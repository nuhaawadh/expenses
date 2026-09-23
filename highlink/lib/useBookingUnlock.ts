"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "./site";

const STORES = ["localStorage", "sessionStorage"] as const;

function readUnlocked() {
  for (const s of STORES) {
    try {
      if (window[s].getItem(site.unlockKey) === "1") return true;
    } catch {
      /* storage unavailable */
    }
  }
  return false;
}

/**
 * Booking stays locked until the visitor has actually watched
 * `site.unlockAfterSeconds` of the video (or reached the end).
 * Once unlocked it is remembered and synced across tabs.
 * With no video configured there is nothing to watch, so booking is open.
 */
const NO_VIDEO = !site.video.src;

export function useBookingUnlock() {
  const [unlocked, setUnlocked] = useState(NO_VIDEO);

  useEffect(() => {
    if (readUnlocked()) setUnlocked(true);
    const onStorage = (e: StorageEvent) => e.key === site.unlockKey && e.newValue === "1" && setUnlocked(true);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    // Don't remember an unlock that only happened because no video exists yet.
    if (!unlocked || NO_VIDEO) return;
    for (const s of STORES) {
      try {
        window[s].setItem(site.unlockKey, "1");
      } catch {
        /* storage unavailable */
      }
    }
  }, [unlocked]);

  const unlock = useCallback(() => setUnlocked(true), []);
  return { unlocked, unlock };
}

/** Total seconds actually played, from the video's played ranges (seeking ahead doesn't count). */
export function secondsWatched(v: HTMLVideoElement) {
  let total = 0;
  for (let i = 0; i < v.played.length; i++) total += Math.max(0, v.played.end(i) - v.played.start(i));
  return total;
}

/**
 * Progress shown under the player. It eases out, so it moves quickly early on
 * and slows near the end, and it only reaches 100% when the video ends.
 */
export function displayProgress(current: number, duration: number, ended: boolean) {
  if (ended) return 1;
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const r = Math.min(1, Math.max(0, current / duration));
  return Math.min(0.995, 1 - Math.pow(1 - r, 2.2));
}
