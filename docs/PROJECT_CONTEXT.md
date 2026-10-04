# Project Context: Jungle of Jos Website

This document records the purpose, constraints, architectural decisions, and
current implementation status of the website. Read it before changing the
structure, shared scripts, pricing, or public tour content.

## Client and purpose

Jos is a local jungle trekking guide based in Bukit Lawang, Sumatra, Indonesia.
The website gives him an online presence so travelers can learn about the tours
and contact him before arriving, mainly through WhatsApp and Instagram.

This is an information and marketing site. It has no booking system, backend,
payment processing, database, or CMS. Booking is handled directly with Jos.

## People and constraints

The original developer is building the site as a favor and intends to hand it
over completely. Future maintenance will likely be done by volunteers with
basic IT skills rather than professional developers.

Priorities, in order:

1. Keep recurring costs close to zero.
2. Keep maintenance understandable without specialist tooling.
3. Avoid vendor lock-in and dependencies that require regular technical upkeep.

Content updates happen occasionally, not in real time. Volunteers edit the
HTML, CSS, JavaScript, and image files directly. Jos is not expected to operate
a CMS or edit code himself.

## Architecture decisions

### Static HTML, CSS, and vanilla JavaScript

The project deliberately uses ordinary HTML files, one shared CSS file, and
small vanilla JavaScript files. There is no framework, package manager, build
step, or generated output. A volunteer can open an HTML file, make a change,
and preview it directly.

Frameworks, Hugo, React, WordPress, Wix, and Tailwind were rejected because
they add build tooling, hosting/plugin maintenance, vendor dependency, or
knowledge that future volunteers should not need.

### Current multi-page structure

The original one-page concept was replaced by a static multi-page website as
the number of tours and the amount of detail grew. The current structure is:

- `index.html`: home page with hero, About, featured tours, gallery, and contact.
- `about.html`: about Jos, his HPI license, his team and how he guides. The
  home page only shows a short About teaser that links here, and the "About"
  navigation item points to this page.
- `privacy.html`: privacy policy (linked from the footer). Responsible
  person: Justra (no last name, by agreement), Jalan Orangutan No.20774,
  20774 Bukit Lawang, Indonesia. Contact email:
  `josjungletour@gmail.com`.
- `faq.html`: booking, payment, equipment, weather, and general FAQ sections.
- `info/index.html`: travel info hub with link cards to the info pages below.
- `info/getting-there.html`: how to get to Bukit Lawang from Medan / Kualanamu
  Airport and onward travel.
- `info/national-park.html`: Gunung Leuser National Park, park rules, licensed
  guides and standard prices.
- `info/packing-list.html`: what to bring for short and multi-day treks, based on
  the FAQ packing list plus common jungle trekking essentials.
- `info/travel-tips.html`: Indonesia travel tips: visa and entry, money, health,
  emergency numbers, weather, phone and internet, local customs.
- `info/wildlife.html`: Sumatran orangutans (facts, semi-wild vs. wild) and the
  other confirmed monkey species, with a no-guarantee note.
- `tours/all-tours.html`: complete tour overview.
- `tours/3-hour.html`, `tours/1-day.html`, `tours/2-day.html`, `tours/3-day.html`,
  `tours/4-day.html`, `tours/5-day.html`, `tours/6-day.html`, `tours/7-day.html`,
  `tours/kuta-cane.html`, and `tours/orangutan-monitoring.html`: individual
  tour detail pages.

Pages are grouped into folders by topic: general pages (`about.html`,
`faq.html`, `privacy.html`) stay next to `index.html` in the root folder, tour
pages live in `tours/`, and info pages in `info/`. Do not add a generic
`src/` folder: it would only make the public URLs longer and suggest a build
step that does not exist.

`js/nav.js` and `js/footer.js` work out the path back to the root folder from
their own `<script src>` (e.g. `../js/nav.js` means "one folder up"), so a
page in any subfolder works as long as it includes the scripts with the
correct relative path.

Tour cards are ordinary links to detail pages. The earlier CSS flip-card idea
was replaced because detail pages provide more room for itineraries, inclusions,
fitness information, and booking guidance.

### Shared page elements

Repeated markup is injected into placeholders by normal local scripts:

- `js/nav.js` inserts the navigation.
- `js/footer.js` inserts the footer, the current copyright year and the link
  to the privacy policy.
- `js/cta.js` inserts the contact CTA on tour pages.

