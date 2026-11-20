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

## Deletion order

1. Homepage rendering + `App.jsx` imports (Task 2).
2. Removed section component folders + exclusive support files (Task 3).
3. Queries and fallbacks exclusive to removed sections (Task 4).
4. Studio schema review — expected: no safe removals (Task 5).
5. Orphaned files, assets, CSS and dependencies (Task 6).
6. Final verification (Task 7).
