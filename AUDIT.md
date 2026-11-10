# AUDIT.md — Prince House Films Content Audit (Phase 1)

**Repo:** `prince-house-films`  
**Branch:** `feat/sanity`  
**App:** React CRA (`/src`), Sanity Studio v5 (`/studio`)  
**Status:** Read-only audit. NO code changes made.  
**Sanity already wired:** `hero` + `service` docs only (Hero, Services components). All other sections use local hardcoded data.

---

## 1. Data-flow summary (how components get data today)

| Mechanism | Components | Notes |
|-----------|-----------|-------|
| Sanity query via prop from `App.jsx` | `Hero` (`heroQuery`), `Services` (`servicesQuery`) | `App.jsx` fetches in `useEffect`, passes `heroData`/`servicesData` as props. Components fall back to local `fallbackHero` / empty array. |
| Local hardcoded constants | `Header`, `Preloader`, `About`, `Approach`, `Objectives`, `Counts`, `WhyUs`, `Portfolio`, `Gallery`, `Team`, `Partnership`, `GetInTouch`, `Footer`, `PrivacyPolicy` | No CMS fetch. Content is inline in the component file. |
| Local data import | `Portfolio` (none — inline), `Partnership` (imports `partnerImages.jsx`), `src/data/portfolioData.js` (unused by any component) | `partnerImages.jsx` is the partner-logo source. `portfolioData.js` is a seed stub, not imported anywhere. |
| Sanity client helper | `src/lib/sanity.js` (`sanityClient`, `urlFor`) | Already present, project `zsbii2ih`, dataset `production`, apiVersion `2025-02-19`, `useCdn: true`. |
| Queries | `src/lib/queries.js` (`heroQuery`, `servicesQuery`) | Only 2 queries exist. |
| Media helpers | `src/lib/mediaUtils.js` (YouTube/Vimeo/direct detection, embed & thumbnail URLs) | Reused by `MediaEmbed`. |
| Media render | `src/components/MediaEmbed.jsx` + `VideoPlayerProvider` | Handles `sanity_image`, `external_image`, `external_video` item shapes. Already CMS-shaped. |

**Singleton vs collection (current):**
- Singletons (one instance): `hero` (Sanity), `header`, `preloader`, `about`, `approach`, `objectives`, `counts`, `whyUs`, `servicesSection`, `portfolioSection`, `gallerySection`, `teamSection`, `partnershipSection`, `getInTouch`, `footer`, `privacyPolicy`, `siteSettings`.
- Collections (repeatable): `service` (Sanity), `navLink`, `approachStep`, `objective`/`value`, `stat`, `whyUsReason`, `teamMember`, `portfolioItem`, `galleryItem`, `partner`, `socialLink`, `contactDetail`, `serviceMediaItem`, `portfolioCategory`/`galleryCategory` (filter labels).

**Duplicated content → candidate for shared `siteSettings` document:**
- Brand name "Prince House Films" (Header alt, Footer copyright, About body, GetInTouch, PrivacyPolicy, meta).
- Logo image: `phf_word_logo.png` (Header), `phf_logo.png` (Preloader, Footer).
- Contact email `info@princehousefilms.com` (GetInTouch, PrivacyPolicy).
- Phone `+254 715 130 028` / `0715130028` (GetInTouch, PrivacyTouch, PrivacyPolicy).
- Location "Nairobi, Kenya" (GetInTouch, PrivacyPolicy).
- Social links: Instagram, Facebook, TikTok, LinkedIn (GetInTouch, Footer); YouTube (Footer).
- Instagram reel link in `ServiceModal`.
- CTA label "Start Your Project" (Hero) vs "Work With Us" (About).

---

## 2. Per-component content inventory

### 2.1 `src/components/Header/Header.jsx` (singleton: `header`)

| # | File:line | Type | Current hardcoded value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|------------------------|-----------|----------|-------------|-----------|
| H1 | Header.jsx:4 | image | `../../assets/img/phf_word_logo.png` | `<img src>` in brand logo link `<a href="/">` | No | No (brand logo) | `logo` (image) + `logoAlt` |
| H2 | Header.jsx:59 | text | alt="Prince House Films" | `alt` on logo img | No | No | `logoAlt` |
| H3 | Header.jsx:21-27 | list/array (internal-link) | `[{id:"home",label:"Home",path:"/"}, … 6 items]` | `<a href>` nav links | Yes (nav items) | No | `navLinks[]` (internalLink objects) |
| H4 | Header.jsx:90 | text | `{item.label}` (Home / Who We Are / …) | nav link text | Yes | No | part of navLink |
| H5 | Header.jsx:73 | internal-link | `{item.path}` ("/", "/about", …) | `href` on nav link | Yes | No | part of navLink |
| H6 | Header.jsx:103 | text | aria-label "Close menu" / "Open menu" | `aria-label` on toggle `<i>` | No | No | `menuCloseAria`, `menuOpenAria` (or one toggle label) |

**Notes:** Structural scroll behaviour (`window.scrollY`, section id matching, smooth scroll) stays hardcoded — it is behaviour, not content. Route paths (`/`, `/about`, …) are structural navigation but also content; model as internal-link `path` with fallback = current.

