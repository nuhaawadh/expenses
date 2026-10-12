# BRIEFS — Highlink studio

## The offer (identical for all three sites)
- **Brand:** Highlink (هاي لينك) — highlink.tech — by Nuha Awad (نهى عوض)
- **Product:** وكيل ذكاء اصطناعي على واتساب لمكاتب العقار في المنطقة الشرقية (الخبر / الدمام / الظهران / القطيف)
- **What it does:** يرد على الاستفسارات خلال ثواني، 24/7 · يأهّل العميل (إيجار أو شراء، الميزانية، الحي) · يحجز موعد المعاينة مباشرة في تقويم المكتب · متابعة تلقائية
- **Pain:** الاستفسارات تجي بالليل وفي الويكند؛ لين يرد الموظف، العميل يكون اتصل على مكتب ثاني
- **Risk reversal:** تجربة مجانية أسبوعين على استفسارات حقيقية — إذا ما تحسّنت المعاينات المحجوزة، المكتب ما يدفع شي
- **CTA:** «شاهد ديمو دقيقة» + التواصل بالإيميل فقط: `highlink.sa@gmail.com` (mailto). لا رقم جوال، لا سجل تجاري، لا رقم ضريبي.

---

## Non-negotiable build standard (every builder, every pass)
1. **Real copy only.** Arabic, Saudi dialect (ودّي ومهني، مو فصحى جامدة). No lorem ipsum, no fake testimonials, no fake client logos, **no invented stats or percentages**. The only numbers allowed are facts of the offer (24/7, أسبوعين، دقيقة، 4 مدن) or clearly-labelled illustrative mock UI (e.g. a demo chat with fictional names).
2. **RTL done properly.** `<html lang="ar" dir="rtl">`. Use logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`). Arrows/chevrons point the RTL way. Latin strings (emails, highlink.tech) wrapped in `<bdi>` or `dir="ltr"` spans. Arabic numerals choice must be consistent within a site.
3. **Distinctive Arabic typography** from Google Fonts (fonts.googleapis.com — reachable). No system-font stacks as the primary face. `font-display: swap`. Tune `line-height` for Arabic (≥1.6 body, 1.1–1.3 display). Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs to avoid orphan words.
4. **Custom easing** on all motion — define CSS variables like `--ease-out: cubic-bezier(.2,.8,.2,1)`; never bare `ease`/`linear` for UI motion. Respect `prefers-reduced-motion`.
5. **Fully responsive.** Must look intentional at 390px and 1440px. No horizontal scroll at 390px (`overflow-x: clip` is not a fix for a broken layout).
6. **Accessible contrast** — body text ≥ 4.5:1, large text ≥ 3:1. Visible focus states. Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`.
7. **Zero console errors.** Include `<link rel="icon" href="data:,">` (otherwise favicon 404 counts as an error). No external images unless verified loadable.
8. **Single self-contained `index.html`** per site: inline CSS and JS. **JS CDNs (cdnjs/jsdelivr/unpkg) are blocked in this environment — use vanilla JS only.** Procedural visuals only (CSS / inline SVG / canvas).
9. **Required sections (order up to the art direction):** hero with the promise + CTA · the pain · what the agent does (the 4 jobs) · how it works / demo · risk reversal (the 2-week trial) · final CTA · footer (Highlink, highlink.tech, by Nuha Awad, email). The «شاهد ديمو دقيقة» CTA opens/scrolls to an on-page demo (the signature piece) — no fake video.
10. **Nothing that reads as "AI default":** no purple-blue gradients on white, no generic glassmorphism cards in a 3-column grid, no emoji-as-icons, no "Revolutionize your business" filler.

### QA protocol (3 passes per site)
Render desktop `1440x900` and mobile `390x844` at top / mid / bottom with
`node tools/shot.js http://localhost:4179/site-x/ shots/x-{d|m}-{top|mid|bot}-p{N}.png WxH 3000 Y`
(use returned `docHeight` for mid/bottom). Read every screenshot, critique hostilely, fix, then add one deliberate upgrade. Log in `sites/site-x/NOTES.md`. Any entry in `errors` = pass fails.

