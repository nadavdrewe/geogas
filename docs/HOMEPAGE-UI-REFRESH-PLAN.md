# Homepage UI Refresh Plan

Date: 20 September 2026  
Scope: Geo Gas homepage from the customer assistant through the footer  
Content policy: retain the existing service, contract, pricing, trust and contact content while improving hierarchy, spacing and responsive presentation.

## Baseline

- Local `main` and `origin/main` both start at `5938c15ff28e79d611d985dfeb43616b516b5f4e`.
- The supplied desktop captures show dense nested borders in the assistant, oversized gaps between later sections, inconsistent heading/card proportions and loosely grouped calls to action.
- A 390 px viewport review confirms that the assistant currently exposes the callback form before the visitor has asked a question, creating a long and intimidating first interaction.
- The homepage has many useful sections, so the redesign must establish a predictable rhythm and reduce visual noise without removing valuable content.

## Design direction

The revised homepage will use a calm, service-led visual system:

- warm white and pale slate section surfaces with restrained red/orange brand accents;
- one strong heading, one short supporting paragraph and one clear action group per section;
- consistent `clamp()`-based spacing and type so layouts scale smoothly instead of jumping between breakpoints;
- fewer nested outlines and shadows, with border and elevation reserved for interactive or high-value cards;
- compact cards with aligned footers and predictable button treatment;
- mobile-first stacking, full-width touch targets and no horizontal clipping.

## Implementation

### 1. Customer assistant

- Convert the desktop shell to a two-column layout: concise introduction/action rail on the left and the conversation panel on the right.
- Keep quick topics collapsed by default and present them as a compact drawer when requested.
- Do not show the callback form on the untouched initial greeting. It becomes available only after a relevant user conversation.
- Put callback details behind a single disclosure control so the chat remains the primary task.
- Remove redundant visual containers, tighten message spacing and retain strong focus/disabled/error states.
- On mobile, stack the introduction and conversation, collapse secondary descriptions, keep inputs/buttons at least 48 px high and make the callback form single-column.

### 2. Shared homepage rhythm

- Add homepage-only layout tokens for content width, section gap, card radius, border and shadow.
- Replace excessive fixed vertical padding with responsive `clamp()` spacing.
- Add subtle section dividers/background changes so the long page remains scannable.
- Constrain section descriptions to readable line lengths and standardise heading scale.

### 3. Services

- Tighten the heading-to-carousel gap and card padding.
- Equalise card height and align every service CTA/icon row to the bottom.
- Improve carousel overflow and mobile card width so the next item is suggested without clipping content.

### 4. Contracts

- Balance the two desktop columns and reduce the oversized heading.
- Group benefits into a cleaner checklist and keep calls to action on one deliberate row where space permits.
- Simplify the contract summary panel so its brand block, benefits and detail link read as one card.
- Stack with consistent gaps and full-width primary actions on small screens.

### 5. Pricing

- Present title, note and rate cards as a cohesive pricing section rather than separate floating blocks.
- Reduce unused space below the cards, align rate rows and make the CTA a compact closing band.
- On narrow screens, stack label/value pairs without crowding and keep pricing actions full-width.

### 6. Remaining homepage sections

- Apply the shared heading width, section spacing and card treatment to solutions, process, FAQ, team, reviews, contact, gallery/newsletter and comic-strip areas.
- Preserve their existing content and interactive behaviour.
- Reduce duplicate-looking shadows and use background alternation to distinguish adjacent sections.
- Hide the decorative custom cursor on touch/coarse-pointer devices to avoid the stray red-dot effect visible in the captures.

## Responsive targets

| Viewport | Expected layout |
| --- | --- |
| 1440 px and above | Controlled maximum width, balanced assistant/contracts columns, three-card service/pricing rows |
| 992–1439 px | Reduced gutters and type scale; two-column layouts retained only where content remains comfortable |
| 768–991 px | Assistant and contract sections stack; two-card grids where appropriate |
| 360–767 px | Single-column flow, 20 px page gutters, compact section gaps, full-width CTAs and 48 px minimum controls |

## Accessibility and quality controls

- Preserve semantic heading order, labels, live chat announcements and keyboard operation.
- Add `aria-expanded`/`aria-controls` to disclosure buttons.
- Retain visible focus states and sufficient colour contrast.
- Respect reduced-motion and coarse-pointer preferences.
- Avoid changing API behaviour, content sources, URLs or admin-managed copy.

## Verification

1. Run lint, TypeScript checks, dependency audit and a production build.
2. Review the homepage at desktop, tablet and 390 px mobile widths.
3. Verify the initial assistant is compact, quick topics toggle correctly and the callback form is hidden until relevant.
4. Exercise one assistant question to confirm streaming, saved conversation and lead disclosure still work.
5. Check for horizontal overflow, clipped cards, inconsistent gaps and browser console errors.
6. Reconfirm the working tree contains no secrets, generated output or incident indicators before pushing.

## Acceptance criteria

- The assistant's initial state fits comfortably within one mobile viewport after its heading and does not show the lead form.
- Sections from services through pricing have consistent rhythm and no large unexplained blank areas.
- Buttons and cards align cleanly at desktop and stack predictably on mobile.
- Existing page content and links remain available.
- The verified production build succeeds and GitHub `main` receives the plan and implementation commits.
