/** Shared motion language: one easing curve, a few durations. */
export const ease = [0.22, 1, 0.36, 1] as const; // expo-out: quick start, long settle
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const dur = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
} as const;

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
