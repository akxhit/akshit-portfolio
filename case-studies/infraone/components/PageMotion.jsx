'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const marker = document.getElementById('dark-start');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let themeFrame = 0;

    const syncTheme = () => {
      themeFrame = 0;
      const isDark =
        marker &&
        marker.getBoundingClientRect().bottom <= window.innerHeight * 0.62;
      root.classList.toggle('infraone-dark', Boolean(isDark));
    };

    const requestThemeSync = () => {
      if (!themeFrame) themeFrame = window.requestAnimationFrame(syncTheme);
    };

    window.addEventListener('scroll', requestThemeSync, { passive: true });
    window.addEventListener('resize', requestThemeSync);
    syncTheme();

    const ctx = reduceMotion
      ? null
      : gsap.context(() => {
          gsap.from('.hero-copy > *', {
            y: 34,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          });
          gsap.from('.hero-product', {
            y: 44,
            opacity: 0,
            scale: 0.985,
            duration: 1.1,
            delay: 0.2,
            ease: 'power3.out',
          });
          document
            .querySelectorAll('.reveal:not(.hero-copy *):not(.hero-product)')
            .forEach((element) => {
              gsap.from(element, {
                y: 46,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 84%',
                  once: true,
                },
              });
            });
        });

    // Shared portfolio UI mounts after this React tree has hydrated.
    window.__portfolioHydrated = true;
    window.dispatchEvent(new Event('portfolio:hydrated'));

    return () => {
      window.removeEventListener('scroll', requestThemeSync);
      window.removeEventListener('resize', requestThemeSync);
      if (themeFrame) window.cancelAnimationFrame(themeFrame);
      root.classList.remove('infraone-dark');
      ctx?.revert();
    };
  }, []);
  return null;
}
