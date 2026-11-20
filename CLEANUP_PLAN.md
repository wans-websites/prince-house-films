# Cleanup Plan — Simplified Prince House Films

Dependency audit and deletion plan for removing unused homepage sections.
This document records what is retained, what is removed, and the evidence for
each decision. It is the reference for the refactor commits that follow.

## Approved homepage structure

```
Header
Preloader (application lifecycle)
Hero
About
Services
Partnership
Team
Contact (GetInTouch)
Footer
```

## Existing routes (must not change)

| Path             | Component                   |
| ---------------- | --------------------------- |
| `/`              | `HomePage` in `src/App.jsx` |
| `/privacy-policy`| `PolicyPage` → `pages/PrivacyPolicy` |

`Header` and `Footer` are rendered on both routes.

## Sections removed from the homepage

Approach, Counts, Objectives, Gallery, Portfolio, WhyUs.

## Dependency audit

### Queries used by retained components (`src/lib/queries.js`)

| Query                  | Consumer                        |
| ---------------------- | ------------------------------- |
| `heroQuery`            | `App.jsx` → `Hero`              |
| `aboutQuery`           | `About`                         |
| `servicesQuery`        | `App.jsx` → `Services`          |
| `servicesSectionQuery` | `Services`                      |
| `partnershipSectionQuery` | `Partnership`                |
| `partnersQuery`        | `Partnership`                   |
| `teamQuery`            | `Team`                          |
| `getInTouchQuery`      | `GetInTouch`                    |
| `headerQuery`          | `Header`                        |
| `footerQuery`          | `Footer`                        |
| `preloaderQuery`       | `Preloader`                     |
| `siteSettingsQuery`    | `ServiceModal`, `PrivacyPolicy` |
| `errorBoundaryQuery`   | `ServiceModal`                  |
| `privacyPolicyQuery`   | `PrivacyPolicy`                 |

Queries exclusively used by removed sections (delete): `approachQuery`,
`objectivesQuery`, `countsQuery`, `whyUsQuery`, `portfolioSectionQuery`,
`portfolioItemsQuery`, `gallerySectionQuery`, `galleryItemsQuery`.

Already-dead query found during audit (delete): `partnershipTypesQuery`. It is
exported but imported nowhere; `Partnership` reads `partnershipTypes` through
`partnershipSectionQuery` instead.

### Fallbacks used by retained components (`src/lib/fallbacks.js`)

Retain: `fallbackHero`, `fallbackAbout`, `fallbackServicesSection`,
`fallbackPartnershipSection`, `fallbackPartners`, `fallbackPartnershipTypes`,
`fallbackTeam`, `fallbackGetInTouch`, `fallbackHeader`, `fallbackFooter`,
`fallbackPreloader`, `fallbackSiteSettings`, `fallbackErrorBoundary`,
`fallbackPrivacyPolicy`.

Delete: `fallbackApproach`, `fallbackObjectives`, `fallbackCounts`,
`fallbackWhyUs`, `fallbackPortfolioSection`, `fallbackPortfolioItems`,
`fallbackGallerySection`, `fallbackGalleryItems`.

`fallbackPartners` imports the 14 partner logos from `src/assets/img/partners/`,
so **those assets must be kept** even though the Partnership section renders
Sanity URLs first.

### Shared modules

| Module                       | Status   | Evidence                                   |
| ---------------------------- | -------- | ------------------------------------------ |
| `components/MediaEmbed.jsx`  | keep     | used by `Services/ServiceModal`            |
| `components/ErrorBoundary.jsx` | keep   | used by `ServiceModal`                     |
| `components/ScrollToTop/`    | keep     | used by `App.jsx`                          |
| `lib/useSanityData.js`       | keep     | used by every retained section             |
| `lib/sanity.js`              | keep     | `sanityClient`, `urlFor`                   |
| `lib/mediaUtils.js`          | keep     | `getYouTubeId` used by `Services`          |
| `components/SectionsShared.css` | keep  | imported by `Hero.css`, `GetInTouch.css`   |
| `styles/global.css`, `styles/dark-theme.css` | keep | imported by `App.jsx`        |

### Files that are genuinely orphaned (delete)

| File                                        | Evidence                                        |
| ------------------------------------------- | ----------------------------------------------- |
| `src/components/Partnership/partnerImages.jsx` | no import anywhere; duplicates `fallbackPartners` |
| `src/data/portfolioData.js`                 | no import anywhere                              |
| `src/App.css`                               | empty file, imported nowhere                    |
| `src/index.css`                             | imported nowhere; its `.phf-section` rule also conflicts with `SectionsShared.css` |
| `public/assets/css/variables-dark.css`      | referenced by no HTML, JS or CSS                |
| `src/assets/img/services/creativeContent.gif` | no reference (excluded service)               |
| `src/assets/img/logo.png`                   | no reference (unused duplicate)                 |
| `src/assets/img/partners/eabl.png`          | no reference (`eabl.jpeg` is the one used)      |

### Dependencies

The project ships both `yarn.lock` (tracked) and `package-lock.json` (untracked).
**Yarn is the package manager of record**; the lockfile to update is `yarn.lock`.

Unused npm dependencies found: `aos`, `glightbox`, `isotope-layout`, `swiper`,
`@srexi/purecounterjs`, `web-vitals`, `@testing-library/*`. The first three are
loaded from CDN in `public/index.html` and never imported in source. Removal is
verified again before deleting.

### Sanity Studio schemas

All content types except the six removed sections still have production
documents or support retained features/routes:

about 1, hero 1, service 8, partner 14, teamSection 1, getInTouch 1,
privacyPolicy 1, portfolioSection 1, portfolioItem 6, gallerySection 1,
galleryItem 9, approach 1, counts 1, objectives 1, whyUs 1.

