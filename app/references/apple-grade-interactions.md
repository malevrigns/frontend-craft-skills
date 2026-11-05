# Apple-inspired interaction precision (v3.2)

Goal: precise, responsive, accessible interactions supporting the visual material hierarchy. 'Apple feel' is NOT a mandatory bouncy animation. Every motion cue must convey activation, continuity or spatial elevation.

## Motion grammar
| Interaction | Feedback | Recommended duration | Accessibility |
|---|---|---|---|
| Hover toolbar button | subtle contrast/1px elevation; never color-only for focus | 120–180ms ease | clear focus outline |
| Press control | slight 0.985 scale max, only for tactile hint | 80–140ms | no dependency on animation |
| Segment switch | selected surface changes with distinct active contrast; chart updates immediately | 180–240ms | use `aria-pressed` |
| Open popover | small 4px travel + opacity; positioned under trigger | 160–220ms | Escape and returning focus |
| Open command palette | dim background + blur without losing legibility | 180–260ms | dialog focus trap, arrow key navigation, Escape |
| Sidebar on mobile | slide + scrim, prevent background scroll | 220–300ms | focus into sidebar, restore on close |
| Data chart hover | dot, vertical guide and data value, avoid jitter | immediate / 80ms | chart accessible text summary |

## Edge cases which must become tests
- Fixed viewport small width & short height; no clipped controls, horizontal scroll, or phantom overlays.
- Keyboard: Tab, Shift+Tab, ArrowUp/ArrowDown for quick actions; Cmd/Ctrl+K and Escape work with focus return; drawer cannot leave background interactive.
- Date range changes **all related KPI + chart values** synchronously. No stale totals; chart's label units and legend match data.
- Search and status filter combine, support true empty state. Exports identify synthetic demo data and use safe CSV escaping.
- Theme changes all semantic surfaces, text, shadows, charts, menus, and focus. A dark screenshot with white floating popovers is not a pass.
- Reduced motion stops perpetual motion and removes unnecessary transitions.
- Display users which features are unavailable in a demo rather than fake navigation or claim real business synchronization.

## Quality gate (must NOT reduce to selector checks)
Collect evidence of: (1) transitions visually make sense frame-to-frame, (2) keyboard works, (3) reduced motion, (4) touch, (5) guard against double clicks, (6) one failure/empty path. Screen recordings/screenshots may evidence state; static source lint cannot establish perceived quality.
