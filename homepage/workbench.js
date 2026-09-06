(function () {
  'use strict';
  const viewport = document.getElementById('studio-viewport');
  if (!viewport) return;
  const world = document.getElementById('studio-world');
  const canvas = viewport.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const desktop = matchMedia('(min-width: 1200px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const state = { x: 0, y: 0, zoom: 1 };
  let width = 0,
    height = 0,
    frame = 0,
    drag = null;
  const storageKey = 'portfolio-workbench-v2';
  try {
    const previous = JSON.parse(sessionStorage.getItem(storageKey));
    if (
      previous &&
      [previous.x, previous.y, previous.zoom].every(Number.isFinite)
    ) {
      state.x = previous.x;
      state.y = previous.y;
      state.zoom = Math.min(1.5, Math.max(0.65, previous.zoom));
    }
  } catch {
    /* The canvas works without storage. */
  }

  function save() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* Optional. */
    }
  }
  function render() {
    frame = 0;
    const x = desktop.matches ? state.x : 0;
    const y = desktop.matches ? state.y : 0;
    const zoom = desktop.matches ? state.zoom : 1;
    world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${zoom})`;
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const step = 24 * zoom;
    const offsetX = ((x % step) + step) % step;
    const offsetY = ((y % step) + step) % step;
    ctx.strokeStyle = '#add49c1c';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    for (let px = offsetX; px < width; px += step) {
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
    }
    for (let py = offsetY; py < height; py += step) {
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
    }
    ctx.stroke();
    const major = step * 5;
    ctx.strokeStyle = '#c4e7a946';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (
      let px = (((x + 42) % major) + major) % major;
      px < width;
      px += major
    ) {
      for (
        let py = (((y + 40) % major) + major) % major;
        py < height;
        py += major
      ) {
        ctx.moveTo(px - 4, py);
        ctx.lineTo(px + 4, py);
        ctx.moveTo(px, py - 4);
        ctx.lineTo(px, py + 4);
      }
    }
    ctx.stroke();
  }
  function requestRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }
  function measure() {
    width = viewport.clientWidth;
    height = viewport.clientHeight;
    if (ctx) {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    requestRender();
  }
  function stopTween() {
    if (window.gsap) window.gsap.killTweensOf(state);
  }
  function moveTo(next) {
    stopTween();
    if (window.gsap && !reduced.matches) {
      window.gsap.to(state, {
        ...next,
        duration: 0.32,
        ease: 'power3.out',
        onUpdate: requestRender,
        onComplete: save,
      });
    } else {
      Object.assign(state, next);
      requestRender();
      save();
    }
  }
  function zoomBy(delta) {
    const next = Math.min(1.5, Math.max(0.65, state.zoom + delta));
    const ratio = next / state.zoom;
    moveTo({
      zoom: next,
      x: state.x * ratio,
      y: height / 2 - (height / 2 - state.y) * ratio,
    });
  }
  viewport.addEventListener('pointerdown', function (event) {
    if (
      !desktop.matches ||
      event.button !== 0 ||
      event.target.closest(
        'button, a, input, textarea, .studio-now',
      )
    )
      return;
    stopTween();
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: state.x,
      startY: state.y,
    };
    viewport.classList.add('is-dragging');
    event.preventDefault();
  });
  window.addEventListener('pointermove', function (event) {
    if (!drag || event.pointerId !== drag.id) return;
    state.x = drag.startX + event.clientX - drag.x;
    state.y = drag.startY + event.clientY - drag.y;
    requestRender();
  });
  function release() {
    if (!drag) return;
    drag = null;
    viewport.classList.remove('is-dragging');
    save();
  }
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  window.addEventListener('blur', release);
  viewport.addEventListener('keydown', function (event) {
    if (event.target !== viewport || !desktop.matches) return;
    const direction = {
      ArrowLeft: [48, 0],
      ArrowRight: [-48, 0],
      ArrowUp: [0, 48],
      ArrowDown: [0, -48],
    }[event.key];
    if (direction) {
      event.preventDefault();
      moveTo({ x: state.x + direction[0], y: state.y + direction[1] });
    } else if (event.key === 'Home' || event.key === '0') {
      event.preventDefault();
      moveTo({ x: 0, y: 0, zoom: 1 });
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      zoomBy(0.1);
    } else if (event.key === '-') {
      event.preventDefault();
      zoomBy(-0.1);
    }
  });
  viewport.addEventListener('focusin', function (event) {
    if (world.contains(event.target) && desktop.matches)
      moveTo({ x: 0, y: 0, zoom: 1 });
  });
  const disclosure = document.querySelector('.studio-now-toggle');
  disclosure.addEventListener('click', function () {
    const expanded = disclosure.getAttribute('aria-expanded') !== 'true';
    disclosure.setAttribute('aria-expanded', String(expanded));
    document.getElementById('studio-now-body').hidden = !expanded;
  });
  const site = window.SITE || {};
  if (site.resumeUrl) {
    const link = document.getElementById('studio-resume');
    link.href = site.resumeUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  const call = document.querySelector('.studio .cta');
  if (site.calendarUrl) {
    call.addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.open(site.calendarUrl, '_blank', 'noopener,noreferrer');
      },
      true,
    );
  }
  const observer = new ResizeObserver(measure);
  observer.observe(viewport);
  desktop.addEventListener('change', function () {
    viewport.tabIndex = desktop.matches ? 0 : -1;
    viewport.setAttribute(
      'aria-label',
      desktop.matches
        ? 'Personal canvas. Arrow keys pan, Home resets.'
        : 'About Akshit',
    );
    release();
    measure();
  });
  viewport.tabIndex = desktop.matches ? 0 : -1;
  window.addEventListener('pagehide', function () {
    save();
    release();
    stopTween();
    cancelAnimationFrame(frame);
    observer.disconnect();
  });
  window.addEventListener('pageshow', function () {
    observer.observe(viewport);
    measure();
  });
  measure();
})();
