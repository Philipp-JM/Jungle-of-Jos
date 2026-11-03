(function () {
  // Same relative-path logic as js/nav.js: derived from this script's own src
  var scriptSrc = document.currentScript.getAttribute('src');
  var rootPrefix = scriptSrc.slice(0, scriptSrc.lastIndexOf('js/'));

  document.querySelectorAll('.footer-mount').forEach(function (mount) {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<p class="site-footer-items">' +
      '<span>&copy; <span id="current-year">' + new Date().getFullYear() +
      '</span> Jungle of Jos. All rights reserved.</span>' +
      '<a href="' + rootPrefix + 'privacy.html">Privacy Policy</a>' +
      // "phone" icon from Lucide (lucide.dev, ISC license), same as in index.html
      '<a href="tel:+6282277752204" class="site-footer-phone" aria-label="Call Jos: +62 822-7775-2204">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 ' +
      '17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351' +
      'a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>' +
      '+62 822-7775-2204</a>' +
      '</p>';
    mount.replaceWith(footer);
  });
}());
