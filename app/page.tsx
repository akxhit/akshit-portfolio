'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Eye,
  Gavel,
  Grid2X2,
  LockKeyhole,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Rows3,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const asset = (name: string) => `/assets/${name}`;

const heroPhones = [
  'j864xfJhLyoLMroPcShLwBaS3wY.png',
  'uI1sqx6zAyBLmZBoZ28bATFnQk.png',
  'Cdub5uOpkIgoTEcTXQZ5w832dJE.png',
  'SPhMcn0DFUGxXVeR8KXhPlPN9Os.png',
  'jkalXtng6VALvpzOmMeLQnBMk.png',
];

const navItems = [
  ['context', 'Context'],
  ['problem', 'Problem'],
  ['research', 'Research'],
  ['solution', 'Solution'],
  ['bidding', 'Bidding'],
  ['impact', 'Impact'],
];

const process = [
  ['01', 'Car owner lists for sale', 'Owners list their cars through Cars24.'],
  ['02', 'Quote & appointment', 'Cars are quoted and scheduled for inspection.'],
  ['03', 'Inspection', 'Experts inspect the vehicle and upload details.'],
  ['04', 'Dealer notification', 'Dealers are notified as the auction begins.'],
  ['05', 'Live bidding', 'Dealers compete and the highest bidder wins.'],
  ['06', 'Completion', 'The sale closes and Cars24 takes commission.'],
];

