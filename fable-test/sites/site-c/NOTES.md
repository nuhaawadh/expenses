# site-c «الدقيقة» — build notes

Poster-style brutalist page. Display face Lalezar, body Cairo 500/700/900, tabular numerals on every timer. Palette from the brief, plus one addition: a darker red, `#C70500`, used only where body text sits on red, so it passes 4.5:1. All digits are Latin, including inside the Arabic chat. The signature piece is a sticky two-lane race. The lane labelled «مكتبك» is a timer that starts at a message received at 11:47 م; the lane labelled «هاي لينك» shows a reply, qualifying questions and a booking. It is driven by scroll, and there is also a 60-second autoplay. The CTA «شاهد ديمو دقيقة» scrolls to the race and starts the autoplay. The race is labelled «مثال توضيحي — مو بيانات حقيقية».

## Pass 1
**What the shots showed (p1):**
- Desktop hero: a large dead band between the h1 and the lede, because the h1 was too small for the column.
- Mobile kicker: it wrapped with «· القطيف» stranded and a stray separator dot at the start of a line.
- Mobile hero buttons: they stacked at two different widths, which looked accidental.
- Race on mobile: the stage bar collapsed. The h2 broke into 3 lines and the «شغّل الدقيقة» button wrapped into 3 lines.
- Race units: grammar errors in Arabic plural agreement, such as «3 ساعة».
- Race chat: the top fade mask turned black agent bubbles into a muddy grey gradient. That is the AI-default look the brief rules out.
- Race times showed Latin PM/AM inside the Arabic UI.
- Race desktop: the office lane is a big empty slab, with nothing to show that time is passing.
- Final section: the left half of the desktop view was empty, and the paragraph ended on an orphan («من عندك.»).
- Trial: «14» stood alone with no unit.

**Fixes:**
- h1 enlarged (52px → 118px).
- Kicker split into two spans, with the cities in a nowrap group.
- Mobile CTAs set to full width and equal size.
- Stage bar rebuilt as a grid: title and button on row 1, illustration label on row 2.
- Plural function added (دقيقة/دقيقتين/دقايق، ساعة/ساعتين/ساعات).
- Mask replaced with a hard dashed rule.
- Times now use «م/ص».
- Final section now has a green block, «0:47», captioned as the booking time in the illustration.
- Paragraph measure tightened.
- «يوم» label added to 14.

**Upgrade:** a striped red "وقت ضايع" fill rises in the office lane. Its height is log-scaled to the elapsed time, so the minutes and the hours both register visibly.

**errors:** `[]` on all 6 shots.

## Pass 2
**What the shots showed (p2):**
- The red fill's top edge ran through the giant timer and through the lane header on mobile.
- The "وقت ضايع" label was clipped behind the timer digits.
- On mobile, a sliver of a clipped bubble showed at the top of the hidden part of the chat, which read as a rendering bug.
- The office unit line wrapped with an orphan («نايم»).
- The hero caption beside the "60" countdown didn't explain what the number counts.

**Fixes:**
- The fill is capped below the header, through a `--f` custom property.
- The label moved to the inline-end side.
- A `fit()` routine hides the oldest bubbles that would be clipped, so no partial bubbles show.
- Unit copy shortened to «N ساعات بدون رد».
- Hero caption rewritten: «ثانية باقية من دقيقتك على هالصفحة…».

**Upgrade:** a typing indicator, three dots that hop on a custom ease, appears in the هاي لينك lane about 3 seconds before each agent message.

**errors:** `[]` on all 6 shots.

## Pass 3
**What the shots showed (p3, plus extra state renders of the race at 50% and 97% and during autoplay):**
- On mobile, the fill line still struck through «3 ساعات بدون رد», because the cap didn't account for the unit row.
- In the lost state on mobile, the verdict wrapped with «ثاني.» alone on the second line.
- Paper-coloured body text on pure `#E10600` measured about 4.4:1. That is under 4.5 in the pain card and in the lost lane.
- The skip link sat at `inset-inline-start:-999px`. In RTL that pushes it off to the right, and `body{overflow-x:hidden}` was hiding the problem.

**Fixes:**
- The fill now lives inside the chat column, so it can never cross the timer or the copy.
- `text-wrap: balance` added on the verdict and unit lines.
- Red backgrounds behind body text switched to `#C70500` (about 5.3:1).
- Skip link now hides with `top:-80px`.
- `overflow-x:hidden` removed. Measured scrollWidth equals clientWidth at both 390 and 1440, with nothing clipped.

**Upgrade:** when the office lane flips to «العميل اتصل على مكتب ثاني.», the verdict slams in like a rubber stamp: scale 1.7 → 1 with a −4° tilt, on an overshoot ease. The page respects `prefers-reduced-motion`.

**errors:** `[]` on all 6 final shots, and `[]` on the extra state renders.

## Known weaknesses
- On mobile the race lanes are only about 180px wide. After `fit()` hides old bubbles, the هاي لينك lane has a gap of about 130px above the chat at the end state.
- The desktop hero black panel has a lot of empty black around the "57". It is intentional, but it is a little static.
- Autoplay stops if the user scrolls or wheels during it. That is by design, but it isn't explained anywhere.
