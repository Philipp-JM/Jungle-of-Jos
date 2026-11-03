(function () {
  var defaultTitle = 'Ready for the trek?';

  function renderCta(mount) {
    var title = mount.dataset.title || defaultTitle;
    var section = document.createElement('section');
    section.className = 'tour-cta';

    var heading = document.createElement('h2');
    heading.textContent = title;

    var buttons = document.createElement('div');
    buttons.className = 'contact-buttons';
    buttons.innerHTML =
      '<a target="_blank" rel="noopener noreferrer" href="https://wa.me/6282277752204" class="btn btn-whatsapp btn-large">Message on WhatsApp</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jungle_of_jos/" class="btn btn-instagram btn-large">Follow on Instagram</a>';

    // Same phone/location row as the contact section in index.html.
    // Icons: "phone" and "map-pin" from Lucide (lucide.dev, ISC license).
    var info = document.createElement('ul');
    info.className = 'contact-info';
    info.innerHTML =
      '<li class="contact-info-item">' +
        '<svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />' +
        '</svg>' +
        '<span class="contact-info-label">Call or text</span>' +
        '<a class="contact-info-value" href="tel:+6282277752204" aria-label="Call Jos: +62 822-7775-2204">+62 822-7775-2204</a>' +
      '</li>' +
      '<li class="contact-info-item">' +
        '<svg class="contact-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />' +
          '<circle cx="12" cy="10" r="3" />' +
        '</svg>' +
        '<span class="contact-info-label">Location</span>' +
        '<span class="contact-info-value">Bukit Lawang<br>Sumatra, Indonesia</span>' +
      '</li>';

    section.appendChild(heading);
    section.appendChild(buttons);
    section.appendChild(info);
    mount.replaceWith(section);
  }

  document.querySelectorAll('.cta-mount').forEach(renderCta);
}());
