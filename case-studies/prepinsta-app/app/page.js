import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { LayoutGrid, Route } from 'lucide-react';
import HeroField from '@/components/HeroField';
import HeroReel from '@/components/HeroReel';
import StoreButtons from '@/components/StoreButtons';
import ActBreak from '@/components/ActBreak';
import CopyEmail from '@/components/CopyEmail';
import {
  Reveal,
  RevealMedia,
  MaskReveal,
  Stagger,
  Counter,
  Device,
  DeviceVideo,
  Reel,
  Well,
} from '@/components/Bits';
import { M } from '@/lib/media';

// Checked on the server so the client never fires a request that 404s.
const HERO_REEL = '/case-studies/prepinsta-app/media/hero-reel.mp4';
const heroReelReady = fs.existsSync(
  path.join(process.cwd(), 'public', HERO_REEL),
);

export default function Page() {
  return (
    <main>
      {/* ══════════════ HERO ══════════════ */}
      <header
        className="hero-shell"
        style={{ paddingBlock: 'clamp(88px,8vw,116px) clamp(28px,3vw,40px)' }}
      >
        <HeroField />
        <div className="wrap stack-lg">
          <div className="stack">
            <h1 className="display" style={{ maxWidth: '13em' }}>
              <MaskReveal delay={0.08}>
                <span className="accent-fg">PrepInsta Prime:</span>
              </MaskReveal>
              <MaskReveal delay={0.16}>
                <span className="accent-fg">a 1.5M-user web platform,</span>
              </MaskReveal>
              <MaskReveal delay={0.26}>
                rebuilt as a mobile growth engine.
              </MaskReveal>
            </h1>

            <Reveal delay={0.5}>
              <p className="lede">
                I designed PrepInsta Prime&rsquo;s first native app — turning
                200+ fragmented courses into{' '}
                <span className="hl">
                  a guided learning ecosystem and a revenue-driving acquisition
                  engine
                </span>
                .
              </p>
            </Reveal>

            <Reveal delay={0.58}>
              <StoreButtons />
            </Reveal>
          </div>

          <Reveal delay={0.66}>
            <div className="meta">
              <div>
                <span className="label">Role</span>
                <p>Sole product designer</p>
              </div>
              <div>
                <span className="label">Scope</span>
                <p>iOS + Android, 0→1</p>
              </div>
              <div>
                <span className="label">Team</span>
                <p>1 PM · 6 engineers</p>
              </div>
              <div>
                <span className="label">Focus</span>
                <p>Learning + growth</p>
              </div>
            </div>
          </Reveal>

          <RevealMedia>
            <HeroReel src={HERO_REEL} ok={heroReelReady} />
          </RevealMedia>
        </div>
      </header>

      {/* ══════════════ SCORECARD ══════════════ */}
      <div className="wrap" style={{ paddingBottom: 'clamp(28px,4vw,56px)' }}>
        <Reveal>
          <div className="score">
            <div>
              <div className="v">
                <Counter to={15000} suffix="+" />
              </div>
              <div className="l">MAU, from zero</div>
            </div>
            <div>
              <div className="v">
                <Counter to={4.8} decimals={1} />
                <small> ★</small>
              </div>
              <div className="l">867 reviews</div>
            </div>
            <div className="hi">
              <div className="v">
                <Counter to={15} prefix="+" suffix="%" />
              </div>
              <div className="l">Free → paid</div>
            </div>
            <div className="hi">
              <div className="v">
                <Counter to={25} prefix="+" suffix="%" />
              </div>
              <div className="l">Net ARPU</div>
            </div>
            <div>
              <div className="v">
                <Counter to={40} prefix="−" suffix="%" />
              </div>
              <div className="l">Support tickets</div>
            </div>
            <div>
              <div className="v">
                <Counter to={30} prefix="+" suffix="%" />
              </div>
              <div className="l">Faster handoff</div>
            </div>
          </div>
        </Reveal>
      </div>

      <Marquee />

      {/* ══════════════ ORIGIN & BRIEF ══════════════ */}
      <section data-chapter="Origin" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">
                The origin &amp; strategic brief
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Every student was on a phone.</span>{' '}
                Every conversion mechanism was built for a desktop.
              </h2>
            </Reveal>
          </div>

          <div className="split">
            <Reveal>
              <div className="stack-sm">
                <p className="body">
                  Indian placements split into two games — product companies
                  (Google, Amazon) and mass recruiters (TCS, Infosys). PrepInsta
                  Prime packed both into one subscription of{' '}
                  <strong>200+ courses</strong> and dominated desktop web with{' '}
                  <span className="hl">
                    <strong>1.5M+ students</strong>
                  </span>
                  .
                </p>
                <p className="body">
                  Mobile web drove the majority of that traffic, yet students
                  hit severe friction: fragmented browser sessions, broken video
                  playback, and{' '}
                  <span className="hl">massive checkout drop-offs</span>.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="plate">
                <span className="label">Traffic reality</span>
                <span className="stat-xl" style={{ marginTop: 6 }}>
                  <Counter to={68} suffix="%" />
                </span>
                <p
                  className="small"
                  style={{ marginTop: 10, maxWidth: '26em' }}
                >
                  of total platform traffic came from mobile web — served by a
                  desktop-first product.
                </p>
                <div className="bars">
                  <div className="bar">
                    <i style={{ width: '68%' }} />
                    <span>Mobile</span>
                  </div>
                  <div className="bar">
                    <i className="dim" style={{ width: '32%' }} />
                    <span>Desktop</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Stagger className="g g2">
            <div className="card">
              <span className="label accent">Catalyst A</span>
              <h3 className="h4" style={{ margin: '6px 0 8px' }}>
                B2B growth &amp; upsell
              </h3>
              <p className="small">
                Institutional partners on PrepInsta Optimus needed a premium
                mobile app to close enterprise deals.
              </p>
            </div>
            <div className="card">
              <span className="label accent">Catalyst B</span>
              <h3 className="h4" style={{ margin: '6px 0 8px' }}>
                Direct-to-consumer growth
              </h3>
              <p className="small">
                A dedicated App Store and Play Store presence, plus organic
                search that desktop web never had.
              </p>
            </div>
            <div className="card card-accent">
              <span className="label accent">Phase 1 · Alpha</span>
              <p className="small" style={{ marginTop: 8 }}>
                A distraction-free, zero-friction{' '}
                <strong>consumption app</strong> for existing subscribers —
                maximise daily learning habits, surface proof of completion,
                lower churn.
              </p>
            </div>
            <div className="card card-gold">
              <span className="label gold">Phase 2 · Growth engine</span>
              <p className="small" style={{ marginTop: 8 }}>
                An acquisition-driven <strong>freemium experience</strong>{' '}
                converting cold, price-sensitive students through progressive
                disclosure and risk reversals.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ══════════════ DISCOVERY, RESEARCH & THE PROBLEM ══════════════ */}
      <section data-chapter="Research" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">Discovery &amp; research</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">What sales knew</span> that analytics
                couldn&rsquo;t.
              </h2>
            </Reveal>
          </div>

          <Reveal>
            <div className="stack-sm">
              <h3 className="h3">How I looked into it</h3>
              <div className="meta">
                <div>
                  <span className="label">Sales triage</span>
                  <p>12 interviews with reps &amp; support leads</p>
                </div>
                <div>
                  <span className="label">Cohorts</span>
                  <p>8 paid + 12 unpaid students</p>
                </div>
                <div>
                  <span className="label">Benchmarking</span>
                  <p>8 EdTech apps audited</p>
                </div>
                <div>
                  <span className="label">Funnel analytics</span>
                  <p>Every mobile drop-off node mapped</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="plate">
              <span className="label">The core problem</span>
              <p
                className="h3"
                style={{
                  marginTop: 10,
                  position: 'relative',
                  maxWidth: '26em',
                }}
              >
                Students freeze in front of 200+ unstructured courses. The
                business has no easy way on mobile to prove quality, guide prep,
                and{' '}
                <span className="hl">
                  convert free intent into recurring revenue
                </span>
                .
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card card-accent">
              <span className="label accent">
                Working the technical constraint
              </span>
              <p className="small" style={{ marginTop: 10, maxWidth: '48em' }}>
                <span className="hl">
                  With engineering leads I set an architectural contract
                </span>
                :{' '}
                <strong>
                  rarely-changing metadata baked into static payloads
                </strong>
                , <strong>volatile assets on dedicated API channels</strong> —
                fewer roundtrips,{' '}
                <span className="hl">sub-second renders on budget Android</span>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── setup ends, product work begins ─── */}
      <div id="dark-start" aria-hidden="true" />
      <ActBreak />

      {/* ══════════════ PHASE 1 · ALPHA ══════════════ */}
      <section data-chapter="Phase 1 · Alpha" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">
                Phase 1 · Alpha — the consumption engine
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Phase 1 · Alpha.</span> The consumption
                engine.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Built for people who had already paid. No marketing, no upsell —
                daily learning habits, visible proof of completion, lower churn.
              </p>
            </Reveal>
          </div>

          <div className="stack">
            <Well caption="The paid home, and the sheet that replaced a full page load">
              <Device
                bar
                id="home-paid"
                w="min(272px, 74vw)"
                caption="Paid home"
                scrollable
                priority
              />
              <DeviceVideo
                id="v-sheet"
                w="min(272px, 74vw)"
                caption="Tap to sheet"
              />
            </Well>
            <Reveal>
              <div className="split" style={{ alignItems: 'start' }}>
                <div className="stack-sm">
                  <h3 className="h3">A home screen that just does the job</h3>
                  <ul className="bul">
                    <li>
                      <strong>Continue Watching</strong> above the fold — one
                      tap back into playback.
                    </li>
                    <li>Every course a student owns, in one place.</li>
                    <li>
                      Ordered the way a student actually works: skills,
                      full-stack, languages, projects, then company prep.
                    </li>
                  </ul>
                  <div className="figure-row" style={{ marginTop: 4 }}>
                    <div className="figure">
                      <b>18.4s → 2.1s</b>
                      <span>Launch to playback, mobile web against native</span>
                    </div>
                  </div>
                </div>
                <div className="stack-sm">
                  <h3 className="h3">A bottom sheet instead of a page load</h3>
                  <ul className="bul">
                    <li>
                      Every course tap used to load a full page — comparing
                      three meant losing your place.
                    </li>
                    <li>
                      The sheet shows only decision markers: videos, hours,
                      projects, learners, rating.
                    </li>
                    <li>
                      Open the syllabus or join outright — a quick preview
                      first, so nobody commits blind.
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* course + quiz: one continuous learning surface */}
          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Inside a course, and getting it wrong on purpose
                </h3>
                <p className="body">
                  Video, articles, sandboxes and timed quizzes in one list, each
                  stating its type and cost in minutes. A wrong answer turns
                  red, the right one green, and an explanation expands
                  underneath —{' '}
                  <strong>the failure state carries the teaching</strong>, and
                  nothing reflows.
                </p>
              </div>
            </Reveal>
            <Well caption="Content · article · question → answered → submitted · and the rating prompt, which fires after a completed item rather than on launch">
              <Device
                id="course-content"
                w="min(224px, 68vw)"
                caption="Course · content"
              />
              <Device
                id="course-article"
                w="min(224px, 68vw)"
                caption="Course · article"
              />
              <Device
                id="quiz-q"
                w="min(224px, 68vw)"
                caption="Quiz · question"
              />
              <Device
                id="quiz-a"
                w="min(224px, 68vw)"
                caption="Quiz · answered"
              />
              <Device
                id="quiz-done"
                w="min(224px, 68vw)"
                caption="Quiz · submitted"
              />
              <Device
                id="nps"
                w="min(224px, 68vw)"
                caption="Rating · in-app NPS"
              />
            </Well>
          </div>

          <div className="split">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">The syllabus, visible before you buy</h3>
                <ul className="bul">
                  <li>
                    Sticky section headers and an auto-collapsing accordion, so
                    opening a module never loses the one you were in.
                  </li>
                  <li>
                    The page keeps going past the module list —{' '}
                    <strong>
                      projects you&rsquo;ll ship, tools you&rsquo;ll learn,
                      screens from inside the course, the mentors teaching it,
                      success stories and an FAQ
                    </strong>
                    . Every block answers the next question instead of ending
                    the scroll.
                  </li>
                  <li>
                    If the structure is what students are buying, hiding it
                    makes no sense. It stays open to unpaid users.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="well">
                <Device
                  bar
                  id="syllabus"
                  w="min(288px, 78vw)"
                  caption="Full syllabus"
                  scrollable
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════ PHASE 2 · FREEMIUM ══════════════ */}
      <section data-chapter="Phase 2 · Freemium" className="bloom gold">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label gold">
                Phase 2 · Freemium — the acquisition engine
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Phase 2 · Freemium.</span> The
                acquisition engine.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Same app, opened to people who never planned to pay. The job
                here: turn cold, price-sensitive traffic into believers.
              </p>
            </Reveal>
          </div>

          {/* two self-contained blocks, side by side — the motion column is
              wider, because a square video needs it more than a phone frame */}
          <div className="split-uneven">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Most students never learn what we actually offer
                </h3>
                <ul className="bul">
                  <li>
                    <strong>Awareness</strong> — the full offering, not one
                    course at a time.
                  </li>
                  <li>
                    <strong>Trust</strong> — hiring partners, learner counts,
                    testimonials.
                  </li>
                  <li>
                    <strong>Direction</strong> — CTAs that route to Experience
                    and demo videos.
                  </li>
                </ul>
                <div className="well" style={{ marginTop: 4 }}>
                  <Device
                    bar
                    id="home-unpaid"
                    w="min(248px, 70vw)"
                    caption="Freemium home"
                    scrollable
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="stack-sm">
                <h3 className="h3">Entrances that arrive in order</h3>
                <ul className="bul">
                  <li>Dumping every module at once reads as noise.</li>
                  <li>
                    Each block enters on its own beat — badge, podium, counts,
                    then the CTA.
                  </li>
                  <li>
                    Self-authored in After Effects, shipped as Lottie — under
                    45KB each.
                  </li>
                </ul>
                <div className="well well-2" style={{ marginTop: 4 }}>
                  <div className="reel-stack">
                    <Reel
                      id="v-home1"
                      caption="Top companies"
                      w="min(292px, 78vw)"
                      hideCaption
                    />
                    <Reel
                      id="v-home2"
                      caption="Section transitions"
                      w="min(292px, 78vw)"
                      hideCaption
                    />
                  </div>
                  <DeviceVideo
                    id="v-splash"
                    w="min(258px, 70vw)"
                    caption="Splash · Lottie"
                  />
                </div>
                <ul className="bul" style={{ marginTop: 10 }}>
                  <li>
                    <strong>+30%</strong> faster developer handoff, Figma tokens
                    straight to code.
                  </li>
                  <li>
                    <strong>60fps</strong> motion held on budget Android.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Experience: where a free user actually uses the app
                </h3>
                <p className="body">
                  A permanent tab where someone who hasn&rsquo;t paid can{' '}
                  <strong>use the product, not read about it</strong>. Discovery
                  forks by <em>who is hiring</em>: product-based vs
                  service-based, since the prep doesn&rsquo;t transfer between
                  them.{' '}
                  <span className="hl">
                    This became the top route into checkout.
                  </span>
                </p>
                <div className="stat-visuals">
                  <div className="stat-visual">
                    <LayoutGrid strokeWidth={1.5} />
                    <div>
                      <b>Explore tab</b>
                      <span>The full catalogue</span>
                    </div>
                  </div>
                  <div className="stat-visual">
                    <Route strokeWidth={1.5} />
                    <div>
                      <b>Top path</b>
                      <span>Most common route into checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Well caption="The Experience tab, and the two paths it forks into">
              <Device
                bar
                id="experience"
                w="min(240px, 70vw)"
                caption="Experience tab"
                scrollable
              />
              <Device
                id="placement"
                w="min(240px, 70vw)"
                caption="Placement courses"
              />
              <Device
                id="upskilling"
                w="min(240px, 70vw)"
                caption="Upskilling courses"
              />
            </Well>
          </div>

          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Two takes on the Experience hero, three weeks apart
                </h3>
                <p className="body">
                  The first was loud — saturated magenta, motion on everything.
                  It tested as &ldquo;an ad&rdquo;. The shipped cut cools the
                  palette to the product green and moves only what carries
                  meaning.
                </p>
              </div>
            </Reveal>
            <Well variant="well-2" caption="First pass, then shipped">
              <DeviceVideo
                id="v-exp-iter"
                w="min(232px, 44vw)"
                caption="First pass"
              />
              <DeviceVideo
                id="v-exp-final"
                w="min(232px, 44vw)"
                caption="Shipped"
              />
            </Well>
          </div>

          <div className="split">
            <Reveal>
              <div className="stack-sm">
                <span className="label accent">Habit formation</span>
                <h3 className="h3">Stories: a reason to open the app daily</h3>
                <ul className="bul">
                  <li>
                    Live hiring drives, off-campus deadlines, salary reports,
                    daily puzzles.
                  </li>
                  <li>
                    <strong>No enrolment, no login</strong> —{' '}
                    <span className="hl">
                      it makes daily actives out of traffic that hasn&rsquo;t
                      converted.
                    </span>
                  </li>
                  <li>
                    Every card is shareable. Placement news in India travels
                    through WhatsApp groups, not feeds.
                  </li>
                </ul>
                <div className="figure-row">
                  <div className="figure">
                    <b>+18%</b>
                    <span>DAU/MAU after Stories shipped</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="well well-2">
                <Device id="stories" w="min(236px, 70vw)" caption="Stories" />
              </div>
            </Reveal>
          </div>

          {/* ── monetisation: the flow, then the pricing iterations ── */}
          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">The checkout, end to end</h3>
                <p className="body">
                  Checkout is where the funnel bled hardest. The first build
                  stacked six durations, a countdown, a coupon strip and
                  testimonials on one page, everything competing for attention.
                  What survived: apply a code, pay, land on a screen that says
                  exactly what you own, or exactly what went wrong.
                </p>
              </div>
            </Reveal>
            <Well caption="Six-tier build · the coupon sheet · success states the expiry date · failure leads with the refund, no error code">
              <Device
                bar
                id="price-six"
                w="min(224px, 68vw)"
                caption="Six tiers · rejected"
                scrollable
              />
              <DeviceVideo
                id="v-coupon"
                w="min(224px, 68vw)"
                caption="Coupon flow"
              />
              <Device
                id="pay-success"
                w="min(224px, 68vw)"
                caption="Success · expiry stated"
              />
              <Device
                id="pay-failed"
                w="min(224px, 68vw)"
                caption="Failure · refund first"
              />
            </Well>
            <Reveal>
              <div className="g g2">
                <div className="card">
                  <span className="label gold">Coupon flow</span>
                  <p className="small" style={{ marginTop: 8 }}>
                    The sheet opens, the code lands, the total redraws.{' '}
                    <strong>The discount is shown happening</strong>, so the
                    price feels earned.
                  </p>
                </div>
                <div className="card">
                  <span className="label gold">Countdown timer</span>
                  <p className="small" style={{ marginTop: 8 }}>
                    A live timer above the plans, tied to a real expiry —{' '}
                    <strong>urgency the student can verify</strong>, not a
                    permanent fake sale.
                  </p>
                </div>
                <div className="card">
                  <span className="label gold">Hero animation</span>
                  <p className="small" style={{ marginTop: 8 }}>
                    The hero animates in first, plans settle underneath —{' '}
                    <strong>what you get before what it costs</strong>.
                  </p>
                </div>
                <div className="card">
                  <span className="label gold">Call us card</span>
                  <p className="small" style={{ marginTop: 8 }}>
                    A phone number on checkout, for a price point students call
                    their parents about.{' '}
                    <strong>A hesitant buyer gets a human</strong>, not a dead
                    end.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Two pricing architectures that replaced it
                </h3>
                <p className="body">
                  Both shipped far enough to produce a real answer rather than
                  an opinion.
                </p>
              </div>
            </Reveal>
            <div className="split">
              <Reveal>
                <div className="iter">
                  <span className="iter-head b">₹5 trial — partial</span>
                  <div className="iter-body">
                    <div
                      className="well well-tight"
                      style={{ alignSelf: 'stretch' }}
                    >
                      <Device
                        id="price-trial"
                        w="min(214px, 62vw)"
                        caption="₹5 for three days"
                      />
                    </div>
                    <ul className="mark">
                      <li className="y">
                        ₹5 verifies the card and turns a browser into someone
                        who decided
                      </li>
                      <li className="y">
                        The ladder states autopay plainly — hiding it earns
                        chargebacks
                      </li>
                      <li className="n">
                        Student debit cards fail RBI e-mandate registration
                        constantly
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="iter">
                  <span className="iter-head c">Two plans — adopted</span>
                  <div className="iter-body">
                    <div
                      className="well well-tight"
                      style={{ alignSelf: 'stretch' }}
                    >
                      <Device
                        id="price-dual"
                        w="min(214px, 62vw)"
                        caption="Monthly vs yearly"
                      />
                    </div>
                    <ul className="mark">
                      <li className="y">
                        ₹50 a day against ₹25 a day — a unit students actually
                        feel
                      </li>
                      <li className="y">
                        Gold means Prime everywhere, so it needs no
                        “recommended” label
                      </li>
                      <li className="y">
                        <span className="hl">
                          74% chose yearly once the per-day framing shipped
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── search ── */}
          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">
                  Nobody used search, so I stopped treating it like a field
                </h3>
                <p className="body">
                  In testing, people scrolled past a working search bar for
                  eight screens rather than type.{' '}
                  <strong>
                    An empty input asks you to know the vocabulary of a
                    catalogue you&rsquo;ve never seen.
                  </strong>{' '}
                  So the empty state became the interface.
                </p>
              </div>
            </Reveal>
            <Well
              variant="well-2"
              caption="Empty · under three characters · results · and the no-match state, which files a course request instead of dead-ending"
            >
              <Device
                id="search-entry"
                w="min(236px, 70vw)"
                caption="Empty · the interface"
                scrollable
              />
              <Device id="search-min" w="min(236px, 70vw)" caption="Typing" />
              <Device
                id="search-results"
                w="min(236px, 70vw)"
                caption="Results"
              />
              <Device
                id="search-empty-v2"
                w="min(236px, 70vw)"
                caption="No match · request course"
              />
            </Well>
          </div>

          {/* ── profile ── */}
          <div className="stack">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">Profile is where the two states diverge</h3>
                <p className="body">
                  The profile is kept deliberately plain — account details,
                  status, done.{' '}
                  <strong>Only one row changes between the two states</strong>:
                  paid users see their plan and expiry, unpaid users see a
                  single upgrade card. Everything else on the screen is
                  identical.
                </p>
              </div>
            </Reveal>
            <Well caption="Expiry date was the single most common support question · the curated avatar set sidesteps moderation and loads instantly on a slow connection">
              <Device
                id="profile-paid"
                w="min(236px, 70vw)"
                caption="Paid · status + expiry"
              />
              <Device
                id="profile-unpaid"
                w="min(236px, 70vw)"
                caption="Unpaid · one upgrade card"
              />
              <Device
                id="profile"
                w="min(236px, 70vw)"
                caption="Account · locked identity"
              />
              <Device
                id="profile-avatar"
                w="min(236px, 70vw)"
                caption="Ten avatars"
              />
            </Well>
          </div>
        </div>
      </section>

      {/* ══════════════ DESIGN INFRASTRUCTURE ══════════════ */}
      <section data-chapter="Design system" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">Design infrastructure</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Design infrastructure,</span> handed to
                engineering.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Built once, then reused everywhere it needed to appear — in the
                app, and later across the website pages I designed on top of it.
              </p>
            </Reveal>
          </div>

          <RevealMedia>
            <div className="board">
              <Image
                src={M['ds-board'].src}
                alt="Prime DS component library — layouts, buttons, navigation, messaging, content and icon specs"
                width={M['ds-board'].w}
                height={M['ds-board'].h}
                sizes="(max-width: 900px) 100vw, 1200px"
              />
            </div>
          </RevealMedia>

          <Reveal>
            <div className="card card-accent">
              <span className="label accent">Handoff</span>
              <p className="small" style={{ marginTop: 10, maxWidth: '48em' }}>
                <span className="hl">122 tokens, 79 component families</span> —
                handed to engineering once, and reused myself designing every
                new website page after, so the app and the site never drifted
                apart.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ SYSTEM STATES ══════════════ */}
      <section data-chapter="System states" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">System states</span>
            </Reveal>
          </div>

          <Well caption="Forced update, first pass and shipped · a dismissible soft update · and planned downtime">
            <Device
              id="upd-hard"
              w="min(236px, 70vw)"
              caption="Forced · first pass"
            />
            <Device
              id="upd-hard-v2"
              w="min(236px, 70vw)"
              caption="Forced · shipped"
            />
            <Device
              id="upd-soft"
              w="min(236px, 70vw)"
              caption="Soft · dismissible"
            />
            <Device id="upd-maint" w="min(236px, 70vw)" caption="Maintenance" />
          </Well>
        </div>
      </section>

      {/* ══════════════ LAUNCH ══════════════ */}
      <section data-chapter="Launch" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">Launch</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">The last screen in the funnel</span> is
                the one before the install.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                I designed the store listing too. Each panel takes one real
                screen and states one claim about it — no invented UI, no
                mockups of features that don&rsquo;t exist.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="stack-sm">
              <span className="label">Set one · 1:2.3</span>
              <div className="strip">
                {Array.from(
                  { length: 6 },
                  (_, i) => `store-${String(i + 1).padStart(2, '0')}`,
                ).map((id) => (
                  <StoreShot key={id} id={id} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="stack-sm">
              <span className="label">Set two · 1:1.78</span>
              <div className="strip">
                {Array.from(
                  { length: 7 },
                  (_, i) => `store-${String(i + 7).padStart(2, '0')}`,
                ).map((id) => (
                  <StoreShot key={id} id={id} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ IMPACT ══════════════ */}
      <section data-chapter="Impact" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">Impact &amp; outcomes</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">From the channel that leaked</span> to
                the channel that converts.
              </h2>
            </Reveal>
          </div>
          <Stagger className="g g3" step={0.06}>
            {[
              [
                'Free → paid',
                '+15%',
                'Ungated previews, guest exploration, visible syllabus before the paywall.',
              ],
              [
                'Net ARPU',
                '+25%',
                'Two-plan paywall with per-day reframing; 74% chose yearly.',
              ],
              [
                'Monthly actives',
                '15,000+',
                'Freemium surface plus Stories as a daily loop needing no enrolment.',
              ],
              [
                'Support tickets',
                '−40%',
                'Certificate in-app, expiry on the profile, honest failure states.',
              ],
              [
                'Store rating',
                '4.8 ★',
                '867+ reviews across both platforms after nine months live.',
              ],
              [
                'Handoff speed',
                '+30%',
                'Tokenised system removed the redline pass from every later feature.',
              ],
            ].map(([k, v, why]) => (
              <div className="card" key={k}>
                <span className="label">{k}</span>
                <div
                  className="h2"
                  style={{
                    fontSize: 'clamp(34px,3.6vw,46px)',
                    color: 'var(--accent)',
                  }}
                >
                  {v}
                </div>
                <p className="small" style={{ marginTop: 10 }}>
                  {why}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <footer>
        <div
          className="wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 28,
            flexWrap: 'wrap',
          }}
        >
          <div className="stack-xs">
            <span className="label">PrepInsta Prime Mobile App</span>
            <div className="h3">Akshit Manik</div>
            <p className="small">Sole product designer</p>
          </div>
          <div className="stack-sm" style={{ alignItems: 'flex-start' }}>
            <p
              className="small"
              style={{ maxWidth: '26em', color: 'var(--fg-3)' }}
            >
              Every screen and recording here is from the shipped build.
            </p>
            <CopyEmail />
          </div>
        </div>
      </footer>
    </main>
  );
}

/* Surfaces this app ships — doubled so the loop is seamless. */
function Marquee() {
  const items = [
    ['Home', 'two states'],
    ['Experience', 'discovery + proof'],
    ['Course view', '4 content types'],
    ['Search', '4 states'],
    ['Get Prime', '3 pricing tests'],
    ['Profile', 'paid vs unpaid'],
    ['Quizzes', 'answer + explain'],
    ['System states', 'update · maintenance'],
    ['Motion', 'Lottie under 45KB'],
    ['Design system', '122 tokens · 79 components'],
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((pass) =>
          items.map(([name, note]) => (
            <span className="marquee-item" key={`${pass}-${name}`}>
              <i /> <b>{name}</b> {note}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

/* Store panels are marketing art, not UI — they get a plain frame. */
function StoreShot({ id }) {
  const a = M[id];
  if (!a) return null;
  return (
    <div className="shot">
      <Image
        src={a.src}
        alt="App Store listing panel"
        width={a.w}
        height={a.h}
        sizes="(max-width: 700px) 46vw, 250px"
        loading="lazy"
      />
    </div>
  );
}