This is intentionally not a `fetch()`-based include. Normal scripts can write
to the DOM when a page is opened through `file://`, so local preview remains
simple. Relative paths are used so the site works on GitHub Pages project URLs,
custom domains, and local previews.

The trade-off is that shared navigation, footer, and CTA markup are absent if
JavaScript is disabled. This is accepted because the site already relies on
JavaScript for shared elements and the dynamic footer year.

### Styling

Fonts (Inter and Archivo, latin subset) are stored locally in `fonts/` with
their SIL OFL licenses, so no data is sent to Google Fonts. Do not switch
back to loading fonts from external services.

Styling is kept in `css/style.css`. Colors, spacing, layout width, and corner
radius are CSS variables near the top of the file. The visual direction uses
jungle green, a warm gold accent, WhatsApp green, and Instagram pink.

## Hosting and domain

The site is hosted exclusively on Cloudflare Pages (free, static, no build
step), currently at `jungle-of-jos.pages.dev`. A data processing agreement
with Cloudflare is in place. No tracking, analytics or other third-party
services are enabled; keep it that way, or update `privacy.html` first.

The Cloudflare account was set up by a volunteer on Jos' behalf, using an
email address created for Jos, and is to be handed over to Jos. Jos is the
operator of the website and the controller under data protection law. The
volunteer who owns the GitHub repository only maintains the code and is not
the operator. See "Legal and privacy" under "Open questions for Jos".

The domain decision is still open. Launching on the free `pages.dev`
subdomain is acceptable. If a custom domain is purchased, long-term ownership
and payment responsibility must be agreed with Jos first.

## Tours and pricing

The home page highlights four offers: the 3-hour trek, 2-day trek, 3-day trek,
and Kuta Cane expedition. The full overview currently contains ten tour links,
including 1-day and 4- to 7-day treks plus Orangutan Monitoring.

By agreement, `tours/all-tours.html` is the current source of truth for the
public overview and prices:

Orangutan Monitoring is listed but its description and format are still marked
as unconfirmed. It must not be treated as final public content until Jos
confirms what the activity includes.

## Content and factual guidance

All `images/jos*.webp` photos show Jos (`jos1` on the home page, `jos4` on
`about.html`). Jos (real first name: Justra) is 54, born and raised in Bukit Lawang, and the youngest of eight siblings.
He leads treks himself. His team is currently a cook; when needed he brings in
other local guides as partners, and porters on request. He speaks Indonesian
and English, and can help arrange onward travel to Medan, Berastagi, or Lake Toba.

Confirmed by Jos for the FAQ: spontaneous bookings 1 to 2 days ahead are
possible; with a tight schedule, guests should book 2 to 3 weeks in advance.
Vegetarian or vegan food is possible if requested in advance. There is no
electricity and no Wi-Fi in the jungle, and phone signal only in places. A
porter can be arranged if requested in advance. Jos speaks Indonesian and
English. Travel insurance is not legally required but strongly recommended.

Jos holds an HPI guide license (Indonesian tour guide association). The
national park permit is included in all tour prices; there are no extra
costs. The minimum distance to orangutans and other wild animals is 10
meters.

Tours take place in the jungle around Bukit Lawang. Wildlife may include
long-tailed macaques, Thomas leaf monkeys, pig-tailed macaques, and wild
orangutans. Rare sightings must never be promised, especially on shorter tours.

Tours generally include a fresh jungle lunch and fruit snacks. Tours of two or
more days additionally include dinner and an overnight stay in simple jungle
huts at a jungle camp: self-built wooden huts that are open to the forest
but have a waterproof roof and a floor sealed against water. Guests sleep on
a thin mattress on the floor with a blanket and pillow, under a mosquito
net. It
gets dark at around 7 pm; there is no electricity, only minimal lighting or
candles. Food is usually traditional Indonesian and plentiful. Drinking water
is provided at the camp, where guests refill their bottles; there is no way to
refill water while trekking. River tubing is included at the end of the
standard treks where the relevant page says so. Confirm exceptions with Jos before
publishing copy.

## Current implementation status

Implemented:

- `Jungle of Jos` branding across the existing pages.
- Static home page, FAQ page, tour overview, and individual tour pages.
- Responsive plain-CSS layout and link-based tour cards.
- Shared navigation, footer, and tour CTA scripts.
- Automatic copyright year in the shared footer.
- A working Instagram link in the shared tour CTA: `jungle_of_jos`.
- WhatsApp buttons link to Jos' number +62 822-7775-2204 via
  `https://wa.me/6282277752204` (in `index.html` and `js/cta.js`).
