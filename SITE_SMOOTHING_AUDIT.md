# Site smoothing audit

Audit date: 19 July 2026. This is an inspection report only; it does not change the live site.

## Recovery check

- Recovery branch: `recovery/live-20260719` (currently `5dfa11da`; recovery base `db7e0e0a`).
- A fresh server snapshot contains the same 1,923 versioned source and asset paths as that branch. The only intentional branch differences are line-ending normalisation and `.gitignore` rules that protect deployment state.
- Every non-text asset in the comparison matched byte-for-byte. All 51 URLs in the live sitemap and all 67 discovered internal public targets returned successful HTTP responses.
- The live deployment reads content from an ignored SQLite database. The branch now seeds a fresh database from the 48 versioned JSON documents; the live database has 49 documents (one site document, six defaults, and 42 SEO pages).
- Sixteen live SEO database records differ from their versioned JSON files. The live versions introduce visible copy defects such as `London and Sussex and Sussex`; the versioned JSON is generally the cleaner candidate. The one published site-content difference is a small contact meta-description wording change.

## Van-image check — passed, but centralise it

All active van placements use the same file as the home-page mobile hero:

- `components/layout/banner/BannerTwo.tsx` — home mobile hero
- `components/containers/ContactArea.tsx` — contact page
- `components/seo/SeoContactCard.tsx` — SEO landing pages

They all use `/cartoons/van1.jpeg`; `van2.jpeg` is unused. The two `*-slogans.jpeg` files in the original working tree are local-only and unused.

Before making `van1.jpeg` the permanent universal brand image, review the artwork itself: it contains very small/generated-looking vehicle text, including contact details and web addresses that are difficult to verify. Prefer an approved real-vehicle image or a corrected final artwork, then expose it through one `VAN_IMAGE` constant/component so pages cannot drift again.

## Priority fixes for the next pass

### P0 — secure the publicly exposed admin editor — fixed in branch, pending deployment

`/api/admin/documents` returned the live document index without an admin key. In this code, a missing `ADMIN_PANEL_KEY` authorises every GET and PUT request, so the public endpoint can expose and alter published content.

The branch now fails closed when the key is missing and uses a timing-safe comparison. Set a strong production `ADMIN_PANEL_KEY` before deployment, and restrict `/admin` plus its API routes at the reverse proxy or application layer. Do not test a write against production while the current live endpoint is exposed.

### P0 — make content reproducible before deploying from Git — bootstrap fixed in branch

The branch now seeds a new database from the versioned JSON source. Choose the JSON files as the canonical content source unless a reviewed database export says otherwise, add a CI parity check, and apply reviewed content to production only after admin access is secured.

### P1 — fix the visible live SEO copy drift

The currently live SEO pages repeat `London and Sussex` in titles, descriptions, links, and body copy. It appears on at least boiler-repair, gas-safety-certificate, Baxi repair, and Camden gas-engineer pages. Re-seed the reviewed versioned JSON, then regenerate the sitemap and recheck representative page titles, descriptions, H1s, and internal links.

### P1 — restore heading hierarchy — fixed in branch, pending deployment

`SubscribeArea` previously used an `h1` globally, creating duplicate H1s on most pages. The branch changes newsletter headings to `h2` and verifies one H1 on home and contact; repeat this check on production after deployment.

### P2 — remove the legacy template surface

`/index-two`, `/testimonial`, `/blog-grid`, `/blog-standard`, `/blog-details`, `/projects`, `/projects-details`, `/services-details`, and `/error` remain public. They use the older header/footer, generic assets and copy, lack page metadata/canonicals, and are visually inconsistent with current pages. `/error` is a normal HTTP 200 public route despite presenting a 404.

Keep only pages with a business purpose. Rebuild retained routes with the modern shell and content; redirect the rest and add `noindex` until removal.

### P2 — centralise business and navigation facts

Phone numbers, email, domain, service areas, and content are duplicated across `data/siteContent.ts`, `data/contractsContent.ts`, and legacy template components. Centralise these in one business-profile module, remove fallback literals from components, and derive the header, footer, contracts, SEO, chatbot, and structured data from it.

### P2 — improve interaction and accessibility consistency

