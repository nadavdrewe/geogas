# GeoGas section-by-section UI improvement goal

Goal activated: 23 October 2026.
Baseline: `df867c7` is deployed, with matching local and GitHub source.

The shared UI refresh is a foundation. It does not count as a completed individual
review of every section. Check an item only after a specific improvement, desktop
and mobile verification, and a successful deployment. Preserve copy, pricing,
legal wording and existing functions. Record limitations explicitly.

## Shared interface

- [ ] Header, emergency strip, navigation and search
- [ ] Mobile menu, focus, touch targets and responsive navigation
- [ ] Breadcrumbs and inner-page engineer introductions
- [ ] Buttons, links, focus, disabled and loading states
- [ ] Forms, validation, error and success states
- [ ] Newsletter, footer, WhatsApp and back-to-top controls

## Homepage, in reading order

- [ ] Competition hero and call-to-action hierarchy
- [ ] Service shortcuts and transition into assistance
- [ ] Customer assistant introduction and quick topics
- [ ] Conversation, message presentation, composer and status
- [ ] Assistant callback disclosure and lead form
- [ ] Services carousel, cards and navigation
- [ ] Home rescue contracts and included benefits
- [ ] Current pricing, rate cards, explanatory note and actions
- [ ] Everyday heroes / solutions and animated boiler presentation
- [ ] Call-out process
- [ ] FAQs
- [ ] Team introduction, profiles and disclosures
- [ ] Reviews and external review links
- [ ] Booking / quotation section and form
- [ ] Installation video gallery
- [ ] Comic / storyboard section
- [ ] Newsletter and footer transitions

## Public page families

For each page review its hero, every content group, actions, forms, shared ending
and mobile stacking. Expand rows into sub-checklists when starting that page.

- [ ] `/services`: cards, highlights, checks, limits and contact panels
- [ ] `/pricing`: navigation, hourly rates, services, installations, upgrades, electrical, contracts and CTA
- [ ] `/contracts`: navigation, introduction, helpline, benefits, plans, landlord cover,
      service checks, exclusions, terms, clause index, FAQs, brochure and reputation
- [ ] `/about`: introduction, founder message, stats, benefits, plans and reputation
- [ ] `/contact`: contact channels, form, supplementary information and booking guidance
- [ ] `/competition`: campaign, entry form, eligibility and terms
- [ ] `/faq`
- [ ] `/help-and-advice`
- [ ] `/guides`
- [ ] Dynamic service / brand / location pages rendered by `/[slug]`
- [ ] Dynamic guide / advice pages rendered by `/[slug]`
- [ ] `/search`: initial, results, empty and error states
- [ ] `/testimonial`
- [ ] `/projects` and `/projects-details`
- [ ] `/blog-grid`, `/blog-standard` and `/blog-details`
- [ ] `/services-details`
- [ ] `/index-two` legacy public homepage
- [ ] `/error` and not-found experience

The authenticated admin interface is outside the public-site goal.

## Batch acceptance

## Implementation coverage (not final acceptance)

| Area | Development implementation | Final acceptance |
| --- | --- | --- |
| Homepage hero, shortcuts, assistant, services | Updated | Pending visual/interaction review |
| Homepage contracts, prices, solutions, process | Updated | Pending visual/interaction review |
| Homepage FAQ, team, reviews, contact, videos, story, newsletter | Updated | Pending visual/interaction review |
| Header navigation, search, contact panels, forms, footer, WhatsApp | Updated in baseline plus development batches | Pending visual/interaction review |
| Breadcrumbs, engineer introductions, shared buttons/back-to-top | Baseline refresh retained | Pending combined regression review |
| Services, pricing, contracts, about, contact | Updated by content group | Pending visual/interaction review |
| Competition page and popup | Updated | Pending visual/interaction review |
| FAQ, help/advice, guides hub | Updated through shared FAQ and topic navigation | Pending visual/interaction review |
| Six dynamic service/guide page templates | Updated | Pending visual/interaction review |
| Search initial/results/no-results/filter states | Updated; HTTP responses checked | Pending visual/interaction review |
| Legacy blog/project/detail/testimonial/alternate-home routes | Redirects to current pages; no independent layout | Confirm destination visually |
| Not-found recovery | Updated | Pending visual/interaction review |

