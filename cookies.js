/* ══════════════════════════════════════════════════════════════
   AVENTICUM QUEST : bandeau cookies partagé

   À inclure en tout début de <body> :
     <script src="cookies.js"></script>
   Le bandeau est injecté à l'endroit du script (HTML en FR,
   balisé data-i18n / data-i18n-html). La traduction est faite
   par le système de langue de la page (clés cookie-text,
   cookie-accept, cookie-refuse), comme avant.
   Choix mémorisé dans localStorage['aq-cookies'].
══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const html =
    '<div id="cookie-banner" role="dialog" aria-label="Consentement cookies" aria-live="polite">' +
      '<p class="cookie-text" data-i18n-html="cookie-text">' +
        'Ce site utilise des cookies essentiels au fonctionnement. ' +
        '<a href="confidentialite.html">En savoir plus</a>.' +
      '</p>' +
      '<div class="cookie-btns">' +
        '<button class="btn-cookie btn-cookie-accept" onclick="acceptCookies()" data-i18n="cookie-accept">Accepter</button>' +
        '<button class="btn-cookie" onclick="refuseCookies()" data-i18n="cookie-refuse">Refuser</button>' +
      '</div>' +
    '</div>';

  const script = document.currentScript;
  if (script) script.insertAdjacentHTML('beforebegin', html);
  else document.body.insertAdjacentHTML('afterbegin', html);

  const banner = document.getElementById('cookie-banner');

  function store(value) {
    try { localStorage.setItem('aq-cookies', value); } catch (e) {}
  }
  function hideBanner() { banner.classList.add('hidden'); }

  window.acceptCookies = function () { store('accepted'); hideBanner(); };
  window.refuseCookies = function () { store('refused'); hideBanner(); };

  let saved = null;
  try { saved = localStorage.getItem('aq-cookies'); } catch (e) {}
  if (saved) hideBanner();
})();