### 2.2 `src/components/Hero/Hero.jsx` (singleton: `hero`) — ALREADY SANITY-WIRED

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| HE1 | Hero.jsx:6 | text | "Where visual storytelling" | H1 (part 1) | No | No | `title` |
| HE2 | Hero.jsx:7 | text | "meets strategy" | `<span className="hero-highlight">` inside H1 | No | No | `highlightedText` |
| HE3 | Hero.jsx:8 | text | "Start Your Project" | CTA button text | No | No | `ctaText` |
| HE4 | Hero.jsx:9 | url | "#contact" | `href` on CTA `<a>` | No | No | `ctaLink` |
| HE5 | Hero.jsx:10 | string | "video" | `backgroundType` gating | No | No | `backgroundType` (radio video\|image) |
| HE6 | Hero.jsx:11-12 | url | cloudinary `.mov` | `<source src>` hero video bg | No | No | `backgroundVideoUrl` |
| HE7 | Hero.jsx:20-23 | image | (none set) | CSS `backgroundImage` when type=image | No | Yes (bg) | `backgroundImage` |

**Notes:** `fallbackHero` object (lines 5-13) is the local fallback — keep as the fallback constant. Existing `heroQuery` projection matches these fields.

### 2.3 `src/components/Preloader/Preloader.jsx` (singleton: `preloader`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| PR1 | Preloader.jsx:4 | image | `../../assets/img/phf_logo.png` | `<img src>` central logo | No | No (brand) | `logo` (image) + `logoAlt` |
| PR2 | Preloader.jsx:177 | text | alt="Princehouse Films Logo" | `alt` on preloader logo img | No | No | `logoAlt` |
| PR3 | Preloader.jsx:182-202 | icon (SVG) | hardcoded `<svg viewBox="0 0 100 100">…` diamond/cross | logo icon graphic | No | Yes (decorative icon) | KEEP HARDCODED |
| PR4 | Preloader.jsx:232 | text | "Loading " | loading text between dots | No | No | `loadingText` |
| PR5 | Preloader.jsx:284 | text | "Initializing Visuals" | loading detail label | No | No | `loadingDetail1Label` |
| PR6 | Preloader.jsx:291 | text | "Loading Assets" | loading detail label | No | No | `loadingDetail2Label` |
| PR7 | Preloader.jsx:300 | text | "Preparing Experience" | loading detail label | No | No | `loadingDetail3Label` |
| PR8 | Preloader.jsx:327 | video | `/assets/img/WildNowLogovideo.mp4` | `<source src>` preloader bg video | No | Yes (bg media) | `backgroundVideoUrl` |
| PR9 | Preloader.jsx:13-31 | number | 25ms step, 800ms video delay, 3000ms complete | timing/animation | No | Yes (math) | KEEP HARDCODED |

**Notes:** Progress % is computed state, not content. SVG logo icon is decorative — keep hardcoded. The 12 particles and floating elements are decorative.

### 2.4 `src/components/About/About.jsx` (singleton: `about`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| AB1 | About.jsx:17 | text | "Who We Are" | `<motion.h2 className="about-title">` | No | No | `title` |
| AB2 | About.jsx:21-28 | richtext/plain | long paragraph "Prince House Films is a full-service…" | `<p>` body | No | No | `body` (plain text — keep as string; no multi-paragraph need here) |
| AB3 | About.jsx:29 | internal-link | "#contact" | `href` on CTA `<a>` | No | No | `ctaLink` |
| AB4 | About.jsx:30 | text | "Work With Us" | CTA button text | No | No | `ctaText` |

**Notes:** No image in About currently (no `about.png` used despite asset existing). `about.png` asset is unused — flag as optional future field.

### 2.5 `src/components/Approach/Approach.jsx` (singleton: `approach`; collection: `approachStep`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| AP1 | Approach.jsx:113 | text | "Our Creative Process" | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| AP2 | Approach.jsx:13-79 | collection (approachStep) | 5 steps: number, title, description, color, bg, features[] | process steps grid | Yes | No | `steps[]` (order, number, title, description, features[]) |
| AP3 | Approach.jsx:132-135 | string | `step.bg`, `step.color` CSS vars | `--step-bg`, `--step-color` inline style | Yes | Yes (style) | KEEP HARDCODED (style toggle) |
| AP4 | Approach.jsx:153 | icon | `<i className="bi bi-arrow-right">` | step title icon | Yes | Yes (decorative) | KEEP HARDCODED |
| AP5 | Approach.jsx:81-100 | collection (showcase) | 3 items: icon (react element), title, description | creative showcase | Yes | No | `showcase[]` (title, description; icon key + list) |
| AP6 | Approach.jsx:223-226 | text | quote "Every great film begins…" | process-note `<p>` | No | No | `processNote` |
| AP7 | Approach.jsx:235 | text | "— Prince House Films Team" | process-note attribution | No | No | `processNoteAttribution` |

**Notes:** The commented-out `section-subtitle` (lines 115-119) is not rendered — exclude. `color`/`bg` are CSS custom properties → style toggles, keep hardcoded or expose as non-content style fields. Icons for steps (arrow-right) are decorative.

