---
target: src/app/pages/project-details/project-details.component.html
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/isahohieku/Documents/Projects/portfolio/src/app/pages/project-details/project-details.component.html"
target_fingerprint: "sha256:e3289097e4228f629f7da978a29486c5c0b1fd923a68ac1fdcdb26d978f8f9b7"
target_path: /Users/isahohieku/Documents/Projects/portfolio/src/app/pages/project-details/project-details.component.html
timestamp: 2026-10-18T14-03-50Z
slug: ct-details-project-details-component-html-216728a9
---
# Critique — project case-study page (/works/:id)
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score — 21/32 (Acceptable, 66%); 7 and 10 n/a (Experience surface)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No n/N counter in fullscreen viewer; mobile shows one thumbnail |
| 2 | Match real world | 3 | Plain copy; hero never says what it is or what Isah did |
| 3 | User control | 2 | Focus lost to body after Escape; no Back to work |
| 4 | Consistency | 2 | Prev/next crosses client/open-source; full-bleed nav vs content column |
| 5 | Error prevention | 3 | Absent fields render nothing |
| 6 | Recognition vs recall | 2 | imageName captions never visible |
| 7 | Flexibility | n/a | reading surface |
| 8 | Aesthetic/minimalist | 2 | Hero 46–56svh of logo; screens start 1767px desktop / 2069px mobile |
| 9 | Error recovery | 3 | Honest not-found |
| 10 | Help | n/a | portfolio |

## Design specificity
Copy authored; layout template (radial hero, 4/8 split, tag cloud, 3-up grid, prev/next). No visual client vs open-source distinction.
Detector: 3x broken-image (lines 151/196/206) false positives ([src] bindings). Browser: line-length x9 on io-body-md max-w-prose (704px ≈ 96–102 cpl, lines 75/81) real; ai-color-palette (kollo, desrio) + radial-spotlight-glow (desrio) mostly false positive (project brand colour) but hero is generic. No overflow, sound headings, NG0913 oversized screenshots.

## Priority issues
- [P0] First viewport carries no evidence (hero lines 18–57). Fix: ~30svh hero, show project.description, meta row kind·role·years·platform; outcomes in hero for open source. /impeccable layout
- [P1] Screens buried and uncaptioned (126–170, item template). Fix: visible imageName captions, n/N counter, move screens up / interleave. /impeccable layout
- [P1] Page ends without contact path (219–253). Fix: closing CTA band with mailto + résumé; prev/next within kind. /impeccable clarify
- [P2] Line length 96–102ch (75, 81). Fix: ~65ch. /impeccable typeset
- [P2] Gallery a11y: focus not restored, unnamed dialog and navigators, thumbnail alt="" (208). /impeccable harden

## Persona red flags
Casey: decorative first screen; screens 2.5 viewports down; 96px nav circles over image; duplicated thumbnail arrows; letterboxed landscape; oversized PNGs.
Jordan: can't tell job/contract/side project, client vs open source; thin pages say nothing of Isah's role.
Sam: headings fine; focus loss, unnamed dialog/navigators.
Hiring manager: no ownership/scale/result in 10s; sole-author vs team split invisible; résumé only in footer.

## Minor
Kollo logo vanishes in light theme; generic "screen N" names for Hobeei/Apply/Talk360 Calling; uneven thumbnail framing, ragged last row; dead sm:block spacers (235, 251); hero CTA sends visitor away first; "About the work" vs "The work"; unused font preload.

## Questions
Why does the client logo own the first viewport? Should thin projects have pages? Should the page be built around captioned screens?
