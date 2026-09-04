'use client';

import { useEffect, useRef, useState } from 'react';
import { EmeraldHorizonBackground } from '@designcodeio/threeui/components/EmeraldHorizonBackground';

/**
 * The hinge between the two acts.
 *
 * Everything above is the setup and runs light; everything below is the product
 * work and runs dark. That switch used to happen silently mid-scroll, which read
 * as a rendering glitch rather than a decision — this band gives it a moment to
 * land on, and its emerald is the same green the product is built from.
 *
 * The shader only mounts once the band is near the viewport: it is a full-screen
 * fragment shader, and there is no reason to run one at the top of the page.
 */
export default function ActBreak() {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el) return;

    // A rect check on a passive scroll listener rather than an
    // IntersectionObserver: IO is driven by the same pipeline the browser
    // throttles when the page isn't painting, and a band that never mounts its
    // shader is worse than one that mounts a frame early.
    let frame = 0;
    const read = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      setLive(r.top < window.innerHeight * 2 && r.bottom > -window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    const beat = setInterval(read, 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      clearInterval(beat);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', read);
    };
  }, []);

  return (
    <div className="act-break" ref={ref}>
      {live && !still && (
        <EmeraldHorizonBackground
          className="act-break-shader"
          speed={0.45}
          waveScale={1.15}
          glow={0.8}
          vignette={1.25}
        />
      )}
      <div className="wrap act-break-copy">
        <p className="h3">
          That was the brief.
          <span className="muted"> Below is what I designed against it.</span>
        </p>
      </div>
    </div>
  );
}
