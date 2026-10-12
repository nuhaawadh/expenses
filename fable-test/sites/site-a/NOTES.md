# site-a — «ليلة المكتب» — build notes

Single file `index.html`, about 46 KB, with inline CSS and vanilla JS. Fonts: Reem Kufi for display, IBM Plex Sans Arabic for body, both from Google Fonts with `display=swap`.
Numerals: Arabic-Indic (٠–٩) used everywhere, including the clock, the chat timestamps, the phone status bar and the step numbers. Latin appears only in `highlink.tech`, the email and the credit line, each wrapped in `bdi` or an `ltr` span.

**Signature piece:** the hero phone plays a WhatsApp conversation in Saudi dialect. It goes السلام عليكم → budget and move date → two slots → السبت ٥:٠٠ م → «انضاف لتقويم المكتب» calendar card. It includes typing indicators and double ticks that turn green when the client replies. Timestamps follow a simulated night clock: it starts at 11:47 م ليلة الخميس and runs 12× faster, so it passes midnight and the day label flips to «فجر الجمعة». The chat is labelled as illustrative («الاسم والأرقام افتراضية»). «شاهد ديمو دقيقة» scrolls to the phone, restarts the chat and flashes the phone frame.

**Backdrop:** a procedural canvas skyline with seeded random windows, some of which flicker slowly. One window is green: that's the office that's still answering.

---

## Pass 1
**What the shots revealed (p1):**
- Hero clock bidi was broken: the seconds and «م» rendered on the wrong side of the hour.
- The phone status bar used Latin digits (23:47), which clashed with the Arabic-Indic numerals everywhere else.
- The chat thread was anchored to the bottom, so at 3 s the desktop phone had a big empty dead zone above two messages. On mobile, the visible part of the phone was completely empty, so the demo looked dead.
- A stray green radial smudge sat at the top-left of the hero.
- The footer credit was mangled by bidi: "نهى عوض / Nuha Awad by — Highlink" (the word "by" landed on the wrong side).
- On mobile, the job paragraphs were squeezed into the middle column, leaving a wide empty column on the left.
- Mobile CTAs were two stacked full-width pills that pushed the phone below the fold.
- Sections had 150px of padding top and bottom, so desktop showed about 300px of dead band between them.

**Fixed:**
- Clock rebuilt as an LTR-isolated time plus a separate «م/ص» span.
- Status bar switched to Arabic-Indic digits.
- Thread now anchors to the top, like real WhatsApp with a short chat. The opening exchanges were sped up so 3 messages and a typing bubble are visible at 3 s.
- Smudge removed.
- Credit is one LTR span: "Highlink — by Nuha Awad" / نهى عوض.
- On mobile, job paragraphs span to the end of the row.
- Mobile CTAs sit side by side (the ghost label shortens to «راسلنا») and the hero note is hidden.
- Section padding reduced to clamp(72px, 9vw, 120px).

**Upgrade:** a film-grain overlay (SVG feTurbulence data URI, 6% opacity, overlay blend) so the night reads like a camera frame rather than flat hex.

**errors:** `[]` on all 6 shots.

## Pass 2
**What the shots revealed (p2, plus extra exploratory shots of pain, how and trial):**
- Ghost button showed a double gap («راسلنا  على الإيميل») because flex `gap` treated the hidden span as a separate item.
- The «٨:٣٠ ص» line-through cut through the Arabic-Indic digits and looked like a rendering glitch.
- The pain-close line left «في» orphaned at the end of a line on mobile.
- The pain section's gradient ended in a hard seam against the next section.
- The trial term «بهالبساطة.» orphaned onto its own line on mobile.
- The "How" section was three rounded boxed cards in a row, which is exactly the AI-default 3-column card grid.
- The final CTA had about 280px of empty space above the lamp.

**Fixed:**
- Ghost label wrapped in a single span.
- Strike-through replaced with a small «متأخر» tag.
- Pain-close split into two block sentences.
- Pain gradient now fades back to night.
- Trial term trimmed to «ما تحسّنت؟ ما فيه فاتورة.»
- "How" restyled: no boxes, hairline dividers, big Reem Kufi numerals that light up amber on reveal. On mobile it becomes a numeral-plus-text grid.
- Final section tightened.

**Upgrade:** a skyline reprise at the foot of the final CTA. The skyline code became a reusable `Skyline()` factory, and both canvases have one green, gently pulsing window: the office where someone (the agent) is still awake. The final skyline also has antenna aircraft-warning blinks. Canvases only redraw while on screen (IntersectionObserver).

**errors:** `[]` on all 6 shots.

## Pass 3
**What the shots revealed (p3 first render, plus an 11.5 s shot of the finished conversation):**
- **Real bug:** the calendar confirmation card, the payoff of the whole demo, was clipped to its header. Flex children were shrinking (`flex-shrink:1`) instead of overflowing, so the trim-oldest-message logic never fired.
- Outlined (`text-stroke`) Reem Kufi numerals in "How" rendered with broken overlapping contours (the «٣» looked like garbage).
- Red antenna blinks landed behind the hero lede and looked like stray specks next to «نايمين.»
- The hero's green office window peeked half-hidden from behind the phone.
- In Reem Kufi, «٥:٠٠» on the calendar card read like "o:••".
- The card's info line orphaned «٤٥ ألف».

**Fixed:**
- `.thread>*{flex-shrink:0}`, so old messages now scroll off and the card shows in full on both desktop and mobile.
- Numerals are solid fill (dim → amber with a glow on reveal).
- Antennas only on the final skyline.
- Office window moved into the gap between the phone and the copy.
- Calendar time set in Plex Sans with tabular numerals.
- Info line shortened to «الخبر الشمالية · إيجار سنوي».

**Upgrade:** a booked-state payoff. When the calendar card lands:
- the caption under the phone cross-fades to a green «انحجزت معاينة، ومحد بالمكتب صاحي»;
- the phone frame takes on a soft green glow;
- the thread fades out before the loop restarts, instead of hard-clearing.

Reduced-motion users get the full static conversation in the booked state.

**errors:** `[]` on all 6 final shots (a-*-p3.png were re-rendered after the fixes). Overflow check at 390px: `scrollWidth` is 390, and no element extends past the viewport.
