# site-b «الخريطة» — build notes

Editorial atlas page. Amiri 700 for display, Noto Naskh Arabic for body, IBM Plex Sans Arabic for labels. Palette from the brief only. All digits are Arabic-Indic (٢٤/٧، ١١:٤٧ م). Single `index.html` with inline CSS and vanilla JS, no external assets besides Google Fonts.

The signature piece is the inline-SVG coast with waterlining, a wave-hatch sea, contour lines, dashed stylised roads, Tarout island, the causeway and Bahrain, a north arrow and a legend. It's captioned "خريطة توضيحية، مو بمقياس رسم". Clicking or hovering a city (or using the tabs, which support arrow keys) highlights it with a terracotta pulse and lights up its districts. It also plays a sample Saudi-dialect WhatsApp inquiry from that area, plus a 4-step "what the agent did" list. Every «شاهد ديمو دقيقة» CTA scrolls to this section.

## Pass 1
**What the shots showed (b-*-p1):**
- The CSS drop cap (`::first-letter`) split «م» from «ن» in the lede, which broke Arabic letter joining. Bad on both desktop and mobile.
- Desktop hero: the left half was empty next to the 3-line headline, and the coverage list sat below the fold.
- Amiri leaves a wide gap before a word-initial «ك» («وشوف  كيف»، «يسويها  كل»). It's a font trait. I confirmed that turning kerning, ligatures and calt off doesn't fix it.
- Map: Tarout drew as a near-perfect ring with a dot, which looked like a UI widget and not an island. The Khobar cluster (الراكة، الخبر الشمالية، الخبر، العقربية) was stacked too tight. The synthetic italic on «الخليج العربي» looked wrong for Arabic.
- Mobile: map labels rendered at about 7px. One chat bubble left a single word on its last line («الجاي»). The small red section numbers floated on their own.

**What I fixed:** removed the drop cap and used a terracotta rule above the lede. Rebuilt the hero as a 2-column layout with the coverage index beside the headline. Rewrote the two headings to avoid a word-initial «ك» after a space. Drew Tarout as an irregular island. Re-spaced the Khobar cluster and re-routed roads to the new Khobar point. Removed the italic. Bumped SVG label sizes for mobile and hid inactive districts there. Added `text-wrap:pretty` to bubbles. Made section numbers large Amiri numerals with a hairline divider.

**Upgrade:** a procedural paper-grain texture (SVG feTurbulence data URI) on the body, so the page reads as printed stock and not flat #F5F1E8.

**errors:** `[]` on all 8 shots.

## Pass 2
**What the shots showed (b-*-p2):**
- Desktop hero still had an empty block top-left, because the aside was bottom-aligned with nothing above it.
- Map: the Qatif→Dammam dashed road ran straight through the «الشاطئ» label. «جسر الملك فهد» sat on top of the causeway line.
- b-m-mid-p2 and b-m-bot-p2 captured the top of the page, not the requested scroll. Cause: `html{scroll-behavior:smooth}` made the harness's `scrollTo` animate, and it got interrupted.
- The final CTA had too much air above it. The footer felt bare.

**What I fixed:** added «لوحة ١», a small engraved coast plate in the hero aside, to fill the dead zone. Moved «الشاطئ» and re-curved the road. Moved the causeway label below the line with a sea-coloured halo. Scoped smooth scrolling to `html:focus-within` so it works for anchor clicks and programmatic scroll is instant. Tightened the final section padding. Added a descriptor line to the footer.

**Upgrade:** the chat now plays in sequence when it scrolls into view. The client message appears, then a three-dot "typing" bubble, then the agent reply, ending with the booking card. The chat has a reserved min-height so the column doesn't jump. A token cancels the sequence when you switch cities mid-play.

**errors:** `[]` on all 8 shots.

## Pass 3
**What the shots showed (first b-*-p3 render, plus per-city state captures):**
- Mobile footer: «by Nuha Awad / نهى عوض» wrapped mid-credit, leaving the slash at a line end. Mixed-direction text broke badly.
- Hero aside: `space-between` spread the head, list and caption apart, leaving uneven gaps.
- Mobile map: with inactive districts hidden, Tarout was an unlabeled blob in the sea.
- Dammam state: «الشاطئ» and «الفيصلية» crowded the Dammam label and its pulse rings.
- Mobile: the causeway label ran into the Bahrain coast. Too much dead space between the trial box and the final CTA.

**What I fixed:** gave the credit its own line with `white-space:nowrap` and the Latin part in `dir="ltr"`. Grouped head, list and caption in the aside so only the plate and the group are spaced. Made Tarout a permanent geographic label. Moved Shati north into the bay edge and Faisaliyah south-west of the pulse radius. Shrank and shifted the causeway label on mobile. Removed the trial section's bottom padding. Re-checked the Qatif, Dammam and Dhahran states on desktop and mobile: no label collisions.

**Upgrade:** district "pin drop". When a city activates, its district dots pop in with a staggered scale overshoot (120ms apart) and their labels fade in, so the map visibly lands on the neighbourhoods.

**errors:** `[]` on all 8 final shots (re-rendered after the fixes), and `[]` during the scripted tab-click run through every city.

## Known weaknesses
- Amiri's gap before a word-initial «ك» is still there in any future copy that has it. I avoided it in headings by rewording.
- On mobile the active city label can overlap its own pulse ring at peak radius (the pulse is translucent, so it's still readable).
- The map is deliberately schematic. City and district placement is approximate and labelled as such.

## Director round (b-*-p4)
Feedback came from b-d-top-p3, b-m-top-p3 and b-d-mid-p3. (The b-*-p2 shots on disk were overwritten by another builder, so I'm ignoring them as instructed.)

1. **Hero mini map:** removed. It was a weaker copy of the real map, and the empty Tarout circle looked like a bug. In its place is a «ملف» index card, styled like a newspaper sidebar. It has a terracotta tab, a 2px ink rule, the 4 jobs as Arabic-Indic numbered rows with hairlines and a one-line gloss each, a "التفاصيل في القسم ٣ ←" link, and a hard sand offset shadow. I replaced the tall 4-row city strip with one compact line under the card: «نطاق التغطية: القطيف | الدمام | الخبر | الظهران». Each city links into the demo and preselects it. On desktop the hero now ends right under the CTA, where before it pushed the CTA below the fold.
2. **Hero body measure:** I capped the lede at `max-width:26em`, about 60 Arabic characters per line at 21px. `58ch` had no visible effect, because `ch` is the width of a Latin "0" and Naskh letters are narrower. The paragraph and the CTA row now line up with the headline block.
3. **Chat panel height:** removed the fixed min-heights. On each city switch, JS renders the full conversation in an offscreen clone and animates the chat box from its current height to the target with `height .55s var(--ease-out)`, then plays the sequence inside it. It re-measures on resize and once fonts are ready. I sampled the height during switches on desktop and mobile, for example 455→478→483→484 and 596→551→543→542. The steps never jump, and the final height matches the content.
4. **Mobile under the hero:** the aside now starts 44px below the email link with a 2px ink section rule and a small diamond ornament centred on it. The first mobile screen ends on that rule, with the top of the «ملف» card just below it.
5. **Nav:** links get a 2px terracotta underline that draws in from the right, using the custom easing, on hover and focus. The link for the section in view also gets `aria-current="true"` (set by an IntersectionObserver), which keeps the underline and turns the text terracotta.

**errors:** `[]` on all 8 p4 shots and during the scripted city-switch run. The first d-top render fell back to Amiri for the lede because of a font-load race in the harness. I re-rendered it and the final shot shows Noto Naskh.
