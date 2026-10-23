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
