# site-a «ليلة المكتب»: build notes (run 2)

Single file `index.html` (~51 KB), with inline CSS and vanilla JS. Fonts come from Google Fonts: Readex Pro (display), Noto Kufi Arabic (body) and IBM Plex Sans Arabic (UI, mock chat and the wordmark).
Helper scripts are in `scratch/a/`: `shots.sh` (the 6 harness shots per pass), `sect.js` (one shot per section), `overflow.js` (finds elements wider than the viewport) and `contrast.py`.

## Concept as built
- **Hero:** a dark desk seen from above, with wood grain from repeating gradients and a feTurbulence noise data-URI. It has a paper sheet, a mug and keys, all drawn in CSS. The only light source is a phone lying on the desk. A radial mint glow is centred on the phone by JS, which measures the phone's position, so the glow follows the layout at every width.
- **Lock screen:** after `document.fonts.ready`, the three inquiries arrive one by one at ١١:٥٢ م, ١٢:٣١ ص and ١:١٤ ص. Each arrival flashes the light (`--flash` and `--tint` are `@property` registered, so they animate). The lock clock and the day (الخميس → الجمعة) tick forward with each arrival.
- **Lit text:** the h1 is filled with `background-clip:text` and a radial gradient whose centre is the phone's position. Letters near the phone are brighter, and the whole headline warms mint for a moment on every flash. The demo h2 is lit the same way from the demo phone. The final h2 is lit from below (dawn).
- **Night clock (header):** scroll position maps to 11:00 PM Thursday → 4:40 AM «فجر الجمعة». It shows «المكتب مقفل من …», and the hour count goes through a `hours()` plural helper (ساعة / ساعتين / ٣–١٠ ساعات / ١١+ ساعة). A dawn layer fades in over the last 30% of the scroll.
- **Sections:** hero → pain (an illustrative thread where the reply comes 9 hours late and the lead goes to another office, marked in ember) → the 4 jobs as a night log at timestamps → the 1-minute demo (WhatsApp-style chat: شقة تمليك ٤ غرف، الشاطئ → budget → تمويل؟ → الجمعة بعد العصر → calendar card) with 3 steps → the 2-week trial (14 "nights" that light up) → final CTA with a morning calendar notification → footer.
- **Numerals:** Arabic-Indic everywhere. Times use `<bdi dir="ltr">١:١٤</bdi> ص` inside a nowrap span. Only the digits are isolated as LTR, so م/ص stays on the correct (left) side in RTL. Email and domain are in `<bdi dir="ltr">`.
- **Copy:** no testimonials, logos or statistics. Every mock is labelled «مثال توضيحي». The integration claim is limited to «يشتغل على واتساب مكتبكم ويربط مع تقويم المكتب». The only contact is highlink.sa@gmail.com (mailto).
- **Wordmark:** «هاي لينك» is set in IBM Plex Sans Arabic 700, a plain face (a lesson from run 1). The display face is never used for the brand name.

## Measured contrast (WCAG, `scratch/a/contrast.py`)
paper/ink 17.4 · body #CFC9BE/ink 12.1 · muted/ink 6.6 · muted/desk 6.2 · ember/ink 6.6 · ink on mint button 14.6 · lit-text far end #ADA69B/ink 8.3 · chat timestamp/outgoing bubble 4.8 · notification header 8.9 · calendar card sub-text 8.0 · unlit night number (raised to #8A8378) ≥4.5.

---

## Pass 1
Shots: `a-{d,m}-{top,mid,bot}-p1.png` plus desktop section shots `a-sec-d1-*`. **Errors: [] on every shot.**

Findings:
1. **390px overflow (critical):** the layout viewport was 500px wide. `overflow.js` traced it to `.stage .glow2` with `inset:-35%` (609px). `body{overflow-x:clip}` was hiding the cause, which the brief forbids.
2. The hero h1 broke as «المكتب طفّى | أنواره، والوكيل | للحين يرد»: the phrase was split, and «طفّى» sat alone.
3. The final h2 wrapped with «مو» orphaned at the end of line 2.
4. The night-log vertical line ran 28px off the node centres, because I forgot the grid gap in the offset.
5. There was a dead zone of about 300px between the jobs and the demo (two 150px paddings plus an unrevealed column).
6. The jobs intro left the whole left half of the screen empty.
7. In the pain h2, «١١» in Readex Pro reads like two vertical bars (an illegible display numeral).
8. The first job chip («الوكيل يكتب الرد…») was thin and proved nothing.
9. In the footer, «by Nuha Awad / نهى عوض» had uncontrolled bidi.
10. The demo phone was empty on arrival: the first message took 1.5s and there was no context.

