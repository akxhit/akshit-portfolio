import CopyEmail from '@/components/CopyEmail';
import HeroField from '@/components/HeroField';
import ActBreak from '@/components/ActBreak';
import {
  Reveal,
  RevealMedia,
  MaskReveal,
  Stagger,
  Counter,
  Device,
  Browser,
  Shot,
  Clip,
  Well,
} from '@/components/Bits';
import { META, FACTS, SCORE, IMPACT, SURFACES } from '@/lib/metrics';

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
            <h1 className="display" style={{ maxWidth: '14em' }}>
              <MaskReveal delay={0.08}>
                <span className="accent-fg">
                  {FACTS.monthlyLearners} learners a month.
                </span>
              </MaskReveal>
              <MaskReveal delay={0.18}>
                The five pages that turn them
              </MaskReveal>
              <MaskReveal delay={0.28}>into subscribers, rebuilt.</MaskReveal>
            </h1>

            <Reveal delay={0.5}>
              <p className="lede">
                PrepInsta Prime is the subscription that funds the platform.
                Everything around it had been redesigned for mobile —{' '}
                <span className="hl">
                  the web pages that actually take the money hadn&rsquo;t
                </span>
                . I rebuilt pricing, syllabus, profile, search and the
                navigation across both products.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.6}>
            <div className="meta">
              <div>
                <span className="label">Role</span>
                <p>{META.role}</p>
              </div>
              <div>
                <span className="label">Scope</span>
                <p>{META.scope}</p>
              </div>
              <div>
                <span className="label">Platforms</span>
                <p>{META.platforms}</p>
              </div>
              <div>
                <span className="label">Focus</span>
                <p>{META.focus}</p>
              </div>
            </div>
          </Reveal>

          <RevealMedia>
            <Browser
              id="purchase-web"
              url="prepinsta.com/prime — choose your plan"
              scrollable
              priority
              caption="The purchase page, end to end"
            />
          </RevealMedia>
        </div>
      </header>

      {/* ══════════════ SCORECARD ══════════════ */}
      <div className="wrap" style={{ paddingBottom: 'clamp(28px,4vw,56px)' }}>
        <Reveal>
          <div className="score">
            {SCORE.map((s) => (
              <div key={s.label} className={s.hi ? 'hi' : undefined}>
                <div className="v">
                  <Counter
                    to={s.v}
                    decimals={s.decimals || 0}
                    prefix={s.prefix || ''}
                    suffix={s.suffix || ''}
                  />
                </div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Marquee />

      {/* ══════════════ THE BRIEF ══════════════ */}
      <section data-chapter="The brief" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">Where the work started</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">The app fixed how students learn.</span>{' '}
                The web is where they decide to pay.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Course pages arrive from search, pricing from ads, profile from
                an email. Those surfaces were the oldest in the product — and
                two of them had grown past <strong>14,000 pixels tall</strong>.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="goals">
              <div>
                <span className="label accent">Business goals</span>
                <ul>
                  <li>Lift checkout completion without discounting further</li>
                  <li>
                    Shift the plan mix toward 12 months and beyond, where the
                    unit economics work
                  </li>
                  <li>Break the dependence on coupon codes</li>
                  <li>
                    Take load off a support team answering the same plan
                    question all day
                  </li>
                </ul>
              </div>
              <div className="u">
                <span className="label gold">User goals</span>
                <ul>
                  <li>
                    See what&rsquo;s actually inside the subscription before
                    paying for it
                  </li>
                  <li>
                    Compare six durations without doing the arithmetic myself
                  </li>
                  <li>
                    Find a course in a {FACTS.courses} catalogue without knowing
                    its name
                  </li>
                  <li>
                    Know what I&rsquo;ve finished, what&rsquo;s left, and when
                    my plan runs out
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="plate">
              <span className="label">What I found in the audit</span>
              <p
                className="h3"
                style={{
                  marginTop: 10,
                  position: 'relative',
                  maxWidth: '24em',
                }}
              >
                Six plan cards, each shouting the same 80% discount, and nothing
                telling you which one to pick.{' '}
                <span className="hl">
                  The page was built for the sale, not for the decision.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── setup ends, the work begins ─── */}
      <div id="dark-start" aria-hidden="true" />
      <ActBreak />

      {/* ══════════════ 01 · NAVIGATION ══════════════ */}
      <section data-chapter="Navigation" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">01 — Navigation</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Two products</span> sharing a menu that
                served neither.
              </h2>
            </Reveal>
          </div>

          <div className="split">
            <Reveal>
              <ul className="bul">
                <li>
                  <strong>prepinsta.com</strong> is the free funnel, so its menu
                  leads with what you can start today — Prepare, Courses,
                  Projects, Skill Courses.
                </li>
                <li>
                  <strong>Prime</strong> is the paid one, so its menu leads with
                  the catalogue and what a subscription unlocks.
                </li>
                <li>
                  Off-campus routes straight into WhatsApp, Telegram and Discord
                  —{' '}
                  <span className="hl">
                    placement news in India travels through groups, not feeds
                  </span>
                  .
                </li>
                <li>
                  Both are assembled from the same components, so the two sites
                  never drift apart.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ledger">
                <div>
                  <b>2</b>
                  <span>Products</span>
                </div>
                <div>
                  <b>5</b>
                  <span>Mega menus</span>
                </div>
                <div>
                  <b>1</b>
                  <span>Component set</span>
                </div>
              </div>
            </Reveal>
          </div>

          <RevealMedia>
            <Clip id="v-nav" caption="Both navigations, live in production" />
          </RevealMedia>
        </div>
      </section>

      {/* ══════════════ 02 · SEARCH ══════════════ */}
      <section data-chapter="Search" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">02 — Search</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">An empty input</span> asks you to
                already know the catalogue.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                So the zero-query state does the work: popular searches with
                real course art, then eleven categories as a browse surface.
                Results carry what a student actually decides on — rating,
                modules, hours.
              </p>
            </Reveal>
          </div>

          <RevealMedia>
            <Shot id="search-context" caption="Search open, in page context" />
          </RevealMedia>

          <Well
            variant="well-2"
            caption="Zero query, results, and a category chip standing in for a query — the panel keeps its shape through all three"
          >
            <Shot id="search-open" w={362} caption="Zero query · browse" />
            <Shot
              id="search-results"
              w={362}
              caption="Results · rating, modules, hours"
            />
            <Shot id="search-cat" w={362} caption="Category selected" />
          </Well>
        </div>
      </section>

      {/* ══════════════ 03 · SYLLABUS ══════════════ */}
      <section data-chapter="Syllabus" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">03 — Syllabus</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">
                  A {FACTS.syllabusOld.toLocaleString('en-IN')}px scroll
                </span>{' '}
                with no way back to the top.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Restructured into named sections with a rail that sticks and
                tracks where you are. It also carries what the old page never
                showed — projects, tools, faculty, the certificate.{' '}
                <span className="hl">
                  It stays open to unpaid users, because the structure is what
                  they&rsquo;re buying.
                </span>
              </p>
            </Reveal>
          </div>

          <div className="ba">
            <Reveal>
              <div>
                <span className="ba-tag old">
                  Before · {FACTS.syllabusOld.toLocaleString('en-IN')}px
                </span>
                <Browser
                  id="syllabus-old"
                  url="Old course page"
                  scrollable
                  sizes="(max-width: 820px) 92vw, 531px"
                  caption="One scroll, no structure"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="ba-tag new">
                  After · {FACTS.syllabusNew.toLocaleString('en-IN')}px
                </span>
                <Browser
                  id="syllabus-web"
                  url="prepinsta.com/prime — Data Science"
                  scrollable
                  sizes="(max-width: 820px) 92vw, 531px"
                  caption="More content, shorter page"
                />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="stack-sm">
              <h3 className="h3">Two blocks that had to move to make sense</h3>
              <p className="body">
                &ldquo;Learn by doing&rdquo; converges six stacks into one
                build; the faculty block deals the mentors in. Both explain a
                benefit that reads as boilerplate when it sits still.
              </p>
            </div>
          </Reveal>
          <RevealMedia>
            <div className="rail">
              <Clip id="v-learn" w={420} caption="Learn by doing" />
              <Clip id="v-mentor" w={640} caption="Faculty" />
            </div>
          </RevealMedia>
        </div>
      </section>

      {/* ══════════════ 04 · PURCHASE ══════════════ */}
      <section data-chapter="Purchase" className="bloom gold">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label gold">04 — Purchase</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">Six durations,</span> one
                recommendation.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Every plan states its monthly cost — the only number that makes
                ₹8,498 for 48 months legible next to ₹4,499 for three. One
                &ldquo;Best Value&rdquo; marker does the recommending, the
                coupon applies once and{' '}
                <span className="hl">shows the saving happening</span>, and the
                total stays pinned under the ladder.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealMedia className="bleed">
          <Clip
            id="v-purchase"
            caption="Plan select → coupon applied → checkout"
          />
        </RevealMedia>
      </section>

      {/* ══════════════ 05 · PROFILE ══════════════ */}
      <section data-chapter="Profile" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">05 — Profile &amp; upgrade</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">An account form,</span> given three
                jobs.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Retention, upsell and support deflection — all on the page
                students already open to resume a course.
              </p>
            </Reveal>
          </div>

          <RevealMedia>
            <Browser
              id="profile-web"
              url="prepinsta.com/prime/profile"
              scrollable
              caption="Paid profile, end to end"
            />
          </RevealMedia>

          <Stagger className="g g3" step={0.06}>
            <div className="card">
              <span className="label accent">Retention</span>
              <p className="small" style={{ marginTop: 8 }}>
                <strong>Prime Momentum</strong> — courses started, questions
                solved, videos watched, average completion. Progress you can see
                is progress you protect.
              </p>
            </div>
            <div className="card">
              <span className="label accent">Support deflection</span>
              <p className="small" style={{ marginTop: 8 }}>
                <strong>&ldquo;When does my plan end?&rdquo;</strong> was the
                most common ticket. It&rsquo;s now a line above the fold, with
                days remaining spelled out.
              </p>
            </div>
            <div className="card">
              <span className="label accent">Upsell</span>
              <p className="small" style={{ marginTop: 8 }}>
                An upgrade ladder that names your current plan first — and a{' '}
                <strong>callback request</strong>, because at this price a
                hesitant buyer wants a human.
              </p>
            </div>
          </Stagger>

          <RevealMedia>
            <div className="rail">
              <Shot
                id="course-cards"
                w={264}
                caption="In progress · completed"
              />
              <Shot
                id="upgrade-open"
                w={340}
                caption="Upgrade · pick a duration"
              />
              <Shot id="cert-modal" w={296} caption="Claim certificate" />
              <Shot
                id="profile-edit"
                w={256}
                caption="Edit · login fields locked"
              />
              <Shot id="toast-call" w={320} caption="Callback · confirmed" />
            </div>
          </RevealMedia>
          <Reveal delay={0.1}>
            <p className="caption" style={{ marginTop: 0 }}>
              Course cards state what&rsquo;s left and unlock the certificate at
              100% · the ladder opens against the plan you already own ·
              claiming a certificate warns you before a name is locked for good
            </p>
          </Reveal>

          <div className="split">
            <Reveal>
              <div className="stack-sm">
                <h3 className="h3">Paid, unpaid, and nothing started yet</h3>
                <ul className="bul">
                  <li>
                    Unpaid users get the same momentum panel with a{' '}
                    <strong>Get Prime</strong> card where the expiry row sits —
                    the layout never changes shape.
                  </li>
                  <li>
                    The empty state routes to the catalogue instead of showing a
                    blank tab.
                  </li>
                  <li>
                    Editing is a sheet on mobile and a modal on desktop; phone
                    and email stay locked, since they&rsquo;re the login.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Well variant="well-2">
              <Device
                id="profile-m"
                w="min(206px, 60vw)"
                caption="Paid · expiry + upgrade"
                scrollable
              />
              <Device
                id="profile-m-unpaid"
                w="min(206px, 60vw)"
                caption="Unpaid · one Get Prime card"
                scrollable
              />
              <Device
                id="profile-m-empty"
                w="min(206px, 60vw)"
                caption="Empty · routes to catalogue"
                scrollable
              />
              <Device
                id="profile-m-avatar"
                w="min(206px, 60vw)"
                caption="Avatar picker"
              />
              <Device
                id="profile-m-upg"
                w="min(206px, 60vw)"
                caption="Upgrade sheet"
              />
            </Well>
          </div>
        </div>
      </section>

      {/* ══════════════ SYSTEM ══════════════ */}
      <section data-chapter="System" className="bloom">
        <div className="wrap stack-lg">
          <div className="sec-head">
            <Reveal>
              <span className="sec-label">The system underneath</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">One library,</span> two products, both
                themes.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede">
                Every colour on these pages is a variable, not a literal — which
                is what let a dark Prime and a light prepinsta.com ship off the
                same components, and what keeps the web and the mobile app
                looking like one product.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="ledger">
              <div>
                <b>{FACTS.variables}</b>
                <span>Variables</span>
              </div>
              <div>
                <b>{FACTS.collections}</b>
                <span>Collections</span>
              </div>
              <div>
                <b>{FACTS.pages}</b>
                <span>Pages redesigned</span>
              </div>
              <div>
                <b>{FACTS.states}+</b>
                <span>States &amp; overlays</span>
              </div>
              <div>
                <b>2</b>
                <span>Breakpoints, designed</span>
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
              <span className="sec-label">Impact</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2">
                <span className="muted">What moved</span> once the pages stopped
                arguing with the decision.
              </h2>
            </Reveal>
          </div>
          <div className="impact">
            {IMPACT.map((r, i) => (
              <Reveal key={r.k} delay={Math.min(i, 5) * 0.04}>
                <div className="impact-row">
                  <div>
                    <div className="k">{r.k}</div>
                    <p className="why">{r.why}</p>
                  </div>
                  <div className="v">{r.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
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
            <span className="label">PrepInsta · web platform</span>
            <div className="h3">Akshit Manik</div>
            <p className="small">{META.role}</p>
          </div>
          <div className="stack-sm" style={{ alignItems: 'flex-start' }}>
            <p
              className="small"
              style={{ maxWidth: '26em', color: 'var(--fg-3)' }}
            >
              Every screen here is the shipped design, exported from the file.
            </p>
            <CopyEmail />
          </div>
        </div>
      </footer>
    </main>
  );
}

/* The surfaces this project covers — doubled so the loop is seamless. */
function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((pass) =>
          SURFACES.map(([name, note]) => (
            <span className="marquee-item" key={`${pass}-${name}`}>
              <i /> <b>{name}</b> {note}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
