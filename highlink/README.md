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
| 02 | `BookingSection` | Appears once booking unlocks: heading, copy, `BookingForm` (or a scheduling embed) |
| — | `Footer` | Logo → disclaimer → "built for" copy (4 paragraphs) → questions/email → © · theme toggle · Privacy · Terms · language |

### Booking unlock

The **Book a Call** button stays locked until the visitor has actually watched
`site.unlockAfterSeconds` (default 6 minutes) of the video, or reached its end. Seeking ahead doesn't count.
Once unlocked, the button shows a bouncing arrow and scrolls to the booking section. The unlock is saved in
local/session storage and synced across tabs. **With no video configured, booking is open from the start**
(there is nothing to watch); the lock returns as soon as `video.src` is set.

### Booking form

`BookingForm` lets visitors pick one of the next working days (Sun–Thu by default) and a 30-minute slot in
Riyadh time, then enter their name, email, mobile, company, team size, website and a short note. It
validates in the browser and again on the server, and includes a honeypot field against bots.

Requests go to `POST /api/booking`, which forwards them as JSON to `BOOKING_WEBHOOK_URL` (for example an
n8n Webhook node), with `BOOKING_WEBHOOK_SECRET` sent as `x-booking-secret`. Copy `.env.example` to
`.env.local` and set both values. Both stay on the server. Without a webhook the form tells the visitor
that booking isn't connected yet. A slot is a *requested* time; confirm it with the visitor yourself.

## Configure

All in [`lib/site.ts`](lib/site.ts):

| Field | Effect |
|---|---|
| `video.src` / `video.poster` | The sales video. Empty shows a placeholder frame |
| `unlockAfterSeconds` | Watch time needed to unlock booking |
| `booking` | Time zone, working days, first/last slot, slot length, days offered |
| `bookingUrl` | Optional third-party scheduling embed; when set it replaces the built-in form |
| `email` | Footer contact |
| `url` | Production domain (canonical, hreflang, sitemap) |

Copy for both languages is in [`lib/content.ts`](lib/content.ts); both share one structure.

## Themes and RTL

- The default colours are the reference's own: a pale ice-to-cyan top, ocean blue, a deep navy floor, a
  `#1454d8` CTA and `#3974ff` progress. The footer toggle switches to a night variant, and the choice is saved.
- Arabic uses IBM Plex Sans Arabic (OFL, `app/fonts`) for Arabic characters only. It has no letter-spacing
  and uses taller line-height. Layout uses logical properties, and the progress bar fills from the right in Arabic.

## Self-contained preview

```bash
./scripts/export-preview.sh         # static export + preview/*.html with CSS, fonts and JS inlined
```

The preview has no server, so its booking form shows a notice instead of submitting.
