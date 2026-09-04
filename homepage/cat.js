/* ------------------------------------------------------------------
   cat.js — oneko, ported from the Framer/React component to vanilla.

   Behaviour is unchanged from the original:
     · toggle ON  → she chases the cursor (stops 48px short)
     · toggle OFF → she sits at home, and bolts if the cursor comes
                    within `fleeDistance`; once disturbed she stays
                    where she landed for 5 minutes before going home
     · idle ladder → idle → alert → tired → sleep / scratch
     · clicking her interrupts with a scratch or an alert
   Sprite frames are the standard oneko 8×4 sheet.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var FRAME = 32;
  var TICK_MS = 100;
  var RETURN_HOME_TICKS = 5 * 60 * 10; // 5 minutes of being left alone
  var STORAGE_KEY = 'neko-cat-follow-choice';

  /* column/row offsets into the sprite sheet, in frame units */
  var SPRITES = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function direction(dx, dy) {
    var a = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (a >= -22.5 && a < 22.5) return 'E';
    if (a >= 22.5 && a < 67.5) return 'SE';
    if (a >= 67.5 && a < 112.5) return 'S';
    if (a >= 112.5 && a < 157.5) return 'SW';
    if (a >= 157.5 || a < -157.5) return 'W';
    if (a >= -157.5 && a < -112.5) return 'NW';
    if (a >= -112.5 && a < -67.5) return 'N';
    return 'NE';
  }

  function init() {
    var cfg = (window.SITE && window.SITE.cat) || null;
    if (!cfg || cfg.enabled === false) return;

    // Desktop only. A cursor-following cat is meaningless without a
    // cursor, and the toggle pill eats scarce space on a phone.
    // NB: matchMedia must be called on window — detaching it into a
    // local and calling it bare throws "Illegal invocation".
    if (window.matchMedia) {
      if (window.matchMedia('(max-width: 809.98px)').matches) return;
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches)
        return;
    }

    var size = FRAME * (cfg.size || 1);
    var speed = cfg.speed == null ? 10 : cfg.speed;
    var fleeDistance = cfg.fleeDistance == null ? 120 : cfg.fleeDistance;
    var fleeSpeed = cfg.fleeSpeed == null ? 1.35 : cfg.fleeSpeed;
    var corner = cfg.corner || 'bottom-left';
    var z = cfg.zIndex == null ? 999 : cfg.zIndex;
    var reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------- DOM ---------------------------- */

    var cat = document.createElement('div');
    cat.className = 'neko';
    cat.setAttribute('aria-hidden', 'true');
    cat.style.width = size + 'px';
    cat.style.height = size + 'px';
    cat.style.backgroundImage = 'url("' + cfg.sprite + '")';
    cat.style.backgroundSize = 8 * size + 'px ' + 4 * size + 'px';
    cat.style.zIndex = String(z);
    if (cfg.clickable !== false) {
      cat.classList.add('neko--clickable');
      cat.setAttribute('role', 'button');
      cat.tabIndex = 0;
      cat.setAttribute('aria-label', 'Pet the cat');
      cat.removeAttribute('aria-hidden');
    }
    document.body.appendChild(cat);

    var pill = document.createElement('div');
    pill.className = 'nekopill nekopill--' + corner;
    pill.style.zIndex = String(z);
    pill.innerHTML =
      '<span class="nekopill__label"></span>' +
      '<button class="nekoswitch" type="button" role="switch" aria-checked="false">' +
      '<span class="nekoswitch__thumb"></span></button>';
    pill.querySelector('.nekopill__label').textContent =
      cfg.label || 'You like cats?';
    document.body.appendChild(pill);

    var sw = pill.querySelector('.nekoswitch');
    sw.setAttribute('aria-label', cfg.label || 'Follow the cursor');

    /* --------------------------- state --------------------------- */

    var following = !!cfg.followByDefault;
    if (cfg.remember !== false) {
      try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) following = saved === 'true';
      } catch (e) {
        /* private mode — just use the default */
      }
    }

    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var home = { x: 0, y: 0 };
    var pos = { x: 0, y: 0 };
    var behavior = 'idle';
    var frame = 0;
    var idleTime = 0;
    var tick = 0;
    var overrideTicks = 0;
    var fleeTicks = 0;
    var disturbed = false;
    var calmTicks = 0;
    var started = false;

    function measureHome() {
      var r = pill.getBoundingClientRect();
      var x = r.left + r.width / 2 - size / 2;
      // rest just above the pill rather than on top of it
      var y = r.top - size - 6;
      home.x = Math.max(0, Math.min(window.innerWidth - size, x));
      home.y = Math.max(0, Math.min(window.innerHeight - size, y));
      if (!started) {
        pos.x = home.x;
        pos.y = home.y;
        started = true;
      }
    }

    function paint() {
      var frames = SPRITES[behavior] || SPRITES.idle;
      var f = frames[frame % frames.length];
      cat.style.backgroundPosition = f[0] * size + 'px ' + f[1] * size + 'px';
      cat.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
    }

    function setFollowing(next) {
      following = next;
      sw.setAttribute('aria-checked', next ? 'true' : 'false');
      pill.classList.toggle('is-on', next);
      if (next) {
        disturbed = false;
        calmTicks = 0;
      }
      if (cfg.remember !== false) {
        try {
          localStorage.setItem(STORAGE_KEY, String(next));
        } catch (e) {
          /* noop */
        }
      }
    }

    /* ---------------------------- loop --------------------------- */

    function step() {
      tick += 1;

      var maxX = Math.max(0, window.innerWidth - size);
      var maxY = Math.max(0, window.innerHeight - size);

      var toMouseX = mouse.x - (pos.x + size / 2);
      var toMouseY = mouse.y - (pos.y + size / 2);
      var mouseDist = Math.hypot(toMouseX, toMouseY);

      // Reduced motion: she only moves when the visitor asked her to.
      var mayFlee = !following && !reduced;
      var shouldFlee = mayFlee && mouseDist <= fleeDistance;

      if (shouldFlee) {
        fleeTicks = 4;
        disturbed = true;
        calmTicks = 0;
      } else if (fleeTicks > 0) {
        fleeTicks -= 1;
      } else if (!following && disturbed) {
        calmTicks += 1;
        if (calmTicks >= RETURN_HOME_TICKS) {
          disturbed = false;
          calmTicks = 0;
        }
      }

      if (!following && fleeTicks > 0) {
        /* --- running away --- */
        var move = Math.max(1, speed * fleeSpeed);
        var len = Math.max(1, mouseDist);
        var ex = -toMouseX / len;
        var ey = -toMouseY / len;

        var nx = Math.min(maxX, Math.max(0, pos.x + ex * move));
        var ny = Math.min(maxY, Math.max(0, pos.y + ey * move));

        // cornered? slide along the wall instead of grinding into it
        if (Math.hypot(nx - pos.x, ny - pos.y) < move * 0.25) {
          var perpA = { x: -ey, y: ex };
          var perpB = { x: ey, y: -ex };
          var aX = Math.min(maxX, Math.max(0, pos.x + perpA.x * move));
          var aY = Math.min(maxY, Math.max(0, pos.y + perpA.y * move));
          var bX = Math.min(maxX, Math.max(0, pos.x + perpB.x * move));
          var bY = Math.min(maxY, Math.max(0, pos.y + perpB.y * move));
          var dA = Math.hypot(aX - pos.x, aY - pos.y);
          var dB = Math.hypot(bX - pos.x, bY - pos.y);
          var pick = dA >= dB ? perpA : perpB;
          ex = pick.x;
          ey = pick.y;
        }

        pos.x = Math.min(maxX, Math.max(0, pos.x + ex * move));
        pos.y = Math.min(maxY, Math.max(0, pos.y + ey * move));
        behavior = direction(ex, ey);
        frame = tick % 2;
        idleTime = 0;
        overrideTicks = 0;
      } else {
        /* --- walking to a target, or idling --- */
        var target = following
          ? { x: mouse.x - size / 2, y: mouse.y - size / 2 }
          : home;

        if (!following && disturbed) target = { x: pos.x, y: pos.y };

        var dx = target.x - pos.x;
        var dy = target.y - pos.y;
        var dist = Math.hypot(dx, dy);
        var stopAt = following ? 48 : 4;

        if (dist > 0.001 && dist > stopAt) {
          var m = Math.min(speed, dist);
          pos.x = Math.min(maxX, Math.max(0, pos.x + (dx / dist) * m));
          pos.y = Math.min(maxY, Math.max(0, pos.y + (dy / dist) * m));
          behavior = direction(dx, dy);
          frame = tick % 2;
          idleTime = 0;
          overrideTicks = 0;
        } else {
          idleTime += 1;

          if (overrideTicks > 0) {
            overrideTicks -= 1;
            frame = (frame + 1) % (SPRITES[behavior] || SPRITES.idle).length;
          } else if (idleTime < 10) {
            behavior = 'idle';
            frame = 0;
          } else if (idleTime < 20) {
            behavior = 'alert';
            frame = 0;
          } else if (idleTime < 30) {
            behavior = 'tired';
            frame = 0;
          } else {
            var r = Math.random();
            if (!following && cfg.idleBehavior === 'sit') {
              behavior = 'idle';
              overrideTicks = 2;
            } else if (r < 0.06) {
              behavior = 'scratchSelf';
              overrideTicks = 9;
            } else if (r < 0.08) {
              var walls = [
                'scratchWallN',
                'scratchWallS',
                'scratchWallE',
                'scratchWallW',
              ];
              behavior = walls[Math.floor(Math.random() * walls.length)];
              overrideTicks = 6;
            } else {
              behavior = cfg.idleBehavior === 'sit' ? 'idle' : 'sleeping';
              overrideTicks = 12;
            }
            frame = 0;
            idleTime = 20;
          }
        }
      }

      paint();
    }

    /* --------------------------- events -------------------------- */

    window.addEventListener(
      'mousemove',
      function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true },
    );

    window.addEventListener('resize', measureHome);

    sw.addEventListener('click', function () {
      setFollowing(!following);
    });

    function poke() {
      if (cfg.clickable === false) return;
      behavior = Math.random() > 0.5 ? 'scratchSelf' : 'alert';
      frame = 0;
      overrideTicks = 8;
      idleTime = 0;
      paint();
    }
    cat.addEventListener('click', poke);
    cat.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        poke();
      }
    });

    measureHome();
    setFollowing(following);
    paint();
    setInterval(step, TICK_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