### 2.6 `src/components/Objectives/Objectives.jsx` (singleton: `objectives`; collection: `objective`/`value`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| OB1 | Objectives.jsx:47 | text | "Our Vision & Mission" | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| OB2 | Objectives.jsx:49-53 | text | "At Prince House Films, we're driven by…" | `<p className="section-subtitle">` | No | No | `intro` |
| OB3 | Objectives.jsx:67-69 | text/icon | icon `<BiTargetLock />`, title "Our Vision", body | vision card (singleton card) | No | No | `visionTitle`, `visionBody` (icon key stays) |
| OB4 | Objectives.jsx:89-92 | text/icon | icon `<BiRocket />`, title "Our Mission", body | mission card (singleton card) | No | No | `missionTitle`, `missionBody` (icon key stays) |
| OB5 | Objectives.jsx:118 | text | "Our Core Values" | `<h3>` values heading | No | No | `valuesHeading` |
| OB6 | Objectives.jsx:14-35 | collection (objective) | 4 values: icon, title, desc | values grid | Yes | No | `values[]` (title, description; icon key+list) |
| OB7 | Objectives.jsx:67,89 | icon | `<BiTargetLock />`, `<BiRocket />` | card icons | No | Yes | KEEP HARDCODED |

**Notes:** Vision/Mission cards are singleton (not a repeated list) but still content — model as singleton fields `vision`/`mission` on the `objectives` doc. Values are a collection.

### 2.7 `src/components/Counts/Counts.jsx` (singleton: `counts`; collection: `stat`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| CT1 | Counts.jsx:138 | text | "Our Impact in Numbers" | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| CT2 | Counts.jsx:72-109 | collection (stat) | 4 stats: key, number (animated target), suffix, label, description, color, icon | stats grid | Yes | No | `stats[]` (number, suffix, label, description; icon key+list; color stays) |
| CT3 | Counts.jsx:161 | number+suffix | `{stat.number}` + `data-suffix={stat.suffix}` | `<h3 className="stat-number">` animated counter | Yes | No | `number` (int), `suffix` (string "+"\|"%") |
| CT4 | Counts.jsx:111-122 | collection | 2 achievements: icon, title, description | achievement badges | Yes | No | `achievements[]` (title, description; icon key+list) |
| CT5 | Counts.jsx:65-68 | number | end values 10, 200, 150, 98 | animation targets (same as stat.number) | Yes | No | same as stat.number |
| CT6 | Counts.jsx:49-69 | number | duration 2000/2500/2200/1800ms | animation duration | No | Yes (math) | KEEP HARDCODED |

**Notes:** Counter end values = stat `number`. Colors are CSS vars → keep hardcoded.

### 2.8 `src/components/WhyUs/WhyUs.jsx` (singleton: `whyUs`; collection: `whyUsReason`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| WU1 | WhyUs.jsx:88 | text | "Why Choose Prince House Films" | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| WU2 | WhyUs.jsx:90-94 | text | "In a crowded market of content creators…" | `<p className="section-subtitle">` | No | No | `intro` |
| WU3 | WhyUs.jsx:15-68 | collection (whyUsReason) | 4 cards: icon, title, description, color, features[] | advantages grid | Yes | No | `reasons[]` (title, description, features[]; icon key+list; color stays) |
| WU4 | WhyUs.jsx:132 | text | "The Prince House Films Difference" | `<h3 className="comparison-title">` | No | No | `comparisonHeading` |
| WU5 | WhyUs.jsx:138,167 | text | "With Us" / "With Others" | comparison column headings | No | No | `comparisonUsLabel`, `comparisonOthersLabel` |
| WU6 | WhyUs.jsx:144-161 | list of strings | 5 "With Us" items | comparison-list items | Yes | No | `comparisonUsItems[]` |
| WU7 | WhyUs.jsx:173-189 | list of strings | 5 "With Others" items | comparison-list items | Yes | No | `comparisonOthersItems[]` |
| WU8 | WhyUs.jsx:213-216 | collection | 4 stats: number, label | stats-section | Yes | No | `footerStats[]` (number, label) — could reuse `stat` type |
| WU9 | WhyUs.jsx:31, 110 | icon | `<BiStar />` etc (commented out), check-circle-fill / x-circle | icons | Yes | Yes | KEEP HARDCODED |

**Notes:** Commented-out `final-cta` block (lines 218-328) not rendered — exclude. Comparison icons (check-circle-fill / x-circle) decorative.

### 2.9 `src/components/Services/Services.jsx` + `ServiceModal.jsx` (singleton: `servicesSection`; collection: `service` — ALREADY PARTIALLY SANITY-WIRED)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| SV1 | Services.jsx:68 | text | "Our Creative Services" | `<h2 className="services-section-title">` | No | No | `sectionTitle` (on servicesSection singleton) |
| SV2 | Services.jsx:34-62 | collection (service) | service docs from Sanity: title, text, icon, featured, backgroundType/Image/VideoUrl, mediaItems | bento cards | Yes | No | `service` docs (already seeded) |
| SV3 | Services.jsx:17-22 | icon map | `iconMap[item.icon] || <BiPen />` | card icon | Yes | Yes | icon key on service doc (already) |
| SV4 | Services.jsx:42-53 | image/url | bgImage from backgroundType or YouTube thumb | CSS `--services-bento-bg` | Yes | Yes (bg) | `backgroundType`, `backgroundImage`, `backgroundVideoUrl` (already) |
| SM1 | ServiceModal.jsx:60 | text | "{contentItems.length} visual contents" | modal subtitle `<p>` | No | No | (derived) — keep as computed fallback text |
| SM2 | ServiceModal.jsx:47 | url | `https://www.instagram.com/princehouse_films?igsh=…` | modal CTA `href` | No | No | `instagramUrl` (on servicesSection or siteSettings) |
| SM3 | ServiceModal.jsx:101 | text | "View Full Portfolio on Instagram" | modal CTA label | No | No | `instagramCtaLabel` |
| SM4 | ServiceModal.jsx:83-88 | object | `data-item-type={item.type}` | data-attr on grid item | Yes | Yes (JS hook) | KEEP (data-attr) |

