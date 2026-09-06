import Image from 'next/image';
import GooglePlayIcon from '@/components/GooglePlayIcon';
import { ArrowUpRight } from 'lucide-react';
import HeroField from '@/components/HeroField';
import HeroShowcase from '@/components/HeroShowcase';
import AdminShowcase from '@/components/AdminShowcase';
import ScreenGallery from '@/components/ScreenGallery';
import CopyEmail from '@/components/CopyEmail';
import { MaskReveal, Nav, Reveal, RevealMedia } from '@/components/Bits';
import { M } from '@/lib/media';

export default function Page() {
  return (
    <main className="case-v2">
      <Nav />

      <header className="v2-hero">
        <HeroField />
        <div className="v2-wrap v2-hero-grid">
          <div className="v2-hero-copy">
            <span className="v2-kicker">ZELTGOLD · 0→1 product design</span>
            <h1 className="v2-display">
              <MaskReveal delay={0.05}>Designed at</MaskReveal>
              <MaskReveal delay={0.14}>
                <em>sprint speed.</em>
              </MaskReveal>
              <MaskReveal delay={0.23}>Built for real money.</MaskReveal>
            </h1>
            <Reveal delay={0.34}>
              <p className="v2-intro">
                In one month, my design partner and I turned a client
                conversation into a customer app, two operational portals and
                two live websites.
              </p>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="v2-hero-actions">
                <a
                  className="v2-play-cta"
                  href="https://play.google.com/store/apps/details?id=com.zeltt&hl=en_IN"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GooglePlayIcon />
                  <span>
                    <small>Available on</small>Google Play
                  </span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.42}>
              <div className="v2-facts" aria-label="Project facts">
                <span>
                  <b>1</b> month
                </span>
                <span>
                  <b>2</b> designers
                </span>
                <span>
                  <b>5</b> connected surfaces
                </span>
              </div>
            </Reveal>
          </div>

          <RevealMedia className="v2-hero-media">
            <HeroShowcase />
          </RevealMedia>
        </div>
      </header>

      <section
        id="process"
        data-chapter="Process"
        className="v2-section v2-process"
      >
        <div className="v2-wrap">
          <div className="v2-section-head v2-section-head-split">
            <Reveal>
              <span className="v2-index">01 / HOW WE MOVED</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="v2-title">
                AI accelerated the work.
                <br />
                <em>We directed the product.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal>
            <div className="v2-process-rail">
              <ProcessStep number="01" title="Listen" note="Client workshops" />
              <ProcessStep
                number="02"
                title="Frame"
                note="Claude-assisted PRD"
              />
              <ProcessStep
                number="03"
                title="Make"
                note="GPT + Claude iteration"
              />
              <ProcessStep
                number="04"
                title="Ship"
                note="Five connected surfaces"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="v2-ai-band">
              <div className="v2-ai-title">
                <span>AI workbench</span>
                <strong>
                  Claude <em>×</em> GPT
                </strong>
              </div>
              <div className="v2-ai-tasks">
                <span>PRD synthesis</span>
                <span>Competitive analysis</span>
                <span>UX copy + edge states</span>
                <span>Prototype implementation</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="ecosystem"
        data-chapter="Live work"
        className="v2-section v2-ecosystem"
      >
        <div className="v2-wrap">
          <div className="v2-section-head">
            <Reveal>
              <span className="v2-index">02 / LIVE WORK</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="v2-title">
                The product did not
                <br />
                <em>end at the app.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="v2-short-copy">
                Two live websites connected the new platform to the jeweller
                customers already trusted.
              </p>
            </Reveal>
          </div>

          <div className="v2-sites">
            <LiveProject
              asset="zeltgold-live"
              eyebrow="Product platform"
              title="ZELTGOLD"
              href="https://www.zeltgold.com/"
              description="Discover trusted jewellers, join savings plans and track every contribution—from ₹100."
              proof="Jewellery planning platform"
            />
            <LiveProject
              asset="vinayaka-live"
              eyebrow="Launch partner"
              title="Vinayaka Jewellers"
              href="https://vinayakajewellers.in/"
              description="A Chikkamagaluru jeweller bringing three decades of retail trust into digital gold saving."
              proof="Founded 1992 · BIS hallmarked"
            />
          </div>
        </div>
      </section>

      <section
        id="screens"
        data-chapter="Key screens"
        className="v2-section v2-cinema"
      >
        <div className="v2-wrap">
          <div className="v2-section-head v2-section-head-split">
            <Reveal>
              <span className="v2-index">03 / THE PRODUCT</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="v2-title">
                Screens that make saving
                <br />
                <em>feel tangible.</em>
              </h2>
            </Reveal>
          </div>
        </div>
        <ScreenGallery />
        <div className="v2-wrap v2-screen-footer">
          <a
            href="https://play.google.com/store/apps/details?id=com.zeltt&hl=en_IN"
            target="_blank"
            rel="noreferrer"
          >
            See the live app on Google Play <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section
        id="operations"
        data-chapter="Operations"
        className="v2-section v2-operations"
      >
        <div className="v2-wrap">
          <div className="v2-section-head v2-section-head-split">
            <Reveal>
              <span className="v2-index">04 / BEHIND THE APP</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="v2-title">
                The customer sees savings.
                <br />
                <em>The business sees the system.</em>
              </h2>
            </Reveal>
          </div>
          <RevealMedia>
            <AdminShowcase />
          </RevealMedia>
          <Reveal>
            <div
              className="v2-delivery-metrics"
              aria-label="Project delivery metrics"
            >
              <p>
                <strong>1 month</strong>
                <span>end-to-end delivery</span>
              </p>
              <p>
                <strong>5 surfaces</strong>
                <span>one product ecosystem</span>
              </p>
              <p>
                <strong>2 roles</strong>
                <span>platform admin + jeweller</span>
              </p>
              <p>
                <strong>4 workstreams</strong>
                <span>accelerated with AI</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="reflection"
        data-chapter="Reflection"
        className="v2-section v2-reflection"
      >
        <div className="v2-wrap v2-reflection-grid">
          <Reveal>
            <div>
              <span className="v2-index">05 / LOOKING BACK</span>
              <h2 className="v2-title">
                One month taught me
                <br />
                <em>where clarity matters.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="v2-next-list">
              <p>
                <span>01</span> Simplify plan language.
              </p>
              <p>
                <span>02</span> Put returning-user progress first.
              </p>
              <p>
                <span>03</span> Add stronger checks for high-value plans.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="v2-footer">
        <div className="v2-wrap v2-footer-grid">
          <div>
            <span className="v2-index">ZELTGOLD · PRODUCT DESIGN</span>
            <p>Akshit Manik</p>
          </div>
          <CopyEmail />
        </div>
      </footer>
    </main>
  );
}

function ProcessStep({ number, title, note }) {
  return (
    <article className="v2-process-step">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{note}</p>
    </article>
  );
}

function LiveProject({ asset, eyebrow, title, href, description, proof }) {
  const image = M[asset];
  return (
    <Reveal className="v2-live-project">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title} live website`}
      >
        <div className="v2-browser-frame">
          <div className="v2-browser-bar">
            <i />
            <i />
            <i />
            <span>{new URL(href).hostname}</span>
          </div>
          <Image
            src={image.src}
            alt={`${title} live website`}
            width={image.w}
            height={image.h}
            sizes="(max-width: 820px) 94vw, 50vw"
          />
        </div>
        <div className="v2-project-meta">
          <div>
            <span>{eyebrow}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <b>{proof}</b>
          </div>
          <span className="v2-open-link">
            View live <ArrowUpRight size={18} />
          </span>
        </div>
      </a>
    </Reveal>
  );
}
