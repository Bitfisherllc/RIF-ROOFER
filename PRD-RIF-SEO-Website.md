# PRD — RIF SEO-First Website (Region / County / City / Towns)

## About RIF

**RIF (Roofing Installation Framework)** is a Florida-based roofing installation network built around quality control, installer accountability, and distributor-backed materials.

RIF is not just a lead-generation site and not a generic roofing directory. Its primary purpose is to connect homeowners and property owners with certified, trained roofers who install stone-coated metal roofing systems correctly and consistently across Florida.

RIF operates as a component of a larger roofing distribution operation. Because of this, RIF-backed projects benefit from distributor-level (wholesale) pricing on materials, faster access to inventory, and priority material availability after storms or during high-demand periods.

RIF manages and supports a network of roofing companies ("roofers") throughout Florida. Some roofers are designated as "Preferred Roofing Contractors." Preferred roofers are vetted, trained on specific products, and expected to meet higher standards for installation quality, code compliance, and professionalism. **Preferred roofers should always be displayed first on the website.** Other roofers may still appear in the directory but are listed after preferred contractors.

**RIF Contact Information:**
- Cell: 813-777-8272
- Office: 813-803-4599
- Warehouse: 8037 Treiman Blvd, Webster, FL 33597

## 1) One Sentence Summary

Build a fast, Google-friendly website where every location (region, county, city, town) has its own optimized page for stone-coated metal roofing services, connected through a clean hierarchy and strong internal linking so it ranks for local roofing searches across Florida.

## 2) Primary Goal

Rank in Google for searches like:

- "roof replacement in [city]"
- "roofer near [town]"
- "metal roofing [county]"
- "stone-coated metal roofing in [region]"
- "storm damage roofing [location]"
- "new roof [city]"
- "roof repair [county]"
- "best roofer in [city]"

**Target search categories:**
- New roof
- Roof replacement
- Roof repair
- Roofer / roofing contractor
- Storm damage roofing
- Metal roofing
- Stone-coated metal roofing

Everything is designed to:

- Create lots of indexable pages that are not thin
- Make Google understand the location hierarchy
- Make it easy for users (and Google crawlers) to move around the site
- Position RIF as the authoritative source for stone-coated metal roofing in Florida

## 3) What We Are Building First (SEO Pages Only)

We will build front-end public pages and SEO structure first:

- ✅ Location pages (Region, County, City, Town) with localized roofing content
- ✅ Roofer profile pages (individual roofer pages)
- ✅ Roofer directory pages (all roofers, filtered by location)
- ✅ Guides (evergreen posts about stone-coated metal roofing, storm damage, etc.)
- ✅ Basic roofer directory/listing display (even if managed manually at first)

We ARE building:

- ✅ Administrative backend for managing roofers, service areas, and SEO metadata
- ✅ Roofer management (add/edit, preferred status, hide/show, service area assignment)
- ✅ Display order controls

We are NOT building yet:

- ❌ User accounts (homeowners)
- ❌ Reviews/ratings
- ❌ Lead submission forms
- ❌ Complex workflows

## 4) Site Structure: Location Hierarchy

### Location levels (required)

1. **Region** (e.g., Sun Coast, Panhandle, Central Florida, South Florida)
2. **County** (e.g., Miami-Dade, Orange, Hillsborough)
3. **City** (e.g., Miami, Orlando, Tampa)
4. **Town** (or community / neighborhood where relevant)

### Each level must have:

- Its own page
- **Real, localized content** about:
  - Climate conditions (humidity, storms, hurricanes, coastal exposure)
  - Local landmarks and geography
  - Regional building challenges
  - Roofing considerations specific to that area
- Clear links to parent + children pages
- Location-specific roofer listings (preferred first, then others)
- Content explaining why stone-coated metal roofing works well in that area

### Key rule

A Town must belong to a City or County, and a City must belong to a County, etc. (Even if you later add exceptions, start with clean rules.)

### Content Quality Requirements

- All content must sound natural, accurate, and written by someone who understands Florida roofing
- Never generic or marketing-heavy
- Must reference real climate conditions, landmarks, and local context
- Professional, trustworthy, practical, informational tone
- Never salesy or exaggerated

