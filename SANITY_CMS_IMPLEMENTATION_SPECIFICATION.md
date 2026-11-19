# SANITY CMS IMPLEMENTATION SPECIFICATION — Prince House Films

**Project:** Prince House Films  
**Repo:** `/Users/lumona/Companies/Electrixitaty/Wansenziroz/Clients/prince-house-films`  
**Branch:** `feat/sanity`  
**App:** React CRA (`/src`), Sanity Studio v5 (`/studio`)  
**Sanity project:** `zsbii2ih`, dataset `production`  
**Specification date:** Wed Nov 18 2026  
**Status:** READ-ONLY investigation. No source files modified.  
**Deliverable:** `SANITY_CMS_IMPLEMENTATION_SPECIFICATION.md` (project root)

---

## 1. Executive Summary

This specification defines exactly what must change to make Sanity the reliable content management source for the Prince House Films website. It corrects multiple errors in the preceding `SANITY_CONTENT_COVERAGE_AUDIT.md` and provides an implementation-ready blueprint.

**Key verified findings:**

| Item | Verified Count | Audit Claim | Discrepancy |
|------|---------------|-------------|-------------|
| Schema type definition files | 33 (excluding index.ts) | 37 | Overstated by 4 |
| Schema types registered in index.ts | 33 | 37 | Overstated by 4 |
| GROQ queries defined | 23 | 21 | Understated by 2 |
| GROQ queries consumed by components | 20 | 21 | 3 unused (partnersQuery, partnershipTypesQuery, errorBoundaryQuery) |
| Gap register entries | G01–G32 (32 entries) | 29 | Underreported by 3 |
| P0 gaps | 5 | 5 | Correct |
| P1 gaps | 11 | 8 | Underreported (G14 omitted) |
| P2 gaps | 11 | 10 | Underreported (G23 omitted) |
| P3 gaps | 5 | 6 | Overreported |
| Services in seed script | 4 named | 8 | Overstated (4 UUID-only are comment-only, not seeded) |
| Partner logo files on disk | 15 (eabl.jpeg + eabl.png duplicate) | 14 | One duplicate file |
| Partners referenced in code | 14 | 14 | Correct |
| Local media files (src/assets/img/) | 23 | ~32 | Overstated |
| Public media files | 2 (logo192.png, logo512.png) | 3 (incl. favicon.ico) | favicon.ico not found in public/ |
| WildNowLogovideo.mp4 | NOT FOUND anywhere | Referenced | File missing |
| Sections rendered in App.jsx | 9 (Preloader conditional + 8) | 7 or 9 | Inconsistent in audit |
| Sections NOT rendered | 6 (Objectives, Counts, Approach, WhyUs, Portfolio, Gallery) | 6 | Correct |

**Core architectural problems:**
1. Six fully Sanity-wired sections are not mounted in `App.jsx` and are invisible on the live site.
2. `partnershipSectionQuery` omits `partnershipTypes[]`, so CMS-editable partnership types are never used.
3. `ErrorBoundary.jsx` is a class component; `errorBoundary.fallbackText` from CMS is never consumed.
4. `Counts.jsx` references `stat.key` but the query returns `order`, breaking counter animation keys.
5. No uploaded video file support exists in `mediaItem` — only external video URLs.
6. No video poster/thumbnail support exists.
7. Partners are duplicated: embedded in `partnershipSection.partners[]` AND as separate `partner` collection docs.
8. `partnersQuery` and `partnershipTypesQuery` are defined but never consumed by any component.

---

## 2. Scope and Audit Methodology

### 2.1 Scope

This specification covers:
- All React components in `src/components/` and `src/pages/`
- Application shell (`src/App.jsx`, `src/index.js`)
- Data layer (`src/lib/`: sanity.js, queries.js, useSanityData.js, mediaUtils.js, fallbacks.js)
- Local assets (`src/assets/img/`, `public/`)
- Sanity Studio configuration (`studio/sanity.config.ts`, `studio/sanity.cli.ts`)
- All 33 schema type files in `studio/schemaTypes/`
- Seed script (`scripts/seedSanity.js`)
- Static HTML (`public/index.html`)

### 2.2 Methodology

1. Read the existing `SANITY_CONTENT_COVERAGE_AUDIT.md` in full.
2. Independently inspect every source file listed above.
3. Verify each audit claim against actual source code.
4. Distinguish four content states for every item:
   - **Website content:** Actually rendered or referenced by the live site
   - **Code content:** Exists in source files, fallbacks, or seed scripts
   - **Schema support:** Sanity has fields capable of storing the content
   - **Production CMS content:** Actually exists in the Sanity dataset (UNVERIFIED — no dataset access available)
5. Never treat these states as interchangeable.
6. Production dataset access was unavailable; all claims about production document existence are marked unverified.

### 2.3 Verified Discrepancy Corrections

| # | Audit Claim | Verified Reality | Correction |
|---|-------------|-----------------|------------|
| 1 | 37 schema types | 33 type files registered in index.ts | Corrected to 33 |
| 2 | 21 GROQ queries | 23 queries defined in queries.js | Corrected to 23 |
| 3 | 32 gaps, 29 total | 32 numbered gaps (G01–G32) | Corrected to 32 |
| 4 | P1=8, P2=10, P3=6 | P1=11, P2=11, P3=5 | Corrected totals |
| 5 | Portfolio/Gallery schema-complete | Missing multi-media support (only cover image) | Marked as gaps |
| 6 | Partner logos as Sanity-managed | Local files imported via partnerImages.jsx; fallbackPartners uses local imports; Sanity partner docs lack logo images in seed | Marked as migration required |
| 7 | 8 service documents | 4 named services in seed; 4 UUID-only in comments only (not verified in production) | Corrected to 4 seeded |
| 8 | ~32 local media assets | 23 files in src/assets/img/ + 2 in public/ = 25 | Corrected to 25 |

---

## 3. Verified Existing Architecture

### 3.1 Technology Stack

| Layer | Technology | Version | Location |
|-------|-----------|---------|----------|
| Frontend framework | React | ^19.2.0 | `src/` |
| Build tool | react-scripts (CRA) | 5.0.1 | `package.json` |
| Routing | react-router-dom | ^7.14.1 | `src/index.js`, `src/App.jsx` |
| Animation | framer-motion | ^12.26.2 | Components |
| Icons | bootstrap-icons, react-icons | ^1.11.3, ^5.5.0 | Components + HTML |
| CMS | Sanity Studio | ^5.21.0 | `studio/` |
| Sanity client | @sanity/client | ^7.21.0 | `src/lib/sanity.js` |
| Image URL builder | @sanity/image-url | ^2.1.1 | `src/lib/sanity.js` |
| Portable Text | @portabletext/react | ^8.0.1 | `package.json` (installed, used by PrivacyPolicy) |

### 3.2 Routes

| Path | Component | Rendered? |
|------|-----------|-----------|
| `/` | HomePage | Yes |
| `/privacy-policy` | PrivacyPolicy | Yes |

### 3.3 Sections Rendered vs. Not Rendered (Verified)

| Section | Component | Schema | Query | Rendered in App.jsx? | Data Source |
|---------|-----------|--------|-------|---------------------|-------------|
| Preloader (conditional) | Preloader.jsx | preloader | preloaderQuery | Yes (when loading) | Sanity + fallback |
| Hero | Hero.jsx | hero | heroQuery | Yes | Prop from App.jsx + local fallbackHero |
| Header | Header.jsx | header | headerQuery | Yes | Sanity + fallbackHeader |
| About | About.jsx | about | aboutQuery | Yes | Sanity + fallbackAbout |
| Services | Services.jsx | service + servicesSection | servicesQuery + servicesSectionQuery | Yes | Prop from App.jsx + useSanityData |
| Partnerships | Partnership.jsx | partnershipSection | partnershipSectionQuery + partnersQuery | Yes | Sanity + fallbacks (types missing from query) |
| Team | Team.jsx | teamSection | teamQuery | Yes | Sanity + fallbackTeam |
| Get In Touch | GetInTouch.jsx | getInTouch | getInTouchQuery | Yes | Sanity + fallbackGetInTouch |
| Footer | Footer.jsx | footer | footerQuery | Yes | Sanity + fallbackFooter |
| Objectives | Objectives.jsx | objectives | objectivesQuery | **NO** | Sanity + fallbackObjectives (unused) |
| Counts | Counts.jsx | counts | countsQuery | **NO** | Sanity + fallbackCounts (unused) |
| Approach | Approach.jsx | approach | approachQuery | **NO** | Sanity + fallbackApproach (unused) |
| Why Us | WhyUs.jsx | whyUs | whyUsQuery | **NO** | Sanity + fallbackWhyUs (unused) |
| Portfolio | Portfolio.jsx | portfolioSection + portfolioItem | portfolioSectionQuery + portfolioItemsQuery | **NO** | Sanity + fallbacks (unused) |
| Gallery | Gallery.jsx | gallerySection + galleryItem | gallerySectionQuery + galleryItemsQuery | **NO** | Sanity + fallbacks (unused) |
| Privacy Policy | PrivacyPolicy.jsx | privacyPolicy | privacyPolicyQuery + siteSettingsQuery | Yes (route) | Sanity + fallbackPrivacyPolicy |

**Confirmed:** 6 sections (Objectives, Counts, Approach, Why Us, Portfolio, Gallery) have complete schemas, queries, and fallbacks but are **not imported or rendered** in `App.jsx`. They are invisible on the live website.

### 3.4 Schema Types (Verified: 33 registered)

| # | Type | Kind | File | Registered in index.ts? |
|---|------|------|------|------------------------|
| 1 | hero | document | heroType.ts | Yes |
| 2 | service | document | serviceType.ts | Yes |
| 3 | mediaItem | object | mediaItemType.ts | Yes |
| 4 | siteSettings | document | siteSettingsType.ts | Yes |
| 5 | header | document | headerType.ts | Yes |
| 6 | preloader | document | preloaderType.ts | Yes |
| 7 | about | document | aboutType.ts | Yes |
| 8 | approach | document | approachType.ts | Yes |
| 9 | objectives | document | objectivesType.ts | Yes |
| 10 | counts | document | countsType.ts | Yes |
| 11 | whyUs | document | whyUsType.ts | Yes |
| 12 | servicesSection | document | servicesSectionType.ts | Yes |
| 13 | portfolioSection | document | portfolioSectionType.ts | Yes |
| 14 | gallerySection | document | gallerySectionType.ts | Yes |
| 15 | teamSection | document | teamSectionType.ts | Yes |
| 16 | partnershipSection | document | partnershipSectionType.ts | Yes |
| 17 | getInTouch | document | getInTouchType.ts | Yes |
| 18 | footer | document | footerType.ts | Yes |
| 19 | privacyPolicy | document | privacyPolicyType.ts | Yes |
| 20 | errorBoundary | document | errorBoundaryType.ts | Yes |
| 21 | approachStep | document | approachStepType.ts | Yes |
| 22 | portfolioCategory | document | portfolioCategoryType.ts | Yes |
| 23 | portfolioItem | document | portfolioItemType.ts | Yes |
| 24 | galleryCategory | document | galleryCategoryType.ts | Yes |
| 25 | galleryItem | document | galleryItemType.ts | Yes |
| 26 | teamMember | document | teamMemberType.ts | Yes |
| 27 | partner | document | partnerType.ts | Yes |
| 28 | contactDetail | document | contactDetailType.ts | Yes |
| 29 | internalLink | object | internalLinkType.ts | Yes |
| 30 | externalLink | object | externalLinkType.ts | Yes |
| 31 | socialLink | object | socialLinkType.ts | Yes |
| 32 | seo | object | seoType.ts | Yes |
| 33 | (index.ts registry) | — | index.ts | N/A |

