# HIGHLink — AI Systems Website

Single-page marketing site for HIGHLink. Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
cd highlink
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploying on Vercel: set **Root Directory** to `highlink`.

## Swap in real content

Everything replaceable lives in [`lib/site.ts`](lib/site.ts):

| Field | Effect |
|---|---|
| `url` | Canonical URL, Open Graph, sitemap |
| `email` | Footer + booking section (hidden while it is `[EMAIL]`) |
| `bookingUrl` | Calendly / Cal.com embed URL — replaces the `[BOOKING CALENDAR]` placeholder with a lazy iframe |
| `heroVideo.src` / `poster` | Real demo video — replaces the animated system visualization (lazy-loaded) |

Case-study placeholders are in `components/sections/CaseStudies.tsx` (`CASES`). Don't publish invented numbers.

## Structure

```
app/                 layout (fonts, SEO), page, OG image, icon, robots, sitemap
components/
  Nav.tsx, Footer.tsx, SystemFlow.tsx (hero demo), SystemDiagram.tsx, BookingEmbed.tsx
  sections/          Hero, VideoSection, Problem, Solution, Systems, Process,
                     BeforeAfter, Agents, Method, CaseStudies, Founder, CTA, Booking
  ui/                Reveal, SplitHeadline, MagneticButton, Eyebrow, Logo, Atmosphere
lib/                 site config, motion tokens
```

## Design system

- Color tokens and type scale (`t-hero`, `t-display`, `t-display-sm`, `t-title`, `t-lead`, `t-eyebrow`) are in `app/globals.css`.
- One easing curve (`lib/motion.ts`), used everywhere, so motion feels consistent.
- Ambient movement is CSS-only. Scroll-linked motion runs only on the pieces that tell the story (demo frame, process progress, before/after).
- `prefers-reduced-motion` is respected: Framer Motion's `reducedMotion="user"`, and CSS animations are disabled.
