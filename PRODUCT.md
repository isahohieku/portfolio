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

**Software Engineer** — confirmed by the user in preference to narrower framings. He is positioned as a generalist software engineer, *not* as frontend-only, despite every recorded job title reading "Frontend Developer".

**Open decision:** no sharper differentiating claim has been settled. The user explicitly chose to leave it open rather than adopt one of "ships measurable outcomes", "design-minded engineer", "fintech/payments specialist", or "engineer for African / emerging markets" — each of which the evidence would support. Until it is decided, surfaces should lead with evidence rather than a positioning slogan, and no differentiator should be invented on his behalf.

## Operating Context

- Visitors are skim-first and time-poor; mobile is a primary, not secondary, context.
- Deployed to Netlify as a single-page app (`netlify.toml` rewrites all paths to `/` with status 200), so any route must resolve client-side.
- There is no backend. Contact happens through a `mailto:` address and a downloadable résumé PDF.
- Project data is static and hand-maintained in source, not fetched from a CMS or API.

## Capabilities and Constraints

- Angular 20 standalone-component SPA; Tailwind CSS; PrimeNG 19 (Galleria, ScrollTop, Toast) ; PrimeIcons. TypeScript 5.6.
- Routes: `/` (landing), `/about` (experience), `/works` (project listing), `/works/:id` (project detail, accepts a slug or numeric id), `/projects` (redirects to `/works`), and a wildcard 404.
- `ProjectService` is the single source of truth for project data — 7 projects. Four have case-study material (image galleries); three (Desrio, SwipeNG, Sapphital) have a one-line description and an outbound link only.
- Contact email: `isahohieku@gmail.com`. Résumé served at `assets/resume.pdf`.
- All image assets are self-hosted under `src/assets/`. Nothing may be hotlinked to a third-party host: two logos and three skill icons were previously lost this way when the remote URLs died.

## Brand Commitments

- **Name:** Isah Ohieku. Binding.
- **"IO" monogram**, currently the header wordmark. Binding — carry it forward.
- Nothing else is fixed. Palette, typography, composition, and project selection are open decisions.

## Evidence on Hand

Real, confirmed material:

- **Four roles with companies and dates:** Talk360, Senior Frontend Developer, May 2022–present · Apply Technologies, Senior Frontend Developer, Nov 2020–Jul 2022 · Hobeei, Senior Frontend Developer, Feb 2019–Feb 2021 · SwipeNG, Frontend Developer, Jan 2018–Jan 2019. Roughly 7 years.
- **Quantified outcomes** (in `src/app/pages/about/about.component.ts`): payment errors reduced 45%; mobile onboarding conversion improved 37%; load times cut from 2.5s to under 1s; ApplyPay frontend performance improved 70%; 80+ API issues resolved; production defects down 25%; bug count down 40%. These are the strongest assets on the site and are currently only reachable on `/about`.
- **Domains actually worked in:** payments and fintech (Talk360 payments, Applypay, SwipeNG), international calling (Talk360), edtech (Apply Schools, Sapphital), greentech (Hobeei).
- **21 client work screenshots**, self-hosted at `src/assets/projects/<slug>/`.
- **Logos** self-hosted at `src/assets/projects/logos/`.
- **Résumé PDF**, `src/assets/resume.pdf` (~105KB).
- **Profiles:** LinkedIn, GitHub, Dribbble, Behance, X. Dribbble and Behance alongside GitHub are factual, whether or not a design-adjacent claim is ever made.

### Usage restriction on the screenshots

The 21 client screenshots may be shown **only inside individual project case-study pages**. They must not appear on the landing page or the `/works` listing grid. This is a confirmed constraint, not a preference.

### Absences — do not fabricate

- **No testimonials, client quotes, references, or press.** None exist.
- **No case-study narratives.** Each project has one descriptive sentence; there is no problem/role/approach/result writeup for any of them. Sapphital's description is a two-word stub ("An Edtech"). Team size, individual role, and duration are not recorded per project.
- **Hobeei's company site is offline** (the domain resolves to a decommissioned Heroku dyno), and no logo asset survives. Whether Hobeei stays in the work is undecided.
- **Desrio, SwipeNG and Sapphital have no case-study material** — no screenshots, no detail beyond one line.
- No metrics beyond those listed above; no pricing, availability, rates, or service definitions.

## Product Principles

1. **The visitor decides in the first viewport.** Most arrive from a profile link, skim, and leave. Whatever must be believed has to be visible before any scroll.
2. **Evidence outranks assertion.** Real companies, real numbers, and real work do the persuading. The positioning claim is undecided precisely so that nothing has to be asserted in its place.
3. **Serve two readers without averaging them.** A recruiter and a prospective client want different things; the surface should let each find theirs rather than addressing a blended non-reader.
4. **Mobile is the primary case.** A visit that only works with a mouse and a hover is a visit that failed.
5. **Own every asset, and degrade honestly.** Nothing hotlinked; anything that can go missing must have a designed fallback rather than a broken state.

## Accessibility & Inclusion

No formal standard has been set by the user. A `/impeccable critique` run on 2026-09-12 established concrete defects that the user has scoped in for remediation: unnamed icon-only controls, a mobile navigation overlay that claims `aria-modal` but does not trap focus, heading-order breakage, contrast failures (including a 3.59:1 hero subtitle), tap targets below 44px, and no `prefers-reduced-motion` handling against 55 transitioning elements. Treat WCAG 2.1 AA as the working target until the user sets a different one.
