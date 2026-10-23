# Site UI refresh

Baseline: local development, GitHub and production are clean at `3c1070e`.
Development directory: `GeoGas-development`; branch: `codex/site-ui-refresh`.

## Direction

Keep existing copy, pricing, contracts, campaign and functionality. Use a consistent
red primary action, neutral secondary action, quieter card surfaces, readable
headings and responsive spacing throughout public pages. Preserve the illustrated
brand and make service discovery easier alongside the homepage competition.

## Implementation

1. Add four homepage shortcuts for services, pricing, cover and booking.
2. Apply one final, scoped public-site style layer to controls, section spacing,
   service cards, pricing, contracts, editorial cards and shared navigation/footer.
3. Reduce repeated inner-page hero height, particularly on phones.
4. Mark current navigation links, make closed mobile navigation inert, support
   Escape and return focus to the opener. Add an accessible skip link.
5. Correct the scroll-to-top control so it respects reduced motion and does not
   reset scroll on every mount.

## Verification and release

Run repository verification, review desktop/mobile public routes and navigation,
check staged files for secrets/IOCs, merge to main and push. Deploy with the
existing rollback-capable production script, then verify HTTPS and app health.
Do not copy environment files or mutable production databases into Git.

## Validation record

- Reviewed homepage, services, contracts, pricing, about, contact, boiler repair
  and guides at 390px; representative inner pages also checked at 1440px.
  No horizontal overflow found. Mobile menu open/Escape/focus return checked.
- Updated Next.js and matching ESLint config to 16.4.3, Sharp to 0.35.5 and
  vulnerable transitive dependencies after the current audit reported advisories.
- Lint, TypeScript, dependency audit and production build passed; audit reports
  zero vulnerabilities. Local Node is 26; the production build also validates
  against the server runtime before promotion.