The modern header uses clickable `span`/`div` controls for search and menus rather than labelled buttons, so keyboard and assistive-technology support is incomplete. Legacy components also contain generic image alternatives such as `image`, `icon`, and `banner`. Replace controls with semantic buttons, manage focus in drawers/dialogues, and give meaningful or deliberately empty image alternatives.

### P3 — clean sitemap and content governance

All live sitemap entries share one generated last-modified timestamp, rather than their actual revision date. Keep search noindexed (it already is), add accurate page revision dates, and verify the sitemap after the database/content source is repaired.

## Recommended implementation order

1. Contain the admin exposure and take a reviewed read-only export of the live content database.
2. Establish JSON as the source of truth, add database seeding and a parity test, and correct the 16 stale SEO records.
3. Choose the approved van artwork, centralise its reference, and remove/archive unused variants.
4. Replace the global newsletter H1, standardise the modern shell, and retire or redirect legacy routes.
5. Consolidate business-profile data, then complete keyboard, image-alt, desktop, and mobile visual QA.

## Validation completed

- `npm run lint` and the production build passed on the recovery source.
- Literal public asset references resolve to existing files.
- The live sitemap contains 51 working URLs; no broken public internal targets were found in the audited route set.
- The in-app visual browser was unavailable in this session, so a final manual desktop/mobile layout pass remains after the structural fixes.

## Second sweep — 19 July 2026

### Additional checks that passed

- HTTP redirects to HTTPS, the non-`www` host redirects to `www`, trailing slashes canonicalise, and an unknown page returns HTTP 404.
- The 51 live sitemap pages have unique titles, descriptions and canonical URLs; the sitemap has no broken routes.

### Additional issues found

- The public response only sets HSTS. Add a content-security policy, `X-Content-Type-Options`, a frame policy, referrer policy and permissions policy after confirming required third-party integrations.
- Contact, newsletter and chatbot-lead endpoints logged submitted personal data and returned success when their delivery webhook was absent. They had no delivery timeout.
- The old testimonial template contains lorem-ipsum copy. Its blog-comment form is actually a general contact form, and its inputs rely on placeholders rather than labels.
- Header, search, sidebar and mobile-menu triggers are clickable `span`/`div` elements instead of labelled buttons. Form inputs across the active and legacy templates need explicit labels or accessible names. Treat this as the next accessibility pass.

### Fixes started on `recovery/live-20260719`

- All admin content and upload APIs now fail closed if `ADMIN_PANEL_KEY` is missing and use timing-safe key comparison.
- Lead forms now return a temporary-unavailable response when no webhook is configured, never log submitted data, and time out outbound delivery after ten seconds.
- The van uses one `BRAND_VAN_IMAGE` constant across every active placement; both newsletter headings are now H2s.
- A fresh content database now seeds from the versioned JSON files. The clean-build route count increased from 25 to 67, and the fresh sitemap contains all 51 public URLs.

## Third sweep — 19 July 2026

### Additional findings

- The deployment batch script promotes a build generated from whatever source already exists on the Windows server. It does not pull or synchronise the Git branch, so merging a GitHub branch alone will not deploy these fixes. Establish one reviewed source-sync step before running `scripts/deploy.cmd`.
- A full Content Security Policy still needs a deliberate third-party-source inventory. It was not added automatically because an incomplete policy could break videos, maps, fonts or lead delivery.
- Legacy template routes still contain generic plumbing copy and lorem ipsum. They are now a search-engine containment issue rather than an indexing issue; redirect or remove them after deciding which, if any, remain useful.

### Fixes started in the third pass

- Added `nosniff`, frame protection, referrer policy and permissions policy response headers.
- Replaced header click targets with labelled buttons, including expanded-state information for search, contact details and mobile navigation.
- Added accessible names and live status announcements to active contact/newsletter/chatbot forms and the retained legacy comment form.
- Added safe `rel="noreferrer"` handling to remaining new-window links.
- Marked legacy template routes `noindex, nofollow` without changing their URLs or visitor access.

### Third-pass verification

- Lint and the 67-route fresh-database production build pass.
- The local production response emits the new headers, the legacy route emits `noindex, nofollow`, home still emits one H1, and the modern header/form controls expose their accessible names.
