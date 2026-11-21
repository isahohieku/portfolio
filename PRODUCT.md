# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences of roughly equal weight; the surface must work for both.

- **Hiring managers and technical recruiters** evaluating Isah for full-time senior engineering roles. They arrive with little time, often on mobile, and are deciding whether to spend more time. They need seniority, scope, and credibility fast, plus access to a résumé.
- **Prospective contract and freelance clients** with a budget and a problem. They need to see relevant delivered work and have an obvious way to make contact.

Both arrive predominantly from an external profile link rather than search: LinkedIn, GitHub, Dribbble, Behance, X, a developer marketplace profile, or a résumé. The first viewport is usually the entire visit.

## Product Purpose

A personal portfolio whose job is to generate inbound contact of any kind — employment or client work — by letting a stranger judge Isah's engineering credibility quickly and then reach him.

Success is a qualified enquiry (a role conversation or a project enquiry). Failure is a visitor who leaves without learning what he has built.

## Positioning

**Software Engineer** — confirmed by the user in preference to narrower framings. He is positioned as a generalist software engineer, *not* as frontend-only, despite recorded job titles reading "Frontend Developer" and, most recently, "Frontend & Mobile Software Engineer".

**Open decision:** no sharper differentiating claim has been settled. The user explicitly chose to leave it open rather than adopt one of "ships measurable outcomes", "design-minded engineer", "fintech/payments specialist", or "engineer for African / emerging markets" — each of which the evidence would support. Until it is decided, surfaces lead with evidence rather than a positioning slogan, and no differentiator may be invented on his behalf.

This is now implemented rather than aspirational: the landing page opens with a plain factual sentence and an evidence band of quantified outcomes, not a claim.

## Operating Context

- Visitors are skim-first and time-poor; mobile is a primary, not secondary, context.
- Deployed to Netlify as a single-page app (`netlify.toml` rewrites all paths to `/` with status 200), so any route must resolve client-side.
- There is no backend. Contact happens through a `mailto:` address and a downloadable résumé PDF.
- Project and experience data are static and hand-maintained in source, not fetched from a CMS or API.
- `node_modules` and `package-lock.json` were root-owned until 2026-09-19 (someone ran `sudo npm install` in July 2025), so `npm install` failed for a long stretch. Ownership is now fixed and dependencies install normally. Two workarounds from that period remain in place because they are still the better answer: the typeface is vendored as woff2 files rather than pulled from a package, and PrimeNG is themed through its CSS variables rather than a preset package.

## Capabilities and Constraints

- Angular 20 standalone-component SPA; Tailwind CSS 3.4; PrimeNG 19 (ScrollTop, Toast, ProgressSpinner); PrimeIcons; three 0.186 (lazy-loaded only). TypeScript 5.6.
- Routes: `/` (landing), `/about` (summary, experience, skills, education and certifications), `/works` (project listing), `/works/:id` (project detail, accepts a slug or numeric id), `/projects` (redirects to `/works`), and a wildcard 404.
- **Two data sources, both `providedIn: 'root'`:** `ProjectService` (12 projects) and `ExperienceService` (4 roles plus a professional summary, eight skill categories, two education entries, six certifications and a computed years-of-experience). Experience data used to be a literal inside `AboutComponent`, which put the strongest evidence out of the landing page's reach.
- Projects carry a `kind` of `client` or `open-source`. `/works` groups them under separate headings rather than interleaving them: shipped-for-a-client and published-for-anyone are different claims, and a mixed grid invites the reader to assume the weaker one applies throughout.
- Contact email: `isahohieku@gmail.com`. Résumé served from the site root at `/Isah Ohieku - Resume.pdf`, sourced from `public/` (which `angular.json` copies to `/`). The old `src/assets/resume.pdf` is now unreferenced.
- All assets are self-hosted under `src/assets/`. Nothing may be hotlinked to a third-party host: two logos and three skill icons were previously lost this way when the remote URLs died. The typeface is vendored for the same reason.

### Design system

Added 2026-09-19. Derived from spaceship.com's published `--sds-*` token system, with a yellow accent rather than their blue.

