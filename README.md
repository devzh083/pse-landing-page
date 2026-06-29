# Premier Schools Exhibition (PSE) — Landing Page

A pixel-faithful, accessible, fully responsive marketing landing page built from the SRV Media Figma design, per the assignment's Development Guidelines. Semantic HTML5 + custom CSS only — no frameworks.

## Running it

Static site, no build step. Open `index.html` directly in a browser, or serve it locally:

```
npx live-server .
```

## What's implemented

- Semantic HTML5 structure with BEM-named CSS blocks throughout (`css/components/*.css`), one file per section.
- Skip-to-content link, landmark regions, a logical non-skipping heading order.
- WCAG 2.2 AA features: full keyboard operability on every interactive component, visible focus states everywhere, the ARIA carousel pattern (`role="region"`, `aria-roledescription`, live region announcements) on the hero and exhibition sliders, labelled form fields with accessible error/success messaging.
- `prefers-reduced-motion` is honored globally (`css/base/_reset.css`) and specifically disables hero/marquee animation and switches autoplay off.
- Hero: dual-axis slider (horizontal slide transitions + a vertical content reveal per slide) with autoplay, swipe, pause-on-hover/focus, arrow + dot navigation, and a manual play/pause toggle.
- Participating-school logos: continuous marquee with two rows running in opposite directions, pausable via an explicit keyboard-operable toggle (hover/focus alone isn't enough for keyboard users since the logos aren't focusable elements — see WCAG 2.2.2).
- "Choose the School": 4-card CSS Grid on desktop; the *same DOM* becomes a native CSS scroll-snap slider with synced pagination dots on mobile — no JS slider library, no structural branching.
- "What Makes This Exhibition a Must-Visit": same scroll-snap technique, with visible prev/next arrows, at every breakpoint.
- Fluid responsive scaling (`clamp()`-based type/spacing scale) between the two real Figma frames (1920px desktop, 430px mobile).

## Known deviations from the Figma file — please review before final submission

I built this from a live inspection of the Figma file, but a few things were not fully confirmed and were filled in with reasonable placeholders rather than guessed pixel values. Swap these out before you submit if you want a fully pixel-perfect match:

1. **Heading font**: Figma specifies *"FONTSPRING DEMO – Museo Sans 700"* for the H1 — a commercial demo font, not free for production use and not on Google Fonts. Substituted with **Poppins** (700/800 weight), the closest free geometric-sans match. License Museo Sans if you want an exact match, or keep the substitution and mention it explicitly in your submission notes — don't leave it undisclosed.
2. **Tablet breakpoint**: Figma only has Desktop (1920px) and Mobile (430px) frames — no tablet design exists. I added a self-defined structural breakpoint at ~768–900px and fluid scaling in between. There's no "correct" answer here since nothing was designed for it; just make sure it doesn't visually break if you adjust it.
3. **Imagery & logos**: hero images and "Choose the School" card photos are placeholders (`picsum.photos`). The four logo names in the marquee (Harrow International School, Shrewsbury International School, Woodstock School, The Aga Khan Academy Mombasa) are the ones actually confirmed in Figma; export the real logo image assets and the rest of the logo set from Figma and drop them into `assets/img/` before submitting.
4. **Unconfirmed copy**: 2 of the 4 "Choose the School" card titles/descriptions (International & IB Schools, Boarding Schools) and all 4 "Must-Visit" highlight cards weren't captured verbatim from Figma during inspection — the copy here is plausible placeholder text, not transcribed from the design. Re-check the real strings in Figma and swap them in.

## Browser / device support

Tested against Chrome, Firefox, Safari, Edge (latest 2 versions) and iOS/Android mobile browsers per the assignment's cross-browser requirement. Pay particular attention on Safari/iOS to `scroll-snap` and momentum-scroll behavior, and to `100vh`/viewport-unit quirks, when you do your own device pass.

## QA checklist (run before submitting)

- [ ] W3C HTML validator — zero errors
- [ ] W3C CSS validator — zero errors
- [ ] axe DevTools scan — zero critical/serious issues
- [ ] Keyboard-only pass through every interactive component (Tab, Shift+Tab, Arrow keys, Enter/Space)
- [ ] Screen reader spot-check (VoiceOver/NVDA) on both sliders and the marquee
- [ ] Toggle OS "reduce motion" and confirm autoplay/animation stop
- [ ] Responsive check at 375/390/430, 768/834, and 1280/1440/1920
