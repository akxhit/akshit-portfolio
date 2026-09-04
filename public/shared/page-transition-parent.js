(function () {
  'use strict';

  try {
    if (window.sessionStorage.getItem('portfolio-page-transition') !== 'enter')
      return;
    var background = window.sessionStorage.getItem('portfolio-page-background');
    window.sessionStorage.removeItem('portfolio-page-transition');
    window.sessionStorage.removeItem('portfolio-page-background');
    if (background) document.documentElement.style.backgroundColor = background;
    document.documentElement.classList.add('is-page-transition-entering');
    window.setTimeout(function () {
      document.documentElement.classList.remove('is-page-transition-entering');
      document.documentElement.style.removeProperty('background-color');
    }, 760);
  } catch {
    // Navigation remains fully functional when session storage is unavailable.
  }
})();