- **Tokens** live in `src/styles/tokens.css`, named for role and surface (`--io-color-{background|text|border}-{role}-{step}`, steps running minimal → contrast). `tailwind.config.js` contains no literal hex; every colour resolves to a token. Nothing outside the token layer and project `bgColor` data may hardcode a colour.
- **Light and dark**, switched by `data-theme` on `<html>`, resolved before first paint by an inline script in `index.html` and owned at runtime by `ThemeService`. Dark is the default; an explicit choice persists to `localStorage`.
- **Typeface:** Hanken Grotesk, variable 300–800, self-hosted as two woff2 files. One family at many weights; no uppercase letter-spacing anywhere.
- **Shape:** Spaceship's radius scale (0.25rem → 4rem, buttons at full pill) and their inset-hairline elevation recipes.
- **Primitives** in `src/app/shared/ui/`: `app-button`, `app-card`, `app-section`, `app-tag`. CTAs must use `app-button` rather than hand-written utility strings.
- **PrimeNG** is themed by defining its `--p-*` variables against the tokens in `src/styles/primeng.css`. Only three PrimeNG components are used, so a preset package would cost more than it saves. The screenshot viewer was p-galleria until 2026-10-18; it is now a native `<dialog>` styled in `styles.scss`, because Galleria could not return focus on close, name its arrows, or hold its thumbnail strip still on hover.

## Brand Commitments

- **Name:** Isah Ohieku. Binding.
- **"IO" monogram**, the header wordmark. Binding.
- **Palette, typography and shape** are no longer open — they are the token system above. Changing them means changing the tokens, not overriding them locally.
- Composition and project selection remain open.

## Evidence on Hand

### Verified

Confirmed by the user against release posts and his work record, 2026-09-19:

- **Talk360** — Frontend & Mobile Software Engineer, May 2022–present. Works across onboarding, the Shop360 marketplace, the webshop, the embedded/web dialler, and the payment platform, on web and Android/WebView.
  - A hydration bottleneck in onboarding: main-thread block of up to ~120s reduced to under 100ms.
  - The redesigned country-selection/segmentation release: 1,100+ new sign-ups shortly after launch.
  - The redesigned sign-up flow now carries 2k+ sign-ups a day, confirmed by the user 2026-11-15. This replaced the 1,100+ figure in the landing evidence band. It is daily volume through the flow, not a lift caused by the redesign, and must not be worded as one.
  - Self-service receipt automation (Marketplace v1.12.0): manual support receipt requests **projected** to fall from ~65 to ~5 per month. The projection is not a measurement and must stay labelled as such wherever it appears.
  - Rate calculator migrated Vue → React with backward compatibility, plus a Next.js validation app for the new marketing site.
  - `data-cy` E2E tags standardised and documented; Jest/Cypress coverage added for analytics events.
  - Full 8-locale support for user-facing flows; onboarding app upgraded to React 19.
  - **Three engineering-impact initiatives**, confirmed by the user 2026-11-13 and rendered as `kind: 'impact'` case studies (`talk360-design-system`, `talk360-shared-commerce-foundation`, `talk360-embedded-platform`) on a dedicated landing section and their own detail pages, deliberately excluded from `/works` since none has a shipped product to screenshot:
    - **Unified design system**: initiated the split of a design-token package and a component library out of one product. As of 2026-11-13 the library holds 23 components, consumed across 14+ screens in two products; four apps consume the tokens; the lint rule blocking reintroduction of the legacy components is active and blocking in CI.
    - **Shared commerce foundation**: proposed and built a shared commerce package, including its integration contract. It now backs both the rebuilt website and the existing shop, and the website launch shipped on schedule against it.
    - **Embedded multi-tenant platform**: proposed the multi-tenant architecture and native-SDK bootstrapping flow. The proposal was approved and became the architecture of what was built, now live in production.
    - **Confidentiality rule, set 2026-11-15 at the user's request:** these are Talk360 internals and the packages are private, so the site — and this file, which lives in a public repository — names no internal package, service, channel or rule, and publishes no partner count, pipeline, launch date or authentication mechanism. Describe the problem, the decision and the impact; keep the user's own confirmed numbers.
