(function () {
  "use strict";

  var projects = {
    "/case-studies/prepinsta-app": {
      title: "PrepInsta Prime Web",
      description: "How the revenue-driving web surfaces were rebuilt for more than 10 million monthly learners.",
      href: "/work/prepinsta-web",
      image: "/portfolio/assets/prepinsta-web.webp",
      alt: "PrepInsta Prime web case study preview"
    },
    "/case-studies/prepinsta-web": {
      title: "ZELTGOLD Jewellery Savings",
      description: "How a two-designer team delivered a trust-sensitive mobile app and launch site in 20 days.",
      href: "/work/zeltgold",
      image: "/portfolio/assets/zeltgold.webp",
      alt: "ZELTGOLD jewellery savings case study preview"
    },
    "/cars24": {
      title: "PrepInsta Prime App",
      description: "A native learning experience designed around one obvious path from intent to progress.",
      href: "/work/prepinsta-app",
      image: "/portfolio/assets/prepinsta-app.webp",
      alt: "PrepInsta Prime mobile app case study preview"
    },
    "/case-studies/zeltgold": {
      title: "Cars24 Dealer Auctions",
      description: "A clearer, more trustworthy auction experience built for faster decisions under pressure.",
      href: "/work/cars24",
      image: "/portfolio/assets/cars24.webp",
      alt: "Cars24 dealer auctions case study preview"
    }
  };

  function currentProject() {
    var path = window.location.pathname
      .replace(/\/index\.html$/, "")
      .replace(/\/$/, "");
    return projects[path] || null;
  }

  function buildNavigation() {
    var nav = document.createElement("nav");
    nav.className = "portfolio-case-nav";
    nav.setAttribute("aria-label", "Case study navigation");
    nav.innerHTML =
      '<a class="portfolio-case-nav__back" href="/" target="_top">' +
        '<span class="portfolio-case-nav__arrow" aria-hidden="true">←</span>' +
        '<span>All work</span>' +
      '</a>';

    var progress = document.createElement("div");
    progress.className = "portfolio-case-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = '<div class="portfolio-case-progress__fill"></div>';

    document.body.insertAdjacentElement("afterbegin", nav);
    document.body.appendChild(progress);
  }

  function buildNextProject(project) {
    var section = document.createElement("section");
    section.className = "portfolio-next";
    section.setAttribute("aria-labelledby", "portfolio-next-title");
    section.innerHTML =
      '<div class="portfolio-next__inner">' +
        '<span class="portfolio-next__eyebrow">Keep exploring</span>' +
        '<a class="portfolio-next__card" href="' + project.href + '" target="_top">' +
          '<div class="portfolio-next__media">' +
            '<img class="portfolio-next__image" src="' + project.image + '" alt="' + project.alt + '" loading="lazy">' +
          '</div>' +
          '<div class="portfolio-next__copy">' +
            '<div>' +
              '<span class="portfolio-next__eyebrow">Next case study</span>' +
              '<h2 class="portfolio-next__title" id="portfolio-next-title">' + project.title + '</h2>' +
              '<p class="portfolio-next__description">' + project.description + '</p>' +
            '</div>' +
            '<span class="portfolio-next__action">Read case study <span aria-hidden="true">→</span></span>' +
          '</div>' +
        '</a>' +
      '</div>';

    var footer = document.querySelector("footer");
    if (footer) footer.insertAdjacentElement("beforebegin", section);
    else document.body.appendChild(section);
  }

  function loadCat() {
    window.SITE = window.SITE || {};
    window.SITE.cat = {
      enabled: true,
      label: "You like cats?",
      corner: "bottom-left",
      followByDefault: false,
      remember: true,
      clickable: true,
      idleBehavior: "sleep",
      size: 1,
      speed: 10,
      fleeDistance: 120,
      fleeSpeed: 1.35,
      zIndex: 999,
      sprite: "https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif"
    };

    var script = document.createElement("script");
    script.src = "/portfolio/cat.js";
    document.body.appendChild(script);
  }

  function init() {
    if (document.querySelector(".portfolio-case-nav")) return;
    var project = currentProject();
    if (!project) return;
    if (window.location.pathname.indexOf("/cars24") === 0) {
      document.documentElement.classList.add("portfolio-chrome-dark");
    }
    buildNavigation();
    buildNextProject(project);
    loadCat();
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", function () {
    window.requestAnimationFrame(init);
  }, { once: true });
})();
