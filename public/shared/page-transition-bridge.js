(function () {
  "use strict";

  document.addEventListener("click", function (event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    var target = event.target;
    if (!target || typeof target.closest !== "function") return;
    var anchor = target.closest("a[href]");
    if (!anchor || anchor.hasAttribute("download") || anchor.target === "_blank") return;

    var destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (!/^\/(?:work(?:\/[^/]+)?|)$/.test(destination.pathname)) return;

    try {
      if (window.parent === window) return;
      event.preventDefault();
      event.stopPropagation();

      if (window.parent.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.top.location.assign(destination.href);
        return;
      }

      window.parent.sessionStorage.setItem("portfolio-page-transition", "enter");
      window.top.location.assign(destination.href);
    } catch {
      window.top.location.assign(destination.href);
    }
  }, true);
})();
