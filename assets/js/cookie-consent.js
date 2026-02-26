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

  function showPopup() {
    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'cc-overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:99998;' +
      'background:rgba(42,42,42,0.55);backdrop-filter:blur(3px);' +
      'opacity:0;transition:opacity .35s ease;';

    // Modal
    var modal = document.createElement('div');
    modal.id = 'cc-modal';
    modal.style.cssText =
      'position:fixed;z-index:99999;' +
      'top:50%;left:50%;transform:translate(-50%,-48%);' +
      'background:#fff;border-radius:16px;' +
      'box-shadow:0 8px 48px rgba(0,0,0,0.22);' +
      'padding:40px 36px 32px;max-width:420px;width:calc(100vw - 40px);' +
      'text-align:center;font-family:inherit;' +
      'opacity:0;transition:opacity .35s ease, transform .35s ease;';

    modal.innerHTML =
      '<div style="font-size:52px;line-height:1;margin-bottom:16px;">🍪</div>' +
      '<h2 style="margin:0 0 14px;font-size:20px;color:#2A2A2A;line-height:1.3;">' +
        'Máme tu skvělé krvinky…<br>teda sušenky.' +
      '</h2>' +
      '<p style="margin:0 0 10px;font-size:15px;color:#555;line-height:1.6;">' +
        'Pomáhají nám zjistit, co vás na dobrodružství s Krvinkou baví nejvíc.' +
      '</p>' +
      '<p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.6;">' +
        'Dáte jim svolení plout dál? ' +
        '<a href="ochrana-soukromi.html" style="color:#FF2A8B;text-decoration:underline;">Více informací.</a>' +
      '</p>' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<button id="cc-btn-accept" style="' +
          'background:#FF2A8B;color:#fff;border:none;border-radius:8px;' +
          'padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;' +
          'text-transform:uppercase;letter-spacing:1px;transition:background .2s,transform .1s;">'+
          'Ano, svolení dávám!' +
        '</button>' +
        '<button id="cc-btn-decline" style="' +
          'background:transparent;color:#B39AA7;border:none;border-radius:8px;' +
          'padding:10px 24px;font-size:13px;font-weight:600;cursor:pointer;' +
          'text-decoration:underline;transition:color .2s;">' +
          'Ne, raději odmítám' +
        '</button>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
        modal.style.opacity = '1';
        modal.style.transform = 'translate(-50%,-50%)';
      });
    });

    // Button hover effects
    var btnAccept = modal.querySelector('#cc-btn-accept');
    btnAccept.onmouseover = function () { this.style.background = '#E5257D'; this.style.transform = 'translateY(-1px)'; };
    btnAccept.onmouseout  = function () { this.style.background = '#FF2A8B'; this.style.transform = 'translateY(0)'; };

    var btnDecline = modal.querySelector('#cc-btn-decline');
    btnDecline.onmouseover = function () { this.style.color = '#2A2A2A'; };
    btnDecline.onmouseout  = function () { this.style.color = '#B39AA7'; };

    // Events
    btnAccept.addEventListener('click', function () {
      setConsent('granted');
      grantAnalytics();
      hidePopup(overlay, modal);
    });

    btnDecline.addEventListener('click', function () {
      setConsent('denied');
      denyAnalytics();
      hidePopup(overlay, modal);
    });
  }

  function hidePopup(overlay, modal) {
    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%,-48%)';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }, 350);
  }

  function init() {
    var consent = getConsent();
    if (consent === 'granted') {
      grantAnalytics();
    } else if (consent !== 'denied') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showPopup);
      } else {
        showPopup();
      }
    }
  }

  init();
})();
