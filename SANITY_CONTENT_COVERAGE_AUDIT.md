# SANITY CONTENT COVERAGE AUDIT — Prince House Films

**Project:** Prince House Films  
**Repo:** `/Users/lumona/Companies/Electrixitaty/Wansenziroz/Clients/prince-house-films`  
**Branch:** `feat/sanity`  
**App:** React CRA (`/src`), Sanity Studio v5 (`/studio`)  
**Audit type:** READ-ONLY. No source files, schemas, content, or assets were modified.  
**Report date:** Wed Nov 18 2026  
**Sanity project:** `zsbii2ih`, dataset `production`  

---

## 1. Executive Summary

This audit evaluates whether the Sanity CMS implementation comprehensively supports every piece of content, media, link, category, relationship, and configuration required by the Prince House Films website.

**Overall finding:** The Sanity implementation is substantially complete at the schema level (37 schema types defined across `studio/schemaTypes/`), but the website-to-CMS integration is incomplete and inconsistent. Only **Hero** and **Services** are fetched from Sanity in `App.jsx`. Eleven additional components have Sanity queries and fallbacks but are **not mounted** in the live page tree (`Objectives`, `Counts`, `Approach`, `WhyUs`, `Portfolio`, `Gallery`, plus `PrivacyPolicy` on its own route). Multiple schema-to-query mismatches, query-to-render mismatches, hardcoded content that should be CMS-managed, missing media format support (no uploaded video file type), and duplicated partner/content structures were identified.

**Key counts (confirmed):**
- Total website sections defined in App.jsx: 7 rendered (Preloader, Hero, Header, About, Services, Partnerships, Team, GetInTouch, Footer = 9 including structural)
- Total components inspected: 24 (components + pages)
- Total Sanity document types: 37
- Total Sanity queries defined: 21
- Services in seed/fallback: 8 (4 named + 4 UUID-only referenced in seed)
- Portfolio categories: 6 (All Projects, Commercial, Documentary, Corporate, Social Media, Events)
- Portfolio projects (fallback + seed): 6
- Gallery categories: 6 (All, Behind the Scenes, Production, Events, Locations, Equipment)
- Gallery items (fallback + seed): 9
- Partners: 14 (Coca Cola, Darling, Delish, Dr. Mattress, EABL, Furniture Place, LC Waikiki, Mega Growth, Orient, Prestige, Sarit, Titi, Two Rivers, V Spa)
- Local media assets: ~32 (logos, partner logos, service GIFs, team photo, about image)
- External media URLs: multiple (Cloudinary hero video, Unsplash/Pexels portfolio/gallery images, CodePen videos)
- Identified gaps by priority: P0=5, P1=8, P2=10, P3=6 (see Section 13)

---

## 2. Project Architecture Overview

### 2.1 Technology Stack

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
| Portable Text | @portabletext/react | ^8.0.1 | `package.json` (installed, unused) |

### 2.2 Directory Structure

```
/src
  App.jsx              # App shell, fetches hero + services from Sanity
  index.js             # ReactDOM entry, BrowserRouter
  index.css            # (empty)
  styles/
    global.css         # Reset, grid, utilities, scroll-top
    dark-theme.css     # CSS custom properties (colors, fonts)
  components/
    Header/            # Header.jsx, Header.css
    Hero/              # Hero.jsx, Hero.css (+ local fallbackHero)
    About/             # About.jsx, About.css
    Services/          # Services.jsx, ServiceModal.jsx, ServiceModal.css, Services.css
    Partnership/       # Partnership.jsx, partnerImages.jsx, Partnerships.css
    Team/              # Team.jsx, Team.css
    GetInTouch/        # GetInTouch.jsx, GetInTouch.css
    Footer/            # Footer.jsx, Footer.css
    Preloader/         # Preloader.jsx, Preloader.css
    Objectives/        # Objectives.jsx, Objectives.css
    Counts/            # Counts.jsx, Counts.css
    Approach/          # Approach.jsx, Approach.css
    WhyUs/             # WhyUs.jsx, WhyUs.css
    Gallery/           # Gallery.jsx, Gallery.css
    Portfolio/         # Portfolio.jsx, Portfolio.css
    MediaEmbed.jsx     # Media rendering (image/video/embed)
    ErrorBoundary.jsx  # Class component, fallback text NOT from CMS
    ScrollToTop.jsx    # Renders null
    SectionsShared.css # Shared section styles
  pages/
    PrivacyPolicy/     # PrivacyPolicy.jsx, PrivacyPolicy.css
  data/
    portfolioData.js   # Unused seed stub (not imported anywhere)
  lib/
    sanity.js          # sanityClient, urlFor
    queries.js         # 21 GROQ queries
    useSanityData.js   # Fetch hook with fallback
    mediaUtils.js      # YouTube/Vimeo/direct video detection
    fallbacks.js       # 14 fallback constants (1436 lines)
  assets/img/
    phf_word_logo.png  # Header logo
    phf_logo.png       # Preloader + Footer logo
    about.png          # UNUSED
    team.jpg           # Team group photo
    services/
      creativeContent.gif  # Service fallback bg
      motion.gif           # Service fallback bg
    partners/          # 15 files (14 partners + eabl duplicate)
/public
  index.html           # Static HTML, SEO meta, JSON-LD, Meta Pixel
  logo192.png, logo512.png, favicon.ico
  manifest.json
  robots.txt
  assets/css/variables-dark.css
/studio
  sanity.config.ts     # Studio config, structure tool
  sanity.cli.ts        # CLI config
  schemaTypes/         # 37 schema type files
  index.ts             # Schema type registry
/scripts
  seedSanity.js        # Seed script (1958 lines, createOrReplace only)
```

### 2.3 Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | HomePage | Renders Preloader, Hero, Header, About, Services, Partnerships, Team, GetInTouch, Footer |
| `/privacy-policy` | PrivacyPolicy | Standalone page + Footer |

### 2.4 Sections Rendered vs. Available

| Section | Component | Sanity Schema | Sanity Query | Rendered in App.jsx? |
|---------|-----------|--------------|--------------|---------------------|
| Preloader | Preloader.jsx | preloader | preloaderQuery | Yes |
| Hero | Hero.jsx | hero | heroQuery | Yes |
| Header | Header.jsx | header | headerQuery | Yes |
| About | About.jsx | about | aboutQuery | Yes |
| Services | Services.jsx | service + servicesSection | servicesQuery + servicesSectionQuery | Yes |
| Partnerships | Partnership.jsx | partnershipSection + partner | partnershipSectionQuery + partnersQuery | Yes |
| Team | Team.jsx | teamSection | teamQuery | Yes |
| GetInTouch | GetInTouch.jsx | getInTouch + contactDetail | getInTouchQuery | Yes |
| Footer | Footer.jsx | footer | footerQuery | Yes |
| Objectives | Objectives.jsx | objectives | objectivesQuery | **NO** |
| Counts | Counts.jsx | counts | countsQuery | **NO** |
| Approach | Approach.jsx | approach | approachQuery | **NO** |
| WhyUs | WhyUs.jsx | whyUs | whyUsQuery | **NO** |
| Portfolio | Portfolio.jsx | portfolioSection + portfolioItem | portfolioSectionQuery + portfolioItemsQuery | **NO** |
| Gallery | Gallery.jsx | gallerySection + galleryItem | gallerySectionQuery + galleryItemsQuery | **NO** |
| Privacy Policy | PrivacyPolicy.jsx | privacyPolicy | privacyPolicyQuery | Yes (route) |

**Critical finding:** 6 fully-built, Sanity-wired sections (Objectives, Counts, Approach, WhyUs, Portfolio, Gallery) exist as components with schemas, queries, and fallbacks but are **not mounted** in `App.jsx`. They are invisible on the live website.

---

## 3. Website Content Inventory

### 3.1 Header (`src/components/Header/Header.jsx`)

**Purpose:** Site header with brand logo, navigation, mobile menu toggle.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Logo image | Header.jsx:4 | image | `../../assets/img/phf_word_logo.png` | `header.logo` |
| Logo alt text | Header.jsx:57 | text | "Prince House Films" | `header.logoAlt` |
| Nav link: Home | Header.jsx:71 | internal link | label="Home", path="/" | `header.navLinks[]` |
| Nav link: Who We Are | Header.jsx:72 | internal link | label="Who We Are", path="/about" | `header.navLinks[]` |
| Nav link: What We Do | Header.jsx:73 | internal link | label="What We Do", path="/services" | `header.navLinks[]` |
| Nav link: partnerships | Header.jsx:74 | internal link | label="partnerships" (lowercase), path="/partnerships" | `header.navLinks[]` |
| Nav link: The Team | Header.jsx:75 | internal link | label="The Team", path="/team" | `header.navLinks[]` |
| Nav link: Contact | Header.jsx:76 | internal link | label="Contact", path="/contact" | `header.navLinks[]` |
| Menu open ARIA | Header.jsx:101 | text | "Open menu" | `header.menuOpenAria` |
| Menu close ARIA | Header.jsx:101 | text | "Close menu" | `header.menuCloseAria` |
| Scroll/active-link behavior | Header.jsx:27-50 | behavior | window.scrollY, section id matching | KEPT (behavior) |

**Repeat count:** 6 nav links  
**Hardcoded:** Logo image file, all nav paths, ARIA labels  
**CMS coverage:** Schema exists (`headerType`), query exists (`headerQuery`), component uses `useSanityData` with `fallbackHeader`.

---

### 3.2 Hero (`src/components/Hero/Hero.jsx`)

**Purpose:** Hero section with headline, CTA, background video/image.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Main title | Hero.jsx:6 | text | "Where visual storytelling" | `hero.title` |
| Highlighted text | Hero.jsx:7 | text | "meets strategy" | `hero.highlightedText` |
| CTA label | Hero.jsx:8 | text | "Start Your Project" | `hero.ctaText` |
| CTA link | Hero.jsx:9 | url | "#contact" | `hero.ctaLink` |
| Background type | Hero.jsx:10 | enum | "video" | `hero.backgroundType` |
| Background video URL | Hero.jsx:11-12 | url | `https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov` | `hero.backgroundVideoUrl` |
| Background image | Hero.jsx:20-23 | image | (none set) | `hero.backgroundImage` |

**CMS coverage:** Schema exists (`heroType`), query exists (`heroQuery`), component receives `data` prop from `App.jsx` which fetches `heroQuery`. Local `fallbackHero` object at lines 5-13.

**Note:** App.jsx fetches heroQuery and passes `heroData` prop. Hero.jsx also has a local `fallbackHero`. If Sanity fails, the local fallback is used (not the Sanity fallback flow via `useSanityData`).

---

### 3.3 Preloader (`src/components/Preloader/Preloader.jsx`)

**Purpose:** Full-screen loading screen with logo, progress bar, loading details, background video.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Logo image | Preloader.jsx:4 | image | `../../assets/img/phf_logo.png` | `preloader.logo` |
| Logo alt text | Preloader.jsx:182 | text | "Princehouse Films Logo" | `preloader.logoAlt` |
| Logo SVG icon | Preloader.jsx:187-207 | SVG | Hardcoded `<svg viewBox="0 0 100 100">` | KEPT (decorative) |
| Loading text | Preloader.jsx:237 | text | "Loading" | `preloader.loadingText` |
| Loading detail 1 | Preloader.jsx:290 | text | "Initializing Visuals" | `preloader.loadingDetails[].label` |
| Loading detail 2 | Preloader.jsx:298 | text | "Loading Assets" | `preloader.loadingDetails[].label` |
| Loading detail 3 | Preloader.jsx:306 | text | "Preparing Experience" | `preloader.loadingDetails[].label` |
| Background video URL | Preloader.jsx:333 | url | `/assets/img/WildNowLogovideo.mp4` | `preloader.backgroundVideoUrl` |
| Progress timing | Preloader.jsx:18-26 | behavior | 25ms step, 100% target | KEPT (math) |
| Video delay | Preloader.jsx:29-31 | behavior | 800ms | KEPT (math) |
| Complete timer | Preloader.jsx:34-36 | behavior | 3000ms | KEPT (math) |

**Repeat count:** 3 loading details, 12 particles, 4 floating elements  
**CMS coverage:** Schema exists (`preloaderType`), query exists (`preloaderQuery`), component uses `useSanityData` with `fallbackPreloader`.

---

### 3.4 About (`src/components/About/About.jsx`)

**Purpose:** "Who We Are" section with body text and CTA.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | About.jsx:21 | text | "Who We Are" | `about.title` |
| Body paragraph | About.jsx:26 | text | Long paragraph starting "Prince House Films is a full-service..." | `about.body` |
| CTA link | About.jsx:28 | url | "#contact" | `about.ctaLink` |
| CTA label | About.jsx:29 | text | "Work With Us" | `about.ctaText` |

**CMS coverage:** Schema exists (`aboutType`), query exists (`aboutQuery`), component uses `useSanityData` with `fallbackAbout`.  
**Note:** `about.png` asset exists but is unused.

---

### 3.5 Services (`src/components/Services/Services.jsx` + `ServiceModal.jsx`)

**Purpose:** Bento grid of service cards with modal detail view.

**Section-level content:**

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Services.jsx:84 | text | "Our Creative Services" | `servicesSection.sectionTitle` |

**Service cards (from Sanity `service` docs):** See Section 7 for detailed service-by-service matrix.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Service title | Services.jsx:109 | text | `item.title` | `service.title` |
| Service description | Services.jsx:111 | text | `item.text` | `service.text` |
| Service icon | Services.jsx:107 | icon element | `iconMap[item.icon]` | `service.icon` |
| Featured flag | Services.jsx:91 | boolean | `item.featured` | `service.featured` |
| Background type | Services.jsx:58 | enum | `item.backgroundType` | `service.backgroundType` |
| Background image | Services.jsx:59 | image | `item.backgroundImage` | `service.backgroundImage` |
| Background video URL | Services.jsx:65 | url | `item.backgroundVideoUrl` | `service.backgroundVideoUrl` |
| Local fallback key | Services.jsx:48-53 | string | title-matched: "creative"/"motion"/"none" | `service.localFallbackKey` |
| Media items (modal) | Services.jsx:43 | array | `item.mediaItems[]` | `service.mediaItems[]` |

**ServiceModal content:**

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Modal title | ServiceModal.jsx:64 | text | `serviceData.title` | `service.title` |
| Visual contents count | ServiceModal.jsx:66 | text | `{contentItems.length} visual contents` | Derived (not CMS) |
| Media items grid | ServiceModal.jsx:79-94 | array | `contentItems[]` | `service.mediaItems[]` |
| Instagram URL | ServiceModal.jsx:102 | url | `settings.instagramUrl` | `siteSettings.instagramUrl` |
| Instagram CTA label | ServiceModal.jsx:107 | text | `settings.instagramCtaLabel` | `siteSettings.instagramCtaLabel` |

