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
      '<a href="' + rootPrefix + 'privacy.html">Privacy Policy</a></p>' +
      '<p class="site-footer-note">Voluntarily created by Philipp. Feel free to ' +
      '<a href="https://github.com/Philipp-JM/Jungle-of-Jos#how-to-contribute" target="_blank" rel="noopener noreferrer">&rarr; contribute.</a></p>';
    mount.replaceWith(footer);
  });
}());
