/**
 * Brand details and swappable integrations, shared by every language.
 * Replace the placeholders here — no component needs to change.
 * Page copy lives in lib/i18n.ts.
 */
export const site = {
  name: "HIGHLink",
  url: "https://highlink.ai", // TODO: set the production domain
  email: "[EMAIL]", // e.g. "hello@highlink.ai"

  /**
   * Scheduling embed URL (Calendly, Cal.com, SavvyCal, HubSpot…).
   * Leave empty to show the placeholder panel.
   */
  bookingUrl: "",

  /**
   * Hero demonstration video (MP4/WebM in /public or a CDN URL).
   * Leave empty to show the animated system visualization.
   */
  heroVideo: { src: "", poster: "" },
} as const;

export const anchors = {
  primary: "#booking",
  secondary: "#how-it-works",
  call: "#booking",
} as const;
