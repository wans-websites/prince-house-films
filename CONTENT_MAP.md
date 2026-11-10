# Content Map — Prince House Films Sanity CMS

Complete field-by-field mapping from site locations to Studio documents and fields.
Cross-referenced with `AUDIT.md` §2 and `SCHEMA_PLAN.md` §F.

## How to Read This Table

| Column | Meaning |
|--------|---------|
| **Site Location** | Where the content appears on the website |
| **Studio Path** | Studio document / list where the field is edited |
| **Field Name** | Sanity schema field name |
| **Notes** | Type, fallback behavior, or special handling |

## Site Settings (Global)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Footer copyright | Site Settings | brandName | String, required |
| Header logo alt | Site Settings | logoAlt | String, required |
| Footer logo alt | Site Settings | logoAlt | String, required |
| Site URL (SEO, deferred) | Site Settings | siteUrl | URL, stored not rendered |
| Contact email | Site Settings | email | String, required, email format |
| Contact phone | Site Settings | phone | String, required |
| Contact address | Site Settings | address | String |
| Service Modal Instagram link | Site Settings | instagramUrl | URL |
| Service Modal Instagram CTA label | Site Settings | instagramCtaLabel | String |
| Error Boundary fallback text | Error Boundary | fallbackText | String, required |

## Header

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Logo image | Header | logo | Image, hotspot |
| Logo alt text | Header | logoAlt | String, required |
| Nav link label | Header → navLinks[] | label | String, required |
| Nav link path | Header → navLinks[] | path | String, required |
| Mobile menu open ARIA | Header | menuOpenAria | String |
| Mobile menu close ARIA | Header | menuCloseAria | String |

## Preloader

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Logo image | Preloader | logo | Image, hotspot |
| Logo alt text | Preloader | logoAlt | String, required |
| Loading text | Preloader | loadingText | String |
| Loading detail 1 label | Preloader → loadingDetails[] | label | String |
| Loading detail 2 label | Preloader → loadingDetails[] | label | String |
| Loading detail 3 label | Preloader → loadingDetails[] | label | String |
| Background video URL | Preloader | backgroundVideoUrl | URL |

## Hero

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Main headline | Hero | title | String, required |
| Highlighted text | Hero | highlightedText | String |
| CTA label | Hero | ctaText | String |
| CTA link | Hero | ctaLink | String |
| Background type | Hero | backgroundType | String, radio: video\|image |
| Background video URL | Hero | backgroundVideoUrl | URL |
| Background image | Hero | backgroundImage | Image, hotspot |

## About

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | About | title | String, required |
| Body text | About | body | Text, required |
| CTA link | About | ctaLink | String |
| CTA label | About | ctaText | String |

## Approach (Our Creative Process)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Approach | sectionTitle | String, required |
| Step number | Approach → steps[] | number | String |
| Step title | Approach → steps[] | title | String, required |
| Step description | Approach → steps[] | description | Text, required |
| Step features | Approach → steps[] → features[] | String array |
| Step order | Approach → steps[] | order | Number |
| Showcase title | Approach → showcase[] | title | String, required |
| Showcase description | Approach → showcase[] | description | String, required |
| Showcase icon key | Approach → showcase[] | iconKey | String, dropdown |
| Showcase order | Approach → showcase[] | order | Number |
| Process note quote | Approach | processNote | String |
| Process note attribution | Approach | processNoteAttribution | String |

## Objectives (Our Vision & Mission)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Objectives | sectionTitle | String, required |
| Intro text | Objectives | intro | Text, required |
| Vision title | Objectives → vision | title | String, required |
| Vision body | Objectives → vision | body | Text, required |
| Mission title | Objectives → mission | title | String, required |
| Mission body | Objectives → mission | body | Text, required |
| Values heading | Objectives | valuesHeading | String |
| Value title | Objectives → values[] | title | String, required |
| Value description | Objectives → values[] | description | String, required |
| Value icon key | Objectives → values[] | iconKey | String, dropdown |
| Value order | Objectives → values[] | order | Number |

## Counts (Our Impact in Numbers)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Counts | sectionTitle | String, required |
| Stat number | Counts → stats[] | number | Number, required |
| Stat suffix | Counts → stats[] | suffix | String |
| Stat label | Counts → stats[] | label | String, required |
| Stat description | Counts → stats[] | description | String |
| Stat icon key | Counts → stats[] | iconKey | String, dropdown |
| Stat order | Counts → stats[] | order | Number |
| Achievement title | Counts → achievements[] | title | String, required |
| Achievement description | Counts → achievements[] | description | String, required |
| Achievement icon key | Counts → achievements[] | iconKey | String, dropdown |
| Achievement order | Counts → achievements[] | order | Number |

