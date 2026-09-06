/* ------------------------------------------------------------------
   main.js — renders everything from window.SITE, then wires up the
   panels, the contact popup, copy-to-clipboard, the clock and the
   scroll-to-top button.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var S = window.SITE;
  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* =============================== ICONS ============================== */

  var ICONS = {
    check:
      '<svg viewBox="0 0 18 18" width="18" height="17" aria-hidden="true">' +
      '<circle cx="9" cy="9" r="7.4" fill="currentColor"/>' +
      '<path d="M5.6 9.2 8 11.5l4.4-5" fill="none" stroke="#fff" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow:
      '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">' +
      '<path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus:
      '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">' +
      '<path d="M8 3.2v9.6M3.2 8h9.6" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round"/></svg>',
    linkedin:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<path fill="currentColor" d="M5.4 7.4H2.9V17h2.5V7.4Zm.2-2.7a1.45 1.45 0 1 0-2.9 0 1.45 1.45 0 0 0 2.9 0ZM17 11.6c0-2.5-1.3-3.7-3.1-3.7-1.4 0-2.1.8-2.4 1.4V7.4H9v9.6h2.5v-5.4c0-1.1.5-1.7 1.4-1.7.9 0 1.5.6 1.5 1.7V17H17v-5.4Z"/></svg>',
    x:
      '<svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">' +
      '<path fill="currentColor" d="M14.7 2.8h2.6l-5.7 6.5 6.7 8.9h-5.2l-4.1-5.4-4.7 5.4H1.7l6.1-7-6.4-8.4h5.4l3.7 4.9 4.2-4.9Zm-.9 13.8h1.4L6.3 4.2H4.8l9 12.4Z"/></svg>',
    github:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<path fill="currentColor" d="M10 1.6a8.4 8.4 0 0 0-2.7 16.4c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1.1-2.8-1.1-.4-1-.9-1.2-.9-1.2-.8-.5 0-.5 0-.5.8.1 1.3.9 1.3.9.7 1.3 1.9 1 2.4.7 0-.6.3-1 .5-1.2-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.9a7.8 7.8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.2-2 3.9-3.8 4.1.3.3.6.8.6 1.7v2.4c0 .2.1.5.6.4A8.4 8.4 0 0 0 10 1.6Z"/></svg>',
    dribbble:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M3 7.6c4.6.6 9-.4 11.6-3.2M2.6 12.2c4.4-1.3 9 .3 11.2 4.1M7.2 2.6c3.2 4 4.9 8.8 5 14.6" ' +
      'fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    behance:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<path fill="currentColor" d="M6.6 4.6c1.7 0 2.9.8 2.9 2.4 0 1-.5 1.6-1.2 1.9 1 .3 1.6 1.1 1.6 2.3 0 1.8-1.4 2.7-3.2 2.7H1.8V4.6h4.8Zm-.4 3.7c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9H4v1.8h2.2Zm.2 3.9c.8 0 1.3-.3 1.3-1s-.5-1-1.3-1H4v2h2.4ZM12.4 5.6h5v1.3h-5V5.6Zm5.9 5.7c0-2-1.3-3.5-3.4-3.5-2 0-3.5 1.5-3.5 3.5s1.4 3.4 3.5 3.4c1.7 0 2.9-.8 3.3-2.2h-1.9c-.2.4-.7.7-1.3.7-.9 0-1.5-.5-1.6-1.4h4.9v-.5Zm-4.9-.7c.2-.8.8-1.3 1.5-1.3.8 0 1.4.5 1.5 1.3h-3Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<rect x="3" y="3" width="14" height="14" rx="4.2" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="10" cy="10" r="3.2" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="14.2" cy="5.8" r="1" fill="currentColor"/></svg>',
    mail:
      '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">' +
      '<rect x="2.5" y="4.5" width="15" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M3.5 6.5 10 11l6.5-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  /* ============================== PROJECTS ============================ */

  function renderProjects() {
    var wrap = $('#projects');
    if (!wrap) return;
    wrap.innerHTML = '';
    var deferredVideos = [];

    S.projects.forEach(function (p) {
      var a = el('a', 'card');
      a.href = p.href;
      a.setAttribute('aria-label', p.title + ' — case study');
      if (p.bg) a.style.setProperty('--card-bg', p.bg);
      if (p.textColor) a.style.setProperty('--card-copy', p.textColor);
      a.dataset.surface = p.surface;
      a.dataset.rotation = p.silkRotation || 0;
      // React Bits Silk uses the brand palette behind the thumbnail.
      if (p.bgColors && p.bgColors.length) {
        a.setAttribute('data-colors', p.bgColors.join(','));
      }

      var track = el('div', 'card__track');

      var content = el('div', 'card__content');

      if (p.image || p.video) {
        var shot = el(
          'div',
          'card__shot' + (p.fit === 'contain' ? ' card__shot--contain' : ''),
        );
        if (p.video) {
          var video = el('video');
          video.dataset.src = p.video;
          if (p.image) video.poster = p.image;
          video.setAttribute('aria-label', p.alt || p.title);
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.preload = 'none';
          deferredVideos.push(video);
          shot.appendChild(video);
        } else {
          var img = el('img');
          img.src = p.image;
          img.alt = p.alt || p.title;
          img.loading = 'lazy';
          img.decoding = 'async';
          shot.appendChild(img);
        }
        content.appendChild(shot);
      }

      var meta = el('div', 'card__meta');
      meta.appendChild(el('h2', 'card__title', p.title));
      meta.appendChild(el('p', 'card__description', p.description));
      content.appendChild(meta);

      var bgwrap = el('div', 'card__bgwrap');
      bgwrap.appendChild(el('div', 'card__bg'));

      track.appendChild(content);
      track.appendChild(bgwrap);
      a.appendChild(track);
      wrap.appendChild(a);
    });

    function loadVideo(video) {
      if (!video.dataset.src) return;
      video.src = video.dataset.src;
      delete video.dataset.src;
      video.load();
      var playback = video.play();
      if (playback && playback.catch) playback.catch(function () {});
    }

    if (!window.IntersectionObserver) {
      deferredVideos.forEach(loadVideo);
      return;
    }

    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '400px 0px' },
    );
    deferredVideos.forEach(function (video) {
      videoObserver.observe(video);
    });
  }

  /* ============================== SIDEBAR ============================= */

  function renderIdentity() {
    if (document.querySelector('.studio')) return;
    var badges = $('#badges');
    (S.badges || []).forEach(function (b) {
      var n = el('span', 'badge');
      n.innerHTML = ICONS.check + '<span></span>';
      n.lastChild.textContent = b;
      badges.appendChild(n);
    });

    var h1 = $('#bigname');
    h1.appendChild(el('span', null, S.name.first));
    h1.appendChild(el('span', null, S.name.last));

    var tag = $('#tagline');
    S.tagline.forEach(function (part) {
      if (part.text) {
        tag.appendChild(el('span', null, part.text));
        return;
      }
      var a = el('a', 'hw');
      a.href = '#projects';

      var inner = el('span', 'hw__inner');

      if (part.art) {
        var art = el('span', 'hw__art');
        art.setAttribute('aria-hidden', 'true');
        var im = el('img');
        im.src = part.art;
        im.alt = '';
        art.appendChild(im);
        inner.appendChild(art);
      }
      inner.appendChild(el('span', 'hw__word', part.mark));
      var shine = el('span', 'hw__shine', part.mark);
      shine.setAttribute('aria-hidden', 'true');
      inner.appendChild(shine);

      a.appendChild(inner);
      // punctuation rides inside the link so no word-gap opens before it
      if (part.punct) a.appendChild(el('span', 'hw__punct', part.punct));

      tag.appendChild(a);
    });

    $('#services-label').textContent = S.services.label;
    var grid = $('#services-grid');
    S.services.items.forEach(function (s) {
      grid.appendChild(el('span', null, s));
    });
  }

  function renderAbout() {
    var a = S.about;
    $('#ab-emoji').textContent = a.emoji || '👋';

    if (a.photo) {
      var box = $('#ab-photo');
      box.hidden = false;
      var im = el('img');
      im.src = a.photo;
      im.alt = S.name.first + ' ' + S.name.last;
      box.appendChild(im);
    }

    $('#ab-bio').textContent = a.bio;
    $('#ab-listTitle').textContent = a.listTitle;

    var items = $('#ab-items');
    (a.list || []).forEach(function (t) {
      items.appendChild(el('li', null, t));
    });

    $('#ab-logosTitle').textContent = a.logosTitle;
    var logos = $('#ab-logos');
    (a.logos || []).forEach(function (t) {
      logos.appendChild(el('li', null, t));
    });
  }

  function renderFaqs() {
    $('#faq-title').textContent = S.faqs.title;
    var list = $('#faq-list');

    S.faqs.items.forEach(function (item, i) {
      var row = el('div', 'faq');

      var q = el('button', 'faq__q');
      q.type = 'button';
      q.setAttribute('aria-expanded', 'false');
      q.setAttribute('aria-controls', 'faq-a-' + i);
      q.innerHTML = '<span></span>' + ICONS.plus;
      q.firstChild.textContent = item.q;

      var ans = el('div', 'faq__a');
      ans.id = 'faq-a-' + i;
      var inner = el('div');
      inner.appendChild(el('p', null, item.a));
      ans.appendChild(inner);

      q.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = row.classList.toggle('is-open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      row.appendChild(q);
      row.appendChild(ans);
      list.appendChild(row);
    });
  }

  function renderContact() {
    $('#cp-spots-label').textContent = S.spotsLeft || '';
    $('#emailbtn-text').textContent = S.email;

    if (S.calendarUrl) {
      var t = $('.cp-toggle');
      t.hidden = false;
      $('.cp-call iframe').dataset.src = S.calendarUrl;
    }

    var socials = $('#socials');
    (S.socials || []).forEach(function (s) {
      var a = el('a', 'social');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', s.name);
      a.innerHTML = ICONS[s.icon] || ICONS.mail;
      socials.appendChild(a);
    });
  }

  /* =============================== FOOTER ============================= */

  function renderFooter() {
    $('#place').textContent = S.footer.location;
    $('#copyright').textContent = S.footer.copyright;
    var email = $('#footer-email');
    email.href = 'mailto:' + S.email;
    $('#footer-email-address').textContent = S.email;
    var socials = $('#footer-socials');
    S.socials.forEach(function (social) {
      var link = el('a', 'closing-social', social.name);
      link.href = social.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.appendChild(el('span', '', '↗'));
      socials.appendChild(link);
    });
    var clock = $('#clock');
    function tick() {
      clock.textContent = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: S.footer.timeZone || 'Asia/Kolkata',
      }).format(new Date());
    }
    tick();
    var timer = setInterval(tick, 30000);
    window.addEventListener('pagehide', function () {
      clearInterval(timer);
    });
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) {
        tick();
        timer = setInterval(tick, 30000);
      }
    });
    $('.totop').addEventListener('click', function () {
      var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: reduced });
      else
        window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    });
  }

  /* ========================= PANELS & POPUP =========================== */

  var scrim = $('#scrim');
  var openThing = null; // the element currently carrying .is-open

  // the pill cluster and the CTA block are separate stacking contexts;
  // whichever holds the open overlay has to come to the front
  function front(group, on) {
    var host = group.closest && group.closest('.navpills, .ctablock');
    if (host) host.classList.toggle('is-front', on);
  }

  function closeOpen() {
    if (!openThing) return;
    openThing.classList.remove('is-open');
    var trigger = openThing.querySelector('.pill, .cta');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    front(openThing, false);
    openThing = null;
    scrim.hidden = true;
  }

  function open(group) {
    if (openThing === group) {
      closeOpen();
      return;
    }
    closeOpen();
    group.classList.add('is-open');
    var trigger = group.querySelector('.pill, .cta');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    front(group, true);
    openThing = group;
    scrim.hidden = false;
  }

  function wirePanels() {
    Array.prototype.forEach.call(
      document.querySelectorAll('.pillgroup'),
      function (group) {
        group.querySelector('.pill').addEventListener('click', function (e) {
          e.stopPropagation();
          open(group);
        });
        group.querySelector('.panel').addEventListener('click', function (e) {
          e.stopPropagation();
        });
      },
    );

    var ctawrap = $('.ctawrap');
    $('.cta').addEventListener('click', function (e) {
      e.stopPropagation();
      open(ctawrap);
    });
    $('.contactpop').addEventListener('click', function (e) {
      e.stopPropagation();
    });

    // Close on any press that isn't inside the open overlay or on a
    // trigger. Done at the document level rather than on .scrim so it
    // can't depend on the scrim winning a stacking-order contest — it
    // must not, or it would block clicks inside the panels themselves.
    document.addEventListener('pointerdown', function (e) {
      if (!openThing) return;
      if (
        e.target.closest &&
        e.target.closest('.panel, .contactpop, .pill, .cta')
      )
        return;
      closeOpen();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeOpen();
    });
  }

  /* --------- contact form / call toggle --------- */

  function wireContactForm() {
    var toggle = $('.cp-toggle');
    var form = $('#contact-form');
    var call = $('.cp-call');

    if (toggle) {
      toggle.addEventListener('click', function () {
        var showingCall = !call.hidden;
        call.hidden = showingCall;
        var iframe = call.querySelector('iframe');
        if (!showingCall && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          delete iframe.dataset.src;
        }
        form.hidden = !showingCall;
        $('.cp-toggle__label').textContent = showingCall
          ? 'Book a Call instead'
          : 'Use the form instead';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').trim();
      var email = (data.get('email') || '').trim();
      var msg = (data.get('message') || '').trim();
      var status = $('#cp-status');

      if (!name || !email || !msg) {
        status.textContent = 'Fill in name, email and a short message.';
        return;
      }

      // No backend here — hand it to the mail client.
      // Swap this for a fetch() to Formspree/Resend/your API when ready.
      var body =
        'From: ' +
        name +
        ' <' +
        email +
        '>\n' +
        (data.get('budget') ? 'Budget: defined\n' : '') +
        '\n' +
        msg;
      var href =
        'mailto:' +
        S.email +
        '?subject=' +
        encodeURIComponent('Project enquiry — ' + name) +
        '&body=' +
        encodeURIComponent(body);

      status.textContent = 'Opening your mail app…';
      window.location.href = href;
    });
  }

  /* --------- copy email --------- */

  function wireCopyEmail() {
    var btn = $('#emailbtn');
    var timer;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.classList.remove('is-copied');
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(S.email).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = S.email;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          done();
        } catch (err) {
          /* noop */
        }
        document.body.removeChild(ta);
      }
    });
  }

  /* ================================ BOOT ============================== */

  function init() {
    if (!S) return;
    renderProjects();
    renderIdentity();
    renderAbout();
    renderFaqs();
    renderContact();
    renderFooter();
    wirePanels();
    wireContactForm();
    wireCopyEmail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
