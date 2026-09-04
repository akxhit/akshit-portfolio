'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { M } from '@/lib/media';

const screens = [
  { id: 'store-invest', label: 'Invest in 22 karat gold from ₹100' },
  { id: 'store-save', label: 'Save daily and own gold monthly' },
  { id: 'store-track', label: 'Track gold and savings live' },
  { id: 'store-redeem', label: 'Redeem gold with a jeweller' },
  { id: 'store-nearby', label: 'Find nearby jewellers' },
];

export default function HeroShowcase() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);

  return (
    <motion.div
      className="hero-showcase"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="hero-orbit" aria-hidden="true" />
      {screens.map((screen, index) => {
        const asset = M[screen.id];
        return (
          <motion.figure
            className={`hero-poster hero-poster-${index + 1}`}
            key={screen.id}
            style={{ '--hero-delay': `${0.28 + index * 0.08}s` }}
          >
            <div className="hero-poster-shell">
              <Image
                src={asset.src}
                alt={screen.label}
                width={asset.w}
                height={asset.h}
                priority
                sizes="(max-width: 760px) 42vw, 210px"
              />
            </div>
          </motion.figure>
        );
      })}
    </motion.div>
  );
}
