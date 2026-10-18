---
target: landing page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/isahohieku/Documents/Projects/portfolio/src/app/pages/landing/landing.component.html"
target_fingerprint: "sha256:d519a120eaf8c3deb073ec0bb9862758497a613b6a06e7de7279da44d3aef4fb"
target_path: /Users/isahohieku/Documents/Projects/portfolio/src/app/pages/landing/landing.component.html
timestamp: 2026-10-18T22-03-55Z
slug: src-app-pages-landing-landing-component-html
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Copy feedback good (icon, live region, clipboard verified); focus visible |
| 2 | Match System / Real World | 3 | "Verified outcomes" heads a projection + self-reported figures |
| 3 | User Control and Freedom | 2 | Spring letters scatter the h1; h1 select-none; motion only stoppable via OS |
| 4 | Consistency and Standards | 3 | Package row hand-rolls CTA; hero vs band metrics use different effect stacks |
| 5 | Error Prevention | 3 | Copy fallback for missing mail client; download attr set |
| 6 | Recognition Rather Than Recall | 3 | Clear labels; "IO" only identity in header |
| 7 | Flexibility and Efficiency | n/a | One-page portfolio |
| 8 | Aesthetic and Minimalist Design | 2 | Forced 100svh voids, repeated figures (5,479 ×3), ~13 motion systems |
| 9 | Error Recovery | 3 | Failed clipboard write silent (ts:151) |
| 10 | Help and Documentation | n/a | No task flow |
| **Total** | | **22/32 (69%)** | **Acceptable** |

## Design Specificity Verdict
Content specific and disciplined; visual/motion layer is the generic award-site dev kit (dotted grid, orbit arcs, fluid blob, spring letters, scramble, count-up, magnetic, cursor pill). Orbit arcs now orbit nothing (globe retired; stale comments html:30-37, cursor.component.ts:16, styles.scss). Performance story (120s→<100ms) contradicted by 4 idle rAF loops.
Detector: CLI 0 findings (landing, shared, layout). In-page: oversized-h1 at 1440 (85px, 30vh) both themes; 390 clean.

## Priority Issues
- [P1] Forced 100svh scenes on every section (section.component.ts:68; html 115/146/244/285) + 112–116svh hero → contact at y≈4,084/4,326. Fix: drop scene on evidence/experience/contact, hero 100svh or auto. → /impeccable layout
- [P1] Scattered motion; h1 is the toy. 4 rAF loops idle at 60fps; fluid canvas + cursor ignore reduced motion; fluid hardcodes rgba(255,216,77) (fluid-canvas.component.ts:151-153); hover scramble dead (count-up overwrites textContent). Fix: one authored moment; remove appSpringLetters/select-none from h1, scramble from hero metrics; gate/tokenise or remove fluid canvas; drop redundant cursor labels. → /impeccable quieter
- [P1] Evidence repeats (hero ×2 in band, 5,479 ×3) and "Verified outcomes" over-claims. Fix: band carries only non-hero figures or becomes linked ledger; rename (user's call); 5,479 once. → /impeccable distill
- [P2] Hero hierarchy: evidence 20px under 85px h1; titles 3.5 screens down; no desktop Contact nav. Fix: h1 down a step, metrics io-heading-md/lg, desktop Contact anchor, consider titles + "open to roles and contract work" in intro (user approval). → /impeccable typeset
- [P2] .lines__word inline-block inflates line-height ~27% (styles.scss:398). Fix: vertical-align: top. → /impeccable polish

## Persona Red Flags
- Recruiter: no level signal above fold; repeated figures read as padding.
- Client: no desktop contact route/contract signal at fold; generic card copy.
- Jordan: shattered h1 looks like a bug; voids.
- Riley: dead scramble, silent copy failure, unselectable h1, spring loop in background.
- Casey: LinkedIn 59×21; contact 5 flings away; unequal stacked buttons; metric at fold edge.

## Minor Observations
- Orphan "platforms." at 1440; fluid blob smears in light theme; generic project copy, Sapphital stub; footer 8 options, mailto ×3; 4 parallax depth sources; font preload warning (dev); 3.55MB is dev payload.

## Questions to Consider
- Why is the claim the page stands on the element visitors knock apart?
- What if 120s → <100ms were the hero, told by a fast, still page?
- Should a client scroll five screens to learn he takes contract work?
