import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import AeroShards from './AeroShards.jsx';

function Background() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <AeroShards
      backgroundColor="#e2e9da"
      shardColor="#497d5c"
      accentColor="#a4ce7b"
      placement="full"
      flow="stream"
      material="pearl"
      speed={0.5}
      density={1}
      shardSize={1.2}
      spread={1}
      bloom={0.15}
      grain={0.025}
      chromaticAberration={0.002}
      interaction="repel"
      interactionStrength={0.35}
      holdToGather={false}
      onError={() => setFailed(true)}
    />
  );
}

const card = document.querySelector('.card[data-background="aero-shards"]');
if (card) {
  const container = document.createElement('div');
  container.className = 'prepinsta-aero-mount';
  card.querySelector('.card__bgwrap').appendChild(container);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 810px)');
  let root;
  let near = false;
  let suspended = false;
  function sync() {
    const enabled =
      !suspended &&
      near &&
      desktop.matches &&
      !reduced.matches &&
      !!navigator.gpu &&
      !navigator.connection?.saveData;
    if (enabled && !root) {
      root = createRoot(container);
      root.render(<Background />);
    } else if (!enabled && root) {
      root.unmount();
      root = undefined;
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      near = entries[0].isIntersecting;
      sync();
    },
    { rootMargin: '250px' },
  );
  observer.observe(card);
  reduced.addEventListener('change', sync);
  desktop.addEventListener('change', sync);
  window.addEventListener('pagehide', () => {
    suspended = true;
    sync();
    observer.disconnect();
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      suspended = false;
      observer.observe(card);
    }
  });
}
