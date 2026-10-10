---
target: the landing page
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
target_identity: "file:/Users/isahohieku/Documents/Projects/portfolio/src/app/pages/landing"
timestamp: 2026-09-20T06-43-25Z
slug: src-app-pages-landing
---
Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated). Assessment A recorded in full before detector output entered synthesis. Servers: A ran `ng serve :4321` and killed it; B ran `ng serve :4399` and killed it, verified via curl + lsof. Both stopped.

Surface mode: Persuade — src/app/pages/landing/, the landing page whose job PRODUCT.md defines as generating inbound contact.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No cue that the pinned hero is a scene — scroll 400px, headline fades, nothing arrives |
| 2 | Match System / Real World | 3 | `120s → <100ms`, `65 → 5` are engineer-notation; a recruiter reads arrows as jargon with no verb |
| 3 | User Control and Freedom | 3 | `scroll-behavior: smooth` on html (styles.scss:41) turns return-to-top and the skip link into a long non-cancellable glide |
| 4 | Consistency and Standards | 4 | Strongest axis. One button, one card, one section, zero literal hex outside tokens.css. One leak: footer's hand-written résumé button |
| 5 | Error Prevention | 2 | mailto: is the only contact route, no clipboard fallback. Conversion action silently no-ops with no mail client |
| 6 | Recognition Rather Than Recall | 2 | Evidence band's only heading is sr-only (landing.component.html:44); its "these are verified" argument is never on screen |
| 7 | Flexibility and Efficiency | 2 | Applicable, not n/a — two audiences, one hard-coded first action. The recruiter's conversion (résumé) is secondary |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained, but the hero spends 1,575px desktop / 1,182px mobile on one sentence, then ~330px void |
| 9 | Error Recovery | 3 | Excellent content degradation, but degraded states never designed as states — missing logo = blank 176px rectangle |
| 10 | Help and Documentation | n/a | Five-section persuasion page, two CTAs, no task to complete |
| **Total** | | **25/36** | **Competent — solid system, misallocated attention** |

## Design Specificity Verdict

Partially authored. Evidence *content* is unmistakably this product; composition and motion vocabulary are not.

Specific: evidence band figures (landing.component.ts:52-64) — arrow-transition values, per-tile company attribution, literal `(projected)` caveat. The globe's brief (spin = -1.75, Europe–Africa corridor to camera). ProjectLogoComponent's showWordmark=false and hasCaseStudy gating — honest degradation as component API.

Category-default: the greeting hero (~120px of type, zero information); the pinned scroll scene — exactly ONE appScrollScene in the codebase, so not a system but one borrowed Spaceship dissolve, imported without asking whether a page that must convert in one viewport can spend two; the four-up divided stat row; the three-card grid with hover:-translate-y-1; the staggered appReveal.

Deterministic scan: static pass over 24 markup files (landing, shared, layout) is genuinely clean — [], exit 0. Verified unsuppressed: no impeccable-disable in src/, no .impeccable/config.json, no DESIGN.md; --no-config re-run also clean. (src/app/core does not exist; substituted src/app/layout.)

Rendered-DOM scan at 1440x900 and 400x844, both exit 2, identical findings:
- radial-spotlight-glow x3 (warning/slop) — the three hero orbs at styles.scss:184, :197, :210, each radial-gradient(circle, rgba(...), transparent ~68%) under blur(80px)
- ai-color-palette x1 — "Cyan gradient background", the teal orb rgba(0,123,108,0.2), the only cyan-family value in the stylesheet
- layout-transition x1 — `transition: max-height`. FALSE POSITIVE: PrimeNG's runtime-injected base stylesheet (primeng-base.mjs:84), absent from src/
- Advisory: codex-grid-background (styles.scss:220-231); two image-hover-transform, one of which (project-details) is out of scope

Agreement: Assessment A independently named the hero backdrop the most category-default layer before seeing detector output; the detector then flagged five of its six sub-layers. The ai-color-palette hit is soft alone but is the third orb in a stack already flagged twice.

Visual overlays: NONE. Mutable script injection unavailable (no Playwright/Puppeteer in repo or on PATH, no tab-based browser tool). Separately, `live-server` is not a subcommand of the installed detector (--help lists only detect, ignores, help, install, link, update, check). Rendered findings came from `impeccable detect <URL>`'s internal Puppeteer pass. Assessment B's screenshots at 1440/400 failed across four attempts — continuous rAF work (globe, pointer-parallax, scroll-scene) means virtual time never quiesces and headless --screenshot never fires. Assessment A captured renders via a different path.

## Overall Impression