- **Other roles with companies, titles, locations and dates**, reconciled against the résumé on 2026-09-20: Apply Technologies, Senior Frontend Developer, Abuja, Nov 2020–Jul 2022 · Hobeei, **Lead Frontend Engineer (Founding Team)**, Abuja, Feb 2019–Feb 2021 · SwipeNG, Frontend Developer, Lagos, Jan 2018–Jan 2019. Roughly 8 years in total, computed from a 2018-01-01 start rather than hardcoded.
  - The Hobeei title was corrected from "Senior Frontend Developer" — the résumé records the founding-team lead role.
  - **Talk360's title diverges by decision.** The résumé says "Senior Frontend Developer"; the site keeps the user-confirmed "Frontend & Mobile Software Engineer", reaffirmed 2026-09-20 when the divergence was put to him.
  - The résumé spells the second employer "Aply Technologies Limited". The site keeps "Apply Technologies", matching `applypay.ng`, the asset directory `apply-schools-and-applypay` and the product name. **Unresolved:** likely a résumé typo, but unconfirmed.
- **Domains actually worked in:** payments and fintech (Talk360 payments, ApplyPay, SwipeNG, Kollo savings), international calling (Talk360), edtech (Apply Schools, Sapphital), greentech (Hobeei), consultancy marketing (Nexus360).
- **Education**, from the résumé: MBA in Business Administration Management, Ahmadu Bello University, Jan 2019–present; B.Eng. in Electrical and Electronics Engineering, Ahmadu Bello University, Jan 2011–Dec 2016. Rendered on `/about` and asserted as `alumniOf` in the `index.html` Person entity.
- **Six certifications**, from the résumé: AI LLM Engineering Mastery — GenAI, RAG Complete Guide (Coursera, Feb 2026) · Android App Development with Kotlin (Udemy, 2025) · Web Design Accessibility (Udemy, 2025) · GRC eLearning: PCI DSS (2022) · The Fundamentals of Digital Marketing (Google, 2020) · Google Africa Scholarship Mobile Web Specialist (Google, 2018).
- **Skills inventory**, from the résumé's flat alphabetical list of 60+ entries, regrouped into eight categories for display. Grouping is the only editorial act; nothing was added the résumé does not name.
- **36 client work screenshots**, self-hosted at `src/assets/projects/<slug>/`. Nexus360's eight and Kollo's seven were captured from the live public sites on 2026-10-18 (desktop at 1440px, phone at 390px). Kollo's admin dashboard was deliberately not captured: it runs against the live API and would show real customers and waitlist entries. **9 are shown** since 2026-11-13 (33 remain on disk after the payment-platform deletions). The Talk360 payment platform page is **archived** (`archived: true` in ProjectService, removed from the sitemap) at the user's request, because some of its screenshots carried information that should not be public. On 2026-11-13 the back-office session list and session detail (real customer phone numbers, user and session IDs, PSP references) and the card-entry screen were **deleted** from assets, not just hidden. Only the sign-in and payment-method screens remain on disk, and only the latter is referenced. Never re-capture the back-office without masking customer data. Rule, confirmed by the user: a client case study keeps one lead screen as proof the product exists, plus only the screens a case-study section points at; no unattached "More screens" gallery, which argued for UI output rather than the ownership the case studies claim. Kept: Hobeei 1 (home), Apply Schools 2 (home; classes list), Talk360 payment platform 0 (archived; payment-method screen kept on disk), Talk360 calling app 1 (home), Kollo 2 (home hero; waitlist), Nexus360 3 (home hero; software development page; contact page). **Since 2026-11-17 nothing unpublished lives in `src/assets`:** the build copies that whole directory to the site, so an unreferenced file was still a public file at a guessable URL. The cut screenshots, the payment-platform screens and logo, the old `assets/resume.pdf` and the archived payment-platform entry itself (which still shipped in the JS bundle) were moved to `.private/`, which is gitignored and must never be committed. Restoring a screen means moving it back and referencing it. news-app's four open-source screenshots already each sit beside the section they illustrate, so it was left as is.
- **Logos** self-hosted at `src/assets/projects/logos/` (ApplyPay's at `src/assets/img/`) — nine of the fourteen projects have one; only the five open-source projects have none. Desrio's was supplied by Isah on 2026-10-31 as a 200px JPEG on white; the white was removed and the teal arrows reversed to white (the navy dot kept), the same treatment as Kollo's, since teal on its teal plate disappears. Hobeei's was supplied by Isah on 2026-10-31 and cropped of its transparent margin; its plate was deepened from `#2f7d5d` to `#1f4d3a` so the green leaf in the mark stays visible. Kollo's is a white-reversed copy of the mark from its site favicon, since the purple original disappears on its purple plate.
- **Hobeei repositories**, supplied by the user and read 2026-11-14: `hobeei-frontend` (Angular customer app and admin console; Isah wrote 1,137 of 1,323 commits, Feb 2019 to Feb 2021), `hobeei-api` (Node/TypeScript/MongoDB/RabbitMQ; 24 of 467 commits are Isah's, so the case study credits it to the backend team) and `hobeei` (a 2019 Express/EJS prototype, 4 of 10 commits). They are the source for the Hobeei case study's mechanics and authorship. Its two `outcomes` are the résumé-sourced figures already on `/about`, not repository facts. The item-page and listings screenshots show real users' names and photos and stay unpublished.
- **Résumé PDF**, `public/Isah Ohieku - Resume.pdf`, read 2026-09-20. It is the source for the experience, skills, education and certification data below.
- **Profiles:** LinkedIn, GitHub, Dribbble, Behance, X.

#### Open-source evidence — independently checkable

Added 2026-09-19. This is the only evidence on the site a stranger can verify without taking Isah's word for it; everything else is self-reported. Figures were read from the npm registry, GitHub and Codecov APIs on that date and are stamped where they appear.

- **ngx-horizontal-scroll-menu** — Angular library, MIT, published to npm since March 2020. 5,479 downloads in the twelve months to September 2026, 339 in the last month; 14 releases, latest 2.2.0; 8 stars, 2 forks. Note the npm package name differs from the repository name (`ngx-horizontal-menu-scroll`).
- **contacts-manager** — NestJS/PostgreSQL/Redis API, MIT. 281 commits, CI passing on `main`, and 94.56% test coverage over 2,299 lines in 139 files per Codecov. Its `Deploy` workflow is failing, so nothing may claim it is deployed.
- **advance-chatbot** — FastAPI, LangChain, ChromaDB and Next.js, 127 commits. No external validation and no live demo, so its case study deliberately carries no `outcomes` block.
- **news-app** (titled *Central News*, after its README) — Android news reader in Kotlin and Jetpack Compose on NewsAPI. 54 commits, all Isah's; no licence file, so none is claimed. No release, store listing or external validation, so its case study carries no `outcomes`. Its four screenshots come from the repository's `docs/screenshots/` (read 2026-10-31).
- **calendar-guardian** — AI calendar agent: FastAPI, ARQ, Redis, PostgreSQL, MCP and Next.js. 94 commits, all Isah's, dated 2026-07-23 to 2026-10-12 (the repository itself was created on the last day, so the history was pushed in one go). No licence file, no screenshots, no live demo, so the case study is text-only and carries no `outcomes`. Read 2026-10-31.

Deliberately excluded, and why: `schedule-a-call` is a single commit; `business-directory` and its backend have 47 and 14 open issues and a dead Heroku demo; `metacare` points at a dead EC2 host; `weather-app` is self-described as simple; the 2018–19 repositories are student work.

### Not verified — do not publish

The Talk360 figures the site previously carried (payment errors −45%, mobile onboarding conversion +37%, load 2.5s → <1s, 50% faster processing, 80+ API issues, −35% project time, +20% CSAT) were **removed** on 2026-09-19 because they were absent from the record the user could verify. They must not be reinstated without a source.

**The résumé restates every one of them.** Reconciled 2026-09-20 and confirmed by the user: a résumé repeating a number is not the independent source this standard asks for, so they stay off the site. The audited Talk360 record in `ExperienceService` is therefore deliberately *not* replaced by the résumé's account of the same role.

**The remaining three roles were reconciled against the résumé on 2026-09-20 rather than audited.** Figures the résumé does *not* carry were dropped from `/about` rather than softened: ApplyPay frontend performance **+70%**, Hobeei production defects **−25%**, code efficiency **+30%**, bug count **−40%**, the Forbes-GSE accelerator mention, and "coached junior developers".

Figures the résumé does carry now render on `/about`, quoted rather than paraphrased: Apply Technologies — over twice the planned feature set, time-to-resolution −40% · Hobeei — performance +30% (architecture), +30% UX via PWA/SSR, engagement +50%, revenue +35%, Earth Tech finals, YC Startup School · SwipeNG — zero to 16,000+ users in year one, 43,000+ subsequently, two redesigns. **These are résumé-sourced, not independently audited**, and remain the outstanding audit task. The ApplyPay figure's slot in the landing evidence band is still held by the npm download count, which is better sourced and externally checkable.

### Verification standard

Established 2026-09-19: a number appears on this site only if the user can point to where it came from. When a claim cannot be sourced it is removed, not softened. Projections are labelled as projections.

### Usage restriction on the screenshots

The client screenshots may be shown **only inside individual project case-study pages**. They must not appear on the landing page or the `/works` listing grid. This is a confirmed constraint, not a preference.

### Absences — do not fabricate

- **No testimonials, client quotes, references, or press.** None exist.
- **Eight case studies exist**, all using `caseStudy` on `ProjectData` (context, contribution, sections, optional outcomes, stack): `talk360-payment-platform`, `kollo`, `nexus360`, plus the five open-source projects. Two of them demonstrate the optional `outcomes` field in both directions — the open-source studies carry verified, sourced figures, while `talk360-payment-platform` and `advance-chatbot` carry none, because none exists. The field is optional precisely so that absence renders as nothing rather than as an empty heading inviting invention. The remaining six projects still have one descriptive sentence each; Sapphital's is the two-word stub "An Edtech".
- **Kollo's case study is sourced from the three repositories (2026-10-11), not from a client.** Isah's role on Kollo was fullstack engineer (confirmed by the user 2026-11-14). Isah wrote 121 of 124 commits on the website, the admin dashboard alongside an AI agent, and 76 of 582 on the API, whose savings engine is the backend lead's work. The admin's financial-operations pages run on mock data and must not be described as shipped; neither may the activity log in the API, which is the lead's rewrite. It carries no `outcomes`. As of 2026-10-18 kollo.ng announces the launch ("We're Live!") while still showing the waitlist, so the site still doesn't say whether Kollo has launched.
- **Nexus360's case study is sourced from its two repositories (2026-10-18)** — `nexus360` (the site) and `nexus360-server` (the email API) — where Isah wrote every commit (27 and 14). It carries no `outcomes`: none is on record.
- **Hobeei's company site is offline** (the domain resolves to a decommissioned Heroku dyno); its logo was supplied by Isah, not taken from the site. Whether Hobeei stays in the work is undecided.
- **Desrio, SwipeNG and Sapphital have no case-study material** — no screenshots, no detail beyond one line. Their cards say "View project"; only projects with a writeup or a gallery say "Read the case study".
- **Only `news-app` has screenshots among the open-source projects**, taken from its own repository. The other four render as a plain colour field, since `ProjectLogoComponent` is told not to substitute a text wordmark where the card already states the title.
- No pricing, availability, rates, or service definitions.

## Product Principles

1. **The visitor decides in the first viewport.** Most arrive from a profile link, skim, and leave. Whatever must be believed has to be visible before any scroll.
2. **Evidence outranks assertion.** Real companies, real numbers, and real work do the persuading. The positioning claim is undecided precisely so that nothing has to be asserted in its place.
3. **Serve two readers without averaging them.** A recruiter and a prospective client want different things; the surface should let each find theirs rather than addressing a blended non-reader.
4. **Mobile is the primary case.** A visit that only works with a mouse and a hover is a visit that failed. Nothing load-bearing may be hover-gated.
5. **Own every asset, and degrade honestly.** Nothing hotlinked; anything that can go missing must have a designed fallback rather than a broken state. This extends to content: an absent section renders as nothing, never as an empty heading.

## Accessibility & Inclusion

**WCAG 2.1 AA is the working target** until the user sets a different one.

Verified 2026-09-19:

- All 22 token colour pairs pass AA in both light and dark (4.5:1 body, 3:1 large). The previously recorded failures — a 3.59:1 hero subtitle, 3.77:1 prev/next labels, a 1.11:1 decorative number — no longer exist.
- Zero horizontal overflow at 400px and 1440px on every route, measured via DevTools protocol rather than by eye.
- The mobile navigation is a real dialog: it traps focus, moves focus in on open, restores it to the trigger on close, closes on Escape, and locks scroll on `<html>` (a component stylesheet under emulated encapsulation cannot match `body`, which is why the previous lock was inert).
- `prefers-reduced-motion` is honoured in CSS and in the reveal directive, which skips its hidden starting state entirely rather than animating — content can never be left invisible.
- Icon-only controls carry accessible names; tap targets clear 44px; a skip link precedes the header.

Still open: a screen-reader pass has not been run, and heading order has been corrected by construction rather than audited end to end.
