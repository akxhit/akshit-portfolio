(function () {
  'use strict';

  var projects = {
    '/case-studies/prepinsta-app': {
      title: 'PrepInsta Prime Web',
      description:
        'How the revenue-driving web surfaces were rebuilt for more than 10 million monthly learners.',
      href: '/work/prepinsta-web',
      image: '/portfolio/assets/prepinsta-web-thumbnail.webp',
      alt: 'PrepInsta Prime web case study preview',
    },
    '/case-studies/prepinsta-web': {
      title: 'ZELTGOLD Jewellery Savings',
      description:
        'How a two-designer team delivered a trust-sensitive mobile app and launch site in 20 days.',
      href: '/work/zeltgold',
      video: '/portfolio/assets/zeltgold-thumbnail.mp4',
      alt: 'ZELTGOLD jewellery savings case study preview',
    },
    '/cars24': {
      title: 'InfraOne AI Labs',
      description:
        'A landing experience, identity and launch campaign for an AI education platform.',
      href: '/work/infraone',
      image: '/portfolio/assets/infraone-hq.webp',
      alt: 'InfraOne AI Labs case study preview',
    },
    '/case-studies/zeltgold': {
      title: 'Cars24 Dealer Auctions',
      description:
        'A clearer, more trustworthy auction experience built for faster decisions under pressure.',
      href: '/work/cars24',
      image: '/portfolio/assets/cars24.webp',
      alt: 'Cars24 dealer auctions case study preview',
    },
    '/case-studies/infraone': {
      title: 'PrepInsta Prime App',
      description:
        'A native learning experience designed around one obvious path from intent to progress.',
      href: '/work/prepinsta-app',
      video: '/portfolio/assets/prepinsta-mobile-thumbnail.mp4',
      alt: 'PrepInsta Prime mobile app case study preview',
    },
  };

  projects['/work/prepinsta-app'] = projects['/case-studies/prepinsta-app'];
  projects['/prepinsta-app'] = projects['/case-studies/prepinsta-app'];
  projects['/work/prepinsta-web'] = projects['/case-studies/prepinsta-web'];
  projects['/prepinsta-web'] = projects['/case-studies/prepinsta-web'];
  projects['/work/cars24'] = projects['/cars24'];
  projects['/case-studies/cars24'] = projects['/cars24'];
  projects['/work/zeltgold'] = projects['/case-studies/zeltgold'];
  projects['/zeltgold'] = projects['/case-studies/zeltgold'];
  projects['/work/infraone'] = projects['/case-studies/infraone'];
  projects['/infraone'] = projects['/case-studies/infraone'];

  function currentProject() {
    var path = window.location.pathname
      .replace(/\/index\.html$/, '')
      .replace(/\/$/, '');
    if (projects[path]) return projects[path];
    for (var key in projects) {
      if (key !== '/' && path.indexOf(key) !== -1) {
        return projects[key];
      }
    }
    return null;
  }

  function buildNavigation() {
    var nav = document.createElement('nav');
    nav.className = 'portfolio-case-nav';
    nav.setAttribute('aria-label', 'Case study navigation');
    nav.innerHTML =
      '<a class="portfolio-case-nav__back" href="/" target="_top">' +
      '<span class="portfolio-case-nav__arrow" aria-hidden="true">←</span>' +
      '<span>All work</span>' +
      '</a>';

    var progress = document.createElement('div');
    progress.className = 'portfolio-case-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', 'Page scroll progress');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', '0');
    progress.innerHTML =
      '<span class="portfolio-case-progress__value">0%</span>' +
      '<div class="portfolio-case-progress__disc">' +
      '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle class="portfolio-case-progress__track" cx="24" cy="24" r="18"></circle>' +
      '<circle class="portfolio-case-progress__ring" cx="24" cy="24" r="18"></circle>' +
      '</svg>' +
      '</div>';

    document.body.insertAdjacentElement('afterbegin', nav);
    document.body.appendChild(progress);
    initScrollProgress(progress);
  }

  function initScrollProgress(progress) {
    var ring = progress.querySelector('.portfolio-case-progress__ring');
    var value = progress.querySelector('.portfolio-case-progress__value');
    var radius = 18;
    var circumference = 2 * Math.PI * radius;
    var frame = 0;
    var drag = null;

    ring.style.strokeDasharray = String(circumference);
    ring.style.strokeDashoffset = String(circumference);

    function update() {
      frame = 0;
      var root = document.documentElement;
      var scrollable = Math.max(root.scrollHeight - window.innerHeight, 0);
      var ratio = scrollable === 0 ? 0 : window.scrollY / scrollable;
      var clamped = Math.min(Math.max(ratio, 0), 1);
      var percent = Math.round(clamped * 100);

      ring.style.strokeDashoffset = String(circumference * (1 - clamped));
      value.textContent = percent + '%';
      progress.setAttribute('aria-valuenow', String(percent));
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function clampPosition(left, top) {
      var inset = 8;
      return {
        left: Math.min(
          Math.max(left, inset),
          window.innerWidth - progress.offsetWidth - inset,
        ),
        top: Math.min(
          Math.max(top, inset),
          window.innerHeight - progress.offsetHeight - inset,
        ),
      };
    }

    progress.addEventListener('pointerdown', function (event) {
      if (event.button !== 0) return;
      var rect = progress.getBoundingClientRect();
      drag = {
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
      progress.style.left = rect.left + 'px';
      progress.style.top = rect.top + 'px';
      progress.style.right = 'auto';
      progress.style.bottom = 'auto';
      progress.classList.add('is-dragging');
      progress.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    progress.addEventListener('pointermove', function (event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      var position = clampPosition(
        event.clientX - drag.offsetX,
        event.clientY - drag.offsetY,
      );
      progress.style.left = position.left + 'px';
      progress.style.top = position.top + 'px';
    });

    function stopDragging(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      progress.classList.remove('is-dragging');
      if (progress.hasPointerCapture(event.pointerId)) {
        progress.releasePointerCapture(event.pointerId);
      }
      drag = null;
    }

    progress.addEventListener('pointerup', stopDragging);
    progress.addEventListener('pointercancel', stopDragging);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', function () {
      if (progress.style.left) {
        var rect = progress.getBoundingClientRect();
        var position = clampPosition(rect.left, rect.top);
        progress.style.left = position.left + 'px';
        progress.style.top = position.top + 'px';
      }
      requestUpdate();
    });

    update();
  }

  function buildNextProject(project) {
    if (document.querySelector('.portfolio-next')) return;

    var section = document.createElement('section');
    section.className = 'portfolio-next';
    section.setAttribute('aria-labelledby', 'portfolio-next-title');
    var media = project.video
      ? '<video class="portfolio-next__video" src="' +
        project.video +
        '" aria-label="' +
        project.alt +
        '" muted loop autoplay playsinline preload="metadata"></video>'
      : '<img class="portfolio-next__image" src="' +
        project.image +
        '" alt="' +
        project.alt +
        '" loading="lazy">';

    section.innerHTML =
      '<div class="portfolio-next__inner">' +
      '<span class="portfolio-next__eyebrow">Keep exploring</span>' +
      '<a class="portfolio-next__card" href="' +
      project.href +
      '" target="_top">' +
      '<div class="portfolio-next__media">' +
      media +
      '</div>' +
      '<div class="portfolio-next__copy">' +
      '<div>' +
      '<span class="portfolio-next__eyebrow">Next case study</span>' +
      '<h2 class="portfolio-next__title" id="portfolio-next-title">' +
      project.title +
      '</h2>' +
      '<p class="portfolio-next__description">' +
      project.description +
      '</p>' +
      '</div>' +
      '<span class="portfolio-next__action">Read case study <span aria-hidden="true">→</span></span>' +
      '</div>' +
      '</a>' +
      '</div>';

    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      var main = document.querySelector('main, #main');
      if (main && main.parentNode) {
        main.parentNode.insertBefore(section, main.nextSibling);
      } else {
        document.body.appendChild(section);
      }
    }
  }

  function buildFooter() {
    if (document.querySelector('.portfolio-case-footer')) return;

    var footer = document.createElement('footer');
    footer.className = 'portfolio-case-footer';
    footer.innerHTML =
      '<div class="portfolio-case-footer__inner">' +
      '<div class="portfolio-case-footer__identity">' +
      '<span class="portfolio-case-footer__eyebrow">Selected work</span>' +
      '<strong>Akshit Manik</strong>' +
      '<p>Product designer working across mobile and web.</p>' +
      '</div>' +
      '<div class="portfolio-case-footer__links">' +
      '<a href="mailto:akshitmanik.design@gmail.com">akshitmanik.design@gmail.com</a>' +
      '<a href="/" target="_top">All work <span aria-hidden="true">↗</span></a>' +
      '</div>' +
      '</div>';
    document.body.appendChild(footer);
  }

  function loadCat() {
    if (document.querySelector('script[data-portfolio-cat-loader]')) return;

    window.SITE = window.SITE || {};
    window.SITE.cat = {
      enabled: true,
      label: 'You like cats?',
      corner: 'bottom-left',
      followByDefault: false,
      remember: true,
      clickable: true,
      idleBehavior: 'sleep',
      size: 1,
      speed: 10,
      fleeDistance: 120,
      fleeSpeed: 1.35,
      zIndex: 999,
      sprite:
        'https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif',
    };

    var script = document.createElement('script');
    script.setAttribute('data-portfolio-cat-loader', 'true');
    script.src = '/portfolio/cat.js';
    document.body.appendChild(script);
  }

  var observerAttached = false;
  function startObserver() {
    if (observerAttached || !window.MutationObserver || !document.body) return;
    observerAttached = true;
    var scheduleRaf = 0;
    var observer = new MutationObserver(function () {
      var project = currentProject();
      if (!project) return;
      if (
        !document.querySelector('.portfolio-case-nav') ||
        !document.querySelector('.portfolio-next') ||
        !document.querySelector('.portfolio-case-footer')
      ) {
        if (!scheduleRaf) {
          scheduleRaf = window.requestAnimationFrame(function () {
            scheduleRaf = 0;
            init();
          });
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    var project = currentProject();
    if (!project) return;
    if (window.location.pathname.indexOf('/cars24') === 0) {
      document.documentElement.classList.add('portfolio-chrome-dark');
    }
    if (!document.querySelector('.portfolio-case-nav')) buildNavigation();
    if (!document.querySelector('.portfolio-next')) buildNextProject(project);
    if (!document.querySelector('.portfolio-case-footer')) buildFooter();
    loadCat();
    startObserver();
  }

  function scheduleInit() {
    window.requestAnimationFrame(init);
    window.setTimeout(init, 500);
    window.setTimeout(init, 1200);
    window.setTimeout(init, 2500);
    window.setTimeout(init, 4000);
  }

  if (document.readyState === 'complete') scheduleInit();
  else {
    window.addEventListener('load', scheduleInit, { once: true });
    window.setTimeout(scheduleInit, 1000);
  }
})();
