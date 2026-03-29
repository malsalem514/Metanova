# MetaNova — Claude Code Configuration
<!-- See also: AGENTS.md for universal agent instructions (non-Claude agents) -->

@AGENTS.md

## Claude-Specific Skills

- Use `@frontend-design` skill during Blueprint phase (aesthetic direction, anti-generic enforcement)
- Use `@vercel-react-best-practices` during Generate phase (65 performance rules)
- Use `@webapp-testing` and `@playwright-cli` during QA phase (browser testing)
- Use `@nextjs-app-router-patterns` for all App Router code (Server Components, streaming, metadata)
- Use `@web-design-guidelines` for design/accessibility review passes
- Use `@typescript-advanced-types` for schema and type design

## Content Provenance Rule

All text in components MUST come from `content/*.mdx` files or `site-brief.yaml`.
Never hardcode user-facing strings in JSX (except UI labels like "Menu", "Close", "Submit").
If content is missing from site-brief.yaml, stop and ask the operator.

## Artifact Validation

Run `npm run validate:artifacts` after creating or modifying:
- `site-brief.yaml`
- `site-manifest.json`
- `public/metanova-assets/manifest.json`

## Generation Order (Phase 3)

Foundation → Shell → Homepage → Internal → Portfolio → Polish.
Never skip ahead. Each step must build successfully before proceeding.
Max 5 build retries per step. Escalate to operator if stuck.