**Media item shapes (MediaEmbed.jsx):**

| Item | File:Line | Type | CMS Field |
|------|-----------|------|-----------|
| Type (image/video) | mediaItemType:11 | enum | `mediaItem.type` |
| Title | mediaItemType:24 | text | `mediaItem.title` |
| Sanity image | mediaItemType:29 | image | `mediaItem.image` |
| External image URL | mediaItemType:36 | url | `mediaItem.imageUrl` |
| Video URL | mediaItemType:42 | url | `mediaItem.videoUrl` |
| External link/redirect | mediaItemType:49 | url | `mediaItem.externalUrl` |

**CMS coverage:** Schema exists (`serviceType`, `servicesSectionType`, `mediaItemType`). Queries exist (`servicesQuery`, `servicesSectionQuery`). Component uses `useSanityData` for section title, receives `services` prop from App.jsx for service items. Local fallbacks exist.

**Issues:**
- `localFallbackKey` title-matching is fragile (Services.jsx:48-53)
- Two separate queries for one section (servicesQuery + servicesSectionQuery)
- `mediaItem` supports uploaded image and external video URL, but **no uploaded video file** type

---

### 3.6 Objectives (`src/components/Objectives/Objectives.jsx`)

**Purpose:** "Our Vision & Mission" section with vision/mission cards and core values grid.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Objectives.jsx:38 | text | "Our Vision & Mission" | `objectives.sectionTitle` |
| Intro text | Objectives.jsx:41 | text | "At Prince House Films, we're driven by..." | `objectives.intro` |
| Vision card icon | Objectives.jsx:56 | icon | `<BiTargetLock />` | KEPT (decorative) |
| Vision title | Objectives.jsx:58 | text | "Our Vision" | `objectives.vision.title` |
| Vision body | Objectives.jsx:60 | text | Long paragraph | `objectives.vision.body` |
| Mission card icon | Objectives.jsx:75 | icon | `<BiRocket />` | KEPT (decorative) |
| Mission title | Objectives.jsx:77 | text | "Our Mission" | `objectives.mission.title` |
| Mission body | Objectives.jsx:79 | text | Long paragraph | `objectives.mission.body` |
| Values heading | Objectives.jsx:99 | text | "Our Core Values" | `objectives.valuesHeading` |
| Value: Innovation | Objectives.jsx:14-21 | object | title, description, iconKey="bulb" | `objectives.values[]` |
| Value: Passion | Objectives.jsx:14-21 | object | title, description, iconKey="heart" | `objectives.values[]` |
| Value: Excellence | Objectives.jsx:14-21 | object | title, description, iconKey="trending-up" | `objectives.values[]` |
| Value: Collaboration | Objectives.jsx:14-21 | object | title, description, iconKey="group" | `objectives.values[]` |

**Repeat count:** 4 values  
**CMS coverage:** Schema exists (`objectivesType`), query exists (`objectivesQuery`), component uses `useSanityData` with `fallbackObjectives`.  
**NOT rendered in App.jsx.**

---

### 3.7 Counts (`src/components/Counts/Counts.jsx`)

**Purpose:** "Our Impact in Numbers" section with animated counters and achievement badges.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Counts.jsx:116 | text | "Our Impact in Numbers" | `counts.sectionTitle` |
| Stat 1: Years of Excellence | Counts.jsx:102-109 | stat | number=10, suffix="+", label="Years of Excellence", iconKey="camera-movie" | `counts.stats[]` |
| Stat 2: Projects Completed | Counts.jsx:111-118 | stat | number=200, suffix="+", label="Projects Completed", iconKey="trophy" | `counts.stats[]` |
| Stat 3: Happy Clients | Counts.jsx:120-127 | stat | number=150, suffix="+", label="Happy Clients", iconKey="globe" | `counts.stats[]` |
| Stat 4: Client Satisfaction | Counts.jsx:129-136 | stat | number=98, suffix="%", label="Client Satisfaction", iconKey="happy" | `counts.stats[]` |
| Achievement 1: Premium Quality | Counts.jsx:198-203 | achievement | title, description, iconKey="star" | `counts.achievements[]` |
| Achievement 2: Global Reach | Counts.jsx:205-212 | achievement | title, description, iconKey="world" | `counts.achievements[]` |

**Repeat count:** 4 stats, 2 achievements  
**CMS coverage:** Schema exists (`countsType`), query exists (`countsQuery`), component uses `useSanityData` with `fallbackCounts`.  
**NOT rendered in App.jsx.**

**Bug:** Counts.jsx:44 uses `stat.key` but query returns `order`, not `key`. `counts[stat.key]` will be `undefined` for all stats.

---

### 3.8 Approach (`src/components/Approach/Approach.jsx`)

**Purpose:** "Our Creative Process" section with 5 process steps, 3 showcase items, process note.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Approach.jsx:38 | text | "Our Creative Process" | `approach.sectionTitle` |
| Step 1: Discovery & Strategy | Approach.jsx:87-95 | step | number="01", title, description, features[] | `approach.steps[]` |
| Step 2: Concept & Planning | Approach.jsx:96-104 | step | number="02", title, description, features[] | `approach.steps[]` |
| Step 3: Production & Filming | Approach.jsx:105-113 | step | number="03", title, description, features[] | `approach.steps[]` |
| Step 4: Post-Production | Approach.jsx:114-122 | step | number="04", title, description, features[] | `approach.steps[]` |
| Step 5: Delivery & Impact | Approach.jsx:123-131 | step | number="05", title, description, features[] | `approach.steps[]` |
| Showcase 1: Innovative Thinking | Approach.jsx:193-200 | object | title, description, iconKey="lightbulb" | `approach.showcase[]` |
| Showcase 2: Client Partnership | Approach.jsx:201-207 | object | title, description, iconKey="handshake" | `approach.showcase[]` |
| Showcase 3: Quality Assurance | Approach.jsx:208-214 | object | title, description, iconKey="play-circle" | `approach.showcase[]` |
| Process note quote | Approach.jsx:223 | text | "Every great film begins with a great story..." | `approach.processNote` |
| Process note attribution | Approach.jsx:231 | text | "— Prince House Films Team" | `approach.processNoteAttribution` |

**Repeat count:** 5 steps, 3 showcase items  
**CMS coverage:** Schema exists (`approachType`, `approachStepType` reserved), query exists (`approachQuery`), component uses `useSanityData` with `fallbackApproach`.  
**NOT rendered in App.jsx.**

---

### 3.9 WhyUs (`src/components/WhyUs/WhyUs.jsx`)

**Purpose:** "Why Choose Prince House Films" section with reason cards, comparison grid, footer stats.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | WhyUs.jsx:43 | text | "Why Choose Prince House Films" | `whyUs.sectionTitle` |
| Intro text | WhyUs.jsx:46 | text | "In a crowded market of content creators..." | `whyUs.intro` |
| Reason 1: Creative Excellence | WhyUs.jsx:262-273 | reason | title, description, features[], iconKey="star" | `whyUs.reasons[]` |
| Reason 2: Professional Quality | WhyUs.jsx:275-286 | reason | title, description, features[], iconKey="check-shield" | `whyUs.reasons[]` |
| Reason 3: Timely Delivery | WhyUs.jsx:288-300 | reason | title, description, features[], iconKey="time" | `whyUs.reasons[]` |
| Reason 4: Client-Centered Approach | WhyUs.jsx:302-313 | reason | title, description, features[], iconKey="user-voice" | `whyUs.reasons[]` |
| Comparison heading | WhyUs.jsx:86 | text | "The Prince House Films Difference" | `whyUs.comparisonHeading` |
| "With Us" label | WhyUs.jsx:92 | text | "With Us" | `whyUs.comparisonUsLabel` |
| "With Others" label | WhyUs.jsx:106 | text | "With Others" | `whyUs.comparisonOthersLabel` |
| "With Us" items (5) | WhyUs.jsx:318-323 | string[] | 5 bullet items | `whyUs.comparisonUsItems[]` |
| "With Others" items (5) | WhyUs.jsx:325-330 | string[] | 5 bullet items | `whyUs.comparisonOthersItems[]` |
| Footer stat 1: Projects Completed | WhyUs.jsx:333 | stat | number="200+", label="Projects Completed" | `whyUs.footerStats[]` |
| Footer stat 2: Client Satisfaction | WhyUs.jsx:334 | stat | number="98%", label="Client Satisfaction" | `whyUs.footerStats[]` |
| Footer stat 3: Industry Awards | WhyUs.jsx:335 | stat | number="50+", label="Industry Awards" | `whyUs.footerStats[]` |
| Footer stat 4: Support Available | WhyUs.jsx:336 | stat | number="24/7", label="Support Available" | `whyUs.footerStats[]` |

**Repeat count:** 4 reasons, 5+5 comparison items, 4 footer stats  
**CMS coverage:** Schema exists (`whyUsType`), query exists (`whyUsQuery`), component uses `useSanityData` with `fallbackWhyUs`.  
**NOT rendered in App.jsx.**

---

### 3.10 Partnerships (`src/components/Partnership/Partnership.jsx` + `partnerImages.jsx`)

**Purpose:** "Our Valued Partnerships" section with partner logo carousel and partnership type cards.

**Partners (14 total, from `partnerImages.jsx`):**

| # | Partner Name | Logo File | Alt Text | URL |
|---|-------------|-----------|----------|-----|
| 1 | Coca Cola | cocacola.jpeg | "Coca Cola logo" | null |
| 2 | Darling | darling.png | "Darling logo" | null |
| 3 | Delish | delish.png | "Delish logo" | null |
| 4 | Dr. Mattress | drmatress.png | "Dr. Mattress logo" | null |
| 5 | EABL | eabl.jpeg / eabl.png | "EABL logo" | null |
| 6 | Furniture Place | furnitureplace.png | "Furniture Place logo" | null |
| 7 | LC Waikiki | lcwaikiki.png | "LC Waikiki logo" | null |
| 8 | Mega Growth | megagrowth.png | "Mega Growth logo" | null |
| 9 | Orient | orient.png | "Orient logo" | null |
| 10 | Prestige | prestige.png | "Prestige logo" | null |
| 11 | Sarit | sarit.png | "Sarit logo" | null |
| 12 | Titi | titi.png | "Titi logo" | null |
| 13 | Two Rivers | tworivers.png | "Two Rivers logo" | null |
| 14 | V Spa | vspa.png | "V Spa logo" | null |

**Partnership section content:**

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Badge label | Partnership.jsx:55 | text | "Strategic Alliances" | `partnershipSection.badgeLabel` |
| Section title | Partnership.jsx:67 | text | "Our Valued Partnerships" | `partnershipSection.sectionTitle` |
| Intro text | Partnership.jsx:77 | text | "Building lasting relationships..." | `partnershipSection.intro` |
| Partner name | partnerImages.jsx:18-31 | text | `partner.name` | `partners[].name` |
| Partner logo image | partnerImages.jsx:2-15 | image | imported asset | `partners[].logo` |
| Partner logo alt | partnerImages.jsx:18-31 | text | `partner.logoAlt` | `partners[].logoAlt` |
| Partner URL | partnerImages.jsx:18-31 | url | null (all) | `partners[].url` |
| Partnership type: Brand Partnerships | Partnership.jsx:109-217 | object | title, description, features[], iconKey, color, accent | `partnershipSection.partnershipTypes[]` |
| Action button label | Partnership.jsx:204 | text | "Explore Partnership" | `partnershipSection.actionButtonLabel` |

**Repeat count:** 14 partners (rendered doubled `[...partners, ...partners]` for infinite carousel), 1 partnership type  
**CMS coverage:** Schema exists (`partnershipSectionType`, `partnerType`). Query `partnershipSectionQuery` does **NOT** include `partnershipTypes[]` — so `section.partnershipTypes` is always undefined and falls back to `fallbackPartnershipTypes`. Query `partnersQuery` exists for partner collection docs, but the component uses embedded `partners[]` from `partnershipSection`, NOT the `partner` collection.

**Critical gap:** Partners are embedded as objects in `partnershipSection.partners[]` AND exist as separate `partner` collection docs. The `partnersQuery` queries the collection but the component reads embedded objects. Duplication exists.

---

### 3.11 Team (`src/components/Team/Team.jsx`)

**Purpose:** "Meet Our Creative Team" section with group photo overlay.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Team.jsx:26 | text | "Meet Our Creative Team" | `teamSection.sectionTitle` |
| Intro text | Team.jsx:27 | text | "A passionate collective of storytellers..." | `teamSection.intro` |
| Group photo | Team.jsx:6 | image | `../../assets/img/team.jpg` (backgroundImage on div) | `teamSection.groupPhoto` |
| Group photo title | Team.jsx:49 | text | "The Creative Minds" | `teamSection.groupPhotoTitle` |
| Group photo description | Team.jsx:57 | text | "United by passion, driven by innovation" | `teamSection.groupPhotoDescription` |

**CMS coverage:** Schema exists (`teamSectionType`, `teamMemberType` reserved), query exists (`teamQuery`), component uses `useSanityData` with `fallbackTeam`.  
**Note:** `teamMember` collection exists but no individual members are rendered — only group photo.

---

### 3.12 Get In Touch (`src/components/GetInTouch/GetInTouch.jsx`)

**Purpose:** Contact section with contact cards, social links, and CTA buttons.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | GetInTouch.jsx:48 | text | "Have a Project In Mind?" | `getInTouch.sectionTitle` |
| Intro text | GetInTouch.jsx:50 | text | "Ready to bring your vision to life?..." | `getInTouch.intro` |
| Contact 1: Location | GetInTouch.jsx:17-42 | card | title="Location", content="Nairobi, Kenya", link=maps URL | `getInTouch.contactDetails[]` |
| Contact 2: Email | GetInTouch.jsx:17-42 | card | title="Email", content="info@...", link=mailto: | `getInTouch.contactDetails[]` |
| Contact 3: Phone | GetInTouch.jsx:17-42 | card | title="Phone", content="+254 715 130 028", link=tel: | `getInTouch.contactDetails[]` |
| Socials heading | GetInTouch.jsx:99 | text | "Follow Us" | `getInTouch.socialsHeading` |
| Social: Instagram | GetInTouch.jsx:102-122 | link | platform, handle, url, iconClass, color | `getInTouch.socials[]` |
| Social: Facebook | GetInTouch.jsx:102-122 | link | platform, handle, url, iconClass, color | `getInTouch.socials[]` |
| Social: TikTok | GetInTouch.jsx:102-122 | link | platform, handle, url, iconClass, color | `getInTouch.socials[]` |
| Social: LinkedIn | GetInTouch.jsx:102-122 | link | platform, handle, url, iconClass, color | `getInTouch.socials[]` |
| CTA title | GetInTouch.jsx:140 | text | "Free 30-Min Consultation" | `getInTouch.ctaTitle` |
| CTA description | GetInTouch.jsx:142 | text | "Discuss your project with our creative director" | `getInTouch.ctaDescription` |
| Consultation URL | GetInTouch.jsx:146 | url | `https://calendly.com/princehousefilms/consultation` | `getInTouch.consultationUrl` |
| Book Now label | GetInTouch.jsx:153 | text | "Book Now" | `getInTouch.bookNowLabel` |
| Call URL | GetInTouch.jsx:156 | url | `tel:+254715130028` | `getInTouch.callUrl` |
| Call label | GetInTouch.jsx:161 | text | "Call" | `getInTouch.callLabel` |
| CTA note | GetInTouch.jsx:165 | text | "24-hour response" | `getInTouch.ctaNote` |

