import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(
  new URL('../public/shared/portfolio-experience.js', import.meta.url),
  'utf8',
);
const key = 'portfolio-reading:/case-studies/prepinsta-web';

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, listener) {
      const list = listeners.get(name) || [];
      list.push(listener);
      listeners.set(name, list);
    },
    emit(name, event = {}) {
      for (const listener of listeners.get(name) || []) listener(event);
    },
  };
}

function control(selector = '') {
  const attributes = new Map();
  const label = { textContent: '' };
  const classes = new Set();
  return Object.assign(eventTarget(), {
    label,
    classes,
    setAttribute: (name, value) => attributes.set(name, value),
    getAttribute: (name) => attributes.get(name) ?? null,
    querySelector: () => label,
    classList: { contains: (name) => classes.has(name) },
    matches: (selectors) => selectors.split(', ').includes(selector),
    closest() {
      return this;
    },
  });
}

function setup({
  position,
  sound = 'on',
  hash = '',
  blocked = false,
  anchors = [],
} = {}) {
  const storage = new Map(position ? [[key, JSON.stringify(position)]] : []);
  const preferences = new Map([['portfolio-sound', sound]]);
  const timers = new Map();
  const observers = [];
  const audioContexts = [];
  let id = 0;
  let toggle;
  let tones = 0;
  const store = (map) => ({
    getItem(name) {
      if (blocked) throw new Error('Storage blocked');
      return map.get(name) ?? null;
    },
    setItem(name, value) {
      if (blocked) throw new Error('Storage blocked');
      map.set(name, value);
    },
  });
  const win = Object.assign(eventTarget(), {
    scrollY: 0,
    innerHeight: 800,
    scrollTo({ top }) {
      win.scrollY = top;
    },
  });
  const doc = Object.assign(eventTarget(), {
    readyState: 'loading',
    hidden: false,
    documentElement: { scrollHeight: 8000 },
    body: {
      appendChild(node) {
        toggle = node;
      },
    },
    querySelectorAll: () => anchors,
    createElement: () => control(),
  });
  class Observer {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe() {
      this.active = true;
    }
    disconnect() {
      this.active = false;
    }
  }
  class AudioContext {
    constructor() {
      this.state = 'suspended';
      this.currentTime = 1;
      audioContexts.push(this);
    }
    resume() {
      this.state = 'running';
      return Promise.resolve();
    }
    suspend() {
      this.state = 'suspended';
      return Promise.resolve();
    }
    createOscillator() {
      const parameter = {
        setValueAtTime() {},
        exponentialRampToValueAtTime() {},
      };
      return {
        frequency: parameter,
        connect() {},
        disconnect() {},
        start() {
          tones++;
        },
        stop() {},
      };
    }
    createGain() {
      return {
        gain: {
          setValueAtTime() {},
          linearRampToValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {},
        disconnect() {},
      };
    }
  }
  win.ResizeObserver = Observer;
  win.MutationObserver = Observer;
  win.AudioContext = AudioContext;
  const context = {
    window: win,
    document: doc,
    location: { pathname: '/case-studies/prepinsta-web/index.html', hash },
    history: { scrollRestoration: 'auto' },
    sessionStorage: store(storage),
    localStorage: store(preferences),
    ResizeObserver: Observer,
    MutationObserver: Observer,
    setInterval(callback) {
      timers.set(++id, { callback, repeat: true });
      return id;
    },
    setTimeout(callback) {
      timers.set(++id, { callback, repeat: false });
      return id;
    },
    clearInterval: (timer) => timers.delete(timer),
    clearTimeout: (timer) => timers.delete(timer),
  };
  vm.runInNewContext(source, context);
  doc.emit('DOMContentLoaded');
  return {
    win,
    doc,
    storage,
    preferences,
    context,
    audioContexts,
    toggle: () => toggle,
    tones: () => tones,
    mutations() {
      observers.filter((o) => o.active).forEach((o) => o.callback());
    },
    tickIntervals() {
      for (const timer of timers.values()) if (timer.repeat) timer.callback();
    },
    click(target, trusted = true) {
      doc.emit('click', { target, isTrusted: trusted, button: 0 });
    },
  };
}

await test('restores the embedded reading position, then synchronizes a late Lenis instance', () => {
  const env = setup({ position: { y: 3200 } });
  assert.equal(env.win.scrollY, 3200);
  env.win.scrollY = 0; // A late hydration/scroll setup resets the native position.
  let options;
  env.win.__lenis = {
    resize() {},
    scrollTo(y, config) {
      env.win.scrollY = y;
      options = config;
    },
  };
  env.tickIntervals();
  assert.equal(env.win.scrollY, 3200);
  assert.equal(options.immediate, true);
  assert.equal(options.force, true);
});

await test('keeps the same section offset when content above changes height', () => {
  const section = control();
  section.id = 'pricing';
  const env = setup({ position: { y: 3200, anchor: 'pricing', offset: 200 } });
  section.getBoundingClientRect = () => ({ top: 4000 - env.win.scrollY });
  env.doc.querySelectorAll = () => [section];
  env.win.emit('load');
  assert.equal(env.win.scrollY, 4200);
});

await test('does not save a loading page zero or fight the visitor after input', () => {
  const env = setup({ position: { y: 3200 } });
  env.win.scrollY = 0;
  env.doc.hidden = true;
  env.doc.emit('visibilitychange');
  assert.equal(JSON.parse(env.storage.get(key)).y, 3200);
  env.win.emit('wheel');
  env.win.scrollY = 3600;
  env.tickIntervals();
  assert.equal(env.win.scrollY, 3600);
  env.win.emit('pagehide');
  assert.equal(JSON.parse(env.storage.get(key)).y, 3600);
});

await test('honors explicit anchor links and tolerates unavailable storage', () => {
  const env = setup({ position: { y: 3200 }, hash: '#pricing' });
  assert.equal(env.win.scrollY, 0);
  assert.equal(env.context.history.scrollRestoration, 'auto');
  assert.doesNotThrow(() => {
    const blocked = setup({ blocked: true });
    blocked.win.emit('pagehide');
  });
});

await test('creates no audio on load, hover, scrolling, or synthetic clicks', () => {
  const env = setup();
  env.win.emit('scroll');
  env.click(control('.pill'), false);
  assert.equal(env.audioContexts.length, 0);
  assert.equal(env.tones(), 0);
});

await test('sounds are enabled even after a previously saved mute choice, with no toggle', async () => {
  const env = setup({ sound: 'off' });
  assert.equal(env.toggle(), undefined);
  env.click(control('.pill'));
  await Promise.resolve();
  assert.equal(env.tones(), 1);
});

await test('copy confirmation plays only after the success UI changes', () => {
  const env = setup();
  const copy = control('.copy-btn');
  env.click(copy);
  env.mutations();
  assert.equal(env.tones(), 0);
  copy.label.textContent = 'Copied';
  env.mutations();
  assert.equal(env.tones(), 2);
});

await test('cat toggle sounds on and off by default', async () => {
  const env = setup();
  const cats = control('.nekoswitch');
  cats.setAttribute('aria-checked', 'false');
  env.click(cats);
  await Promise.resolve();
  assert.equal(env.tones(), 1);
  env.audioContexts[0].currentTime += 1;
  cats.setAttribute('aria-checked', 'true');
  env.click(cats);
  await Promise.resolve();
  assert.equal(env.tones(), 2);
});
