# Design specification contract

Save `design-spec.json`; prefer specific values and reasons over vibes. Required fields are checked by `scripts/validate-spec.mjs`.

```json
{
  "schemaVersion": "3.0",
  "mode": "faithful",
  "product": {"name": "...", "type": "marketing", "audience": "...", "primaryJob": "...", "platforms": ["web"]},
  "designDecision": {"thesis": "...", "focalPoint": "...", "firstAction": "...", "rationale": "...", "rejectedPattern": "..."},
  "typography": {"display": "...", "body": "...", "loading": "...", "hierarchy": [{"role":"h1", "size":"...", "lineHeight":"..."}]},
  "palette": {"foreground": "#FFFFFF", "background": "#000000", "accent": "#FFFFFF", "contrastStrategy": "..."},
  "layout": {"container": "...", "breakpoints": [{"width": 390,"behavior":"..."},{"width":1440,"behavior":"..."}], "primaryVisibleInFirstViewport": true},
  "layers": [{"id":"video", "z": 0, "role":"background"}, {"id":"content", "z":2,"role":"interactive"}],
  "assets": [{"id":"video-0", "url":"https://...", "role":"background", "fallback":"...", "verification":"unverified", "rights":"user-provided; license not verified"}],
  "components": [{"id":"hero-cta", "role":"primary-action", "spec":"..."}],
  "motion": [{"id":"scene-crossfade", "durationMs":1000, "easing":"ease-in-out", "purpose":"continuity", "reducedMotion":"instant"}],
  "constraints": ["..."],
  "sourceTrace": ["user Lumora specification"]
}
```

`verification` is `verified` / `unverified` / `failed`. A reachable URL does not imply a license. Never invent assets, statistics or test results. If user demanded faithful implementation, do not reinterpret pixel values. If modifying because of accessibility, record deviation in `constraints`/QA.