**Total: 33 schema types** (32 definition files + index.ts registry). Not 37 as previously claimed.

### 3.5 GROQ Queries (Verified: 23 defined)

| # | Query | Type | Used By? |
|---|-------|------|----------|
| 1 | heroQuery | hero | Yes (App.jsx → Hero) |
| 2 | servicesQuery | service[] | Yes (App.jsx → Services) |
| 3 | siteSettingsQuery | siteSettings | Yes (ServiceModal, PrivacyPolicy) |
| 4 | headerQuery | header | Yes (Header.jsx) |
| 5 | preloaderQuery | preloader | Yes (Preloader.jsx) |
| 6 | aboutQuery | about | Yes (About.jsx) |
| 7 | approachQuery | approach | Yes (Approach.jsx — not rendered) |
| 8 | objectivesQuery | objectives | Yes (Objectives.jsx — not rendered) |
| 9 | countsQuery | counts | Yes (Counts.jsx — not rendered) |
| 10 | whyUsQuery | whyUs | Yes (WhyUs.jsx — not rendered) |
| 11 | servicesSectionQuery | servicesSection | Yes (Services.jsx) |
| 12 | portfolioSectionQuery | portfolioSection | Yes (Portfolio.jsx — not rendered) |
| 13 | portfolioItemsQuery | portfolioItem[] | Yes (Portfolio.jsx — not rendered) |
| 14 | gallerySectionQuery | gallerySection | Yes (Gallery.jsx — not rendered) |
| 15 | galleryItemsQuery | galleryItem[] | Yes (Gallery.jsx — not rendered) |
| 16 | teamQuery | teamSection | Yes (Team.jsx) |
| 17 | partnershipSectionQuery | partnershipSection | Yes (Partnership.jsx — missing partnershipTypes[]) |
| 18 | partnersQuery | partner[] | **NO** (component uses embedded partners[]) |
| 19 | partnershipTypesQuery | partnershipSection | **NO** (redundant) |
| 20 | getInTouchQuery | getInTouch | Yes (GetInTouch.jsx) |
| 21 | footerQuery | footer | Yes (Footer.jsx) |
| 22 | privacyPolicyQuery | privacyPolicy | Yes (PrivacyPolicy.jsx) |
| 23 | errorBoundaryQuery | errorBoundary | **NO** (class component can't use hooks) |

**Total: 23 queries defined, 20 consumed, 3 unused.**

### 3.6 Studio Desk Structure

Defined inline in `studio/sanity.config.ts` using `structureTool`. No separate `studio/structure/` directory exists.

**Page Sections (singletons):** Site Settings, Header, Preloader, Hero, About, Our Creative Process, Our Vision & Mission, Our Impact in Numbers, Why Choose Us, Services Section, Portfolio Section, Gallery Section, Team Section, Partnership Section, Get In Touch, Footer, Privacy Policy, Error Boundary.

**Collections:** Services, Approach Steps, Portfolio Categories, Portfolio Items, Gallery Categories, Gallery Items, Partner Logos, Contact Details. (Team Members commented out.)

### 3.7 Local Media Assets (Verified)

**src/assets/img/ — 23 files:**

| Asset | Used By | Status |
|-------|---------|--------|
| phf_word_logo.png | Header.jsx:4 | Active (brand) |
| phf_logo.png | Preloader.jsx:4, Footer.jsx:5 | Active (brand) |
| logo.png | None | **Unused** |
| about.png | None | **Unused** (1.9 MB) |
| team.jpg | Team.jsx:10 | Active (group photo) |
| partners/cocacola.jpeg | partnerImages.jsx:2, fallbacks.js | Active |
| partners/darling.png | partnerImages.jsx:3, fallbacks.js | Active |
| partners/delish.png | partnerImages.jsx:4, fallbacks.js | Active |
| partners/drmatress.png | partnerImages.jsx:5, fallbacks.js | Active |
| partners/eabl.jpeg | partnerImages.jsx:6, fallbacks.js | Active |
| partners/eabl.png | None | **Duplicate** (not imported) |
| partners/furnitureplace.png | partnerImages.jsx:7, fallbacks.js | Active |
| partners/lcwaikiki.png | partnerImages.jsx:8, fallbacks.js | Active |
| partners/megagrowth.png | partnerImages.jsx:9, fallbacks.js | Active |
| partners/orient.png | partnerImages.jsx:10, fallbacks.js | Active |
| partners/prestige.png | partnerImages.jsx:11, fallbacks.js | Active |
| partners/sarit.png | partnerImages.jsx:12, fallbacks.js | Active |
| partners/titi.png | partnerImages.jsx:13, fallbacks.js | Active |
| partners/tworivers.png | partnerImages.jsx:14, fallbacks.js | Active |
| partners/vspa.png | partnerImages.jsx:15, fallbacks.js | Active |
| services/creativeContent.gif | Services.jsx:14 | Active (fallback) |
| services/motion.gif | Services.jsx:15 | Active (fallback) |

**public/ — 2 image files:**

| Asset | Used By | Status |
|-------|---------|--------|
| logo192.png | index.html (manifest) | Active |
| logo512.png | index.html (manifest, favicon) | Active |

**favicon.ico:** Referenced in allfiles.txt but **not found** in public/ directory listing.

**WildNowLogovideo.mp4:** Referenced at Preloader.jsx:334 and fallbacks.js:59 but **not found** anywhere in the project. No .mp4, .mov, or .webm files exist.

**Total local media files:** 23 (src/assets/img/) + 2 (public/) = 25. Not ~32 as previously claimed.

### 3.8 External Media URLs (Verified from fallbacks.js)

| URL | Used By | Type |
|-----|---------|------|
| https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov | Hero.jsx:11-12 | Direct video |
| https://images.unsplash.com/photo-1550358864-518f202c02ba | Portfolio item 1, Gallery item 1 | External image |
| https://images.unsplash.com/photo-1552664730-d307ca884978 | Portfolio item 2, Gallery item 2 | External image |
| https://images.unsplash.com/photo-1470225620780-dba8ba36b745 | Portfolio item 3, Gallery item 3 | External image |
| https://images.unsplash.com/photo-1556761175-b413da4baf72 | Portfolio item 4, Gallery item 5, 9 | External image |
| https://images.pexels.com/photos/147413/... | Portfolio item 5 | External image |
| https://images.unsplash.com/photo-1489824904134-891ab64532f1 | Portfolio item 6 | External image |
| https://images.unsplash.com/photo-1506905925346-21bda4d32df4 | Gallery item 4 | External image |
| https://images.unsplash.com/photo-1563297007-0686b7003af7 | Gallery item 5 | External image |
| https://images.unsplash.com/photo-1511578314322-379afb476865 | Gallery item 6 | External image |
| https://images.unsplash.com/photo-1593359677879-a4bb92f829d1 | Gallery item 7 | External image |
| https://images.unsplash.com/photo-1578662996442-48f60103fc96 | Gallery item 8 | External image |
| https://assets.codepen.io/148180/video1.mp4 | portfolioData.js (unused) | External video |
| https://assets.codepen.io/148180/video2.mp4 | portfolioData.js (unused) | External video |

**Unique external media URLs actually used by rendered components:** 1 video (hero) + 10 images (portfolio/gallery fallbacks) = 11. The CodePen videos are in the unused portfolioData.js stub.

---

## 4. Corrected Website Content Inventory

### 4.1 Rendered Sections (9 on homepage + 1 route)

#### 4.1.1 Header (`src/components/Header/Header.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (via `useSanityData(headerQuery, {}, fallbackHeader)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Logo image | Header.jsx:4 | image | phf_word_logo.png (local import) | `header.logo` |
| Logo alt text | Header.jsx:57 | text | "Prince House Films" | `header.logoAlt` |
| Nav: Home | Header.jsx:71 | internal link | label="Home", path="/" | `header.navLinks[]` |
| Nav: Who We Are | Header.jsx:72 | internal link | label="Who We Are", path="/about" | `header.navLinks[]` |
| Nav: What We Do | Header.jsx:73 | internal link | label="What We Do", path="/services" | `header.navLinks[]` |
| Nav: partnerships | Header.jsx:74 | internal link | label="partnerships" (lowercase), path="/partnerships" | `header.navLinks[]` |
| Nav: The Team | Header.jsx:75 | internal link | label="The Team", path="/team" | `header.navLinks[]` |
| Nav: Contact | Header.jsx:76 | internal link | label="Contact", path="/contact" | `header.navLinks[]` |
| Menu open ARIA | Header.jsx:101 | text | "Open menu" | `header.menuOpenAria` |
| Menu close ARIA | Header.jsx:101 | text | "Close menu" | `header.menuCloseAria` |

**Repeat count:** 6 nav links  
**Note:** Nav paths are structural (tied to single-page anchor scroll) but editable via CMS.

#### 4.1.2 Hero (`src/components/Hero/Hero.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Partial (prop from App.jsx which fetches heroQuery; local `fallbackHero` bypasses `useSanityData`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Main title | Hero.jsx:6 | text | "Where visual storytelling" | `hero.title` |
| Highlighted text | Hero.jsx:7 | text | "meets strategy" | `hero.highlightedText` |
| CTA label | Hero.jsx:8 | text | "Start Your Project" | `hero.ctaText` |
| CTA link | Hero.jsx:9 | url | "#contact" | `hero.ctaLink` |
| Background type | Hero.jsx:10 | enum | "video" | `hero.backgroundType` |
| Background video URL | Hero.jsx:11-12 | url | Cloudinary .mov URL | `hero.backgroundVideoUrl` |
| Background image | Hero.jsx:20-23 | image | (none set) | `hero.backgroundImage` |

**Issue:** Dual data source — App.jsx prop AND local `fallbackHero` object (lines 5-13).

#### 4.1.3 Preloader (`src/components/Preloader/Preloader.jsx`)

**Rendered:** Yes (conditional on loading state)  
**Sanity-driven:** Yes (via `useSanityData(preloaderQuery, {}, fallbackPreloader)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Logo image | Preloader.jsx:4 | image | phf_logo.png (local import) | `preloader.logo` |
| Logo alt text | Preloader.jsx:182 | text | "Princehouse Films Logo" | `preloader.logoAlt` |
| Loading text | Preloader.jsx:237 | text | "Loading" | `preloader.loadingText` |
| Loading detail 1 | Preloader.jsx:290 | text | "Initializing Visuals" | `preloader.loadingDetails[].label` |
| Loading detail 2 | Preloader.jsx:298 | text | "Loading Assets" | `preloader.loadingDetails[].label` |
| Loading detail 3 | Preloader.jsx:306 | text | "Preparing Experience" | `preloader.loadingDetails[].label` |
| Background video URL | Preloader.jsx:334 | url | "/assets/img/WildNowLogovideo.mp4" | `preloader.backgroundVideoUrl` |

**Issue:** `WildNowLogovideo.mp4` file does not exist in the project. The preloader will attempt to load a missing video.

**Repeat count:** 3 loading details

#### 4.1.4 About (`src/components/About/About.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (via `useSanityData(aboutQuery, {}, fallbackAbout)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Section title | About.jsx:21 | text | "Who We Are" | `about.title` |
| Body paragraph | About.jsx:26 | text | Long paragraph | `about.body` |
| CTA link | About.jsx:28 | url | "#contact" | `about.ctaLink` |
| CTA label | About.jsx:29 | text | "Work With Us" | `about.ctaText` |

**Note:** `about.png` exists (1.9 MB) but is unused by any component.

#### 4.1.5 Services (`src/components/Services/Services.jsx` + `ServiceModal.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (App.jsx fetches servicesQuery → props; Services.jsx fetches servicesSectionQuery via useSanityData)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Section title | Services.jsx:84 | text | "Our Creative Services" | `servicesSection.sectionTitle` |
| Service title | Services.jsx:109 | text | `item.title` | `service.title` |
| Service description | Services.jsx:111 | text | `item.text` | `service.text` |
| Service icon | Services.jsx:107 | icon element | `iconMap[item.icon]` | `service.icon` |
| Featured flag | Services.jsx:91 | boolean | `item.featured` | `service.featured` |
| Background type | Services.jsx:58 | enum | `item.backgroundType` | `service.backgroundType` |
| Background image | Services.jsx:59 | image | `item.backgroundImage` | `service.backgroundImage` |
| Background video URL | Services.jsx:65 | url | `item.backgroundVideoUrl` | `service.backgroundVideoUrl` |
| Local fallback key | Services.jsx:48-53 | string | title-matched "creative"/"motion"/"none" | `service.localFallbackKey` |
| Media items | Services.jsx:43 | array | `item.mediaItems[]` | `service.mediaItems[]` |

**ServiceModal:**
| Item | File:Line | Type | Current Value | Sanity Field |
|------|-----------|------|---------------|--------------|
| Modal title | ServiceModal.jsx:64 | text | `serviceData.title` | `service.title` |
| Visual contents count | ServiceModal.jsx:66 | text | `{contentItems.length}` | Derived (not CMS) |
| Media items grid | ServiceModal.jsx:79-94 | array | `contentItems[]` | `service.mediaItems[]` |
| Instagram URL | ServiceModal.jsx:102 | url | `settings.instagramUrl` | `siteSettings.instagramUrl` |
| Instagram CTA label | ServiceModal.jsx:107 | text | `settings.instagramCtaLabel` | `siteSettings.instagramCtaLabel` |

**Services seed status:** 4 named services (service-creative, service-motion, service-graphic, service-event) referenced in seed script comments. 4 UUID-only services (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) mentioned in comments as edited directly in Studio — NOT in seed script, production existence unverified.

**Issues:**
- Two queries for one section (servicesQuery + servicesSectionQuery)
- `localFallbackKey` title-matching is fragile
- `mediaItem` has no uploaded video file type, no poster/thumbnail

#### 4.1.6 Partnerships (`src/components/Partnership/Partnership.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Partial (section data from CMS; partnership types NOT queried; partners use embedded objects not collection)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Badge label | Partnership.jsx:55 | text | "Strategic Alliances" | `partnershipSection.badgeLabel` |
| Section title | Partnership.jsx:67 | text | "Our Valued Partnerships" | `partnershipSection.sectionTitle` |
| Intro text | Partnership.jsx:77 | text | "Building lasting relationships..." | `partnershipSection.intro` |
| Partner name | partnerImages.jsx:18-31 | text | 14 partner names | `partners[].name` (embedded) |
| Partner logo image | partnerImages.jsx:2-15 | image | 14 local imports | `partners[].logo` (embedded) |
| Partner logo alt | partnerImages.jsx:18-31 | text | 14 alt texts | `partners[].logoAlt` (embedded) |
| Partner URL | partnerImages.jsx:18-31 | url | null (all) | `partners[].url` (embedded) |
| Partnership type: Brand Partnerships | Partnership.jsx:109-217 | object | title, description, features[], iconKey, color, accent | `partnershipSection.partnershipTypes[]` (NOT queried) |
| Action button label | Partnership.jsx:204 | text | "Explore Partnership" | `partnershipSection.actionButtonLabel` |

**Repeat count:** 14 partners (rendered doubled via `[...partners, ...partners]` for infinite carousel), 1 partnership type

**Critical issues:**
1. `partnershipSectionQuery` does NOT include `partnershipTypes[]` — CMS-editable types never used; always falls back to `fallbackPartnershipTypes`.
2. Partners are embedded objects in `partnershipSection.partners[]` AND exist as separate `partner` collection docs (`partnerType`). The component reads embedded objects; `partnersQuery` is unused.
3. Partner logos have no external URL option (image-only).

**Partner list (14, verified from partnerImages.jsx and fallbacks.js):**

| # | Name | Logo File | Alt Text | URL |
|---|------|-----------|----------|-----|
| 1 | Coca Cola | cocacola.jpeg | "Coca Cola logo" | null |
| 2 | Darling | darling.png | "Darling logo" | null |
| 3 | Delish | delish.png | "Delish logo" | null |
| 4 | Dr. Mattress | drmatress.png | "Dr. Mattress logo" | null |
| 5 | EABL | eabl.jpeg | "EABL logo" | null |
| 6 | Furniture Place | furnitureplace.png | "Furniture Place logo" | null |
| 7 | LC Waikiki | lcwaikiki.png | "LC Waikiki logo" | null |
| 8 | Mega Growth | megagrowth.png | "Mega Growth logo" | null |
| 9 | Orient | orient.png | "Orient logo" | null |
| 10 | Prestige | prestige.png | "Prestige logo" | null |
| 11 | Sarit | sarit.png | "Sarit logo" | null |
| 12 | Titi | titi.png | "Titi logo" | null |
| 13 | Two Rivers | tworivers.png | "Two Rivers logo" | null |
| 14 | V Spa | vspa.png | "V Spa logo" | null |

**Note:** `eabl.png` exists on disk but is not imported; `eabl.jpeg` is used.

#### 4.1.7 Team (`src/components/Team/Team.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (via `useSanityData(teamQuery, {}, fallbackTeam)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Section title | Team.jsx:26 | text | "Meet Our Creative Team" | `teamSection.sectionTitle` |
| Intro text | Team.jsx:27 | text | "A passionate collective..." | `teamSection.intro` |
| Group photo | Team.jsx:6 | image | team.jpg (local import, backgroundImage on div) | `teamSection.groupPhoto` |
| Group photo title | Team.jsx:49 | text | "The Creative Minds" | `teamSection.groupPhotoTitle` |
| Group photo description | Team.jsx:57 | text | "United by passion..." | `teamSection.groupPhotoDescription` |

**Note:** `teamMember` collection exists but no members are rendered — only group photo.

#### 4.1.8 Get In Touch (`src/components/GetInTouch/GetInTouch.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (via `useSanityData(getInTouchQuery, {}, fallbackGetInTouch)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Section title | GetInTouch.jsx:48 | text | "Have a Project In Mind?" | `getInTouch.sectionTitle` |
| Intro text | GetInTouch.jsx:50 | text | "Ready to bring your vision..." | `getInTouch.intro` |
| Contact: Location | GetInTouch.jsx:17-42 | card | "Nairobi, Kenya", maps URL | `contactDetails[]` |
| Contact: Email | GetInTouch.jsx:17-42 | card | "info@...", mailto: | `contactDetails[]` |
| Contact: Phone | GetInTouch.jsx:17-42 | card | "+254 715 130 028", tel: | `contactDetails[]` |
| Socials heading | GetInTouch.jsx:99 | text | "Follow Us" | `getInTouch.socialsHeading` |
| Social: Instagram | GetInTouch.jsx:102-122 | link | platform, handle, url | `getInTouch.socials[]` |
| Social: Facebook | GetInTouch.jsx:102-122 | link | platform, handle, url | `getInTouch.socials[]` |
| Social: TikTok | GetInTouch.jsx:102-122 | link | platform, handle, url | `getInTouch.socials[]` |
| Social: LinkedIn | GetInTouch.jsx:102-122 | link | platform, handle, url | `getInTouch.socials[]` |
| CTA title | GetInTouch.jsx:140 | text | "Free 30-Min Consultation" | `getInTouch.ctaTitle` |
| CTA description | GetInTouch.jsx:142 | text | "Discuss your project..." | `getInTouch.ctaDescription` |
| Consultation URL | GetInTouch.jsx:146 | url | Calendly URL | `getInTouch.consultationUrl` |
| Book Now label | GetInTouch.jsx:153 | text | "Book Now" | `getInTouch.bookNowLabel` |
| Call URL | GetInTouch.jsx:156 | url | tel:+254715130028 | `getInTouch.callUrl` |
| Call label | GetInTouch.jsx:161 | text | "Call" | `getInTouch.callLabel` |
| CTA note | GetInTouch.jsx:165 | text | "24-hour response" | `getInTouch.ctaNote` |

**Repeat count:** 3 contact details, 4 socials

#### 4.1.9 Footer (`src/components/Footer/Footer.jsx`)

**Rendered:** Yes  
**Sanity-driven:** Yes (via `useSanityData(footerQuery, {}, fallbackFooter)`)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Logo image | Footer.jsx:5 | image | phf_logo.png (local import) | `footer.logo` |
| Logo alt text | Footer.jsx:22 | text | "Prince House Films" | `footer.logoAlt` |
| Social: Instagram | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: YouTube | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: TikTok | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: Facebook | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Privacy link path | Footer.jsx:39 | internal link | "/privacy-policy" | `footer.privacyLink` |
| Privacy link label | Footer.jsx:39 | text | "Privacy Policy" | `footer.privacyLabel` |
| Copyright text | Footer.jsx:43 | text | "© {year} Prince House Films" | `footer.copyrightText` |

**Repeat count:** 4 socials

#### 4.1.10 Privacy Policy (`src/pages/PrivacyPolicy/PrivacyPolicy.jsx`)

**Rendered:** Yes (at `/privacy-policy` route)  
**Sanity-driven:** Yes (via `useSanityData(privacyPolicyQuery, {}, fallbackPrivacyPolicy)` + siteSettingsQuery)

| Content Item | File:Line | Type | Current Value | Sanity Field |
|-------------|-----------|------|---------------|--------------|
| Back to Home label | PrivacyPolicy.jsx:61 | text | "Back to Home" | `privacyPolicy.backToHomeLabel` |
| Eyebrow label | PrivacyPolicy.jsx:67 | text | "Legal" | `privacyPolicy.eyebrow` |
| Page title | PrivacyPolicy.jsx:68 | text | "Privacy Policy for Prince House Films" | `privacyPolicy.title` |
| Effective date | PrivacyPolicy.jsx:71 | text | "15/04/2026" | `privacyPolicy.effectiveDate` |
| Last updated | PrivacyPolicy.jsx:74 | text | "15/04/2026" | `privacyPolicy.lastUpdated` |
| Policy body | PrivacyPolicy.jsx:80 | rich text | 48 Portable Text blocks | `privacyPolicy.body` |
| Contact: brand name | PrivacyPolicy.jsx:85 | text | `settings.brandName` | `siteSettings.brandName` |
| Contact: email | PrivacyPolicy.jsx:87 | text | `settings.email` | `siteSettings.email` |
| Contact: phone | PrivacyPolicy.jsx:91 | text | "0715130028" (HARDCODED) | Not from CMS |
| Contact: website | PrivacyPolicy.jsx:92 | text | "www.princehousefilms.com" (HARDCODED) | Not from CMS |

**Issue:** Phone and website hardcoded in component, not from siteSettings.

**Repeat count:** 48 Portable Text blocks

---

### 4.2 Not Rendered Sections (6 — invisible on live site)

#### 4.2.1 Objectives (`src/components/Objectives/Objectives.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(objectivesQuery, {}, fallbackObjectives)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `objectives.sectionTitle` |
| Intro text | `objectives.intro` |
| Vision title/body | `objectives.vision.title/body` |
| Mission title/body | `objectives.mission.title/body` |
| Values heading | `objectives.valuesHeading` |
| 4 values (title, description, iconKey) | `objectives.values[]` |

**Repeat count:** 4 values

#### 4.2.2 Counts (`src/components/Counts/Counts.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(countsQuery, {}, fallbackCounts)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `counts.sectionTitle` |
| 4 stats (number, suffix, label, description, iconKey) | `counts.stats[]` |
| 2 achievements (title, description, iconKey) | `counts.achievements[]` |

**Repeat count:** 4 stats, 2 achievements

**Bug:** `Counts.jsx:44` uses `stat.key` but `countsQuery` projects `order`, not `key`. Counter animation keyed by `stat.key` will fail (undefined).

#### 4.2.3 Approach (`src/components/Approach/Approach.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(approachQuery, {}, fallbackApproach)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `approach.sectionTitle` |
| 5 steps (number, title, description, features[]) | `approach.steps[]` |
| 3 showcase items (title, description, iconKey) | `approach.showcase[]` |
| Process note quote | `approach.processNote` |
| Process note attribution | `approach.processNoteAttribution` |

**Repeat count:** 5 steps, 3 showcase items

#### 4.2.4 Why Us (`src/components/WhyUs/WhyUs.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(whyUsQuery, {}, fallbackWhyUs)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `whyUs.sectionTitle` |
| Intro text | `whyUs.intro` |
| 4 reasons (title, description, features[], iconKey) | `whyUs.reasons[]` |
| Comparison heading | `whyUs.comparisonHeading` |
| "With Us" / "With Others" labels | `whyUs.comparisonUsLabel`, `comparisonOthersLabel` |
| 5+5 comparison items | `whyUs.comparisonUsItems[]`, `comparisonOthersItems[]` |
| 4 footer stats (number, label) | `whyUs.footerStats[]` |

**Repeat count:** 4 reasons, 10 comparison items, 4 footer stats

#### 4.2.5 Portfolio (`src/components/Portfolio/Portfolio.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(portfolioSectionQuery + portfolioItemsQuery, {}, fallbacks)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `portfolioSection.sectionTitle` |
| 6 filter categories | `portfolioSection.categories[]` (references to portfolioCategory) |
| 6 portfolio items (title, category, shortDescription, details, coverImage, coverImageUrl, coverAlt, client, year, duration, awards[], watchCtaLabel) | `portfolioItem` docs |
| Category badge, title, description on card | `portfolioItem.category/title/shortDescription` |
| Modal: details, year, duration, client, category, awards, watch CTA | `portfolioItem` fields |

**Portfolio categories (6):** All Projects, Commercial, Documentary, Corporate, Social Media, Events

**Portfolio projects (6, from fallbacks):**

| # | Title | Category | Client | Year | Duration |
|---|-------|----------|--------|------|----------|
| 1 | Wildlife Conservation Documentary | documentary | National Geographic | 2023 | 45 min |
| 2 | Tech Startup Brand Film | commercial | TechNova Inc. | 2024 | 3 min |
| 3 | Music Festival Coverage | events | MTV Africa | 2023 | 120 min |
| 4 | Corporate Training Series | corporate | GlobalCorp | 2024 | 6 hours total |
| 5 | Social Media Campaign | social | UrbanStyle | 2024 | 30 sec episodes |
| 6 | Product Launch Film | commercial | Luxury Motors | 2023 | 5 min |

**Issues:**
- `portfolioItem.category` is a plain string, not a reference to `portfolioCategory`
- Only cover image supported — no additional media per project
- `coalesce(coverImageUrl, coverImage.asset->url)` gives external URL priority over Sanity asset
- `/project/{id}` route is hardcoded (structural)

#### 4.2.6 Gallery (`src/components/Gallery/Gallery.jsx`)

**Rendered:** NO  
**Sanity-driven:** Yes (via `useSanityData(gallerySectionQuery + galleryItemsQuery, {}, fallbacks)`) but unused

| Content Item | Sanity Field |
|-------------|--------------|
| Section title | `gallerySection.sectionTitle` |
| Intro text | `gallerySection.intro` |
| 6 filter categories | `gallerySection.categories[]` |
| View More link/label | `gallerySection.viewMoreLink/viewMoreLabel` |
| 9 gallery items (title, category, description, coverImage, coverImageUrl, coverAlt, date, location, mediaType) | `galleryItem` docs |

**Gallery categories (6):** All, Behind the Scenes, Production, Events, Locations, Equipment

**Gallery items (9, from fallbacks):**

| # | Title | Category | Date | Location | Type |
|---|-------|----------|------|----------|------|
| 1 | Wildlife Documentary Shoot | behind-scenes | 2023 | Maasai Mara, Kenya | photo |
| 2 | Studio Production Setup | production | 2024 | Nairobi Studio | photo |
| 3 | Music Festival Coverage | events | 2023 | Carnivore Grounds, Nairobi | video |
| 4 | Mountain Documentary Location | locations | 2023 | Mount Kenya | photo |
| 5 | Cinema Camera Setup | equipment | 2024 | Production Set | photo |
| 6 | Corporate Event Coverage | events | 2024 | KICC, Nairobi | video |
| 7 | Post-Production Suite | production | 2024 | Post-Production Studio | photo |
| 8 | Drone Cinematography | equipment | 2023 | Coastal Region | video |
| 9 | Interview Setup | behind-scenes | 2024 | Documentary Set | photo |

**Issues:**
- `galleryItem.category` is a plain string, not a reference to `galleryCategory`
- Only cover image supported — no additional media per item
- Same coalesce priority issue as portfolio
- `/watch/{id}` route is hardcoded (structural)

---

### 4.3 Unused Files

| File | Status | Notes |
|------|--------|-------|
| `src/data/portfolioData.js` | Unused | Not imported by any component. Seed stub only. |
| `src/components/Partnership/partnerImages.jsx` | Unused | Not imported by Partnership.jsx (uses fallbackPartners from fallbacks.js). Seed stub only. |
| `src/assets/img/logo.png` | Unused | Not imported by any component. |
| `src/assets/img/about.png` | Unused | 1.9 MB, not imported by any component. |
| `src/components/ErrorBoundary.jsx` | Used but class component | CMS `errorBoundary.fallbackText` never consumed. |
| `src/components/ScrollToTop.jsx` | Renders null | No content. |

---

## 5. Corrected Sanity Schema and Query Inventory

### 5.1 Schema Type Summary (33 total)

| Category | Count | Types |
|----------|-------|-------|
| Singleton documents | 18 | hero, service, siteSettings, header, preloader, about, approach, objectives, counts, whyUs, servicesSection, portfolioSection, gallerySection, teamSection, partnershipSection, getInTouch, footer, privacyPolicy, errorBoundary |
| Collection documents | 10 | approachStep, portfolioCategory, portfolioItem, galleryCategory, galleryItem, teamMember, partner, contactDetail |
| Embedded objects | 5 | mediaItem, internalLink, externalLink, socialLink, seo |

### 5.2 Schema-to-Query Coverage Gaps

| Schema | Query Defined? | Query Consumed? | All Fields Projected? |
|--------|---------------|-----------------|----------------------|
| hero | Yes | Yes | Yes |
| service | Yes | Yes | Yes |
| siteSettings | Yes | Yes | Yes |
| header | Yes | Yes | Yes |
| preloader | Yes | Yes | Yes |
| about | Yes | Yes | Yes |
| approach | Yes | Yes | Yes |
| objectives | Yes | Yes | Yes |
| counts | Yes | Yes | Yes |
| whyUs | Yes | Yes | Yes |
| servicesSection | Yes | Yes | Yes (sectionTitle only) |
| portfolioSection | Yes | Yes | Yes |
| portfolioItem | Yes | Yes | Yes |
| gallerySection | Yes | Yes | Yes |
| galleryItem | Yes | Yes | Yes |
| teamSection | Yes | Yes | Yes |
| partnershipSection | Yes | Yes | **NO** (missing partnershipTypes[]) |
| partner | Yes | **NO** | N/A |
| getInTouch | Yes | Yes | Yes |
| footer | Yes | Yes | Yes |
| privacyPolicy | Yes | Yes | Yes |
| errorBoundary | Yes | **NO** | N/A |
| approachStep | Yes | **NO** | N/A |
| portfolioCategory | Yes | **NO** (referenced via portfolioSection) | N/A |
| galleryCategory | Yes | **NO** (referenced via gallerySection) | N/A |
| galleryItem | Yes | Yes | Yes |
| teamMember | Yes | **NO** | N/A |
| contactDetail | Yes | **NO** (referenced via getInTouch) | N/A |
| mediaItem | N/A (object) | N/A | Yes |
| internalLink | N/A (object) | N/A | Yes |
| externalLink | N/A (object) | N/A | Yes |
| socialLink | N/A (object) | N/A | Yes |
| seo | N/A (object) | N/A | Yes |

### 5.3 Unused Queries

| Query | Reason Unused |
|-------|---------------|
| `partnersQuery` | Partnership.jsx uses embedded `partners[]` from partnershipSection, not the partner collection |
| `partnershipTypesQuery` | Redundant — partnership types should be part of partnershipSectionQuery |
| `errorBoundaryQuery` | ErrorBoundary.jsx is a class component; cannot use hooks or Sanity client |

---

## 6. Existing Problems and Audit Corrections

### 6.1 Corrected Discrepancies

| ID | Audit Claim | Verified Reality | Impact |
|----|-------------|-----------------|--------|
| D1 | 37 schema types | 33 schema types registered | Count corrected |
| D2 | 21 GROQ queries | 23 GROQ queries defined | Count corrected |
| D3 | 32 gaps, 29 total | 32 gaps (G01–G32) | Count corrected |
| D4 | P1=8, P2=10, P3=6 | P1=11, P2=11, P3=5 | Priority totals corrected |
| D5 | Services: 8 documents | 4 seeded in script; 4 UUID-only in comments (production unverified) | Count corrected |
| D6 | ~32 local media assets | 25 (23 in src/assets/img/ + 2 in public/) | Count corrected |
| D7 | Partner logos Sanity-managed | Local files imported; Sanity partner docs lack logo images in seed | Migration required |
| D8 | WildNowLogovideo.mp4 exists | File NOT FOUND anywhere in project | Preloader references missing asset |

### 6.2 Critical Production Risks

| Risk | Severity | Description |
|------|----------|-------------|
| R1 | Critical | `createOrReplace` in seedSanity.js will overwrite manually edited production documents without warning |
| R2 | Critical | 4 UUID-only services (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) exist only in Studio comments — not in seed script. Dataset reset would lose them. |
| R3 | High | `WildNowLogovideo.mp4` referenced but missing — preloader video will fail |
| R4 | High | 6 sections not rendered — CMS content for these sections is invisible |
| R5 | High | Partnership types not queried — CMS-editable content silently ignored |
| R6 | Medium | Partners duplicated between embedded objects and collection |

### 6.3 State Confusion Examples

The following are **not** production CMS content (production dataset access unavailable):

- `fallbackPortfolioItems` (6 projects with Unsplash/Pexels URLs) — these are fallback constants, NOT production data
- `fallbackGalleryItems` (9 items) — fallback constants, NOT production data
- `fallbackPartners` (14 partners with local image imports) — fallback constants, NOT production data
- Seed script documents — intended initial content, NOT verified production content
- `portfolioData.js` — unused stub, NOT production data
- `partnerImages.jsx` — unused stub, NOT production data

---

## 7. Recommended CMS Content Architecture

### 7.1 Guiding Principles

1. **Website is source of truth:** Every content item displayed on the site must be representable in Sanity.
2. **Four-state separation:** Website content ≠ code content ≠ schema support ≠ production CMS content.
3. **Minimal change:** Do not create unnecessary document types. Reuse existing schemas where possible.
4. **One source of truth:** Eliminate duplicated content (logos, partners, brand info).
5. **Media flexibility:** Support uploaded image, uploaded video, external image URL, external video URL.
6. **Fallbacks preserve resilience:** Keep fallback constants but ensure they don't mask missing CMS content.

### 7.2 Document Type Changes

No new document types are required. All sections already have corresponding schemas. Changes are additive (new fields) or corrective (query fixes, component fixes).

### 7.3 Section Configuration Summary

| Section | Doc Type | Status | CMS-Driven? | Action Required |
|---------|----------|--------|-------------|-----------------|
| Header | header | Rendered | Yes | None |
| Preloader | preloader | Rendered | Yes | Fix missing video asset reference |
| Hero | hero | Rendered | Partial | Unify data source (remove local fallbackHero) |
| About | about | Rendered | Yes | None |
| Services | servicesSection + service | Rendered | Yes | Add video file support to mediaItem |
| Partnerships | partnershipSection + partner | Rendered | Partial | Fix query; resolve partner duplication |
| Team | teamSection | Rendered | Yes | None |
| Get In Touch | getInTouch | Rendered | Yes | None |
| Footer | footer | Rendered | Yes | None |
| Privacy Policy | privacyPolicy | Rendered (route) | Yes | Pull phone/website from siteSettings |
| Objectives | objectives | **NOT rendered** | Yes (unused) | Mount in App.jsx or document as unused |
| Counts | counts | **NOT rendered** | Yes (unused) | Fix stat.key bug; mount in App.jsx |
| Approach | approach | **NOT rendered** | Yes (unused) | Mount in App.jsx or document as unused |
| Why Us | whyUs | **NOT rendered** | Yes (unused) | Mount in App.jsx or document as unused |
| Portfolio | portfolioSection + portfolioItem | **NOT rendered** | Yes (unused) | Add multi-media; mount in App.jsx |
| Gallery | gallerySection + galleryItem | **NOT rendered** | Yes (unused) | Add multi-media; mount in App.jsx |
| Error Boundary | errorBoundary | Used (class) | No (text hardcoded) | Refactor to consume CMS fallbackText |

---

## 8. Reusable Media Architecture

### 8.1 Design Requirements

The media architecture must support four source options:
1. **Uploaded image** — Sanity image asset
2. **Uploaded video** — Sanity file asset (video file)
3. **External image URL** — URL string
4. **External video URL** — URL string (YouTube, Vimeo, direct file)

**Critical technical note:** Sanity's `file` type stores the uploaded file but does **not** provide video transcoding, optimization, or streaming. Uploaded video files are delivered as raw file downloads via Sanity's CDN. For inline playback ( `<video>` tag), the browser must support the codec. For production use with adaptive streaming, consider delivering uploaded videos through a CDN or video hosting service. This specification does not recommend a third-party video service without clear justification — uploaded files will work for direct playback but lack optimization.

### 8.2 Reusable `mediaItem` Object (Extended)

**File:** `studio/schemaTypes/mediaItemType.ts`  
**Purpose:** Reusable media object for service media items, portfolio/gallery additional media.

| Field | Type | Required | Multi | Conditional | Purpose | Validation |
|-------|------|----------|-------|-------------|---------|------------|
| `type` | string | Yes | No | — | "image" \| "video" | enum: image, video |
| `title` | string | No | No | — | Display title | — |
| `alt` | string | No | No | — | Alt text for accessibility | — |
| `image` | image | No | No | type === "image" | Sanity uploaded image | hotspot: true |
| `imageUrl` | url | No | No | type === "image" | External image URL | — |
| `videoFile` | file | No | No | type === "video" | Sanity uploaded video file | — |
| `videoUrl` | url | No | No | type === "video" | External video URL (YouTube/Vimeo/direct) | — |
| `videoPoster` | image | No | No | type === "video" | Sanity uploaded poster image | hotspot: true |
| `videoPosterUrl` | url | No | No | type === "video" | External poster URL | — |
| `externalUrl` | url | No | No | — | Redirect/link destination | — |
| `order` | number | No | No | — | Display order | min: 0 |

**Validation rule:** If `type === "image"`, at least one of `image` or `imageUrl` must be set. If `type === "video"`, at least one of `videoFile`, `videoUrl` must be set.

**Source precedence:** Sanity asset takes priority over external URL when both are set.

### 8.3 GROQ Projection for mediaItem

```groq
mediaItem[]{
  _key,
  type,
  title,
  alt,
  "imageUrl": image.asset->url,
  image,
  imageUrl,
  "videoFileUrl": videoFile.asset->url,
  videoFile,
  videoUrl,
  "videoPosterUrl": videoPoster.asset->url,
  videoPoster,
  videoPosterUrl,
  externalUrl,
  order
}
```

### 8.4 Frontend Rendering Requirements (MediaEmbed.jsx)

`MediaEmbed.jsx` must be extended to handle:

| Item Type | Source | Render Method | Fallback |
|-----------|--------|---------------|----------|
| sanity_image | `image` (Sanity asset) | `urlFor(image)` + `` | `imageUrl` if image null |
| external_image | `imageUrl` | Direct `src={url}` | None |
| sanity_video | `videoFile` (Sanity asset) | `<video src={videoFile.asset->url}>` with `videoPoster` | `videoUrl` |
| external_video (YouTube) | `videoUrl` | `getVideoEmbedUrl()` + `<iframe>` | `getVideoThumbnail()` + poster |
| external_video (Vimeo) | `videoUrl` | `getVideoEmbedUrl()` + `<iframe>` | `getVideoThumbnail()` + poster |
| external_video (direct) | `videoUrl` | `<video src={url}>` with `videoPoster` | None |

**Should MediaEmbed be extended or refactored?** Extended. The existing component already handles `sanity_image`, `external_image`, `external_video`. Add `sanity_video` (file asset) and `videoPoster`/`videoPosterUrl` support. No refactor needed — add conditional branches.

### 8.5 URL Validation

| Provider | Detection Method | Already Supported? |
|----------|-----------------|-------------------|
| YouTube | `getYouTubeId()` regex | Yes (mediaUtils.js) |
| Vimeo | `getVimeoId()` regex | Yes (mediaUtils.js) |
| Direct file | `isDirectVideoUrl()` extension check | Yes (mediaUtils.js) |
| Unknown | Falls through | Yes (returns "unknown") |

No additional URL validation needed beyond existing `mediaUtils.js` functions. Schema-level `url` type validation is sufficient.

---

## 9. Services Architecture

### 9.1 Verified Service Records

Only 4 services are in the seed script. The 4 UUID-only services are mentioned only in comments — production existence unverified.

| Service ID | Name | Seeded? | Production Verified? | Source |
|------------|------|---------|---------------------|--------|
| service-creative | Creative Content | Yes | No | seedSanity.js comment |
| service-motion | Motion Graphics | Yes | No | seedSanity.js comment |
| service-graphic | Graphic Design | Yes | No | seedSanity.js comment |
| service-event | Event Coverage | Yes | No | seedSanity.js comment |
| a249595a-... | Hotels & Resorts | No (comment only) | No | seedSanity.js comment |
| b8b517f7-... | Events | No (comment only) | No | seedSanity.js comment |
| c1f1dd94-... | Retail & Shopping Malls | No (comment only) | No | seedSanity.js comment |
| (4th UUID) | Real Estate | No (comment only) | No | seedSanity.js comment |

**Recommendation:** Treat 4 named services as verified seed content. Treat 4 UUID-only services as unverified — do not assume they exist in production.

### 9.2 Service Fields (Current + Recommended)

| Field | Current? | Recommended Change |
|-------|----------|-------------------|
| title | Yes | Keep |
| text | Yes | Keep |
| icon | Yes | Keep (icon key dropdown) |
| featured | Yes | Keep |
| orderRank | Yes | Keep |
| backgroundType | Yes | Keep |
| backgroundImage | Yes | Keep |
| backgroundVideoUrl | Yes | Keep |
| localFallbackKey | Yes | Keep (developer hint; remove title-matching fallback) |
| mediaItems[] | Yes | Extend mediaItem with videoFile, videoPoster, alt |

**No new fields required.** The existing `serviceType` covers all website content. Changes are limited to `mediaItem` extension (shared architecture).

### 9.3 Local Fallback GIFs

`creativeContent.gif` (15.9 MB) and `motion.gif` (17.3 MB) are used as local fallback background images when Sanity is unavailable or `localFallbackKey` matches. These are application fallback assets — they should remain in the repository as fallbacks, not be migrated to Sanity as content.

---

## 10. Portfolio Architecture

### 10.1 Verified Portfolio Data

Portfolio categories and items exist only as fallback constants and seed script entries. Production existence unverified.

**Categories (6):** All Projects, Commercial, Documentary, Corporate, Social Media, Events

**Projects (6):** Wildlife Conservation Documentary, Tech Startup Brand Film, Music Festival Coverage, Corporate Training Series, Social Media Campaign, Product Launch Film

**Do not represent these as verified client work.** They are fallback/sample content.

### 10.2 Recommended Schema Changes

**portfolioItemType** (`studio/schemaTypes/portfolioItemType.ts`):

| Change | Current | Recommended |
|--------|---------|-------------|
| `category` | string (must match label) | Change to reference to `portfolioCategory` |
| `coverImage` | image (Sanity) | Keep |
| `coverImageUrl` | url (external) | Keep |
| `coverAlt` | string | Keep |
| Additional media | None | Add `mediaItems[]` (mediaItem objects) |
| Visibility | None | Add `published` boolean (optional) |

**portfolioSectionType** — No changes needed. `categories[]` already references `portfolioCategory`.

**Treat "All Projects" as a UI filter** that includes all projects, not a category requiring assignment.

### 10.3 Query Change

`portfolioItemsQuery` — Change `coalesce(coverImageUrl, coverImage.asset->url)` to `coalesce(coverImage.asset->url, coverImageUrl)` so Sanity asset takes priority over external URL.

---

## 11. Gallery Architecture

### 11.1 Verified Gallery Data

Gallery categories and items exist only as fallback constants and seed script entries. Production existence unverified.

**Categories (6):** All, Behind the Scenes, Production, Events, Locations, Equipment

**Items (9):** 9 gallery items with mixed photo/video types

**Do not represent these as verified content.** They are fallback/sample content.

### 11.2 Recommended Schema Changes

**galleryItemType** (`studio/schemaTypes/galleryItemType.ts`):

| Change | Current | Recommended |
|--------|---------|-------------|
| `category` | string | Change to reference to `galleryCategory` |
| `coverImage` | image | Keep |
| `coverImageUrl` | url | Keep |
| `coverAlt` | string | Keep |
| Additional media | None | Add `mediaItems[]` (mediaItem objects) |
| Visibility | None | Add `published` boolean (optional) |

**gallerySectionType** — No changes needed.

**Treat "All" as a UI filter**, not a category requiring assignment.

### 11.3 Query Change

`galleryItemsQuery` — Change `coalesce(coverImageUrl, coverImage.asset->url)` to `coalesce(coverImage.asset->url, coverImageUrl)`.

---

## 12. Partnerships Architecture

### 12.1 Current State (Verified)

| Aspect | Current Implementation | Problem |
|--------|----------------------|---------|
| Partner storage | Embedded `partners[]` in partnershipSection AND separate `partner` collection | Duplication |
| Partner logos | Local image imports (partnerImages.jsx) | Not in Sanity |
| `partnersQuery` | Defined but unused | Component reads embedded objects |
| `partnershipSectionQuery` | Missing `partnershipTypes[]` | CMS types never used |
| Partner external URL | `url` field exists but unused | Component doesn't render partner URLs |

### 12.2 Recommendation: Single Source of Truth

**Use the standalone `partner` collection** with `partnershipSection` referencing partner documents via `partner[]` references.

**Rationale:**
- Partners already exist as `partnerType` documents
- Independent management is cleaner
- No duplication between embedded objects and collection
- `partnerType` already has order, name, logo, logoAlt, url

**Changes to `partnershipSectionType`:**
- Replace embedded `partners[]` objects with `partner[]` references
- Add `partnershipTypes[]` to `partnershipSectionQuery`

**Changes to `partnerType`:**
- Add `logoUrl` (url) field for external logo URL alternative

### 12.3 Partnership Types

Keep `partnershipTypes[]` as embedded objects in `partnershipSection` — only one type exists (Brand Partnerships), no independent management requirement. Add `partnershipTypes[]` to `partnershipSectionQuery`.

### 12.4 Partner List (14, verified from source code)

| # | Name | Logo File | Alt Text | URL |
|---|------|-----------|----------|-----|
| 1 | Coca Cola | cocacola.jpeg | "Coca Cola logo" | null |
| 2 | Darling | darling.png | "Darling logo" | null |
| 3 | Delish | delish.png | "Delish logo" | null |
| 4 | Dr. Mattress | drmatress.png | "Dr. Mattress logo" | null |
| 5 | EABL | eabl.jpeg | "EABL logo" | null |
| 6 | Furniture Place | furnitureplace.png | "Furniture Place logo" | null |
| 7 | LC Waikiki | lcwaikiki.png | "LC Waikiki logo" | null |
| 8 | Mega Growth | megagrowth.png | "Mega Growth logo" | null |
| 9 | Orient | orient.png | "Orient logo" | null |
| 10 | Prestige | prestige.png | "Prestige logo" | null |
| 11 | Sarit | sarit.png | "Sarit logo" | null |
| 12 | Titi | titi.png | "Titi logo" | null |
| 13 | Two Rivers | tworivers.png | "Two Rivers logo" | null |
| 14 | V Spa | vspa.png | "V Spa logo" | null |

**Note:** Partner logos are currently local files. They must be uploaded to Sanity during migration. `eabl.png` is a duplicate of `eabl.jpeg` — use only `eabl.jpeg`.

---

## 13. Other Section and Site Settings Recommendations

### 13.1 Error Boundary

**Problem:** `ErrorBoundary.jsx` is a class component. `errorBoundary.fallbackText` from CMS is never consumed — text is hardcoded at line 25.

**Solution:** Refactor to functional component using `useSanityData(errorBoundaryQuery, {}, fallbackErrorBoundary)`, OR pass `fallbackText` as prop from a parent component that uses Sanity.

**Priority:** P0 (CMS field is dead)

### 13.2 Counts

**Problem:** `Counts.jsx:44` uses `stat.key` but `countsQuery` projects `order`, not `key`. Counter animation keys will be undefined.

**Solution:** Fix `Counts.jsx` to use `stat._key` (Sanity auto-generates `_key` for array items) or project `key` as alias in query. Also mount component in `App.jsx`.

**Priority:** P0 (broken rendering) + P1 (not rendered)

### 13.3 Privacy Policy

**Problem:** Phone ("0715130028") and website ("www.princehousefilms.com") hardcoded at PrivacyPolicy.jsx:91-92.

**Solution:** Pull from `siteSettings.phone` and `siteSettings.address`/custom website field. Or document as intentional divergence (CONTENT_MAP.md notes this is a content decision).

**Priority:** P2

### 13.4 Hero

**Problem:** Dual data source — App.jsx prop AND local `fallbackHero` object (Hero.jsx:5-13).

**Solution:** Move Hero to `useSanityData` pattern consistent with other components, or document intentional dual source.

**Priority:** P2

### 13.5 Services — Dual Queries

**Problem:** Services.jsx uses both `servicesQuery` (via App.jsx prop) and `servicesSectionQuery` (via useSanityData).

**Solution:** Acceptable pattern (section title separate from items), or merge into single query. Not critical.

**Priority:** P2

### 13.6 Brand Asset Duplication

**Problem:** Logo exists in `siteSettings.logo`, `header.logo`, `preloader.logo`, `footer.logo` — 4 separate fields.

**Solution:** Accept duplication for editing independence (each section can have different logo if needed). Or share via siteSettings reference. Not critical.

**Priority:** P2

### 13.7 `logo.png` and `about.png`

**Status:** Both exist in `src/assets/img/` but are unused by any component.

**Recommendation:** Leave as application assets. Do not migrate to Sanity unless a component is added that uses them.

### 13.8 `portfolioData.js` and `partnerImages.jsx`

**Status:** Both unused by components. Seed stubs only.

**Recommendation:** Leave untouched. They serve as reference for fallback values.

---

## 14. GROQ and Frontend Integration Requirements

### 14.1 Query Fixes Required

| Query | File | Fix |
|-------|------|-----|
| `partnershipSectionQuery` | `src/lib/queries.js` | Add `types[]{order,title,description,features[],iconKey,color,accent}` |
| `countsQuery` | `src/lib/queries.js` | Project `_key` on stats array (or fix component to use `_key`) |
| `portfolioItemsQuery` | `src/lib/queries.js` | Change coalesce order: `coverImage.asset->url` before `coverImageUrl` |
| `galleryItemsQuery` | `src/lib/queries.js` | Change coalesce order: `coverImage.asset->url` before `coverImageUrl` |

### 14.2 Unused Queries

| Query | Action |
|-------|--------|
| `partnersQuery` | Remove or use in Partnership.jsx after switching to partner collection references |
| `partnershipTypesQuery` | Remove (redundant — fold into partnershipSectionQuery) |
| `errorBoundaryQuery` | Keep (will be used after ErrorBoundary refactor) |

### 14.3 Component Fixes Required

| Component | File | Fix |
|-----------|------|-----|
| ErrorBoundary | `src/components/ErrorBoundary.jsx` | Refactor to functional component OR accept `fallbackText` prop |
| Counts | `src/components/Counts.jsx` | Use `stat._key` instead of `stat.key` |
| Hero | `src/components/Hero/Hero.jsx` | Unify data source (useSanityData or prop, not both) |
| Partnership | `src/components/Partnership/Partnership.jsx` | Use partner collection references after schema change |
| MediaEmbed | `src/components/MediaEmbed.jsx` | Add `sanity_video` (file asset) and `videoPoster` support |

### 14.4 Component Mounting Decision

The 6 not-rendered sections (Objectives, Counts, Approach, Why Us, Portfolio, Gallery) should **not** all be automatically mounted. Recommendation:

| Section | Recommendation | Rationale |
|---------|---------------|-----------|
| Objectives | Mount | Complete, Sanity-wired, fits homepage narrative |
| Counts | Mount | Complete, Sanity-wired, fits homepage narrative |
| Approach | Mount | Complete, Sanity-wired, fits homepage narrative |
| Why Us | Mount | Complete, Sanity-wired, fits homepage narrative |
| Portfolio | Mount | Complete, Sanity-wired, core business content |
| Gallery | Mount | Complete, Sanity-wired, visual content |

All 6 are complete components with schemas, queries, and fallbacks. They should be mounted in `App.jsx` with appropriate section ordering. This is a frontend integration decision, not a CMS schema decision.

---

## 15. Content and Asset Migration Strategy

### 15.1 Migration Risk Assessment

`seedSanity.js` uses `createOrReplace` (line 35) and `createIfNotExists` (line 37). **`createOrReplace` is not inherently safe** — it will overwrite any manually edited production document with the same `_id`. This creates a production data integrity risk.

**The 4 UUID-only services** (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) are explicitly excluded from the seed because they were edited directly in Studio. Overwriting them would lose editor-managed content.

### 15.2 Safe Migration Approach

**Phase 1: Backup**
```
npx sanity dataset export production backup-pre-migration-$(date +%Y%m%d-%H%M).tar.gz
```

**Phase 2: Inventory**
Export all existing production documents to understand what has been manually edited.

**Phase 3: Selective migration**
- **Create missing documents:** siteSettings, header, preloader, about, approach, objectives, counts, whyUs, portfolioSection, gallerySection, teamSection, partnershipSection, getInTouch, footer, privacyPolicy, errorBoundary — only if they don't exist in production
- **Use `createIfNotExists`** for singletons to avoid overwriting editor-managed content
- **Use `createOrReplace`** only for collection documents where seed content is authoritative
- **Preserve the 4 UUID-only services** — do not include them in seed script

**Phase 4: Asset migration**
Upload local media assets to Sanity and assign to correct documents.

**Phase 5: Verification**
Compare production dataset against seed script. Verify all documents exist and fields match.

**Rollback:** Re-import backup dataset if migration causes data loss.

### 15.3 Asset Migration Classification

| Asset | Classification | Action |
|-------|---------------|--------|
| phf_word_logo.png | CMS-managed brand media | Upload to Sanity → header.logo, siteSettings.logo |
| phf_logo.png | CMS-managed brand media | Upload to Sanity → preloader.logo, footer.logo |
| logo.png | Application infrastructure | Keep in repo (unused) |
| about.png | Unused application asset | Keep in repo (unused) |
| team.jpg | CMS-managed content media | Upload to Sanity → teamSection.groupPhoto |
| partners/*.jpeg/png (14 active) | CMS-managed partner media | Upload to Sanity → partner.logo |
| partners/eabl.png | Duplicate application asset | Keep in repo (unused duplicate) |
| services/creativeContent.gif | Application fallback | Keep in repo (fallback, not content) |
| services/motion.gif | Application fallback | Keep in repo (fallback, not content) |
| WildNowLogovideo.mp4 | Missing application asset | File does not exist — create or update reference |
| public/logo192.png | PWA infrastructure | Keep in public/ |
| public/logo512.png | PWA infrastructure | Keep in public/ |

**Do not migrate:** GIFs (fallback assets), unused images, duplicate files, PWA icons.

### 15.4 Seed Script Changes Required

| Addition | File | Reason | Safety |
|----------|------|--------|--------|
| siteSettings document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| header document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| preloader document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| about document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| approach document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| objectives document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| counts document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| whyUs document | scripts/seedSanity.js | Missing from seed | createIfNotExists |
| portfolioSection document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| gallerySection document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| teamSection document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| partnershipSection document | scripts/seedSanity.js | Already seeded (no types[]) | createIfNotExists |
| getInTouch document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| footer document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| privacyPolicy document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| errorBoundary document | scripts/seedSanity.js | Already seeded | createIfNotExists |
| portfolioCategories | scripts/seedSanity.js | Already seeded | createIfNotExists |
| galleryCategories | scripts/seedSanity.js | Already seeded | createIfNotExists |
| contactDetails | scripts/seedSanity.js | Already seeded | createIfNotExists |
| portfolioItems | scripts/seedSanity.js | Already seeded | createIfNotExists |
| galleryItems | scripts/seedSanity.js | Already seeded | createIfNotExists |
| partners (collection) | scripts/seedSanity.js | Already seeded (no logo images) | createIfNotExists |

**Note:** Partners in seed script lack `logo` images (logoAlt set but no logo asset reference). After uploading partner logos to Sanity, update seed documents with asset references.

---

## 16. Consolidated Implementation Gap Register

| ID | Priority | Section | Component/Schema/Query | Verified Current State | Actual Problem | Recommended Solution | Dependencies | Migration Impact | Acceptance Criteria |
|----|----------|---------|----------------------|----------------------|----------------|---------------------|--------------|------------------|---------------------|
| G01 | P0 | Media | mediaItemType + MediaEmbed.jsx | No uploaded video file support; videoUrl is external URL only | Owners cannot upload video files to Sanity | Add `videoFile` (file) to mediaItem; update MediaEmbed to render Sanity video assets via `videoFile.asset->url` | None | Additive field; existing content unaffected | Video file uploaded to Sanity renders in `<video>` tag |
| G02 | P0 | Media | mediaItemType + MediaEmbed.jsx | No video poster/thumbnail support | Direct video URLs have no poster; YouTube/Vimeo use auto-generated thumbnails only | Add `videoPoster` (image) + `videoPosterUrl` (url) to mediaItem; update MediaEmbed to display poster before play | G01 | Additive fields; existing content unaffected | Video poster displays before video plays |
| G03 | P0 | Partnerships | partnershipSectionQuery | Query omits `partnershipTypes[]` | CMS-editable partnership types never used; always falls back to hardcoded | Add `types[]{order,title,description,features[],iconKey,color,accent}` to `partnershipSectionQuery` | None | None | Partnership type cards render from CMS data |
| G04 | P0 | Error Boundary | ErrorBoundary.jsx + errorBoundaryQuery | Class component; `fallbackText` from CMS never consumed | Hardcoded fallback text; CMS field is dead | Refactor ErrorBoundary to functional component with `useSanityData(errorBoundaryQuery)` OR accept `fallbackText` prop | errorBoundaryQuery exists | None | Error boundary displays CMS-configured fallbackText |
| G05 | P0 | Counts | countsQuery + Counts.jsx | `stat.key` referenced but query returns `order` | Counter animation keys are undefined; counters break | Fix Counts.jsx to use `stat._key` OR project `key` as alias in countsQuery | None | None | Counters animate with correct keys from CMS data |
| G06 | P1 | Sections | App.jsx | Objectives not rendered | Section invisible on live site | Import and render Objectives in App.jsx | countsQuery fix (G05) | None | Objectives section visible on homepage |
| G07 | P1 | Sections | App.jsx | Counts not rendered | Section invisible on live site | Import and render Counts in App.jsx | G05 fix | None | Counts section visible on homepage |
| G08 | P1 | Sections | App.jsx | Approach not rendered | Section invisible on live site | Import and render Approach in App.jsx | None | None | Approach section visible on homepage |
| G09 | P1 | Sections | App.jsx | WhyUs not rendered | Section invisible on live site | Import and render WhyUs in App.jsx | None | None | WhyUs section visible on homepage |
| G10 | P1 | Sections | App.jsx | Portfolio not rendered | Section invisible on live site | Import and render Portfolio in App.jsx | G29 fix (coalesce order) | None | Portfolio section visible on homepage |
| G11 | P1 | Sections | App.jsx | Gallery not rendered | Section invisible on live site | Import and render Gallery in App.jsx | G30 fix (coalesce order) | None | Gallery section visible on homepage |
| G12 | P1 | Partnerships | partnershipSectionType + partnerType + Partnership.jsx | Partners embedded in partnershipSection AND separate partner collection; component reads embedded | Duplication; partnersQuery unused; partner logos not in Sanity | Switch to partner collection references; add `logoUrl` to partnerType; upload partner logos to Sanity | G01 (mediaItem), asset upload | Yes — partner data may need re-entry | One partner source of truth; logos render from Sanity |
| G13 | P1 | Partnerships | partnershipSectionQuery | See G03 | See G03 | See G03 | None | None | See G03 |
| G14 | P1 | Partnerships | partnerType + partnershipSectionType | Partner logos image-only; no external URL option | Owners cannot use externally hosted logo URLs | Add `logoUrl` (url) to partnerType and partnerItem embedded object | None | Additive field | External logo URL accepted and rendered |
| G15 | P1 | Portfolio | portfolioItemType | `category` is plain string | String matching fragile; no referential integrity | Change `category` to reference `portfolioCategory` | None | Yes — existing category strings must match category docs | Category filter resolves via reference |
| G16 | P1 | Gallery | galleryItemType | `category` is plain string | String matching fragile; no referential integrity | Change `category` to reference `galleryCategory` | None | Yes — existing category strings must match category docs | Category filter resolves via reference |
| G17 | P2 | Brand | siteSettings/header/preloader/footer | Logo duplicated across 4 documents | Inconsistent brand asset management | Accept duplication for editing independence OR share via siteSettings reference | None | Optional | Consistent logo across sections |
| G18 | P2 | Privacy Policy | PrivacyPolicy.jsx | Phone + website hardcoded | Not editable via CMS | Pull from siteSettings or document as intentional divergence | None | None | Phone/website editable via siteSettings |
| G19 | P2 | Services | Services.jsx | `localFallbackKey` title-matching fragile | Lines 48-53 match title to fallback key | Remove title-matching; require explicit `localFallbackKey` | None | None | Fallback key set explicitly by editor |
| G20 | P2 | Hero | Hero.jsx | Dual data source (prop + local fallbackHero) | Two sources of truth | Move to `useSanityData` pattern or document intentional dual source | None | None | Single data source for Hero |
| G21 | P2 | Media | mediaItemType | No `alt` field on media items | No accessibility text for media | Add `alt` (string) to mediaItem | None | Additive field | Alt text available for media items |
| G22 | P2 | Services | Services.jsx | Two queries for one section | servicesQuery (items) + servicesSectionQuery (title) | Acceptable pattern; or merge into single query | None | None | Consistent data flow |
| G23 | P2 | Portfolio/Gallery | portfolioItemsQuery + galleryItemsQuery | `coalesce(coverImageUrl, coverImage.asset->url)` | External URL takes priority over Sanity asset | Change to `coalesce(coverImage.asset->url, coverImageUrl)` | None | None | Sanity asset takes priority |
| G24 | P2 | Portfolio | portfolioItemType | No additional media beyond cover image | Only one image per project | Add `mediaItems[]` (mediaItem objects) for multiple images/videos | G01 (mediaItem) | None | Multiple media items per portfolio project |
| G25 | P2 | Gallery | galleryItemType | No additional media beyond cover image | Only one image per gallery item | Add `mediaItems[]` (mediaItem objects) for multiple images/videos | G01 (mediaItem) | None | Multiple media items per gallery item |
| G26 | P2 | Links | Multiple schemas | No consistent link object with openInNewTab/security attrs | Links scattered as strings across schemas | Create reusable `link` object type (optional) | None | None | Consistent link handling |
| G27 | P3 | Team | teamMemberType | Collection reserved but unused | No members rendered | Document as future feature; no action needed | None | None | N/A |
| G28 | P3 | Preloader | Preloader.jsx | `WildNowLogovideo.mp4` referenced but missing | Preloader video will fail | Verify file exists; if missing, update reference or create file | None | Yes — asset creation needed | Preloader video loads without error |
| G29 | P3 | Portfolio | portfolioItemsQuery | See G23 | See G23 | See G23 | None | None | See G23 |
| G30 | P3 | Gallery | galleryItemsQuery | See G23 | See G23 | See G23 | None | None | See G23 |
| G31 | P3 | Links | headerType | Nav links have no `openInNewTab` option | All nav links assumed internal | Add `openInNewTab` boolean (optional) | None | Additive field | External nav links can open in new tab |
| G32 | P3 | Media | mediaItemType | See G21 | See G21 | See G21 | None | None | See G21 |

**Gap summary by priority (corrected):**
- P0 (Critical): 5 (G01–G05)
- P1 (High): 11 (G06–G14)
- P2 (Medium): 11 (G15–G26)
- P3 (Low): 5 (G27–G32)
- **Total: 32 gaps**

---

## 17. Dependency-Aware Implementation Roadmap

### Stage 1: Shared Media and Link Architecture

**Objective:** Extend `mediaItem` to support uploaded video, video poster, and alt text. Optionally create reusable `link` object type.

**Files expected to change:**
- `studio/schemaTypes/mediaItemType.ts` — Add `videoFile`, `videoPoster`, `videoPosterUrl`, `alt`, `duration`
- `studio/schemaTypes/linkType.ts` — New file (optional, P2)

**Required changes:**
- Add file, image, and url fields to mediaItem with conditional visibility
- Add validation: type determines required source field
- Define source precedence (Sanity asset over external URL)

**Dependencies:** None

**Migration impact:** None (additive fields)

**Risk:** Low

**Verification:** Schema compiles in Studio; new fields appear in editor

**Definition of completion:** mediaItem supports all 4 media source options

---

### Stage 2: Fix GROQ Query Gaps

**Objective:** Correct incomplete and incorrect query projections.

**Files expected to change:**
- `src/lib/queries.js`

**Required changes:**
- Add `types[]{order,title,description,features[],iconKey,color,accent}` to `partnershipSectionQuery`
- Project `_key` on stats array in `countsQuery` (or alias `key`)
- Change coalesce order in `portfolioItemsQuery` and `galleryItemsQuery` to Sanity asset first

**Dependencies:** None

**Migration impact:** None

**Risk:** Low

**Verification:** Query returns expected fields in Sanity Vision tool

**Definition of completion:** All 23 queries project correct fields; no missing projections

---

### Stage 3: Fix Frontend Integration Bugs

**Objective:** Ensure CMS data is actually consumed by components.

**Files expected to change:**
- `src/components/ErrorBoundary.jsx` — Refactor to functional component or accept prop
- `src/components/Counts.jsx` — Use `stat._key` instead of `stat.key`
- `src/components/MediaEmbed.jsx` — Add `sanity_video` and `videoPoster` rendering
- `src/components/Hero/Hero.jsx` — Unify data source (optional)

**Dependencies:** Stage 1 (mediaItem fields), Stage 2 (query fixes)

**Migration impact:** None

**Risk:** Medium (ErrorBoundary refactor changes component type)

**Verification:** Components render Sanity data correctly; error boundary shows CMS fallbackText

**Definition of completion:** No dead CMS fields; all queried data is rendered

---

### Stage 4: Mount Unrendered Sections

**Objective:** Make all 6 not-rendered sections visible on the website.

**Files expected to change:**
- `src/App.jsx` — Import and render Objectives, Counts, Approach, WhyUs, Portfolio, Gallery

**Required changes:**
- Add imports for all 6 components
- Add JSX elements in desired order within `<main>`
- Determine section ordering (recommend: About → Objectives → Counts → Approach → WhyUs → Services → Portfolio → Gallery → Partnerships → Team → GetInTouch)

**Dependencies:** Stage 2 (queries must be correct), Stage 3 (bugs fixed)

**Migration impact:** None

**Risk:** Medium (changes page layout and section order)

**Verification:** All 15 sections render on homepage with Sanity data or fallbacks

**Definition of completion:** All sections visible; no console errors from missing data

---

### Stage 5: Partner Architecture Decision and Migration

**Objective:** Establish single source of truth for partners; eliminate duplication.

**Files expected to change:**
- `studio/schemaTypes/partnershipSectionType.ts` — Replace embedded partners[] with partner[] references
- `studio/schemaTypes/partnerType.ts` — Add `logoUrl` field
- `src/lib/queries.js` — Ensure partnershipSectionQuery includes partnershipTypes[]
- `src/components/Partnership/Partnership.jsx` — Use partner references instead of embedded objects

**Required changes:**
- Decide: embedded partners[] OR partner collection references (recommend references)
- Upload 14 partner logos to Sanity
- Create/update partner documents with asset references
- Update Partnership.jsx to render from references

**Dependencies:** Stage 1 (logoUrl field), asset upload

**Migration impact:** Yes — partner data may need re-entry; 4 UUID-only services must be preserved

**Risk:** Medium (data model change)

**Verification:** Partner logos render from Sanity; partnership types editable; no duplication

**Definition of completion:** One partner source of truth; all 14 partners manageable in Sanity

---

### Stage 6: Portfolio and Gallery Extended Media

**Objective:** Support multiple images and videos per portfolio/gallery item.

**Files expected to change:**
- `studio/schemaTypes/portfolioItemType.ts` — Add `mediaItems[]` (mediaItem objects)
- `studio/schemaTypes/galleryItemType.ts` — Add `mediaItems[]` (mediaItem objects)

**Required changes:**
- Add mediaItems array using extended mediaItem type
- Update Portfolio.jsx and Gallery.jsx to render multiple media items

**Dependencies:** Stage 1 (mediaItem type)

**Migration impact:** None (additive)

**Risk:** Low

**Verification:** Multiple media items render in portfolio modal and gallery lightbox

**Definition of completion:** Portfolio/gallery items support mixed image/video collections

---

### Stage 7: Remaining Frontend Integration

**Objective:** Fix minor integration issues for consistency.

**Files expected to change:**
- `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` — Pull phone/website from siteSettings (optional)
- `src/components/Services/Services.jsx` — Remove title-matching fallback (optional)
- `src/components/Hero/Hero.jsx` — Unify data source (optional)

**Dependencies:** None

**Migration impact:** None

**Risk:** Low

**Verification:** Consistent data flow patterns

**Definition of completion:** No hardcoded content that should be CMS-managed

---

### Stage 8: Content and Asset Migration

**Objective:** Populate Sanity dataset with all website content and media assets.

**Files expected to change:**
- `scripts/seedSanity.js` — Extend with missing singletons and collections

**Required changes:**
- Backup production dataset (`npx sanity dataset export`)
- Add `createIfNotExists` entries for all missing singletons
- Upload local media assets (logos, team photo, partner logos) to Sanity
- Assign asset references to documents
- Preserve 4 UUID-only services (do not overwrite)
- Do not include partner logos that already exist in production

**Dependencies:** Stages 1–6

**Migration impact:** Yes — writing to production dataset

**Risk:** High (potential data loss if createOrReplace used incorrectly)

**Verification:** Studio shows all documents; website renders CMS data; backup available for rollback

**Definition of completion:** All content documents exist in Sanity; all media assets uploaded and referenced

---

### Stage 9: Validation and Testing

**Objective:** Verify end-to-end CMS functionality.

**Files expected to change:** None (testing only)

**Required changes:**
- Test all sections render correctly
- Verify media uploads and rendering (image, video file, external URLs, posters)
- Verify links work (internal, external, social, mailto, tel)
- Test fallback behavior when Sanity unavailable
- Test category filtering (Portfolio, Gallery)
- Verify partner logos render from Sanity

**Dependencies:** Stages 1–8

**Migration impact:** None

**Risk:** Low

**Verification:** All acceptance criteria in Section 18 met

**Definition of completion:** CMS is complete and reliable content source

---

## 18. Testing and Acceptance Criteria

| # | Action | Expected Result | Verification Method |
|---|--------|-----------------|---------------------|
| 1 | Navigate homepage | All 15 sections render (including Objectives, Counts, Approach, WhyUs, Portfolio, Gallery) | Visual inspection; no console errors |
| 2 | Change hero title in Sanity Studio | New title appears on website | Studio edit → refresh site |
| 3 | Add/edit service in Studio | Service appears in bento grid | Studio edit → refresh site |
| 4 | Edit partnership type in Studio | Partnership type cards update | After G03 fix; Studio edit → refresh site |
| 5 | Trigger media error | Error boundary shows CMS-configured fallbackText | After G04 fix; break media URL → observe |
| 6 | Scroll to Counts section | Counters animate with correct keys | After G05 fix; observe counter animation |
| 7 | Upload video file to Sanity | Video renders in MediaEmbed `<video>` tag | After G01 fix; upload → verify playback |
| 8 | Set video poster | Poster displays before play | After G02 fix; set poster → verify |
| 9 | Upload partner logo to Sanity | Logo appears in partnership carousel | After G12; upload → verify |
| 10 | Filter Portfolio by category | Only matching projects shown | Category reference resolves correctly |
| 11 | Filter Gallery by category | Only matching items shown | Category reference resolves correctly |
| 12 | Click nav links | Correct page section scrolls into view | All 6 nav links functional |
| 13 | Click social links | External profiles open in new tab | All social URLs functional |
| 14 | Disconnect Sanity | Site renders fallback content | Network offline → fallbacks display |
| 15 | Run seed script with --dry-run | No writes; full payload printed | `node scripts/seedSanity.js --dry-run` |
| 16 | Backup dataset before migration | `backup-*.tar.gz` created | `npx sanity dataset export` succeeds |

---

## 19. Unverified Items and Outstanding Decisions

| Item | Status | Reason | Recommendation |
|------|--------|--------|---------------|
| Production Sanity dataset contents | Unverified | No dataset access available | Export dataset before migration; inventory all documents |
| 4 UUID-only services (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) | Unverified | Mentioned only in seedSanity.js comments | Do not include in seed; preserve if they exist |
| WildNowLogovideo.mp4 | Not found | No .mp4/.mov/.webm files in project | Create video file or update preloader reference |
| Whether to mount all 6 unrendered sections | Open decision | All are complete but may not be intended for homepage | Confirm with stakeholder; mount or document as unused |
| Partner storage pattern | Open decision | Embedded vs. collection references | Recommend standalone partner collection |
| `logo.png` and `about.png` usage | Unverified | Exist but unused by any component | Leave as application assets; migrate only if needed |
| Video playback strategy for uploaded files | Open decision | Sanity `file` type gives raw file URL; no transcoding | Test direct playback; consider CDN if needed |
| favicon.ico existence | Unverified | Referenced in allfiles.txt but not in public/ | Verify or remove reference |

---

## 20. Final Definition of CMS Completeness

Sanity is "complete" for Prince House Films when all of the following are true:

- [ ] Every section rendered on the website fetches content from Sanity (no hardcoded content that should be editable)
- [ ] All intended sections are mounted in `App.jsx` (decision documented for any not mounted)
- [ ] Partnership types are queried and rendered from CMS (G03 fixed)
- [ ] Error boundary displays CMS-configured fallbackText (G04 fixed)
- [ ] Counters animate with correct keys from CMS data (G05 fixed)
- [ ] Video files can be uploaded to Sanity and rendered on the website (G01 fixed)
- [ ] Video thumbnails/posters are supported (G02 fixed)
- [ ] External video URLs (YouTube, Vimeo, direct) work through MediaEmbed
- [ ] External image URLs work for all media fields
- [ ] Media source validation prevents invalid combinations (image without source, video without source)
- [ ] Category references resolve correctly for Portfolio and Gallery (G15, G16)
- [ ] Internal and external links work correctly
- [ ] Partner logos have one source of truth (G12 resolved)
- [ ] All 14 partner logos are uploaded to Sanity and referenced
- [ ] The 4 UUID-only services are preserved (not overwritten by seed)
- [ ] Seed/migration uses `createIfNotExists` to avoid overwriting editor content
- [ ] Fallback behavior works without concealing incomplete production content
- [ ] Studio editing produces expected frontend changes
- [ ] Website remains functional and responsive after all changes

---

**End of Specification**

**Deliverable:** `SANITY_CMS_IMPLEMENTATION_SPECIFICATION.md` (project root)  
**Only new file created:** This specification. No source files, schemas, queries, seed scripts, configuration, or assets were modified.