## Why Us

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Why Us | sectionTitle | String, required |
| Intro text | Why Us | intro | Text, required |
| Reason title | Why Us → reasons[] | title | String, required |
| Reason description | Why Us → reasons[] | description | Text, required |
| Reason features | Why Us → reasons[] → features[] | String array |
| Reason icon key | Why Us → reasons[] | iconKey | String, dropdown |
| Reason order | Why Us → reasons[] | order | Number |
| Comparison heading | Why Us | comparisonHeading | String |
| "With Us" label | Why Us | comparisonUsLabel | String |
| "With Others" label | Why Us | comparisonOthersLabel | String |
| "With Us" item text | Why Us → comparisonUsItems[] | text | String, required |
| "With Others" item text | Why Us → comparisonOthersItems[] | text | String, required |
| Footer stat number | Why Us → footerStats[] | number | String, required |
| Footer stat label | Why Us → footerStats[] | label | String, required |
| Footer stat order | Why Us → footerStats[] | order | Number |

## Services Section

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Services Section | sectionTitle | String, required |

## Service Cards (Collection)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Service title | Services | title | String, required |
| Service description | Services | text | Text, required |
| Icon key | Services | icon | String, dropdown |
| Featured flag | Services | featured | Boolean |
| Order | Services | orderRank | Number |
| Background type | Services | backgroundType | String, radio |
| Background image | Services | backgroundImage | Image, hotspot |
| Background video URL | Services | backgroundVideoUrl | URL |
| Local fallback key | Services | localFallbackKey | String, developer hint |
| Media items | Services → mediaItems[] | Object array | See Media Items |

## Portfolio Section

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Portfolio Section | sectionTitle | String, required |
| Filter category | Portfolio Section → categories[] | Reference | Portfolio Category doc |

## Portfolio Item (Collection)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Item title | Portfolio Item | title | String, required |
| Item category | Portfolio Item | category | String, required |
| Short description | Portfolio Item | shortDescription | String |
| Full details | Portfolio Item | details | Text |
| Cover image (Sanity) | Portfolio Item | coverImage | Image, hotspot |
| Cover image URL (external) | Portfolio Item | coverImageUrl | URL |
| Cover alt text | Portfolio Item | coverAlt | String, required |
| Client name | Portfolio Item | client | String |
| Year | Portfolio Item | year | String |
| Duration | Portfolio Item | duration | String |
| Awards | Portfolio Item → awards[] | String array |
| Watch CTA label | Portfolio Item | watchCtaLabel | String |
| Order | Portfolio Item | order | Number |

## Gallery Section

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Gallery Section | sectionTitle | String, required |
| Intro text | Gallery Section | intro | Text, required |
| Filter category | Gallery Section → categories[] | Reference | Gallery Category doc |
| View more link | Gallery Section | viewMoreLink | String |
| View more label | Gallery Section | viewMoreLabel | String |

## Gallery Item (Collection)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Item title | Gallery Item | title | String, required |
| Item category | Gallery Item | category | String, required |
| Item description | Gallery Item | description | String, required |
| Cover image (Sanity) | Gallery Item | coverImage | Image, hotspot |
| Cover image URL (external) | Gallery Item | coverImageUrl | URL |
| Cover alt text | Gallery Item | coverAlt | String, required |
| Date / Year | Gallery Item | date | String, free-form |
| Location | Gallery Item | location | String |
| Media type | Gallery Item | mediaType | String, dropdown: photo\|video |
| Order | Gallery Item | order | Number |

## Team Section

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Team Section | sectionTitle | String, required |
| Intro text | Team Section | intro | Text, required |
| Group photo | Team Section | groupPhoto | Image, hotspot, decorative |
| Group photo title | Team Section | groupPhotoTitle | String |
| Group photo description | Team Section | groupPhotoDescription | String |