**Notes:** `Services.jsx` already maps Sanity `service` docs. `iconElement` derived from `icon` key — keep. ServiceModal `instagramLink` hardcoded → move to CMS. MediaEmbed already handles mediaItems shape.

### 2.10 `src/components/Portfolio/Portfolio.jsx` (singleton: `portfolioSection`; collection: `portfolioItem`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| PO1 | Portfolio.jsx:150 | text | "Our Portolio" (typo preserved) | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| PO2 | Portfolio.jsx:18-25 | collection (category) | 6 filters: All Projects, Commercial, … | filter buttons | Yes | No | `categories[]` (label) — or flat string array |
| PO3 | Portfolio.jsx:27-113 | collection (portfolioItem) | 6 items: id, title, category, description, image, client, year, duration, awards[], details | portfolio grid + modal | Yes | No | `portfolioItems[]` |
| PO4 | Portfolio.jsx:33,48,… | image | `item.image` (unsplash/pexels URL) | CSS `backgroundImage` on `.portfolio-image` + modal | Yes | No | `coverImage` (image) + `coverAlt` |
| PO5 | Portfolio.jsx:193 | text | `{item.category}` | overlay category badge | Yes | No | `category` |
| PO6 | Portfolio.jsx:194 | text | `{item.title}` | overlay title | Yes | No | `title` |
| PO7 | Portfolio.jsx:195 | text | `{item.description}` | overlay description | Yes | No | `shortDescription` |
| PO8 | Portfolio.jsx:290-375 | modal fields | title, details, year, duration, client, category, awards[], watch link | modal body | Yes | No | `details`, `year`, `duration`, `client`, `category`, `awards[]`, `watchCtaLabel` |
| PO9 | Portfolio.jsx:345 | internal-link | `/project/{activeItem.id}` | modal CTA `href` | Yes | Yes (structural route) | KEEP HARDCODED (route) |

**Notes:** `image` is a background-image (no ``) — treat as decorative bg? It's content (portfolio cover). Since it's a `div` backgroundImage there's no `alt` attribute; add `coverAlt` field for accessibility even if not rendered on `div` (or render `aria-label`). Keep DOM identical: backgroundImage stays. `coverAlt` stored but used as `aria-label` on the wrapper? That would add an attribute — constraint says don't add data-* but aria-label is accessibility. Safer: store `coverAlt`, fall back to title, and not render it on the div (to keep DOM byte-identical) OR add `aria-label`. I'll note: keep div as-is (no alt possible on background div), store alt for future/image-tag migration. Actually to satisfy "alt text must become an editable field where an image is content", I'll add `coverAlt` field and use it as `aria-label` on the `.portfolio-item` — that ADDS an attribute. Constraint 3 says don't add/remove attributes. Compromise: store `coverAlt` as editable field but do NOT render it (fallback to title unused), keeping DOM identical; note in report. Hmm, that makes the field inert. 

Decision: For background-image portfolio/gallery items, add `alt` field, fall back to current title, and apply it as `aria-label` on the wrapping item div. Adding `aria-label` is accessibility-critical and does not change visual layout/classNames. I'll mark these as "adds aria-label only, no visual change". This is the least-violating way to make alt editable.

### 2.11 `src/components/Gallery/Gallery.jsx` (singleton: `gallerySection`; collection: `galleryItem`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| GA1 | Gallery.jsx:163 | text | "Behind the Scenes Gallery" | `<motion.h2 className="section-title">` | No | No | `sectionTitle` |
| GA2 | Gallery.jsx:166-170 | text | "Take a look at the passion…" | `<p className="section-subtitle">` | No | No | `intro` |
| GA3 | Gallery.jsx:17-24 | collection (category) | 6 filters: All, Behind the Scenes, … | filter buttons | Yes | No | `categories[]` |
| GA4 | Gallery.jsx:26-126 | collection (galleryItem) | 9 items: id, title, category, description, image, date, location, type | grid + lightbox | Yes | No | `galleryItems[]` |
| GA5 | Gallery.jsx:33,… | image | `item.image` backgroundImage | `.gallery-image` + lightbox | Yes | No | `coverImage` + `coverAlt` (see PO notes re aria-label) |
| GA6 | Gallery.jsx:206-210 | text | category, title, description | overlay | Yes | No | `category`, `title`, `description` |
| GA7 | Gallery.jsx:34-35,67-68,… | text/date | `date` ("2023"), `location` | lightbox details | Yes | No | `date`, `location` |
| GA8 | Gallery.jsx:36 | string | `type` ("photo"/"video") | play icon + lightbox "Video"/"Photo" | Yes | Yes (logic gate) | `mediaType` (photo/video) |
| GA9 | Gallery.jsx:228 | internal-link | "/full-gallery" | view-more `href` | No | No | `viewMoreLink` |
| GA10 | Gallery.jsx:229 | text | "View More in Gallery" | view-more label | No | No | `viewMoreLabel` |
| GA11 | Gallery.jsx:283 | internal-link | `/watch/{id}` | watch-video `href` (video only) | Yes | Yes (structural) | KEEP HARDCODED |

