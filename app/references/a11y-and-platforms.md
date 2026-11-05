# A11y & platform parity

All interactive elements semantic; submit button in actual form; label / sr-only allowed when visible design constraints. Min interactive target ~44x44 px; visible focus ring; avoid gesture-only pathways.

Modal/dialog/mobile nav: Escape, focus trap, return focus, scroll lock, close button; don't block keyboard with decorative layers. Announce asynchronous states in aria-live. Provide ability to disable video or rely on reduced motion settings. Form input type=email with validity check; success must match actual backend persistence or say demo.

For Expo Native replace DOM+CSS implementations with Pressable, View, Text, TextInput, appropriate video library and RN accessibility props. Tauri embeds web frontend, not native RN. Do not claim testing of devices without device test logs.
