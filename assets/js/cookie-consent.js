/**
 * Cookie Consent + Google Consent Mode v2
 * krvinka.cz
 */

(function () {
  var STORAGE_KEY = 'krvinka_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function grantAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  }

  function denyAnalytics() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
  }

  function grantPixel() {
    if (typeof fbq === 'function') {
      fbq('consent', 'grant');
      fbq('track', 'PageView');
    }
  }

  function revokePixel() {
    if (typeof fbq === 'function') {
      fbq('consent', 'revoke');
    }
  }

  function showPopup() {
    var popup = document.createElement('div');
    popup.id = 'cc-popup';
    popup.style.cssText =
      'position:fixed;bottom:24px;right:24px;z-index:99999;' +
      'background:#fff;border-radius:16px;' +
      'box-shadow:0 4px 32px rgba(0,0,0,0.18);' +
      'padding:24px;max-width:320px;width:calc(100vw - 48px);' +
      'font-family:inherit;' +
      'opacity:0;transform:translateY(16px);' +
      'transition:opacity .35s ease,transform .35s ease;';

    popup.innerHTML =
      '<div style="font-size:36px;line-height:1;margin-bottom:12px;">🍪</div>' +
      '<p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#2A2A2A;line-height:1.4;">' +
        'Máme tu skvělé krvinky…&nbsp;teda sušenky.' +
      '</p>' +
      '<p style="margin:0 0 18px;font-size:13px;color:#555;line-height:1.6;">' +
        'Pomáhají nám zjistit, co vás na dobrodružství s Krvinkou baví nejvíc.' +
        '<br><br>' +
        'Dáte jim svolení plout dál? ' +
        '<a href="ochrana-soukromi.html" style="color:#FF2A8B;text-decoration:underline;">Více informací.</a>' +
      '</p>' +
      '<div style="display:flex;flex-direction:column;gap:8px;">' +
        '<button id="cc-btn-accept" style="' +
          'background:#FF2A8B;color:#fff;border:none;border-radius:8px;' +
          'padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;' +
          'text-transform:uppercase;letter-spacing:1px;transition:background .2s,transform .1s;">' +
          'Ano, svolení dávám!' +
        '</button>' +
        '<button id="cc-btn-decline" style="' +
          'background:transparent;color:#B39AA7;border:none;' +
          'padding:6px;font-size:12px;font-weight:600;cursor:pointer;' +
          'text-decoration:underline;transition:color .2s;">' +
          'Ne, raději odmítám' +
        '</button>' +
      '</div>';

    document.body.appendChild(popup);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
      });
    });

    var btnAccept = popup.querySelector('#cc-btn-accept');
    btnAccept.onmouseover = function () { this.style.background = '#E5257D'; this.style.transform = 'translateY(-1px)'; };
    btnAccept.onmouseout  = function () { this.style.background = '#FF2A8B'; this.style.transform = 'translateY(0)'; };

    var btnDecline = popup.querySelector('#cc-btn-decline');
    btnDecline.onmouseover = function () { this.style.color = '#2A2A2A'; };
    btnDecline.onmouseout  = function () { this.style.color = '#B39AA7'; };

    btnAccept.addEventListener('click', function () {
      setConsent('granted');
      grantAnalytics();
      grantPixel();
      hidePopup(popup);
    });

    btnDecline.addEventListener('click', function () {
      setConsent('denied');
      denyAnalytics();
      hidePopup(popup);
    });
  }

  function hidePopup(popup) {
    popup.style.opacity = '0';
    popup.style.transform = 'translateY(16px)';
    setTimeout(function () {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, 350);
  }

  function init() {
    var consent = getConsent();
    if (consent === 'granted') {
      grantAnalytics();
      grantPixel();
    } else {
      revokePixel();
    }
    if (consent !== 'granted' && consent !== 'denied') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showPopup);
      } else {
        showPopup();
      }
    }
  }

  init();
})();
