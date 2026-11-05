# Agent instructions for Frontend Craft Skills v4

1. Read `ai-ui/SKILL.md`, `ai-ui/references/attention-architecture.md`, `ai-ui/references/spec-contract-v4.md` when designing.
2. Read `app/SKILL.md` and `app/references/attention-interaction.md` before implementing interactions.
3. First output a user-specific visual direction and a design/interaction contract. Respect pinned requirements; do not copy a specimen design across categories.
4. Validation: `node scripts/test-v4.mjs` + spec validators; then actual browser/native screenshots and user-facing review. Static check PASS never implies aesthetic PASS.
5. Don't invent usage counts, ratings, testimonials, research citations, or conversion lift; demo data must be clearly disclosed.
6. Before adding new dependencies, inspect `docs/LIBRARY_SELECTION.md`; Web CSS is not React Native CSS.
7. Legacy examples are archival and should not be installed by default. No automatic GitHub publication.