**Notes:** Gallery `image` is background-image → same alt handling as Portfolio.

### 2.12 `src/components/Team/Team.jsx` (singleton: `team`; collection: `teamMember`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| TM1 | Team.jsx:21 | text | "Meet Our Creative Team" | `<h2 className="team-title">` | No | No | `sectionTitle` |
| TM2 | Team.jsx:23-25 | text | "A passionate collective of storytellers…" | `<p className="team-subtitle">` | No | No | `intro` |
| TM3 | Team.jsx:6 | image | `../../assets/img/team.jpg` backgroundImage | group photo div | No | Yes (bg/hero image) | `groupPhoto` (image) — decorative bg, alt="" |
| TM4 | Team.jsx:47 | text | "The Creative Minds" | photo-title `<motion.h3>` | No | No | `groupPhotoTitle` |
| TM5 | Team.jsx:55 | text | "United by passion, driven by innovation" | photo-description `<motion.p>` | No | No | `groupPhotoDescription` |

**Notes:** Only a group photo is rendered (no individual member cards). `teamMember` collection defined for future; no members rendered so nothing to migrate now. Group photo is a `div` backgroundImage → decorative (no alt possible). Keep `groupPhoto` editable image + `groupPhotoAlt` stored but not rendered on div (note).

### 2.13 `src/components/Partnership/Partnership.jsx` + `partnerImages.jsx` (singleton: `partnershipSection`; collection: `partner`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| PA1 | Partnership.jsx:55 | text | "Strategic Alliances" | partnerships-badge `<span>` | No | No | `badgeLabel` |
| PA2 | Partnership.jsx:63-65 | text | "Our Valued Partnerships" (gradient on "Partnerships") | `<motion.h2 className="partnerships-title">` | No | No | `sectionTitle` |
| PA3 | Partnership.jsx:73-75 | text | "Building lasting relationships…" | `<motion.p className="partnerships-subtitle">` | No | No | `intro` |
| PA4 | partnerImages.jsx:17-32 | collection (partner) | 14 partners: name + img (Coca Cola, Darling, … Two Rivers, V Spa) | carousel `<img src>` + overlay name | Yes | No | `partners[]` (name, logo image + alt, url optional) |
| PA5 | partnerImages.jsx:18 | text | "Coca Cola" etc | overlay `<span>{partner.name}</span>` and `alt={`${name} logo`}` | Yes | No | `name`, `logoAlt` |
| PA6 | partnerImages.jsx:2-15 | image | local imports partner1…partner14 | `<img src>` | Yes | No | `logo` (image) |
| PA7 | Partnership.jsx:16-31 | collection (partnershipType) | 1 type: Brand Partnerships (icon, title, description, features[], color, accent) | type card | No | No | `partnershipTypes[]` (title, description, features[]; icon key+list; color stays) |
| PA8 | Partnership.jsx:205 | text | "Explore Partnership" | action button label | No | No | `actionButtonLabel` |

**Notes:** Carousel renders `[...partners, ...partners]` (doubled) for infinite effect — structural, keep. `partnerImages.jsx` remains as fallback seed source. Partnership type icon (BiBuilding) hardcoded/decorative. Commented-out stats/CTA blocks not rendered — exclude.

### 2.14 `src/components/GetInTouch/GetInTouch.jsx` (singleton: `getInTouch`; collections: `contactDetail`, `socialLink`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| GT1 | GetInTouch.jsx:85 | text | "Have a Project In Mind?" | `<h2 className="section-title">` | No | No | `sectionTitle` |
| GT2 | GetInTouch.jsx:86-89 | text | "Ready to bring your vision to life? Connect with us through any channel." | `<p className="section-subtitle">` | No | No | `intro` |
| GT3 | GetInTouch.jsx:17-42 | collection (contactDetail) | 3 items: Location (maps), Email (mailto), Phone (tel) | contact cards | Yes | No | `contactDetails[]` (title, content, link, linkText, external; icon key+list) |
| GT4 | GetInTouch.jsx:22,30,38 | url | google maps, mailto:, tel: | contact card `href` | Yes | No | `link` |
| GT5 | GetInTouch.jsx:23,31,39 | text | "Directions", "Email Us", "Call Now" | contact card link text | Yes | No | `linkText` |
| GT6 | GetInTouch.jsx:44-73 | collection (socialLink) | 4 items: Instagram, Facebook, TikTok, LinkedIn | social links | Yes | No | `socials[]` (platform, handle, link, color stays; icon key+list) |
| GT7 | GetInTouch.jsx:135 | text | "Follow Us" | social-header `<h3>` | No | No | `socialsHeading` |
| GT8 | GetInTouch.jsx:176 | text | "Free 30-Min Consultation" | CTA title | No | No | `ctaTitle` |
| GT9 | GetInTouch.jsx:178 | text | "Discuss your project with our creative director" | CTA desc | No | No | `ctaDescription` |
| GT10 | GetInTouch.jsx:182 | url | `https://calendly.com/princehousefilms/consultation` | Book Now `href` | No | No | `consultationUrl` |
| GT11 | GetInTouch.jsx:189 | text | "Book Now" | Book Now label | No | No | `bookNowLabel` |
| GT12 | GetInTouch.jsx:192 | url | `tel:+254715130028` | Call `href` | No | No | `callUrl` (or phone field) |
| GT13 | GetInTouch.jsx:197 | text | "Call" | Call label | No | No | `callLabel` |
| GT14 | GetInTouch.jsx:201 | text | "24-hour response" | cta-note | No | No | `ctaNote` |

