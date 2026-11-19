# SCHEMA_PLAN.md — Prince House Films Sanity Architecture (Phase 2)

**Repo:** `prince-house-films`  
**Branch:** `feat/sanity`  
**Status:** Plan only. NO code changes yet.  
**Locked decisions (from Phase 1 approval):** see §0 below.

---

## §0 — Locked decisions (approved in Phase 1)

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | **Privacy Policy body → `@portabletext/react` added** | First-party Sanity package (~15KB). Raw HTML textarea is not editor-friendly. Custom serializers will reproduce the exact current tag map (`h2`, `h3`, `p`, `ul/li`, `strong`, `a`) inside `.privacy-policy-body`. |
| D2 | **Background-image alt → `role="img"` + `aria-label` on wrapper div** | Sole permitted DOM addition (2 ARIA attributes only). No classNames, no structure, no `data-*`, no visual change. Applies to Portfolio item cover, Gallery item cover. Team group photo stays decorative (no aria). |
| D3 | **SEO meta → DEFER** | `siteSettings.siteUrl` added for reference but NO `seo` render path. `public/index.html` remains authoritative. Separate phase (React Helmet) required to wire it. |
| D4 | **Router paths → internal-link path string** | `initialValue` = current path. No route config changes. |
| D5 | **Seed dataset → production; idempotent `createOrReplace` only** | Backup first (`sanity dataset export`), dry-run `--dry-run` printing full payload, then execute. Never `create`/`delete` (avoids duplicate `_id` errors). |
| D6 | **Preloader video path flagged** | `Preloader.jsx:327` references `/assets/img/WildNowLogovideo.mp4`. Verify file exists during implementation; if missing, field stays editable with local fallback, no crash. |
| D7 | **GetInTouch has NO form** | Audit confirms ~201 lines: contact cards + socials + CTA only. No labels/placeholders/submit/success/error to add. Confirmed; no form fields in schema. |
| D8 | **ErrorBoundary has user-facing fallback text** | `ErrorBoundary.jsx:21` renders `"Couldn't load this media. Try another item."` → small `errorBoundary` singleton field `fallbackText`. |
| D9 | **Portfolio watch link = route only** | Modal CTA is `<a href="/project/{id}">` (structural route). No separate `watchUrl` field. `watchCtaLabel` "Watch Film" is editable text on `portfolioItem`. |
| D10 | **siteSettings adds `siteUrl`** | Referenced in `index.html` JSON-LD (`https://www.princehousefilms.com`). Not rendered now; reserved for future SEO phase. |
| D11 | **ServiceModal Instagram → `siteSettings`** | Single Instagram account reused across services. `servicesSection` keeps `sectionTitle` only. |
| D12 | **One `socialLink` object type** | `{ platform (dropdown), handle, url, iconClass, color }`. Separate list instances for Footer vs GetInTouch (Footer includes YouTube; GetInTouch doesn't). |
| D13 | **`stat` and `footerStat` are distinct types** | `counts.stat[]` = number/suffix/label/description/icon; `whyUs.footerStat[]` = number/label only. No overloaded type. |
| D14 | **`portfolioData.js` unused; fallback seed source only** | Never imported. Kept untouched. |

---

## §A — Document model

### A.1 Singleton documents ("Page Sections")

Each is rendered once on the homepage. Deterministic `_id` shown. `initialValue` = current hardcoded content (see completeness table §F).

| Doc | `_id` | Studio title | Page/section | Purpose |
|-----|-------|-------------|--------------|---------|
| `siteSettings` | `siteSettings` | Site Settings | Global | Brand name, logo, favicon, siteUrl, contact (email/phone/address), socials[], default CTA, errorBoundary fallback text |
| `header` | `header` | Header | Header | Logo image + alt, navLinks[], menu open/close aria labels |
| `preloader` | `preloader` | Preloader | Preloader | Logo image + alt, loadingText, loadingDetails[], backgroundVideoUrl |
| `hero` | `hero` | Hero | Hero | title, highlightedText, ctaText, ctaLink, backgroundType, backgroundVideoUrl, backgroundImage **(already exists)** |
| `about` | `about` | About | About | title, body, ctaLink, ctaText |
| `approach` | `approach` | Our Creative Process | Approach | sectionTitle, processNote, processNoteAttribution |
| `objectives` | `objectives` | Our Vision & Mission | Objectives | sectionTitle, intro, vision{title,body}, mission{title,body}, valuesHeading |
| `counts` | `counts` | Our Impact in Numbers | Counts | sectionTitle |
| `whyUs` | `whyUs` | Why Choose Us | Why Us | sectionTitle, intro, comparisonHeading, comparisonUsLabel, comparisonOthersLabel |
| `servicesSection` | `servicesSection` | Services Section | Services | sectionTitle |
| `portfolioSection` | `portfolioSection` | Portfolio Section | Portfolio | sectionTitle, categories[] |
| `gallerySection` | `gallerySection` | Gallery Section | Gallery | sectionTitle, intro, categories[], viewMoreLink, viewMoreLabel |
| `teamSection` | `teamSection` | Team Section | Team | sectionTitle, intro, groupPhoto (decorative), groupPhotoTitle, groupPhotoDescription |
| `partnershipSection` | `partnershipSection` | Partnership Section | Partnership | badgeLabel, sectionTitle, intro, actionButtonLabel |
| `getInTouch` | `getInTouch` | Get In Touch | Get In Touch | sectionTitle, intro, socialsHeading, ctaTitle, ctaDescription, consultationUrl, bookNowLabel, callUrl, callLabel, ctaNote |
| `footer` | `footer` | Footer | Footer | logo image + alt, socials[], privacyLink, privacyLabel, copyrightText |
| `privacyPolicy` | `privacyPolicy` | Privacy Policy | /privacy-policy | backToHomeLabel, eyebrow, title, effectiveDate, lastUpdated, body (Portable Text) |
| `errorBoundary` | `errorBoundary` | Error Boundary | MediaEmbed | fallbackText |

### A.2 Collection documents (repeatable)

| Doc | Studio title | Used by | Ordering |
|-----|-------------|---------|----------|
| `navLink` | Nav Link | header.navLinks[] | `order` number |
| `approachStep` | Approach Step | approach.steps[] | `order` number |
| `showcaseItem` | Showcase Item | approach.showcase[] | `order` number |
| `objective` | Core Value | objectives.values[] | `order` number |
| `stat` | Stat | counts.stats[] | `order` number |
| `achievement` | Achievement Badge | counts.achievements[] | `order` number |
| `whyUsReason` | Why Us Reason | whyUs.reasons[] | `order` number |
| `footerStat` | Why Us Stat | whyUs.footerStats[] | `order` number |
| `portfolioCategory` | Portfolio Category | portfolioSection.categories[] | `order` number |
| `portfolioItem` | Portfolio Item | portfolioSection.items[] | `order` number |
| `galleryCategory` | Gallery Category | gallerySection.categories[] | `order` number |
| `galleryItem` | Gallery Item | gallerySection.items[] | `order` number |
| `teamMember` | Team Member | teamSection.members[] | `order` number (reserved; none rendered yet) |
| `partner` | Partner Logo | partnershipSection.partners[] | `order` number |
| `partnershipType` | Partnership Type | partnershipSection.types[] | `order` number |
| `contactDetail` | Contact Detail | getInTouch.contactDetails[] | `order` number |
| `service` | Service **(exists)** | Services section cards | `orderRank` number |

### A.3 Shared object types (embedded, not top-level docs)

| Type | Fields | Used by |
|------|--------|---------|
| `externalLink` | `url`, `openInNewTab` (boolean), `label` | siteSettings socials, getInTouch contactDetails, footer socials |
| `internalLink` | `path` (string), `label` | header navLinks, about ctaLink, footer privacyLink, portfolio watch route |
| `socialLink` | `platform` (dropdown), `handle`, `url`, `iconClass`, `color` | footer.socials[], getInTouch.socials[] |
| `seo` | `siteUrl`, `title`, `description`, `ogImage` | siteSettings (stored, not rendered — deferred) |
| `mediaBlock` | `mediaType` (image\|videoFile\|videoUrl\|embed), `image` (sanity), `videoUrl`, `externalUrl`, `alt`, `title`, `redirectUrl` | service.mediaItems[] (reuses existing `mediaItem` shape extended) |

---

## §B — Field standards (applied to EVERY field)

For each field: `name` (camelCase), `title` (Title Case, editor-friendly), `description` (one sentence, where it appears), `group` (`content`\|`media`\|`links`\|`seo`\|`styleToggles`), `validation` (required/warning/none), `initialValue` (current hardcoded value), `preview` (collection docs only).

**Validation rule:** Required only when UI cannot gracefully render empty. Soft warning where a fallback exists. Never block publishing of unrelated docs.

**Images:** `type: 'image'`, `options: { hotspot: true }`, plus required `alt` string field except decorative images (description: "Decorative — alt left empty intentionally").

**Videos:** support uploaded `file` and external `url`. `mediaType` radio (`image \| videoFile \| videoUrl \| embed`). Reuse `MediaEmbed` logic.

**Icons:** `string` with `options.list` of allowed values mapping to existing react-icons/bootstrap-icons keys; component maps key → element identically to today.

**Rich text:** `block` (Portable Text) ONLY for `privacyPolicy.body`. Render via `@portabletext/react` with custom serializers. All other long text = plain `text`/`string`.

---

## §C — Studio desk structure

Custom `structureTool` list (added to `sanity.config.ts`, existing config intact):

```
Content
├── Page Sections (singletons, in homepage order)
│   ├── Site Settings
│   ├── Header
│   ├── Preloader
│   ├── Hero
│   ├── About
│   ├── Our Creative Process (Approach)
│   ├── Our Vision & Mission (Objectives)
│   ├── Our Impact in Numbers (Counts)
│   ├── Why Choose Us
│   ├── Services Section
│   ├── Portfolio Section
│   ├── Gallery Section
│   ├── Team Section
│   ├── Partnership Section
│   ├── Get In Touch
│   ├── Footer
│   ├── Privacy Policy
│   └── Error Boundary
└── Collections (repeatable)
    ├── Nav Links
    ├── Approach Steps
    ├── Showcase Items
    ├── Core Values
    ├── Stats
    ├── Achievement Badges
    ├── Why Us Reasons
    ├── Why Us Stats
    ├── Portfolio Categories
    ├── Portfolio Items
    ├── Gallery Categories
    ├── Gallery Items
    ├── Team Members
    ├── Partner Logos
    ├── Partnership Types
    ├── Contact Details
    └── Services
```

Ordering: every collection doc gets a numeric `order` field (label "Order", description "Lower numbers appear first"). Existing `service.orderRank` retained.

---

## §D — GROQ query plan + `useSanityData` hook

One query per consumer, named export in `src/lib/queries.js`. Projections list fields explicitly (no `...`). Sorted by `order`/`orderRank` asc where relevant.

| Query | Consumer | Projection |
|-------|----------|------------|
| `siteSettingsQuery` | App-level / Footer / GetInTouch / Header | brandName, logo, logoAlt, siteUrl, email, phone, address, socials[], instagramUrl, instagramCtaLabel, errorBoundaryFallbackText |
| `headerQuery` | Header | logo{...}, logoAlt, navLinks[]{label,path}, menuOpenAria, menuCloseAria |
| `preloaderQuery` | Preloader | logo{...}, logoAlt, loadingText, loadingDetails[]{label}, backgroundVideoUrl |
| `heroQuery` | Hero (exists) | title, highlightedText, ctaText, ctaLink, backgroundType, backgroundVideoUrl, backgroundImage{...} |
| `aboutQuery` | About | title, body, ctaLink, ctaText |
| `approachQuery` | Approach | sectionTitle, steps[]{order,number,title,description,features[]}, showcase[]{order,title,description,iconKey}, processNote, processNoteAttribution |
| `objectivesQuery` | Objectives | sectionTitle, intro, vision{title,body}, mission{title,body}, valuesHeading, values[]{order,title,description,iconKey} |
| `countsQuery` | Counts | sectionTitle, stats[]{order,number,suffix,label,description,iconKey}, achievements[]{order,title,description,iconKey} |
| `whyUsQuery` | Why Us | sectionTitle, intro, reasons[]{order,title,description,features[]}, comparisonHeading, comparisonUsLabel, comparisonOthersLabel, comparisonUsItems[], comparisonOthersItems[], footerStats[]{order,number,label} |
| `servicesSectionQuery` | Services | sectionTitle |
| `servicesQuery` | Services (exists) | _id, title, text, icon, featured, orderRank, backgroundType, backgroundImage{...}, backgroundVideoUrl, mediaItems[] |
| `portfolioSectionQuery` | Portfolio | sectionTitle, categories[]{order,label} |
| `portfolioItemsQuery` | Portfolio | _id, title, category, shortDescription, details, coverImage{...}, coverAlt, client, year, duration, awards[], watchCtaLabel |
| `gallerySectionQuery` | Gallery | sectionTitle, intro, categories[]{order,label}, viewMoreLink, viewMoreLabel |
| `galleryItemsQuery` | Gallery | _id, title, category, description, coverImage{...}, coverAlt, date, location, mediaType |
| `teamQuery` | Team | sectionTitle, intro, groupPhoto{...}, groupPhotoTitle, groupPhotoDescription |
| `partnershipSectionQuery` | Partnership | badgeLabel, sectionTitle, intro, actionButtonLabel |
| `partnersQuery` | Partnership | partners[]{order,name,logo{...},logoAlt,url} |
| `partnershipTypesQuery` | Partnership | types[]{order,title,description,features[],iconKey,color,accent} |
| `getInTouchQuery` | Get In Touch | sectionTitle, intro, contactDetails[]{order,title,content,link,linkText,external,iconKey}, socialsHeading, socials[]{order,platform,handle,url,iconClass,color}, ctaTitle, ctaDescription, consultationUrl, bookNowLabel, callUrl, callLabel, ctaNote |
| `footerQuery` | Footer | logo{...}, logoAlt, socials[]{platform,url,iconClass,color}, privacyLink, privacyLabel, copyrightText |
| `privacyPolicyQuery` | Privacy Policy | backToHomeLabel, eyebrow, title, effectiveDate, lastUpdated, body (Portable Text) |
| `errorBoundaryQuery` | ErrorBoundary (via context/prop) | fallbackText |

**`useSanityData` hook** (`src/lib/useSanityData.js` — new file, no changes to existing exports):

```js
// returns { data, loading, error }
// on null | undefined | error → returns fallback constant (current hardcoded value)
// signature: useSanityData(query, params, fallback)
```

Existing `sanityClient` and `urlFor` in `lib/sanity.js` unchanged. `lib/mediaUtils.js` unchanged (MediaEmbed already consumes its helpers).

**Contract:** NO component render-tree changes. Only the values passed into JSX change. Fallback = current constant guarantees pixel-identical UI when CMS is empty/failing.

---

## §E — Seed plan (`scripts/seedSanity.js`)

Update to create every singleton + collection using current hardcoded values as `_initial` content.

- Deterministic `_id`s: `siteSettings`, `header`, `preloader`, `hero`, `about`, `approach`, `objectives`, `counts`, `whyUs`, `servicesSection`, `portfolioSection`, `gallerySection`, `teamSection`, `partnershipSection`, `getInTouch`, `footer`, `privacyPolicy`, `errorBoundary`.
- Collection docs: `service-creative`, `service-motion`, `service-graphic`, `service-event` (already exist) + new ones keyed by section (e.g., `partner-cocacola`, `navLink-home`, `stat-years`, …).
- Idempotent: `createOrReplace` only. No `create`/`delete`/`patch` that could duplicate or remove.
- Batch 2 safeguards:
  1. `npx sanity dataset export production backup-$(date +%Y%m%d-%H%M).tar.gz` before seeding; commit backup path in batch report.
  2. Dry-run first: run seed with `--dry-run` flag printing full payload; review; then execute.
  3. Target dev dataset first (per original brief "Run it against the dev dataset only") — note studio config targets `production`; confirm dataset flag at Batch 2.

Existing local data files (`src/data/portfolioData.js`, `src/components/Partnership/partnerImages.jsx`) remain untouched and are exported as named fallback constants.

---

## §F — Completeness table (every AUDIT §2 row → Studio doc + field)

Key: `→` = maps to. `KEPT` = stays hardcoded (decorative/behaviour/structural).

### Header (`header` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| H1 logo image | Header.jsx:4 | header.logo (image) |
| H2 logo alt | Header.jsx:59 | header.logoAlt |
| H3 navLinks[] | Header.jsx:21-27 | header.navLinks[] (internalLink: label, path) |
| H4 nav link label | Header.jsx:90 | header.navLinks[].label |
| H5 nav link path | Header.jsx:73 | header.navLinks[].path |
| H6 menu aria | Header.jsx:103 | header.menuOpenAria / header.menuCloseAria |
| Scroll behaviour | Header.jsx:29-52 | KEPT (behaviour) |
| Route paths | Header.jsx:75-87 | KEPT (structural) |

### Hero (`hero` doc — exists)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| HE1 title | Hero.jsx:6 | hero.title |
| HE2 highlightedText | Hero.jsx:7 | hero.highlightedText |
| HE3 ctaText | Hero.jsx:8 | hero.ctaText |
| HE4 ctaLink | Hero.jsx:9 | hero.ctaLink |
| HE5 backgroundType | Hero.jsx:10 | hero.backgroundType |
| HE6 backgroundVideoUrl | Hero.jsx:11-12 | hero.backgroundVideoUrl |
| HE7 backgroundImage | Hero.jsx:20-23 | hero.backgroundImage |

### Preloader (`preloader` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| PR1 logo image | Preloader.jsx:4 | preloader.logo (image) |
| PR2 logo alt | Preloader.jsx:177 | preloader.logoAlt |
| PR3 SVG icon | Preloader.jsx:182-202 | KEPT (decorative icon) |
| PR4 loadingText | Preloader.jsx:232 | preloader.loadingText |
| PR5-PR7 detail labels | Preloader.jsx:284/291/300 | preloader.loadingDetails[].label |
| PR8 background video | Preloader.jsx:327 | preloader.backgroundVideoUrl |
| PR9 timings | Preloader.jsx:13-31 | KEPT (animation math) |

### About (`about` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| AB1 title | About.jsx:17 | about.title |
| AB2 body | About.jsx:21-28 | about.body (plain text) |
| AB3 ctaLink | About.jsx:29 | about.ctaLink |
| AB4 ctaText | About.jsx:30 | about.ctaText |

### Approach (`approach` doc + `approachStep`/`showcaseItem` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| AP1 sectionTitle | Approach.jsx:113 | approach.sectionTitle |
| AP2 steps[] | Approach.jsx:13-79 | approach.steps[] (order,number,title,description,features[]) |
| AP3 color/bg | Approach.jsx:132-135 | KEPT (CSS style vars) |
| AP4 arrow icon | Approach.jsx:153 | KEPT (decorative) |
| AP5 showcase[] | Approach.jsx:81-100 | approach.showcase[] (order,title,description,iconKey) |
| AP6 processNote | Approach.jsx:223-226 | approach.processNote |
| AP7 processNoteAttribution | Approach.jsx:235 | approach.processNoteAttribution |
| Commented subtitle | Approach.jsx:115-119 | KEPT (not rendered) |

### Objectives (`objectives` doc + `objective` collection)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| OB1 sectionTitle | Objectives.jsx:47 | objectives.sectionTitle |
| OB2 intro | Objectives.jsx:49-53 | objectives.intro |
| OB3 vision | Objectives.jsx:67-69 | objectives.vision {title, body} (iconKey kept) |
| OB4 mission | Objectives.jsx:89-92 | objectives.mission {title, body} (iconKey kept) |
| OB5 valuesHeading | Objectives.jsx:118 | objectives.valuesHeading |
| OB6 values[] | Objectives.jsx:14-35 | objectives.values[] (order,title,description,iconKey) |
| OB7 card icons | Objectives.jsx:67,89 | KEPT (decorative) |

### Counts (`counts` doc + `stat`/`achievement` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| CT1 sectionTitle | Counts.jsx:138 | counts.sectionTitle |
| CT2 stats[] | Counts.jsx:72-109 | counts.stats[] (order,number,suffix,label,description,iconKey) |
| CT3 number/suffix | Counts.jsx:161 | counts.stats[].number / .suffix |
| CT4 achievements[] | Counts.jsx:111-122 | counts.achievements[] (order,title,description,iconKey) |
| CT5 durations | Counts.jsx:49-69 | KEPT (animation math) |
| CT6 colors | Counts.jsx:79/89/… | KEPT (CSS vars) |

### WhyUs (`whyUs` doc + `whyUsReason`/`footerStat` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| WU1 sectionTitle | WhyUs.jsx:88 | whyUs.sectionTitle |
| WU2 intro | WhyUs.jsx:90-94 | whyUs.intro |
| WU3 reasons[] | WhyUs.jsx:15-68 | whyUs.reasons[] (order,title,description,features[],iconKey) |
| WU4 comparisonHeading | WhyUs.jsx:132 | whyUs.comparisonHeading |
| WU5 column labels | WhyUs.jsx:138,167 | whyUs.comparisonUsLabel / comparisonOthersLabel |
| WU6 us items | WhyUs.jsx:144-161 | whyUs.comparisonUsItems[] |
| WU7 others items | WhyUs.jsx:173-189 | whyUs.comparisonOthersItems[] |
| WU8 footerStats[] | WhyUs.jsx:213-216 | whyUs.footerStats[] (order,number,label) |
| WU9 icons | WhyUs.jsx:31,110 | KEPT (decorative) |
| Commented CTA | WhyUs.jsx:218-328 | KEPT (not rendered) |

### Services (`servicesSection` doc + `service` doc — exists)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| SV1 sectionTitle | Services.jsx:68 | servicesSection.sectionTitle |
| SV2 service cards | Services.jsx:34-62 | service docs (title,text,icon,featured,orderRank,background*,mediaItems[]) |
| SV3 icon map | Services.jsx:17-22 | service.icon (key → element) |
| SV4 bg image | Services.jsx:42-53 | service.backgroundType/Image/VideoUrl |
| SM1 modal subtitle | ServiceModal.jsx:60 | KEPT (derived: contentItems.length) |
| SM2 instagramUrl | ServiceModal.jsx:47 | siteSettings.instagramUrl |
| SM3 instagramCtaLabel | ServiceModal.jsx:101 | siteSettings.instagramCtaLabel |
| SM4 data-item-type | ServiceModal.jsx:83 | KEPT (JS hook attr) |

### Portfolio (`portfolioSection` doc + `portfolioCategory`/`portfolioItem` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| PO1 sectionTitle | Portfolio.jsx:150 | portfolioSection.sectionTitle |
| PO2 categories[] | Portfolio.jsx:18-25 | portfolioSection.categories[] (order,label) |
| PO3 portfolioItem | Portfolio.jsx:27-113 | portfolioItem (order,title,category,shortDescription,details,coverImage,coverAlt,client,year,duration,awards[],watchCtaLabel) |
| PO4 coverImage | Portfolio.jsx:33/48/… | portfolioItem.coverImage (image) |
| PO5 category badge | Portfolio.jsx:193 | portfolioItem.category |
| PO6 title | Portfolio.jsx:194 | portfolioItem.title |
| PO7 description | Portfolio.jsx:195 | portfolioItem.shortDescription |
| PO8 modal fields | Portfolio.jsx:290-375 | portfolioItem.details, client, year, duration, awards[], watchCtaLabel |
| PO9 /project/{id} | Portfolio.jsx:345 | KEPT (structural route) |

### Gallery (`gallerySection` doc + `galleryCategory`/`galleryItem` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| GA1 sectionTitle | Gallery.jsx:163 | gallerySection.sectionTitle |
| GA2 intro | Gallery.jsx:166-170 | gallerySection.intro |
| GA3 categories[] | Gallery.jsx:17-24 | gallerySection.categories[] (order,label) |
| GA4 galleryItem | Gallery.jsx:26-126 | galleryItem (order,title,category,description,coverImage,coverAlt,date,location,mediaType) |
| GA5 coverImage | Gallery.jsx:33/… | galleryItem.coverImage |
| GA6 overlay text | Gallery.jsx:206-210 | galleryItem.category/title/description |
| GA7 date/location | Gallery.jsx:34-35/… | galleryItem.date / galleryItem.location |
| GA8 mediaType | Gallery.jsx:36 | galleryItem.mediaType (photo/video) |
| GA9 viewMoreLink | Gallery.jsx:228 | gallerySection.viewMoreLink |
| GA10 viewMoreLabel | Gallery.jsx:229 | gallerySection.viewMoreLabel |
| GA11 /watch/{id} | Gallery.jsx:283 | KEPT (structural route) |

### Team (`teamSection` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| TM1 sectionTitle | Team.jsx:21 | teamSection.sectionTitle |
| TM2 intro | Team.jsx:23-25 | teamSection.intro |
| TM3 groupPhoto | Team.jsx:6 | teamSection.groupPhoto (image, decorative, alt="") |
| TM4 groupPhotoTitle | Team.jsx:47 | teamSection.groupPhotoTitle |
| TM5 groupPhotoDescription | Team.jsx:55 | teamSection.groupPhotoDescription |
| teamMember collection | — | Reserved (none rendered yet) |

### Partnership (`partnershipSection` doc + `partner`/`partnershipType` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| PA1 badgeLabel | Partnership.jsx:55 | partnershipSection.badgeLabel |
| PA2 sectionTitle | Partnership.jsx:63-65 | partnershipSection.sectionTitle |
| PA3 intro | Partnership.jsx:73-75 | partnershipSection.intro |
| PA4 partners[] | partnerImages.jsx:17-32 | partnershipSection.partners[] (order,name,logo,logoAlt,url) |
| PA5 name/alt | partnerImages.jsx:18 | partners[].name / partners[].logoAlt |
| PA6 logo image | partnerImages.jsx:2-15 | partners[].logo (image) |
| PA7 partnershipTypes[] | Partnership.jsx:16-31 | partnershipSection.types[] (order,title,description,features[],iconKey,color,accent) |
| PA8 actionButtonLabel | Partnership.jsx:205 | partnershipSection.actionButtonLabel |
| Doubled carousel | Partnership.jsx:81 | KEPT (structural) |
| Commented stats/CTA | Partnership.jsx:223-353 | KEPT (not rendered) |

### GetInTouch (`getInTouch` doc + `contactDetail`/`socialLink` collections)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| GT1 sectionTitle | GetInTouch.jsx:85 | getInTouch.sectionTitle |
| GT2 intro | GetInTouch.jsx:86-89 | getInTouch.intro |
| GT3 contactDetails[] | GetInTouch.jsx:17-42 | getInTouch.contactDetails[] (order,title,content,link,linkText,external,iconKey) |
| GT4 contact links | GetInTouch.jsx:22,30,38 | contactDetails[].link |
| GT5 linkText | GetInTouch.jsx:23,31,39 | contactDetails[].linkText |
| GT6 socials[] | GetInTouch.jsx:44-73 | getInTouch.socials[] (order,platform,handle,url,iconClass,color) |
| GT7 socialsHeading | GetInTouch.jsx:135 | getInTouch.socialsHeading |
| GT8 ctaTitle | GetInTouch.jsx:176 | getInTouch.ctaTitle |
| GT9 ctaDescription | GetInTouch.jsx:178 | getInTouch.ctaDescription |
| GT10 consultationUrl | GetInTouch.jsx:182 | getInTouch.consultationUrl |
| GT11 bookNowLabel | GetInTouch.jsx:189 | getInTouch.bookNowLabel |
| GT12 callUrl | GetInTouch.jsx:192 | getInTouch.callUrl |
| GT13 callLabel | GetInTouch.jsx:197 | getInTouch.callLabel |
| GT14 ctaNote | GetInTouch.jsx:201 | getInTouch.ctaNote |
| Icons/colors | GetInTouch.jsx:19-73 | KEPT as iconKey + color style fields |

### Footer (`footer` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| FT1 logo image | Footer.jsx:5 | footer.logo (image) |
| FT2 logo alt | Footer.jsx:33 | footer.logoAlt |
| FT3 socials[] | Footer.jsx:9-25 | footer.socials[] (platform,url,iconClass,color) |
| FT4 privacyLink/label | Footer.jsx:50 | footer.privacyLink / footer.privacyLabel |
| FT5 copyrightText | Footer.jsx:54 | footer.copyrightText (brand name + format) |
| Year | Footer.jsx:54 | KEPT (computed Date) |

### ScrollToTop
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| Renders null | ScrollToTop.jsx:17 | KEPT (no content) |

### PrivacyPolicy (`privacyPolicy` doc)
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| PP1 back route | PrivacyPolicy.jsx:15 | KEPT (structural route) |
| PP2 backToHomeLabel | PrivacyPolicy.jsx:16 | privacyPolicy.backToHomeLabel |
| PP3 eyebrow | PrivacyPolicy.jsx:21 | privacyPolicy.eyebrow |
| PP4 title | PrivacyPolicy.jsx:22 | privacyPolicy.title |
| PP5 effectiveDate | PrivacyPolicy.jsx:25 | privacyPolicy.effectiveDate |
| PP6 lastUpdated | PrivacyPolicy.jsx:28 | privacyPolicy.lastUpdated |
| PP7 body | PrivacyPolicy.jsx:33-176 | privacyPolicy.body (Portable Text, custom serializers) |
| PP8 contact block | PrivacyPolicy.jsx:173-175 | siteSettings.email/phone/website |

### App.jsx / public/index.html
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| AP1 loading/Preloader | App.jsx:31 | KEPT (behaviour) |
| AP2 queries | App.jsx:16-17 | Extended queries.js (see §D) |
| SEO meta | public/index.html | DEFERRED (siteSettings.siteUrl stored, not rendered) |

### ErrorBoundary
| Audit row | File:line | Maps to |
|-----------|-----------|---------|
| fallbackText | ErrorBoundary.jsx:21 | errorBoundary.fallbackText |

**Total: every AUDIT §2 row (H1→PP8, AP1→AP2) is mapped to exactly one Studio field or explicitly KEPT.** No row is orphaned.

---

## §G — Deferred items (explicitly NOT in this phase)

1. **SEO meta rendering** — `siteSettings.siteUrl` + `seo` object stored but not rendered. `public/index.html` remains authoritative. Requires React Helmet + App.jsx changes in a separate phase.
2. **Preloader video asset** — `/assets/img/WildNowLogovideo.mp4` existence unverified. If missing, `preloader.backgroundVideoUrl` stays editable; local fallback prevents crash.
3. **`@portabletext/react` install** — required dependency addition (justified §H).
4. **Team members** — `teamMember` collection schema created but no members rendered yet; reserved for future.
5. **GetInTouch form** — confirmed none exists; no form fields added.

---

## §H — `@portabletext/react` dependency justification

- **Why required:** Privacy Policy body is multi-section rich text (h2, h3, p, ul/li, strong, a). A raw HTML textarea is not editor-friendly and defeats the mission (D1).
- **Package:** `@portabletext/react` (first-party Sanity package), ~15KB, well-maintained.
- **Constraint 5 compliance:** "strictly required for Sanity to work" for editable rich text. Added to root `package.json` dependencies only. No other deps added.
- **Version:** pin to latest stable at install time (no build config changes).
- **Serializers:** custom serializers map `block` styles and `span` marks to current tags/classes inside `.privacy-policy-body` so rendered HTML is byte-identical in structure/classNames to current output.

---

## §I — Backup + dry-run + idempotent seed plan (Batch 2)

1. `npx sanity dataset export production backup-<YYYYMMDD-HHMM>.tar.gz` — commit backup path in batch report.
2. Seed script runs with `--dry-run` first: prints full payload of every `createOrReplace`, no writes. Review against current hardcoded values.
3. Execute: `createOrReplace` only, deterministic `_id`s, never `create`/`delete`.
4. Target dataset: confirm at Batch 2 (original brief says dev dataset; studio config targets production).

---

## §J — Field reference: labels + descriptions (excerpt, full list in schema files)

Example standard (every field follows this):

```ts
defineField({
  name: 'headline',
  title: 'Headline',
  type: 'string',
  group: 'content',
  description: 'Appears as the large H1 at the top of the homepage.',
  validation: (Rule) => Rule.required(),
  initialValue: 'Where visual storytelling',
})
```

Every field in §F gets `title`, `description` (where it appears), `group`, `validation` (required/warning), `initialValue` (= current hardcoded value). Collection docs get `preview` with `select` + `prepare`.

---

**End of Phase 2 plan.** No code changes yet. Waiting for approval of `SCHEMA_PLAN.md` before Batch 1 (schema files).