**Repeat count:** 3 contact details, 4 socials  
**CMS coverage:** Schema exists (`getInTouchType`, `contactDetailType`, `socialLinkType`), query exists (`getInTouchQuery`), component uses `useSanityData` with `fallbackGetInTouch`.  
**Note:** Footer has a separate socials list (includes YouTube). GetInTouch socials does not include YouTube.

---

### 3.13 Footer (`src/components/Footer/Footer.jsx`)

**Purpose:** Site footer with logo, social icons, privacy link, copyright.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Logo image | Footer.jsx:5 | image | `../../assets/img/phf_logo.png` | `footer.logo` |
| Logo alt text | Footer.jsx:22 | text | "Prince House Films" | `footer.logoAlt` |
| Social: Instagram | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: YouTube | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: TikTok | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Social: Facebook | Footer.jsx:25-34 | link | url, iconClass, color | `footer.socials[]` |
| Privacy link path | Footer.jsx:39 | internal link | "/privacy-policy" | `footer.privacyLink` |
| Privacy link label | Footer.jsx:39 | text | "Privacy Policy" | `footer.privacyLabel` |
| Copyright text | Footer.jsx:43 | text | "© {year} Prince House Films" | `footer.copyrightText` (year computed) |

**Repeat count:** 4 socials  
**CMS coverage:** Schema exists (`footerType`), query exists (`footerQuery`), component uses `useSanityData` with `fallbackFooter`.

---

### 3.14 Portfolio (`src/components/Portfolio/Portfolio.jsx`) — NOT RENDERED

**Purpose:** Portfolio grid with filter buttons and project detail modal.

**Section content:**

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Portfolio.jsx:79 | text | "Our Portolio" (typo) | `portfolioSection.sectionTitle` |
| Filter: All Projects | Portfolio.jsx:38 | filter | label="All Projects", id="all" | `portfolioSection.categories[]` |
| Filter: Commercial | Portfolio.jsx:38 | filter | label="Commercial" | `portfolioSection.categories[]` |
| Filter: Documentary | Portfolio.jsx:38 | filter | label="Documentary" | `portfolioSection.categories[]` |
| Filter: Corporate | Portfolio.jsx:38 | filter | label="Corporate" | `portfolioSection.categories[]` |
| Filter: Social Media | Portfolio.jsx:38 | filter | label="Social Media" | `portfolioSection.categories[]` |
| Filter: Events | Portfolio.jsx:38 | filter | label="Events" | `portfolioSection.categories[]` |

**Portfolio items (6, from `fallbackPortfolioItems`):**

| # | Title | Category | Description | Image URL | Client | Year | Duration | Awards |
|---|-------|----------|-------------|-----------|--------|------|----------|--------|
| 1 | Wildlife Conservation Documentary | documentary | Award-winning documentary on African wildlife conservation | unsplash photo-1550358864 | National Geographic | 2023 | 45 min | Best Documentary 2023, Wildlife Film Festival Winner |
| 2 | Tech Startup Brand Film | commercial | Corporate brand film for Silicon Valley tech startup | unsplash photo-1552664730 | TechNova Inc. | 2024 | 3 min | Best Brand Film, Marketing Excellence Award |
| 3 | Music Festival Coverage | events | Multi-camera live coverage of major music festival | unsplash photo-1470225620 | MTV Africa | 2023 | 120 min | Best Event Coverage, Live Production Award |
| 4 | Corporate Training Series | corporate | 12-part training video series for multinational corporation | unsplash photo-1556761175 | GlobalCorp | 2024 | 6 hours total | Excellence in Corporate Media |
| 5 | Social Media Campaign | social | Viral social media campaign for fashion brand | pexels photo-147413 | UrbanStyle | 2024 | 30 sec episodes | Viral Campaign Award, Social Media Excellence |
| 6 | Product Launch Film | commercial | Cinematic product launch for luxury automotive brand | unsplash photo-1489824904 | Luxury Motors | 2023 | 5 min | Best Automotive Film, Cinematography Award |

**Modal content (per item):**
- Image (backgroundImage on div)
- Title (h3)
- Details (p)
- Year, Duration, Client, Category (detail items)
- Awards & Recognition (ul list)
- Watch Film CTA (link to `/project/{id}`)

**Card content (per item):**
- Category badge
- Title (h3)
- Description (p)
- View Project link (href="#", prevented)

**CMS coverage:** Schema exists (`portfolioSectionType`, `portfolioCategoryType`, `portfolioItemType`), queries exist (`portfolioSectionQuery`, `portfolioItemsQuery`), component uses `useSanityData` with fallbacks.  
**NOT rendered in App.jsx.** Component exists but is not imported anywhere.

---

### 3.15 Gallery (`src/components/Gallery/Gallery.jsx`) — NOT RENDERED

**Purpose:** Behind-the-scenes gallery with filter buttons and lightbox.

**Section content:**

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Section title | Gallery.jsx:78 | text | "Behind the Scenes Gallery" | `gallerySection.sectionTitle` |
| Intro text | Gallery.jsx:82 | text | "Take a look at the passion, precision..." | `gallerySection.intro` |
| Filter: All | Gallery.jsx:37 | filter | label="All" | `gallerySection.categories[]` |
| Filter: Behind the Scenes | Gallery.jsx:37 | filter | label="Behind the Scenes" | `gallerySection.categories[]` |
| Filter: Production | Gallery.jsx:37 | filter | label="Production" | `gallerySection.categories[]` |
| Filter: Events | Gallery.jsx:37 | filter | label="Events" | `gallerySection.categories[]` |
| Filter: Locations | Gallery.jsx:37 | filter | label="Locations" | `gallerySection.categories[]` |
| Filter: Equipment | Gallery.jsx:37 | filter | label="Equipment" | `gallerySection.categories[]` |
| View More link | Gallery.jsx:143 | url | "/full-gallery" | `gallerySection.viewMoreLink` |
| View More label | Gallery.jsx:143 | text | "View More in Gallery" | `gallerySection.viewMoreLabel` |

**Gallery items (9, from `fallbackGalleryItems`):**

| # | Title | Category | Description | Image URL | Date | Location | Type |
|---|-------|----------|-------------|-----------|------|----------|------|
| 1 | Wildlife Documentary Shoot | behind-scenes | Capturing rare wildlife moments in Maasai Mara | unsplash photo-1550358864 | 2023 | Maasai Mara, Kenya | photo |
| 2 | Studio Production Setup | production | Professional studio setup for commercial shoot | unsplash photo-1552664730 | 2024 | Nairobi Studio | photo |
| 3 | Music Festival Coverage | events | Multi-camera setup for live festival broadcast | unsplash photo-1470225620 | 2023 | Carnivore Grounds, Nairobi | video |
| 4 | Mountain Documentary Location | locations | Shooting in challenging mountain terrain | unsplash photo-1506905925 | 2023 | Mount Kenya | photo |
| 5 | Cinema Camera Setup | equipment | Professional cinema camera rig for film shoot | unsplash photo-1563297007 | 2024 | Production Set | photo |
| 6 | Corporate Event Coverage | events | Live streaming setup for corporate conference | unsplash photo-1511578314 | 2024 | KICC, Nairobi | video |
| 7 | Post-Production Suite | production | Color grading and editing workstation | unsplash photo-1593359677 | 2024 | Post-Production Studio | photo |
| 8 | Drone Cinematography | equipment | Aerial shots for commercial production | unsplash photo-1578662996 | 2023 | Coastal Region | video |
| 9 | Interview Setup | behind-scenes | Professional interview lighting and audio setup | unsplash photo-1556761175 | 2024 | Documentary Set | photo |

**Lightbox content (per item):**
- Image (backgroundImage)
- Title, Description
- Date, Location, Category, Media Type (Photo/Video)
- Watch Video CTA (link to `/watch/{id}`, video only)

**CMS coverage:** Schema exists (`gallerySectionType`, `galleryCategoryType`, `galleryItemType`), queries exist (`gallerySectionQuery`, `galleryItemsQuery`), component uses `useSanityData` with fallbacks.  
**NOT rendered in App.jsx.** Component exists but is not imported anywhere.

---

### 3.16 Privacy Policy (`src/pages/PrivacyPolicy/PrivacyPolicy.jsx`) — RENDERED ON ROUTE

**Purpose:** Privacy policy page at `/privacy-policy`.

| Item | File:Line | Type | Current Value | CMS Field |
|------|-----------|------|---------------|-----------|
| Back to Home label | PrivacyPolicy.jsx:61 | text | "Back to Home" | `privacyPolicy.backToHomeLabel` |
| Eyebrow label | PrivacyPolicy.jsx:67 | text | "Legal" | `privacyPolicy.eyebrow` |
| Page title | PrivacyPolicy.jsx:68 | text | "Privacy Policy for Prince House Films" | `privacyPolicy.title` |
| Effective date | PrivacyPolicy.jsx:71 | text | "15/04/2026" | `privacyPolicy.effectiveDate` |
| Last updated | PrivacyPolicy.jsx:74 | text | "15/04/2026" | `privacyPolicy.lastUpdated` |
| Policy body | PrivacyPolicy.jsx:80 | rich text | 48 blocks (h2, p, bullet lists) | `privacyPolicy.body` |
| Contact: brand name | PrivacyPolicy.jsx:85 | text | `settings.brandName` | `siteSettings.brandName` |
| Contact: email | PrivacyPolicy.jsx:87 | text | `settings.email` | `siteSettings.email` |
| Contact: phone | PrivacyPolicy.jsx:91 | text | "0715130028" (HARDCODED) | Not from CMS |
| Contact: website | PrivacyPolicy.jsx:92 | text | "www.princehousefilms.com" (HARDCODED) | Not from CMS |

**Repeat count:** 48 Portable Text blocks  
**CMS coverage:** Schema exists (`privacyPolicyType`), query exists (`privacyPolicyQuery`), component uses `useSanityData` with `fallbackPrivacyPolicy`.  
**Note:** `@portabletext/react` IS installed but the component uses custom serializers. Phone and website are hardcoded in component (not from siteSettings).

---

### 3.17 Media Assets Inventory

**Local images (src/assets/img/):**

| Asset | Used By | Component | Status |
|-------|---------|-----------|--------|
| phf_word_logo.png | Header logo | Header.jsx:4 | Content (brand) |
| phf_logo.png | Preloader + Footer logo | Preloader.jsx:4, Footer.jsx:5 | Content (brand) |
| about.png | UNUSED | — | Available for future |
| team.jpg | Team group photo | Team.jsx:10 | Content (decorative bg) |
| services/creativeContent.gif | Service fallback bg | Services.jsx:14 | Fallback |
| services/motion.gif | Service fallback bg | Services.jsx:15 | Fallback |
| partners/cocacola.jpeg | Partner logo | partnerImages.jsx:2 | Content |
| partners/darling.png | Partner logo | partnerImages.jsx:3 | Content |
| partners/delish.png | Partner logo | partnerImages.jsx:4 | Content |
| partners/drmatress.png | Partner logo | partnerImages.jsx:5 | Content |
| partners/eabl.jpeg | Partner logo | partnerImages.jsx:6 | Content |
| partners/eabl.png | Partner logo (duplicate) | partnerImages.jsx:6 | Content (duplicate) |
| partners/furnitureplace.png | Partner logo | partnerImages.jsx:7 | Content |
| partners/lcwaikiki.png | Partner logo | partnerImages.jsx:8 | Content |
| partners/megagrowth.png | Partner logo | partnerImages.jsx:9 | Content |
| partners/orient.png | Partner logo | partnerImages.jsx:10 | Content |
| partners/prestige.png | Partner logo | partnerImages.jsx:11 | Content |
| partners/sarit.png | Partner logo | partnerImages.jsx:12 | Content |
| partners/titi.png | Partner logo | partnerImages.jsx:13 | Content |
| partners/tworivers.png | Partner logo | partnerImages.jsx:14 | Content |
| partners/vspa.png | Partner logo | partnerImages.jsx:15 | Content |
| public/logo192.png | PWA icon | index.html | Asset |
| public/logo512.png | PWA icon | index.html | Asset |
| public/favicon.ico | Favicon | index.html | Asset |

**Local video (referenced but not in src/assets/):**
- `/assets/img/WildNowLogovideo.mp4` — Preloader background video (Preloader.jsx:327). **File existence unverified.**

**External media URLs:**

| URL | Used By | Component | Type |
|-----|---------|-----------|------|
| https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov | Hero background | Hero.jsx:11-12 | Direct video (Cloudinary) |
| https://images.unsplash.com/photo-1550358864-518f202c02ba | Portfolio item 1, Gallery item 1 | fallbacks | External image |
| https://images.unsplash.com/photo-1552664730-d307ca884978 | Portfolio item 2, Gallery item 2 | fallbacks | External image |
| https://images.unsplash.com/photo-1470225620780-dba8ba36b745 | Portfolio item 3, Gallery item 3 | fallbacks | External image |
| https://images.unsplash.com/photo-1556761175-b413da4baf72 | Portfolio item 4, Gallery item 5, 9 | fallbacks | External image |
| https://images.pexels.com/photos/147413/... | Portfolio item 5 | fallbacks | External image |
| https://images.unsplash.com/photo-1489824904134-891ab64532f1 | Portfolio item 6 | fallbacks | External image |
| https://images.unsplash.com/photo-1506905925346-21bda4d32df4 | Gallery item 4 | fallbacks | External image |
| https://images.unsplash.com/photo-1563297007-0686b7003af7 | Gallery item 5 | fallbacks | External image |
| https://images.unsplash.com/photo-1511578314322-379afb476865 | Gallery item 6 | fallbacks | External image |
| https://images.unsplash.com/photo-1593359677879-a4bb92f829d1 | Gallery item 7 | fallbacks | External image |
| https://images.unsplash.com/photo-1578662996442-48f60103fc96 | Gallery item 8 | fallbacks | External image |
| https://assets.codepen.io/148180/video1.mp4 | portfolioData.js (unused) | — | External video |
| https://assets.codepen.io/148180/video2.mp4 | portfolioData.js (unused) | — | External video |