## Release requirements

User steering: continue implementation across sections and perform the full
desktop/mobile verification at the end. Unchecked items may have development
changes; they are not declared complete until final verification and deployment.

- Relevant improvements are implemented in the development project.
- Review at 390px mobile and 1440px desktop, with additional widths when needed.
- Exercise relevant controls without submitting fake production enquiries.
- Run required lint, typecheck, audit and production build checks.
- Check staged diff and ignore rules for secrets and incident indicators.
- Push, deploy with existing rollback support, verify app and HTTPS health.
- Record deployed commit and evidence here before marking a section complete.

## Operational notes

- Production remains `vmi3265899`, `100.120.62.90` / `80.241.219.144`.
- The operator's current public IP was present in AutoBlock during the previous
  release. Tailscale remains functional; do not broaden firewall access for UI QA.
- Use Tailscale SSH and hostname-validated HTTPS via Tailscale for release checks
  while that public-IP condition persists. Record this verification limitation.

## Progress log

- Goal setup: inventoried homepage components and public routes; established this
  checklist. Next batch: assistant visual hierarchy, message/composer readability
  and accessible conversation status. No individual section marked complete yet.
- Assistant batch in development: simplified shell and quick topics, readable
  message spacing and timestamps, visible question label, keyboard-scrollable
  conversation log and busy/error semantics. Callback inputs now have persistent
  labels, appropriate telephone/autofill types and announced success/errors.
- Initial local page rendered with the named assistant region and conversation
  heading. Subsequent visual checks were stopped by Work settings reporting
  "Local browser use is disabled in Work settings". Desktop/mobile visual review
  and interaction checks remain pending; this batch is not deployed or marked
  complete. Production remains at `df867c7`.
- Final assistant batch checks: lint, TypeScript, dependency audit (zero reported
  vulnerabilities) and production build all passed after callback-form changes.
  Saved on `codex/assistant-section-refresh`; visual acceptance remains pending.
- Browsing batch in development: service position follows actual slides rather
  than hover; slideshow is opt-in with play/pause, stops on keyboard focus or
  previous/next interaction, respects reduced motion, uses Swiper accessibility
  support and specific service link names. Controls have larger touch targets.
- FAQ browsing now starts with four questions and an explicit show-all control,
  with all answers retained and direct question links revealing the target.
  Removed the nested desktop scrolling area. Full FAQ page shows every question.
- Preview access rechecked: still disabled in Work settings. These changes remain
  development-only pending interaction and desktop/mobile visual review.
- Shared ending batch in development: newsletter fields have persistent labels,
  unique IDs and autofill semantics; footer is a named landmark with named link
  groups and icon links; contact text can wrap without forced title casing.
  WhatsApp has Escape/close focus return, a larger close target and darker action
  colours for legibility. Newsletter input colours are explicit on dark surfaces.
- Full verification passed after these shared changes: lint, typecheck, zero
  dependency audit findings and production build. Browser access is still disabled;
  no visual acceptance or deployment claimed. The three development batches must
  be reviewed together before merging to `main`.
- Continued implementation per user direction with final visual review deferred.
  Homepage campaign hierarchy, shortcuts, contracts, rate cards, ordered call-out
  process, team cards, booking text, gallery and storyboard received individual
  layout/type/spacing improvements. Reviews now render as a stationary responsive
  grid, preserving every customer story. Team images below the fold are lazy;
  videos fetch on interaction rather than all preloading metadata. Decorative
  imagery is excluded from spoken content and gallery links identify each clip.
  Solutions/boiler illustration and inner-page families remain to be addressed.
