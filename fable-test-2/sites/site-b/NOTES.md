# site-b «الخريطة»: build notes (run 2)

Single file `index.html`, about 54 KB. Inline CSS and vanilla JS. Fonts: Markazi Text 600/700 for display, Noto Sans Arabic 400/500/700 for body and the wordmark, Almarai 700 for labels. Numerals are Western throughout, and every time or Latin string sits in `<bdi>`.

## Concept as built
- The page is grid paper with ink-ruled "plates", like a surveyor's notebook. Plate 1 is the map. It sits inside the hero so the signature shows on the first screen at both 1440 and 390.
- The map is an inline SVG drawn north-up with the Gulf to the east. It has a smoothed coastline, four offset teal water-lines clipped to the sea (an old-chart technique), Tarout island, a north arrow, trig-point triangles for the cities, and dots plus Almarai labels for the 11 districts named in the brief. It is labelled «رسم توضيحي مبسّط · ليس بمقياس», and the footer says the same.
- Selecting a city through the tabs, a click on the map, or the keyboard does four things: draws a coverage outline with a `stroke-dashoffset` pen trace (`--ease-pen`, with a light feTurbulence wobble), pops the district dots in sequence, swaps the field-note card (sample inquiry, agent reply, and the facts the agent captured as tags), and moves a pen nib along the line as it draws.
- The tabs follow the ARIA tabs pattern: roving tabindex, arrow keys in RTL order (ArrowLeft = next), Home and End. The map's city triangles can also take focus and respond to Enter or Space.
- Other sections: pain (an illustrative three-entry log; the gap is computed in JS with Arabic plural rules and reads "9 ساعات و35 دقيقة"), the 4 jobs as a "map key" legend, a dark one-minute demo chat that plays on scroll and has a replay button, a 14-day trial strip with the promise seal, the final CTA, and the footer.
- Contrast was measured with `scratch/b/contrast.js`. Muted on paper 5.40, teal on paper 5.45, white on orange-deep `#B9501F` 4.96, olive text `#5A6730` 5.74. The brief's `#D9622B` (3.42 on paper) is used only for graphics and fills, never for small text.

## Pass 1
Shots: `b-{d,m}-{top,map,mid,bot}-p1.png`. Errors: `[]` on all 8.
Findings:
- Map labels were mirrored. The SVG inherited `direction: rtl`, which flips `text-anchor`, so labels landed on top of their own dots and triangles ("تاروت" covered its dot, "القطيف" overlapped its trig mark).
- The header CTA text was graphite on orange. `.nav a` overrode `.btn-cta` on specificity, so it failed contrast.
- The header was semi-transparent, and plate text showed through it when scrolled (worst at 390).
- The desktop hero had a three-line 84px h1 squeezed into a 1.25fr column, which left a big dead zone top-left and pushed the map almost entirely below the fold.
- Land and sea were too close in tone, so the sea read as blank paper.
- At 390, the hero CTAs stacked at mismatched widths.
- The footer credit was bidi-scrambled ("من تصميم… / by Nuha Awad").
Fixes: `direction: ltr` on the SVG (Arabic shaping still works); `.nav a.btn-cta{color:#fff}`; solid header; h1 spans the full row at 76px max; a faint teal sea fill; full-width stacked CTAs on mobile; the credit line now reads exactly "by Nuha Awad / نهى عوض".
Upgrade: district dots now "pop" one after another once the pen trace passes, like a surveyor marking points. The map triangles became focusable buttons.

## Pass 2
Shots: `b-{d,m}-{top,map,mid,bot}-p2.png`. Errors: `[]` on all 8.
Findings:
- The h1 broke as «…أحياء الشرقية ويرد / على عميلك…», which strands "ويرد" from its clause.
- The dashed "route" lines ran through the Dammam label and the coverage polygon, looking like cracks. They were unlabelled filler.
- Below the field note, the side column had about 200px of dead space next to the taller map.
- At 390, the Khobar tab wrapped as "العقربية · الراكة · / الحزام الذهبي" and left the 2×2 tabs ragged.
- The "الدمام" label crossed the coastline into the port inlet.
- The gap between the h1 and the lede was too large on mobile.
- The SVG had `role="img"` but contained focusable buttons.
Fixes: an explicit desktop-only `<br>` before "ويرد"; route lines removed; the mobile tabs became single-column rows (name plus districts); `&nbsp;` in "الحزام الذهبي"; the Dammam label moved under its trig; tighter hero gap; `text-wrap: pretty` on chat bubbles, lede and tab sub-lines; SVG role changed to `group`.
Upgrade: a map key (city / district / coverage line) pinned to the bottom of the side column. It explains the symbols and fills the dead zone.