**Total local media assets:** 21 image files + 1 favicon + 1 logo512 + 1 logo192 = ~24  
**Total external media URLs:** 1 video + 12 images = 13  
**Note:** `about.png` is unused. `WildNowLogovideo.mp4` existence unverified.

---

### 3.18 Links and Navigation Inventory

**Internal links:**

| Link | Destination | Component | Line | CMS Managed? |
|------|-------------|-----------|------|-------------|
| / | Home | Header | Header.jsx:71 | Yes (navLinks[].path) |
| /about | About section | Header | Header.jsx:72 | Yes (navLinks[].path) |
| /services | Services section | Header | Header.jsx:73 | Yes (navLinks[].path) |
| /partnerships | Partnerships section | Header | Header.jsx:74 | Yes (navLinks[].path) |
| /team | Team section | Header | Header.jsx:75 | Yes (navLinks[].path) |
| /contact | GetInTouch section | Header | Header.jsx:76 | Yes (navLinks[].path) |
| #contact | About CTA | About.jsx:28 | Yes (about.ctaLink) |
| /privacy-policy | Privacy Policy | Footer.jsx:39 | Yes (footer.privacyLink) |
| / | Back to Home | PrivacyPolicy.jsx:59 | No (structural) |
| /project/{id} | Portfolio project | Portfolio.jsx:276 | No (structural route) |
| /full-gallery | Gallery view more | Gallery.jsx:143 | Yes (gallerySection.viewMoreLink) |
| /watch/{id} | Gallery video watch | Gallery.jsx:198 | No (structural route) |
| /contact?type=partnership | Partnership CTA (commented) | Partnership.jsx:323 | No (commented out) |
| /portfolio | Partnership CTA (commented) | Partnership.jsx:336 | No (commented out) |

**External links:**

