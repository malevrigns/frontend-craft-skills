# Motion and media engineering

Motion taxonomy: orientation, feedback, continuity, brand. Default: feedback 100–220ms; panel 220–400ms; scene transitions may be 1000ms when brand-specific; stagger <300ms total unless directed. Numbers are defaults, not aesthetic laws.

Use transform/opacity for compositing; not mandatory to animate every control. Debounce or guard rapid state changes; clean up timers / event listeners / media on unmount. `prefers-reduced-motion: reduce` should replace movement with immediate state change. For autoplay ambient video, specify fallback, visibility pause, preload budgets, poster and error handling. A hidden video may still decode: do not force 4 simultaneous loops when user experience does not require it. Preserve 4 separate video elements if faithful layout requires it but pause inactive sources.

Contrast over dynamic imagery must be observed frame-by-frame in practice; a single token ratio does not prove readability over video. Add subtle scrim where necessary; avoid blindly recoloring text.
