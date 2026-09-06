/* Generated from the homepage footer by scripts/build-case-footer.mjs. */
(function(){
const host=document.querySelector('.portfolio-case-footer');
if(!host || host.dataset.homeFooter) return;
host.dataset.homeFooter='true';host.classList.add('footer','closing');
host.innerHTML="\n          <div class=\"closing-head\">\n            <div class=\"closing-invitation\">\n              <span class=\"closing-status\"\n                ><i aria-hidden=\"true\"></i> Open to good conversations</span\n              >\n              <h2>Good things start<br />with a <em>hello.</em></h2>\n            </div>\n            <div class=\"closing-contact\">\n              <p>\n                A product to rethink. <br />An idea to bring to life. <br />I’d\n                love to hear it.\n              </p>\n              <a\n                class=\"closing-email\"\n                id=\"footer-email\"\n                href=\"mailto:akshitmanik.design@gmail.com\"\n              >\n                Say hello <span aria-hidden=\"true\">↗</span>\n              </a>\n              <span class=\"closing-address\" id=\"footer-email-address\"\n                >akshitmanik.design@gmail.com</span\n              >\n            </div>\n          </div>\n          <div class=\"closing-signature\">\n            <button\n              class=\"ascii-signature\"\n              type=\"button\"\n              aria-label=\"Play with Akshit’s signature: scatter the letters\"\n            >\n              <span class=\"ascii-fallback\" aria-hidden=\"true\">akshit.</span>\n              <canvas class=\"ascii-canvas\" aria-hidden=\"true\"></canvas>\n            </button>\n            <div class=\"signature-caption\">\n              <span>Product designer. Curious by default.</span>\n              <span class=\"signature-hint\"\n                >Go on, make a mess. <span aria-hidden=\"true\">↗</span></span\n              >\n            </div>\n          </div>\n          <div class=\"closing-bottom\">\n            <span class=\"closing-copyright\" id=\"copyright\"\n              >© Akshit Manik 2026</span\n            >\n            <div class=\"closing-time\">\n              <span id=\"place\">India</span><span aria-hidden=\"true\"> / </span\n              ><span id=\"clock\"></span>\n            </div>\n            <nav id=\"footer-socials\" aria-label=\"Social links\"></nav>\n            <button\n              class=\"totop closing-top\"\n              type=\"button\"\n              aria-label=\"Back to top\"\n            >\n              Back to top <span aria-hidden=\"true\">↑</span>\n            </button>\n          </div>\n        ";
const data={"email":"akshitmanik.design@gmail.com","socials":[{"name":"LinkedIn","url":"https://www.linkedin.com/in/akshitmanik/","icon":"linkedin"},{"name":"X","url":"https://x.com/intent/follow?screen_name=whyakshit","icon":"x"}],"footer":{"location":"India","timeZone":"Asia/Kolkata","quote":"“Good design is invisible until it's missing.”","copyright":"© Akshit Manik 2026"}};
const q=s=>host.querySelector(s);
q('#footer-email').href='mailto:'+data.email;q('#footer-email-address').textContent=data.email;
q('#place').textContent=data.footer.location;q('#copyright').textContent=data.footer.copyright;
for(const item of data.socials){const a=document.createElement('a');a.className='closing-social';a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=item.name+' ↗';q('#footer-socials').appendChild(a);}
const tick=()=>{q('#clock').textContent=new Intl.DateTimeFormat('en-US',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:data.footer.timeZone||'Asia/Kolkata'}).format(new Date());};
tick();let timer=setInterval(tick,30000);addEventListener('pagehide',()=>clearInterval(timer));addEventListener('pageshow',e=>{if(e.persisted){tick();timer=setInterval(tick,30000);}});
q('.closing-top').addEventListener('click',()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(window.__lenis)window.__lenis.scrollTo(0,{immediate:reduced});else window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});});
})();
/* Adapted from the user's artefakt-interactive-ascii-logo/script.js.
 * Keeps its sampled glyphs, pointer repulsion and spring return, scoped to
 * the footer. Draws only while visible and moving, with a static fallback.
 */
