/* ------------------------------------------------------------------
   content.js — everything you'll want to edit lives in this one file.
   No build step. Plain global, so index.html works over file:// too.
   ------------------------------------------------------------------ */

window.SITE = {
  /* ---- identity ------------------------------------------------ */
  name: { first: 'Akshit', last: 'Manik' },

  /* small check-marked tags above the name */
  badges: ['Product Designer', 'Mobile + Web'],

  /* The sentence under the name. `mark` items get the underline,
     the shimmer on hover, and the little card that pops up above.
     `art` is optional — drop an image in assets/ and point at it. */
  tagline: [
    { text: 'Designing a sharp' },
    { mark: 'identity', art: null, punct: ',' },
    { text: 'an intuitive' },
    { mark: 'product', art: null, punct: ',' },
    { text: 'and flows that' },
    { mark: 'convert.', art: null },
  ],

  /* the small bordered box above the CTA */
  services: {
    label: 'what i do',
    items: ['Product Design', 'Design Systems', 'UX Research', 'Prototyping'],
  },

  /* ---- contact ------------------------------------------------- */
  email: 'akshitmanik.design@gmail.com',
  spotsLeft: 'open to work',
  resumeUrl:
    'https://drive.google.com/file/d/1H1tXxTGL6Qs37J4SB_IfUM_S7G7P5P_j/view?usp=sharing',
  calendarUrl: 'https://cal.com/akshit-manik/30min?user=akshit-manik',
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akshitmanik/',
      icon: 'linkedin',
    },
    {
      name: 'X',
      url: 'https://x.com/intent/follow?screen_name=whyakshit',
      icon: 'x',
    },
  ],

  /* ---- about panel (the dark one) ------------------------------ */
  about: {
    emoji: '👋',
    photo: null, // "assets/me.jpg"
    bio: "Hi, I'm Akshit. I design products people actually finish using — clear layouts, honest hierarchy, and flows that don't make anyone think twice.",
    listTitle: 'Currently',
    list: ['Product Design @ PrepInsta', 'Open to new work'],
    logosTitle: 'worked on',
    logos: ['PrepInsta Prime', 'PrepInsta Web'],
  },

  /* ---- faqs panel (the blue one) ------------------------------- */
  faqs: {
    title: 'Your questions answered',
    items: [
      {
        q: 'What do you specialise in?',
        a: 'End-to-end product design for mobile and web — research, IA, interaction design, and the design system that keeps it consistent after handoff.',
      },
      {
        q: 'How long does a project usually take?',
        a: 'A focused feature runs 2–3 weeks. A full product surface — audit through shipped design system — is usually 6–10 weeks depending on scope.',
      },
      {
        q: 'Do you work with engineering directly?',
        a: 'Yes. I hand off tokens and specs, review builds, and stay involved through QA so what ships matches what was designed.',
      },
      {
        q: 'Can you do branding as well?',
        a: 'I cover product-adjacent identity work — type, colour, iconography, and how the brand behaves inside the interface.',
      },
      {
        q: 'How do we get started?',
        a: "Send a short note about what you're building and where it hurts. I'll come back with scope, timeline, and a fixed price.",
      },
    ],
  },

  /* ---- the cat ---------------------------------------------------
     oneko. Off by default; the pill in the bottom-left corner turns
     cursor-following on. When it's off she sits near the pill and
     bolts if your cursor gets too close.
     `sprite` is a 256×128 oneko sheet (8 cols × 4 rows of 32px).
     Swap it for any skin from the same repo, or vendor it locally:
       curl -L <sprite url> -o portfolio/assets/oneko.gif
     ---------------------------------------------------------------- */
  cat: {
    enabled: true,
    label: 'You like cats?',
    corner: 'bottom-left', // bottom-left | bottom-right | top-left | top-right
    followByDefault: false,
    remember: true, // persists the toggle in localStorage
    clickable: true,
    idleBehavior: 'sleep', // "sleep" | "sit"
    size: 1, // 1 = 32px, 1.5 = 48px, 2 = 64px …
    speed: 10,
    fleeDistance: 120,
    fleeSpeed: 1.35,
    zIndex: 999,
    sprite:
      'https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif',
  },

  /* ---- footer -------------------------------------------------- */
  footer: {
    location: 'India',
    timeZone: 'Asia/Kolkata',
    quote: "“Good design is invisible until it's missing.”",
    copyright: '© Akshit Manik 2026',
  },

  /* ---- projects ------------------------------------------------
     Add a third case study by appending one object. Nothing else
     needs to change — the column, the cards and the parallax all
     read from this array.
     `bgColors` — shadow, body and highlight colours for the React Bits Silk
                  surface behind the card (see gradient.js).
     `bg`       — the flat CSS fallback, shown if WebGL is unavailable.
     `image`    — the screenshot that floats on top. Optional.
     `video`    — an autoplaying thumbnail video. Optional; takes priority
                  over `image`, which remains its poster/fallback.
     `fit`      — "cover" (default) or "contain" for tall/phone shots.
     ---------------------------------------------------------------- */
  projects: [
    {
      title: 'PrepInsta Prime — App',
      description:
        'Rebuilding the Prime mobile experience around a single, obvious path to learning.',
      href: '/work/prepinsta-app',
      surface: 'sage',
      silkRotation: -0.35,
      image: 'assets/prepinsta-app.png',
      video: 'assets/prepinsta-mobile-thumbnail.mp4',
      fit: 'cover',
      bgColors: ['#2b4a40', '#456357', '#5b7767'],
      bg: 'linear-gradient(135deg, #304f45, #4a695c)',
      textColor: '#f3f4e9',
      alt: 'PrepInsta Prime mobile app design system',
    },
    {
      title: 'PrepInsta Prime — Web',
      description:
        'A redesign of the syllabus, purchase, profile and search surfaces on the web platform.',
      href: '/work/prepinsta-web',
      surface: 'chalk',
      silkRotation: 0.8,
      image: 'assets/prepinsta-web-thumbnail.png',
      fit: 'cover',
      bgColors: ['#ccd9d5', '#e3eae3', '#f3f4eb'],
      bg: 'linear-gradient(135deg, #d3dfd9, #f1f3e8)',
      textColor: '#123c28',
      alt: 'PrepInsta Prime web experience shown across desktop screens',
    },
    {
      title: 'InfraOne AI Labs',
      description:
        'Designing the landing page, identity and launch campaign for an AI education platform.',
      href: '/work/infraone',
      surface: 'umber',
      silkRotation: -0.7,
      image: 'assets/infraone-hq.webp',
      fit: 'cover',
      bgColors: ['#241e1c', '#49372d', '#75553b'],
      bg: 'linear-gradient(135deg, #29221e, #514031)',
      textColor: '#ffffff',
      alt: 'InfraOne AI Labs website shown on a laptop surrounded by product and security panels',
    },
    {
      title: 'ZELTGOLD - Jewellery Savings',
      description:
        'Designing a trusted jewellery savings app and launch site in 20 days.',
      href: '/work/zeltgold',
      surface: 'olive',
      silkRotation: -0.5,
      image: 'assets/zeltgold.png',
      video: 'assets/zeltgold-thumbnail.mp4',
      fit: 'contain',
      bgColors: ['#15271f', '#304737', '#65704c'],
      bg: 'linear-gradient(135deg, #182d23, #3b4b32)',
      textColor: '#ffffff',
      alt: 'ZELTGOLD jewellery savings app and landing page case study',
    },
    {
      title: 'Cars24 — Dealer Auctions',
      description:
        'Bringing trust, transparency and energy to the Cars24 dealer auction experience.',
      href: '/work/cars24',
      surface: 'navy',
      silkRotation: 0.65,
      image: 'assets/cars24.png',
      // the hero is a 1.9:1 banner — "contain" keeps the headline and the
      // phone mockups intact instead of cropping them out of a 4:3 box
      fit: 'contain',
      bgColors: ['#101d30', '#243957', '#405775'],
      bg: 'linear-gradient(135deg, #142238, #2a405e)',
      textColor: '#ffffff',
      alt: 'Cars24 dealer auction app redesign case study',
    },
  ],
};
