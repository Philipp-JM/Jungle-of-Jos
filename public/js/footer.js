(function () {
  // Same relative-path logic as js/nav.js: derived from this script's own src
  var scriptSrc = document.currentScript.getAttribute('src');
  var rootPrefix = scriptSrc.slice(0, scriptSrc.lastIndexOf('js/'));

  document.querySelectorAll('.footer-mount').forEach(function (mount) {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<p>&copy; <span id="current-year">' + new Date().getFullYear() +
      '</span> Jungle of Jos. All rights reserved. &middot; ' +
      '<a href="' + rootPrefix + 'privacy.html">Privacy Policy</a></p>';
    mount.replaceWith(footer);
  });
}());
