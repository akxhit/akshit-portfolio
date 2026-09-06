/* React Bits Silk, adapted to the portfolio's existing raw WebGL renderer.
 * Original: David Haz, https://github.com/DavidHDev/react-bits
 * src/content/Backgrounds/Silk/Silk.jsx. License: vendor/react-bits/LICENSE.md
 * Changes: brand palettes, quieter grain, fixed frame budget, static posters,
 * offscreen/hidden/reduced-motion suspension and complete resource disposal.
 */
(function () {
  'use strict';
  const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
  const FRAG = `
    precision highp float;
    uniform vec2 uRes;
    uniform float uTime, uRotation;
    uniform vec3 uC1, uC2, uC3;
    const float e = 2.718281828459045;
    float noise(vec2 texCoord) {
      vec2 r = e * sin(e * texCoord);
      return fract(r.x * r.y * (1.0 + texCoord.x));
    }
    vec2 rotateUvs(vec2 uv, float angle) {
      float c = cos(angle), s = sin(angle);
      return mat2(c, -s, s, c) * uv;
    }
    void main() {
      vec2 uv = gl_FragCoord.xy / uRes;
      vec2 tex = rotateUvs((uv - 0.5) * 0.84, uRotation);
      float tOffset = uTime * 0.22;
      tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
      float pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y +
        cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) +
        sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
      vec3 col = mix(uC1, uC2, smoothstep(0.12, 0.85, pattern));
      col = mix(col, uC3, smoothstep(0.76, 1.0, pattern) * 0.48);
      // Settle the folds near the title, keeping a stable reading surface.
      col = mix(uC2, col, smoothstep(0.0, 0.48, uv.y) * 0.84 + 0.16);
      col += (noise(gl_FragCoord.xy) - 0.5) * 0.008;
      gl_FragColor = vec4(col, 1.0);
    }
  `;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 810px)');
  const surfaces = [];
  let raf = 0,
    last = 0,
    time = 0,
    disposed = false;
  const rgb = (hex) =>
    hex
      .replace('#', '')
      .match(/../g)
      .map((n) => parseInt(n, 16) / 255);

  function makeSurface(card) {
    const canvas = document.createElement('canvas');
    canvas.className = 'card__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    card.querySelector('.card__bgwrap').appendChild(canvas);
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      canvas.remove();
      return null;
    }
    const shaders = [],
      program = gl.createProgram();
    const buffer = gl.createBuffer();
    function destroy() {
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
      card.classList.remove('has-canvas');
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
    for (const [type, source] of [
      [gl.VERTEX_SHADER, VERT],
      [gl.FRAGMENT_SHADER, FRAG],
    ]) {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        destroy();
        return null;
      }
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      destroy();
      return null;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const p = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    card.dataset.colors
      .split(',')
      .forEach((color, i) =>
        gl.uniform3fv(
          gl.getUniformLocation(program, 'uC' + (i + 1)),
          rgb(color),
        ),
      );
    gl.uniform1f(
      gl.getUniformLocation(program, 'uRotation'),
      Number(card.dataset.rotation),
    );
    const uRes = gl.getUniformLocation(program, 'uRes'),
      uTime = gl.getUniformLocation(program, 'uTime');
    const surface = {
      card,
      canvas,
      visible: false,
      destroy,
      draw(t) {
        if (gl.isContextLost()) return;
        const w = Math.max(1, Math.round(canvas.clientWidth * 0.7));
        const h = Math.max(1, Math.round(canvas.clientHeight * 0.7));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          gl.uniform2f(uRes, w, h);
        }
        gl.uniform1f(uTime, t);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        card.classList.add('has-canvas');
      },
    };
    canvas.addEventListener('webglcontextlost', () => {
      card.classList.remove('has-canvas');
      surface.visible = false;
    });
    // Used by the asset capture pipeline to make exact same-shader fallback posters.
    canvas.addEventListener('silk:poster', () => {
      surface.draw(0);
      canvas.dataset.poster = canvas.toDataURL('image/png');
    });
    return surface;
  }
  function frame(now) {
    raf = 0;
    if (disposed || document.hidden || reduced.matches || !desktop.matches)
      return;
    if (now - last >= 32) {
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      surfaces.forEach((s) => {
        if (s.visible) s.draw(time);
      });
    }
    if (surfaces.some((s) => s.visible)) raf = requestAnimationFrame(frame);
  }
  function schedule() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (
      !disposed &&
      !document.hidden &&
      !reduced.matches &&
      desktop.matches &&
      surfaces.some((s) => s.visible)
    ) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const surface = surfaces.find((s) => s.card === entry.target);
        if (surface) {
          surface.visible = entry.isIntersecting;
          if (surface.visible && !reduced.matches) surface.draw(time);
        }
      });
      schedule();
    },
    { rootMargin: '80px' },
  );
  function init() {
    if (reduced.matches || !desktop.matches || surfaces.length) return;
    document
      .querySelectorAll(
        '.card[data-colors]:not([data-background="aero-shards"])',
      )
      .forEach((card) => {
        const surface = makeSurface(card);
        if (surface) {
          surfaces.push(surface);
          observer.observe(card);
        }
      });
  }
  function updatePreference() {
    surfaces.forEach((s) =>
      s.card.classList.toggle(
        'has-canvas',
        !reduced.matches && desktop.matches,
      ),
    );
    init();
    schedule();
  }
  function dispose() {
    disposed = true;
    cancelAnimationFrame(raf);
    observer.disconnect();
    surfaces.forEach((s) => s.destroy());
    surfaces.length = 0;
  }
  reduced.addEventListener('change', updatePreference);
  desktop.addEventListener('change', updatePreference);
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('pagehide', dispose);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      disposed = false;
      init();
    }
  });
  init();
})();
