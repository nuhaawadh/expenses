/**
 * Single source of truth for brand details and swappable integrations.
 * Replace the placeholders here — no component needs to change.
 */
export const site = {
  name: "HIGHLink",
  url: "https://highlink.ai", // TODO: set the production domain
  title: "HIGHLink — AI Systems, Automation & AI Agents for Business",
  description:
    "We build AI-powered systems that help businesses operate, automate, and scale — connecting your people, tools, knowledge, and processes into one operating system.",
  email: "[EMAIL]", // e.g. "hello@highlink.ai"

  /**
   * Scheduling embed URL (Calendly, Cal.com, SavvyCal, HubSpot…).
   * Leave empty to show the placeholder panel.
   * e.g. "https://calendly.com/highlink/solutions-call?hide_gdpr_banner=1&background_color=0b0d0d&text_color=edefee&primary_color=5fd4b4"
   */
  bookingUrl: "",

  /**
   * Hero demonstration video (MP4/WebM in /public or a CDN URL).
   * Leave empty to show the animated system visualization.
   */
  heroVideo: { src: "", poster: "" },

  nav: [
    { label: "Systems", href: "#systems" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#booking" },
  ],
} as const;

export const ctas = {
  primary: { label: "Build My AI System", href: "#booking" },
  secondary: { label: "See How It Works", href: "#how-it-works" },
  call: { label: "Book a Solutions Call", href: "#booking" },
} as const;