A well-built page with its attention in the wrong place. The design system is real and holds under measurement — zero hex outside the token layer, AA verified both themes, zero horizontal overflow at 400/700/768/1440. Motion is principled: runOutsideAngular, IntersectionObserver-gated, prefers-reduced-motion in JS as well as CSS, globe behind a five-clause gate.

But the page spends its first 1.91 viewports on desktop and 1.53 on mobile on a greeting and a decorative sphere, then delivers the audited evidence below the fold, unlabelled, at 1.05:1 surface contrast in light mode. PRODUCT.md's first principle is that the visitor decides in the first viewport. The page is composed as though they scroll.

Biggest opportunity: collapse the hero to one viewport and put two metric tiles in it.

## What's Working

1. The token layer survives independent verification. tailwind.config.js resolves every colour through token(); brand text on card 5.82:1 light / 11.79:1 dark; subtle text 4.82:1 / 7.78:1. On a page arguing for engineering rigour, a contrast claim that holds under test is part of the argument.
2. Honest degradation is a component contract, not a patch. showWordmark=false, hasCaseStudy, outcomes? optional. The stated ethic implemented as API shape.
3. `(projected)` shipped. A label that costs conversion and buys credibility — and should be doing far more visible work.

## Priority Issues

### [P0] The first viewport carries a greeting, not a reason to stay
What: h1 is "Good to see you, I'm Isah." at up to 7.5rem — largest object on the page, zero information. Discipline, years, domains, employer all demoted to a 17px subtitle. First metric at y=1,296 (400px) and y=1,721 (1440px).
Why: Inverts PRODUCT.md Principle 1. Recruiter who bounces at the fold leaves with a name; client leaves with nothing. The template comment at landing.component.html:12-16 reasons only about phones — desktop and tablet are worse and unaddressed.
Fix: Cut the track to h-[100svh], drop sm:h-[175svh]. Demote the greeting to an eyebrow, promote the subtitle sentence to h1. Lift two metric tiles into the hero beneath the CTAs.
Suggested command: /impeccable layout

### [P0] "Selected work" selects nothing, and omits the only checkable evidence
What: getFeatured(3) is projects.slice(0, 3) (project.service.ts:316) — pure array order. Leads with Hobeei, whose company PRODUCT.md records as offline and whose inclusion is undecided, rendering as a blank green rectangle 176px tall. The band's 5,479 cites ngx-horizontal-scroll-menu, absent from the grid.
Why: For the client, the first artefact of delivered work is an empty swatch for a defunct company. For the skeptical reviewer, the one verifiable figure has no click-through — reads as inflation, the opposite of the verification standard's purpose.
Fix: Replace slice(0, 3) with an explicit featured: string[] of slugs — talk360-payment-platform, apply-schools-and-applypay, ngx-horizontal-scroll-menu. Design the logo-less plate as a filled state: package name in mono over the colour field, download count and licence as app-tag rows.
Suggested command: /impeccable shape

### [P1] The evidence band is the page's lowest-contrast, least-labelled, worst-grouped module
What: (a) Only heading is sr-only (landing.component.html:44) — the AT user gets a better experience than the sighted skimmer. (b) Light theme card is #f9f9f9 on #ffffff: 1.05:1 surface separation, held by an 0.08-alpha hairline. (c) Between 640–1024px every separator vanishes — sm:divide-y-0 kills the row rule, lg:border-r hasn't started (landing.component.html:51). Verified at 700px: four tiles, no lines, unequal row heights.
Why: This module is the entire output of the verification standard, arriving unlabelled, nearly invisible in light mode, ungrouped at the exact width a recruiter uses between meetings.
Fix: Visible eyebrow "Verified outcomes" plus a source note ("Figures from release records and the npm registry, September 2026"). tone="minimal" over bg-surface-subtle so the container reads at ≥1.3:1. Keep divide-y at all widths below lg.
Suggested command: /impeccable layout

### [P1] mailto: is the only conversion route and it has no failure path
What: Every contact CTA is href="mailto:…". No clipboard fallback, no named LinkedIn, no location, timezone, availability, or reply expectation.
Why: On a desktop with no mail client bound, the page's single success metric silently does nothing. At the highest-stakes moment the page offers zero reassurance — "I'll reply" is the one unsupported promise on a page that otherwise refuses to assert anything unsourced. PRODUCT.md forbids inventing pricing; it does not forbid "open to contract work, UTC+1."
Fix: Two-part email control — mailto: plus a copy button that swaps to "Copied." One io-body-sm text-subtle line: location, timezone, availability. Promote LinkedIn to a named tertiary link in the contact card; its copy is max-w-prose inside an 1,134px card, so the empty right 45% is where this belongs.
Suggested command: /impeccable harden

