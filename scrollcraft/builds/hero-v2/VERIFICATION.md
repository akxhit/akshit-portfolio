# Hero v2 — local acceptance

Final UI verified with headless Chrome at 1440×900, 1280×720, 390×844, 360×640, plus reduced motion at 1440×900. Native pointer lock and capture disabled in test contexts.

Passed: no horizontal overflow, portrait loads, desktop pointer pan, zoom, reset, keyboard pan/reset, current-focus disclosure, About/FAQs bounds, contact dialog bounds and Escape, resume email fallback, saved page position after refresh, zero page exceptions. Existing eight feedback/reading-state tests pass.

Visual corrections: signature stays on one line; CTA uses dark text on lime; short desktop keeps the focus note above tools; popovers inherit the green palette and stay inside phone bounds; previous black-on-dark contact header corrected. Earlier screenshots are superseded by the final run.

Evidence: outputs/hero-v2/verification.json and named desktop/mobile/reduced screenshots, including panned, contact-open and scroll positions.

Local preview: http://localhost:3001/. No deployment performed.

Pending user assets: real personal photo collage, resumeUrl and calendarUrl. The current portrait is explicitly temporary. Resume opens an email request, and Book a call opens the existing contact form until configured.

V1 checkpoint: outputs/hero-v1-20260906/. Restore its homepage source to roll back the hero; preserve unrelated future changes.
