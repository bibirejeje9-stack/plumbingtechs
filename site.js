/* Plumbing Techs of Michigan — shared site script */
(function () {
  "use strict";

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---- Icon hydration: inline <use> symbol content so icons never depend on
     fragment URLs (which break when the host injects a <base href>). ---- */
  function hydrateIcons() {
    var SVGNS = 'http://www.w3.org/2000/svg';
    $$('use').forEach(function (u) {
      var ref = u.getAttribute('href') || u.getAttribute('xlink:href') || '';
      var id = ref.charAt(0) === '#' ? ref.slice(1) : ref.split('#').pop();
      if (!id) return;
      var sym = document.getElementById(id);
      var svg = u.closest ? u.closest('svg') : null;
      if (!sym || !svg) return;
      if (!svg.getAttribute('viewBox')) svg.setAttribute('viewBox', sym.getAttribute('viewBox') || '0 0 24 24');
      var g = document.createElementNS(SVGNS, 'g');
      Array.prototype.slice.call(sym.childNodes).forEach(function (n) { g.appendChild(n.cloneNode(true)); });
      svg.replaceChild(g, u);
    });
  }
  hydrateIcons();

  /* ---- Header scroll state ---- */
  var header = $('#header'), topBtn = $('#topBtn');
  if (header) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      header.classList.toggle('scrolled', y > 20);
      if (topBtn) topBtn.classList.toggle('show', y > 700);
    }, { passive: true });
  }
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---- Smooth scrolling for in-page anchors ---- */
  function goTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var h = document.getElementById('header');
    var off = (h ? h.offsetHeight : 0) + 12;
    var y = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - off;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }
  function currentFile() {
    var f = location.pathname.split('/').pop() || '';
    if (!f && document.body.classList.contains('intro')) f = 'index.html';
    return f;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var hashIdx = href.indexOf('#');
    if (hashIdx === -1) return;
    var path = href.slice(0, hashIdx);
    var id = href.slice(hashIdx + 1);
    /* handle plain '#id' and same-file 'thispage.html#id' links in place */
    var same = (path === '') || (path.replace(/^\.\//, '') === currentFile());
    if (!same) return;
    e.preventDefault();
    var menu = document.getElementById('menu');
    if (menu) { menu.classList.remove('open'); document.body.classList.remove('nav-open'); }
    if (id === '' || id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    goTo(id);
  });

  /* ---- Mobile menu ---- */
  var burger = $('#burger'), menu = $('#menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
  }

  /* ---- FAQ accordion ---- */
  $$('.faq-item').forEach(function (item) {
    var q = $('.faq-q', item), a = $('.faq-a', item);
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      $$('.faq-item').forEach(function (o) {
        o.classList.remove('open');
        var oa = $('.faq-a', o); if (oa) oa.style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealed = false;
  function initReveal() {
    if (revealed) return;
    revealed = true;
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var idx = Array.prototype.slice.call(en.target.parentNode.children).indexOf(en.target);
          en.target.style.transitionDelay = (Math.min(idx, 6) * 0.07) + 's';
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Contact form (front-end demo) ---- */
  var form = $('#contactForm'), ok = $('#formSuccess');
  if (form && ok) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.style.display = 'block';
      form.reset();
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---- Footer year ---- */
  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Home intro (5s logo animation -> "Open Website") ---- */
  var pre = $('#preloader'), toggle = $('#openToggle'), opened = false;
  function openSite() {
    if (opened) return;
    opened = true;
    if (pre) {
      pre.classList.add('exit');
      setTimeout(function () { pre.style.display = 'none'; }, 900);
    }
    document.body.classList.remove('locked');
    initReveal();
  }
  if (toggle) {
    toggle.addEventListener('change', function () { if (toggle.checked) openSite(); });
  }

  if (document.body.classList.contains('intro')) {
    /* If the home page is opened via a deep link (index.html#reviews), skip the intro. */
    if (location.hash && location.hash.length > 1) {
      if (toggle) toggle.checked = true;
      openSite();
      setTimeout(function () {
        var id = location.hash.slice(1);
        if (id && id !== 'top') goTo(id);
      }, 500);
    }
  } else {
    initReveal();
  }
})();
