# Sanity Partner Seeding and CMS Cleanup

Audit of the partner logo data model and the Studio schema set, and the plan for
populating the 14 partner logos and reducing the Studio to the retained
website content. Every claim below was checked against the repository and the
production dataset, not assumed.

## 1. Partner logo source of truth

`partner` documents carry two logo fields:

| Field | Type | Role |
| ----- | ---- | ---- |
| `logo` | `image` (hotspot) | Sanity-managed asset — the preferred source |
| `logoUrl` | `url` | External fallback used only when no asset is set |

`partnersQuery` reads both through `coalesce`:

```groq
"img": coalesce(logo.asset->url, logoUrl)
```

and `Partnership.jsx` renders `partner.img` straight into `<img src>`. So the
intended production source of truth is a **Sanity image asset**; `logoUrl`
exists as a fallback and must not be used as the primary mechanism.

Decision: upload each supplied Cloudinary image into Sanity asset storage and
point `logo.asset` at it. `logoUrl` stays null. This keeps one source of truth
and needs no schema change.

## 2. Current production state

All 14 partner documents exist with the expected IDs, `order` 1–14, names and
`logoAlt` filled in. Every `logo` asset, `logoUrl` and `url` is null, which is
why the carousel currently renders no logos.

| ID | Name | Order | logoAlt |
| -- | ---- | ----: | ------- |
| `partner-cocacola` | Coca Cola | 1 | Coca Cola logo |
| `partner-darling` | Darling | 2 | Darling logo |
| `partner-delish` | Delish | 3 | Delish logo |
| `partner-drmattress` | Dr. Mattress | 4 | Dr. Mattress logo |
| `partner-eabl` | EABL | 5 | EABL logo |
| `partner-furnitureplace` | Furniture Place | 6 | Furniture Place logo |
| `partner-lcwaikiki` | LC Waikiki | 7 | LC Waikiki logo |
| `partner-megagrowth` | Mega Growth | 8 | Mega Growth logo |
| `partner-orient` | Orient | 9 | Orient logo |
| `partner-prestige` | Prestige | 10 | Prestige logo |
| `partner-sarit` | Sarit | 11 | Sarit logo |
| `partner-titi` | Titi | 12 | Titi logo |
| `partner-tworivers` | Two Rivers | 13 | Two Rivers logo |
| `partner-vspa` | V Spa | 14 | V Spa logo |

The supplied file name `drmatress_ykmtcp.png` maps to `partner-drmattress`; the
spelling difference is expected and creates no new document.

## 3. Seed script behaviour

`scripts/seedSanity.js` writes with `createIfNotExists()` unless `--force` is
passed, in which case it calls `createOrReplace()`. Neither is appropriate
here:

- `createIfNotExists` will not touch the 14 existing documents, so adding logo
  data to its definitions changes nothing in production.
- `createOrReplace` would overwrite whole documents.

The seed definitions for `partner` therefore stay non-destructive. The logo
population is a separate, narrowly scoped script.

## 4. Partner logo seeding operation

`scripts/seedPartnerLogos.js`:

- Target list of exactly the 14 IDs and their image URLs.
- Reads `SANITY_PROJECT_ID` / `SANITY_DATASET`; aborts unless they are
  `zsbii2ih` / `production`, so it cannot write to an unintended dataset.
- Verifies all 14 documents exist before writing anything.
- Uploads each image once with a deterministic `_id`
  (`image-<sha1 of URL>-<w>x<h>-png`) so a re-run reuses the asset instead of
  creating a duplicate.
- Patches **only** `logo` with `set`. Names, `order`, `logoAlt`, `url` and every
  other field are untouched.
- Dry run by default; writes only with `--apply`.
- Reports per partner: `uploaded` / `reused` / `updated` / `unchanged` / `failed`.
- Dumps the previous `logo` value of each document before writing, as a
  rollback record.

## 5. Schema audit

### Remove — the section is gone from the website

| Schema | Evidence |
| ------ | -------- |
| `approachType`, `approachStepType` | no query, no component, not referenced by a retained schema |
| `objectivesType` | same |
| `countsType` | same |
| `whyUsType` | same |
| `portfolioSectionType`, `portfolioItemType`, `portfolioCategoryType` | section deleted in `97e61f7`; no query |
| `gallerySectionType`, `galleryItemType`, `galleryCategoryType` | section deleted in `97e61f7`; no query |

### Remove — registered but referenced by nothing