---

## site-a — «ليلة المكتب» (The office at night)
- **Concept:** It's 11:47 PM on a Thursday in Al-Khobar. The office lights are off; the phone isn't. The page *is* the night shift: a quiet, cinematic dark scene where the only thing awake is the agent answering.
- **Palette:** night `#0B0F14`, deep panel `#121A22`, ink-blue line `#1E2A36`, sodium-lamp amber `#F2A541` (accent / CTA), WhatsApp-ish signal green used sparingly `#3DDC84`, text `#E8EDF2`, muted `#8A97A6`.
- **Type:** Display — **"Reem Kufi"** (or "Readex Pro" 600 if Reem feels too ornamental); body — **"IBM Plex Sans Arabic"** 400/500.
- **Signature technique:** a **live mock WhatsApp chat** in a phone frame that types out a real qualify-and-book conversation in Saudi dialect (client asks about a 3-bedroom flat for rent in الخبر الشمالية → agent asks budget & move date → offers two viewing slots → books Saturday 5:00 PM → calendar confirmation card). Typing indicators, timestamps that read late-night, double-tick receipts. A live clock in the hero showing the time ticking past midnight. Subtle window-grid / city skyline lights procedurally drawn.
- **Must prove:** that at the hour nobody is at the office, a lead goes from "السلام عليكم" to a booked viewing — without a human.

## site-b — «الخريطة» (The map)
- **Concept:** Editorial, light, calm authority — like a well-designed regional newspaper feature or atlas page about the Eastern Province real-estate market. Coverage, not hype.
- **Palette:** paper `#F5F1E8`, ink `#1B1B1B`, sea `#2F6F8F` (Gulf coast / primary), sand `#D9C7A3`, terracotta accent `#C4532D` (CTA, highlights), hairline `#CFC6B4`, muted text `#5E5A52`.
- **Type:** Display — **"Amiri"** or **"Aref Ruqaa"** for editorial headlines (choose one; Amiri 700 preferred for legibility); body — **"Noto Naskh Arabic"** or **"Almarai"**; small caps/labels in **"IBM Plex Sans Arabic"**.
- **Signature technique:** an **interactive inline-SVG stylised map** of the Eastern Province coast with the four cities (القطيف، الدمام، الخبر، الظهران) and a handful of real district names (e.g. الخبر: العقربية، الراكة، الخبر الشمالية؛ الدمام: الشاطئ، الفيصلية؛ الظهران: الدوحة، القصور؛ القطيف: تاروت، العوامية). Hover/tap a city → it highlights, a coverage "pulse" radiates, and a side note shows a sample inquiry from that area and how the agent handles it. A legend + editorial captions. Map is stylised — do not claim geographic precision.
- **Must prove:** that the agent knows the local ground — it speaks the districts your clients ask about, across all four cities.

## site-c — «الدقيقة» (The minute)
- **Concept:** Bold, brutalist, typographic. Time is the enemy. Huge numerals, hard rules, a stark grid, almost a protest poster. Every second the office doesn't reply is visualised.
- **Palette:** off-white `#F2F0EB`, pure black `#0A0A0A`, signal red `#E10600` (loss / urgency), one relief colour for "instant reply" `#00C853`, grey rule `#BDBDBD`.
- **Type:** Display — **"Lalezar"** or **"Changa" 800** (pick one, used massive); body — **"Cairo"** or **"Tajawal"** 500; monospaced numerals via `font-variant-numeric: tabular-nums`.
- **Signature technique:** a **side-by-side race / countdown**: left column "مكتبك" — a running timer since a message arrived at 11:47 PM, ticking with the message still unanswered (single grey tick) until it flips to "العميل اتصل على مكتب ثاني"; right column "هاي لينك" — reply lands in seconds, then qualify, then booked. Scroll-driven: as the user scrolls, the office timer keeps growing (minutes → hours → "الصبح"). Clearly labelled as an illustration, not data.
- **Must prove:** that speed *is* the deal — a minute is the difference between a booked viewing and a lost client.
