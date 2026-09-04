'use client';

import ParticleButton from '@/components/kokonutui/particle-button';

export default function LiveSiteButton() {
  return (
    <ParticleButton
      className="zelt-link-button"
      onClick={() =>
        window.open(
          'https://www.zeltgold.com/',
          '_blank',
          'noopener,noreferrer',
        )
      }
    >
      Visit the live launch site
    </ParticleButton>
  );
}
