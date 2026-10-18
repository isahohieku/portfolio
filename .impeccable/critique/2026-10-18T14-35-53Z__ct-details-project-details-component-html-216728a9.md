---
target: src/app/pages/project-details/project-details.component.html
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/isahohieku/Documents/Projects/portfolio/src/app/pages/project-details/project-details.component.html"
target_fingerprint: "sha256:8ce767ec2c0bf0f85344001f5aedff841d5b4099864f86e22c83bd65c13cda00"
target_path: /Users/isahohieku/Documents/Projects/portfolio/src/app/pages/project-details/project-details.component.html
timestamp: 2026-10-18T14-35-53Z
slug: ct-details-project-details-component-html-216728a9
---
Method: dual-agent (A: design review · B: detector + rendered DOM)

## Design Health Score (Experience mode; 7 and 10 n/a)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Lazy screenshot frames show as empty brand-colour slabs with a live expand button; no loading state |
| 2 | Match System / Real World | 3 | "An Edtech" stub; "— screen N" captions |
| 3 | User Control and Freedom | 3 | Native dialog solid; wrap-around (viewer + prev/next) unsignposted |
| 4 | Consistency and Standards | 3 | Section heading size depends on image presence (html:174 vs 186); outcomes in two forms |
| 5 | Error Prevention | 2 | "Visit the live site" renders for hobeei.com, a dead Heroku dyno |
| 6 | Recognition Rather Than Recall | 3 | Leftover screens pooled in "More screens"; viewer order ≠ page order |
| 7 | Flexibility and Efficiency | n/a | Showcase surface |
| 8 | Aesthetic and Minimalist Design | 3 | Empty 4-col "The work" rail on desktop; "MIT licensed" listed as an outcome |
| 9 | Error Recovery | 3 | Good not-found state |
| 10 | Help and Documentation | n/a | Showcase surface |
| **Total** | | **23/32** | **Good (72%)** |

## Design Specificity
Authored in the data (client bgColor plate, data-driven section/screenshot pairing, evidence hero for open source, honest absence); generic in the chrome (logo tile + H1 + dl + pill CTA hero, chip row, yellow CTA band, prev/next). Thin projects expose only the template.
Detector: 2 broken-image warnings (html:31, html:334) — both false positives from Angular [src] binding. Rendered DOM of /works/kollo and /works/sapphital with stylesheet: 0 findings. No live overlay (no browser automation).

## Priority Issues
1. [P1] Dead "Visit the live site" on Hobeei (html:118-128; service:95). Fix: liveStatus/archived flag; render nothing or "Site no longer online". Audit all portfolio_url. — /impeccable harden
2. [P1] Thin projects (Sapphital, Desrio, SwipeNG) are hero → CTA "Building something like this?". Fix: unlink them or admit thinness; switch CTA copy when !study. — /impeccable distill + /impeccable clarify
3. [P2] Viewer steps in data order (ts:133-138 uses project.images) while page shows lead → story → more (place(), ts:172-190). Fix: build a viewerOrder array from place() and step through it. — /impeccable harden
4. [P2] No loading state on lazy frames; hero not eager; 170–940KB PNGs. Fix: skeleton surface until (load), eager+fetchpriority on lead, srcset WebP/AVIF. — /impeccable optimize
5. [P2] Recruiter can't scan "what did he do": Kollo contribution is a 60-word muted paragraph; "My part" in io-body-sm; no dates anywhere. Fix: chunk contribution into a short list, promote My part, add period to the dl. — /impeccable typeset / layout

## Persona Red Flags
- Casey: hero screenshot ~600px down at 390×844; swipe doesn't cancel on vertical drift (ts:161-170).
- Sam: alt duplicates figcaption in viewer (html:334/343); caption change not announced; "More screens" H2 styled as 13px label.
- Riley: viewer/page order mismatch; generic captions; silent wrap.
- Time-poor recruiter: client pages have no date, no figure, contribution buried in prose.

## Minor
- "MIT licensed" → dl, not outcomes. Coverage stated twice (94% / 94.56%). Portrait phone shot tiny in 16:10 frame in 2-col grid. Mixed static/[class] bindings at html:69, 173.

## Questions
- Should a project with nothing to show get a route at all?
- Could a sanitised diagram carry Kollo's unscreenshottable admin/API claim?
- Is there a checkable figure (e.g. 121 of 124 commits) to give client pages an evidence-first hero?
