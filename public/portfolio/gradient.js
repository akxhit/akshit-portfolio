/* ------------------------------------------------------------------
   gradient.js — living gradient behind each project card.

   A single fullscreen quad per card running a domain-warped fbm
   shader between that project's colours, plus film grain. It sits on
   top of the CSS gradient, so if WebGL is missing or the context is
   lost the flat gradient underneath just stays visible.

   Only cards near the viewport render, and everything pauses when the
   tab is hidden or the visitor prefers reduced motion.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var VERT =
    "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}";

  var FRAG = [
    "precision highp float;",
    "uniform vec2  uRes;",
    "uniform float uTime;",
    "uniform vec3  uC1;",
    "uniform vec3  uC2;",
    "uniform vec3  uC3;",

    "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}",

    "float noise(vec2 p){",
    "  vec2 i=floor(p),f=fract(p);",
    "  vec2 u=f*f*(3.0-2.0*f);",
    "  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),",
    "             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);",
    "}",

    "float fbm(vec2 p){",
    "  float v=0.0,a=0.5;",
    "  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=0.5;}",
    "  return v;",
    "}",

    "void main(){",
    "  vec2 uv=gl_FragCoord.xy/uRes.xy;",
    "  vec2 p=uv*2.2;",
    "  float t=uTime*0.05;",
    // two rounds of domain warping — this is what makes it flow
    "  vec2 q=vec2(fbm(p+vec2(0.0,t)),fbm(p+vec2(5.2,1.3-t)));",
    "  vec2 r=vec2(fbm(p+3.0*q+vec2(1.7,9.2)+0.15*t),",
    "              fbm(p+3.0*q+vec2(8.3,2.8)-0.12*t));",
    "  float f=fbm(p+3.0*r);",
    "  float g=clamp(uv.y*0.75+f*0.65,0.0,1.0);",
    "  vec3 col=mix(uC1,uC2,smoothstep(0.0,0.55,g));",
    "  col=mix(col,uC3,smoothstep(0.45,1.0,g));",
    // soft highlight, upper-left
    "  col+=0.07*pow(max(0.0,1.0-length(uv-vec2(0.26,0.16))),3.0);",
    // grain keeps the gradient from banding
    "  col+=(hash(gl_FragCoord.xy+uTime)-0.5)*0.035;",
    "  gl_FragColor=vec4(col,1.0);",
    "}"
  ].join("\n");

  function hexToRgb(hex) {
    var h = String(hex).replace("#", "").trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return [0.5, 0.5, 0.5];
    // straight to linear-ish; the shader mixes in this space
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function makeSurface(canvas, colors) {
    var gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power"
    });
    if (!gl) return null;

    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    var loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, "uRes");
    var uTime = gl.getUniformLocation(prog, "uTime");

    var c1 = hexToRgb(colors[0]);
    var c2 = hexToRgb(colors[1] || colors[0]);
    var c3 = hexToRgb(colors[2] || colors[1] || colors[0]);
    gl.uniform3fv(gl.getUniformLocation(prog, "uC1"), c1);
    gl.uniform3fv(gl.getUniformLocation(prog, "uC2"), c2);
    gl.uniform3fv(gl.getUniformLocation(prog, "uC3"), c3);

    var w = 0, h = 0;

    function resize() {
      // half-res is plenty for a soft gradient and keeps this cheap
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      var nw = Math.max(1, Math.round(canvas.clientWidth * dpr));
      var nh = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (nw === w && nh === h) return;
      w = nw; h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }

    return {
      gl: gl,
      resize: resize,
      draw: function (t) {
        resize();
        gl.uniform1f(uTime, t);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
      lost: function () { return gl.isContextLost(); }
    };
  }

  function init() {
    var reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var cards = document.querySelectorAll(".card");
    if (!cards.length) return;

    var surfaces = [];

    Array.prototype.forEach.call(cards, function (card) {
      var colors = card.getAttribute("data-colors");
      if (!colors) return;
      colors = colors.split(",").map(function (c) { return c.trim(); });

      var wrap = card.querySelector(".card__bgwrap");
      if (!wrap) return;

      var canvas = document.createElement("canvas");
      canvas.className = "card__canvas";
      canvas.setAttribute("aria-hidden", "true");
      wrap.appendChild(canvas);

      var surf = makeSurface(canvas, colors);
      if (!surf) { canvas.remove(); return; }

      card.classList.add("has-canvas");
      surfaces.push({ card: card, canvas: canvas, surf: surf, visible: true });
    });

    if (!surfaces.length) return;

    /* Only paint cards that are near the viewport. */
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          for (var i = 0; i < surfaces.length; i++) {
            if (surfaces[i].card === e.target) surfaces[i].visible = e.isIntersecting;
          }
        });
      }, { rootMargin: "40% 0px" });
      surfaces.forEach(function (s) { io.observe(s.card); });
    }

    var start = performance.now();
    var raf = 0;

    function frame(now) {
      var t = (now - start) / 1000;
      for (var i = 0; i < surfaces.length; i++) {
        var s = surfaces[i];
        if (!s.visible || s.surf.lost()) continue;
        s.surf.draw(t);
      }
      raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      // paint one still frame, then leave it alone
      surfaces.forEach(function (s) { s.surf.draw(0); });
    } else {
      raf = requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          start = performance.now() - 1000;
          raf = requestAnimationFrame(frame);
        }
      });
    }

    window.addEventListener("resize", function () {
      surfaces.forEach(function (s) { s.surf.resize(); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
