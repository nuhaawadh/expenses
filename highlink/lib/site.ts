/**
 * Brand-level settings shared by both languages. Replace the placeholders here.
 */
export const site = {
  name: "HIGHLink",
  url: "https://highlink.ai", // TODO: production domain
  email: "[EMAIL]", // e.g. "hello@highlink.ai"

  /** Sales video. Leave `src` empty to show the placeholder frame. */
  video: { src: "", poster: "" },

  /** Seconds of the video a visitor must watch before booking unlocks (reference: 6 minutes). */
  unlockAfterSeconds: 6 * 60,

  /** Scheduling embed URL (Calendly, Cal.com, GoHighLevel…). Empty shows a placeholder. */
  bookingUrl: "",

  /** Browser-storage key that remembers an unlocked booking across visits and tabs. */
  unlockKey: "highlink:vsl:booking-unlocked",
} as const;
