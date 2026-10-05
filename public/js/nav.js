(function () {
  // Path from the current page back to the site root, taken from this
  // script's own src: "js/nav.js" -> "", "../js/nav.js" -> "../". This works
  // for pages in any subfolder (tours/, info/, ...) without listing folders.
  var scriptSrc = document.currentScript.getAttribute('src');
  var rootPrefix = scriptSrc.slice(0, scriptSrc.lastIndexOf('js/'));
  var isHomePage = rootPrefix === '' && (
    window.location.pathname.endsWith('/') ||
    window.location.pathname.endsWith('/index.html')
  );
  var homePath = isHomePage ? '' : rootPrefix + 'index.html';

  document.querySelectorAll('.nav-mount').forEach(function (mount) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<header class="site-header">' +
        '<nav class="navbar">' +
          '<a href="' + (isHomePage ? '#hero' : homePath + '#hero') + '" class="nav-logo">Jungle of Jos</a>' +
          '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation" aria-label="Toggle navigation menu">' +
            '<span class="nav-toggle-bar"></span>' +
            '<span class="nav-toggle-bar"></span>' +
            '<span class="nav-toggle-bar"></span>' +
          '</button>' +
          '<ul class="nav-links" id="primary-navigation">' +
            '<li><a href="' + rootPrefix + 'about.html">About</a></li>' +
            '<li><a href="' + rootPrefix + 'tours/all-tours.html">Tours</a></li>' +
            '<li class="nav-dropdown">' +
              '<div class="nav-dropdown-row">' +
                '<a href="' + rootPrefix + 'info/index.html">Info</a>' +
                '<button type="button" class="nav-dropdown-toggle" aria-expanded="false" aria-controls="info-submenu" aria-label="Show Info pages">' +
                  '<span class="nav-dropdown-arrow" aria-hidden="true"></span>' +
                '</button>' +
              '</div>' +
              '<ul class="nav-submenu" id="info-submenu">' +
                '<li><a href="' + rootPrefix + 'info/getting-there.html">Getting to Bukit Lawang</a></li>' +
                '<li><a href="' + rootPrefix + 'info/national-park.html">The Jungle &amp; National Park</a></li>' +
                '<li><a href="' + rootPrefix + 'info/wildlife.html">Orangutans &amp; Wildlife</a></li>' +
                '<li><a href="' + rootPrefix + 'info/packing-list.html">Packing List</a></li>' +
                '<li><a href="' + rootPrefix + 'info/travel-tips.html">Travel Tips &amp; Visa</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="' + rootPrefix + 'faq.html">FAQ</a></li>' +
            '<li><a href="' + (isHomePage ? '#contact' : homePath + '#contact') + '">Contact</a></li>' +
          '</ul>' +
        '</nav>' +
      '</header>';
    // Replace the mount itself (not just its contents) so it doesn't
    // linger in the DOM as an empty wrapper div once the header is inserted.
    mount.replaceWith(wrapper.firstElementChild);
  });

  // Auto-hide header: visible at first, but hides itself after a few
  // seconds of no scrolling, hides immediately on scroll-down (leaving with
  // the rest of the page), and reappears - floating over the page content -
  // on any scroll-up, wherever on the page that happens.
  document.querySelectorAll('.site-header').forEach(function (header) {
    var HIDE_AFTER_IDLE_MS = 2500;
    var SCROLL_THRESHOLD = 4; // ignores sub-pixel/trackpad jitter
    var TOP_ZONE = 10; // while this close to the very top, behave like a normal (non-hiding) header
    var idleTimer = null;
    var lastScrollY = window.scrollY;

    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    window.addEventListener('resize', function () {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    });

    // True while the mobile menu or a dropdown submenu is open, so the
    // header doesn't hide itself from under the user.
    function menuIsOpen() {
      return header.querySelector('.nav-links.is-open, .nav-dropdown.is-open') !== null;
    }

    function isAtTop() {
      return window.scrollY <= TOP_ZONE;
    }

    function armIdleHide() {
      clearTimeout(idleTimer);
      if (menuIsOpen() || isAtTop()) return; // stay visible at the top, and don't fight an open mobile menu
      idleTimer = setTimeout(function () {
        header.classList.add('is-hidden');
      }, HIDE_AFTER_IDLE_MS);
    }

    window.addEventListener('scroll', function () {
      if (menuIsOpen()) return;
      var currentScrollY = window.scrollY;

      if (isAtTop()) {
        header.classList.remove('is-hidden');
        lastScrollY = currentScrollY;
        clearTimeout(idleTimer); // no idle auto-hide while at the very top
        return;
      }

      var delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) > SCROLL_THRESHOLD) {
        header.classList.toggle('is-hidden', delta > 0);
        lastScrollY = currentScrollY;
        armIdleHide();
      }
    }, { passive: true });

    armIdleHide();
  });

  // Hamburger toggle for narrow screens - opens/closes the nav-links dropdown.
  document.querySelectorAll('.nav-toggle').forEach(function (toggle) {
    var links = toggle.closest('.navbar').querySelector('.nav-links');

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu once a link is used, since these are same-page anchors
    // and section links that wouldn't otherwise cause the dropdown to close.
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Dropdown submenus (currently only "Info"). The parent link still goes to
  // the hub page; the small arrow button next to it opens the submenu. On
  // wide screens it also opens on mouse hover (CSS only), inside the mobile
  // menu it expands in place.
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
    var button = dropdown.querySelector('.nav-dropdown-toggle');

    function setOpen(isOpen) {
      dropdown.classList.toggle('is-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    }

    button.addEventListener('click', function () {
      setOpen(!dropdown.classList.contains('is-open'));
    });

    // Close on a click anywhere outside the dropdown.
    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) setOpen(false);
    });

    // Close with Escape and give focus back to the arrow button.
    dropdown.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && dropdown.classList.contains('is-open')) {
        setOpen(false);
        button.focus();
      }
    });

    // Close once keyboard focus moves on past the submenu.
    dropdown.addEventListener('focusout', function (event) {
      if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) setOpen(false);
    });

    // Close after a submenu link is used.
    dropdown.querySelectorAll('.nav-submenu a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
  });
}());
