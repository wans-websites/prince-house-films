# Prince House Films

React (CRA) marketing site backed by Sanity CMS.

## Commands

- `npm start` — dev server (default port 3000)
- `npm run build` — production build into `build/`
- `npx serve -s build -l <port>` — serve the built app
- `npx eslint --ext .js,.jsx <paths>` — lint. Pass directories with `--ext`;
  a bare directory argument fails with "No files matching the pattern".
- There is no prettier installed locally. `npx prettier` tries to download it
  and hangs, so match the surrounding style by hand.

## Architecture notes

- Content queries live in `src/lib/queries.js`; every section has a matching
  fallback object in `src/lib/fallbacks.js` used when Sanity returns null.
- `useSanityData` wraps the fetch. `src/App.jsx` loads the hero and services
  queries together via `Promise.all`.
- Section markup is `<section id="...">` with per-component CSS files that
  reference the shared variables in the global stylesheet.

## Gotchas learned the hard way

- **Stacking contexts trap fixed modals.** `.services-container` sets
  `position: relative; z-index: 1`, so a modal rendered inside the section can
  never paint above the fixed header (`z-index: 1000`) no matter its own
  z-index. `ServiceModal` therefore renders through `createPortal` into
  `document.body`. Keep that if you move the modal around.
- **`top` plus `max-height` must fit the viewport.** Modal rules that raise
  `max-height` to `95vh` need `top` at `2.5%` or lower; the base rule's `10%`
  pushes the modal past the bottom of the screen.
- **Framer Motion `whileInView` without `once` blanks grid cells.** A card that
  scrolls back out animates to opacity 0 and leaves an empty cell. Portfolio and
  Gallery both pass `viewport={{ once: true }}`.
- **Sanity category fields may be references.** `categories[]` entries can be
  either inline `{label, order}` or a reference to a category document. Queries
  use `coalesce(label, @->label)` and the components drop entries with a null
  label, otherwise `label.toLowerCase()` throws.
- **Do not touch the preloader node from `public/index.html`.** React owns it;
  removing it manually makes `AnimatePresence` throw `removeChild` and unmounts
  the whole app.
- YouTube thumbnails must use `hqdefault.jpg`; `maxresdefault.jpg` 404s for
  many videos and leaves cards with no background.
- **A `fr` track can be shorter than its content.** The Services bento pinned
  two rows to `minmax(0, 1fr)`, so a side card needing ~271px got 245px and its
  description was clipped. Use `minmax(min-content, 1fr)` and avoid
  `-webkit-line-clamp` on copy the design calls "complete".
- **A single throwing map kills the whole page.** `cat.label.toLowerCase()` on
  an unresolved reference threw inside render and unmounted the app, so every
  section looked missing. Filter null labels before mapping.

## Branch layout

`temp-branch` is the six-section homepage (Hero, About, Services, Partnership,
Team, Contact). It has no Portfolio or Gallery, and its schema types were
deleted, so `feat/sanity` cannot be pushed onto it without dropping those
sections. Keep Portfolio work on `feat/sanity`.

## Testing responsive layouts

Chromium with `--no-sandbox` works. The Sanity CDN rejects browser requests
with a CORS error even though `curl` succeeds, so launch Chromium with
`--disable-web-security` to exercise real production content instead of the
fallback path — otherwise every section renders empty and the test proves
nothing.

`whileInView` needs time: scroll each card into view, then wait for the
stagger (0.4s delay plus 0.5s duration) before reading opacity, or a passing
fix looks broken.

Assert on measured geometry (`getBoundingClientRect`) rather than screenshots
alone. Check for horizontal overflow with
`document.documentElement.scrollWidth > innerWidth`, for clipping with
`scrollHeight > clientHeight` on text nodes, and for empty grid cells by
comparing the grid's bottom edge to the last card's.
