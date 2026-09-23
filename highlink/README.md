# HIGHLink — AI Systems Website

Bilingual (English `/` · Arabic `/ar`, right-to-left) marketing site for HIGHLink.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
cd highlink
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploying on Vercel: set **Root Directory** to `highlink`.

## Languages

- All page copy lives in [`lib/i18n.ts`](lib/i18n.ts): one dictionary per language, same shape. Edit text there.
- Each language has its own root layout (`app/(en)`, `app/(ar)`), which sets `<html lang dir>` and the fonts.
  Arabic uses IBM Plex Sans Arabic (OFL, in `app/fonts`) limited to Arabic Unicode ranges; Latin words stay in Geist.
- Layout uses logical properties (`ps-`, `start-`, `rtl:` variants), so it mirrors for Arabic. The hero system demo
  also flows right-to-left in Arabic.
- Arabic typography overrides (no letter-spacing, taller line-height, larger micro labels) are at the end of `app/globals.css`.
- The nav, mobile menu and footer link to the other language.

## Self-contained preview

```bash
PREVIEW_EXPORT=1 npx next build     # static export into .next-preview/
node scripts/build-preview.mjs      # → preview/index.html (EN) + preview/ar.html (AR)
```

Each preview page has its CSS, fonts and JS inlined, so it can be opened or hosted as a single file.

## Swap in real content

Brand-level settings live in [`lib/site.ts`](lib/site.ts):

| Field | Effect |
|---|---|
| `url` | Canonical URL, Open Graph, sitemap |
| `email` | Footer + booking section (hidden while it is `[EMAIL]`) |
| `bookingUrl` | Calendly / Cal.com embed URL — replaces the `[BOOKING CALENDAR]` placeholder with a lazy iframe |
| `heroVideo.src` / `poster` | Real demo video — replaces the animated system visualization (lazy-loaded) |

Case-study placeholders are in `lib/i18n.ts` (`cases.items`, per language). Don't publish invented numbers.

## Structure

```
app/(en), app/(ar)/ar  per-language root layout + page
app/                 OG image, icon, robots, sitemap, fonts
components/
  HomePage.tsx (composes the page for a locale), RootShell.tsx (<html>), Nav.tsx, Footer.tsx, SystemFlow.tsx (hero demo), SystemDiagram.tsx, BookingEmbed.tsx
  sections/          Hero, VideoSection, Problem, Solution, Systems, Process,
                     BeforeAfter, Agents, Method, CaseStudies, Founder, CTA, Booking
  ui/                Reveal, SplitHeadline, MagneticButton, Eyebrow, Logo, Atmosphere, LangSwitch
lib/                 i18n (all copy), site config, metadata, motion tokens
scripts/             build-preview.mjs
```

## Design system

- Color tokens and type scale (`t-hero`, `t-display`, `t-display-sm`, `t-title`, `t-lead`, `t-eyebrow`) are in `app/globals.css`.
- One easing curve (`lib/motion.ts`), used everywhere, so motion feels consistent.
- Ambient movement is CSS-only. Scroll-linked motion runs only on the pieces that tell the story (demo frame, process progress, before/after).
- `prefers-reduced-motion` is respected: Framer Motion's `reducedMotion="user"`, and CSS animations are disabled.
