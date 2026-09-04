# Prime on Mobile — PrepInsta Prime case study

Next.js 16 (App Router) + React 19.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build — currently prerenders to static
npm start       # serve the production build
```

## Why this fixed the loading problem

The previous version inlined every screenshot and video as base64 inside one
6.4 MB HTML file, so **nothing rendered until everything downloaded**. Here:

- **Images** are the untouched originals in `public/media/`, served through
  `next/image`. A 1125 × 13,773 px PNG is delivered as a ~200 px-wide AVIF —
  the original stays the source of truth, the browser gets something small.
- **Videos** are display-sized 30 fps H.264 encodes with fast-start metadata.
  Lightweight WebP posters paint immediately, while `preload="metadata"` and
  near-viewport source attachment keep the recordings off the critical path.
- Only **two** videos hold a decoder at a time. Browsers cap concurrent video
  decoders, and past that limit the later ones silently freeze on frame one —
  so each `<video>` hands its `src` back when it scrolls far away.

## Structure

```
app/
  layout.js        fonts, metadata, <Nav>, <Providers>
  page.js          the whole case study — all copy lives here
  globals.css      design tokens (light + dark), type scale, components
components/
  Providers.jsx    Lenis smooth scroll, GSAP ticker, light→dark handover
  Bits.jsx         Reveal, Stagger, Counter, Device, DeviceVideo, Reel, Tabs, Nav, Well
lib/media.js       generated asset manifest (path + intrinsic dimensions)
public/media/      54 original files, 68.5 MB
```

## The light → dark handover

The page runs light through the setup (context, research) and switches to dark
at `<div id="dark-start">` in `page.js` — move that div to move the handover.
Both palettes are complete token sets in `globals.css` (`:root` and `.dark`);
nothing is a hard-coded colour.

The toggle is a plain passive scroll listener, deliberately **not** GSAP
ScrollTrigger or Lenis. Both of those run on `requestAnimationFrame`, which
browsers throttle hard whenever the page isn't painting — and a page stuck on
the wrong palette is a worse failure than a slightly less smooth scroll.

## Animation

- **Lenis** — momentum scrolling. Wheel/trackpad only; touch keeps native inertia.
  Lenis owns the scroll position, so programmatic scrolling must go through
  `window.__lenis.scrollTo(y)` — plain `window.scrollTo` gets overridden next frame.
- **GSAP** — drives Lenis's RAF loop via `gsap.ticker`, the integration GreenSock
  recommends. I did not add a second decorative animation layer on top of `motion`.
- **motion** (motion.dev) — in-view reveals, staggers, counters, tab transitions,
  and the spring-driven progress rail.

## Editing

Copy is plain JSX in `app/page.js`. Screens are `<Device id="…" />` where `id` is
a key from `lib/media.js`; add `scrollable` for a long full-page capture.
Recordings are `<DeviceVideo id="…" />`.

`DeviceVideo` crops the source recording down to just the phone screen — the
originals were shot inside a rendered iPhone mockup, and the numbers in `CROP`
(`components/Bits.jsx`) were measured off those files. If you re-export a
recording at different framing, update `CROP`.

## Deploying

Vercel: import the folder, no configuration needed. Anywhere else, `npm run build`
then `npm start` (image optimisation needs the Node runtime — a pure static
export would serve the full-size PNGs and undo the loading fix).