Fixes: removed `overflow-x:clip` from body and constrained glow2 horizontally (`inset:-30% 0` with an elliptical gradient). Set both headlines as phrase spans (`.ln{display:inline-block}`). Corrected the line offset to `150 + 28 + 18`. Reduced section padding to `clamp(72px,8.5vw,120px)`. Made the jobs intro 2 columns (h2 | sub). Rewrote the pain h2 without digits («العميل يرسل نص الليل، …»). Replaced chip 1 with a two-bubble mini thread that replies in the same minute (١١:٥٢ → ١١:٥٢). Wrapped "by Nuha Awad" in `<bdi dir=ltr>`. Added a date chip to the demo and brought the first message forward to 0.9s.

**Upgrade:** the lock-screen clock and day now tick with each arriving notification (11:52 Thu → 12:31 Fri → 1:14 Fri), so the hero itself shows the night passing.

## Pass 2
Shots: `a-{d,m}-{top,mid,bot}-p2.png` plus `a-sec-m2-*`. **Errors: []**. Overflow check: scrollWidth 390 = viewport.

Findings:
1. The header was a gradient that faded to transparent, so the job text and the demo kicker scrolled visibly under the nav and the clock (desktop and mobile).
2. Mobile pain h2: «نص | الليل» split across lines.
3. Mobile pain list: auto-width labels made the text start at a different x on every row.
4. Mobile demo: the 3 steps pushed the phone a full screen below its heading, so the demo autoplayed out of sight.
5. The jobs → demo gap was still about 240px on desktop.
6. The lit-headline falloff was too weak to read as light.

Fixes: the header turns solid (`.top.solid`, ink 96% plus a hairline) after 40px of scroll. The pain h2 became phrase spans. The pain list got a fixed label column. The demo was rebuilt with grid areas: desktop `intro stage / steps stage`, mobile `intro / stage / steps`, so the phone sits directly under its heading. Added `padding-block-end` to the jobs section. Gave the lit gradient a stronger falloff.

**Upgrade:** the demo h2 is now lit by the demo phone, and it brightens with each agent message. The light-source idea now carries past the hero.

## Pass 3
Shots: `a-{d,m}-{top,mid,bot}-p3.png` plus `a-sec-{d3,m3}-*`. After the fixes I re-verified with `a-{d,m}-{top,mid,bot}-p3v.png`, `a-sec-m3v-*` and `a-{d,m}-final-p3v.png`. **Errors: [] on all.** Overflow: 390/390.

Findings:
1. The desktop pain h2 became 4 lines (the `ln` spans plus the 20ch max-width).
2. On mobile, the pain list's 7.2em label column squeezed the text into orphans («بيت», «قرروا»).
3. The demo h2's far end looked washed out under the lit gradient.
4. Trial terms: orphan words («تجريبية», «المكتب») in a narrow column.
5. The unlit night numbers (#6f695f) measured 3.6:1, which is below 4.5 for small text.
6. The final section had about 190px of empty top padding with nothing in it.

Fixes: the pain h2 is sized to its column with no max-width. On mobile the pain-list labels stack above the text. The lit end colour is #ADA69B (8.3:1). The terms label column is 84px with `text-wrap:pretty`. The night numbers are #8A8378. The final section's top padding is tightened.

**Upgrade:** a morning calendar notification («تقويم المكتب · ٧:٠٢ ص — موعد جديد انحجز بالليل: معاينة شقة تمليك، حي الشاطئ، الجمعة ٤:٣٠ م», labelled مثال توضيحي) drops in above the final CTA. It closes the demo's story: the office wakes up to the viewing that was booked overnight.

## Remaining weaknesses (honest)
- The demo really runs for about 45s, so a static screenshot of the demo usually shows only 1–3 messages. The «اعرضها كاملة» button and reduced-motion both show the full thread at once.
- The desk props (paper, mug, keys) are abstract CSS shapes. They read as "objects on a desk" but are not refined illustrations.
- The lit-text effect is subtle by design (contrast must stay ≥3:1 at the far end), so it reads more as warmth than as a visible beam.
- The hero clips its decorative glow and props (`overflow:clip` on the framed desk scene only). Page-level overflow is not hidden.
- On mobile the final h2 still wraps to 3 lines, because the first phrase is too long for 358px at display size.
