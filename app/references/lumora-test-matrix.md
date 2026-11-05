# Lumora test matrix

| ID | Action | Expected | Required evidence |
|---|---|---|---|
| V01 | choose third video | active scene changes, #182C41 central text only, top/footer always white | screenshot + aria pressed |
| V02 | rapid switch within 1000ms | 2nd request ignored | timer and state assertion |
| M01 | mobile menu open | backdrop, stagger links, X icon, focus moved into dialog | mobile screenshot + activeElement |
| M02 | Escape or close | menu hidden, focus returned | keyboard |
| E01 | invalid email | native validation / accessible alert, no fake success | keyboard/form |
| E02 | valid email in demo mode | explicit no-backend confirmation, no network call claimed | DOM text |
| P01 | missing remote video | static offline fallback and CTA visible | blocked network screenshot |
| P02 | reduced motion | bob disabled, crossfade immediate, video pausing | emulate media |
| R01 | desktop 1440 and tablet 768 | nav layout, no overflow | screenshots |
| R02 | mobile 390 and compact 320 | menu works, CTA not clipped | screenshots |
| A01 | tab sequence and focus | keyboard operable, visible focus outline | keyboard test |

Tests must distinguish HTML standalone preview from the React/Tailwind app. A preview test cannot certify the React app, remote media availability, or actual native build.
