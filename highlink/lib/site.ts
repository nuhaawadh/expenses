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

  /**
   * Optional third-party scheduling embed (Calendly, Cal.com, GoHighLevel…).
   * When set it replaces the built-in booking form.
   */
  bookingUrl: "",

  /**
   * Built-in booking form. Visitors request a slot; requests are posted to
   * /api/booking, which forwards them to BOOKING_WEBHOOK_URL (e.g. an n8n webhook).
   * Times are wall-clock times in `timeZone`.
   */
  booking: {
    timeZone: "Asia/Riyadh",
    workDays: [0, 1, 2, 3, 4], // Sun–Thu (0 = Sunday)
    firstSlot: "10:00",
    lastSlot: "16:30",
    slotMinutes: 30,
    daysAhead: 14, // how many working days to offer
  },

  /** Browser-storage key that remembers an unlocked booking across visits and tabs. */
  unlockKey: "highlink:vsl:booking-unlocked",
} as const;
