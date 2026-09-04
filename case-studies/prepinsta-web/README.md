# PrepInsta on the Web — case study

Standalone companion to `../case-study-site` (the mobile app 0→1). Same stack,
same design tokens, same light→dark handover — a separate site, so the two
pieces can be sent to different people.

```bash
npm run dev      # http://localhost:3100
npm run build
npm start
```

## ⚠️ The numbers are placeholders

Everything in **`lib/metrics.js`** marked `SCORE` and `IMPACT` is invented at a
plausible scale so the layout is real. **Replace them before this goes to anyone.**
Nothing is hard-coded in `page.js` — change a figure once, in that file.

`FACTS` in the same file _is_ real: page heights measured off the Figma frames,
the variable count, and the numbers printed on the live product.

Keep the shape of an impact row — a value **and** the one line saying what moved
it. The sentence is what makes a metric readable instead of decorative.

## Structure

```
app/
  layout.js      fonts, metadata, <Nav>, <Providers>
  page.js        the whole case study — all copy lives here
  globals.css    tokens (light + dark), type scale, components
components/
  Bits.jsx       Reveal, Stagger, Counter, Device, Browser, Shot, Clip, Well, Nav
  Providers.jsx  Lenis smooth scroll, GSAP ticker, light→dark handover
  ActBreak.jsx   the shader band between the two acts
  HeroField.jsx  WebGL field behind the hero
lib/media.js     GENERATED asset manifest — do not hand-edit
lib/metrics.js   every number and credit on the page
scripts/
  assets.sh      pulls the Figma exports out of the working folders
  manifest.mjs   rebuilds lib/media.js from public/media
public/media/    19 stills + 4 recordings
```

## Replacing a screen

1. Re-export from Figma into the working folder (`../Puchase page`, `../Profile`,
   `../Search`, `../Syllabus Page`, `../NAVBAR`).
2. `./scripts/assets.sh` — copies and resamples to **2× the width the layout
   actually renders at**: 2176 for a full-width desktop capture (shown at 1088
   CSS px), 1100 for a before/after column (shown at ~531), 750 for a phone
   frame (shown at ~206). Under-sizing here is what makes screens look soft.
   The `top` helper also trims long profile exports before the dead black band
   at the bottom — `sips -c` crops from the centre, so it passes an explicit
   0,0 offset against the source's own width.
3. `node scripts/manifest.mjs` — rewrites `lib/media.js` with real intrinsic
   dimensions, so `next/image` never guesses and nothing shifts on load.

Figma caps an export at 32,768px, which is why the tall pages come out at odd
scales. It doesn't matter — they're resampled to a fixed width anyway.

`next.config.mjs` matters as much as the source width: `deviceSizes` has to
reach 2176, or `next/image` silently caps every desktop capture at 1080 and
serves it at 1× on a Retina screen. It also asks for **WebP, not AVIF** — these
pages are 8,000–17,000px tall, and AVIF encoding at that size costs the first
visitor tens of seconds per variant for no visible gain on flat UI.

## The two frames

- `<Browser id url scrollable />` — desktop. `scrollable` turns a 12,000px capture
  into a window the reader drives, which is the honest way to show a long page
  without shrinking it to a stamp.
- `<Device id scrollable />` — phone, for the mobile-web builds.
- `<Shot id />` — no chrome, for overlays and component sheets. A modal isn't a
  screen, so it doesn't get a browser frame.
- `<Clip id />` is a display-sized 30 fps recording with a lightweight WebP
  poster. Its source attaches near the viewport, plays only while in view, and
  unloads after it scrolls away so later clips keep a decoder available.

## Light → dark

The page runs light through the hero and the brief, then switches at
`<div id="dark-start" />` in `page.js` — move that div to move the handover.
Both palettes are complete token sets in `globals.css` (`:root` and `.dark`);
no colour is a literal.

The toggle is a plain passive scroll listener, deliberately **not** GSAP
ScrollTrigger or Lenis — both run on `requestAnimationFrame`, which browsers
throttle whenever the page isn't painting, and a page stuck on the wrong palette
is a worse failure than slightly less smooth scrolling.

## Deploying

Vercel: import the folder, no configuration. Anywhere else, `npm run build` then
`npm start` — image optimisation needs the Node runtime, and a static export
would serve the full-size PNGs and undo the whole point.

## Trimming a recording without re-encoding

`<Clip start={19} end={31} />` loops just that window of the file. Useful for
`v-nav.mp4`: the `prepinsta.com/prime` half of that capture has the live nav
labels overlapping each other — an implementation bug in the shipped build, not
the design. Either re-record it, or window the clip to the clean stretch.
