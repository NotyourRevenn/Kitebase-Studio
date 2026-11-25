(function () {
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var tg = document.getElementById('tg');
  var themeBtn = document.getElementById('theme-toggle');

  // Theme toggle with saved preference
  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem('kitebase-theme');
  } catch (e) {}
  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.setAttribute('data-theme', savedTheme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var osDark = matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (osDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('kitebase-theme', next);
      } catch (e) {}
    });
  }

  // Mobile menu
  function menu(o) {
    body.classList.toggle('open', o);
    if (tg) tg.setAttribute('aria-expanded', String(o));
  }
  if (tg) {
    tg.addEventListener('click', function () {
      menu(!body.classList.contains('open'));
    });
  }
  document.querySelectorAll('#menu a').forEach(function (a) {
    a.addEventListener('click', function () { menu(false); });
  });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') menu(false);
  });

  // Section reveals & active nav state
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    rv.forEach(function (el) { io.observe(el); });

    var navLinks = document.querySelectorAll('.links a');
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('.hero,#services,#work,#about,#faq').forEach(function (sec) {
      so.observe(sec);
    });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  // Word-by-word pull-quote reveal
  var tl = document.getElementById('tl');
  if (tl) {
    tl.innerHTML = tl.textContent.trim().split(/\s+/).map(function (w) {
      return '<span class="w">' + w + '</span>';
    }).join(' ');
    var ws = tl.querySelectorAll('.w');
    if (reduce || !('IntersectionObserver' in window)) {
      tl.classList.add('done');
    } else {
      var wo = new IntersectionObserver(function (entries) {
        var k = 0;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (k++ * 45) + 'ms';
            entry.target.classList.add('on');
            wo.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -30% 0px' });
      ws.forEach(function (w) { wo.observe(w); });
    }
  }

  // Interactive Showcase 1: Quote Estimator
  var areaRange = document.getElementById('area-range');
  var areaVal = document.getElementById('area-val');
  var estPrice = document.getElementById('est-price');
  var estTabs = document.querySelectorAll('#est-tabs .mini-tab');
  var currentRate = 1.2;

  function updateEstimate() {
    if (!areaRange || !areaVal || !estPrice) return;
    var sqft = parseInt(areaRange.value, 10) || 1800;
    areaVal.textContent = sqft.toLocaleString('en-US');
    var mid = Math.round(sqft * currentRate);
    var low = Math.round((mid * 0.9) / 10) * 10;
    var high = Math.round((mid * 1.1) / 10) * 10;
    estPrice.textContent = '$' + low.toLocaleString('en-US') + ' – $' + high.toLocaleString('en-US');
  }

  estTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      estTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentRate = parseFloat(tab.getAttribute('data-rate')) || 1.2;
      updateEstimate();
    });
  });
  if (areaRange) {
    areaRange.addEventListener('input', updateEstimate);
    updateEstimate();
  }

  // Interactive Showcase 2: Chat / Webhook Log Switch
  var chatSwitch = document.querySelectorAll('#chat-mode button');
  var viewChat = document.getElementById('view-chat');
  var viewLog = document.getElementById('view-log');
  chatSwitch.forEach(function (btn) {
    btn.addEventListener('click', function () {
      chatSwitch.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var mode = btn.getAttribute('data-view');
      if (viewChat && viewLog) {
        viewChat.hidden = mode !== 'chat';
        viewLog.hidden = mode !== 'log';
      }
    });
  });

  // Contact form validation & submission
  var f = document.getElementById('f');
  function chk(id, eid, ok, msg) {
    var input = f.elements[id];
    var er = document.getElementById(eid);
    var valid = ok(input.value);
    er.textContent = valid ? '' : msg;
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    return valid;
  }

  if (f) {
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var okName = chk('n', 'en', function (v) { return v.trim().length > 1; }, 'Enter your name.');
      var okEmail = chk('e', 'ee', function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()); }, 'Enter a valid email address.');
      var okMsg = chk('m', 'em', function (v) { return v.trim().length > 9; }, 'Add a brief note about what you need.');
      if (!(okName && okEmail && okMsg)) return;

      var sb = document.getElementById('sb');
      sb.disabled = true;
      sb.textContent = 'Sending...';

      var fd = new FormData(f);
      var nameVal = (fd.get('n') || '').trim() || 'there';
      var emailVal = (fd.get('e') || '').trim() || 'your email';

      setTimeout(function () {
        f.style.display = 'none';
        var okBox = document.getElementById('ok');
        if (okBox) {
          var cName = document.getElementById('client-name');
          var cEmail = document.getElementById('client-email');
          if (cName) cName.textContent = nameVal;
          if (cEmail) cEmail.textContent = emailVal;
          okBox.hidden = false;
        }
      }, 450);
    });
  }
})();
