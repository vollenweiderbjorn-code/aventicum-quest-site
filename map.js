/* ═══════════════════════════════════════════════════════════════
   AVENTICUM QUEST : carte des 8 stations (chargée à la demande)

   Chargé par main.js quand la section approche (rootMargin 600px).
   Charge Leaflet 1.9.4 hébergé en local (vendor/leaflet/) puis lit stations.json :
     [{ id, lat, lng, img, w800, type: "obs|qcm|steps",
        name: {fr,en,de}, end?: [lat,lng] }]
   La station 3 est un tronçon : marqueur au début de la rue,
   tracé qui passe par `end` avant de rejoindre la station 4.
   État actif partagé : bouton de liste, marqueur, fiche.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var AQ = window.AQ = window.AQ || {};
  if (AQ.mapStarted) return;
  AQ.mapStarted = true;

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Leaflet 1.9.4 (licence BSD-2 : vendor/leaflet/LICENSE), identique octet pour octet à la version d'unpkg
  var LEAFLET_CSS = { href: 'vendor/leaflet/leaflet.css' };
  var LEAFLET_JS = { src: 'vendor/leaflet/leaflet.js' };
  /* Fournisseurs de tuiles. CARTO n'est utilisé que sur le vrai domaine (aventicumquest.ch et www),
     et seulement si une clé est renseignée (cartoKey dans CONFIG, main.js) : partout ailleurs
     (localhost, adresse du réseau local, aperçus) c'est Esri, pour que les prévisualisations marchent.
     CONFIG.tileProvider : 'auto' (défaut), ou 'esri' / 'carto' pour forcer un fournisseur. */
  var CFG = window.AQ_CONFIG || {};
  var TILE_PROVIDERS = {
    esri: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors',
      maxNativeZoom: 16
    },
    carto: {
      // Style sombre « Dark Matter » (raster). {r} vaut « @2x » sur écrans à haute densité. Clé : paramètre key.
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key={key}',
      subdomains: 'abcd',
      // Attribution exigée par CARTO : visible sur la carte, avec les deux liens
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution/" target="_blank" rel="noopener">CARTO</a>',
      maxNativeZoom: 20
    }
  };
  function pickTileProvider(host, cfg) {
    cfg = cfg || {};
    var wanted = cfg.tileProvider || 'auto';
    var name = wanted === 'auto' ? (/^(www\.)?aventicumquest\.ch$/i.test(host || '') ? 'carto' : 'esri') : wanted;
    if (name === 'carto' && !cfg.cartoKey) name = 'esri';   // sans clé, CARTO ne sert qu'une tuile « API KEY REQUIRED »
    return TILE_PROVIDERS[name] ? name : 'esri';
  }
  AQ.pickTileProvider = pickTileProvider;
  AQ.tileProviders = TILE_PROVIDERS;
  var TILE_NAME = pickTileProvider(window.location.hostname, CFG);
  var TILE = TILE_PROVIDERS[TILE_NAME];

  function loadCss(o) {
    return new Promise(function (resolve, reject) {
      var l = doc.createElement('link');
      l.rel = 'stylesheet'; l.href = o.href;
      l.onload = resolve; l.onerror = reject;
      doc.head.appendChild(l);
    });
  }
  function loadJs(o) {
    return new Promise(function (resolve, reject) {
      var s = doc.createElement('script');
      s.src = o.src;
      s.onload = resolve; s.onerror = reject;
      doc.head.appendChild(s);
    });
  }

  Promise.all([loadCss(LEAFLET_CSS), loadJs(LEAFLET_JS), AQ.stations()]).then(function (res) {
    var stations = res[2];
    if (!stations || !window.L) return;
    init(window.L, stations);
  }).catch(function () {
    var el = doc.querySelector('.map-loading');
    if (el) el.textContent = '';
  });

  function init(L, stations) {
    var mapEl = doc.getElementById('map');
    var wrap = doc.getElementById('map-wrap');
    var card = doc.getElementById('station-card');
    if (!mapEl || !wrap || !card) return;

    var n = stations.length;
    var lang = function () { return AQ.getLang ? AQ.getLang() : 'fr'; };
    var tr = function (k) { return (AQ.t && AQ.t(k)) || ''; };
    var pad2 = function (v) { return v < 10 ? '0' + v : String(v); };
    var animate = !reduce;

    /* Carte */
    mapEl.classList.add('tiles-' + TILE_NAME);   // le réglage de luminosité des tuiles dépend du fournisseur (styles.css)
    var map = L.map(mapEl, {
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      tap: false,
      zoomControl: false,
      attributionControl: false,
      keyboard: true,
      zoomSnap: 0.25,
      minZoom: 12,
      maxZoom: 17
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    // Sur mobile, la fiche occupe le bas de la carte : l'attribution passe en haut à gauche
    var narrowAtLoad = window.matchMedia('(max-width: 719px)').matches;
    L.control.attribution({ position: narrowAtLoad ? 'topleft' : 'bottomright', prefix: '<a href="https://leafletjs.com">Leaflet</a>' }).addTo(map);
    L.tileLayer(TILE.url, {
      maxNativeZoom: TILE.maxNativeZoom,
      maxZoom: 17,
      subdomains: TILE.subdomains || 'abc',
      key: TILE_NAME === 'carto' ? CFG.cartoKey : '',
      attribution: TILE.attribution
    }).addTo(map);

    /* Tracé : stations dans l'ordre réel, avec le tronçon de la station 3 */
    var route = [];
    stations.forEach(function (s) {
      route.push([s.lat, s.lng]);
      if (s.end) route.push(s.end);
    });

    /* Cadrage : la fiche (bas gauche) ne doit pas masquer le tracé */
    function fit() {
      var narrow = window.matchMedia('(max-width: 719px)').matches;
      var cardRect = card.getBoundingClientRect();
      var mapRect = wrap.getBoundingClientRect();
      var left = narrow ? 24 : Math.round(cardRect.right - mapRect.left) + 24;
      var bottom = narrow ? Math.round(mapRect.bottom - cardRect.top) + 16 : 24;
      map.invalidateSize();
      map.fitBounds(L.latLngBounds(route), { paddingTopLeft: [left, 28], paddingBottomRight: [28, bottom], animate: false });
    }
    fit();

    var line = L.polyline(route, { color: '#E8B04A', weight: 2, opacity: 1, lineCap: 'round', lineJoin: 'round', smoothFactor: 0, interactive: false }).addTo(map);

    /* Marqueurs */
    var revealed = stations.map(function () { return !animate; });
    var active = 0;
    var markers = [];
    function icon(i) {
      var on = i === active;
      var small = window.matchMedia('(max-width: 719px)').matches;
      var size = on ? (small ? 34 : 40) : (small ? 24 : 30);
      return L.divIcon({
        className: 'aq-marker' + (on ? ' is-active' : '') + (revealed[i] ? '' : ' is-hidden'),
        html: '<span>' + (i + 1) + '</span>',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    }
    stations.forEach(function (s, i) {
      var m = L.marker([s.lat, s.lng], {
        icon: icon(i),
        keyboard: true,
        riseOnHover: true,
        title: s.name[lang()] || s.name.fr,
        alt: s.name[lang()] || s.name.fr
      }).addTo(map);
      m.on('click', function () { setActive(i, true); });
      markers.push(m);
    });

    /* État actif partagé */
    var btns = Array.prototype.slice.call(doc.querySelectorAll('.station-btn'));
    var cImg = doc.getElementById('card-img');
    var cNum = doc.getElementById('card-num');
    var cName = doc.getElementById('card-name');
    var cType = doc.getElementById('card-type');
    var cPh = doc.getElementById('card-ph');
    var cPhN = doc.getElementById('card-ph-n');

    function renderCard() {
      var s = stations[active];
      var name = s.name[lang()] || s.name.fr;
      cNum.textContent = pad2(active + 1) + ' / ' + pad2(n);
      cName.textContent = name;
      cType.textContent = tr('map.types.' + s.type);
      var box = cImg.parentNode;
      if (s.img) {
        box.classList.remove('is-empty');
        cPh.hidden = true;
        cImg.hidden = false;
        cImg.alt = name;
        var base = 'assets/' + s.img;
        cImg.srcset = base + '-400.webp 400w, ' + base + '-800.webp ' + (s.w800 || 800) + 'w';
        cImg.src = base + '-400.webp';
      } else {
        // Pas de photo pour cette station : fond neutre sombre avec son numéro (même hauteur que les photos)
        box.classList.add('is-empty');
        cImg.hidden = true;
        cImg.alt = '';
        cImg.removeAttribute('srcset');
        cImg.removeAttribute('src');
        cPhN.textContent = pad2(active + 1);
        cPh.hidden = false;
      }
    }

    function setActive(i, pan) {
      active = (i + n) % n;
      btns.forEach(function (b, j) { b.setAttribute('aria-pressed', j === active ? 'true' : 'false'); });
      markers.forEach(function (m, j) {
        m.setIcon(icon(j));
        m.setZIndexOffset(j === active ? 1000 : 0);
      });
      renderCard();
      if (pan) map.panTo(markers[active].getLatLng(), { animate: !reduce });
    }

    btns.forEach(function (b, j) { b.addEventListener('click', function () { setActive(j, true); }); });
    doc.getElementById('card-prev').addEventListener('click', function () { setActive(active - 1, true); });
    doc.getElementById('card-next').addEventListener('click', function () { setActive(active + 1, true); });

    doc.addEventListener('aq:langchange', function () {
      renderCard();
      markers.forEach(function (m, j) {
        var nm = stations[j].name[lang()] || stations[j].name.fr;
        var el = m.getElement();
        if (el) { el.title = nm; el.alt = nm; }
      });
    });

    var pending = typeof AQ.pending === 'number' ? AQ.pending : 0;
    setActive(pending, pending !== 0);
    mapEl.classList.add('is-ready');
    AQ.mapReady = true;

    window.addEventListener('resize', function () { map.invalidateSize(); });

    /* Animation d'entrée : tracé puis marqueurs un par un */
    if (animate && 'IntersectionObserver' in window) {
      var path = line.getElement();
      var len = 0;
      if (path && path.getTotalLength) {
        len = path.getTotalLength();
        path.style.strokeDasharray = len + ' ' + len;
        path.style.strokeDashoffset = len;
      }
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (path && len) {
          path.getBoundingClientRect();
          path.style.transition = 'stroke-dashoffset 1.8s ease';
          path.style.strokeDashoffset = 0;
          window.setTimeout(function () {
            path.style.transition = '';
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          }, 1900);
        }
        markers.forEach(function (m, i) {
          window.setTimeout(function () {
            revealed[i] = true;
            var el = m.getElement();
            if (el) el.classList.remove('is-hidden');
          }, 300 + 160 * i);
        });
      }, { threshold: 0.35 });
      io.observe(wrap);
    } else {
      revealed = revealed.map(function () { return true; });
    }
  }
})();