- Image files in `images/` and `images/gallery/`, with some already referenced.

Still incomplete or requiring review:

- All photos in `images/` were sent by Jos and are his own, so they may be
  used on the site. The home page hero image is still an empty placeholder.
  Only add new images whose ownership is equally clear.
- FAQ answers, itinerary times, several inclusions, and some tour descriptions
  still contain `PLACEHOLDER` text and require facts from Jos.
- Prices need to be synchronized from `tours/all-tours.html` to detail pages.
- The domain and the long-term payer/owner remain undecided.

## Content expansion (TODO)

Jos asked for more content on the site (more about the animals and orangutans,
the jungle, and how to get to Bukit Lawang). We deliberately keep this much
smaller than professional agency sites: a few focused, easy-to-maintain pages.
The navigation gets a single "Info" item that links to a hub page
(`info/index.html`) instead of a dropdown menu.

Done:

- [x] Moved all info pages into `info/` (the hub is now `info/index.html`).
- [x] Skeleton pages `info.html`, `info/getting-there.html`, `info/national-park.html`,
      `info/wildlife.html`, linked from the navigation and listed in `sitemap.xml`.
- [x] Fixed the "Tours" navigation link (was built as `/tours/...` and
      `..//tours/...`, which broke `file://` and project URLs).

To do:

- [x] Filled `info/getting-there.html` with general travel information (no
      prices; travel times are approximate ranges from public travel guides).
      A link to the route on Google Maps is used instead of an embedded map
      or a drawn map image (no third-party embed, nothing to maintain).
      Open points are listed under "Open questions for Jos" below.
- [x] Filled `info/wildlife.html`: Sumatran orangutan facts from public sources,
      semi-wild vs. wild orangutans, profiles of the three confirmed monkey
      species (Thomas leaf monkey, long-tailed and pig-tailed macaque) and a
      no-guarantee note linking to the jungle rules on `info/national-park.html`.
- [ ] Add more species to `info/wildlife.html` once Jos confirms them.
- [x] Added `info/packing-list.html` (linked from `info/index.html` and the FAQ answer
      "What should I bring?"). The FAQ list from Jos is the base; general
      items like a headlamp, dry bags and toiletries were added, and later
      general jungle trekking tips (clothing colours, backpack size, first
      aid kit), written in our own words.
- [x] Added `info/travel-tips.html` (linked from `info/index.html`). Visa and entry
      information was checked against current public sources (e-VOA, All
      Indonesia arrival card) and links to the official immigration
      websites. Visa rules change often: review this page at least once a
      year.
- [x] Filled `info/national-park.html` with general information from public
      sources: the park and UNESCO status, Bukit Lawang's orangutan history,
      threats, access only with permit and licensed guide, jungle rules,
      how to recognize a licensed (HPI) guide, and the standard prices set by
      the guide association (the 3-hour to 5-day prices in
      `tours/all-tours.html` match them). Open points are listed under
      "Open questions for Jos" below.
- [ ] Add photos to the info pages and info cards (ideally Jos' own photos,
      e.g. from his Instagram, with confirmed permission).
- [ ] Have Jos (or the project owner) review general background texts before
      publishing, starting with `info/getting-there.html`.
- [x] Extended `faq.html` to 20 questions in three categories. Group size
      and children still show an "under construction" note.
- [x] Added `about.html` (Meet Jos, licensed guide, team, how Jos guides,
      CTA) and shortened the About section on the home page to a teaser.
      Guest reviews are intentionally left out.
- [ ] Optional later: a photo and video gallery (Jos has more material).
- A larger visual polish pass remains optional and should not compromise easy
  maintenance or mobile readability.

## Open questions for Jos

All content questions that need an answer from Jos (the client) are collected
here, not as comments in the code. Remove a point once it is answered and the
site is updated. Visible `PLACEHOLDER` text on pages marks where an answer is
still missing.

General:

