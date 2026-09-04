Method: dual-agent (A: /root/zeltgold_design_review · B: /root/zeltgold_evidence_review)

# ZELTGOLD App — UX Flow and Interface Analysis

## Product model inferred from the recording

ZELTGOLD digitizes jewellery saving with trusted local jewellers. Users can accumulate cash or live-rate gold/silver, join retailer-specific schemes, create goal-led plans, track holdings, and redeem them at a physical store.

The core product relationship appears to be:

**Jeweller → Jar or Scheme → Payment → Portfolio entry → Physical redemption**

The inference is grounded in the recording; it is not a claim about the business beyond what the UI shows.

## Chronological flow map

- **00:00–00:18 — Home and notifications:** Signed-in home, live metal-rate ticker, promotional carousel, four saving shortcuts, goal cards, then notification tabs for All, Rewards, Rate, and Updates, including an empty state.
- **00:19–01:14 — Home education and referral:** Deep home scroll through retailer trust, portfolio, KYC, jewellery-price calculator, process explanation, comparison table, testimonials, security/support, and a referral detail page.
- **01:15–01:44 — Gold Jar purchase:** Jeweller selection, amount entry, order review, payment-method choice, PhonePe handoff, repeated payment failures, reassurance, retry/cancel, and return navigation.
- **01:45–02:08 — Existing Amount Scheme:** Kubera 11+1 plan, amount and SIP-date configuration, terms gating, Scheme Active state, next-installment payment attempt, and failure recovery.
- **02:09–03:03 — Goal-led custom plans:** Wedding goal, retailer choice, existing-vs-custom branch, cash Amount Plan, grams-based Gold Plan, live calculations, recalculation states, summaries, and preserved values after Back.
- **03:04–03:18 — Existing Gold Scheme:** Samruddhi configuration, amount presets/slider, making-charge benefit, terms acceptance, active-scheme state, and navigation back through the hierarchy.
- **03:29–04:10 — Explore and retailer detail:** Location/map loading, verified retailer profile, jars, schemes, custom plans, empty featured-products state, calculator, map/hours, reviews, WhatsApp contact, and Gold/Silver order entry.
- **04:11–04:18 — Portfolio and redemption:** Total holdings, Jar/Scheme/Custom Plan tabs, empty states, redemption-code generation, and return to portfolio.
- **04:19–04:48 — Profile and account:** Personal details, pending KYC/PAN, transaction history, empty nominee, referral, biometric setting, help, terms/privacy, logout, and delete-account entry.
- **04:49–05:05 — Navigation/state retention:** Rapid bottom-tab switching shows retained scroll positions before ending on Home.

## Design health score

All ten heuristics apply to this operational mobile product. Scores reflect only behavior visible in the recording.

| #         | Heuristic                       |     Score | Key evidence                                                                                                                                                  |
| --------- | ------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of system status     |       3/4 | Selected/disabled states, live calculations, processing, failure, history, KYC, and active tabs are visible; location status becomes contradictory.           |
| 2         | Match with the real world       |       3/4 | Rupees, grams, purity, BIS, jewellers, due dates, bonuses, and counter redemption fit the domain; terms like 11+1, HUID, SIP, and live gold assume knowledge. |
| 3         | User control and freedom        |       2/4 | Back, Retry, and Cancel are present; external payment removes control and high-stakes actions lack visible undo/edit shortcuts.                               |
| 4         | Consistency and standards       |       3/4 | Cards, chips, sticky CTAs, and navigation are coherent; copy and some transitional/overlay states are inconsistent.                                           |
| 5         | Error prevention                |       2/4 | Presets, ranges, disabled CTAs, summaries, fees, and T&C gating help; large commitments and KYC gating need stronger safeguards.                              |
| 6         | Recognition over recall         |       3/4 | Labels, presets, reviews, history, and portfolio reduce memory burden; the Jar/Scheme/Plan taxonomy remains difficult.                                        |
| 7         | Flexibility and efficiency      |       3/4 | Quick starts, goal-led and retailer-led routes, presets, direct entry, search, filters, and sharing provide multiple paths.                                   |
| 8         | Aesthetic and minimalist design |       2/4 | Transaction screens are focused, but Home and retailer pages are very long and dense, with clipped content and unfinished media states.                       |
| 9         | Error recovery                  |       3/4 | Payment failure clearly explains refund behavior and offers Retry/Cancel; it lacks a direct alternate-method or support route.                                |
| 10        | Help and documentation          |       2/4 | Help, FAQ, terms, and support are discoverable; complex financial choices lack contextual explanation and risk guidance.                                      |
| **Total** |                                 | **26/40** | **Acceptable: strong product model and trust cues, with material clarity and high-stakes safeguards still needed.**                                           |