**Notes:** Icons (BiMap, BiEnvelope, BiPhone, BiChat, BiCalendar, social icons) → icon key + list; colors stay as style. `external` flag derived from link type.

### 2.15 `src/components/Footer/Footer.jsx` (singleton: `footer`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| FT1 | Footer.jsx:5 | image | `../../assets/img/phf_logo.png` | `<img src>` footer logo | No | No (brand) | `logo` (image) + `logoAlt` (shared with siteSettings/header) |
| FT2 | Footer.jsx:33 | text | alt="Prince House Films" | `alt` on footer logo img | No | No | `logoAlt` |
| FT3 | Footer.jsx:9-25 | collection (socialLink) | 4 items: instagram, youtube, tiktok, facebook (icon class + href) | social icons `<a>` | Yes | No | `socials[]` (icon class string, link) |
| FT4 | Footer.jsx:50 | internal-link | "/privacy-policy" | `<Link to>` | No | No | `privacyLink` + `privacyLabel` "Privacy Policy" |
| FT5 | Footer.jsx:54 | text | "© {new Date().getFullYear()} Prince House Films" | footer-bottom | No | No | `copyrightText` (brand name + format); year computed stays |

**Notes:** Brand name "Prince House Films" shared with siteSettings. Year computed from Date — keep hardcoded JS, brand name editable.

### 2.16 `src/components/MediaEmbed.jsx` (utility; no singleton)

Already supports `sanity_image`, `external_image`, `external_video` item shapes with `urlFor`, `getVideoProvider`, `getVideoEmbedUrl`, `getVideoThumbnail`. No hardcoded content to migrate — it renders whatever `item` it receives. The `item` shape comes from service `mediaItems` (already Sanity). No changes required to component. **Note:** make `MediaEmbed` source configurable per usage — already is via `item` prop.

### 2.17 `src/components/ScrollToTop/ScrollToTop.jsx`

Renders `null`. No visible content, no aria-label. Nothing to extract.

### 2.18 `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` (singleton: `privacyPolicy`)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| PP1 | PrivacyPolicy.jsx:15 | internal-link | "/" | Back to Home `Link to` | No | No | (nav link — structural, keep) |
| PP2 | PrivacyPolicy.jsx:16 | text | "Back to Home" | back link text | No | No | `backToHomeLabel` |
| PP3 | PrivacyPolicy.jsx:21 | text | "Legal" | eyebrow `<p>` | No | No | `eyebrow` |
| PP4 | PrivacyPolicy.jsx:22 | text | "Privacy Policy for Prince House Films" | `<h1>` | No | No | `title` |
| PP5 | PrivacyPolicy.jsx:25 | date | "15/04/2026" | Effective Date | No | No | `effectiveDate` |
| PP6 | PrivacyPolicy.jsx:28 | date | "15/04/2026" | Last Updated | No | No | `lastUpdated` |
| PP7 | PrivacyPolicy.jsx:33-176 | richtext (multi-section) | full policy body: 11 sections with h2, p, ul/li | `.privacy-policy-body` | Yes (sections) | No | `body` — **@portabletext/react NOT installed**; store as single `text` field (HTML) rendered via `dangerouslySetInnerHTML` to keep DOM identical. |
| PP8 | PrivacyPolicy.jsx:173-175 | text | email, phone, website | contact block | No | No | (shared with siteSettings contact: email, phone, website) |

**Notes:** `@portabletext/react` is NOT installed in node_modules; per constraints do not add deps unless strictly required. Body kept as single HTML text field. initialValue = current HTML so site is identical after seeding.

### 2.19 `src/App.jsx` (page shell / meta)

| # | File:line | Type | Current value | Renders as | Repeats? | Decorative? | CMS field |
|---|-----------|------|--------------|-----------|----------|-------------|-----------|
| AP1 | App.jsx:31 | boolean | `loading` state | Preloader shown/hidden | No | Yes (behaviour) | KEEP |
| AP2 | App.jsx:16-17 | query | heroQuery, servicesQuery | data fetch | No | Yes | extend queries.js |

**Notes:** App has no direct page copy. Section order is structural (About → Services → Partnership → Team → GetInTouch → Footer). Meta tags live in `public/index.html` (static) — flagged out of scope for component changes (note only per mission); SEO fields can live on `siteSettings` for future React-Helmet wiring.

---

## 3. public/index.html & manifest.json (SEO / static — note only, do not change layout)