## 5) SEO Page Types (What Pages Exist)

### A) Location Pages

These pages target searches like:

- "roofers in Miami-Dade County"
- "metal roofing in Orlando"
- "stone-coated metal roofing near Winter Park"
- "roof replacement [city]"

**Templates by level:**

- Region page template (e.g., "Roofers in South Florida")
- County page template (e.g., "Roofers in Orange County")
- City page template (e.g., "Roofers in Orlando")
- Town page template (e.g., "Roofers in Winter Park")

Each location page must include:
- Real localized content about climate, geography, and roofing challenges
- Why stone-coated metal roofing works well in that area
- List of roofers serving that area (preferred first)
- Links to parent/child locations

### B) Roofer Profile Pages

Individual pages for each roofer in the network.

**URL pattern:** `/roofers/[roofer-slug]/`

**Content includes:**
- Roofer name, contact info, license number
- Service areas (regions, counties, cities)
- Preferred badge (if applicable)
- About/description
- Links to service area pages

### C) Roofer Directory Pages

**URL patterns:**
- `/roofers/` (all roofers)
- `/roofers?region=[slug]` (filtered by region)
- `/roofers?county=[slug]` (filtered by county)
- `/roofers?city=[slug]` (filtered by city)

**Display rules:**
- Preferred roofers always shown first
- Then other roofers
- Sort by: is_preferred DESC, sort_override ASC, name ASC

### D) Guides / Articles

Evergreen content that:

- Ranks for broader searches
- Links into location pages and roofer pages
- Builds authority and trust

**Examples:**

- "How to Choose a Roofer After a Hurricane"
- "What to Know About Stone-Coated Metal Roofing in Florida"
- "Understanding Florida Building Code Requirements for Roofing"
- "Storm Damage Roofing: What to Do First"
- "Energy Efficiency Benefits of Metal Roofing in Florida"

All guides should link to relevant location pages and roofers.

## 6) URL Structure (SEO-Friendly)

Must be consistent and readable.

### Recommended pattern:

- **Region:** `/service-areas/[region-slug]/` (e.g., `/service-areas/south-florida/`)
- **County:** `/service-areas/[region-slug]/[county-slug]/` (e.g., `/service-areas/south-florida/miami-dade/`)
- **City:** `/service-areas/[region-slug]/[county-slug]/[city-slug]/` (e.g., `/service-areas/south-florida/miami-dade/miami/`)
- **Town:** `/service-areas/[region-slug]/[county-slug]/[city-slug]/[town-slug]/`
- **Roofer profile:** `/roofers/[roofer-slug]/`
- **All roofers:** `/roofers/`
- **Guides:** `/guides/[guide-slug]/`

### Rules

- Lowercase
- Hyphens, not underscores
- No duplicate pages with different URLs
- If duplicates happen, use canonical URLs (important)
- Slugs must be unique per parent (county slug unique per region, city slug unique per county)

## 7) Page Layout Requirements (What Each Page Contains)

### A) Location Page Layout (Region / County / City / Town)

Each location page must include:

1. **H1 headline**
   - "Roofers in [Location Name]"

2. **Intro summary (unique, localized)**
   - 2–5 short paragraphs explaining:
     - The location context (real landmarks, geography)
     - Climate conditions (humidity, storms, hurricanes, coastal exposure)
     - Regional building challenges
     - Roofing considerations specific to that area

3. **Roofing challenges section**
   - Location-specific challenges (hurricane resistance, salt air, humidity, etc.)
   - How these affect roofing decisions

4. **Why stone-coated metal roofing works section**
   - Explain why this roofing type is well-suited for the area's conditions
   - Wind resistance, corrosion resistance, energy efficiency, durability

5. **Areas we serve section**
   - Links to child locations (counties within region, cities within county, etc.)

6. **Roofers in [Location] section**
   - **Preferred roofers first** (clearly marked)
   - Then other roofers
   - Each roofer card shows: name, phone, website, preferred badge (if applicable), link to profile

7. **FAQ section (location-specific)**
   - 5–10 FAQs that mention the location naturally
   - Questions about roofing in that specific area

