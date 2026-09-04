'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const assetIds = Array.from({ length: 30 }, (_, index) => index + 1);
const mediaRoot = '/case-studies/infraone/media';

export default function CurvedCarousel() {
  const root = useRef(null);
  const canvas = useRef(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let cleanup = () => {};
    const section = root.current;

    const start = async () => {
      try {
        const THREE = await import('three');
        if (disposed || !canvas.current) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 40);
        camera.position.z = 10;
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas.current,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const loader = new THREE.TextureLoader();
        const textures = await Promise.all(
          assetIds.map((id) =>
            loader.loadAsync(
              `${mediaRoot}/campaign-${String(id).padStart(2, '0')}.webp`,
            ),
          ),
        );
        if (disposed) return;

        const group = new THREE.Group();
        scene.add(group);
        const slides = textures.map((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          const ratio = texture.image.width / texture.image.height;
          const height = ratio > 1.25 ? 2.75 : ratio > 0.75 ? 3.35 : 4.4;
          const width = height * ratio;
          const geometry = new THREE.PlaneGeometry(width, height, 32, 1);
          const points = geometry.attributes.position;
          for (let index = 0; index < points.count; index += 1) {
            const x = points.getX(index);
            points.setZ(index, Math.pow(x / Math.max(width, 0.1), 2) * 0.28);
          }
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
          });
          material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <map_fragment>',
              `#include <map_fragment>
              vec2 roundedPosition = abs(vMapUv - 0.5) - vec2(0.455);
              float roundedDistance = length(max(roundedPosition, 0.0)) - 0.045;
              if (roundedDistance > 0.0) discard;`,
            );
          };
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
          return { mesh, geometry, material };
        });

        const motion = {
          target: 0,
          current: 0,
          dragging: false,
          pointerX: 0,
          idle: 0,
        };
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        const resize = () => {
          if (!section) return;
          const bounds = section.getBoundingClientRect();
          const width = Math.max(1, bounds.width);
          const height = Math.max(1, bounds.height);
          renderer.setSize(width, height, false);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          camera.position.z = width < 700 ? 10.2 : 8.25;
        };
        const wrap = (value, length) => ((value % length) + length) % length;
        const updateSlides = () => {
          slides.forEach(({ mesh }, index) => {
            const offset =
              wrap(index - motion.current + slides.length / 2, slides.length) -
              slides.length / 2;
            const angle = offset * 0.39;
            mesh.visible = Math.abs(offset) < 4.9;
            if (!mesh.visible) return;
            mesh.position.x = 7.6 * Math.sin(angle);
            mesh.position.z = -7.6 * (1 - Math.cos(angle));
            mesh.position.y = 0.15 * Math.cos(angle * 1.4);
            mesh.rotation.y = -angle * 0.42;
            mesh.scale.setScalar(1 - Math.min(Math.abs(offset) * 0.045, 0.22));
            mesh.renderOrder = 20 - Math.round(Math.abs(offset));
          });
        };
        const onPointerDown = (event) => {
          motion.dragging = true;
          motion.pointerX = event.clientX;
          motion.idle = 0;
          canvas.current?.setPointerCapture(event.pointerId);
        };
        const onPointerMove = (event) => {
          if (!motion.dragging) return;
          motion.target -= (event.clientX - motion.pointerX) * 0.008;
          motion.pointerX = event.clientX;
        };
        const onPointerUp = (event) => {
          motion.dragging = false;
          motion.target = Math.round(motion.target);
          if (canvas.current?.hasPointerCapture?.(event.pointerId))
            canvas.current.releasePointerCapture(event.pointerId);
        };
        const onWheel = (event) => {
          if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
          event.preventDefault();
          motion.target += event.deltaX * 0.003;
          motion.idle = 0;
        };

        canvas.current.addEventListener('pointerdown', onPointerDown);
        canvas.current.addEventListener('pointermove', onPointerMove);
        canvas.current.addEventListener('pointerup', onPointerUp);
        canvas.current.addEventListener('pointercancel', onPointerUp);
        canvas.current.addEventListener('wheel', onWheel, { passive: false });
        const observer = new ResizeObserver(resize);
        observer.observe(section);
        resize();

        const render = () => {
          if (!motion.dragging && !reduceMotion) {
            motion.idle += 1;
            if (motion.idle > 120) motion.target += 0.0025;
          }
          motion.current += (motion.target - motion.current) * 0.075;
          updateSlides();
          renderer.render(scene, camera);
          animationFrame = requestAnimationFrame(render);
        };
        render();
        setState('ready');

        cleanup = () => {
          cancelAnimationFrame(animationFrame);
          observer.disconnect();
          canvas.current?.removeEventListener('pointerdown', onPointerDown);
          canvas.current?.removeEventListener('pointermove', onPointerMove);
          canvas.current?.removeEventListener('pointerup', onPointerUp);
          canvas.current?.removeEventListener('pointercancel', onPointerUp);
          canvas.current?.removeEventListener('wheel', onWheel);
          slides.forEach(({ geometry, material }) => {
            geometry.dispose();
            material.dispose();
          });
          textures.forEach((texture) => texture.dispose());
          renderer.dispose();
        };
      } catch {
        if (!disposed) setState('fallback');
      }
    };

    const intersection = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          intersection.disconnect();
          start();
        }
      },
      { rootMargin: '500px' },
    );
    intersection.observe(section);
    return () => {
      disposed = true;
      intersection.disconnect();
      cleanup();
    };
  }, []);

  return (
    <section
      className={`curved-carousel curved-carousel--${state}`}
      ref={root}
      aria-label="Draggable gallery of InfraOne marketing assets"
    >
      <div className="carousel-copy">
        <strong>Campaign archive</strong>
        <span>Drag the work to explore</span>
      </div>
      <canvas
        ref={canvas}
        role="img"
        aria-label="Curved carousel containing thirty InfraOne campaign designs"
      />
      {state === 'loading' && (
        <div className="carousel-loader" aria-label="Loading campaign gallery">
          <i />
          <i />
          <i />
        </div>
      )}
      {state === 'fallback' && (
        <div className="carousel-fallback">
          {assetIds.slice(0, 10).map((id) => (
            <Image
              key={id}
              src={`${mediaRoot}/campaign-${String(id).padStart(2, '0')}.webp`}
              alt={`InfraOne campaign design ${id}`}
              width={506}
              height={900}
            />
          ))}
        </div>
      )}
    </section>
  );
}