- [ ] Hero image for the home page, and more photos he owns for the info
      pages. (The existing images in `images/` are confirmed as Jos' own.)
- [ ] Domain: whether to buy one, and who owns and pays for it long term.

Tours:

- [ ] Orangutan Monitoring: what the activity includes, its format and a
      short description (see `tours/orangutan-monitoring.html` and the two
      `PLACEHOLDER` descriptions in `tours/all-tours.html`).
- [ ] Other inclusions per tour (the `PLACEHOLDER` item in the "What's
      included" list of the 1-, 2-, 4-, 5-, 6- and 7-day pages).
- [ ] Itinerary times and tour descriptions that are still generic.

Getting there (`info/getting-there.html`):

- [ ] Which transport option does Jos recommend to his guests?
- [ ] Does he offer a transfer from the Bukit Lawang bus station (the FAQ
      mentions it), and is it free or paid?
- [ ] Is there still a direct bus from Kualanamu Airport to Bukit Lawang?
- [ ] Are the travel times on the page realistic (airport/Medan to Bukit
      Lawang, Bukit Lawang to Berastagi and Lake Toba)?
- [ ] Should guests arrive the day before their trek, or can they start on
      the day they arrive?

National park and wildlife (`info/national-park.html`, `info/wildlife.html`):

- [ ] Are the other guides in Jos' team HPI-licensed too?
- [ ] Are the jungle rules on `info/national-park.html` complete and correct
      (e.g. telling the guide about illness, no camera flash)?
- [ ] Which animals does he regularly see on his treks besides long-tailed
      macaques, Thomas leaf monkeys, pig-tailed macaques and orangutans?
      (e.g. gibbons, hornbills, monitor lizards), ideally with his own photos.
- [ ] Is the text about semi-wild orangutans on `info/wildlife.html` accurate for
      today, and does he want to add tips for orangutan encounters?

Travel tips (`info/travel-tips.html`):

- [ ] Does Jos accept payment in Indonesian Rupiah, euros, or both?
- [ ] Are there any ATMs in Bukit Lawang now, or only cash at hotels?
- [ ] When is the rainy season around Bukit Lawang, and are treks offered
      all year? (The page currently says trekking is possible all year.)

Packing list (`info/packing-list.html`):

- [ ] Are leech socks or anything else specific worth recommending?

FAQ (`faq.html`):

- [ ] Is there a maximum group size? (The FAQ answer is currently an
      "under construction" note.)
- [ ] Can children join, and is there a minimum age? (Also an "under
      construction" note.)
- [ ] Are the answers about leeches and snakes correct?
- [ ] River tubing: is it suitable for non-swimmers, and are life jackets
      provided? Which tours include tubing?
- [ ] Do porters cost extra, and how much?
- [ ] Is it true that salt is placed around the camp to keep snakes away?
      (Not mentioned on the site; there is no scientific evidence that salt
      repels snakes.)

Legal and privacy (`privacy.html`, hosting):

These points should be settled before launch. They are not legal advice;
ideally have the final privacy policy checked by someone with legal knowledge.

- [ ] Make sure Jos knows that he is the operator of the website and the
      responsible person (controller) for personal data, and agrees to it.
- [ ] Hand over the Cloudflare account and its email address to Jos (login
      details, recovery options, two-factor authentication). The data
      processing agreement with Cloudflare must belong to this account, so
      that "we have concluded a data processing agreement" in `privacy.html`
      is true for Jos.
- [ ] Storage periods: how long are Cloudflare access logs kept, and how long
      does Jos keep WhatsApp chats, emails and booking data? The privacy
      policy has to state this and currently does not.
- [ ] Add contact by email to section 4 of `privacy.html`: the address is a
      Gmail address, so messages are processed by Google (USA).
- [ ] Applicable law: the policy only refers to the GDPR. Jos is in
      Indonesia, where the Personal Data Protection Law (UU PDP, No. 27/2022)
      applies. Decide whether to mention it.
- [ ] GDPR representative in the EU (Art. 27): needed in principle because the
      site targets EU travellers; the exception for occasional, low-risk
      processing probably applies. Decide this consciously.
- [ ] Mention that booking data goes to Jos in Indonesia (no EU adequacy
      decision).
- [ ] State the right to object (Art. 21 GDPR) separately and clearly, since
      section 2 relies on legitimate interest (Art. 6(1)(f)).
- [ ] Check in the Cloudflare dashboard that Web Analytics, Bot Fight Mode and
      similar features are off, so that "no cookies, no tracking" stays true.
- [ ] Imprint: probably not needed for an operator in Indonesia; confirm once
      the operator question above is settled.

About (`about.html`):

- [ ] Since when has Jos been guiding? (The page says "for a long time".)

## Working style

Keep changes small and explain structural or UX trade-offs before making them.
Prefer transparent HTML and existing local patterns over new abstractions.
Do not invent prices, itineraries, inclusions, wildlife guarantees, contact
details, or translations. When a fact is missing, leave a clear placeholder or
ask for confirmation.

Code comments are only for technical notes (including technical TODOs). Content
questions and to-dos that need the client go into "Open questions for Jos"
above, never into HTML or code comments.
