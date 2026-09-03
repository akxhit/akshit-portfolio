(function () {
  "use strict";

  try {
    if (window.sessionStorage.getItem("portfolio-page-transition") !== "enter") return;
    window.sessionStorage.removeItem("portfolio-page-transition");
    document.documentElement.classList.add("is-page-transition-entering");
    window.setTimeout(function () {
      document.documentElement.classList.remove("is-page-transition-entering");
    }, 760);
  } catch {
    // Navigation remains fully functional when session storage is unavailable.
  }
})();
