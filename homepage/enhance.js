/* Load the decorative desktop experience after the core portfolio is usable.
   Phones keep the lightweight card layout and never download this bundle. */
(function () {
  'use strict';

  var desktop =
    !window.matchMedia || window.matchMedia('(min-width: 810px)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (!desktop || saveData) return;

  function load(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function start() {
    load('vendor/gsap.min.js')
      .then(function () {
        return Promise.all([
          load('vendor/ScrollTrigger.min.js'),
          load('vendor/SplitText.min.js'),
          load('vendor/Draggable.min.js'),
          load('vendor/InertiaPlugin.min.js'),
          load('vendor/CustomEase.min.js'),
          load('vendor/lenis.min.js'),
        ]);
      })
      .then(function () {
        return Promise.all([
          load('gradient.js?v=silk2'),
          load('motion.js'),
          load('cat.js'),
        ]);
      })
      .catch(function () {
        // These scripts are progressive enhancement; the portfolio remains usable.
      });
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(start, { timeout: 1200 });
  } else {
    window.setTimeout(start, 250);
  }
})();