- `index.html`: `<title>`, `description`, `keywords`, `og:title`, `og:description`, `og:image`, `twitter:*`, author, copyright, canonical, geo, JSON-LD Organization/LocalBusiness/WebSite/VideoProductionCompany with hardcoded name/url/email/phone/socials, FAQ, ItemList services, Meta Pixel id, favicons, theme-color.
- `manifest.json`: short_name "React App", name "Create React App Sample", theme_color #000000.

**Decision:** These are static HTML files, not rendered from Sanity. Per mission ("note only, do not change layout"), I will NOT edit them. SEO fields added to `siteSettings` doc for future use; index.html remains the fallback. Mentioned in audit for completeness.

---

## 4. All hardcoded URLs / external links / media / mailto / tel

| Location | URL | Type |
|----------|-----|------|
| Hero.jsx:11 | `https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov` | background video |
| Preloader.jsx:327 | `/assets/img/WildNowLogovideo.mp4` | preloader bg video (local) |
| Header nav | "/", "/about", "/services", "/partnerships", "/team", "/contact" | internal (structural routes) |
| About.jsx:29 | "#contact" | internal anchor |
| ServiceModal.jsx:47 | `https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs` | external (instagram) |
| Portfolio.jsx:345 | `/project/{id}` | internal (structural) |
| Gallery.jsx:228 | "/full-gallery" | internal (structural) |
| Gallery.jsx:283 | `/watch/{id}` | internal (structural) |
| GetInTouch.jsx:22 | `https://maps.google.com/?q=Nairobi+Kenya` | external |
| GetInTouch.jsx:30 | `mailto:info@princehousefilms.com` | email |
| GetInTouch.jsx:38 | `tel:+254 715 130 028` | phone |
| GetInTouch.jsx:49,56,63,70 | instagram/facebook/tiktok/linkedin URLs | external socials |
| GetInTouch.jsx:182 | `https://calendly.com/princehousefilms/consultation` | external |
| GetInTouch.jsx:192 | `tel:+254715130028` | phone |
| Footer.jsx:11-24 | instagram, youtube, tiktok, facebook URLs | external socials |
| Footer.jsx:50 | "/privacy-policy" | internal |
| PrivacyPolicy.jsx:173-175 | info@princehousefilms.com, 0715130028, www.princehousefilms.com | email/phone/website |
| index.html | `https://www.princehousefilms.com` (canonical, og, JSON-LD) | site URL |
| Service mediaItems (seed) | multiple cloudinary video/gif/image URLs + instagram reel | media + external |

---

## 5. Assets inventory (`src/assets/img`)

- `phf_word_logo.png` — Header logo (content, brand)
- `phf_logo.png` — Preloader + Footer logo (content, brand)
- `about.png` — UNUSED (available for About image field)
- `team.jpg` — Team group photo (background image, decorative)
- `services/creativeContent.gif`, `services/motion.gif` — used by Services as local fallback bg (already Sanity-wired with fallbacks)
- `partners/*.jpeg/png` (14) — partner logos (used by partnerImages.jsx fallback)
- Preloader: `/assets/img/WildNowLogovideo.mp4` (public/assets? referenced as `/assets/img/...`)

---

## 6. Existing Sanity schema (studio/schemaTypes/)

- `hero` (document): title, highlightedText, ctaText, ctaLink, backgroundType (video\|image), backgroundVideoUrl, backgroundImage. ✅ matches Hero fallback.
- `service` (document): title, text, icon (key list), featured, orderRank, backgroundType (image\|videoUrl), backgroundImage, backgroundVideoUrl, mediaItems[] (mediaItem). ✅ matches Services.
- `mediaItem` (object): type (image\|video), title, image, imageUrl, videoUrl, externalUrl. ✅ matches MediaEmbed.

**Not yet in schema:** siteSettings, header, preloader, about, approach, approachStep, objectives, objective/value, counts, stat, achievement, whyUs, whyUsReason, servicesSection, portfolioSection, portfolioItem, gallerySection, galleryItem, teamSection, teamMember, partnershipSection, partner, partnershipType, getInTouch, contactDetail, socialLink, footer, privacyPolicy, externalLink, internalLink, socialLink object, seo.

---

## 7. Existing seed script (`scripts/seedSanity.js`)

Seeds (idempotent `createOrReplace`):
- `hero-singleton` (hero): title/highlightedText/ctaText/ctaLink/backgroundType/backgroundVideoUrl = current Hero values.
- 4 `service` docs (`service-creative`, `service-motion`, `service-graphic`, `service-event`) with title/text/icon/featured/orderRank/backgroundType/backgroundVideoUrl/mediaItems = current Services values.

**Needs extension** to cover every singleton + collection from this audit, using current hardcoded values as initialValue, deterministic `_id`s.

---

## 8. Environment

- `REACT_APP_SANITY_PROJECT_ID=zsbii2ih`, `REACT_APP_SANITY_DATASET=production`, `SANITY_API_TOKEN` present in `.env`.
- Studio `sanity.config.ts`: projectId `zsbii2ih`, dataset `production`, plugins `[structureTool(), visionTool()]`, schema from `schemaTypes/index.ts`.
- `@sanity/client` ^7.21.0 and `@sanity/image-url` ^2.1.1 installed in app. `@portabletext/react` NOT installed.

