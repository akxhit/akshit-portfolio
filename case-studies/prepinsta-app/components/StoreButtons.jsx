'use client';

/**
 * App Store / Play Store badges, drawn rather than dropped in as PNGs so they
 * take the page's own radius, border and hover behaviour and stay crisp at any
 * density.
 */

const APP_STORE = 'https://apps.apple.com/in/app/prepinsta/id6742322105';
const PLAY_STORE =
  'https://play.google.com/store/search?q=prepinsta&c=apps&hl=en_IN';

function Apple() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.42-.14-2.76.83-3.48.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.75 2.97-.75 1.39 0 1.78.75 2.99.72 1.23-.02 2.02-1.12 2.78-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.67zM14.9 5.36c.63-.77 1.06-1.83.94-2.9-.91.04-2.01.61-2.67 1.37-.59.68-1.1 1.76-.96 2.8 1.01.08 2.05-.51 2.69-1.27z" />
    </svg>
  );
}

function Play() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.6 2.3a1.3 1.3 0 0 0-.35.9v17.6c0 .35.13.67.35.9l.06.06 9.86-9.86v-.23L3.66 2.24l-.06.06z"
        fill="#00A0FF"
      />
      <path
        d="m16.78 15.2-3.26-3.26v-.23l3.26-3.27.08.05 3.9 2.21c1.1.63 1.1 1.66 0 2.29l-3.9 2.21-.08.05z"
        fill="#FFBC00"
      />
      <path
        d="M16.86 15.15 13.52 11.8 3.6 21.7c.37.38.96.43 1.63.05l11.63-6.6z"
        fill="#FF3A44"
      />
      <path
        d="M16.86 8.45 5.23 1.85C4.56 1.47 3.97 1.52 3.6 1.9l9.92 9.9 3.34-3.35z"
        fill="#00D66E"
      />
    </svg>
  );
}

export default function StoreButtons() {
  return (
    <div className="store-row">
      <a
        className="store-btn"
        href={APP_STORE}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Apple />
        <span>
          <small>Download on the</small>
          App Store
        </span>
      </a>
      <a
        className="store-btn"
        href={PLAY_STORE}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Play />
        <span>
          <small>Get it on</small>
          Google Play
        </span>
      </a>
      <span className="store-note">4.8 ★ · 867 reviews</span>
    </div>
  );
}
