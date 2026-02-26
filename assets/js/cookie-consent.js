/**
 * Cookie Consent + Google Consent Mode v2
 * krvinka.cz
 */

(function () {
  var STORAGE_KEY = 'krvinka_cookie_consent';
  var GA_ID = 'G-R512VVXLSY';

  // --- Helper: read stored decision ---
  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  // --- Update Google Consent Mode ---
  function grantAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  function denyAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  }

  // --- Build and show the banner ---
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML =
      '<div id="cookie-consent-inner">' +
        '<p id="cookie-consent-text">' +
          'Používáme analytické cookies (Google Analytics), abychom zjistili, jak stránky používáte, ' +
          'a mohli je zlepšovat. Data se neshromažďují bez vašeho souhlasu. ' +
          '<a href="ochrana-soukromi.html">Více informací</a>.' +
        '</p>' +
        '<div id="cookie-consent-buttons">' +
          '<button id="cookie-btn-accept">Souhlasím</button>' +
          '<button id="cookie-btn-decline">Odmítnout</button>' +
        '</div>' +
      '</div>';

    // Styles
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
      'background:#fff;border-top:3px solid #FF2A8B;' +
      'box-shadow:0 -2px 16px rgba(0,0,0,0.10);' +
      'font-family:inherit;';

    var inner = banner.querySelector('#cookie-consent-inner');
    inner.style.cssText =
      'max-width:1140px;margin:0 auto;padding:16px 24px;' +
      'display:flex;align-items:center;gap:24px;flex-wrap:wrap;';

    var text = banner.querySelector('#cookie-consent-text');
    text.style.cssText =
      'flex:1;margin:0;font-size:14px;color:#2A2A2A;line-height:1.5;min-width:200px;';

    var link = text.querySelector('a');
    link.style.cssText = 'color:#FF2A8B;text-decoration:underline;';

    var btnWrap = banner.querySelector('#cookie-consent-buttons');
    btnWrap.style.cssText = 'display:flex;gap:10px;flex-shrink:0;';

    var btnAccept = banner.querySelector('#cookie-btn-accept');
    btnAccept.style.cssText =
      'background:#FF2A8B;color:#fff;border:none;border-radius:6px;' +
      'padding:10px 22px;font-size:14px;font-weight:700;cursor:pointer;' +
      'text-transform:uppercase;letter-spacing:1px;transition:background .2s;';
    btnAccept.onmouseover = function () { this.style.background = '#E5257D'; };
    btnAccept.onmouseout  = function () { this.style.background = '#FF2A8B'; };

    var btnDecline = banner.querySelector('#cookie-btn-decline');
    btnDecline.style.cssText =
      'background:transparent;color:#2A2A2A;border:2px solid #B39AA7;border-radius:6px;' +
      'padding:10px 22px;font-size:14px;font-weight:700;cursor:pointer;' +
      'text-transform:uppercase;letter-spacing:1px;transition:all .2s;';
    btnDecline.onmouseover = function () { this.style.borderColor = '#2A2A2A'; };
    btnDecline.onmouseout  = function () { this.style.borderColor = '#B39AA7'; };

    // Events
    btnAccept.addEventListener('click', function () {
      setConsent('granted');
      grantAnalytics();
      hideBanner(banner);
    });

    btnDecline.addEventListener('click', function () {
      setConsent('denied');
      denyAnalytics();
      hideBanner(banner);
    });

    document.body.appendChild(banner);
  }

  function hideBanner(banner) {
    banner.style.transition = 'opacity .3s';
    banner.style.opacity = '0';
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 300);
  }

  // --- Init ---
  function init() {
    var consent = getConsent();

    if (consent === 'granted') {
      // User already accepted → grant immediately
      grantAnalytics();
    } else if (consent === 'denied') {
      // User already declined → nothing to do (default is denied)
    } else {
      // No decision yet → show banner
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { showBanner(); });
      } else {
        showBanner();
      }
    }
  }

  init();
})();
