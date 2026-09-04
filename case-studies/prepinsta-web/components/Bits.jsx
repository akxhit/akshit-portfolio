'use client';

import { useEffect, useRef, useState, Children } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { M } from '@/lib/media';

const VIDEO_VERSION = 'hq1';
const videoUrl = (src) => `${src}?v=${VIDEO_VERSION}`;
const posterUrl = (src) =>
  `${src.replace(/\.mp4$/, '.poster.webp')}?v=${VIDEO_VERSION}`;

/* ───────────────────────────── reveal ───────────────────────────── */

/**
 * The supporting entrance. Deliberately quiet — the hero owns the one authored
 * moment on this page, and a section that announces itself as loudly as the
 * hero flattens both.
 */
export function Reveal({ children, delay = 0, y = 14, className, as = 'div' }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/**
 * A frame row arriving. Media gets its own gesture — it settles into focus
 * rather than sliding, which reads as the screens coming to rest.
 */
export function RevealMedia({ children, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.985, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The hero headline, wiped in a line at a time behind a moving mask. This is
 * the page's authored moment; nothing else uses it.
 */
export function MaskReveal({ children, delay = 0, className }) {
  return (
    <span className={`mask-line ${className || ''}`}>
      <motion.span
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Staggers whatever you hand it, one child at a time. */
export function Stagger({ children, className, step = 0.075, y = 26 }) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal delay={i * step} y={y}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/* ──────────────────────────── counter ───────────────────────────── */

export function Counter({ to, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const [text, setText] = useState(
    () => prefix + (0).toFixed(decimals) + suffix,
  );

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(
        prefix +
          to.toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix,
      );
      return;
    }
    let raf,
      t0 = null;
    const step = (ts) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / 1400, 1);
      const v = to * (1 - Math.pow(1 - p, 3));
      setText(
        prefix +
          v.toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix,
      );
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals, prefix, suffix]);

  return (
    <span ref={ref} className="num">
      {text}
    </span>
  );
}

/* ──────────────────────────── device ────────────────────────────── */

/**
 * A phone. `scrollable` turns the screen into a window the reader scrolls
 * themselves — used for the long full-page captures.
 */
export function Device({
  id,
  w = 230,
  caption,
  scrollable = false,
  priority = false,
  notch = true,
  bar = false, // pin the app's own bottom bar over the frame
  sizes = '(max-width: 760px) 62vw, 300px',
}) {
  const a = M[id];
  const b = bar ? M[`bar-${id}`] : null;
  if (!a) return null;
  return (
    <figure
      className="dev"
      style={{ '--w': typeof w === 'number' ? `${w}px` : w }}
    >
      <div className="dev-body">
        <div className={`dev-screen${scrollable ? ' scrollable' : ''}`}>
          {notch && <span className="dev-notch" />}
          {scrollable ? (
            /* data-lenis-prevent hands wheel events back to the browser here —
               without it Lenis eats them and the screen never scrolls. */
            <div className="sw" data-lenis-prevent>
              <Image
                src={a.src}
                alt={caption || id}
                width={a.w}
                height={a.h}
                sizes={sizes}
                quality={90}
                priority={priority}
              />
            </div>
          ) : (
            <Image
              src={a.src}
              alt={caption || id}
              width={a.w}
              height={a.h}
              sizes={sizes}
              quality={90}
              priority={priority}
            />
          )}
          {b && (
            /* The bar is lifted out of the capture and pinned here, so it stays
               put while the screen scrolls behind it — as it does in the app. */
            <span className="dev-bar" aria-hidden="true">
              <Image
                src={b.src}
                alt=""
                width={b.w}
                height={b.h}
                sizes="(max-width: 700px) 62vw, 320px"
              />
            </span>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="dev-cap">
          {caption}
          {scrollable && (
            <>
              <br />
              <span className="k">↕ Scroll it</span>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ───────────────────────── progress rail ────────────────────────── */

export function Nav() {
  const fill = useRef(null);
  const [chapter, setChapter] = useState('Overview');

  useEffect(() => {
    const secs = [...document.querySelectorAll('section[data-chapter]')];
    let raf = 0;

    // Written straight to the element rather than through a spring: a spring is
    // driven by requestAnimationFrame, and rAF is throttled whenever the page
    // isn't being painted — which left the bar frozen at zero.
    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (fill.current)
        fill.current.style.transform = `scaleX(${p.toFixed(4)})`;

      if (secs.length) {
        const line = window.innerHeight * 0.35;
        let cur = null;
        for (const sec of secs)
          if (sec.getBoundingClientRect().top <= line) cur = sec;
        setChapter(cur ? cur.dataset.chapter : 'Overview');
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    window.addEventListener('load', read);
    // images keep changing the page height for a few seconds after load
    const beat = setInterval(read, 500);
    return () => {
      clearInterval(beat);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', read);
      window.removeEventListener('load', read);
    };
  }, []);

  return (
    <div className="nav">
      <div className="wrap">
        <a className="nav-home" href="/" target="_top">
          All work
        </a>
        <span className="nav-name">
          <b>PrepInsta · Web</b>&nbsp;
          <span className="chapter">&nbsp;·&nbsp; {chapter}</span>
        </span>
        <div
          className="nav-rail"
          role="progressbar"
          aria-label="Reading progress"
        >
          <i ref={fill} />
        </div>
        <span className="nav-date">Oct 2025 — Aug 2026</span>
      </div>
    </div>
  );
}

/* ──────────────────────── media well helper ─────────────────────── */

export function Well({ children, variant = '', caption, className = '' }) {
  const rail = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  // The frames never stack — they sit on one line and scroll. The hint and the
  // edge fade only appear once there is genuinely something off to the right.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const read = () => setOverflowing(el.scrollWidth > el.clientWidth + 4);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    window.addEventListener('resize', read);
    // images settle in late and change the row's width
    const t = setTimeout(read, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', read);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={`well-wrap${overflowing ? ' can-scroll' : ''}`}>
      <RevealMedia>
        <div
          ref={rail}
          className={`well ${variant} ${className}${overflowing ? ' overflowing' : ''}`}
        >
          {children}
        </div>
      </RevealMedia>
      <p className="well-hint" aria-hidden="true">
        Scroll for more →
      </p>
      {caption && (
        <Reveal delay={0.1}>
          <p className="caption">{caption}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ────────────────────────── browser window ──────────────────────── */

/**
 * A desktop frame. `scrollable` turns a full-page capture into a window the
 * reader drives themselves — the honest way to show a 12,000px page without
 * either shrinking it to a stamp or dumping the whole thing on the page.
 */
export function Browser({
  id,
  url,
  w = '100%',
  caption,
  scrollable = false,
  priority = false,
  // The frame is 1088 CSS px inside the 1200px wrap. Saying so is what lets
  // next/image serve a 2176 variant to a Retina screen instead of capping at
  // the smallest candidate that clears 900.
  sizes = '(max-width: 1312px) 92vw, 1088px',
}) {
  const a = M[id];
  if (!a) return null;
  return (
    <figure
      className="win"
      style={{ '--w': typeof w === 'number' ? `${w}px` : w }}
    >
      <div className="win-body">
        <div className="win-bar">
          <span className="win-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {url && <span className="win-url">{url}</span>}
        </div>
        <div className={`win-screen${scrollable ? ' scrollable' : ''}`}>
          {scrollable ? (
            /* data-lenis-prevent hands the wheel back to the browser — without
               it Lenis eats the event and this window never scrolls. */
            <div className="sw" data-lenis-prevent>
              <Image
                src={a.src}
                alt={caption || id}
                width={a.w}
                height={a.h}
                sizes={sizes}
                quality={90}
                priority={priority}
              />
            </div>
          ) : (
            <Image
              src={a.src}
              alt={caption || id}
              width={a.w}
              height={a.h}
              sizes={sizes}
              quality={90}
              priority={priority}
            />
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="win-cap">
          {caption}
          {scrollable && (
            <>
              {' '}
              &nbsp;<span className="k">↕ scroll it</span>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ──────────────────────────── plain still ───────────────────────── */

/** An overlay or component sheet — no device chrome, it isn't a screen. */
export function Shot({ id, w = '100%', caption, alt, sizes }) {
  const a = M[id];
  if (!a) return null;
  // A numeric width is the exact rendered size, so it is also the exact `sizes`.
  const s =
    sizes ||
    (typeof w === 'number' ? `${w}px` : '(max-width: 1312px) 92vw, 1088px');
  return (
    <figure
      className="fig-plain"
      style={{ width: typeof w === 'number' ? `${w}px` : w }}
    >
      <div className="plain">
        <Image
          src={a.src}
          alt={alt || caption || id}
          width={a.w}
          height={a.h}
          sizes={s}
          quality={90}
        />
      </div>
      {caption && <figcaption className="win-cap">{caption}</figcaption>}
    </figure>
  );
}

/* ─────────────────────────────── clip ───────────────────────────── */

/**
 * A recording, shown whole. Source is handed back when it scrolls away —
 * browsers cap concurrent decoders, and past that limit the later videos
 * silently freeze on frame one.
 */
export function Clip({ id, w = '100%', caption, start = 0, end = 0 }) {
  const a = M[id];
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const near = useInView(ref, { margin: '150% 0px' });

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v || !a) return;
    if (near && !v.getAttribute('src')) {
      v.src = videoUrl(a.src);
      v.load();
    }
    if (!near && v.getAttribute('src')) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
  }, [near, a]);

  // Loop a window of the recording rather than the whole file — the way to skip
  // past a stretch of a screen capture without re-encoding it.
  useEffect(() => {
    if (!start && !end) return;
    const v = ref.current?.querySelector('video');
    if (!v) return;
    const wrap = () => {
      if (end && v.currentTime >= end) v.currentTime = start;
      else if (v.currentTime < start - 0.2) v.currentTime = start;
    };
    v.addEventListener('timeupdate', wrap);
    v.addEventListener('loadedmetadata', wrap);
    return () => {
      v.removeEventListener('timeupdate', wrap);
      v.removeEventListener('loadedmetadata', wrap);
    };
  }, [start, end]);

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (inView) v.play?.().catch(() => {});
    else v.pause?.();
  }, [inView]);

  if (!a) return null;
  return (
    <figure
      className="clip"
      ref={ref}
      style={{ '--w': typeof w === 'number' ? `${w}px` : w }}
    >
      <video
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterUrl(a.src)}
        aria-label={caption || id}
      />
      {caption && (
        <figcaption className="win-cap">
          {caption} &nbsp;<span className="k">▸ plays in view</span>
        </figcaption>
      )}
    </figure>
  );
}