(function () {
  'use strict';
  const button = document.querySelector('.portfolio-case-footer .ascii-signature');
  if (!button) return;
  const canvas = button.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    button.disabled = true;
    return;
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const glyphs = '.:+*#%@0369';
  const grid = document.createElement('canvas'),
    gridCtx = grid.getContext('2d');
  let width = 0,
    height = 0,
    step = 8,
    cellSize = 6,
    cells = [];
  let raf = 0,
    visible = false,
    disposed = false,
    movingUntil = 0,
    last = 0;
  const pointer = { x: -999, y: -999 };
  const random = (n) => {
    const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  };

  function setup() {
    if (disposed) return;
    const bounds = button.getBoundingClientRect();
    width = Math.round(bounds.width);
    height = Math.round(bounds.height);
    if (!width || !height) return;
    step = width < 600 ? 3.5 : 7;
    cellSize = step - (width < 600 ? 0.8 : 1.5);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    grid.width = canvas.width;
    grid.height = canvas.height;
    gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gridCtx.fillStyle = '#183022';
    for (let y = 0; y < height; y += step)
      for (let x = 0; x < width; x += step)
        gridCtx.fillRect(x, y, cellSize, cellSize);
    const mask = document.createElement('canvas');
    mask.width = width;
    mask.height = height;
    const sample = mask.getContext('2d', { willReadFrequently: true });
    const family = '"Schibsted Grotesk", Arial, sans-serif';
    sample.font = '800 100px ' + family;
    const size = Math.min(
      ((width * 0.94) / sample.measureText('akshit.').width) * 100,
      height * 1.13,
    );
    sample.font = '800 ' + size + 'px ' + family;
    const metrics = sample.measureText('akshit.');
    const textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    sample.fillStyle = '#fff';
    sample.fillText(
      'akshit.',
      (width - metrics.width) / 2,
      (height - textHeight) / 2 + metrics.actualBoundingBoxAscent,
    );
    const pixels = sample.getImageData(0, 0, width, height).data;
    cells = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const sx = Math.min(width - 1, Math.floor(x + cellSize / 2));
        const sy = Math.min(height - 1, Math.floor(y + cellSize / 2));
        if (pixels[(sy * width + sx) * 4 + 3] < 130) continue;
        const seed = cells.length;
        cells.push({
          x,
          y,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          char: glyphs[Math.floor(random(seed) * glyphs.length)],
        });
      }
    }
    button.classList.add('is-ready');
    button.disabled = reduced.matches;
    render();
  }
  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(grid, 0, 0, width, height);
    ctx.fillStyle = '#d5f68b';
    ctx.font = '600 ' + (step + 1.5) + 'px monospace';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    for (const c of cells) {
      ctx.fillText(
        c.char,
        c.x + Math.round(c.ox) * step + cellSize / 2,
        c.y + Math.round(c.oy) * step,
      );
    }
  }
  function physics(now) {
    let active = now < movingUntil;
    for (const c of cells) {
      if (now < movingUntil) {
        const dx = c.x / step + c.ox - pointer.x,
          dy = c.y / step + c.oy - pointer.y;
        const distance = Math.hypot(dx, dy),
          radius = width < 600 ? 12 : 10;
        if (distance < radius && distance > 0) {
          const force = (1 - distance / radius) ** 2 * 24;
          c.vx += (dx / distance) * force;
          c.vy += (dy / distance) * force;
          c.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      c.vx = (c.vx - c.ox * 0.055) * 0.6;
      c.vy = (c.vy - c.oy * 0.055) * 0.6;
      c.ox += c.vx;
      c.oy += c.vy;
      if (
        Math.abs(c.ox) + Math.abs(c.oy) + Math.abs(c.vx) + Math.abs(c.vy) >
        0.025
      )
        active = true;
      else {
        c.ox = c.oy = c.vx = c.vy = 0;
      }
    }
    return active;
  }
  function frame(now) {
    raf = 0;
    if (disposed || !visible || document.hidden || reduced.matches) return;
    if (now - last < 24) {
      raf = requestAnimationFrame(frame);
      return;
    }
    last = now;
    const active = physics(now);
    render();
    if (active) raf = requestAnimationFrame(frame);
  }
  function wake() {
    if (!raf && visible && !disposed && !document.hidden && !reduced.matches)
      raf = requestAnimationFrame(frame);
  }
  button.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || reduced.matches) return;
    const bounds = button.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / step;
    pointer.y = (event.clientY - bounds.top) / step;
    movingUntil = performance.now() + 80;
    wake();
  });
  button.addEventListener('pointerleave', () => {
    movingUntil = 0;
  });
  button.addEventListener('click', () => {
    if (reduced.matches) return;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i],
        angle = random(i + 17) * Math.PI * 2;
      c.vx += Math.cos(angle) * 12;
      c.vy += Math.sin(angle) * 12;
      c.char =
        glyphs[Math.floor(random(i + performance.now()) * glyphs.length)];
    }
    wake();
  });
  const visibility = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  const resize = new ResizeObserver(setup);
  visibility.observe(button);
  resize.observe(button);
  reduced.addEventListener('change', () => {
    cancelAnimationFrame(raf);
    raf = 0;
    setup();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else wake();
  });
  window.addEventListener('pagehide', () => {
    disposed = true;
    cancelAnimationFrame(raf);
    raf = 0;
    visibility.disconnect();
    resize.disconnect();
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      disposed = false;
      visibility.observe(button);
      resize.observe(button);
      setup();
    }
  });
  setup();
  if (document.fonts) void document.fonts.ready.then(setup);
})();
