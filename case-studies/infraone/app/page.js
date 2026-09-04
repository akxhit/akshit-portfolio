import Image from 'next/image';
import CurvedCarousel from '@/components/CurvedCarousel';
import LandingWalkthrough from '@/components/LandingWalkthrough';
import PageMotion from '@/components/PageMotion';

const mediaRoot = '/case-studies/infraone/media';

export default function Home() {
  return (
    <main id="content">
      <a className="skip-link" href="#landing">
        Skip to case study
      </a>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow reveal">InfraOne AI Labs case study</p>
          <h1 className="reveal">A launchpad for learning AI by doing.</h1>
          <p className="hero-summary reveal">
            I designed the landing experience, brand identity and launch
            campaign for an AI education platform.
          </p>
        </div>
        <div className="hero-product reveal">
          <Image
            src={`${mediaRoot}/case-study-hero.webp`}
            alt="InfraOne AI Labs website shown on a laptop surrounded by product and security panels"
            width={1440}
            height={749}
            priority
            loading="eager"
            sizes="(max-width: 760px) calc(100vw - 32px), 1200px"
          />
        </div>
      </header>

      <section className="project-brief section" id="landing">
        <div className="section-heading reveal">
          <h2>The landing page came first.</h2>
          <p>
            InfraOne needed a clear way to explain configurable AI labs, earn
            trust quickly and move technical teams toward a demo.
          </p>
        </div>
        <dl className="brief-grid reveal">
          <div>
            <dt>Engagement</dt>
            <dd>Freelance design partnership</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>Brand and product designer</dd>
          </div>
          <div>
            <dt>Delivered</dt>
            <dd>Web, identity and campaign</dd>
          </div>
        </dl>
      </section>

      <LandingWalkthrough />

      <section className="identity section" id="identity">
        <div className="section-heading section-heading--narrow reveal">
          <p className="eyebrow">The identity</p>
          <h2>A spark inside the infrastructure.</h2>
          <p>
            The mark combines a modular container with a bright central spark,
            balancing technical structure with the energy of a new idea.
          </p>
        </div>
        <div className="brand-system reveal">
          <div className="brand-colors">
            <article className="swatch swatch--orange">
              <span>Infra orange</span>
              <strong>#FA5D00</strong>
            </article>
            <article className="swatch swatch--cream">
              <span>Cream canvas</span>
              <strong>#FFF8F1</strong>
            </article>
            <article className="swatch swatch--ink">
              <span>Warm ink</span>
              <strong>#1D1E1C</strong>
            </article>
          </div>
          <div className="brand-application">
            <Image
              src={`${mediaRoot}/logo-desktop.png`}
              alt="InfraOne brand mark used as a desktop app icon"
              width={1938}
              height={1251}
              sizes="(max-width: 760px) 92vw, 570px"
            />
          </div>
        </div>
      </section>

      <div id="dark-start" aria-hidden="true" />

      <section className="campaign-intro section" id="campaign">
        <div className="section-heading section-heading--center reveal">
          <p className="eyebrow">Marketing system</p>
          <h2>Built to stop a scroll, then start a career.</h2>
          <p>
            One recognizable system flexes across masterclasses, career
            narratives and product education without losing the InfraOne signal.
          </p>
        </div>
      </section>

      <CurvedCarousel />

      <PageMotion />
    </main>
  );
}
