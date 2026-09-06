'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

/**
 * Scroll behaviour for the whole page.
 *
 *  · Lenis  — momentum scrolling (wheel/trackpad only; touch keeps its own inertia)
 *  · GSAP   — the page-load sequence, which wants a real timeline
 *  · native — the light→dark handover
 *
 * The theme deliberately does NOT ride on ScrollTrigger or Lenis. Both are
 * driven by requestAnimationFrame, which browsers throttle hard whenever the
 * page isn't being painted — and a page stuck on the wrong palette is a much
 * worse failure than a slightly less buttery scroll. A passive scroll listener
 * fires either way.
 */
export default function Providers({ children }) {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const root = document.documentElement;

    /* ── momentum scroll ─────────────────────────────── */
    let lenis, removeTick;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        // the phone screens are nested scrollers; let them have their wheel back
        allowNestedScroll: true,
      });
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTick = () => gsap.ticker.remove(tick);
      // Lenis owns the scroll position, so anything that wants to move the page
      // has to go through it — window.scrollTo alone gets overridden next frame.
      window.__lenis = lenis;
    }

    /* ── light → dark handover ───────────────────────── */
    const marker = document.getElementById('dark-start');
    let frame = 0;
    const readTheme = () => {
      frame = 0;
      if (!marker) return;
      // dark once the marker has risen past 55% of the viewport
      const past =
        marker.getBoundingClientRect().top <= window.innerHeight * 0.55;
      root.classList.toggle('dark', past);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(readTheme);
    };
    // rAF may be throttled; a direct read on a timer keeps it honest
    const beat = setInterval(readTheme, 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', readTheme);
    readTheme();

    // The shared chrome inserts navigation/footer DOM outside React. Wait for
    // this page's hydration commit before allowing those document changes.
    window.__portfolioHydrated = true;
    window.dispatchEvent(new Event('portfolio:hydrated'));

    return () => {
      clearInterval(beat);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', readTheme);
      if (lenis) {
        removeTick();
        lenis.destroy();
      }
      root.classList.remove('dark');
    };
  }, []);

  return children;
}
