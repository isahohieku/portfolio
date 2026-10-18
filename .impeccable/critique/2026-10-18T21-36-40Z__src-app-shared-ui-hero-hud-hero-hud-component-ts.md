---
target: src/app/shared/ui/hero-hud/hero-hud.component.ts
total_score: 13
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/isahohieku/Documents/Projects/portfolio/src/app/shared/ui/hero-hud/hero-hud.component.ts"
target_fingerprint: "sha256:4a72799dd1a302114408f72aae4e9bc9ca6d747e504023a4cf21d26d84622e4f"
target_path: /Users/isahohieku/Documents/Projects/portfolio/src/app/shared/ui/hero-hud/hero-hud.component.ts
timestamp: 2026-10-18T21-36-40Z
slug: src-app-shared-ui-hero-hud-hero-hud-component-ts
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 1 | "SYS: OK" + perpetual ping is a fabricated status; audio toggle doesn't say what it affects |
| 2 | Match System / Real World | 1 | SYS/LOC/`//`/CET/AMS/coordinates are avionics jargon to recruiters and clients |
| 3 | User Control and Freedom | 3 | Muted by default, persisted, reversible |
| 4 | Consistency and Standards | 1 | Second typeface, uppercase tracking, emoji not PrimeIcons, raw button, default-blue ring; two classes compile to nothing |
| 5 | Error Prevention | 2 | Toggle shown even when audio unavailable |
| 6 | Recognition Rather Than Recall | 2 | "AUDIO" doesn't say what makes sound |
| 7 | Flexibility and Efficiency | n/a | One-shot persuade/experience surface |
| 8 | Aesthetic and Minimalist Design | 1 | First element of hero, carries zero evidence |
| 9 | Error Recovery | 2 | Blocked AudioContext still reads ON |
| 10 | Help and Documentation | n/a | Landing hero needs none |
| **Total** | | **13/32 (41%)** | **Poor** |

## Design Specificity Verdict
LLM: category-interchangeable dev-portfolio "telemetry" trope; leftover from the retired globe/cybernetic pass (1cc6b6e; globe retired a5473a9). "SYS: OK" contradicts PRODUCT.md's evidence-over-assertion standard. Only grounded fact (Amsterdam) is encoded.
Detector: 0 findings on hero-hud.component.ts and landing.component.html. In-page: only `oversized-h1` on the adjacent headline at 1440px; mobile clean. Missed: `bg-surface-subtle/80` emits no CSS (no `<alpha-value>`, tailwind.config.js:17) → transparent pill, wasted backdrop blur; `ring-brand-focus` doesn't exist (focused only under borderColor, :63) → Tailwind default blue 1px/50% ring. Copy truthfulness is out of detector scope.

## Priority Issues
- [P1] "SYS: OK" + perpetual ping is a fabricated first claim. Fix: delete status segment (hero-hud.component.ts:14-23); keep only plain "Amsterdam · CET" or move location into subtitle. Do not invent availability. → /impeccable distill
- [P1] Audio toggle has near-zero effect (only scramble-reveal.directive.ts:107 tick; hover-gated, fires while muted on reveal) and is 86×16.5px target. Fix: remove until meaningful, or move to header as 44×44 icon app-button with pi-volume icons, stable aria-label "Interface sounds", hidden without AudioContext. → /impeccable harden
- [P1] Type-system violations + dead utilities: font-mono, uppercase tracking-wider, bg-surface-subtle/80, ring-brand-focus. Fix: Hanken sentence case; solid bg or alpha-value; add `focused` to ringColor, ring-2. → /impeccable typeset, /impeccable polish
- [P2] SR semantics: decorative role="region" landmark; button name and aria-pressed both change; emoji read aloud. Fix: drop role/label, stable name, aria-hidden icons. → /impeccable audit
- [P3] Only infinite animation in first viewport next to h1. Fix: remove with status, or static dot. → /impeccable quieter

## Persona Red Flags
- Recruiter from LinkedIn: first line "SYS: OK • AMS // CET • AUDIO: OFF" says nothing about seniority; Amsterdam encoded.
- Jordan: unexplained codes; "AUDIO" implies music.
- Sam: spurious landmark, emoji names, double-announced state, faint blue 1px ring.
- Casey: 16.5px target above h1; ~54px of first screen; toggle inaudible on touch.

## Minor Observations
- Light-mode brand dot #7a5e00 reads brown; 11px grey at 5.08:1 marginal.
- Emoji tofu where no emoji font.
- spec.ts:25 asserts 'AMS'.
- data-cursor="Sound" redundant.
- Coordinates imply false precision.
- 320px + large text → ragged wrap with orphan bullets.

## Questions to Consider
- What would a recruiter miss if the HUD vanished? If "Amsterdam", why isn't it in the intro sentence?
- What is the source for "OK"?
- With the globe gone, what is the sound for?
