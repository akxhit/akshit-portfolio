'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { M } from '@/lib/media';

const COLUMNS = [
  [
    {
      id: 'home',
      label: 'Home',
      copy: 'Surfaces live rates, plans and portfolio value at a glance.',
    },
    {
      id: 'calculator',
      label: 'Gold calculator',
      copy: 'Translates rupees into gold before a customer commits.',
    },
    {
      id: 'store-redeem',
      label: 'Redemption',
      copy: 'Makes in-store redemption feel concrete and verifiable.',
    },
  ],
  [
    {
      id: 'plan-choice',
      label: 'Plan selection',
      copy: 'Compares jeweller schemes and flexible saving options.',
    },
    {
      id: 'scheme-economics',
      label: 'Plan details',
      copy: 'Explains instalments, benefits and maturity without jargon.',
    },
    {
      id: 'scheme-active',
      label: 'Active saving',
      copy: 'Keeps contributions and upcoming payments visible.',
    },
  ],
  [
    {
      id: 'explore',
      label: 'Explore',
      copy: 'Helps people discover trusted jewellers nearby.',
    },
    {
      id: 'retailer',
      label: 'Jeweller profile',
      copy: 'Brings store credibility, schemes and services together.',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      copy: 'Tracks savings across gold, silver, jars and schemes.',
    },
  ],
  [
    {
      id: 'store-invest',
      label: 'Start from ₹100',
      copy: 'Turns an intimidating category into an accessible first step.',
    },
    {
      id: 'gold-review',
      label: 'Order review',
      copy: 'Confirms rate, weight and fees before payment.',
    },
    {
      id: 'store-nearby',
      label: 'Nearby jewellers',
      copy: 'Connects digital saving to a real place and retailer.',
    },
  ],
];

function ScreenCard({ screen }) {
  const asset = M[screen.id];
  return (
    <figure className="screen-wall-card">
      <div className="screen-wall-device">
        <Image
          src={asset.src}
          alt={`${screen.label} screen — ${screen.copy}`}
          width={asset.w}
          height={asset.h}
          sizes="(max-width: 760px) 62vw, 22vw"
        />
      </div>
      <figcaption>
        <strong>{screen.label}</strong>
        <span>{screen.copy}</span>
      </figcaption>
    </figure>
  );
}

function ScreenColumn({ screens, progress, from, to, className }) {
  const y = useTransform(progress, [0, 1], [from, to]);
  return (
    <motion.div className={`screen-wall-column ${className}`} style={{ y }}>
      {screens.map((screen) => (
        <ScreenCard key={screen.id} screen={screen} />
      ))}
    </motion.div>
  );
}

export default function ScreenGallery() {
  const gallery = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  if (reducedMotion) {
    return (
      <div className="screen-wall screen-wall-static" ref={gallery}>
        {COLUMNS.flat().map((screen) => (
          <ScreenCard key={screen.id} screen={screen} />
        ))}
      </div>
    );
  }

  return (
    <div className="screen-wall" ref={gallery}>
      <ScreenColumn
        screens={COLUMNS[0]}
        progress={scrollYProgress}
        from={80}
        to={-260}
        className="screen-wall-a"
      />
      <ScreenColumn
        screens={COLUMNS[1]}
        progress={scrollYProgress}
        from={-180}
        to={-560}
        className="screen-wall-b"
      />
      <ScreenColumn
        screens={COLUMNS[2]}
        progress={scrollYProgress}
        from={30}
        to={-220}
        className="screen-wall-c"
      />
      <ScreenColumn
        screens={COLUMNS[3]}
        progress={scrollYProgress}
        from={-110}
        to={-500}
        className="screen-wall-d"
      />
    </div>
  );
}
