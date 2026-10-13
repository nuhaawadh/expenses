# BRIEFS — Highlink studio · Run 2

Second run from scratch. Same offer and the same three concepts the prompt names, but new art direction for each, so we can compare against run 1 (`../fable-test/`). Builders must NOT open or copy anything in `../fable-test/`.

## The offer (identical for all three sites)
- **Brand:** Highlink (هاي لينك) — highlink.tech — by Nuha Awad (نهى عوض)
- **Product:** وكيل ذكاء اصطناعي على واتساب لمكاتب العقار في المنطقة الشرقية (الخبر / الدمام / الظهران / القطيف)
- **What it does:** يرد على الاستفسارات خلال ثواني، 24/7 · يأهّل العميل (إيجار أو شراء، الميزانية، الحي) · يحجز موعد المعاينة مباشرة في تقويم المكتب · متابعة تلقائية
- **Pain:** الاستفسارات تجي بالليل وفي الويكند؛ لين يرد الموظف، العميل يكون اتصل على مكتب ثاني
- **Risk reversal:** تجربة مجانية أسبوعين على استفسارات حقيقية — إذا ما تحسّنت المعاينات المحجوزة، المكتب ما يدفع شي
- **CTA:** «شاهد ديمو دقيقة» + التواصل بالإيميل فقط: `highlink.sa@gmail.com` (mailto). لا رقم جوال، لا سجل تجاري، لا رقم ضريبي.

---

## Non-negotiable build standard
1. **Real copy only.** Saudi dialect Arabic (warm, professional). No lorem ipsum, no testimonials, no client logos, **no invented stats or percentages**. Only offer facts (24/7، أسبوعين، دقيقة، 4 مدن) or clearly-labelled illustrative mock UI with fictional names.
2. **RTL done properly.** `<html lang="ar" dir="rtl">`, logical CSS properties, arrows pointing the RTL way, Latin strings (email, domain, times) isolated in `<bdi>`. One numeral system per site, used consistently.
3. **Distinctive Arabic typography** from Google Fonts (reachable). Not a system stack. Arabic line-height ≥1.6 body, 1.1–1.3 display. `text-wrap: balance` on headings, `pretty` on paragraphs.
4. **Custom easing** for all motion (`--ease-out: cubic-bezier(...)`), no bare `ease`/`linear` on UI motion. Respect `prefers-reduced-motion`.
5. **Responsive** at 390px and 1440px, no horizontal scroll at 390 — and do not hide overflow to fake it.
6. **Contrast:** body ≥4.5:1, large ≥3:1, measured, not guessed. Visible focus states, semantic landmarks, one `h1`, a working skip link.
7. **Zero console errors.** Include `<link rel="icon" href="data:,">`.
8. **Single self-contained `index.html`** per site, inline CSS/JS. **JS CDNs are blocked here → vanilla JS only.** Procedural visuals only (CSS / inline SVG / canvas).
9. **Required sections:** hero (promise + CTA) · pain · the 4 jobs · demo/how it works · the 2-week trial · final CTA · footer (Highlink, highlink.tech, by Nuha Awad / نهى عوض, email). «شاهد ديمو دقيقة» goes to the on-page demo (no fake video).
10. **No "AI default":** no purple gradients, no glass cards in a 3-up grid, no emoji icons, no filler slogans.

## Lessons from run 1 (the director learned these the hard way)
- **Brand name legibility:** ornamental Kufi faces made «هاي لينك» read as «ماي لينك». The wordmark must be set in a plain, highly legible face, whatever the display face is.
- **Watch final letters + punctuation** in display faces (a final هـ plus a full stop looked like ة). Check every headline in the screenshot at actual size.
- **Fonts and screenshots:** wait for `document.fonts.ready` before starting animations or measuring, or shots catch the fallback font.
- **Never place a CSS drop cap or `::first-letter` on Arabic** — it breaks letter joining.
- **Bidi in clocks/times:** render times as one `<bdi dir="ltr">` unit.
- **Mobile first screen** must end on a deliberate edge with the signature element visible or clearly starting.
- **Plurals:** Arabic number agreement (ساعة/ساعتين/٣ ساعات/١١ ساعة) — handle them in code.
- **Copy claims:** don't promise integration details we can't back (e.g. "keeps your same number"). Keep to «يشتغل على واتساب مكتبكم ويربط مع تقويم المكتب».
- **Scratch files:** each builder writes helper scripts ONLY in its own `scratch/<letter>/` folder. In run 1, a shared scratch file let one builder overwrite another's shots.

