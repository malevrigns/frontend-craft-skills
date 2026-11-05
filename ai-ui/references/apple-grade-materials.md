# Apple-inspired product craft (v3.2) — not a preset theme

Scope: Web/dashboard/mobile product UI when the user requests “苹果质感”, “macOS-like”, “Apple polish”, “精致”, or a premium native-feeling interface. Do NOT clone Apple's proprietary assets, trademarks, or product UI exactly. The goal is *optical quality* and coherent system behavior, not screenshot mimicry.

## Non-negotiable design distinction
Apple's HIG Materials makes a structural distinction between translucent **navigation/control layer** and readable **content layer**. Implement it. Glass on every card creates noise and low contrast. Materials communicate role rather than decorate.

Model four depth levels, with intentional transitions:

| Layer | Role | Suggested treatment | Why |
| --- | --- | --- | --- |
| L0 | environment/background | nearly neutral warm/cool surface, broad low-opacity light pools; never small noisy gradient patches | spatial grounding |
| L1 | content/data | mostly **opaque** white or equivalent dark semantic surface, 22–28px coherent corners, restrained borders + two-scale diffuse shadow | prioritize legibility |
| L2 | persistent chrome | translucent sidebar / floating toolbar, `backdrop-filter: blur(24–40px) saturate(140%)`; neutral material, visible separation | place/context |
| L3 | transient controls | popovers/command palette stronger blur + opaque fallback and shadow; keyboard/focus handling | clear elevation |

Anti-patterns:
- Applying `.liquid-glass` to chart cards, data tables, badges, floating menus, sidebar, all simultaneously.
- Plastic/cheap neumorphism: high-contrast double shadows, hard black outlines, outer glow on every element.
- Random blue-purple gradients or unrelated cards mistaken for brand quality.
- 9px data labels and low-contrast tertiary text used as a shortcut to 'minimalism'.
- Giant hero copy displacing the user's main task; universal 3/4 equal cards even when one data story matters.
- Desktop dashboard collapsed to a scaled-down desktop table at 390px.

## Measurable optical spec
- Pick **one dominant accent**. Use it for active controls, focused chart series, and one key action. Supporting tones should be quieter or semantic.
- Text: system UI font (`-apple-system`, BlinkMacSystemFont, "SF Pro Display" if licensed/system-provided, `PingFang SC`, system sans), true numerals, tabular alignment. Do NOT redistribute font files. Create type hierarchy (e.g. 40/31/18/14/12px desktop; 29/25/17/14/12px small) and retain line height.
- Body text and meaningful secondary text should meet WCAG AA contrast where possible (normal text 4.5:1, large 3:1); decorative labels may be lighter, but never critical chart axes/status/amounts. **Do not make 9px the default**.
- Optical spacing: no universal equally sized gaps. Define section cadence (8/12/16/22/30/44px) and align primary baselines across panels. Tables need comfortable line-height and stable alignment.
- Corners: broad outer corners 22–28, tool control 10–14, segmented segments 8–10; nesting uses smaller radius than container; avoid radius 20 on every primitive.
- Border: hairline opacity ~0.05–0.12; subtly brighter upper edge; shadow two separable scales (e.g. `0 24px 64px -38px rgba(45,55,90,.28), 0 5px 22px -11px rgba(51,64,100,.11)`), never heavy gray stroke around all cards.
- Chart: one foreground series, softly colored fill, comparison series visibly secondary, axis numerically correct, annotations never occlude data. SVG paths should **not inherit icon stroke**. Test chart axis at 320/390/768.
- Motion: 160–280ms response, 320–450ms surface appearance only when meaningful; respect `prefers-reduced-motion`; never rely on animation for readability.
- Glass fallback: `@supports not (backdrop-filter: blur(1px))` → appropriate opaque background, no invisible text.

## Mandatory review protocol
1. Capture actual 1440 / 1024 / 768 / 390 / 320. Inspect 1440 composition and 390 scrolling *by eye*, not only overflow.
2. Turn off colors mentally: check reading order, first five-second impression, and whether the main insight is clear.
3. Check every data label at **actual device CSS pixel size**; inspect on light/dark separately.
4. Inspect radius nesting, inner white reflection, shadow falloff, system font, icon stroke, hover/pressed/focus in a cropped close-up.
5. Check 768: if chart plot width too compressed or legends collide, give the chart a full row and move insights below.
6. Report 3 shortcomings with image evidence and fix at least the top 2. *No self-awarded automatic aesthetics pass.*

## Design decision record
Every Apple-inspired deliverable must include `MATERIAL_DECISIONS.md` documenting: design goal; chosen focal point; why these material layers; exact type/space/corner/shadow/accent values; 2 rejected alternatives; cross-platform consequences; screenshot evidence; unresolved limitations. `BROWSER_VERIFIED` remains separate from subjective quality.

## Suggested starting language (not a mandatory template)
“Use a calm macOS-like information environment: faint ambient light, translucent peripheral navigation, stable opaque information surfaces, soft top-edge highlights, disciplined typographic scale and numbers, with the single accent reserved for selected states and core data. Treat physical depth as a hierarchy, not a glass preset. Preserve main tasks above the fold and optimize by viewport.”

Official grounding: https://developer.apple.com/design/human-interface-guidelines/materials — reference the role of materials, not copy UIKit/Cocoa exact assets.
