# Platform implementation notes

Web React + Tailwind: DOM/CSS, pseudo-elements, backdrop-filter, HTML video, focus-visible, Lucide React.
Expo Native: View/Text/Pressable, React Native StyleSheet and Image/Video, Reanimated if needed. DOM tags, CSS `::before`, `backdrop-filter` and HTML video cannot be imported into native components. Reimplement appearance with supported native primitives; validate on device.
Tauri/Electron: wraps Web frontend; has different permission, packaging, media playback and file API constraints. No implied native equivalence.
WeChat mini program: WXML/WXSS event adapters; not React DOM.
Deliver same behavioral contract, not fake source-level portability. Platform-specific acceptance testing remains required.
