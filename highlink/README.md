# HIGHLink — VSL Landing Page

Bilingual sales-video (VSL) landing page for HIGHLink, rebuilt on the page structure of
[agencymiosa.com](https://agencymiosa.com/): same sections, order, layout, sizes and flow, with
HIGHLink's identity and original Arabic/English copy.

- `/ar` — Arabic, right-to-left (primary; `/` redirects here)
- `/en` — English, left-to-right
- `/ar/privacy`, `/ar/terms`, `/en/privacy`, `/en/terms` — linked from the footer

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
cd highlink
npm install
npm run dev          # http://localhost:3000/ar
```

## Page structure (matches the reference)

| # | Component | Contents |
|---|---|---|
| — | `WaveBackground` | Fixed full-screen WebGL wave field with cursor ripple, grain and vignette |
| 01 | `Hero` | Eyebrow → headline → subcopy → `VslPlayer` → progress bar → caption → locked **Book a Call** → status line |
| 02 | `BookingSection` | Appears only after booking unlocks: heading, copy, scheduling embed |
| — | `Footer` | Logo → disclaimer → "built for" copy (4 paragraphs) → questions/email → © · theme toggle · Privacy · Terms · language |

### Booking unlock

The **Book a Call** button stays locked until the visitor has actually watched
`site.unlockAfterSeconds` (default 6 minutes) of the video, or reached its end. Seeking ahead doesn't count.
Once unlocked, the button shows a bouncing arrow and scrolls to the booking section. The unlock is saved in
local/session storage and synced across tabs.

## Configure

All in [`lib/site.ts`](lib/site.ts):

| Field | Effect |
|---|---|
| `video.src` / `video.poster` | The sales video. Empty shows a placeholder frame |
| `unlockAfterSeconds` | Watch time needed to unlock booking |
| `bookingUrl` | Scheduling embed (Calendly, Cal.com, GoHighLevel…). Empty shows a placeholder |
| `email` | Footer contact |
| `url` | Production domain (canonical, hreflang, sitemap) |

Copy for both languages is in [`lib/content.ts`](lib/content.ts); both share one structure.

## Themes and RTL

- Dark is the default. The footer toggle switches to a light wave field (the reference's own look);
  the choice is saved.
- Arabic uses IBM Plex Sans Arabic (OFL, `app/fonts`) for Arabic characters only. It has no letter-spacing
  and uses taller line-height. Layout uses logical properties, and the progress bar fills from the right in Arabic.

## Self-contained preview

```bash
PREVIEW_EXPORT=1 npx next build     # static export into .next-preview/
node scripts/build-preview.mjs      # → preview/*.html with CSS, fonts and JS inlined
```