## Design-specificity verdict

**Product-specific and authored, with a generic fintech interaction layer.**

The app could not be relabelled as an unrelated savings product unchanged. Its jewellery specificity is strong: 22K/916 terminology, live grams/rates, jars, 11+1 retailer schemes, BIS/HUID trust cues, Indian-number formatting, family milestone goals, local-store identity, and counter redemption.

The interaction grammar—white cards, segmented pills, sliders, sticky green CTAs, and long settings lists—is conventional fintech. The custom-plan builder especially could belong to a generic SIP app. A stronger case-study direction would make jewellery craftsmanship, the local-retailer relationship, and tangible progress toward a real piece more central than the green-and-gold styling alone.

## What works

1. **Domain-specific trust architecture:** Verification, BIS/HUID language, store history, live rates, transparent fees, payment history, refund reassurance, and physical redemption address real jewellery-saving anxiety.
2. **Strong consequence summaries:** Review screens restate retailer, cadence, dates, fees, grams, payment count, initial commitment, and live-rate dependence before payment.
3. **Digital-to-physical bridge:** Maps, real retailer identity, reviews, WhatsApp, store-specific schemes, jars, and redemption create a credible link to an actual jeweller.
4. **Coherent transaction system:** Green selection states, gold value accents, bordered summaries, and bottom-anchored CTAs remain recognizable across a large number of flows.

## Priority issues

### [P1] Location relevance contradicts the product promise

At approximately **04:09**, a surface framed as jewellers near the user within 5 km displays a retailer about **1752.1 km** away; earlier distance is N/A.

**Why it matters:** Local trust and redemption are central. A geographically impossible result weakens confidence in store eligibility and product reliability.

**Fix:** Do not label results as nearby until location resolves. Enforce the radius, offer manual city selection, and distinguish nearby, fallback, permission-denied, and location-error states.

### [P1] KYC requirements conflict with the visible account state

Profile says **Complete your KYC to start saving**, while the account already contains a holding, can generate a redemption code, and can enter payment flows.

**Why it matters:** Ambiguous compliance rules are especially damaging in a financial product.

**Fix:** State exactly what KYC gates—deposit, cumulative threshold, withdrawal, or redemption—and preflight that requirement before plan configuration or checkout.

### [P1] High-value commitments lack proportional safeguards

Nearly identical UI patterns handle a ₹1,000 jar deposit and an approximately ₹7,19,250 quarterly commitment. The recording shows no proportional warning, volatility scenario, limit check, or deliberate confirmation.

**Why it matters:** The financial consequence changes dramatically while the emotional and interaction weight barely changes.

**Fix:** Add progressive disclosure for high values, show total commitment and future-payment uncertainty, preflight KYC/payment limits, and require an explicit final confirmation.

### [P2] The top-level experience carries too many competing jobs

Home simultaneously sells, educates, calculates, reassures, refers, reports portfolio value, and launches saving tasks. Retailer detail repeats jars, schemes, custom plans, calculator, reviews, location, and contact in one long page.

**Why it matters:** New users struggle to decide where to start; returning users scroll past acquisition content to manage money.

**Fix:** Make Home state-aware: one primary next action, current progress/upcoming payment, and two or three shortcuts. Move long education, comparison, and testimonials into Learn/About. Collapse secondary retailer modules.

### [P2] Failure recovery loops back into the same payment path

The failure screen is reassuring, but offers only Retry and Cancel despite repeated PhonePe failures.

**Why it matters:** Reassurance reduces panic, but retrying the same route can create a dead end.

**Fix:** Preserve the reviewed order and add Choose another payment method, a reason-specific explanation, transaction details, and support linked to the order ID.

### [P2] Some states look visually unfinished or unstable