8. **Last updated date**
   - Helps trust and freshness signals

### B) Roofer Profile Page Layout

Each roofer profile page must include:

1. **H1 headline**
   - Roofer name
   - Preferred badge (if applicable)

2. **Contact information**
   - Phone (clickable)
   - Email (clickable)
   - Website (clickable, opens in new tab)
   - License number

3. **About section**
   - Roofer description/about text

4. **Service areas**
   - List of regions, counties, and cities served
   - Links to service area pages

5. **Related roofers**
   - Links to other roofers in the same service areas

### C) Guides / Articles Layout

Each guide must include:

1. **H1 headline**
   - Clear, descriptive title

2. **Introduction**
   - What the guide covers

3. **Main content**
   - Well-structured with H2/H3 headings
   - Practical, actionable information

4. **Internal links**
   - At least 5–10 links to relevant location pages and roofer pages

5. **Related guides**
   - Links to other relevant guides

## 8) Internal Linking Strategy (Non-Negotiable for SEO)

Internal linking is the "engine" of this site.

### Required link connections:

- **Region →** all counties + roofers serving the region
- **County →** major cities + towns + roofers serving the county + region page
- **City →** towns + roofers serving the city + county page + region page
- **Town →** city page + county page + region page + roofers serving the town
- **Roofer profile →** all service area pages (regions, counties, cities served)
- **Guide →** at least 5–10 links into relevant location pages and roofer pages
- **Location page →** parent location + child locations + roofers + related guides

### Navigation must support:

- Breadcrumbs on every location-based page and roofer page
- "Browse by location" (service areas) navigation
- "Browse roofers" navigation
- "Browse guides" navigation
- Links to nearby/sibling locations on each location page

## 9) SEO Metadata Requirements (Every Indexable Page)

Every page must have editable:

- ✅ SEO title (page title)
- ✅ Meta description
- ✅ URL slug rules (auto but clean)
- ✅ Open Graph (social sharing title/description/image)
- ✅ Canonical URL
- ✅ Index/noindex controls (for thin/duplicate pages)

### Sitewide SEO essentials

- ✅ XML sitemap automatically generated
- ✅ Robots.txt
- ✅ Clean 404 page with helpful navigation
- ✅ Redirect support for renamed pages (even if manual at first)

### SEO Best Practices

Must follow **Google Search Essentials** and **Yoast SEO best practices**:

- Clear page hierarchy (H1 once, then H2/H3)
- Clean URLs
- Proper meta titles and descriptions
- Internal linking between regions, counties, cities, and roofers
- Outbound links to authoritative sources:
  - Florida Building Code references
  - County permitting offices
  - FEMA resources
  - Other relevant government/authority sites
- Proper use of headings and alt text
- Natural keyword usage without stuffing
- Mobile-first design

## 10) Structured Data (Schema) Requirements

We want Google to understand:

- Locations
- What each page is
- FAQs

### Minimum schema targets:

- ✅ Breadcrumb schema (every page)
- ✅ FAQ schema (where FAQ exists)
- ✅ Organization/Website schema (sitewide)
- ⏳ Where relevant later: local business / place / service schemas (only if accurate)

