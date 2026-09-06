(function () {
  'use strict';

  // Each embedded document owns its reading position; the outer shell cannot
  // restore an iframe's scroll. Ignore asset-version queries in the storage key.
  const positionKey =
    'portfolio-reading:' + location.pathname.replace(/\/index\.html$|\/$/g, '');
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(positionKey));
  } catch {
    /* Storage is optional. */
  }
  if (!saved || !Number.isFinite(saved.y) || saved.y < 0) saved = null;

  let restoring = !!saved && !location.hash;
  if (restoring && 'scrollRestoration' in history)
    history.scrollRestoration = 'manual';
  let restoreTimer;
  let restoreDeadline;
  let saveTimer;
  let resizeObserver;
  let anchors = [];
  let audio = null;
  let lastSound = -Infinity;

  function collectAnchors() {
    anchors = Array.from(
      document.querySelectorAll(
        '.projects > .card, section[data-chapter], main > section[id], .portfolio-next',
      ),
    );
  }

  function anchorKey(element, index) {
    return (
      element.id ||
      element.getAttribute('data-chapter') ||
      element.getAttribute('href') ||
      String(index)
    );
  }

  function savePosition() {
    clearTimeout(saveTimer);
    saveTimer = null;
    if (restoring) return; // Never overwrite the saved position with a loading page's zero.
    const y = Math.max(0, window.scrollY);
    const state = { y: y };
    anchors.forEach(function (element, index) {
      const top = element.getBoundingClientRect().top + y;
      if (top <= y + 1) {
        state.anchor = anchorKey(element, index);
        state.offset = y - top;
      }
    });
    try {
      sessionStorage.setItem(positionKey, JSON.stringify(state));
    } catch {
      /* Optional. */
    }
  }

  function stopRestoring() {
    restoring = false;
    clearInterval(restoreTimer);
    clearTimeout(restoreDeadline);
    if (resizeObserver) resizeObserver.disconnect();
  }

  function restorePosition() {
    if (!restoring) return;
    let y = saved.y;
    if (saved.anchor && Number.isFinite(saved.offset)) {
      const anchor = anchors.find(function (element, index) {
        return anchorKey(element, index) === saved.anchor;
      });
      if (anchor)
        y = anchor.getBoundingClientRect().top + window.scrollY + saved.offset;
    }
    y = Math.max(
      0,
      Math.min(y, document.documentElement.scrollHeight - window.innerHeight),
    );
    if (window.__lenis) {
      window.__lenis.resize();
      window.__lenis.scrollTo(y, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  }

  function initReadingPosition() {
    collectAnchors();
    if (!restoring) return;
    restorePosition();
    // Hydration, fonts and Lenis can arrive after DOMContentLoaded. Reapply for
    // a bounded settling period, but yield immediately to any user interaction.
    restoreTimer = setInterval(restorePosition, 120);
    restoreDeadline = setTimeout(stopRestoring, 4000);
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(function () {
        collectAnchors();
        restorePosition();
      });
      resizeObserver.observe(document.body);
    }
    if (document.fonts)
      document.fonts.ready.then(restorePosition).catch(function () {});
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!restoring && !saveTimer) {
        saveTimer = setTimeout(function () {
          saveTimer = null;
          savePosition();
        }, 150);
      }
    },
    { passive: true },
  );
  ['wheel', 'touchstart', 'pointerdown'].forEach(function (name) {
    window.addEventListener(name, stopRestoring, {
      passive: true,
      capture: true,
    });
  });
  window.addEventListener(
    'keydown',
    function (event) {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
          'Tab',
        ].includes(event.key)
      )
        stopRestoring();
    },
    true,
  );
  window.addEventListener('load', function () {
    collectAnchors();
    restorePosition();
  });
  window.addEventListener('pagehide', function () {
    savePosition();
    stopRestoring();
    if (audio && audio.state === 'running')
      audio.suspend().catch(function () {});
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) savePosition();
  });

  function unlockAudio() {
    try {
      if (!audio) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audio = new AudioContext();
      }
      if (audio.state === 'suspended') audio.resume().catch(function () {});
    } catch {
      /* A browser that blocks audio still has a fully working page. */
    }
  }

  function play(kind) {
    if (!audio || audio.state !== 'running' || document.hidden) return;
    const now = audio.currentTime;
    if (now - lastSound < 0.075) return;
    lastSound = now;
    const notes =
      kind === 'success' ? [660, 880] : kind === 'close' ? [360] : [520];
    notes.forEach(function (frequency, index) {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = now + index * 0.065;
      const duration = kind === 'success' ? 0.12 : 0.07;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 0.8,
        start + duration,
      );
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.035, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.onended = function () {
        oscillator.disconnect();
        gain.disconnect();
      };
      oscillator.start(start);
      oscillator.stop(start + duration + 0.01);
    });
  }

  function watchCopy(control) {
    // Confirm the UI's successful clipboard result, never the initial click.
    if (!window.MutationObserver) return;
    const observer = new MutationObserver(function () {
      const label = control.querySelector('.copy-btn-label');
      if (
        control.classList.contains('is-copied') ||
        (label && label.textContent.trim() === 'Copied')
      ) {
        observer.disconnect();
        clearTimeout(timeout);
        play('success');
      }
    });
    observer.observe(control, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    const timeout = setTimeout(function () {
      observer.disconnect();
    }, 2500);
  }

  function initSound() {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    document.addEventListener(
      'click',
      function (event) {
        if (
          !event.isTrusted ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey
        )
          return;
        const control =
          event.target.closest && event.target.closest('button, a[href]');
        if (
          !control ||
          control.disabled ||
          control.getAttribute('aria-disabled') === 'true'
        )
          return;
        unlockAudio();
        if (control.matches('#emailbtn, .copy-btn')) {
          watchCopy(control);
        } else if (
          control.matches(
            '.pill, .cta, .faq__q, .cp-toggle, .totop, .nekoswitch, .studio-now-toggle, [data-canvas-action], .ops-controls button, [role="tab"]',
          )
        ) {
          if (control.getAttribute('aria-selected') === 'true') return;
          const kind =
            control.getAttribute('aria-expanded') === 'true' ||
            control.getAttribute('aria-checked') === 'true'
              ? 'close'
              : 'tap';
          if (audio)
            audio
              .resume()
              .then(function () {
                play(kind);
              })
              .catch(function () {});
        }
      },
      true,
    );
  }

  function init() {
    initReadingPosition();
    initSound();
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else init();
})();
