/* ═══════════════════════════════════════════════════════════════
   AVENTICUM QUEST : main.js
   Header, langue, menu mobile, apparitions, hero.
   Les sections suivantes (FAQ, barre d'achat, carte) s'ajoutent
   à l'étape 3. La carte vit dans map.js, chargé à la demande.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Configuration ─────────────────────────────────────────── */
  var CONFIG = {
    // Bandeau Noël (bons cadeaux) : désactivé tant que les paiements sont inactifs.
    // Passer à true pour l'afficher du 15 nov. au 31 déc. (?xmas=1 force l'affichage).
    xmasBanner: false,
    // Fournisseur de tuiles de la carte (voir TILE_PROVIDERS dans map.js).
    // 'auto' : CARTO sur aventicumquest.ch et www.aventicumquest.ch (si cartoKey est renseignée), Esri ailleurs.
    tileProvider: 'auto',
    // Clé CARTO publique, à restreindre aux sites aventicumquest.ch et www.aventicumquest.ch dans le tableau de bord CARTO.
    // Si elle est vide, la carte reste sur Esri partout.
    cartoKey: 'cb1_4ccp_1_2769d55f59aa66dbef1ffea0'
  };
  window.AQ_CONFIG = CONFIG;

  var doc = document;
  var root = doc.documentElement;
  var LANGS = ['fr', 'en', 'de'];
  var LANG_KEY = 'aq-lang';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* ── Langue ────────────────────────────────────────────────── */
  var I18N = window.AQ_I18N || {};
  var currentLang = 'fr';

  function lookup(dict, key) {
    if (!dict) return undefined;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var node = dict;
    var parts = key.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return typeof node === 'string' ? node : undefined;
  }

  function detectLang() {
    // Pages sans traduction (jeu de piste, merci) : la coquille reste en français
    if (window.AQ_FR_ONLY) return 'fr';
    var saved = load(LANG_KEY);
    if (LANGS.indexOf(saved) !== -1) return saved;
    var nav = String(navigator.language || 'fr').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : 'fr';
  }

  function applyLang(lang) {
    var dict = I18N[lang];
    if (!dict) return;
    currentLang = lang;
    root.lang = lang;

    $$('[data-i18n]').forEach(function (el) {
      var v = lookup(dict, el.getAttribute('data-i18n'));
      if (v !== undefined) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = lookup(dict, el.getAttribute('data-i18n-html'));
      if (v !== undefined) el.innerHTML = v;
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var v = lookup(dict, el.getAttribute('data-i18n-alt'));
      if (v !== undefined) el.setAttribute('alt', v);
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = lookup(dict, el.getAttribute('data-i18n-aria'));
      if (v !== undefined) el.setAttribute('aria-label', v);
    });

    if (dict.meta && !window.AQ_PAGE) {
      doc.title = dict.meta.title;
      var md = $('meta[name="description"]');
      if (md) md.setAttribute('content', dict.meta.desc);
      ['meta[property="og:description"]', 'meta[name="twitter:description"]'].forEach(function (q) {
        var el = $(q);
        if (el && dict.meta.og) el.setAttribute('content', dict.meta.og);
      });
    }

    var code = $('.lang-code');
    if (code) code.textContent = lang.toUpperCase();
    $$('.lang-opt').forEach(function (opt) {
      opt.setAttribute('aria-checked', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    // Pages à moteur propre (window.AQ_PAGE) : c'est leur moteur qui publie l'événement, avec son dictionnaire
    if (!window.AQ_PAGE) doc.dispatchEvent(new CustomEvent('aq:langchange', { detail: { lang: lang, dict: dict } }));
  }

  // Pages secondaires : leur propre moteur (window.AQ_PAGE_SETLANG) traduit le contenu de la page
  function pageSetLang(lang) {
    if (typeof window.AQ_PAGE_SETLANG === 'function') window.AQ_PAGE_SETLANG(lang);
  }
  function syncLangUi(lang) {
    var code = $('.lang-code');
    if (code) code.textContent = String(lang).toUpperCase();
    $$('.lang-opt').forEach(function (opt) {
      opt.setAttribute('aria-checked', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }
  doc.addEventListener('aq:langchange', function (e) { if (e.detail) syncLangUi(e.detail.lang); });

  // Exposé pour les autres scripts de la page (carte, moteurs de langue des pages secondaires)
  window.AQ = window.AQ || {};
  window.AQ.detectLang = detectLang;
  window.AQ.getLang = function () { return currentLang; };
  window.AQ.t = function (key) { return lookup(I18N[currentLang], key); };

  /* ── Sélecteur de langue ───────────────────────────────────── */
  function initLangMenu() {
    var toggle = $('.lang-toggle');
    var menu = $('.lang-menu');
    if (!toggle || !menu) return;
    var items = $$('.lang-opt', menu);

    function open() {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      var checked = items.filter(function (i) { return i.getAttribute('aria-checked') === 'true'; })[0];
      (checked || items[0]).focus();
    }
    function close(returnFocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () { if (menu.hidden) open(); else close(true); });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && menu.hidden) { e.preventDefault(); open(); }
    });

    items.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var lang = item.getAttribute('data-lang');
        store(LANG_KEY, lang);
        applyLang(lang);
        pageSetLang(lang);
        close(true);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
        else if (e.key === 'Tab') { close(false); }
      });
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { e.stopPropagation(); close(true); }
    });
    doc.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.lang')) close(false);
    });
  }

  /* ── Header : fond au scroll ───────────────────────────────── */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ── Menu mobile (panneau plein écran, focus piégé) ────────── */
  function initMenu() {
    var burger = $('.burger');
    var panel = $('#menu-panel');
    if (!burger || !panel) return;
    var closeBtn = $('.menu-close', panel);

    function focusables() {
      return $$('a[href], button:not([disabled])', panel).filter(function (el) { return el.offsetParent !== null; });
    }
    function open() {
      panel.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      doc.body.classList.add('is-locked');
      root.classList.add('menu-open');
      closeBtn.focus();
    }
    function close(returnFocus) {
      if (panel.hidden) return;
      panel.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      doc.body.classList.remove('is-locked');
      root.classList.remove('menu-open');
      if (returnFocus) burger.focus();
    }

    burger.addEventListener('click', open);
    closeBtn.addEventListener('click', function () { close(true); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { close(false); }); });

    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(true); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Si la fenêtre s'élargit, le panneau n'a plus lieu d'être
    window.matchMedia('(min-width: 1120px)').addEventListener('change', function (mq) {
      if (mq.matches) close(false);
    });
  }

  /* ── Apparitions au scroll ─────────────────────────────────── */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var els = $$('[data-reveal]');
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add('reveal-pending'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Hero : halo qui suit le pointeur + compteur ───────────── */
  function initHero() {
    var hero = $('.hero');
    if (!hero || reduceMotion) return;

    var halo = $('.hero-halo', hero);
    if (halo && window.matchMedia('(pointer: fine)').matches) {
      var raf = 0;
      hero.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = window.requestAnimationFrame(function () {
          var r = hero.getBoundingClientRect();
          halo.style.transform = 'translate(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px)';
          raf = 0;
        });
      });
    }

    var timer = $('.hero-timer-value', hero);
    if (timer && window.matchMedia('(min-width: 1120px)').matches) {
      var left = 7200;
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      var render = function () {
        timer.textContent = pad(Math.floor(left / 3600)) + ':' + pad(Math.floor((left % 3600) / 60)) + ':' + pad(left % 60);
      };
      window.setTimeout(function () {
        window.setInterval(function () {
          if (doc.hidden || left <= 0) return;
          left -= 1;
          render();
        }, 1000);
      }, 1500);
    }
  }

  /* ── Stations : données partagées, liste, chargement de la carte ── */
  var stationsPromise = null;
  function loadStations() {
    if (!stationsPromise) {
      stationsPromise = fetch('stations.json').then(function (r) { return r.json(); }).catch(function () { return null; });
    }
    return stationsPromise;
  }
  window.AQ.stations = loadStations;

  function renderStationList() {
    var btns = $$('.station-btn');
    if (!btns.length) return;
    loadStations().then(function (list) {
      if (!list) return;
      list.forEach(function (s, i) {
        var b = btns[i];
        if (!b) return;
        b.querySelector('.station-name').textContent = s.name[currentLang] || s.name.fr;
        var tag = lookup(I18N[currentLang], 'map.short.' + s.type);
        if (tag) b.querySelector('.station-tag').textContent = tag;
      });
    });
  }
  doc.addEventListener('aq:langchange', renderStationList);

  function loadMap() {
    if (window.AQ.mapRequested) return;
    window.AQ.mapRequested = true;
    var s = doc.createElement('script');
    s.src = 'map.js';
    s.defer = true;
    doc.head.appendChild(s);
  }
  function initMap() {
    var wrap = $('#map-wrap');
    if (!wrap) return;
    // Un clic sur la liste avant que la carte soit prête : on retient la station et on charge
    $$('.station-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!window.AQ.mapReady) { window.AQ.pending = parseInt(b.getAttribute('data-i'), 10) || 0; loadMap(); }
      });
    });
    if (!('IntersectionObserver' in window)) { loadMap(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { loadMap(); io.disconnect(); }
    }, { rootMargin: '600px 0px' });
    io.observe(wrap);
  }

  /* ── FAQ : un seul volet ouvert (repli pour les navigateurs sans <details name>) ── */
  function initFaq() {
    var items = $$('.faq-item');
    if (!items.length || 'name' in doc.createElement('details')) return;
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (o) { if (o !== item) o.open = false; });
      });
    });
  }

  /* ── Barre d'achat mobile ──────────────────────────────────── */
  function initBuyBar() {
    var bar = $('#buy-bar');
    if (!bar) return;
    var link = $('a', bar);
    var mq = window.matchMedia('(max-width: 1119px)');
    var ticking = false;
    function update() {
      ticking = false;
      var show = mq.matches && window.scrollY > 0.85 * window.innerHeight && !root.classList.contains('menu-open');
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      link.tabIndex = show ? 0 : -1;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ── Bandeau Noël : éteint par défaut (CONFIG.xmasBanner) ──── */
  function initXmas() {
    if (!CONFIG.xmasBanner) return;
    var bar = $('#xmas-bar');
    if (!bar) return;
    var now = new Date();
    var inWindow = now.getMonth() === 11 || (now.getMonth() === 10 && now.getDate() >= 15);
    var forced = false;
    var closed = false;
    try { forced = new URLSearchParams(window.location.search).get('xmas') === '1'; } catch (e) {}
    try { closed = sessionStorage.getItem('aq-xmas-closed') === '1'; } catch (e) {}
    if (!(inWindow || forced) || closed) return;
    bar.hidden = false;
    root.classList.add('has-xmas');
    $('#xmas-close').addEventListener('click', function () {
      bar.hidden = true;
      root.classList.remove('has-xmas');
      try { sessionStorage.setItem('aq-xmas-closed', '1'); } catch (e) {}
    });
  }

  /* ── Démarrage ─────────────────────────────────────────────── */
  function init() {
    var lang0 = detectLang();
    applyLang(lang0);
    pageSetLang(lang0);
    initLangMenu();
    initHeader();
    initMenu();
    initReveal();
    initHero();
    renderStationList();
    initMap();
    initFaq();
    initBuyBar();
    initXmas();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