### [P2] The hero backdrop is five layers of the generic, and it leaves a ghost
What: Three blurred accent orbs plus a masked two-axis grid — flagged four times across two rules at both viewports, and independently named the most category-default layer by the design review. Separately: at desktop scroll ≈900px the hero sits at opacity 0.4 with both CTAs still clickable and focusable, then ~330px of empty ground.
Why: A 40%-opacity primary CTA reads as disabled and behaves as enabled, and takes a focus ring while visually inert. The backdrop is the most-worked visual layer spending its budget on the one composition that says "generic." canRenderGlobe() also gates the signature visual behind ≥768px, 4GB, 4 cores, 4g — so it never renders for the mid-range African Android the Talk360 achievement is about, and those visitors get the orbs alone.
Fix: Replace the orb stack with a deliberate material accent. Have scroll progress hand off — bring the evidence tiles up from --p: 0.5 so the hero's exit and the band's entrance are one movement in one viewport. If the fade stays, pointer-events: none past --p: 0.7.
Suggested command: /impeccable bolder

## Persona Red Flags

Time-poor mobile recruiter (PRODUCT.md audience 1): ~20 seconds from LinkedIn. First viewport is a greeting and a biography sentence. Scrolls once — headline fades, nothing arrives. That is the bounce. The résumé, their actual conversion, is the secondary button. No location, no work authorisation; "Senior" never appears though three of four roles carry it in ExperienceService. The most prominent onward link, "Read the full history," points at /about, which PRODUCT.md flags as still carrying unaudited figures.

Prospective contract client (audience 2): The landing page never names a single technology — React, Angular, NestJS, Next.js, Python all in the data, none on the page. app-tag exists as a primitive and is used zero times here. First work card is a blank green rectangle for a dead company.

Skeptical staff engineer: Reads 120s → <100ms, wants the method, finds no link — the Talk360 case study exists and is reachable but never connected to the number. Sees 5,479 attributed to a package absent from Selected work. `(projected)` is the right disclosure but sits in io-body-sm, visually indistinguishable from the measured figures.

Keyboard / screen-reader user: Tab order clean, mobile dialog traps and restores focus. But hero CTAs stay in the order at opacity 0.4, and scroll-behavior: smooth applies to the skip link — it glides rather than jumps, disorienting the one user it exists for. The globe is aria-hidden and draggable, so the only interactive visual is mouse-exclusive.

Low-bandwidth mid-range Android user: Rejected by canRenderGlobe() on four axes, then pays 1,182px of scroll before a single fact.

## Cognitive Load

5 of 8 failed — high, critical. Failures: single focus; grouping (640–1024px separator gap); visual hierarchy (largest type least information, sr-only heading on the key claim); one thing at a time (three simultaneous motion systems on one element); minimal choices; working memory. Chunking and progressive disclosure pass.

Decision points over four options: footer at 8 targets (5 unlabelled social glyphs + email + monogram + résumé); page-level exit inventory — /works offered five times, résumé three, email twice.

## Minor Observations

- Hardcoded <br /> at landing.component.html:31 orphans "you," at 400px. Use text-balance or a sm:-gated span.
- Footer's résumé link is a hand-written 6-class button string; PRODUCT.md says CTAs must use app-button.
- CardComponent's `interactive` input is never set anywhere. Dead API.
- tones.raised and .minimal differ only by shadow-raised; against a 1.05:1 surface delta that distinction is invisible. Effectively three tones.
- Hobeei (Feb 2019–Feb 2021) overlaps Apply Technologies (Nov 2020–Jul 2022) by nine months, presented as a clean reverse-chronological stack.
- Dark-theme card separation is 1.08:1 — same structural issue, partly rescued by the inset-hairline recipe.
- landing.component.html:100 wraps a single h2 in a flex flex-col gap-3 with one child.
- A font-preload console warning fires under ng serve; as and crossorigin are correct and this is very likely a Vite dev artifact. Not verified against a production build.

## Questions to Consider

1. PRODUCT.md leaves positioning open so surfaces lead with evidence rather than a claim — but the page leads with a greeting, which is neither. If the refusal to assert is the real differentiator, why isn't that the headline? "Every number on this page has a source" invents nothing, is true, is verifiable in one click.
2. The most persuasive artefact in this repository is the source code, and none of it is visible without cloning. What would make one of those decisions legible on the page — and would that be honest?
3. /works is offered five times and the résumé three, but the page never names a technology, a location, a timezone, or an availability. Which repeated exit would you trade for one line saying where he is and whether he's free?
4. The signature visual renders only for desktop 4-core/4GB/4g machines, barred from the mid-range African Android the Talk360 achievement is about. If that gate is discipline, what is the designed first viewport for the excluded half?
