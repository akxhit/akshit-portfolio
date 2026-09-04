'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const mediaRoot = '/case-studies/infraone/media';

export default function LandingWalkthrough() {
  const root = useRef(null);
  const viewport = useRef(null);
  const page = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 900
    )
      return;
    const ctx = gsap.context(() => {
      gsap.to(page.current, {
        y: () => -(page.current.offsetHeight - viewport.current.offsetHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=4200',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="landing-walkthrough"
      ref={root}
      aria-label="Full InfraOne landing page walkthrough"
    >
      <div className="walkthrough-heading">
        <p className="eyebrow">Desktop experience</p>
        <h2>From the first promise to the final proof.</h2>
        <p>
          The page leads with the outcome, explains the four-step setup and
          earns confidence before asking for a conversation.
        </p>
      </div>
      <div className="browser-mockup browser-mockup--walkthrough">
        <div className="browser-top" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-address">infraone.ai</span>
        </div>
        <div className="browser-screen" ref={viewport}>
          <Image
            ref={page}
            src={`${mediaRoot}/site-desktop-hq.webp`}
            alt="Complete InfraOne desktop landing page"
            width={2000}
            height={15799}
            sizes="(max-width: 899px) 94vw, 760px"
          />
        </div>
      </div>
    </section>
  );
}