---

## 9. Decorative content (KEEP HARDCODED — not CMS-editable)

- All `className` strings, CSS custom-property values (`var(--color-*)`), inline animation styles/timings (Counts durations, framer-motion variants, progress intervals).
- `data-item-type` attribute (JS hook).
- Scroll/intersection-observer logic, sticky header, scroll-to-top, preloader timings.
- Decorative icons: Preloader SVG, step arrow-right, vision/mission card icons, WhyUs check/x icons, Partnership BiBuilding, GetInTouch header icons, social icon *elements* (kept as icon-key → element mapping).
- Background images treated as decorative CSS: Team group photo, Portfolio/Gallery cover images (bg div — no `alt` attribute possible; store alt but don't render on div), Preloader video, Hero background (content when image, bg when video — backgroundType gate).
- Commented-out code blocks (Approach subtitle, Counts subtitle, WhyUs final-cta, Partnership stats/CTA, Portfolio section-cta) — not rendered, excluded.
- `ScrollToTop` renders null — no content.
- `new Date().getFullYear()` year in Footer — computed, keep.

---

## 10. Open questions / risks (for Phase 2 planning)

1. **Privacy Policy body:** `@portabletext/react` not installed. Proposed: single `text` field with current HTML as `initialValue`, rendered via `dangerouslySetInnerHTML` inside `.privacy-policy-body` (DOM identical). Confirm acceptable, or approve adding `@portabletext/react`.
2. **Background images as `div` style:** Portfolio/Gallery/Team use `backgroundImage` on divs — no `alt` attribute can be added without changing DOM. Proposed: store editable `alt` field but apply as `aria-label` on wrapper (accessibility, no visual change) OR store but don't render. Confirm.
3. **SEO meta in `public/index.html`:** static, out of scope per mission. `siteSettings.seo` doc added for future React-Helmet wiring; index.html unchanged.
4. **Router paths:** nav/internal links use path strings; treat as internal-link `path` with fallback = current. Confirm no route config changes needed.
5. **Studio dataset:** `sanity.config.ts` targets dataset `production`. Seed script should target dev dataset or confirm production is acceptable for seeding.

---

## 11. Cross-reference: audit item → planned Sanity field (summary)

| Site section | Studio doc | Key fields |
|-------------|-----------|-----------|
| Site-wide brand | `siteSettings` | brandName, logo, favicon, email, phone, address, socials[], seo |
| Header | `header` | logo, logoAlt, navLinks[]{label,path}, menu aria labels |
| Preloader | `preloader` | logo, logoAlt, loadingText, loadingDetails[]{label}, backgroundVideoUrl |
| Hero | `hero` (exists) | title, highlightedText, ctaText, ctaLink, backgroundType, backgroundVideoUrl, backgroundImage |
| About | `about` | title, body, ctaLink, ctaText |
| Approach | `approach` + `approachStep` | sectionTitle, steps[]{number,title,description,features[]}, showcase[]{title,description}, processNote, processNoteAttribution |
| Objectives | `objectives` | sectionTitle, intro, vision{title,body}, mission{title,body}, valuesHeading, values[]{title,description} |
| Counts | `counts` | sectionTitle, stats[]{number,suffix,label,description}, achievements[]{title,description} |
| WhyUs | `whyUs` | sectionTitle, intro, reasons[]{title,description,features[]}, comparisonHeading, comparisonUsLabel/OthersLabel, comparisonUsItems[]/OthersItems[], footerStats[]{number,label} |
| Services section | `servicesSection` | sectionTitle, instagramUrl, instagramCtaLabel |
| Service card | `service` (exists) | title, text, icon, featured, orderRank, background*, mediaItems[] |
| Portfolio section | `portfolioSection` | sectionTitle, categories[] |
| Portfolio item | `portfolioItem` | title, category, shortDescription, description, coverImage, coverAlt, client, year, duration, awards[] |
| Gallery section | `gallerySection` | sectionTitle, intro, categories[], viewMoreLink, viewMoreLabel |
| Gallery item | `galleryItem` | title, category, description, coverImage, coverAlt, date, location, mediaType |
| Team | `teamSection` | sectionTitle, intro, groupPhoto, groupPhotoAlt, groupPhotoTitle, groupPhotoDescription |
| Partnership | `partnershipSection` + `partner` | badgeLabel, sectionTitle, intro, partners[]{name,logo,logoAlt,url}, partnershipTypes[]{title,description,features[]}, actionButtonLabel |
| GetInTouch | `getInTouch` | sectionTitle, intro, contactDetails[]{title,content,link,linkText,external}, socialsHeading, socials[]{platform,handle,link,color}, ctaTitle, ctaDescription, consultationUrl, bookNowLabel, callUrl, callLabel, ctaNote |
| Footer | `footer` | logo, logoAlt, socials[], privacyLink, privacyLabel, copyrightText |
| PrivacyPolicy | `privacyPolicy` | backToHomeLabel, eyebrow, title, effectiveDate, lastUpdated, body (HTML text) |

---

**End of Phase 1 audit.** `AUDIT.md` written to repo root. No code changes made. Waiting for approval before producing `SCHEMA_PLAN.md` (Phase 2).