### QA protocol (3 passes per site)
From `/home/user/expenses/fable-test-2`:
`PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node tools/shot.js http://localhost:4180/site-x/ shots/x-{d|m}-{top|mid|bot}-p{N}.png WxH 3000 Y`
Desktop `1440x900`, mobile `390x844`, top/mid/bottom using `docHeight`. Read every shot, critique hostilely, fix, add one deliberate upgrade, log in `sites/site-x/NOTES.md`. Non-empty `errors` = pass fails.

---

## site-a — «ليلة المكتب»
- **Concept:** Not a skyline this time — the *inside* of the office after hours. A dark desk scene from above: the office lights are off, and the only light source is a phone screen glowing on the desk. The page is lit by that phone. Scrolling moves through the night (11 PM → 2 AM → فجر الجمعة) while the agent keeps working.
- **Palette:** ink `#07090C`, desk `#14110E` (warm dark wood tone), phone glow `#7CF2C3` (cool mint, used as light, not as fills), paper white `#F3EFE6`, muted `#9A9389`, warning ember `#E8743B` (missed-call / the competitor), CTA uses the mint on ink.
- **Type:** Display — **"Readex Pro"** 600–700 (wide, contemporary); body — **"Noto Kufi Arabic"** 400/500; mock-chat — **"IBM Plex Sans Arabic"** to feel like an app UI.
- **Signature technique:** the phone screen as a **light source**: a radial glow that brightens when a message arrives and softly lights nearby text (CSS mask/gradient). Inside it, a WhatsApp-style chat plays a full qualify-and-book in Saudi dialect (شقة تمليك ٤ غرف في الدمام، حي الشاطئ → ميزانية → تمويل؟ → موعد معاينة الجمعة بعد العصر → calendar card). A small "lock-screen" notification stack in the hero shows 3 inquiries arriving at 11:52 / 00:31 / 01:14 م/ص.
- **Must prove:** the office sleeps, the agent doesn't — and the customer gets a booked viewing before the morning.

## site-b — «الخريطة»
- **Concept:** A light, editorial **field guide** to the Eastern Province — less newspaper, more cartographer's notebook: grid paper, survey marks, handwritten-feel annotations in a sober way. The agent is shown as the one who "knows the ground".
- **Palette:** survey paper `#FAF7F0`, grid `#E7E1D3`, graphite `#22262B`, gulf teal `#1F6F78`, marker orange `#D9622B` (CTA, active city), olive note `#6B7A3A`, muted `#62666B`.
- **Type:** Display — **"Markazi Text"** 600–700 (editorial serif with character); body — **"Noto Sans Arabic"** 400/500; annotations/labels — **"Almarai"** 700 small.
- **Signature technique:** an **interactive inline-SVG map** of the coast with the four cities and real district names (الدمام: الشاطئ، الفيصلية، النخيل · الخبر: العقربية، الراكة، الحزام الذهبي · الظهران: الدوحة، القصور · القطيف: تاروت، العوامية، سيهات). Selecting a city draws a coverage outline **with a stroke-dashoffset animation like a pen tracing**, and an annotation card shows a sample inquiry from that area and the agent's qualifying reply. Keyboard-accessible city tabs.
- **Must prove:** the agent speaks the districts your clients ask about, in all four cities.

## site-c — «الدقيقة»
- **Concept:** Brutalist and typographic, but structured as **a single 60-second document**: the page is divided into 60 numbered rows (seconds). Scrolling the page *is* the minute passing. The office's message sits unanswered while Highlink's reply lands at second 4, qualifies by ~20, and books by ~50.
- **Palette:** concrete `#E9E7E2`, black `#0B0B0B`, alarm red `#D7261E` (loss), go green `#0E9F57` (instant reply), rule grey `#A8A6A0`. Pure flat colour, no gradients, no shadows.
- **Type:** Display — **"Rubik"** 800–900 (massive, tight) or **"Alexandria"** 800 — pick one; body — **"Tajawal"** 500/700; numerals tabular.
- **Signature technique:** a **scroll-driven second counter**: a sticky giant numeral 00→60 tied to scroll progress through the 60-row spine, with events pinned to specific seconds (00 رسالة وصلت · 04 هاي لينك رد · 20 عرف الميزانية والحي · 50 انحجزت المعاينة · 60 مكتبك لسا ما رد). Clearly labelled «مثال توضيحي». At 390px the spine collapses into a compact sticky bar.
- **Must prove:** speed is the deal — one minute is the difference between a booked viewing and a lost client.