- Solutions metrics now use clearer card grouping. Boiler demonstration has a
  pause/resume control; phase updates and decorative animations pause together,
  and reduced-motion preferences stop automatic phase changes. These are
  development changes awaiting the final interaction/visual review.
- Inner-page implementation batch: Services has section navigation, specific
  card-link names, compact service cards and clearer support/limits panels.
  About has section navigation, balanced image/copy proportions, founder quote,
  stats, cover and reputation styling. Help & Advice has a topic index and more
  readable article spacing. Pricing item/value pairs now use definition-list
  semantics; summary, contract panel, hourly rates, all four price groups and
  closing CTA receive specific spacing and type refinements.
- Contracts implementation covers introduction, helpline, benefits, package
  headers, checks/exclusions, term highlights, breakdown cards, clause index,
  FAQs, brochure previews/viewer links and reputation cards. Brochure previews
  show the whole page instead of cropping it. Contact implementation covers
  channel cards, urgent-contact emphasis, wrapping details, badges and form intro.
- All preceding entries describe development implementation only. End-to-end
  visual and interaction verification is deferred until the final review per user
  instruction. No new items are checked complete or deployed yet.
- Discovery implementation: search has a persistent input label, named search
  landmark, current-filter semantics and specific result link names. New searches
  reset the previous category so a stale filter does not silently hide matches.
  Initial/results/no-results chips, result cards and highlighting have clearer
  spacing, contrast and touch targets.
- Guides hub has topic navigation. All six dynamic templates share a section
  index, readable body/list/FAQ styles, related links, contact sidebar, review
  cards and closing CTA styling. Guide summary label now says Topic rather than
  exposing the internal term Target keyword. Page copy/data otherwise retained.
- Competition implementation: opt-in gallery motion, pause on manual/focus
  interaction, larger artwork controls, clearer entry-form spacing and terms.
  Not-found screen now provides a labelled search form and recovery guidance.
- Route audit: `/blog-grid`, `/blog-standard`, `/blog-details` redirect to
  `/guides`; `/projects`, `/projects-details`, `/services-details` to `/services`;
  `/testimonial` to `/about`; `/index-two` to `/`; `/error` invokes notFound.
  These routes have no separately rendered legacy sections to redesign. Confirm
  redirect responses in final verification instead of editing unused components.
- Discovery batch verification: lint, typecheck, dependency audit (zero findings)
  and production build pass. Inspected 64 generated HTML pages: all 138 generated
  guide/category/service/about section links have exactly one matching target.
  This confirms anchor wiring only; it does not substitute for final visual and
  browser interaction review.
- Final shared-control batch: header search and contact panels are inert while
  closed; opening locks background scroll, puts focus inside the panel, traps Tab,
  supports Escape and restores focus on close. Search has a visible label and
  redesigned responsive composer. Contact forms expose busy state and autofill
  hints. Competition popup has opt-in artwork rotation and larger controls.
- Combined lint/typecheck/audit/build pass after shared-control changes. Local
  production server tested across 61 routes and four search states. Recovery
  routes return 404 and include the new search UI on recheck (the first cold
  request to `/error` did not contain the recovery marker; recheck did).
  Final browser review is still required; no UI success inferred from HTTP alone.
- Browser access restored for the next refinement pass. Reviewed homepage
  assistant/services/process at desktop width and contracts, pricing, team,
  customer stories, contact, video gallery, storyboard and newsletter at 390px.
  Services, Pricing and Guides inner-page mobile layouts also inspected.
- Fixed three broken process SVG sources, replaced missing WhatsApp/font-based
  cover artwork with inline icons, and corrected the mobile current-page link
  contrast. Mobile contract benefits now use compact separators rather than
  stacked boxes; team introduction has breathing room before its action.
- Verified service next/play/pause controls, mobile-menu Escape/focus restoration,
  and direct linking to the initially hidden FAQ item 10 (expanded and scrolled
  into view). Invalid saved chatbot timestamps now fall back safely.
