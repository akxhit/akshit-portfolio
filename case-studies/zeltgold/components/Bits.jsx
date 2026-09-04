'use client';

import { useEffect, useRef, useState, Children } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { M } from '@/lib/media';

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
      initial={false}
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
      initial={false}
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
      <motion.span style={{ animationDelay: `${delay}s` }}>
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
    () =>
      prefix +
      to.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix,
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
    setText(prefix + (0).toFixed(decimals) + suffix);
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
                sizes="(max-width: 700px) 62vw, 320px"
                priority={priority}
              />
            </div>
          ) : (
            <Image
              src={a.src}
              alt={caption || id}
              width={a.w}
              height={a.h}
              sizes="(max-width: 700px) 62vw, 320px"
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

/* ──────────────────────────── video ─────────────────────────────── */

/* The source recordings sit inside a rendered iPhone mockup. Rather than
   re-encode them, the window below crops to the screen so a recording sits
   in the same frame as a screenshot. Numbers measured off the originals. */
const CROP = {
  default: {
    ratio: 821 / 1787,
    scale: 1212 / 821,
    x: -195 / 1212,
    y: -186 / 2160,
  },
  'v-splash': {
    ratio: 805 / 1750,
    scale: 1236 / 805,
    x: -213 / 1236,
    y: -204 / 2160,
  },
};

export function DeviceVideo({ id, w = 230, caption }) {
  const a = M[id];
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const near = useInView(ref, { margin: '150% 0px' });
  const c = CROP[id] || CROP.default;

  // Browsers cap concurrent video decoders; hand the source back when far away.
  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (near && !v.getAttribute('src')) {
      v.src = a.src;
      v.load();
    }
    if (!near && v.getAttribute('src')) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
  }, [near, a.src]);

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (inView) v.play?.().catch(() => {});
    else v.pause?.();
  }, [inView]);

  if (!a) return null;
  return (
    <figure
      className="dev"
      ref={ref}
      style={{ '--w': typeof w === 'number' ? `${w}px` : w }}
    >
      <div className="dev-body">
        <div className="dev-screen">
          <div className="vid-crop" style={{ aspectRatio: String(c.ratio) }}>
            <video
              muted
              loop
              playsInline
              preload="none"
              aria-label={caption || id}
              style={{
                width: `${c.scale * 100}%`,
                transform: `translate(${c.x * 100}%, ${c.y * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="dev-cap">
          {caption}
          <br />
          <span className="k">▸ Plays in view</span>
        </figcaption>
      )}
    </figure>
  );
}

/** The two square home reels are camera moves — shown whole, not cropped. */
export function Reel({
  id,
  caption,
  w = 'min(440px, 82vw)',
  hideCaption = false,
}) {
  const a = M[id];
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const near = useInView(ref, { margin: '150% 0px' });

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (near && !v.getAttribute('src')) {
      v.src = a.src;
      v.load();
    }
    if (!near && v.getAttribute('src')) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
  }, [near, a.src]);

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v) return;
    if (inView) v.play?.().catch(() => {});
    else v.pause?.();
  }, [inView]);

  if (!a) return null;
  return (
    /* fixed width, no shrink — the row scrolls instead of squeezing */
    <figure ref={ref} style={{ flex: '0 0 auto', width: w }}>
      <video
        muted
        loop
        playsInline
        preload="none"
        aria-label={caption || id}
        style={{
          width: '100%',
          borderRadius: 14,
          background: '#000',
          aspectRatio: '1',
        }}
      />
      {caption && !hideCaption && (
        <figcaption className="dev-cap" style={{ marginTop: 12 }}>
          {caption} <span className="k">▸ Plays in view</span>
        </figcaption>
      )}
    </figure>
  );
}

/* ───────────────────────────── tabs ─────────────────────────────── */

export function Tabs({ items, gold = false }) {
  const [active, setActive] = useState(0);
  return (
    <div className="stack">
      <div className={`seg${gold ? ' gold' : ''}`} role="tablist">
        {items.map((it, i) => (
          <button
            key={it.label}
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const d =
                e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
              if (!d) return;
              e.preventDefault();
              setActive((a) => (a + d + items.length) % items.length);
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {items[active].content}
      </motion.div>
    </div>
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
          <b>ZELTGOLD</b>&nbsp;
          <span className="chapter">&nbsp;·&nbsp; {chapter}</span>
        </span>
        <div
          className="nav-rail"
          role="progressbar"
          aria-label="Reading progress"
        >
          <i ref={fill} />
        </div>
        <span className="nav-date">One-month product sprint</span>
      </div>
    </div>
  );
}

export function ScreenRecording({ src, w = 230, caption }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-5% 0px' });

  useEffect(() => {
    const video = ref.current?.querySelector('video');
    if (!video) return;
    if (inView) video.play?.().catch(() => {});
    else video.pause?.();
  }, [inView]);

  return (
    <figure
      className="dev"
      ref={ref}
      style={{ '--w': typeof w === 'number' ? `${w}px` : w }}
    >
      <div className="dev-body">
        <div className="dev-screen">
          <span className="dev-notch" />
          <video
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={caption || 'ZELTGOLD app flow recording'}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="dev-cap">
          {caption}
          <br />
          <span className="k">▸ Plays in view</span>
        </figcaption>
      )}
    </figure>
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