## Pass 3
Shots: `b-{d,m}-{top,map,mid,bot,q1,q3}-p3.png`. I added q1 and q3 shots so the pain and trial sections were actually reviewed. Errors: `[]` on all 12. I also captured each city state (`b-x-{1440,390}-{khobar,dhahran,qatif}.png`) and tested the keyboard (ArrowLeft from Dammam selects and focuses Khobar). No errors there either.
Findings:
- At 390 with Khobar selected, the "العقربية" label collided with the "الظهران" label and triangle.
- At 390, the «ليس بمقياس» stamp sat on top of the "الحزام الذهبي" label at the bottom of the map.
- Days 2 to 13 of the trial strip were 12 empty boxes. The only filler was a «نص المدة» label that wrapped onto two lines at 390.
- Unused `.m-route` and `.m-tick` CSS was left over.
Fixes: the العقربية label moved to the sea side, with a halo; on mobile the stamp became a caption bar under the map; days 2 to 13 got a teal hatch plus a legend line «أيام يرد فيها الوكيل على استفساراتكم الحقيقية»; dead CSS removed.
Upgrade: a pen nib (an orange dot) rides the coverage line while it traces. It reads the live computed `stroke-dashoffset`, so it always matches the eased stroke.

## Verification after pass 3 (`*-p4.png`, `b-x-*`)
- All shots: `errors: []`. At 390, `scrollWidth` = `clientWidth` = 390. No `overflow: hidden` is used to fake this.
- The Khobar state at 390 is clean: no label collisions, and the stamp sits below the map.

## Remaining weaknesses (honest)
- The desktop hero still has open paper top-left, beside the h1 (it is deliberate white space, but it is a large area).
- At 390, only the active city's district labels show (inactive ones are bare dots). The unlabelled dots can look orphaned.
- The coastline is stylised and only approximate. District positions are roughly placed, not surveyed.
- Markazi Text 700 is heavy at h2 sizes in the dark demo section. A 600 weight might sit better.
- The demo chat auto-plays once on scroll in about 3 seconds. That is fast for a "minute" demo, and the replay button is small.

## Director round (`b-{d,m}-{top,map,mid,bot,q1,q3}-p5.png`, plus `b-x-*` city states)
1. **Stray circle:** removed both `.plate::before/::after` corner circles. I didn't make them survey marks because they weren't doing any job. The plate frame is now a clean ruled border.
2. **Desktop hero empty paper:** the spec column («نطاق المسح / ساعات العمل / القناة», now 310px so «المكتب» no longer wraps alone) shares grid row 1 with the headline and sits beside its top line. The h1 keeps 330px clear for it. I also tightened the hero padding and gaps (h1 max 72px). The plate's top edge moved from y≈600 to y≈525 at 1440×900, so the first screen now ends on the map with all four city tabs and the field-note heading in view.
3. **Mobile map crop:** at ≤700px, `matchMedia` switches the viewBox from `40 30 520 670` to `0 30 560 670`. The graticule now runs to x=0. «القطيف» sits about 45px inside the frame, and «العوامية» is well clear of the edge when active.
4. **Mobile orphan dots:** at 390, the districts of cities that aren't selected now carry faint labels (Almarai, 16 SVG units, graphite at 60%). The selected city's districts stay at full ink and 21 units. I checked all four city states and found no collisions.
5. **Mobile secondary CTA:** the boxed «راسلنا بالإيميل» in the hero is now an underlined teal text link «راسلنا: highlink.sa@gmail.com», with the email in `<bdi dir="ltr">`. It is the same on desktop, where it sits beside the primary button.
6. **Demo pace:** each message is now preceded by a typing indicator. Three bouncing dots appear on the speaker's side, with `role=status`, and the label reads «العميل يكتب…» or «الوكيل يكتب…». Customer messages take about 1.2s (0.7s typing + 0.5s hold) and agent messages about 1.7s (1.1s + 0.6s), for roughly 12s in total. Replay is now a solid 44px button with an icon, «أعد تشغيل الديمو». With reduced motion, everything shows at once.
Errors: `[]` on every p5 shot and on the city/keyboard script. At 390, scrollWidth = clientWidth = 390.
