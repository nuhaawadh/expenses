# site-c «الدقيقة» — build notes (run 2)

## Decisions
- **Display:** Rubik 900 (picked over Alexandria: its Latin digits are wide and tabular, so the giant counter doesn't jitter between 11 and 22). **Body:** Tajawal 500/700/800. **Wordmark:** «هاي لينك» in Tajawal 800, a plain face, never the display face (run-1 lesson: هاي read as ماي).
- **Numerals:** Western digits everywhere (00–60, 24/7, 4:30, 11:47), tabular. No Arabic-Indic digits anywhere (the 3 step markers were caught and fixed in the first draft).
- **Palette:** only the 5 brief colours plus #FFFFFF for message bubbles. Flat, no gradients, no shadows. Measured contrast (scratch/c/contrast.js):
  black/concrete 15.93 · black/green 5.73 · white/red 5.02 · green/black 5.73 · grey/black 8.09.
  Red text on concrete is 4.06 (large only) and green text on concrete is 2.78, so neither is used as text on concrete: red and green only appear as fills, with white text on red and black text on green. Grey on concrete (1.97) is used only for decorative, aria-hidden future-second numbers and ticks.
- **Signature:** 61-row spine (00–60). The event rows are written in the HTML, so the conversation still reads without JS; JS fills in the empty seconds. The current second is whichever row has crossed the reading line (50% of the viewport on desktop, just under the sticky bar on mobile). The sticky clock shows the giant numeral, 60 ticks that fill right→left (RTL), and two status lines (هاي لينك / المكتب الثاني). The office's waiting time uses Arabic plural rules in code (ثانية / ثانيتين / 3 ثواني / 11 ثانية).
- At ≤860px the clock collapses into a compact sticky bar (numeral + status + tick strip).
- Times are isolated with `<bdi dir="ltr">`. No drop caps or ::first-letter. Fonts are awaited with `document.fonts.ready` before the counter is re-measured.

## Pass 1
Shots: c-{d,m}-{top,mid,bot}-p1.png (mid = second 22). **Errors: [] on all 6.** No horizontal overflow at 390.
Findings:
1. Desktop hero: «دقيقة وحدة» wrapped to two lines at 193px, which pushed the CTAs and the 00→60 ruler below the fold. The first screen had no CTA.
2. Hero side cells: `.cell p` beat `.cell-big` on specificity, so «24/7» and «أسبوعين» rendered at 16px. There was also a dead zone under the city list.
3. Mobile first screen ended on a random edge: the ruler band sat at y≈700 with «المشكلة» peeking under it. The two CTAs had mismatched widths.
4. Mobile sticky bar: the label «مكتب بدون رد» broke into «مكتب بدون / رد», an orphan word inside a 72px column.
5. The "now" row (22) was barely different from past rows, so the spine didn't show where you are.
6. Final CTA paragraph left «اللي يجيكم.» orphaned on its own line (desktop).
7. Mobile spine: 28→40 is a dead stretch of empty rows. It fits the concept but reads as broken.
Fixes: the h1 line is now sized `min(10.6vw,158px)` with nowrap on desktop (measured ratio 5.4em, column 853px) and wraps on mobile. Specificity fixed, and the side cells are flex:1 and bottom-aligned. On mobile the hero has `min-height: 100svh − header` with the ruler pinned to the bottom edge, and the CTAs are full width. The second office is renamed «المكتب الثاني» everywhere, with a `max-content` label column. The "now" row's number becomes an inverted black box. The final paragraph measure is 60ch.
**Upgrade:** quarter-minute markers. Rows 15/30/45 carry a red-ruled note «المكتب الثاني: ما رد · صار له 15 ثانية» (plural-aware), so the empty stretches now count the office's silence.

## Pass 2
Shots: c-{d,m}-{top,mid,bot}-p2.png (mid = second 50, the booking). I also took full-section captures in scratch/c/ for the sections the 3 fixed shots skip (pain, jobs, how, trial). **Errors: [] on all 6.** Overflow-x 0 at 390.
Pass-1 fixes confirmed: the h1 sits on one line on desktop and the CTAs are above the fold, «24/7» and «أسبوعين» render at 56px, the "now" second shows as an inverted box, and the quarter notes at 15/30/45 read correctly («صار له 45 ثانية»).
Findings:
1. Desktop first screen ended at 851px with the pain section's top 50px peeking in, so the edge was undecided.
2. Clock column: about 190px of dead air above «الثانية» and below the status block. The sticky column looked like it was floating.
3. Mobile hero: a stray 3px rule (hero-main's stacked border) sat 3px above the black ruler band and looked like a rendering glitch.
4. Mobile calendar card: the giant «خميس» squeezed the text, so «معاينة فيلا — / الراكة» and «4:30 / العصر» both broke badly.
5. Desktop pain log: about 140px empty under the red «السبت» row.
6. Mobile jobs: «يرد خلال / ثواني، 24/7» broke next to the 60px number. Mobile steps had a double rule (li top border + label underline) only 40px apart.
7. Mobile legend: «المكتب الثاني (بدون هاي لينك)» pushed «العميل» onto its own line.
Fixes: the hero is `min-height: 100svh − header` at all sizes, so the ruler lands exactly on the fold. The clock label is pinned to the top and the status to the bottom (auto margins), so the numeral owns the middle. The stray rule is removed. The calendar day is 30px on mobile and the time is nowrap. The log is a flex column and the red row stretches to the bottom. Mobile job h3 is 24px and the steps keep one rule. The legend label is shortened.
**Upgrade:** event hits. When the counter lands on 04/20/50 the numeral block flashes green (red at 60) and fades out with `--ease-out`. It's disabled under prefers-reduced-motion via the global transition kill.

## Pass 3
Shots: c-{d,m}-{top,mid,bot}-p3.png (mid = second 20, «عرف الميزانية والحي»), plus extra second-60 captures in scratch/c/. **Errors: [] on all 6.** Overflow-x 0, and no element sits outside 0–390px at mobile width (checked in the DOM). One h1.
Pass-2 fixes confirmed: the ruler sits exactly on the fold on desktop and mobile, the clock column is distributed top/middle/bottom, the calendar card is clean at 390, and the pain log has no dead zone.
Findings:
1. At second 60 the inverted "now" box (56px numeral) spilled out of its 72px column on the red end row (36px numeral spilled at 390 too). It read as broken, not brutal.
2. Mobile sticky bar at 60: «انحجزت المعاينة · خلصت الدقيقة» wrapped to two lines, so the bar grew by 20px at the very end and jolted.
3. Mobile hero ruler: 61 ticks squeezed into about 130px between «00 / 60» and the link, which made a grey smear.
4. Fact chips at 390 wrap to two rows, leaving «الخبر · الراكة» alone. I accepted this: the chips are a tag cloud, not a sentence, and the break is at a chip boundary.
Fixes: the end-row numeral is 44px desktop / 28px mobile. The status at 60 is shortened to «انحجزت المعاينة» (the red row already says the minute is over). On mobile the ruler wraps: ticks take the full width on row 1, with 00 / link / 60 on row 2, in RTL order (00 under the first tick on the right).
**Upgrade:** a «عيد الدقيقة من الصفر ↑» replay control in the red end row. It scrolls back so second 00 sits on the reading line (honours reduced motion). I verified it by script: after clicking at 60, the counter reads «00».
Final check after fixes: errors [] at 1440 and 390, overflow-x 0, file 39,335 bytes.

## Remaining weaknesses (honest)
- The empty-second rows between events (e.g. 51–59) are still mostly bare rules. That is the concept, but on mobile it's ~10 rows of nothing.
- The giant counter uses `textContent` swaps with no digit-roll animation, so it is intentionally abrupt and some may read it as static.
- The minute's second marks are tied to DOM row positions, not exact time. A very fast flick can skip the event flash (by design, it only flashes on the landed second).
- Desktop hero side cells are bottom-aligned, which leaves deliberate but large top whitespace in each cell at 900px height.

## Director round
1. **Desktop hero side cells:** each cell is now top-aligned like a spec sheet: label at the top edge, the big value and caption directly under it. Copy changed to «حتى لو الساعة 3 الفجر» (Western numeral, matching the page).
2. **Mobile secondary CTA (≤600px):** the boxed button is now an underlined text link «راسلنا: highlink.sa@gmail.com», with the email in `<bdi>`. Desktop keeps the boxed «راسلنا بالإيميل».
3. **Empty seconds on mobile (≤600px):** non-event, non-quarter rows collapse to 15px, half height, with an 11px number. All 61 rows remain. Event rows and the 15/30/45 office notes keep full height, so the runs 05–10, 21–26, 51–59 read as time ticking past. Mobile page height dropped from 9,642 to 8,907px.
4. **Digit roll:** when the second changes by exactly 1, the sticky numeral rolls in vertically (0.18em, opacity 0.35→1, 180ms, `cubic-bezier(.16,1,.3,1)`), from below going forward and from above going back. Jumps larger than 1 just swap the digits. It's skipped under prefers-reduced-motion (Web Animations API, gated by matchMedia). I verified it with a stepped-scroll script: the roll fired on ±1 steps and the console stayed clean.
5. **Shots:** c-{d,m}-{top,mid,bot}-p4.png re-rendered from the current code (mid = second 20). **Errors: [] on all 6.** Overflow-x 0 at 390.
