'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Ambient WebGL field behind the hero.
 *
 * A slowly drifting point cloud, tinted to the brand green, with a little
 * mouse parallax. It reads as depth rather than decoration — and it is the
 * one place on the page that moves on its own, so it stays quiet: no bloom,
 * no post-processing, additive blending only.
 *
 * Bails out entirely on reduced-motion and when the canvas is off screen,
 * and tears the GPU resources down on unmount.
 */
export default function HeroField() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return; // no WebGL — the page is perfectly fine without this
    }

    const w = () => el.clientWidth || 1;
    const h = () => el.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w(), h());
    renderer.setClearAlpha(0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, w() / h(), 0.1, 100);
    camera.position.z = 15;

    // ── the cloud ──────────────────────────────────────────
    const COUNT = 1400;
    const pos = new Float32Array(COUNT * 3);
    const scale = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // a flattened shell, denser toward the middle
      const r = 5 + Math.pow(Math.random(), 0.65) * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.35;
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
      scale[i] = 0.5 + Math.random() * 1.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));

    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#2EE496') },
      uOpacity: { value: 0.5 },
      uSize: { value: Math.min(window.devicePixelRatio, 1.75) * 9 },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float aScale;
        uniform float uTime;
        uniform float uSize;
        varying float vFade;
        void main(){
          vec3 p = position;
          // gentle independent drift so it never looks like a rigid solid
          p.x += sin(uTime * 0.22 + position.z * 0.35) * 0.55;
          p.y += cos(uTime * 0.18 + position.x * 0.28) * 0.45;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale * (1.0 / -mv.z) * 9.0;
          vFade = smoothstep(26.0, 6.0, -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vFade;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, a * a * uOpacity * vFade);
        }`,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── palette follows the page theme ─────────────────────
    const light = new THREE.Color('#0C9A62');
    const dark = new THREE.Color('#2EE496');
    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      uniforms.uColor.value.copy(isDark ? dark : light);
      uniforms.uOpacity.value = isDark ? 0.55 : 0.34;
    };
    syncTheme();
    const themeWatch = new MutationObserver(syncTheme);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // ── input + visibility ─────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(el);

    const onResize = () => {
      renderer.setSize(w(), h());
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── loop ───────────────────────────────────────────────
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      points.rotation.y = t * 0.045 + mouse.x * 0.22;
      points.rotation.x = Math.sin(t * 0.09) * 0.09 - mouse.y * 0.14;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeWatch.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="hero-canvas" aria-hidden="true" />;
}