- This is partial browser QA, not final whole-site sign-off. Development changes
  remain separate from live. The production SSH health check timed out this pass;
  no production changes were attempted.
- Search-overlay visual testing exposed a focus timing issue during its opening
  transition. The shared focus hook now handles delayed visibility and keyboard
  focus arriving from outside the panel. Confirmed search-input focus and a
  `boiler` search returning 24 results in the browser.
- Upgraded Nodemailer from 10.0.10 to 10.2.1 after the current audit reported
  address-parser advisories. Dependency audit now reports zero vulnerabilities.
- Full lint/typecheck/audit/production-build verification passed again after the
  focus fix. HTTPS from this operator connection also timed out, so live health
  could not be established; this alone does not prove the public site is down.
- Contracts follow-up: converted the seven detailed term topics and six contract
  FAQs to native disclosures with explicit expand/collapse-all controls. Benefits,
  comparison plans, exclusions and clause summaries remain visible. All original
  term and FAQ wording is retained in the rendered page.
- Verified individual FAQ opening, all six FAQ expansion/collapse, keyboard Enter
  on Service Limits, all seven term expansion, and desktop/mobile presentation.
  Reviewed About introduction and Contact content at 390px, plus Boiler Repair
  hero at desktop and its first content section at mobile width.
- Mobile decorative AOS entrance delays removed after observing temporary blank
  sections during anchor navigation. Full lint/typecheck/audit/build passed.
  Browser control became disabled again before the planned 360px service FAQ
  check; that narrower-width review remains outstanding.
- Service/advice consistency follow-up: all six dynamic templates now use the
  same native FAQ disclosure component as Contracts. Contents navigation includes
  FAQ and related-page shortcuts when those sections exist. Empty groups are
  omitted, and contact sidebars no longer repeat phone links immediately above
  identical labelled call buttons. Both office numbers/actions are retained.
- Added `npm run test:public-output` to the verification pipeline. Current build
  passes checks across 64 generated pages, 227 contents anchors and 42 FAQ pages.
  Lint/typecheck/audit/build passed for the shared component changes. Browser
  access remains disabled; this batch is not visually signed off or deployed.
- Release preparation (24 October): SSH restored by selecting the saved Gmail
  tailnet; confirmed hostname vmi3265899, clean production main at df867c7 and
  upstream/TLS health 200. User requested deployment and removal of the automatic
  competition popup. Removed its global mount; competition page remains intact.
  Added a generated-HTML regression check against popup close-control markup.
- Release deployed: application commit `0c34f1e` is on production and GitHub main.
  Windows dependency replacement required stopping the watchdog to release its
  loaded SWC binary; clean installation and audit then succeeded. The existing
  rollback-capable deployment built and promoted successfully.
- Verified `/`, `/boiler-repair`, `/contracts`, `/competition`, `/pricing` and
  `/contact` return 200 both from localhost upstream and HTTPS via the Gmail
  tailnet with normal certificate validation. Live source no longer mounts the
  popup; the competition route remains available. Service still listens only
  on 127.0.0.1:15023. Final visual sign-off remains outstanding because browser
  control is disabled; deployment health does not replace that review.
- Public-access incident after release: upstream and HTTPS through Tailscale
  were healthy, but the operator public IPv4 137.220.68.144 was in both automatic
  block rules. Added only that confirmed current operator address to the existing
  trusted-IP file and reran the blocker. Both rules remain enabled with 999 other
  addresses blocked. Public HTTPS from the operator connection then returned 200
  for all six tested routes, without a private-address override.
- Additional API sweep found campaign GET attempted SQLite writes despite the
  low-privilege runtime having read-only database access. Changed public campaign
  reads to a read-only connection with phase-1 fallback for absent settings; no
  database ACL expansion. Administrative update behaviour is unchanged.