const insights = [
  'Buggy app',
  'Low procurement success',
  'High transport fees',
  'Lack of transparency',
  'Hidden issues',
  'Delayed support',
  'Unreliable inspection reports',
  'Limited negotiation options',
  'No live-auction feeling',
];

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ImpactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="impact-card" data-reveal>
      <span className="impact-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function AuctionPlayground() {
  const [expanded, setExpanded] = useState(true);
  const [bid, setBid] = useState(705000);
  const [autoBid, setAutoBid] = useState(false);
  const [seconds, setSeconds] = useState(130);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => (value > 0 ? value - 1 : 130));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(
    () => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`,
    [seconds],
  );

  const placeBid = () => {
    setBid((value) => value + 5000);
    setWon(true);
    window.setTimeout(() => setWon(false), 2600);
  };

  return (
    <div className="playground" data-reveal>
      <div className="playground-toolbar">
        <div>
          <span className="live-dot" />
          Interactive auction preview
        </div>
        <div className="view-switch" aria-label="Choose auction card view">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Compact view"
            aria-pressed={!expanded}
            className={!expanded ? 'active' : ''}
            onClick={() => setExpanded(false)}
          >
            <Rows3 />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Expanded view"
            aria-pressed={expanded}
            className={expanded ? 'active' : ''}
            onClick={() => setExpanded(true)}
          >
            <Grid2X2 />
          </Button>
        </div>
      </div>

      <div className={`auction-card ${expanded ? 'expanded' : 'compact'}`}>
        <div className="auction-image">
          <img src={asset('Cdub5uOpkIgoTEcTXQZ5w832dJE.png')} alt="White Mercedes-Benz auction listing" />
          <span className="rating">4.5 ★</span>
          <span className="interest"><Eye /> 324</span>
        </div>
        <div className="auction-details">
          <div className="auction-state">
            <span>Almost over</span>
            <strong>{time}</strong>
          </div>
          <h3>2022 Mercedes-Benz</h3>
          <p className="model">GLE 300d · Delhi</p>
          <p className="specs">92,000 km · 1st Owner · Diesel · Automatic</p>
          <div className="price-row">
            <span>Fair value <b>₹8,01,000</b></span>
            <span>Current bid <b>₹{bid.toLocaleString('en-IN')}</b></span>
          </div>
          <div className="bid-actions">
            <Button
              variant="outline"
              className={autoBid ? 'auto-on' : ''}
              onClick={() => setAutoBid((value) => !value)}
            >
              <Zap /> {autoBid ? 'Auto bid on' : 'Auto bid'}
            </Button>
            <Button className="primary-bid" onClick={placeBid}>
              <Gavel /> Bid +₹5,000
            </Button>
          </div>
        </div>
      </div>

      <div className={`bid-toast ${won ? 'show' : ''}`} role="status">
        <Check /> You’re leading this auction
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );
    const nodes = document.querySelectorAll('[data-reveal]');
    nodes.forEach((node) => reveal.observe(node));

    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? window.scrollY / available : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      reveal.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <aside className={`case-nav ${menuOpen ? 'open' : ''}`}>
        <Button
          size="icon-lg"
          variant="ghost"
          className="nav-trigger"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Close case study navigation' : 'Open case study navigation'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        <nav aria-label="Case study sections">
          {navItems.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <img className="project-mark" src={asset('zBXGzsaRn12Md53w1o69V9P6GWQ.png')} alt="Whyakshit and Cars24" />
            <h1 id="hero-title">Redesigning a Car Auction App Experience</h1>
            <p>This case study highlights how I redesigned a car auction platform to improve trust and transparency for dealers.</p>
          </div>

          <div className="phone-stage" aria-label="Cars24 auction app screen showcase">
            {heroPhones.map((phone, index) => (
              <figure className={`phone-card phone-${index + 1}`} key={phone} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                <img src={asset(phone)} alt="Cars24 dealer app screen" />
              </figure>
            ))}
            <div className="stage-fade" />
          </div>
          <a className="scroll-cue" href="#context"><ArrowDown /> Scroll to explore</a>
        </section>

        <section id="context" className="section section-context">
          <SectionHeading
            eyebrow="01 — Setting the scene"
            title="Context"
            text="I was part of 10K Designers, a product design cohort. This capstone collaboration with Cars24 gave me a real-life auction challenge and a hard two-week deadline."
          />
          <div className="context-grid">
            <div className="about-card" data-reveal>
              <span className="pill">About Cars24</span>
              <h3>A B2B partner app for car dealers.</h3>
              <p>Verified inventory, bidding tools, financing, logistics and procurement support—built for registered dealers across India.</p>
              <div className="audience"><Target /><span><b>Primary audience</b>Pan-India registered car dealers</span></div>
            </div>
            <div className="market-card" data-reveal>
              <div className="market-stat"><strong>$26.85B</strong><span>Indian used-car market in 2023</span></div>
              <div className="market-stat"><strong>15.1%</strong><span>Projected CAGR through 2029</span></div>
              <div className="market-stat"><strong>286</strong><span>Cities in the Cars24 network</span></div>
              <div className="market-stat"><strong>20–30%</strong><span>Potential saving in bank auctions</span></div>
            </div>
          </div>
          <div className="wide-artifact dark-artifact" data-reveal>
            <img src={asset('xoF7BhPyMOzHsDavaOavnNmF0.png')} alt="Cars24 market opportunity visualization" />
          </div>
        </section>

        <section id="problem" className="section section-problem">
          <SectionHeading eyebrow="02 — The problem" title="Auctions felt opaque, lonely and flat." />
          <div className="problem-intro" data-reveal>
            <p>Current car auction apps in India leave dealers uncertain. Inaccurate details, hidden damage and cumbersome bidding make trust difficult—especially for new users.</p>
            <span className="problem-label">How might we create an auction that feels transparent, instructive and genuinely alive?</span>
          </div>

          <Accordion className="problem-accordion" defaultValue={['user-problems']}>
            <AccordionItem value="user-problems">
              <AccordionTrigger>User problems <span>04</span></AccordionTrigger>
              <AccordionContent>
                <div className="issue-grid">
                  <p>Inspection reports are difficult to analyze.</p>
                  <p>First-time bidders lack clear guidance.</p>
                  <p>Dealers cannot tell who is driving a price increase.</p>
                  <p>The platform misses the thrill of a live auction.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="business-problems">
              <AccordionTrigger>Business problems <span>02</span></AccordionTrigger>
              <AccordionContent>
                <div className="issue-grid two">
                  <p><b>Lower auction success:</b> unclear processes suppress bidding confidence and auction value.</p>
                  <p><b>Retention pressure:</b> new dealers feel overwhelmed and drop off early.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="image-triptych">
            <figure data-reveal><img src={asset('c3aNCvne0Hzzvcb3qK0TkTyOwI.png')} alt="Live used-car auction" /><figcaption>Offline auction energy</figcaption></figure>
            <figure data-reveal><img src={asset('HK7hci7LZfuOYUIXkZmQTappAO4.png')} alt="Rows of used cars" /><figcaption>Massive inventory</figcaption></figure>
            <figure data-reveal><img src={asset('GTcVE2P83vmD0PmFABGi6Fkdh8.png')} alt="Used-car auction research" /><figcaption>Digital friction</figcaption></figure>
          </div>
        </section>

        <section className="section process-section">
          <SectionHeading
            eyebrow="03 — Auction 101"
            title="Understanding how the system works"
            text="My only auction reference was Majnu Bhai’s scene in Welcome. So I started with videos, articles and conversations to understand both online and offline auctions."
          />
          <div className="process-line" data-reveal>
            {process.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="constraints">
            <article data-reveal><b>02 weeks</b><p>Deadline set by the Cars24 team.</p></article>
            <article data-reveal><b>Limited data</b><p>Assumptions were required beyond the scenario.</p></article>
            <article data-reveal><b>₹10,000 access</b><p>The partner app required a dealer investment.</p></article>
          </div>
        </section>

        <section className="section persona-section">
          <SectionHeading eyebrow="04 — People, not bidders" title="Two mindsets. One high-stakes decision." />
          <div className="persona-grid">
            <article className="persona experienced" data-reveal>
              <img src={asset('2xRoDtyBjOigYMiJ14rNXZWftU.png')} alt="" />
              <span>Experienced dealer</span>
              <h3>Mukesh</h3>
              <blockquote>“How can I maximise profit without overpaying?”</blockquote>
              <ul>
                <li>Needs quick access to reliable cars.</li>
                <li>Wants transparent inspection and bidding data.</li>
                <li>Optimizes speed and margin.</li>
              </ul>
            </article>
            <article className="persona newbie" data-reveal>
              <img src={asset('N8YijAIxtz9Spnv5j4yjAu8k4.png')} alt="" />
              <span>New dealer</span>
              <h3>Rakesh</h3>
              <blockquote>“How do I know the car is worth it?”</blockquote>
              <ul>
                <li>Needs reassurance before a first bid.</li>
                <li>Worries about scams and hidden damage.</li>
                <li>Needs guidance to compete confidently.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="research" className="section research-section">
          <SectionHeading
            eyebrow="05 — Dealer research"
            title="Understanding the dealer’s perspective"
            text="Dealers can compete for cars in just 24 minutes and pay ₹10,000 membership fees. I needed to experience that world through someone already in it."
          />
          <div className="interview-card" data-reveal>
            <div className="interview-copy">
              <span className="pill">Interview</span>
              <h3>Vaibhav Sharma</h3>
              <p className="role">Cars24 dealer since 2022</p>
              <p>A veteran dealer seeking quality inventory at the right price—frustrated by limited transparency and support.</p>
              <blockquote>“The report should help me decide, not make me search for what’s missing.”</blockquote>
            </div>
            <div className="interview-visual">
              <img src={asset('pZYQoO4vw8SbOgOgAhSSRQnGmI.png')} alt="Portrait of the interviewed dealer" />
            </div>
          </div>

          <div className="insight-cloud" data-reveal>
            {insights.map((insight, index) => (
              <span key={insight} style={{ '--i': index } as React.CSSProperties}>{insight}</span>
            ))}
          </div>

          <div className="research-gallery">
            {['AXSXB8Lc8fdxXMr3ymCS4DgEPk8.jpg','un9No8nYmPcrhQwE9fK0chOZE.jpg','jgLTVH6Fzcj9aM46bRshSGcKQk.jpg'].map((image) => (
              <figure key={image} data-reveal><img src={asset(image)} alt="Dealer research material" /></figure>
            ))}
          </div>
        </section>

        <section className="section benchmark-section">
          <SectionHeading
            eyebrow="06 — Competitive benchmark"
            title="Scale and polish weren’t enough."
            text="Cars24 focused on scale. Spinny focused on a curated experience. Both missed a human, energetic auction experience built on trust."
          />
          <div className="benchmark-grid">
            <ImpactCard icon={<Eye />} title="Transparency" text="Critical details and a visible bid log make decisions explainable." />
            <ImpactCard icon={<MousePointer2 />} title="Simplicity" text="Progressive detail keeps the experience useful for both novice and power users." />
            <ImpactCard icon={<Sparkles />} title="Enthusiasm" text="Live states, countdowns and feedback restore the emotion of an auction." />
          </div>
        </section>

        <section id="solution" className="section solution-section">
          <SectionHeading
            eyebrow="07 — The redesigned home"
            title="One place to orient, learn and act."
            text="A dedicated home screen centralizes auction activity and resolves first-fold doubts with personalized recommendations, upcoming events and guided education."
          />
          <div className="home-showcase" data-reveal>
            <img className="showcase-board" src={asset('ltijbRzjzNHEbCNcjbOtr6HpObg.png')} alt="Cars24 redesigned home screen feature map" />
            <div className="floating-phone one"><img src={asset('kDxuKkgyOiGrzDHpkEqKAKVvxIE.png')} alt="Cars24 redesigned home screen" /></div>
            <div className="floating-phone two"><img src={asset('1oT3EYi72xBw6NU8oP2OKFIbg.png')} alt="Cars24 auction education screen" /></div>
          </div>
          <div className="impact-grid">
            <ImpactCard icon={<Zap />} title="Quick info access" text="Auctions, bids and statuses are visible immediately." />
            <ImpactCard icon={<Target />} title="Personalization" text="Recommendations adapt to dealer preferences." />
            <ImpactCard icon={<LockKeyhole />} title="Confidence" text="Critical detail and education reduce uncertainty." />
          </div>
        </section>

        <section className="section listing-section">
          <SectionHeading
            eyebrow="08 — Live car listings"
            title="One list, two useful levels of detail."
            text="Compact View accelerates scanning. Expanded View supports deeper evaluation. Dealers can switch without losing context."
          />
          <AuctionPlayground />
          <div className="comparison-board" data-reveal>
            <img src={asset('Tf1saSwK53R0XcuRo7E9O1q2hM8.png')} alt="Existing and redesigned Cars24 auction listing comparison" />
          </div>
          <div className="card-anatomy" data-reveal>
            <img src={asset('MzJ8wCWYcOPtrWGiqfgYmggnVw.png')} alt="Compact and expanded auction card anatomy" />
          </div>
        </section>

        <section className="section states-section">
          <SectionHeading
            eyebrow="09 — State design"
            title="The right amount of urgency"
            text="Auction cards change language, color and emphasis as a listing moves from upcoming to ongoing to almost over."
          />
          <div className="state-cards">
            {[
              ['Yet to start', '12:02:10', 'calm'],
              ['Ongoing', '00:18:42', 'live'],
              ['Almost over', '00:02:10', 'urgent'],
            ].map(([label, time, state]) => (
              <article className={`state-card ${state}`} key={label} data-reveal>
                <div className="state-top"><span>{label}</span><b>{time}</b></div>
                <div className="mini-car"><img src={asset('Cdub5uOpkIgoTEcTXQZ5w832dJE.png')} alt="" /></div>
                <h3>2022 Mercedes-Benz GLE 300d</h3>
                <div className="state-prices"><span>Fair value ₹8,01,000</span><b>Current bid ₹7,05,000</b></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section car-info-section">
          <SectionHeading
            eyebrow="10 — Vehicle confidence"
            title="Car information that earns trust."
            text="The redesigned detail view combines a vehicle overview, visual inspection report and a transparent bid log."
          />
          <Tabs defaultValue="overview" className="info-tabs" data-reveal>
            <TabsList className="info-tab-list">
              <TabsTrigger value="overview">Car info</TabsTrigger>
              <TabsTrigger value="inspection">Inspection report</TabsTrigger>
              <TabsTrigger value="log">Bid log</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="info-panel">
              <div><span>Vehicle location</span><b>Delhi</b></div>
              <div><span>Registration year</span><b>Jan 2023</b></div>
              <div><span>Insurance</span><b>Comprehensive</b></div>
              <div><span>Fuel type</span><b>Petrol</b></div>
              <div><span>Odometer</span><b>3,000 km</b></div>
              <div><span>Ownership</span><b>1st owner</b></div>
            </TabsContent>
            <TabsContent value="inspection" className="inspection-panel">
              <div className="quality-score"><strong>92</strong><span>Quality inspection score</span></div>
              <ul>
                <li><b>Imperfections</b><span>Small dent on rear passenger door</span></li>
                <li><b>Repaired parts</b><span>Headlights replaced May 2023</span></li>
                <li><b>Repainted parts</b><span>Rear passenger door</span></li>
              </ul>
            </TabsContent>
            <TabsContent value="log" className="bid-log">
              {[
                ['05', 'Parth (You)', '₹6,75,875', 'AUTOBID'],
                ['04', 'User23**', '₹6,70,875', '+5%'],
                ['03', 'User214**', '₹6,55,875', '+5%'],
              ].map((row) => <div key={row[0]}><span>{row[0]}</span><b>{row[1]}</b><em>{row[3]}</em><strong>{row[2]}</strong></div>)}
            </TabsContent>
          </Tabs>
          <div className="car-info-screens" data-reveal>
            <img src={asset('8PsMkjp9aonGYCFnQUdKBlFcTc.png')} alt="Existing car information screen" />
            <img src={asset('hbZBmddbl6G3G3pV9Lwjvm5M90.png')} alt="Redesigned vehicle inspection screen" />
            <img src={asset('RvkqE4U8RN0V7iQRVbWsPJOpoVY.png')} alt="Redesigned vehicle bid log" />
          </div>
        </section>

        <section id="bidding" className="section bidding-section">
          <SectionHeading
            eyebrow="11 — Auto bid"
            title="Stay competitive without staying glued."
            text="Dealers can set a private maximum. Auto Bid increases only when necessary, protects the limit and reports status in real time."
          />
          <div className="flow-artifact" data-reveal>
            <img src={asset('0WfhmczahgsiGBvBPi60fEv41is.png')} alt="Cars24 auto bid interaction flow" />
          </div>
          <div className="flow-steps">
            {[
              ['Primary entry', 'Choose Auto Bid from any live car.'],
              ['Set maximum', 'The limit stays private and editable.'],
              ['Live response', 'Bid status and logs update in real time.'],
              ['Secure purchase', 'A winning state leads directly to procurement.'],
            ].map(([title, text], index) => (
              <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="phone-flow" data-reveal>
            {['MbbQUK9kx88Nbq1nignsOMEisc.png','11YL3m0pEMqugFoYskECR28Wj64.png','YZrFLnPgXdmCKSRh27Nc5diCZkA.png','v4CeGcbJy5UPAPvvYMENCmN331o.png'].map((image) => (
              <img key={image} src={asset(image)} alt="Auto bid app flow screen" />
            ))}
          </div>
        </section>

        <section className="section manual-section">
          <SectionHeading
            eyebrow="12 — Manual bid"
            title="Hands-on when it matters."
            text="Manual bidders still get clear increments, immediate lead status and a transparent log—without being pushed into automation."
          />
          <div className="manual-grid">
            <div className="manual-phone" data-reveal><img src={asset('gvRFxD1BD4WwFMxqCuCwcaM514.png')} alt="Manual bid flow screen" /></div>
            <div className="manual-copy">
              <ImpactCard icon={<Gavel />} title="Bid manually" text="Choose a clear step-up amount and confirm instantly." />
              <ImpactCard icon={<Eye />} title="Watch the room" text="Live bid logs reveal movement without exposing identities." />
              <ImpactCard icon={<Check />} title="Procure confidently" text="A clear win state carries the dealer into purchase." />
            </div>
          </div>
        </section>

        <section className="section multi-bid-section">
          <SectionHeading
            eyebrow="13 — Bid portfolio"
            title="Manage more than one auction with ease."
            text="All active bids live in one expandable surface with lead indicators, real-time countdowns and quick status checks."
          />
          <div className="multi-bid-visual" data-reveal>
            <div className="bid-view collapsed-view">
              <span>Collapsed view</span>
              <img src={asset('26GoDSU36YLHGiYogQSVfUGbXg.png')} alt="Collapsed active bids view" />
            </div>
            <div className="bid-view expanded-view">
              <span>Expanded view</span>
              <img src={asset('VC8GlWsnHSwOIPWb1BKV8WjA6P0.png')} alt="Expanded active bids view" />
            </div>
          </div>
          <div className="ticker" aria-label="Multi-bid benefits">
            <div>
              <span>All active bids in one view</span><span>Clear leading indicators</span><span>Live countdown timers</span><span>Faster status checks</span>
              <span>All active bids in one view</span><span>Clear leading indicators</span><span>Live countdown timers</span><span>Faster status checks</span>
            </div>
          </div>
        </section>

        <section id="impact" className="section impact-section">
          <SectionHeading eyebrow="14 — Overall impact" title="More confidence. More participation. Better auctions." />
          <div className="impact-grid final-impact">
            <ImpactCard icon={<LockKeyhole />} title="Trust" text="Clear vehicle, inspection and bid data helps dealers act with confidence." />
            <ImpactCard icon={<Zap />} title="Participation" text="Two bidding modes and live feedback keep more dealers engaged." />
            <ImpactCard icon={<ArrowUp />} title="Auction value" text="Confident competition supports stronger final bids and higher completion." />
          </div>
          <div className="closing-note" data-reveal>
            <span>Signing out</span>
            <h2>Thank you for taking the time to read.</h2>
            <p>This project shifted my process from jumping to solutions toward understanding the product, the industry and the people first. That change made the final experience more thoughtful, transparent and useful.</p>
          </div>
          <a className="next-project" href="https://intuitive-arrow-470618.framer.app/capgo.ai" target="_blank" rel="noreferrer">
            <div><span>Next project</span><h3>Capgo.ai</h3><p>Landing page project</p></div>
            <ArrowUpRight />
          </a>
        </section>
      </main>
    </>
  );
}