## Partnership Section

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Badge label | Partnership Section | badgeLabel | String |
| Section title | Partnership Section | sectionTitle | String, required |
| Intro text | Partnership Section | intro | Text, required |
| Action button label | Partnership Section | actionButtonLabel | String |
| Partner name | Partnership Section → partners[] | name | String, required |
| Partner logo | Partnership Section → partners[] | logo | Image, hotspot |
| Partner logo alt | Partnership Section → partners[] | logoAlt | String, required |
| Partner logo order | Partnership Section → partners[] | order | Number |
| Partner URL | Partnership Section → partners[] | url | URL, optional |
| Partnership type title | Partnership Section → types[] | title | String, required |
| Partnership type description | Partnership Section → types[] | description | Text, required |
| Partnership type features | Partnership Section → types[] → features[] | String array |
| Partnership type icon key | Partnership Section → types[] | iconKey | String, dropdown |
| Partnership type color | Partnership Section → types[] | color | String, CSS var |
| Partnership type accent | Partnership Section → types[] | accent | String, CSS var |
| Partnership type order | Partnership Section → types[] | order | Number |

## Get In Touch

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Section title | Get In Touch | sectionTitle | String, required |
| Intro text | Get In Touch | intro | Text, required |
| Contact detail title | Get In Touch → contactDetails[] | title | String, required |
| Contact detail content | Get In Touch → contactDetails[] | content | String, required |
| Contact detail link | Get In Touch → contactDetails[] | link | String |
| Contact detail link label | Get In Touch → contactDetails[] | linkText | String |
| Contact detail external flag | Get In Touch → contactDetails[] | external | Boolean |
| Contact detail icon key | Get In Touch → contactDetails[] | iconKey | String, dropdown |
| Contact detail order | Get In Touch → contactDetails[] | order | Number |
| Socials heading | Get In Touch | socialsHeading | String |
| Social platform | Get In Touch → socials[] | platform | String, dropdown |
| Social handle | Get In Touch → socials[] | handle | String |
| Social URL | Get In Touch → socials[] | url | URL |
| Social icon class | Get In Touch → socials[] | iconClass | String |
| Social color | Get In Touch → socials[] | color | String, CSS var |
| Social order | Get In Touch → socials[] | order | Number |
| CTA title | Get In Touch | ctaTitle | String |
| CTA description | Get In Touch | ctaDescription | String |
| Consultation URL | Get In Touch | consultationUrl | URL |
| Book Now label | Get In Touch | bookNowLabel | String |
| Call URL | Get In Touch | callUrl | String |
| Call label | Get In Touch | callLabel | String |
| CTA note | Get In Touch | ctaNote | String |

## Footer

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Logo image | Footer | logo | Image, hotspot |
| Logo alt text | Footer | logoAlt | String, required |
| Social platform | Footer → socials[] | platform | String, dropdown |
| Social URL | Footer → socials[] | url | URL |
| Social icon class | Footer → socials[] | iconClass | String |
| Social color | Footer → socials[] | color | String, CSS var |
| Privacy link path | Footer | privacyLink | String |
| Privacy link label | Footer | privacyLabel | String |
| Copyright text | Footer | copyrightText | String |

## Privacy Policy (/privacy-policy)

| Site Location | Studio Path | Field Name | Notes |
|--------------|-------------|------------|-------|
| Back to Home label | Privacy Policy | backToHomeLabel | String, required |
| Eyebrow label | Privacy Policy | eyebrow | String |
| Page title | Privacy Policy | title | String, required |
| Effective date | Privacy Policy | effectiveDate | String |
| Last updated date | Privacy Policy | lastUpdated | String |
| Policy body | Privacy Policy → body | Portable Text array | Rich text, custom serializers |

## Studio-Managed (Not Seeded)

The following documents exist in Sanity Studio but are NOT managed by the seed script. Editing them directly in Studio is required:

| Document | Studio Path | Notes |
|----------|-------------|-------|
| Hero | Page Sections → Hero | `_id: hero-singleton` |
| Service: Creative Content | Collections → Services | `_id: service-creative` |
| Service: Motion Graphics | Collections → Services | `_id: service-motion` |
| Service: Graphic Design | Collections → Services | `_id: service-graphic` |
| Service: Event Coverage | Collections → Services | `_id: service-event` |
| Service: Hotels & Resorts | Collections → Services | UUID doc |
| Service: Real Estate | Collections → Services | UUID doc |
| Service: Events | Collections → Services | UUID doc |
| Service: Retail & Shopping Malls | Collections → Services | UUID doc |

## Known Content Notes

- Header nav label "partnerships" is lowercase (pre-existing, preserved as-is)
- `public/index.html` SEO meta tags are static HTML, not driven by Sanity (deferred phase)
- ErrorBoundary fallback text stored in CMS but not consumed (class component limitation)
- Team members collection exists but no members are rendered on the site (group photo only)
- `portfolioData.js` in `src/data/` is unused, kept as fallback seed source only
- `partnerImages.jsx` in `src/components/Partnership/` is unused, kept as fallback seed source only