| URL | Component | Line | CMS Managed? |
|-----|-----------|------|-------------|
| https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs | Hero CTA (no, it's #contact) | ServiceModal.jsx:102 | Yes (siteSettings.instagramUrl) |
| https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs | Footer social | Footer.jsx:25-34 | Yes (footer.socials[].url) |
| https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w | Footer social | Footer.jsx:25-34 | Yes (footer.socials[].url) |
| https://www.tiktok.com/@princehousefilms?_r=1&_t=ZS-93Two21vb3y | Footer social | Footer.jsx:25-34 | Yes (footer.socials[].url) |
| Facebook URL (long) | Footer social | Footer.jsx:25-34 | Yes (footer.socials[].url) |
| https://instagram.com/princehouse_films | GetInTouch social | GetInTouch.jsx:102-122 | Yes (getInTouch.socials[].url) |
| https://facebook.com/PrinceHouseFilms | GetInTouch social | GetInTouch.jsx:102-122 | Yes (getInTouch.socials[].url) |
| https://tiktok.com/@princehousefilms | GetInTouch social | GetInTouch.jsx:102-122 | Yes (getInTouch.socials[].url) |
| https://linkedin.com/company/prince-house-films | GetInTouch social | GetInTouch.jsx:102-122 | Yes (getInTouch.socials[].url) |
| https://maps.google.com/?q=Nairobi+Kenya | GetInTouch contact | GetInTouch.jsx:22 | Yes (contactDetails[].link) |
| mailto:info@princehousefilms.com | GetInTouch contact | GetInTouch.jsx:30 | Yes (contactDetails[].link) |
| tel:+254715130028 | GetInTouch contact | GetInTouch.jsx:38 | Yes (contactDetails[].link) |
| https://calendly.com/princehousefilms/consultation | GetInTouch CTA | GetInTouch.jsx:146 | Yes (getInTouch.consultationUrl) |
| tel:+254715130028 | GetInTouch CTA | GetInTouch.jsx:156 | Yes (getInTouch.callUrl) |
| https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs | serviceData (hardcoded in seed) | ServiceModal.jsx | Yes (siteSettings.instagramUrl) |

**Social media links:** Instagram, YouTube, TikTok, Facebook (footer); Instagram, Facebook, TikTok, LinkedIn (GetInTouch).  
**Email links:** mailto:info@princehousefilms.com  
**Telephone links:** tel:+254715130028  
**Download links:** None  
**Media URLs:** Cloudinary hero video, Unsplash/Pexels images  
**Embedded media URLs:** YouTube, Vimeo (supported by MediaEmbed but not currently used in website content)

---

## 4. Existing Sanity Architecture Inventory

### 4.1 Schema Types (37 total)

| # | Type | Kind | Location | Purpose |
|---|------|------|----------|---------|
| 1 | hero | document | heroType.ts | Hero section content |
| 2 | service | document | serviceType.ts | Service cards |
| 3 | mediaItem | object | mediaItemType.ts | Media items for service modal |
| 4 | siteSettings | document | siteSettingsType.ts | Global site settings |
| 5 | header | document | headerType.ts | Header navigation |
| 6 | preloader | document | preloaderType.ts | Preloader content |
| 7 | about | document | aboutType.ts | About section |
| 8 | approach | document | approachType.ts | Approach section |
| 9 | objectives | document | objectivesType.ts | Objectives section |
| 10 | counts | document | countsType.ts | Counts section |
| 11 | whyUs | document | whyUsType.ts | Why Us section |
| 12 | servicesSection | document | servicesSectionType.ts | Services section title |
| 13 | portfolioSection | document | portfolioSectionType.ts | Portfolio section |
| 14 | gallerySection | document | gallerySectionType.ts | Gallery section |
| 15 | teamSection | document | teamSectionType.ts | Team section |
| 16 | partnershipSection | document | partnershipSectionType.ts | Partnership section |
| 17 | getInTouch | document | getInTouchType.ts | Get In Touch section |
| 18 | footer | document | footerType.ts | Footer content |
| 19 | privacyPolicy | document | privacyPolicyType.ts | Privacy Policy page |
| 20 | errorBoundary | document | errorBoundaryType.ts | Error fallback text |
| 21 | approachStep | document | approachStepType.ts | Approach steps (reserved) |
| 22 | portfolioCategory | document | portfolioCategoryType.ts | Portfolio filter categories |
| 23 | portfolioItem | document | portfolioItemType.ts | Portfolio items |
| 24 | galleryCategory | document | galleryCategoryType.ts | Gallery filter categories |
| 25 | galleryItem | document | galleryItemType.ts | Gallery items |
| 26 | teamMember | document | teamMemberType.ts | Team members (reserved) |
| 27 | partner | document | partnerType.ts | Partner logos |
| 28 | contactDetail | document | contactDetailType.ts | Contact details |
| 29 | internalLink | object | internalLinkType.ts | Internal link object |
| 30 | externalLink | object | externalLinkType.ts | External link object |
| 31 | socialLink | object | socialLinkType.ts | Social link object |
| 32 | seo | object | seoType.ts | SEO metadata (deferred) |

### 4.2 Studio Desk Structure (`studio/sanity.config.ts`)

The Studio uses `structureTool` with two main groups:

**Page Sections (singletons):** Site Settings, Header, Preloader, Hero, About, Our Creative Process, Our Vision & Mission, Our Impact in Numbers, Why Choose Us, Services Section, Portfolio Section, Gallery Section, Team Section, Partnership Section, Get In Touch, Footer, Privacy Policy, Error Boundary.

**Collections (repeatable):** Services, Approach Steps, Portfolio Categories, Portfolio Items, Gallery Categories, Gallery Items, Partner Logos, Contact Details. (Team Members commented out.)

### 4.3 GROQ Queries (21 total, `src/lib/queries.js`)

| Query | Type | Projection Complete? | Used By |
|-------|------|---------------------|---------|
| heroQuery | hero | Yes | App.jsx → Hero |
| servicesQuery | service[] | Yes | App.jsx → Services |
| servicesSectionQuery | servicesSection | Partial (sectionTitle only) | Services.jsx |
| siteSettingsQuery | siteSettings | Yes | ServiceModal, PrivacyPolicy |
| headerQuery | header | Yes | Header.jsx |
| preloaderQuery | preloader | Yes | Preloader.jsx |
| aboutQuery | about | Yes | About.jsx |
| approachQuery | approach | Yes | Approach.jsx |
| objectivesQuery | objectives | Yes | Objectives.jsx |
| countsQuery | counts | Yes | Counts.jsx |
| whyUsQuery | whyUs | Yes | WhyUs.jsx |
| portfolioSectionQuery | portfolioSection | Yes | Portfolio.jsx |
| portfolioItemsQuery | portfolioItem[] | Yes | Portfolio.jsx |
| gallerySectionQuery | gallerySection | Yes | Gallery.jsx |
| galleryItemsQuery | galleryItem[] | Yes | Gallery.jsx |
| teamQuery | teamSection | Yes | Team.jsx |
| partnershipSectionQuery | partnershipSection | **INCOMPLETE** (missing partnershipTypes[]) | Partnership.jsx |
| partnersQuery | partner[] | Yes | (not used by component) |
| partnershipTypesQuery | partnershipSection | Redundant | (not used by component) |
| getInTouchQuery | getInTouch | Yes | GetInTouch.jsx |
| footerQuery | footer | Yes | Footer.jsx |
| privacyPolicyQuery | privacyPolicy | Yes | PrivacyPolicy.jsx |
| errorBoundaryQuery | errorBoundary | Yes | (not consumed) |

### 4.4 Frontend Integration

| Component | Hook Used | Query | Fallback | Sanity-Driven? |
|-----------|-----------|-------|----------|---------------|
| App.jsx | sanityClient.fetch (direct) | heroQuery, servicesQuery | N/A | Yes (Hero, Services) |
| Header | useSanityData | headerQuery | fallbackHeader | Yes |
| Hero | prop from App | heroQuery | fallbackHero (local) | Partial |
| Preloader | useSanityData | preloaderQuery | fallbackPreloader | Yes |
| About | useSanityData | aboutQuery | fallbackAbout | Yes |
| Services | useSanityData + prop | servicesSectionQuery + servicesQuery | fallbackServicesSection | Yes |
| Partnership | useSanityData | partnershipSectionQuery + partnersQuery | fallbackPartnershipSection | Partial (types missing from query) |
| Team | useSanityData | teamQuery | fallbackTeam | Yes |
| GetInTouch | useSanityData | getInTouchQuery | fallbackGetInTouch | Yes |
| Footer | useSanityData | footerQuery | fallbackFooter | Yes |
| PrivacyPolicy | useSanityData | privacyPolicyQuery + siteSettingsQuery | fallbackPrivacyPolicy | Yes |
| Objectives | useSanityData | objectivesQuery | fallbackObjectives | Yes (not rendered) |
| Counts | useSanityData | countsQuery | fallbackCounts | Yes (not rendered) |
| Approach | useSanityData | approachQuery | fallbackApproach | Yes (not rendered) |
| WhyUs | useSanityData | whyUsQuery | fallbackWhyUs | Yes (not rendered) |
| Portfolio | useSanityData | portfolioSectionQuery + portfolioItemsQuery | fallbackPortfolioSection/Items | Yes (not rendered) |
| Gallery | useSanityData | gallerySectionQuery + galleryItemsQuery | fallbackGallerySection/Items | Yes (not rendered) |
| ErrorBoundary | None (class) | errorBoundaryQuery | N/A | **NO** (text hardcoded) |
| MediaEmbed | None (receives props) | N/A | N/A | Yes (renders item shapes) |
| ScrollToTop | None | N/A | N/A | N/A (renders null) |

---

## 5. Section-by-Section Coverage Assessment

### 5.1 Header

**A. Existing website content:** Logo image, logo alt, 6 nav links (Home, Who We Are, What We Do, partnerships, The Team, Contact), menu open/close ARIA labels.

**B. Current Sanity coverage:** `headerType` schema with logo, logoAlt, navLinks[] (label, path), menuOpenAria, menuCloseAria. `headerQuery` projects all fields. `Header.jsx` uses `useSanityData` with `fallbackHeader`.

**C. Missing content:** None — all content is represented.

**D. Incomplete functionality:** None significant. Nav paths are structural but editable via CMS.

**E. Recommended structure:** Current structure is adequate. Consider adding `openInNewTab` flag for nav links if external links are needed in future.

**F. Implementation dependencies:** None — already complete.

---

### 5.2 Hero

**A. Existing website content:** Title, highlighted text, CTA text, CTA link, background type (video/image), background video URL (Cloudinary .mov), background image (none set).

**B. Current Sanity coverage:** `heroType` schema with all fields. `heroQuery` projects all fields. `App.jsx` fetches and passes to `Hero.jsx`. `Hero.jsx` has local `fallbackHero`.

**C. Missing content:** None.

**D. Incomplete functionality:** Hero has dual data sources (App.jsx prop + local fallbackHero). If Sanity fails, local fallback is used instead of a Sanity-managed fallback. This is acceptable but creates two sources of truth.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** None — already complete.

---

### 5.3 Preloader

**A. Existing website content:** Logo image, logo alt, loading text, 3 loading detail labels, background video URL, SVG logo icon (decorative), timing values (decorative/behavioral).

**B. Current Sanity coverage:** `preloaderType` schema with logo, logoAlt, loadingText, loadingDetails[] (label), backgroundVideoUrl. `preloaderQuery` projects all fields. `Preloader.jsx` uses `useSanityData` with `fallbackPreloader`.

**C. Missing content:** None.

**D. Incomplete functionality:** None. `backgroundVideoUrl` references `/assets/img/WildNowLogovideo.mp4` — file existence unverified.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** Verify `WildNowLogovideo.mp4` exists at `/assets/img/`.

---

### 5.4 About

**A. Existing website content:** Section title ("Who We Are"), body paragraph, CTA link ("#contact"), CTA label ("Work With Us").

**B. Current Sanity coverage:** `aboutType` schema with title, body, ctaLink, ctaText. `aboutQuery` projects all fields. `About.jsx` uses `useSanityData` with `fallbackAbout`.

**C. Missing content:** None. `about.png` asset is unused.

**D. Incomplete functionality:** None.

**E. Recommended structure:** Current structure is adequate. Could add optional image field for `about.png` if needed.

**F. Implementation dependencies:** None — already complete.

---

### 5.5 Objectives

**A. Existing website content:** Section title, intro text, vision card (title + body), mission card (title + body), values heading, 4 values (title + description + iconKey each).

**B. Current Sanity coverage:** `objectivesType` schema with all fields. `objectivesQuery` projects all fields. `Objectives.jsx` uses `useSanityData` with `fallbackObjectives`.

**C. Missing content:** None.

**D. Incomplete functionality:** Component is **not rendered in App.jsx**. Schema and query are complete but the section is invisible on the live site.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** Import and render `Objectives` in `App.jsx`. Decide section order in page.

---

### 5.6 Counts

**A. Existing website content:** Section title, 4 stats (number, suffix, label, description, iconKey), 2 achievements (title, description, iconKey).

**B. Current Sanity coverage:** `countsType` schema with all fields. `countsQuery` projects all fields. `Counts.jsx` uses `useSanityData` with `fallbackCounts`.

**C. Missing content:** None.

**D. Incomplete functionality:**
1. Component is **not rendered in App.jsx**.
2. `Counts.jsx:44` uses `stat.key` but query returns `order`, not `key`. The counter animation keyed by `stat.key` will fail because `key` is undefined.

**E. Recommended structure:** Current schema structure is adequate. Fix query to project `key` or fix component to use `order`/`_key`.

**F. Implementation dependencies:** Fix `Counts.jsx` key reference, import and render `Counts` in `App.jsx`.

---

### 5.7 Approach

**A. Existing website content:** Section title, 5 process steps (number, title, description, features[]), 3 showcase items (title, description, iconKey), process note quote, process note attribution.

**B. Current Sanity coverage:** `approachType` schema with all fields. `approachQuery` projects all fields. `Approach.jsx` uses `useSanityData` with `fallbackApproach`.

**C. Missing content:** None.

**D. Incomplete functionality:** Component is **not rendered in App.jsx**.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** Import and render `Approach` in `App.jsx`.

---

### 5.8 WhyUs

**A. Existing website content:** Section title, intro text, 4 reasons (title, description, features[], iconKey), comparison heading, "With Us"/"With Others" labels, 5+5 comparison items, 4 footer stats (number, label).

**B. Current Sanity coverage:** `whyUsType` schema with all fields. `whyUsQuery` projects all fields. `WhyUs.jsx` uses `useSanityData` with `fallbackWhyUs`.

**C. Missing content:** None.

**D. Incomplete functionality:** Component is **not rendered in App.jsx**.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** Import and render `WhyUs` in `App.jsx`.

---

### 5.9 Services

**A. Existing website content:** Section title ("Our Creative Services"), service cards (title, text, icon, featured, background image/video, media items), modal (title, media items grid, Instagram CTA).

**B. Current Sanity coverage:** `serviceType` schema with title, text, icon, featured, orderRank, backgroundType, backgroundImage, backgroundVideoUrl, mediaItems[] (mediaItem), localFallbackKey. `servicesSectionType` with sectionTitle. `servicesQuery` and `servicesSectionQuery` exist.

**C. Missing content:** None at schema level.

**D. Incomplete functionality:**
1. Two separate queries for one section (servicesQuery for items, servicesSectionQuery for title).
2. `localFallbackKey` title-matching is fragile (Services.jsx:48-53).
3. `mediaItem` supports uploaded image and external video URL but **no uploaded video file** type.
4. ServiceModal Instagram URL comes from `siteSettings`, not from `servicesSection` — creates cross-document dependency.

**E. Recommended structure:** Current structure is adequate. Consider merging section title into service query or keeping separate (acceptable pattern).

**F. Implementation dependencies:** None critical. Already mostly complete.

---

### 5.10 Portfolio

**A. Existing website content:** Section title ("Our Portolio"), 6 filter categories, 6 portfolio items (each with title, category, description, details, cover image, client, year, duration, awards[], watch CTA label), modal content.

**B. Current Sanity coverage:** `portfolioSectionType` with sectionTitle + categories[] (references to portfolioCategory). `portfolioCategoryType` with order + label. `portfolioItemType` with order, title, category (string), shortDescription, details, coverImage, coverImageUrl, coverAlt, client, year, duration, awards[], watchCtaLabel. `portfolioSectionQuery` and `portfolioItemsQuery` exist.

**C. Missing content:** None at schema level. The `Portfolio.jsx` component exists and is Sanity-wired.

**D. Incomplete functionality:**
1. Component is **not rendered in App.jsx** — not imported anywhere.
2. `portfolioItem.category` is a plain string, not a reference to `portfolioCategory`. Must match label exactly.
3. No additional media beyond cover image (website only shows one image per item).
4. `coverImage` query uses `coalesce(coverImageUrl, coverImage.asset->url)` — external URL takes priority over Sanity asset, which may not be the desired behavior.

**E. Recommended structure:** Current structure is adequate. Consider making `category` a reference to `portfolioCategory` for integrity.

**F. Implementation dependencies:** Import and render `Portfolio` in `App.jsx`. Consider reference for category.

---

### 5.11 Gallery

**A. Existing website content:** Section title, intro text, 6 filter categories, 9 gallery items (each with title, category, description, cover image, date, location, mediaType), view more link, lightbox content.

**B. Current Sanity coverage:** `gallerySectionType` with sectionTitle, intro, categories[] (references), viewMoreLink, viewMoreLabel. `galleryCategoryType` with order + label. `galleryItemType` with order, title, category (string), description, coverImage, coverImageUrl, coverAlt, date, location, mediaType. Queries exist.

**C. Missing content:** None at schema level.

**D. Incomplete functionality:**
1. Component is **not rendered in App.jsx** — not imported anywhere.
2. `galleryItem.category` is a plain string, not a reference to `galleryCategory`.
3. Only cover image supported — no additional media items per gallery item.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** Import and render `Gallery` in `App.jsx`.

---

### 5.12 Team

**A. Existing website content:** Section title, intro text, group photo (background image), group photo title, group photo description.

**B. Current Sanity coverage:** `teamSectionType` with sectionTitle, intro, groupPhoto, groupPhotoTitle, groupPhotoDescription. `teamMemberType` exists but is reserved (not rendered). `teamQuery` exists.

**C. Missing content:** None for current rendering (group photo only).

**D. Incomplete functionality:** `teamMember` collection exists but no members are rendered. Group photo is decorative background (no alt rendered).

**E. Recommended structure:** Current structure is adequate for group photo. `teamMember` reserved for future.

**F. Implementation dependencies:** None — already complete for current rendering.

---

### 5.13 Partnerships

**A. Existing website content:** Badge label, section title, intro text, 14 partners (name, logo image, logo alt, URL), 1 partnership type (title, description, features[], iconKey, color, accent), action button label.

**B. Current Sanity coverage:** `partnershipSectionType` with badgeLabel, sectionTitle, intro, partners[] (embedded objects with order, name, logo, logoAlt, url), partnershipTypes[] (embedded objects), actionButtonLabel. `partnerType` collection exists separately. `partnershipSectionQuery` does NOT include `partnershipTypes[]`. `partnersQuery` queries partner collection but component uses embedded partners[].

**C. Missing content:** None at schema level — all fields exist.

**D. Incomplete functionality:**
1. `partnershipSectionQuery` omits `partnershipTypes[]`, so `section.partnershipTypes` is always undefined → always falls back to `fallbackPartnershipTypes`. The CMS-editable partnership types are never used.
2. Partners are embedded in `partnershipSection.partners[]` AND exist as separate `partner` collection docs — duplication. The component reads embedded objects, not the collection.
3. Partner logos in `partners[]` embedded objects have no `coverImageUrl` external URL option (only Sanity image). The `partnerType` collection doc also only has Sanity image, no external URL option.

**E. Recommended structure:** Either use embedded partners[] consistently (add to query) OR use references to `partner` collection docs. Add `partnershipTypes[]` to `partnershipSectionQuery`. Add external URL option for partner logos.

**F. Implementation dependencies:** Fix `partnershipSectionQuery` to include `partnershipTypes[]`. Decide on embedded vs. reference pattern for partners. Add external URL field for partner logos.

---

### 5.14 Get In Touch

**A. Existing website content:** Section title, intro text, 3 contact details (Location, Email, Phone with links), socials heading, 4 socials (Instagram, Facebook, TikTok, LinkedIn), CTA title, CTA description, consultation URL, Book Now label, Call URL, Call label, CTA note.

**B. Current Sanity coverage:** `getInTouchType` with all fields. `contactDetailType` with order, title, content, link, linkText, external, iconKey. `socialLinkType` with platform, handle, url, iconClass, color. `getInTouchQuery` projects all fields.

**C. Missing content:** None.

**D. Incomplete functionality:** None. Footer has separate socials list (includes YouTube). GetInTouch socials does not include YouTube — this is intentional per design.

**E. Recommended structure:** Current structure is adequate.

**F. Implementation dependencies:** None — already complete.

---

### 5.15 Footer

**A. Existing website content:** Logo image, logo alt, 4 socials (Instagram, YouTube, TikTok, Facebook), privacy link path, privacy link label, copyright text.

**B. Current Sanity coverage:** `footerType` with logo, logoAlt, socials[] (platform, url, iconClass, color), privacyLink, privacyLabel, copyrightText. `footerQuery` projects all fields. `Footer.jsx` uses `useSanityData` with `fallbackFooter`.

**C. Missing content:** None.

**D. Incomplete functionality:** Footer logo is separate from siteSettings logo and header logo — duplication of brand asset across 3 documents.

**E. Recommended structure:** Consider sharing logo via siteSettings reference, or accept duplication for independence.

**F. Implementation dependencies:** None — already complete.

---

### 5.16 Privacy Policy

**A. Existing website content:** Back to Home label, eyebrow, page title, effective date, last updated, policy body (48 Portable Text blocks), contact block (brand name, email, phone, website).

**B. Current Sanity coverage:** `privacyPolicyType` with backToHomeLabel, eyebrow, title, effectiveDate, lastUpdated, body (Portable Text blocks). `privacyPolicyQuery` projects all fields. `PrivacyPolicy.jsx` uses `useSanityData` with `fallbackPrivacyPolicy`.

**C. Missing content:** Contact block phone ("0715130028") and website ("www.princehousefilms.com") are hardcoded in component, not from siteSettings.

**D. Incomplete functionality:**
1. Phone and website hardcoded in PrivacyPolicy.jsx:91-92.
2. `@portabletext/react` is installed but custom serializers are used — this is fine.

**E. Recommended structure:** Pull phone and website from siteSettings for consistency. Or keep hardcoded if intentional divergence (CONTENT_MAP.md notes this is a content decision).

**F. Implementation dependencies:** Optionally update PrivacyPolicy.jsx to read phone/website from siteSettings.

---

### 5.17 Error Boundary

**A. Existing website content:** Fallback text "Couldn't load this media. Try another item."

**B. Current Sanity coverage:** `errorBoundaryType` with fallbackText. `errorBoundaryQuery` exists.

**C. Missing content:** None at schema level.

**D. Incomplete functionality:** `ErrorBoundary.jsx` is a **class component** that cannot use hooks. The `fallbackText` from CMS is **never consumed** — the text is hardcoded at line 25. The query exists but is not used by any component.

**E. Recommended structure:** Refactor ErrorBoundary to functional component with hooks, OR pass fallbackText as prop from parent.

**F. Implementation dependencies:** Refactor ErrorBoundary to consume `errorBoundary.fallbackText` via context or prop.

---

### 5.18 ScrollToTop

**A. Existing website content:** None (renders null).

**B. Current Sanity coverage:** None needed.

**C. Missing content:** None.

**D. Incomplete functionality:** None.

---

### 5.19 MediaEmbed

**A. Existing website content:** None — utility component that renders media items passed as props.

**B. Current Sanity coverage:** Supports `sanity_image`, `external_image`, `external_video` types. Uses `urlFor`, `getVideoProvider`, `getVideoEmbedUrl`, `getVideoThumbnail`.

**C. Missing content:** Does not support uploaded video file type (only videoUrl external).

**D. Incomplete functionality:** Direct video URLs (mp4) are rendered as `<video>` without poster/thumbnail support. No video thumbnail field in mediaItem.

**E. Recommended structure:** Add `posterImage` or `thumbnail` field to mediaItem for video thumbnails. Support uploaded video file type.

**F. Implementation dependencies:** Schema change to mediaItemType, component change to MediaEmbed.

---

## 6. Media Architecture Assessment

### 6.1 Current Media Support Matrix

| Media Type | Uploaded File | External URL | Schema Support | Frontend Render |
|------------|--------------|--------------|----------------|-----------------|
| Image (Sanity asset) | ✅ | ❌ | `image` type in multiple schemas | `urlFor()` + `` |
| Image (external URL) | ❌ | ✅ | `coverImageUrl`, `imageUrl` (url type) | Direct `src={url}` |
| Video (direct file URL) | ❌ | ✅ | `backgroundVideoUrl`, `videoUrl` (url type) | `<video src>` or `<iframe>` |
| Video (YouTube) | ❌ | ✅ | `videoUrl` (url type) | `getVideoEmbedUrl()` + `<iframe>` |
| Video (Vimeo) | ❌ | ✅ | `videoUrl` (url type) | `getVideoEmbedUrl()` + `<iframe>` |
| Video (uploaded file) | ❌ | ❌ | **NOT SUPPORTED** | N/A |
| Video thumbnail/poster | ❌ | ❌ | **NOT SUPPORTED** | N/A |
| Background image | ✅ | ❌ | `backgroundImage` (image type) | CSS `backgroundImage` |
| Background video | ❌ | ✅ | `backgroundVideoUrl` (url type) | `<video src>` or CSS bg |

### 6.2 Media Format Gaps

**P0 — Critical:**
1. **No uploaded video file support:** The `mediaItem` object and all image/video fields only support Sanity image uploads or external URLs. There is no `file` type for uploaded videos. The website displays videos (hero background, service media items) but owners cannot upload video files to Sanity.

2. **No video thumbnail/poster support:** Videos displayed in MediaEmbed (YouTube/Vimeo/direct) have no poster/thumbnail field. YouTube/Vimeo thumbnails are auto-generated, but direct video URLs have no thumbnail.

**P1 — High:**
3. **Partner logos lack external URL option:** `partnerType.logo` is image-only (no `logoUrl` external). `partnershipSection.partners[].logo` is also image-only.

4. **Portfolio/Gallery items lack additional media:** Only `coverImage`/`coverImageUrl` supported. Website shows one image per item but the architecture should support multiple images/videos per project.

5. **Service media items lack thumbnail/poster:** `mediaItem` has no poster image for videos.

### 6.3 Reusable Media Architecture

The existing `mediaItem` object is a good start but incomplete. Recommended extension:

```
mediaItem (object):
  type: "image" | "video" | "embed"
  title: string
  // Image options
  image: image (Sanity asset)
  imageUrl: url (external)
  imageAlt: string
  // Video options
  videoFile: file (Sanity video upload)  [MISSING]
  videoUrl: url (external YouTube/Vimeo/direct)
  videoPoster: image (Sanity) | videoPosterUrl: url
  videoAlt: string
  // Common
  externalUrl: url (redirect/link)
  order: number
```

### 6.4 URL Validation

- `mediaUtils.js` provides `getVideoProvider()` (YouTube, Vimeo, direct), `getVideoEmbedUrl()`, `getVideoThumbnail()` — good foundation.
- No URL validation on schema fields beyond Sanity's built-in `url` type validation.
- Frontend correctly distinguishes YouTube/Vimeo/direct video providers.

---

## 7. Services Detailed Assessment

### 7.1 Services Inventory from Fallback/Seed

The `fallbackServicesSection` only provides section title. The actual service cards come from Sanity `service` docs (seeded in `seedSanity.js`). The seed references 4 named services (`service-creative`, `service-motion`, `service-graphic`, `service-event`) plus 4 UUID-only services (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) that were "edited directly in Sanity Studio after the initial seed" and are NOT in the seed script.

**Services coverage matrix:**

| Category | Service | Website Content | Existing Sanity Fields | Missing Content | Missing Media | Required Changes |
|----------|---------|-----------------|----------------------|-----------------|---------------|-----------------|
| (uncategorized) | Creative Content | title, text, icon="pen", featured, backgroundType, backgroundVideoUrl (GIF), mediaItems[] | All serviceType fields | None | creativeContent.gif (local fallback) | None |
| (uncategorized) | Motion Graphics | title, text, icon="video", featured, backgroundType, backgroundVideoUrl (GIF), mediaItems[] | All serviceType fields | None | motion.gif (local fallback) | None |
| (uncategorized) | Graphic Design | title, text, icon="palette", featured, background*, mediaItems[] | All serviceType fields | None | None | None |
| (uncategorized) | Event Coverage | title, text, icon="slideshow", featured, background*, mediaItems[] | All serviceType fields | None | None | None |
| Hotels & Resorts | (UUID doc) | Edited in Studio, not in seed | All serviceType fields | None | None | None |
| Real Estate | (UUID doc) | Edited in Studio, not in seed | All serviceType fields | None | None | None |
| Events | (UUID doc) | Edited in Studio, not in seed | All serviceType fields | None | None | None |
| Retail & Shopping Malls | (UUID doc) | Edited in Studio, not in seed | All serviceType fields | None | None | None |

**Notes:**
- The website does not display service categories — services are shown as a flat bento grid.
- `localFallbackKey` is a developer hint field, not content.
- Service modal media items use `mediaItem` object type.
- Section title comes from separate `servicesSection` document.

### 7.2 Missing from Website vs. Sanity

The 4 UUID-only services exist in Sanity Studio (edited directly) but are not in the seed script. If the dataset is reset, they would be lost. The seed script explicitly excludes them (seedSanity.js:16-23).

---

## 8. Portfolio Detailed Assessment

### 8.1 Portfolio Categories (6)

| Order | Label | CMS Doc | Seed ID |
|-------|-------|---------|---------|
| 1 | All Projects | portfolioCategory | portfolioCategory-all |
| 2 | Commercial | portfolioCategory | portfolioCategory-commercial |
| 3 | Documentary | portfolioCategory | portfolioCategory-documentary |
| 4 | Corporate | portfolioCategory | portfolioCategory-corporate |
| 5 | Social Media | portfolioCategory | portfolioCategory-social |
| 6 | Events | portfolioCategory | portfolioCategory-events |

### 8.2 Portfolio Projects (6)

| # | Title | Category | Thumbnail (coverImageUrl) | Additional Images | Videos | Links | CMS Coverage |
|---|-------|----------|---------------------------|-------------------|--------|-------|-------------|
| 1 | Wildlife Conservation Documentary | documentary | unsplash photo-1550358864 | None | None | Watch Film (/project/1) | Complete |
| 2 | Tech Startup Brand Film | commercial | unsplash photo-1552664730 | None | None | Watch Film (/project/2) | Complete |
| 3 | Music Festival Coverage | events | unsplash photo-1470225620 | None | None | Watch Film (/project/3) | Complete |
| 4 | Corporate Training Series | corporate | unsplash photo-1556761175 | None | None | Watch Film (/project/4) | Complete |
| 5 | Social Media Campaign | social | pexels photo-147413 | None | None | Watch Film (/project/5) | Complete |
| 6 | Product Launch Film | commercial | unsplash photo-1489824904 | None | None | Watch Film (/project/6) | Complete |

**Portfolio matrix:**

| Category | Portfolio Item | Thumbnail | Additional Images | Videos | Links | Existing Sanity Coverage | Missing Elements |
|----------|---------------|-----------|-------------------|--------|-------|-------------------------|------------------|
| All Projects | Wildlife Conservation Documentary | coverImageUrl (Unsplash) | None | None | Watch Film | Complete (portfolioItemType) | None |
| All Projects | Tech Startup Brand Film | coverImageUrl (Unsplash) | None | None | Watch Film | Complete | None |
| All Projects | Music Festival Coverage | coverImageUrl (Unsplash) | None | None | Watch Film | Complete | None |
| All Projects | Corporate Training Series | coverImageUrl (Unsplash) | None | None | Watch Film | Complete | None |
| All Projects | Social Media Campaign | coverImageUrl (Pexels) | None | None | Watch Film | Complete | None |
| All Projects | Product Launch Film | coverImageUrl (Unsplash) | None | None | Watch Film | Complete | None |

**Gaps:**
1. Component not rendered in App.jsx.
2. `category` is a string, not a reference to `portfolioCategory`.
3. No additional images or videos per project — only one cover image.
4. No external media URL field beyond coverImageUrl.
5. `watchCtaLabel` exists but no `watchUrl` field — the modal links to `/project/{id}` (structural route).

---

## 9. Partnerships Detailed Assessment

### 9.1 Partners (14)

| # | Partner Name | Logo File | Alt Text | Partner URL | CMS Doc |
|---|-------------|-----------|----------|-------------|---------|
| 1 | Coca Cola | cocacola.jpeg | Coca Cola logo | null | partnerType + embedded |
| 2 | Darling | darling.png | Darling logo | null | partnerType + embedded |
| 3 | Delish | delish.png | Delish logo | null | partnerType + embedded |
| 4 | Dr. Mattress | drmatress.png | Dr. Mattress logo | null | partnerType + embedded |
| 5 | EABL | eabl.jpeg/eabl.png | EABL logo | null | partnerType + embedded |
| 6 | Furniture Place | furnitureplace.png | Furniture Place logo | null | partnerType + embedded |
| 7 | LC Waikiki | lcwaikiki.png | LC Waikiki logo | null | partnerType + embedded |
| 8 | Mega Growth | megagrowth.png | Mega Growth logo | null | partnerType + embedded |
| 9 | Orient | orient.png | Orient logo | null | partnerType + embedded |
| 10 | Prestige | prestige.png | Prestige logo | null | partnerType + embedded |
| 11 | Sarit | sarit.png | Sarit logo | null | partnerType + embedded |
| 12 | Titi | titi.png | Titi logo | null | partnerType + embedded |
| 13 | Two Rivers | tworivers.png | Two Rivers logo | null | partnerType + embedded |
| 14 | V Spa | vspa.png | V Spa logo | null | partnerType + embedded |

**Partner coverage matrix:**

| Partner | Name | Logo (Sanity) | Logo (External URL) | Description | Website URL | Social Links | Ordering | CMS Coverage |
|---------|------|---------------|---------------------|-------------|-------------|--------------|----------|-------------|
| Coca Cola | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=1) | Partial |
| Darling | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=2) | Partial |
| Delish | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=3) | Partial |
| Dr. Mattress | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=4) | Partial |
| EABL | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=5) | Partial |
| Furniture Place | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=6) | Partial |
| LC Waikiki | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=7) | Partial |
| Mega Growth | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=8) | Partial |
| Orient | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=9) | Partial |
| Prestige | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=10) | Partial |
| Sarit | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=11) | Partial |
| Titi | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=12) | Partial |
| Two Rivers | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=13) | Partial |
| V Spa | ✅ | ✅ (embedded only) | ❌ | ❌ | ❌ | ❌ | ✅ (order=14) | Partial |

