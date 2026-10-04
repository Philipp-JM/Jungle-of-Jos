# AGENTS.md

Instructions for AI agents working in this repository (Jungle of Jos, a static
website for a jungle trekking guide in Bukit Lawang, Sumatra).

## Read first

**Read `docs/PROJECT_CONTEXT.md` before making any change, and follow it.** It
defines the purpose, constraints, architecture decisions, content rules, and
current status. If a request conflicts with it, point out the conflict and ask
instead of working around it. Keep that file up to date when you change
structure, shared scripts, pricing, or implementation status.

## Git workflow

- **Every session works on its own new branch.** At the start of a session,
  create a fresh branch from the latest default branch, e.g.
  `claude/<short-topic>-<short-id>`, before editing anything.
- **Never commit or push to the branch preselected by the Claude Code GUI or
  harness**, and never to `main`. Ignore the branch you happen to be checked out
  on at session start.
- Make small, focused commits with descriptive messages.
- Do not open a pull request unless explicitly asked.

## Non-negotiables (details in PROJECT_CONTEXT.md)

- Plain static HTML, CSS (`css/style.css`), and vanilla JS. No frameworks,
  package managers, build steps, or new dependencies.
- Keep it understandable for volunteers with basic IT skills; prefer
  transparent HTML and existing patterns over abstractions.
- Use relative paths so the site works on `file://`, GitHub Pages, and custom
  domains.
- Never invent prices, itineraries, inclusions, wildlife guarantees, contact
  details, or translations. Leave a clear `PLACEHOLDER` or ask.
- `tours/all-tours.html` is the source of truth for prices.
- No content TODOs in code comments. Questions for the client go into
  "Open questions for Jos" in `docs/PROJECT_CONTEXT.md`; code comments are
  only for technical notes.
- Do not use images of unknown ownership; add meaningful alt text.

## Working style

- Keep changes small; explain structural or UX trade-offs before making them.
- When adding a page, also update navigation (`js/nav.js`) and `sitemap.xml`.
- Check pages by opening them locally (no server or build needed) and verify
  links and mobile layout.
