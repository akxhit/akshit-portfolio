'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';

/**
 * Copy-to-clipboard endpoint for the page.
 *
 * The particle burst is kokonutui's ParticleButton technique (MIT,
 * kokonutui.com — @dorianbaffier), rewritten against this project's tokens and
 * given a real job: the burst fires on a successful copy, so the motion is
 * confirmation rather than decoration. Their version ships a shadcn Button and
 * a pointer icon, both of which belong to a different design system.
 */
export default function CopyEmail({ email = 'akshitmanik.design@gmail.com' }) {
  const btn = useRef(null);
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // clipboard blocked — say nothing rather than claim success
    }
    const r = btn.current?.getBoundingClientRect();
    if (r) setBurst({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setBurst(null);
    }, 1600);
  };

  return (
    <>
      <AnimatePresence>
        {burst &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="spark"
              style={{ left: burst.x, top: burst.y }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: (i % 2 ? 1 : -1) * (14 + Math.random() * 46),
                y: -(16 + Math.random() * 44),
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.7, delay: i * 0.035, ease: 'easeOut' }}
            />
          ))}
      </AnimatePresence>

      <button ref={btn} className="copy-btn" onClick={copy} type="button">
        <span className="copy-btn-label">{copied ? 'Copied' : email}</span>
        {copied ? (
          <Check size={17} aria-hidden />
        ) : (
          <Copy size={17} aria-hidden />
        )}
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? `${email} copied to clipboard` : ''}
        </span>
      </button>
    </>
  );
}
