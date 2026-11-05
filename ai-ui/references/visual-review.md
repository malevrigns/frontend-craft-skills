# Visual review rubric / evidence

## Never auto-approve aesthetics
Static checks can detect absent fields, not whether a design is compelling. Human review is mandatory; screenshots prove rendering occurred but do not prove quality.

## Score each 1–5 with an observation
1. **Composition**: eye follows intended focal point; whitespace and optical balance make sense.
2. **Hierarchy**: headline, supporting explanation and CTA visually ordered; primary job visible early.
3. **Identity**: distinct brand traits vs generic templates, with rationale.
4. **Craft**: typographic proportions, baseline, micro alignment, material restrained and coherent.
5. **Responsiveness**: 320/390/768/1440 and small-height; no critical content clipped.
6. **Asset fidelity**: imagery matches direction, correct crop, loading and fallback.

Scoring threshold: minimum 4/5 in composition, hierarchy and responsive to recommend publish; no blocker; evidence and screenshot paths required. Scores require notes; do not fabricate a 5/5. If actual browser unrun, mark unverified and do not assign passing score.

## Screenshot protocol
- Capture at 1440x900, 768x1024, 390x844, 320x640; include dark/dynamic content state when relevant.
- Check without remote assets (fallback), low bandwidth, prefers-reduced-motion and 200% zoom.
- Label actual vs illustrative preview; report source tech stack and runtime.
- Track one top defect, fix, repeat. Preserve reference version for A/B comparison.
