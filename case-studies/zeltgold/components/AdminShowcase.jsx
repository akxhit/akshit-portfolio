'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { M } from '@/lib/media';

const SCREENS = [
  {
    id: 'admin-dashboard',
    label: 'Platform overview',
    title: 'Know where the money is.',
    copy: 'Customers, vendors, collections, settlements and commission reconcile in one view.',
    stat: '₹81,200 collected',
  },
  {
    id: 'admin-ledger',
    label: 'Two-sided ledger',
    title: 'Trace every payment.',
    copy: 'Customer payments map to vendor settlements, with pending and failed states kept visible.',
    stat: '14 transactions',
  },
  {
    id: 'vendor-dashboard',
    label: 'Jeweller operations',
    title: 'Turn savings into obligations.',
    copy: 'The vendor sees enrolments, money collected and the gold or silver owed back to customers.',
    stat: '4,820g gold accrued',
  },
  {
    id: 'vendor-team',
    label: 'Team access',
    title: 'Give access deliberately.',
    copy: 'Owners can scope staff by role, store and status without exposing sensitive operations.',
    stat: '3 access states',
  },
  {
    id: 'vendor-redemption-verified',
    label: 'Redemption verification',
    title: 'Verify before handover.',
    copy: 'The jeweller confirms the customer, scheme, redemption scope and eligible gold first.',
    stat: '17.40g eligible',
  },
];

export default function AdminShowcase() {
  const [active, setActive] = useState(0);
  const screen = SCREENS[active];
  const asset = M[screen.id];

  const move = (direction) => {
    setActive(
      (current) => (current + direction + SCREENS.length) % SCREENS.length,
    );
  };

  return (
    <div className="ops-showcase">
      <div className="ops-copy" aria-live="polite">
        <span className="ops-count">
          {String(active + 1).padStart(2, '0')} / 05
        </span>
        <p className="ops-label">{screen.label}</p>
        <h3>{screen.title}</h3>
        <p className="ops-description">{screen.copy}</p>
        <p className="ops-stat">
          <span>Scenario data</span>
          {screen.stat}
        </p>
        <div className="ops-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous admin screen"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next admin screen"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="ops-media">
        <Image
          key={screen.id}
          className="ops-image"
          src={asset.src}
          alt={`${screen.label} interface showing ${screen.copy.toLowerCase()}`}
          width={asset.w}
          height={asset.h}
          sizes="(max-width: 820px) 94vw, 72vw"
        />
      </div>

      <div
        className="ops-tabs"
        role="tablist"
        aria-label="Admin and vendor portal screens"
      >
        {SCREENS.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === active}
            key={item.id}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
