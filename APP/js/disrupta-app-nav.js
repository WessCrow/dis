/**
 * Marca o item ativo no float-dash do app (evaluation → evaluation-result).
 * Uso: <body data-nav-active="calculadora">
 */
(function () {
  'use strict';
  var active = document.body.getAttribute('data-nav-active');
  if (!active) return;

  document.querySelectorAll('[data-nav-item]').forEach(function (el) {
    var isActive = el.getAttribute('data-nav-item') === active;
    el.classList.toggle('is-active', isActive);
    if (el.tagName === 'A') {
      if (isActive) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    }
  });
})();