| Schema | Evidence |
| ------ | -------- |
| `internalLinkType` | no schema or component references it |
| `externalLinkType` | same |
| `seoType` | same |

### Keep — used by a retained section

| Schema | Used by |
| ------ | ------- |
| `heroType` | `heroQuery` |
| `aboutType` | `aboutQuery` |
| `serviceType` | `servicesQuery` (the five approved services) |
| `servicesSectionType` | `servicesSectionQuery` |
| `mediaItemType` | `serviceType.mediaItems` (service modal media) |
| `teamSectionType` | `teamQuery` |
| `teamMemberType` | Team collection — must stay editable even though the dataset currently holds no members |
| `partnershipSectionType` | `partnershipSectionQuery` |
| `partnerType` | `partnersQuery` — standalone documents remain the source of truth |
| `getInTouchType` | `getInTouchQuery` (Contact) |
| `contactDetailType` | `getInTouchType.contactDetails` |
| `socialLinkType` | `footerType.socials`, `getInTouchType.socials`, `teamMemberType.socials` |
| `headerType` | `headerQuery` |
| `footerType` | `footerQuery` |
| `preloaderType` | `preloaderQuery` |
| `siteSettingsType` | `siteSettingsQuery` |
| `privacyPolicyType` | `privacyPolicyQuery` (the `/privacy-policy` route) |
| `errorBoundaryType` | `errorBoundaryQuery` (fallback copy for the app error boundary) |

### Fields to remove from retained schemas

| Schema | Field | Why |
| ------ | ----- | --- |
| `siteSettingsType` | `favicon` | never queried; `public/index.html` hardcodes its favicons |
| `partnershipSectionType` | `partners[]` (embedded array) | duplicate data model; `partnersQuery` on standalone documents is what renders, and production has no embedded array at all |

`mediaItemType.duration` stays: `ServiceModal` reads `item.duration`.

## 6. Bug found during the audit

`partnershipSectionType` defines the field as **`partnershipTypes`**, but
`partnershipSectionQuery` projects **`types[]`**, so `section.partnershipTypes`
in `Partnership.jsx` is always `undefined` and the component silently falls
back to `fallbackPartnershipTypes`. The partnership "types" cards therefore
come from the fallback file, not from Sanity.

Production confirms it: the `partnershipSection` document has no `partners`,
`types` or `partnershipTypes` array at all.

Fix: project `partnershipTypes[]` in the query so the CMS field is the one the
component reads. No content change; the fallback keeps covering the empty case.

## 7. Studio navigation

Replace the flat "Page Sections" list, which still exposes Approach,
Objectives, Counts, WhyUs, Portfolio and Gallery, with:

```
Website Content
├── Hero
├── About — Who We Are
├── Services
│   ├── Services Section
│   └── Services
├── Partnership
│   ├── Partnership Section
│   └── Partners
├── Team
│   ├── Team Section
│   └── Team Members
├── Contact
├── Header
└── Footer

Legal
└── Privacy Policy

Site Configuration
├── Site Settings
├── Preloader
└── Error Boundary
```

Singletons keep their fixed document IDs. `visionTool` stays; it is a debugging
aid with no content-management surface.

## 8. Frontend integration

All 14 exported queries are imported and used, so none is removed. The
`partnershipTypes` projection fix above is the only query change.

`fallbacks.js` keeps the fallback for every retained query. No obsolete
fallback objects remain from the earlier cleanup.

## 9. Production safety

- No document is deleted.
- Removing a schema from the registry does not delete its documents. The
  Approach, Objectives, Counts, WhyUs, Portfolio and Gallery documents stay in
  the dataset, untouched, and are simply no longer exposed in the Studio. This
  is reported explicitly at the end.
- No full seed run, no `--force`, no dataset reset.
- The only production writes are the 14 `logo` patches, which the user
  authorised.

### Documents that stay in the dataset but leave the Studio

Counted in production at the time of this audit:

| Type | Documents |
| ---- | --------: |
| `approach` | 1 |
| `approachStep` | 5 |
| `objectives` | 1 |
| `counts` | 1 |
| `whyUs` | 1 |
| `portfolioSection` | 1 |
| `portfolioCategory` | 6 |
| `portfolioItem` | 6 |
| `gallerySection` | 1 |
| `galleryCategory` | 6 |
| `galleryItem` | 9 |

Total 38 documents become unreachable from the Studio and remain in the
dataset. None is deleted.
