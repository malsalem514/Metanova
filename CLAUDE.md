# Metanova — Claude Code Configuration
<!-- See also: AGENTS.md for universal agent instructions (non-Claude agents) -->

@AGENTS.md

## Claude-Specific Skills

- Use `@frontend-design` skill for design changes (aesthetic direction, anti-generic enforcement)
- Use `@vercel-react-best-practices` for performance optimization (65 rules)
- Use `@webapp-testing` and `@playwright-cli` for QA (browser testing)
- Use `@nextjs-app-router-patterns` for all App Router code (Server Components, streaming, metadata)
- Use `@web-design-guidelines` for design/accessibility review passes
- Use `@typescript-advanced-types` for schema and type design

## Content Provenance Rule

All text in components MUST come from `content/{en,fr}/pages/*.mdx` files or `messages/{en,fr}.json`.
Never hardcode user-facing strings in JSX (except UI labels like "Menu", "Close", "Submit").
If content is missing, stop and ask the operator.

## i18n Rules

- Default locale: `fr` (French) — `/` redirects to `/fr`
- Two locales: `fr` and `en`
- UI strings: `messages/{en,fr}.json` via `useTranslations()`
- Page content: `content/{en,fr}/pages/*.mdx` via `loadContent(path, locale)`
- Routing config: `src/i18n/routing.ts` — localized pathnames defined here
- Navigation: ALWAYS use `Link` from `@/i18n/navigation`, NOT `next/link`
- All new pages MUST have both EN and FR versions
- All new pages MUST have `generateStaticParams` returning both locales

## Deploy

- GitHub: https://github.com/malsalem514/Metanova
- Vercel: https://metanova-vercel.vercel.app
- Auto-deploy: `git push origin main` → Vercel builds + deploys (~60s)
- Manual deploy: `vercel deploy --prod`
