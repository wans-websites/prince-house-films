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

## Testing responsive layouts

Playwright with `/usr/bin/chromium` and `--no-sandbox` works. Sanity's CDN can
be slow or rate limited from CI, so route `**/*sanity.io/**` and serve a cached
query response, then assert on measured geometry (`getBoundingClientRect`)
rather than screenshots alone. Check for horizontal overflow with
`document.documentElement.scrollWidth > innerWidth`.