The recording includes clipped horizontal content, a persistent blank dark-green retailer media area, dense legal copy, low-contrast secondary text, and several transitional composites. The composites are recording/sampling artifacts; the persistent blank block is a rendered app state whose cause cannot be proven from pixels.

**Fix:** Use intentional overflow cues, design a missing-media placeholder, improve state/text contrast, and present long legal content with a summary plus progressive detail.

## Cognitive load and emotional journey

Product-level cognitive load is high even though individual checkout summaries are relatively clear. The main decision points mix many visible options: notification filters, calculator parameters, plan type, targets/presets, durations, frequency, sliders, and calculated outcomes. The product needs a simpler mental model separating **Jar**, **retailer scheme**, and **custom plan** before asking users to configure them.

The emotional journey starts warm and culturally relevant, builds trust through live prices and verified retailers, dips when the product taxonomy becomes complex, and drops sharply during repeated external-payment failures. Refund reassurance recovers confidence. The strongest payoff is redemption-code generation, where digital saving becomes a concrete in-store action. That should be the case study's peak moment.

## Persona red flags

### Confused first-time saver

- Encounters Gold Jar, Silver Jar, Amount Scheme, Gold Scheme, goals, and custom plans before learning the differences.
- Must understand 11+1, SIP, live gold, BIS/HUID, and Amount Plan terminology.
- Reaches dense terms only after configuring a potentially expensive commitment.

### Distracted mobile user

- Must navigate very long Home and retailer pages.
- External payment creates interruption risk; app-switch persistence was not demonstrated.
- Dense forms and partially clipped horizontal controls increase scanning and mistap risk.

### Deliberate trust/stress tester

- Sees the near-5-km versus 1752.1-km contradiction.
- Sees KYC-not-started alongside an existing holding and accessible redemption/payment routes.
- Cannot verify duplicate-tap, offline, redemption-expiry, deletion-confirmation, or successful-payment behavior from the recording.

## Screenshot deliverables

- `screenshots-hq/`: 45 correctly time-coded, native-resolution PNGs covering the full flow.
- `case-study-shortlist-raw/`: 25 lossless narrative captures chosen for stable UI states and case-study value.
- `preview-1fps/`: 306 one-second JPEG previews used for exhaustive flow inspection.
- `contact-sheets/`: 10 timeline sheets used for chronological review.

Best hiring-manager narrative sequence:

1. Home/product thesis
2. Calculator and live values
3. Gold Jar review
4. Payment-gateway handoff
5. Payment failure and recovery
6. Retailer-scheme economics
7. Scheme-active success
8. Existing-versus-custom plan branch
9. Custom amount and gold summaries
10. Local retailer discovery and verified profile
11. Reviews/contact and order entry
12. Portfolio
13. In-store redemption payoff
14. Account/KYC/transaction governance

Files marked `sensitive` contain personal, referral, redemption, KYC, or transaction information. They are suitable for private analysis only and must be redacted or recreated with demo data before publication. The greeting name and transaction/order identifiers elsewhere should also be reviewed.

## Evidence and limitations

- Source: H.264 MP4, **305.888 seconds**, **720×1594**, approximately **70.7 MB**.
- PNG captures preserve the decoded frame without additional lossy compression; they cannot recreate detail already lost to H.264 encoding.
- The source-oriented detector was attempted once against the MP4 and returned exit code 0 with no output because a rasterized video contains no source or DOM to inspect.
- Browser overlays were not applicable: the recording has no DOM, accessibility tree, source mapping, or interactive state. Frame-by-frame inspection was used instead.
- The video does not show onboarding/login, a successful new payment, offline behavior, accessibility semantics, duplicate-tap handling, redemption expiry, account-deletion confirmation, nominee completion, or exhaustive validation.
- Visible trust/security claims are product content from the recording, not independently verified facts.

## Questions to consider

- Should the case study lead with ZELTGOLD as a local-jeweller trust platform or as a flexible jewellery-savings system?
- Was the goal-based planning flow the core design problem, or one route inside a larger redesign?
- Which visible issues were known constraints, intentional trade-offs, or post-launch discoveries?
- What measurable outcome can anchor the story: activation, completed scheme starts, payment conversion, plan creation, retailer discovery, or qualitative trust feedback?
