'use client';

import { useEffect, useRef } from 'react';

/**
 * The wide hero reel.
 *
 * Drop an mp4 at public/media/hero-reel.mp4 and it plays here, muted and
 * looping, once it is on screen. Until that file exists the slot renders as a
 * labelled placeholder rather than a broken player, so the page never ships a
 * dead black rectangle.
 */
export default function HeroReel({ src = '/media/hero-reel.mp4', ok = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ok) return;
    const v = ref.current;
    if (!v) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const r = v.getBoundingClientRect();
      const on = r.bottom > 0 && r.top < window.innerHeight;
      if (on) v.play?.().catch(() => {});
      else v.pause?.();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    const beat = setInterval(read, 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearInterval(beat);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ok]);

  if (!ok) {
    return (
      <div className="hero-reel hero-reel-empty">
        <p className="label">Hero reel</p>
        <p className="small">
          Drop your app showcase video at{' '}
          <code>public/media/hero-reel.mp4</code> and it plays here
          automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="hero-reel">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="PrepInsta Prime app showcase"
      />
    </div>
  );
}
