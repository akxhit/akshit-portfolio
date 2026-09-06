/* ═══════════════════════════════════════════════════════════════════
   EVERY NUMBER AND EVERY CREDIT ON THE PAGE LIVES HERE.
   Nothing is hard-coded in page.js, so you change a figure once.

   ── FACTS ──   read off the Figma file and the live product. Accurate.
   ── SCORE / IMPACT ──  PLACEHOLDERS. Akshit to replace with the real
      post-launch numbers before this goes anywhere near a hiring manager.
      Keep the shape (value + the one line explaining what moved it) —
      that pairing is what makes a metric readable instead of decorative.
   ═══════════════════════════════════════════════════════════════════ */

export const META = {
  role: 'Product designer',
  scope: 'prepinsta.com + Prime',
  platforms: 'Desktop & mobile web',
  focus: 'Pricing + discovery',
};

/** Real, verifiable — these appear on the live product or in the file. */
export const FACTS = {
  monthlyLearners: '10M+', // stated on prepinsta.com
  primeStudents: '3,10,000+', // stated on the Prime purchase page
  courses: '200+',
  hiringPartners: '1200+',
  collegePartners: '100+',
  // page heights, straight out of the Figma frames
  syllabusOld: 16984,
  syllabusNew: 12654,
  purchaseOld: 13961,
  purchaseNew: 11539,
  // design system
  variables: 154,
  collections: 9,
  // what the redesign covers
  pages: 5,
  states: 40,
};

/** Headline row under the hero. PLACEHOLDER VALUES. */
export const SCORE = [
  { v: 23, prefix: '+', suffix: '%', label: 'Checkout completion', hi: true },
  { v: 18, prefix: '+', suffix: '%', label: 'Average order value', hi: true },
  { v: 61, suffix: '%', label: 'Chose a 12-month+ plan' },
  { v: 31, prefix: '+', suffix: '%', label: 'Syllabus → pricing' },
  { v: 4.7, decimals: 1, suffix: '×', label: 'Search usage' },
  { v: 46, prefix: '−', suffix: '%', label: 'Plan & expiry tickets' },
];

/** Closing section. PLACEHOLDER VALUES — the `why` lines are the real work. */
export const IMPACT = [
  {
    k: 'Checkout completion',
    v: '+23%',
    why: 'Per-month pricing, one recommended plan instead of six equal ones, and a total that stays pinned to the bottom of the plan list.',
  },
  {
    k: 'Average order value',
    v: '+18%',
    why: 'Longer plans stopped looking expensive once the page compared them by monthly cost rather than by the number on the invoice.',
  },
  {
    k: '12-month-and-longer plans',
    v: '38% → 61%',
    why: 'One “Best Value” marker doing the recommending, on a ladder that reads top to bottom instead of six cards competing.',
  },
  {
    k: 'Orders that needed a coupon',
    v: '71% → 34%',
    why: 'The old page printed “80% off, use code PRIME” six times. Students learned to wait for a code. A dated sale with a live countdown replaced the permanent discount.',
  },
  {
    k: 'Syllabus → pricing',
    v: '+31%',
    why: 'A sticky section rail turned a 17,000px page into something a student could navigate, so more of them reached the end of it.',
  },
  {
    k: 'Search usage',
    v: '4% → 19% of sessions',
    why: "The empty state became a browse surface — popular searches and eleven categories — so nobody had to already know the catalogue's vocabulary.",
  },
  {
    k: 'Plan & expiry support tickets',
    v: '−46%',
    why: '“When does my plan end?” was the single most common ticket. It is now a line on the profile, with the certificate claimable in place.',
  },
];

/** Surfaces the marquee lists. */
export const SURFACES = [
  ['Navigation', 'two products'],
  ['Search', '5 states'],
  ['Syllabus', 'desktop + mobile web'],
  ['Purchase', 'desktop + mobile web'],
  ['Profile', 'paid · unpaid · empty'],
  ['Upgrade', 'ladder + callback'],
  ['Certificates', 'claim + verify'],
  ['Design system', '154 variables'],
];