(You can implement progressively, but plan the page layout so it's easy to add.)

## 11) Content Rules to Avoid "Thin Pages"

**This is critical.**

A page should not be published/indexed unless it has at least:

- ✅ Unique intro text (localized, not generic)
- ✅ Real content about the location (climate, geography, challenges)
- ✅ Meaningful roofer listings (at least 1 roofer, or explanation if none)
- ✅ FAQs or "how to" steps (location-specific)
- ✅ Internal links to related pages
- ✅ Content explaining why stone-coated metal roofing works in that area

### Content Quality Standards

- Must reference real climate conditions, landmarks, and local context
- Professional, trustworthy, practical, informational tone
- Never salesy or exaggerated
- Written by someone who understands Florida roofing
- Natural keyword usage without stuffing

### If a page is too thin:

- Keep it as draft OR publish but set to noindex until it's filled out

## 12) Programmatic SEO (Scaling Locations Without Killing Quality)

Because you'll have many locations, you'll use consistent templates—but you must avoid copy/paste footprints.

### Allowed to reuse:

- ✅ Section structure
- ✅ Headline formulas
- ✅ Layout
- ✅ General information about stone-coated metal roofing benefits

### Must be unique:

- ✅ Intro paragraphs (must reference real local conditions, landmarks, geography)
- ✅ Climate and roofing challenges (location-specific)
- ✅ Why stone-coated metal roofing works (tailored to area's specific conditions)
- ✅ Roofer listings (naturally unique per location)
- ✅ FAQs (location-specific wording and context)
- ✅ Nearby/related links are naturally unique

### Content Template Strategy

Use the reusable text template (`app/templates/roofers-in-area-template.md`) as a starting point, but customize:
- Replace all placeholders with real location data
- Add real landmarks, nearby cities, local geography
- Reference actual climate data for the area
- Include location-specific building code considerations

## 13) Performance Requirements (SEO Depends on This)

- ✅ Mobile-first layout
- ✅ Fast pages (compressed images, minimal heavy scripts)
- ✅ Clean HTML structure and headings (H1 once, then H2/H3)

## 14) Launch Requirements

### Minimum viable SEO launch content

Pick ONE region to start and launch with:

- 1 Region page (e.g., South Florida)
- 5–10 County pages within that region
- 10–30 City pages within those counties
- 5–10 Roofer profile pages (mix of preferred and regular)
- 10–20 Guides about stone-coated metal roofing, storm damage, etc.
- Each page has:
  - Unique, localized content
  - SEO metadata (title, description)
  - Internal links
  - FAQs (where applicable)

### Post-launch cadence

- Add new towns/cities weekly
- Add new roofers as they join the network
- Refresh top pages monthly ("last updated" changes when meaningful edits occur)
- Add new guides monthly

## 15) Acceptance Criteria (Done Means…)

The SEO foundation is "done" when:

- ✅ Every location level has a working page with real, localized content
- ✅ All pages link correctly up/down the hierarchy
- ✅ Roofer profile pages exist and are linked from service area pages
- ✅ Preferred roofers always display first
- ✅ Titles/meta descriptions are present everywhere
- ✅ Breadcrumbs exist everywhere
- ✅ Sitemaps/robots/canonicals are correct
- ✅ Site is mobile-friendly and fast
- ✅ All content follows Google Search Essentials and Yoast SEO best practices
- ✅ Content sounds natural, professional, and trustworthy (not generic or salesy)
- ✅ Administrative backend allows full management of roofers, service areas, and SEO metadata

---

## Technical Implementation Notes

### Page Generation Strategy

1. **Location Pages:** Generated from location data (region → county → city → town hierarchy)
2. **Roofer Profile Pages:** Generated from roofer data with service area relationships
3. **Roofer Directory Pages:** Dynamic pages filtered by location
4. **Guides:** CMS-managed evergreen content

### Content Management

- Administrative backend for managing:
  - Roofers (add/edit, preferred status, hide/show, service areas)
  - Service areas (regions, counties, cities, towns)
  - SEO metadata per page
  - Display order controls
- Start with manual content entry for location-specific content
- Plan for CMS integration later for guides
- Ensure all content fields support the required page sections

### SEO Tools Integration

- Sitemap generation (XML)
- Robots.txt management
- Canonical URL handling
- Meta tag management per page
- Schema markup injection (Breadcrumb, FAQ, Organization)

### Quality Control

- Content review workflow before publishing
- Thin page detection and noindex flagging
- Duplicate content detection
- Internal link validation
- Preferred roofer display validation (always first)

### Business Data Integration

- RIF contact information displayed consistently:
  - Cell: 813-777-8272
  - Office: 813-803-4599
  - Warehouse: 8037 Treiman Blvd, Webster, FL 33597
- Roofer contact information (phone, email, website, license number)
- Service area assignments (roofers can serve multiple regions/counties/cities)

### Display Rules (Critical)

- **Preferred roofers must always appear first** in any listing
- Sort order: `is_preferred DESC, sort_override ASC NULLS LAST, name ASC`
- Hidden roofers (`is_hidden = true`) must never appear on public pages
- Service area pages show roofers serving that specific area


















