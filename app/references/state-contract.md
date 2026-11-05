# Interaction specification contract

Required JSON shape:
```json
{
  "schemaVersion":"3.0",
  "product":"Lumora",
  "platforms":["web"],
  "interactions":[{
    "id":"scene-switch",
    "componentId":"scene-switcher",
    "trigger":"click scene tab",
    "guard":"ignore during crossfade and if current index",
    "stateBefore":"activeVideo=0",
    "stateAfter":"activeVideo=clickedIndex",
    "feedback":"1000ms opacity crossfade; 700ms text theme",
    "durationMs":1000,
    "failure":"remote video fails to load",
    "recovery":"use gradient fallback, keep text readable",
    "keyboard":"Tab to button, Enter/Space activates",
    "touch":"tap target >=44px",
    "a11y":"aria-pressed on active, live status announcement",
    "reducedMotion":"instant transition; no bob",
    "testCases":["switch 0->2","rapid repeated selection does not race"]
  }]
}
```

Every item is independently verifiable; test IDs should match `design-spec.json` component IDs. No pure visual delight without underlying state meaning unless explicitly tagged as brand motion. Provide test procedures, not only expected effect prose.
