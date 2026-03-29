# Metanova — Agent Configuration

## Project

Website for Metanova — structural engineering, real estate development, and project management firm based in Brossard, Quebec.

Built with Next.js (App Router), Tailwind CSS 4, shadcn/ui v4. Deployed to Vercel.

## Commands

```
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint
npm run validate:artifacts  # Validate pipeline artifacts against Zod schemas
npm run enhance:assets   # Add approval fields to asset manifest
npm run extract:framer   # Re-extract from live Framer site
npm run curate:assets    # Re-curate asset library
```

## TypeScript

- Strict mode enabled (`strict: true`, `noUncheckedIndexedAccess: true`)
- Never use `any` — prefer `unknown` + type narrowing
- Zod 4 is installed (not Zod 3 — API differences exist)

## Content Layer

All user-facing text lives in `content/{en,fr}/pages/*.mdx` files with YAML frontmatter.
Components import content via `src/lib/content/loader.ts`.
Never hardcode strings in JSX components (except UI labels).

## Key Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| Site brief | `site-brief.yaml` | YAML (3-tier: extracted/confirmed/generated) |
| Asset manifest | `public/metanova-assets/manifest.json` | JSON (36 assets with approval flags) |
| Site manifest | `site-manifest.json` | JSON (design tokens from Framer) |
| Blueprint | `blueprint.md` | YAML frontmatter + markdown rationale |
| Quality report | `quality-report.json` | JSON (Lighthouse, screenshots, content checks) |
| Deploy report | `deploy-report.json` | JSON (preview/production URLs) |

All artifacts are Zod-validated via `npm run validate:artifacts`.

## Project Structure

```
src/app/           # Next.js App Router pages
src/lib/schemas/   # Zod schemas for all 6 artifacts
src/lib/content/   # Content loading utilities (MDX frontmatter)
src/components/    # React components (shadcn/ui based)
content/           # MDX content files (agent-editable text)
scripts/           # Build, QA, and extraction scripts
public/            # Static assets (images, fonts, llms.txt)
framer-export/     # Raw Framer extraction output (HTML + text)
```