**Gaps:**
1. Partners are embedded in `partnershipSection.partners[]` AND exist as separate `partner` collection docs — duplication.
2. `partnershipSectionQuery` does not include `partnershipTypes[]` — CMS-editable partnership types never used.
3. Partner logos have no external URL option (image-only).
4. No partner description, description, or social links.
5. `partnersQuery` queries the collection but the component reads embedded objects — the collection query is unused.

---

## 10. Links and Navigation Assessment

### 10.1 Link Architecture

Current link handling is inconsistent across the codebase:

| Context | Link Type | CMS Field | Component Handling |
|---------|-----------|-----------|-------------------|
| Header nav | Internal path | `header.navLinks[].path` (string) | `href={item.path}`, click handler for scroll |
| About CTA | Internal anchor | `about.ctaLink` (string) | `href={data.ctaLink}` |
| Footer privacy | Internal path | `footer.privacyLink` (string) | `<Link to={data.privacyLink}>` |
| Hero CTA | Internal anchor | `hero.ctaLink` (string) | `href={hero.ctaLink}` |
| Contact cards | mailto/tel/https | `contactDetails[].link` (string) | `href={info.link}`, target based on `external` |
| GetInTouch CTA | https/tel | `consultationUrl`, `callUrl` (string) | `href` with target="_blank" |
| Social links | https | `socials[].url` (url) | `href={social.url}`, target="_blank" |
| ServiceModal Instagram | https | `siteSettings.instagramUrl` (url) | `href` with target="_blank" |
| Partner URL | https | `partners[].url` (url) | Not used (component doesn't render partner URL) |
| Gallery view more | Internal path | `gallerySection.viewMoreLink` (string) | `href={section.viewMoreLink}` |
| Gallery watch video | Internal route | HARDCODED `/watch/{id}` | Not CMS |
| Portfolio project | Internal route | HARDCODED `/project/{id}` | Not CMS |

### 10.2 Link Feature Gaps

| Feature | Supported? | Notes |
|---------|-----------|-------|
| Link text | ✅ | Most link objects have label/text field |
| Destination URL | ✅ | url or path string fields |
| Internal vs external | Partial | `contactDetail.external` boolean exists; nav links assume internal |
| Open in new tab | Partial | `externalLink.openInNewTab` exists but not used in schemas that use it; `contactDetail.external` used for target |
| Security attributes | Partial | Footer uses `rel="noopener noreferrer"`; GetInTouch uses conditional rel |
| Accessibility labels | Partial | Header has menu ARIA; no link-level aria-label |
| Tracking attributes | ❌ | None |

### 10.3 Hardcoded Links That Should Be CMS-Managed

| Link | Component | Line | Current Status |
|------|-----------|------|---------------|
| `/watch/{id}` | Gallery.jsx | 198 | Hardcoded structural route |
| `/project/{id}` | Portfolio.jsx | 276 | Hardcoded structural route |
| `tel:+254715130028` | GetInTouch.jsx | 156 | CMS (`callUrl`) |
| `mailto:info@princehousefilms.com` | GetInTouch.jsx | 30 | CMS (`contactDetails[].link`) |
| `"0715130028"` (display only) | PrivacyPolicy.jsx | 91 | Hardcoded, not from CMS |
| `"www.princehousefilms.com"` | PrivacyPolicy.jsx | 92 | Hardcoded, not from CMS |

---

## 11. Content Relationships and CMS Usability

### 11.1 Document Organization

| Document Type | Standalone | Embedded | Referenced |
|--------------|-----------|----------|------------|
| siteSettings | ✅ | — | — |
| header | ✅ | navLinks[] (embedded objects) | — |
| preloader | ✅ | loadingDetails[] (embedded) | — |
| hero | ✅ | — | — |
| about | ✅ | — | — |
| approach | ✅ | steps[] (embedded), showcase[] (embedded) | — |
| objectives | ✅ | vision (embedded), mission (embedded), values[] (embedded) | — |
| counts | ✅ | stats[] (embedded), achievements[] (embedded) | — |
| whyUs | ✅ | reasons[] (embedded), comparison items (embedded), footerStats[] (embedded) | — |
| servicesSection | ✅ | — | — |
| service | ✅ | mediaItems[] (embedded mediaItem objects) | — |
| portfolioSection | ✅ | categories[] (references to portfolioCategory) | — |
| portfolioCategory | ✅ | — | — |
| portfolioItem | ✅ | — | — |
| gallerySection | ✅ | categories[] (references to galleryCategory) | — |
| galleryCategory | ✅ | — | — |
| galleryItem | ✅ | — | — |
| teamSection | ✅ | — | — |
| teamMember | ✅ | — | (reserved, not used) |
| partnershipSection | ✅ | partners[] (embedded), partnershipTypes[] (embedded) | — |
| partner | ✅ | — | — |
| getInTouch | ✅ | contactDetails[] (references to contactDetail), socials[] (embedded socialLink objects) | — |
| contactDetail | ✅ | — | — |
| footer | ✅ | socials[] (embedded socialLink objects) | — |
| privacyPolicy | ✅ | body (Portable Text blocks) | — |
| errorBoundary | ✅ | — | — |

### 11.2 Duplication Issues

1. **Brand logo:** Exists in `siteSettings.logo`, `header.logo`, `preloader.logo`, `footer.logo` — 4 separate fields for the same brand asset.
2. **Brand name:** Exists in `siteSettings.brandName`, used in footer copyright and PrivacyPolicy.
3. **Contact info:** Email/phone/address in `siteSettings`, also referenced in PrivacyPolicy contact block.
4. **Social links:** Footer has separate `socials[]` from GetInTouch `socials[]` (different platforms).
5. **Partners:** Exist both as embedded objects in `partnershipSection.partners[]` AND as separate `partner` collection docs.
6. **Instagram URL:** In `siteSettings.instagramUrl` and referenced by ServiceModal.

### 11.3 References vs. Embedded Objects

| Pattern | Use Case | Assessment |
|---------|----------|------------|
| Embedded objects | Nav links, loading details, steps, values, stats, reasons, media items, social links | ✅ Appropriate — these are section-specific and don't need independent management |
| References | Portfolio categories, gallery categories, contact details | ✅ Appropriate — these are reusable across sections |
| Embedded (should be references) | Partners in partnershipSection | ⚠️ Partners also exist as standalone docs — duplication risk |
| Embedded (should be references) | Partnership types | ⚠️ Only one type, but embedded prevents reuse |
| Separate collection (unused) | teamMember | ✅ Reserved for future, appropriate |
| Separate collection (unused by component) | partner | ⚠️ Component uses embedded partners[], not the collection |

### 11.4 CMS Usability for Non-Technical Admin

**Strengths:**
- Custom Studio desk structure with "Page Sections" and "Collections" grouping
- Deterministic document IDs for singletons
- `order` fields on all collections for manual ordering
- `initialValue` set to current hardcoded values (editor sees familiar content)
- Field groups (content, media, links, styleToggles) organize the editing experience
- Validation rules on required fields
- Preview configurations on collection documents

**Weaknesses:**
- `errorBoundary.fallbackText` stored but not consumed (class component limitation)
- `partnershipSectionQuery` missing `partnershipTypes[]`
- `Counts.jsx` uses `stat.key` but query returns `order`
- Partners duplicated between embedded objects and collection
- 6 sections not rendered in App.jsx despite having full Sanity support
- No video upload support (file type missing)

---

## 12. Frontend and Sanity Integration Assessment

### 12.1 Data Flow Categories

| Category | Sections | Components |
|----------|----------|------------|
| 1. Content not available in Sanity | None | — |
| 2. Content in Sanity but not queried | Partnership types | `partnershipSectionQuery` omits `partnershipTypes[]` |
| 3. Content queried but not rendered | `errorBoundary.fallbackText` | `ErrorBoundary.jsx` class component can't use hooks |
| 4. Content rendered from local fallback | All sections (when Sanity unavailable) | All `useSanityData` consumers |
| 5. Genuinely CMS-driven | Hero, Services, Header, Preloader, About, Team, GetInTouch, Footer, PrivacyPolicy | Components using Sanity data |

### 12.2 Query Completeness Issues

| Query | Missing Fields | Impact |
|-------|---------------|--------|
| `partnershipSectionQuery` | `partnershipTypes[]` | Partnership type cards always use fallback, never CMS data |
| `countsQuery` | None missing, but component uses `stat.key` which isn't projected | Counter animation keyed by undefined |
| `partnersQuery` | None | Component doesn't use it (reads embedded partners[] instead) |
| `partnershipTypesQuery` | None | Redundant — not used by any component |

### 12.3 Render Issues

| Component | Data Source | Issue |
|-----------|-------------|-------|
| `Hero.jsx` | Prop from App.jsx + local fallbackHero | Dual data source; local fallback bypasses `useSanityData` pattern |
| `Services.jsx` | Prop from App.jsx + `useSanityData(servicesSectionQuery)` | Two queries for one section |
| `Partnership.jsx` | `useSanityData(partnershipSectionQuery)` | `section.partnershipTypes` undefined → always fallback |
| `ErrorBoundary.jsx` | None (hardcoded) | CMS `errorBoundary.fallbackText` never used |
| `Counts.jsx` | `useSanityData(countsQuery)` | `stat.key` undefined → counter keys fail |

### 12.4 Silent Fallbacks

Every `useSanityData` consumer falls back to hardcoded constants when Sanity returns null/undefined/error. This means:
- If Sanity is down, the site still works (good for resilience)
- But it masks missing CMS content — the owner may not realize content isn't being managed
- The fallback values are the "source of truth" for 7 of 9 rendered sections

---

## 13. Consolidated Gap Register

| ID | Priority | Section | Component | Missing/Incomplete Element | Current Implementation | Required Solution | Affected Files |
|----|----------|---------|-----------|---------------------------|----------------------|-------------------|-----------------|
| G01 | P0 | Services | Services.jsx / MediaEmbed.jsx | No uploaded video file support — only videoUrl external URLs | `mediaItem.videoUrl` is url type only; no `file` type | Add `videoFile` (file type) to `mediaItem` object; update MediaEmbed to render Sanity video assets | `studio/schemaTypes/mediaItemType.ts`, `src/components/MediaEmbed.jsx` |
| G02 | P0 | Video | MediaEmbed.jsx | No video thumbnail/poster support | No poster field; YouTube/Vimeo thumbnails auto-generated; direct video has no thumbnail | Add `videoPoster` (image) or `videoPosterUrl` (url) to `mediaItem`; update MediaEmbed to use poster | `studio/schemaTypes/mediaItemType.ts`, `src/components/MediaEmbed.jsx` |
| G03 | P0 | Partnerships | Partnership.jsx | `partnershipTypes[]` not queried — CMS-editable partnership types never used | `partnershipSectionQuery` returns only badgeLabel, sectionTitle, intro, actionButtonLabel | Add `types[]{order,title,description,features[],iconKey,color,accent}` to `partnershipSectionQuery` | `src/lib/queries.js` |
| G04 | P0 | Error Boundary | ErrorBoundary.jsx | `errorBoundary.fallbackText` stored in CMS but never consumed | Class component renders hardcoded "Couldn't load this media. Try another item." | Refactor ErrorBoundary to functional component or pass fallbackText as prop | `src/components/ErrorBoundary.jsx` |
| G05 | P0 | Counts | Counts.jsx | `stat.key` referenced but query returns `order` — counter animation keys are undefined | `counts[stat.key]` is always undefined | Use `stat._key` or `stat.order` as the counter key; ensure query projects `_key` | `src/components/Counts.jsx`, `src/lib/queries.js` |
| G06 | P1 | Portfolio | Portfolio.jsx | Component not rendered — not imported in App.jsx | Portfolio component exists with full Sanity wiring but is invisible | Import and render `Portfolio` in `App.jsx` | `src/App.jsx` |
| G07 | P1 | Gallery | Gallery.jsx | Component not rendered — not imported in App.jsx | Gallery component exists with full Sanity wiring but is invisible | Import and render `Gallery` in `App.jsx` | `src/App.jsx` |
| G08 | P1 | Objectives | Objectives.jsx | Component not rendered — not imported in App.jsx | Objectives component exists with full Sanity wiring but is invisible | Import and render `Objectives` in `App.jsx` | `src/App.jsx` |
| G09 | P1 | Counts | Counts.jsx | Component not rendered — not imported in App.jsx | Counts component exists with full Sanity wiring but is invisible | Import and render `Counts` in `App.jsx` | `src/App.jsx` |
| G10 | P1 | Approach | Approach.jsx | Component not rendered — not imported in App.jsx | Approach component exists with full Sanity wiring but is invisible | Import and render `Approach` in `App.jsx` | `src/App.jsx` |
| G11 | P1 | WhyUs | WhyUs.jsx | Component not rendered — not imported in App.jsx | WhyUs component exists with full Sanity wiring but is invisible | Import and render `WhyUs` in `App.jsx` | `src/App.jsx` |
| G12 | P1 | Partnerships | partnershipSectionType / partnerType | Partners duplicated: embedded in partnershipSection AND separate partner collection; component reads embedded, collection unused | `partners[]` embedded objects + separate `partner` collection docs with same data | Decide: use embedded consistently (add to query) OR use references to `partner` collection. Add external URL option for partner logos. | `studio/schemaTypes/partnershipSectionType.ts`, `studio/schemaTypes/partnerType.ts`, `src/lib/queries.js`, `src/components/Partnership/Partnership.jsx` |
| G13 | P1 | Partnerships | partnershipSectionQuery | Query omits `partnershipTypes[]` | See G03 | See G03 | `src/lib/queries.js` |
| G14 | P1 | Media | mediaItemType | No external URL option for partner logos in `partners[]` embedded objects | `partnerItem.logo` is image-only | Add `logoUrl` (url) to partnerItem embedded object | `studio/schemaTypes/partnershipSectionType.ts` |
| G15 | P1 | Portfolio | Portfolio.jsx | Component not rendered; category is string not reference | `portfolioItem.category` is plain string | Consider making `category` a reference to `portfolioCategory` for integrity | `studio/schemaTypes/portfolioItemType.ts` |
| G16 | P1 | Gallery | Gallery.jsx | Component not rendered; category is string not reference | `galleryItem.category` is plain string | Consider making `category` a reference to `galleryCategory` | `studio/schemaTypes/galleryItemType.ts` |
| G17 | P2 | Brand | siteSettings/header/preloader/footer | Logo duplicated across 4 documents | `siteSettings.logo`, `header.logo`, `preloader.logo`, `footer.logo` | Consider sharing logo via siteSettings reference or accept duplication | `studio/schemaTypes/` |
| G18 | P2 | Privacy Policy | PrivacyPolicy.jsx | Phone ("0715130028") and website hardcoded | Lines 91-92 hardcoded | Pull from siteSettings or document as intentional divergence | `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` |
| G19 | P2 | Services | Services.jsx | `localFallbackKey` title-matching is fragile | Lines 48-53 match title to fallback key | Encourage editors to set `localFallbackKey` explicitly; remove title-matching fallback | `src/components/Services/Services.jsx` |
| G20 | P2 | Hero | Hero.jsx | Dual data source (App.jsx prop + local fallbackHero) | Local `fallbackHero` at lines 5-13 bypasses `useSanityData` | Move to `useSanityData` pattern or document intentional dual source | `src/components/Hero/Hero.jsx` |
| G21 | P2 | Media | mediaItemType | No `poster`/`thumbnail` for images in media items | No thumbnail field | Add optional thumbnail field to mediaItem | `studio/schemaTypes/mediaItemType.ts` |
| G22 | P2 | Services | Services.jsx | Two queries for one section | `servicesQuery` (items) + `servicesSectionQuery` (title) | Acceptable pattern, or merge into one query | `src/App.jsx`, `src/components/Services/Services.jsx` |
| G23 | P2 | Portfolio | portfolioItemType | No additional media beyond cover image | Only `coverImage`/`coverImageUrl` | Add `mediaItems[]` array for multiple images/videos per project | `studio/schemaTypes/portfolioItemType.ts` |
| G24 | P2 | Gallery | galleryItemType | No additional media beyond cover image | Only `coverImage`/`coverImageUrl` | Add `mediaItems[]` array for multiple images/videos per gallery item | `studio/schemaTypes/galleryItemType.ts` |
| G25 | P2 | Links | Multiple | No consistent link object with openInNewTab, security attrs | Links are scattered strings across schemas | Create reusable `link` object type with url, label, openInNewTab, rel | `studio/schemaTypes/linkType.ts` (new) |
| G26 | P2 | SEO | public/index.html | SEO meta is static HTML, not from Sanity | `siteSettings.seo` exists but deferred | Defer to separate phase (React Helmet) | — |
| G27 | P3 | Team | teamSectionType | `teamMember` collection reserved but unused | No members rendered | Document as future feature; no action needed | — |
| G28 | P3 | Preloader | Preloader.jsx | `WildNowLogovideo.mp4` file existence unverified | `backgroundVideoUrl` references `/assets/img/WildNowLogovideo.mp4` | Verify file exists; if missing, document as unverified | — |
| G29 | P3 | Portfolio | portfolioItemType | `coverImageUrl` takes priority over `coverImage` in query | `coalesce(coverImageUrl, coverImage.asset->url)` | Review coalesce order — Sanity asset should likely take priority | `src/lib/queries.js` |
| G30 | P3 | Gallery | galleryItemType | `coverImageUrl` takes priority over `coverImage` in query | Same coalesce pattern | Review coalesce order | `src/lib/queries.js` |
| G31 | P3 | Links | Header | Nav links have no `openInNewTab` option | All nav links are internal | Add `openInNewTab` boolean for future external nav links | `studio/schemaTypes/headerType.ts` |
| G32 | P3 | Media | mediaItemType | No `alt` text field for media items | No alt field | Add `alt` string field for accessibility | `studio/schemaTypes/mediaItemType.ts` |

**Gap summary by priority:**
- P0 (Critical): 5 (G01-G05)
- P1 (High): 8 (G06-G13, G15-G16)
- P2 (Medium): 10 (G17-G22, G24-G25, G29-G30)
- P3 (Low): 6 (G23, G26-G28, G31-G32)

**Total: 29 gaps**

---

## 14. Proposed Complete Sanity Content Architecture

### 14.1 Document Types (Keep Existing)

All 37 existing document types should be retained with the following modifications:

### 14.2 Modified Document Types

#### mediaItem (object) — EXTEND

**Purpose:** Reusable media object for service media items, portfolio/gallery additional media.

**New fields to add:**
| Field | Type | Required | Multi | Purpose |
|-------|------|----------|-------|---------|
| `videoFile` | file | No | No | Uploaded video file (Sanity asset) |
| `videoPoster` | image | No | No | Poster/thumbnail for video |
| `videoPosterUrl` | url | No | No | External poster URL |
| `alt` | string | No | No | Alt text for accessibility |
| `duration` | string | No | No | Video duration display |

**Keep existing:** type, title, image, imageUrl, videoUrl, externalUrl.

#### partnerItem (embedded object in partnershipSection) — EXTEND

**New field:**
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `logoUrl` | url | No | External logo URL alternative to Sanity image |

#### partnerType (document) — EXTEND

**New field:**
| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `logoUrl` | url | No | External logo URL alternative |

### 14.3 New Document Types

None strictly required — all sections already have document types. The gap is in component rendering (6 sections not mounted), not schema absence.

### 14.4 New Object Types

#### link (object) — NEW (optional, P2)

**Purpose:** Reusable link object with consistent handling.

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `label` | string | Yes | Link text |
| `url` | url | Yes | Destination URL |
| `openInNewTab` | boolean | No | Open in new tab |
| `rel` | string | No | Security attributes (noopener, noreferrer) |
| `type` | string | No | "internal" \| "external" \| "email" \| "tel" |

### 14.5 Reference Relationships

| Source | Field | Target | Type |
|--------|-------|--------|------|
| portfolioSection | categories[] | portfolioCategory | Reference |
| gallerySection | categories[] | galleryCategory | Reference |
| getInTouch | contactDetails[] | contactDetail | Reference |
| portfolioItem | category | portfolioCategory | Reference (recommend changing from string) |
| galleryItem | category | galleryCategory | Reference (recommend changing from string) |
| siteSettings | — | header | Reference (optional, for shared logo) |

### 14.6 Section Configuration Summary

| Section | Doc Type | Collection Docs | Embedded Objects | CMS-Driven? |
|---------|----------|-----------------|------------------|-------------|
| Header | header | — | navLinks[] | Yes |
| Preloader | preloader | — | loadingDetails[] | Yes |
| Hero | hero | — | — | Yes |
| About | about | — | — | Yes |
| Services | servicesSection + service | service | mediaItems[] | Yes |
| Objectives | objectives | — | values[] | Yes (not rendered) |
| Counts | counts | — | stats[], achievements[] | Yes (not rendered) |
| Approach | approach | — | steps[], showcase[] | Yes (not rendered) |
| WhyUs | whyUs | — | reasons[] | Yes (not rendered) |
| Partnership | partnershipSection + partner | partner | partners[], partnershipTypes[] | Partial (types not queried) |
| Team | teamSection | teamMember (reserved) | — | Yes |
| GetInTouch | getInTouch | contactDetail | contactDetails[], socials[] | Yes |
| Footer | footer | — | socials[] | Yes |
| Portfolio | portfolioSection + portfolioItem | portfolioCategory, portfolioItem | — | Yes (not rendered) |
| Gallery | gallerySection + galleryItem | galleryCategory, galleryItem | — | Yes (not rendered) |
| Privacy Policy | privacyPolicy | — | body (Portable Text) | Yes |
| Error Boundary | errorBoundary | — | — | Yes (not consumed) |

---

## 15. Content and Asset Migration Requirements

### 15.1 Assets to Migrate to Sanity

| Asset | Current Location | Target Sanity Field | Migration Method |
|-------|-----------------|---------------------|-----------------|
| phf_word_logo.png | src/assets/img/ | header.logo, siteSettings.logo | Upload to Sanity |
| phf_logo.png | src/assets/img/ | preloader.logo, footer.logo | Upload to Sanity |
| team.jpg | src/assets/img/ | teamSection.groupPhoto | Upload to Sanity |
| cocacola.jpeg | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| darling.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| delish.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| drmatress.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| eabl.jpeg | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| furnitureplace.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| lcwaikiki.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| megagrowth.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| orient.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| prestige.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| sarit.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| titi.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| tworivers.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| vspa.png | src/assets/img/partners/ | partner.logo / partners[].logo | Upload to Sanity |
| creativeContent.gif | src/assets/img/services/ | service.backgroundVideoUrl (external) | Already external URL in seed |
| motion.gif | src/assets/img/services/ | service.backgroundVideoUrl (external) | Already external URL in seed |

### 15.2 Content Migration

All `initialValue` fields in schemas already match current hardcoded values. The `seedSanity.js` script needs to be extended to cover:
- All singletons (siteSettings, header, preloader, about, approach, objectives, counts, whyUs, portfolioSection, gallerySection, teamSection, partnershipSection, getInTouch, footer, privacyPolicy, errorBoundary)
- All collection docs (portfolioCategories, galleryCategories, contactDetails, portfolioItems, galleryItems, partners)
- Service docs already partially seeded (4 named + 4 UUID-only)

**Existing production content risk:** The seed script uses `createOrReplace` which is safe (idempotent). The 4 UUID-only services (Hotels & Resorts, Real Estate, Events, Retail & Shopping Malls) are explicitly excluded from the seed because they were edited directly in Studio — overwriting them would lose content.

### 15.3 Seed Script Changes Required

| Addition | File | Reason |
|----------|------|--------|
| siteSettings document | scripts/seedSanity.js | Missing from seed |
| header document | scripts/seedSanity.js | Missing from seed |
| preloader document | scripts/seedSanity.js | Missing from seed |
| about document | scripts/seedSanity.js | Missing from seed |
| approach document | scripts/seedSanity.js | Missing from seed |
| objectives document | scripts/seedSanity.js | Missing from seed |
| counts document | scripts/seedSanity.js | Missing from seed |
| whyUs document | scripts/seedSanity.js | Missing from seed |
| portfolioSection document | scripts/seedSanity.js | Already seeded |
| gallerySection document | scripts/seedSanity.js | Already seeded |
| teamSection document | scripts/seedSanity.js | Already seeded |
| partnershipSection document | scripts/seedSanity.js | Already seeded (but without types[]) |
| getInTouch document | scripts/seedSanity.js | Already seeded |
| footer document | scripts/seedSanity.js | Already seeded |
| privacyPolicy document | scripts/seedSanity.js | Already seeded |
| errorBoundary document | scripts/seedSanity.js | Already seeded |
| portfolioCategories | scripts/seedSanity.js | Already seeded |
| galleryCategories | scripts/seedSanity.js | Already seeded |
| contactDetails | scripts/seedSanity.js | Already seeded |
| portfolioItems | scripts/seedSanity.js | Already seeded |
| galleryItems | scripts/seedSanity.js | Already seeded |
| partners (collection) | scripts/seedSanity.js | Already seeded (without logo images) |

---

## 16. Prioritized Implementation Roadmap

### Stage 1: Shared Schema Architecture

**Files:** `studio/schemaTypes/mediaItemType.ts` (extend), `studio/schemaTypes/linkType.ts` (new, optional)

**Changes:**
- Add `videoFile` (file), `videoPoster` (image), `videoPosterUrl` (url), `alt` (string), `duration` (string) to `mediaItem`
- Add `logoUrl` (url) to `partnerItem` embedded object and `partnerType`
- Optionally create reusable `link` object type

**Dependencies:** None
**Outcome:** Media and link architecture supports all 4 required options (uploaded image, uploaded video, image URL, video URL)
**Verification:** Schema compiles in Studio; new fields appear in editor
**Risk:** Low — additive changes only
**Existing content migration:** No (additive fields)

### Stage 2: Fix Query Gaps

**Files:** `src/lib/queries.js`

**Changes:**
- Add `types[]{order,title,description,features[],iconKey,color,accent}` to `partnershipSectionQuery`
- Project `_key` on stats array in `countsQuery`
- Review `coalesce(coverImageUrl, coverImage.asset->url)` order in portfolioItemsQuery and galleryItemsQuery

**Dependencies:** None
**Outcome:** Partnership types and stats are queried correctly
**Verification:** Query returns expected fields in Vision tool
**Risk:** Low
**Existing content migration:** No

### Stage 3: Fix Frontend Integration Bugs

**Files:** `src/components/Counts.jsx`, `src/components/ErrorBoundary.jsx`, `src/components/MediaEmbed.jsx`

**Changes:**
- Fix `Counts.jsx` to use `stat._key` or `stat.order` instead of `stat.key`
- Refactor `ErrorBoundary.jsx` to functional component OR accept `fallbackText` prop
- Update `MediaEmbed.jsx` to render `videoFile` assets and `videoPoster`

**Dependencies:** Stage 1 (mediaItem fields)
**Outcome:** CMS data is actually consumed; errors handled gracefully
**Verification:** Components render Sanity data correctly
**Risk:** Medium — ErrorBoundary refactor changes component type
**Existing content migration:** No

### Stage 4: Mount Unrendered Sections

**Files:** `src/App.jsx`

**Changes:**
- Import and render `Objectives`, `Counts`, `Approach`, `WhyUs`, `Portfolio`, `Gallery` in `App.jsx`
- Determine section order in page structure

**Dependencies:** Stage 2 (queries must be correct)
**Outcome:** All 15 sections visible on the website
**Verification:** All sections render with Sanity data or fallbacks
**Risk:** Medium — changes page layout and section order
**Existing content migration:** No

### Stage 5: Partner Architecture Decision

**Files:** `studio/schemaTypes/partnershipSectionType.ts`, `studio/schemaTypes/partnerType.ts`, `src/lib/queries.js`, `src/components/Partnership/Partnership.jsx`

**Changes:**
- Decide: embedded `partners[]` OR references to `partner` collection
- Add `partnershipTypes[]` to `partnershipSectionQuery` output used by component
- Add external URL option for partner logos

**Dependencies:** Stage 1 (logoUrl field)
**Outcome:** Partners managed consistently, no duplication
**Verification:** Partner logos render from CMS; partnership types editable
**Risk:** Medium — data model change may require content re-entry
**Existing content migration:** Yes — partner data may need to be moved from embedded to collection or vice versa

### Stage 6: Portfolio/Gallery Extended Media

**Files:** `studio/schemaTypes/portfolioItemType.ts`, `studio/schemaTypes/galleryItemType.ts`

**Changes:**
- Add `mediaItems[]` array for multiple images/videos per project/gallery item

**Dependencies:** Stage 1 (mediaItem type)
**Outcome:** Multiple media items per portfolio/gallery item
**Verification:** Additional media renders in modals/lightbox
**Risk:** Low — additive
**Existing content migration:** No

### Stage 7: Remaining Frontend Integration

**Files:** `src/components/Hero/Hero.jsx` (optional), `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` (optional)

**Changes:**
- Optionally move Hero to `useSanityData` pattern
- Optionally pull phone/website from siteSettings in PrivacyPolicy

**Dependencies:** None
**Outcome:** Consistent data flow pattern
**Risk:** Low
**Existing content migration:** No

### Stage 8: Content and Asset Migration

**Files:** `scripts/seedSanity.js`, Sanity Studio

**Changes:**
- Extend seed script with all missing singletons and collections
- Upload all local assets to Sanity
- Create all documents with deterministic IDs

**Dependencies:** Stages 1-6
**Outcome:** Sanity dataset contains all website content
**Verification:** Studio shows all documents; website renders CMS data
**Risk:** High — writing to production dataset
**Existing content migration:** Yes — backup dataset before seeding

### Stage 9: Validation and Testing

**Files:** All

**Changes:**
- Test all sections render correctly
- Verify media uploads and rendering
- Verify links work
- Test fallback behavior when Sanity unavailable

**Dependencies:** Stages 1-8
**Outcome:** Complete CMS coverage verified
**Risk:** Low

---

## 17. Testing and Acceptance Criteria

| Criterion | Verification Method |
|-----------|-------------------|
| All 15 website sections render | Navigate homepage; confirm Objectives, Counts, Approach, WhyUs, Portfolio, Gallery are visible |
| Hero content from Sanity | Change hero title in Studio; verify it appears on site |
| Services from Sanity | Add/edit service in Studio; verify it appears in bento grid |
| Partnership types from Sanity | Edit partnership type in Studio; verify it appears on site (after G03 fix) |
| Error boundary uses CMS text | Trigger media error; verify fallbackText from CMS is shown |
| Counters animate correctly | Scroll to Counts section; verify counters animate with correct keys |
| Video upload works | Upload video file to Sanity; verify it renders in MediaEmbed |
| Video poster works | Set video poster; verify it displays before play |
| Partner logos from Sanity | Upload partner logo in Studio; verify it appears in carousel |
| Portfolio renders | Confirm Portfolio section visible on homepage |
| Gallery renders | Confirm Gallery section visible on homepage |
| Fallback behavior | Disconnect Sanity; verify site renders fallback content |
| Links work | Click all nav links, social links, CTA links; verify destinations |

---

## 18. Unverified Items and Manual Verification Requirements

| Item | Status | Reason |
|------|--------|--------|
| `WildNowLogovideo.mp4` file existence | Unverified | Referenced at Preloader.jsx:327 and public path `/assets/img/WildNowLogovideo.mp4`; file not found in directory listing |
| `about.png` usage | Unverified | Asset exists at src/assets/img/about.png but not imported by any component |
| `eabl.jpeg` vs `eabl.png` duplicate | Unverified | Both files exist in partners/ directory; only eabl.jpeg imported in partnerImages.jsx |
| `portfolioData.js` usage | Unverified | File exists but not imported by any component (confirmed by grep) |
| Sanity dataset content | Unverified | Cannot query live Sanity dataset (read-only audit, no credentials available) |
| 4 UUID-only services in Studio | Partially confirmed | Referenced in seedSanity.js comments as "edited directly in Sanity Studio" but not verifiable without Studio access |
| `src/assets/img/hero.png`, `about1.png`, `about2.png`, `about3.png`, `logo.svg` | Unreferenced | Mentioned in allfiles.txt but not found in current directory listing — may be from a previous version |

---

## 19. Final Assessment and Definition of CMS Completeness

### Current State

The Sanity CMS implementation is **schema-complete but integration-incomplete**. All 37 schema types exist and cover every content field required by the website. All 21 GROQ queries are defined. Every rendered component has Sanity queries and fallback constants.

However, CMS completeness is **not achieved** because:

1. **6 sections are not rendered** (Objectives, Counts, Approach, WhyUs, Portfolio, Gallery) despite having complete Sanity support
2. **Partnership types are not queried** (G03) — CMS-editable content is silently ignored
3. **Error boundary fallback text is not consumed** (G04) — CMS field is dead
4. **Counts counter keys are broken** (G05) — `stat.key` is undefined
5. **No uploaded video support** (G01, G02) — owners cannot upload video files or posters
6. **Partner data is duplicated** (G12) — embedded objects + separate collection

### Definition of CMS Completeness

Sanity is "complete" for Prince House Films when:

- [ ] Every section rendered on the website fetches its content from Sanity (no hardcoded content that should be editable)
- [ ] All 15 sections (including Objectives, Counts, Approach, WhyUs, Portfolio, Gallery) are mounted in App.jsx
- [ ] Partnership types are queried and rendered from CMS
- [ ] Error boundary displays CMS-configured fallback text
- [ ] Counters animate with correct keys from CMS data
- [ ] Video files can be uploaded to Sanity and rendered on the website
- [ ] Video thumbnails/posters are supported
- [ ] Partner logos are managed consistently (single source of truth)
- [ ] All local media assets are uploaded to Sanity
- [ ] The seed script can recreate all content from scratch
- [ ] Fallback content exists for resilience when Sanity is unavailable

### Estimated Effort

| Stage | Effort | Risk |
|-------|--------|------|
| Stage 1: Shared schema | Low | Low |
| Stage 2: Fix queries | Low | Low |
| Stage 3: Fix frontend bugs | Medium | Medium |
| Stage 4: Mount sections | Medium | Medium |
| Stage 5: Partner architecture | Medium | Medium |
| Stage 6: Extended media | Low | Low |
| Stage 7: Remaining integration | Low | Low |
| Stage 8: Content migration | High | High |
| Stage 9: Testing | Medium | Low |

**Total estimated effort:** 2-3 weeks for a single developer.

---

**End of Audit Report**

**Report location:** `SANITY_CONTENT_COVERAGE_AUDIT.md` (project root)  
**Sections/components assessed:** 15 sections, 24 components  
**Services identified:** 8 (4 named seed + 4 UUID Studio-only)  
**Portfolio categories:** 6  
**Portfolio projects:** 6  
**Gallery categories:** 6  
**Gallery items:** 9  
**Partners:** 14  
**Total identified gaps:** 29 (P0=5, P1=8, P2=10, P3=6)  
**Areas requiring manual verification:** WildNowLogovideo.mp4 existence, about.png usage, eabl.jpeg/eabl.png duplicate, Sanity dataset content