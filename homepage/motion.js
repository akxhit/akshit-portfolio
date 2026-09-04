/* ------------------------------------------------------------------
   motion.js — Lenis smooth scroll + the GSAP layer.

     · Lenis drives scroll, ScrollTrigger is slaved to it
     · SplitText reveals the name on load
     · scroll-linked parallax between card background, screenshot
       and caption, so the three planes separate as you scroll
     · magnetic hover on the round/pill controls
     · the footer stickers are throwable (Draggable + Inertia)

   Everything here is enhancement — the page is fully usable if this
   file never loads, and it bails out entirely under reduced motion.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  if (!window.gsap) return;

  var reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var plugins = [];
  if (window.ScrollTrigger) plugins.push(window.ScrollTrigger);
  if (window.SplitText) plugins.push(window.SplitText);
  if (window.Draggable) plugins.push(window.Draggable);
  if (window.InertiaPlugin) plugins.push(window.InertiaPlugin);
  if (window.CustomEase) plugins.push(window.CustomEase);
  if (plugins.length) gsap.registerPlugin.apply(gsap, plugins);

  /* one signature curve: quick out, long settle — no overshoot */
  var EASE = 'power3.out';
  if (window.CustomEase) {
    CustomEase.create('settle', 'M0,0 C0.16,1 0.3,1 1,1');
    EASE = 'settle';
  }

  /* ================================================================
     LENIS — smooth scroll, with ScrollTrigger reading from it
     ================================================================ */

  function initLenis() {
    if (!window.Lenis || reduced) return null;

    var lenis = new Lenis({
      duration: 1.05,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      });
    }

    // Lenis takes scroll away from the browser, so window.scrollTo is a
    // no-op from here on. Publish the instance and let main.js use it.
    window.__lenis = lenis;

    // in-page anchors have to be routed through Lenis as well
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -24 });
      }
    });

    return lenis;
  }

  /* ================================================================
     LOAD — name reveal + staggered sidebar entrance
     ================================================================ */

  function initIntro() {
    var name = document.querySelector('.bigname');

    // clearProps matters here: a leftover transform turns the element
    // into a stacking context, which would trap the z-index of the
    // panels and popups nested inside it.
    var tl = gsap.timeline({
      defaults: { ease: EASE, clearProps: 'transform,opacity' },
    });

    if (name && window.SplitText) {
      // one mask per line so the letters rise out of nothing
      var split = new SplitText(name.querySelectorAll('span'), {
        type: 'chars',
        charsClass: 'bn-char',
      });
      gsap.set(name.querySelectorAll('span'), { overflow: 'hidden' });
      tl.from(
        split.chars,
        {
          yPercent: 115,
          duration: 1.05,
          stagger: { each: 0.028, from: 'start' },
        },
        0,
      );
    } else if (name) {
      tl.from(name, { y: 26, opacity: 0, duration: 0.8 }, 0);
    }

    tl.from('.badge', { y: 12, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.15)
      // .pill, not .pillgroup — the group is the panel's positioning
      // parent, and must stay transform-free
      .from('.pill', { y: -10, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.1)
      .from(
        '.tagline > *',
        { y: 14, opacity: 0, duration: 0.6, stagger: 0.045 },
        0.45,
      )
      .from('.services', { y: 18, opacity: 0, duration: 0.7 }, 0.6)
      .from(
        '.ctawrap, .contactrow',
        { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
        0.68,
      );

    // GSAP's ticker is rAF-driven, so a page loaded in a background tab
    // sits frozen on the tween's opacity:0 start frame. Never let the
    // sidebar stay invisible because of an entrance animation.
    setTimeout(function () {
      if (tl.progress() < 1) tl.progress(1);
    }, 4000);

    return tl;
  }

  /* ================================================================
     CARDS — three planes moving at different rates
     ================================================================ */

  function initCards() {
    if (!window.ScrollTrigger) return;

    gsap.utils.toArray('.card').forEach(function (card) {
      var paint = card.querySelectorAll('.card__bg, .card__canvas');
      var shot = card.querySelector('.card__shot img, .card__shot video');
      var veil = document.createElement('div');
      veil.className = 'card__veil';
      card.appendChild(veil);

      // each tween needs its OWN trigger config — GSAP consumes the
      // object, so sharing one literal silently drops the later tweens
      function through() {
        return {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        };
      }

      // background drifts slowest. scale 1.12 gives 6% of overscan on
      // each edge, so ±4% of travel never exposes the card corners.
      if (paint.length) {
        gsap.fromTo(
          paint,
          { yPercent: -4, scale: 1.12 },
          { yPercent: 4, scale: 1.12, ease: 'none', scrollTrigger: through() },
        );
      }

      // the screenshot moves against it, so the planes separate
      if (shot) {
        gsap.fromTo(
          shot,
          { yPercent: 6 },
          { yPercent: -6, ease: 'none', scrollTrigger: through() },
        );
      }

      // cards dim as they slide under the next one — cheap depth,
      // and no transform on .card so the sticky content keeps working
      gsap.fromTo(
        veil,
        { opacity: 0 },
        {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            // only once the card is actually pinned and leaving, so the
            // hero card is never dimmed while it's the hero
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    ScrollTrigger.refresh();
  }

  /* ================================================================
     MAGNETIC CONTROLS
     ================================================================ */

  function initMagnetic() {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

    var targets = document.querySelectorAll(
      '.cta, .social, .totop, .emailbtn, .pill, .card__go',
    );

    Array.prototype.forEach.call(targets, function (elm) {
      var strength = elm.classList.contains('cta') ? 0.22 : 0.34;
      var xTo = gsap.quickTo(elm, 'x', { duration: 0.5, ease: 'power3.out' });
      var yTo = gsap.quickTo(elm, 'y', { duration: 0.5, ease: 'power3.out' });

      elm.addEventListener('pointermove', function (e) {
        var r = elm.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      elm.addEventListener('pointerleave', function () {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* ================================================================
     STICKERS — idle float, then throwable
     ================================================================ */

  function initStickers() {
    var stickers = gsap.utils.toArray('.sticker');
    if (!stickers.length) return;

    if (window.ScrollTrigger) {
      gsap.from(stickers, {
        y: 40,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: EASE,
        stagger: { each: 0.07, from: 'center' },
        scrollTrigger: { trigger: '.stickers', start: 'top 90%' },
      });
    }

    stickers.forEach(function (s, i) {
      gsap.to(s, {
        y: '+=10',
        duration: 2.4 + i * 0.22,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.18,
      });
    });

    if (!window.Draggable) return;

    Draggable.create(stickers, {
      type: 'x,y',
      bounds: '.footer',
      inertia: !!window.InertiaPlugin,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPressInit: function () {
        gsap.killTweensOf(this.target, 'y');
        gsap.to(this.target, {
          scale: 1.12,
          duration: 0.2,
          ease: 'power2.out',
        });
      },
      onDragStart: function () {
        this.target.classList.add('is-held');
      },
      onRelease: function () {
        this.target.classList.remove('is-held');
        gsap.to(this.target, { scale: 1, duration: 0.35, ease: EASE });
      },
      onThrowComplete: function () {
        gsap.to(this.target, {
          rotation: '+=' + gsap.utils.random(-18, 18),
          duration: 0.6,
          ease: EASE,
        });
      },
    });
  }

  /* ================================================================
     TAGLINE ART CARDS — give the pop a bit of weight
     ================================================================ */

  function initTagline() {
    gsap.utils.toArray('.hw').forEach(function (hw) {
      var art = hw.querySelector('.hw__art');
      if (!art) return;
      gsap.set(art, { transformOrigin: '50% 100%' });

      hw.addEventListener('pointerenter', function () {
        gsap.fromTo(
          art,
          { opacity: 0, y: 14, scale: 0.8, rotate: -10 },
          { opacity: 1, y: 0, scale: 1, rotate: -4, duration: 0.5, ease: EASE },
        );
      });
      hw.addEventListener('pointerleave', function () {
        gsap.to(art, {
          opacity: 0,
          y: 10,
          scale: 0.86,
          duration: 0.25,
          ease: 'power2.in',
        });
      });
    });
  }

  /* ================================================================ */

  function init() {
    if (reduced) {
      // still let the page breathe, just don't move anything
      gsap.set('.card__veil', { opacity: 0 });
      return;
    }
    initLenis();
    initIntro();
    initCards();
    initMagnetic();
    initStickers();
    initTagline();

    // fonts change metrics; recalc once they've landed
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    }
    window.addEventListener('load', function () {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