The removed-section schemas back live production documents. Per the task rules
("do not remove schemas solely because the section is no longer displayed"),
they are retained so the content is not orphaned in Studio. Only schemas that
are demonstrably unused by content *and* code will be considered, and none
currently meet that bar.

Verified document counts in the production dataset:

| Type             | Docs | Type              | Docs |
| ---------------- | ---: | ----------------- | ---: |
| approach         |    1 | partner           |   14 |
| approachStep     |    5 | partnershipSection|    1 |
| contactDetail    |    3 | portfolioCategory |    6 |
| counts           |    1 | portfolioItem     |    6 |
| errorBoundary    |    1 | portfolioSection  |    1 |
| footer           |    1 | preloader         |    1 |
| galleryCategory  |    6 | privacyPolicy     |    1 |
| galleryItem      |    9 | service           |    8 |
| gallerySection   |    1 | servicesSection   |    1 |
| getInTouch       |    1 | siteSettings      |    1 |
| header           |    1 | teamMember        |    0 |
| hero             |    1 | teamSection       |    1 |
| objectives       |    1 | whyUs             |    1 |

Every schema except `teamMember` has live documents. `teamMember` has none,
but it is a deliberate "reserved" schema documented in its own file as content
for the retained Team section, and no retained schema references the removed
types. Removing it would delete planned CMS capability rather than dead code,
so it stays.

**Task 5 result: no schema removed.** The Studio still builds and type-checks
(`npx sanity build -y`, `npx tsc --noEmit`).

## Deletion order

1. Homepage rendering + `App.jsx` imports (Task 2).
2. Removed section component folders + exclusive support files (Task 3).
3. Queries and fallbacks exclusive to removed sections (Task 4).
4. Studio schema review — expected: no safe removals (Task 5).
5. Orphaned files, assets, CSS and dependencies (Task 6).
6. Final verification (Task 7).

## Progress

| Task | Result | Commit |
| ---- | ------ | ------ |
| 1 — audit | plan written | `da556ac` |
| 2 — homepage | six sections mounted | `f744c09` |
| 3 — components | six folders deleted | `97e61f7` |
| 4 — Sanity frontend | 9 queries + 8 fallbacks removed | `f719a1b` |
| 5 — Studio schemas | none removed (see above) | `fdee816` |
| 6 — assets/deps | 8 files + 12 packages removed | `408ef53` |
| 7 — verification | build, lint, routes, responsive | this doc commit |

## Final verification

**Build:** `npx react-scripts build` → `Compiled successfully`, exit 0.
`CI=true` build → exit 0, no "Treating warnings as errors" line, so there are
zero CRA warnings.

**Lint:** the project defines no lint script; CRA's bundled ESLint is the
lint command. `npx eslint --ext .js,.jsx src` → exit 0, no output.

**Production dataset (read-only):** 8 `service` documents — the five retained
titles plus `service-creative`, `service-event`, `service-graphic`. The
Services filter drops by document id first, so those three never render even
though Sanity returns them. `service-event` is "Event Coverage" and is
distinct from the retained "EVENTS" document (`b8b517f7…`). Also confirms the
`orderRank` inconsistency: four of the retained docs all share `rank=1`, and
the featured document is `service-event`, which is excluded — hence the fixed
`SERVICE_ORDER` list in `Services.jsx` rather than relying on CMS ordering.

**Services audit.** The five-card bento already satisfies the design brief, so
no change was made to it:

| Viewport | Columns | Composition | Card width |
| -------- | ------: | ----------- | ---------: |
| ≤640px   |       1 | stacked, 1:1 ratio | 288–604 |
| 641–1024 |       6 | featured on top, 2+2 below | ≥291 |
| ≥1025    |      12 | 7-col featured over 2 rows, 2 stacked beside, 2 below | ≥396 |

Checked at 320/360/375/414/430/540/640/641/700/768/820/900/1024/1025/1200/1280/1440/1600/1920:
no horizontal overflow, no zero-size or overlapping cards, no empty tracks.

Card text was measured with `Range` glyph boxes against card bounds at every
width — every title and description sits inside its card at every breakpoint
(worst case 27px of headroom). An earlier scrollHeight/clientHeight check
flagged the featured title as clipped; that was a sub-pixel `line-height`
rounding artifact (81px vs 78px on an `overflow: visible` element), not real
clipping.

Interaction: `role="button"`, `tabIndex=0`, `aria-label`, Enter and Space both
open `ServiceModal`, Escape closes it, focus ring renders `2px solid #dc1f29`,
`cursor: pointer`, and zero nested interactive elements.

**Portfolio.** The Portfolio section is not part of this branch: it was
removed in Task 2 of this cleanup, matching the approved six-section homepage.
The blank-space bug this brief describes was already diagnosed and fixed
before removal, in `27b4862`:

- **Root cause:** the project grid used `whileInView` with no `once`, so each
  card animated back to `opacity: 0` once it scrolled out of view. The grid
  cell kept its row height, leaving a large empty gap where the card should be.
- **Fix:** `const REVEAL = { once: true, amount: 0.15 }` on the card and title
  variants, plus a rebuilt responsive grid (3 → 2 → 1 columns, `16/10` ratio on
  mobile, overlay forced visible under `(hover: none)`) and a `dvh`-sized modal.

That work is preserved in git history (`27b4862`, `cedcf37`) and still exists
on `origin/feat/sanity`'s parent history if the section is ever reinstated.

**Routes:** `/` and `/privacy-policy` both load directly and survive a reload.
`PolicyPage` renders no Header — that is pre-existing behaviour, verified
against the Task 1 commit, and was left alone.
