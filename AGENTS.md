# Metanova — Agent Configuration

## Project

Bilingual website (EN + FR) for Metanova Experts-Conseils — structural engineering, real estate development, and project management firm in Brossard, Quebec.

**Live:** https://metanova-vercel.vercel.app
**GitHub:** https://github.com/malsalem514/Metanova
**Auto-deploy:** `git push` to main → Vercel deploys automatically

## Tech Stack

Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui v4, Motion (animation), next-intl (i18n), Vercel hosting. TypeScript strict mode. Zod 4 for schemas.

## Commands

```
npm run dev              # Dev server
npm run build            # Production build
npm run lint             # ESLint
npm run validate:artifacts  # Zod-validate pipeline artifacts
```

## i18n

- Default locale: `fr` (French). Root `/` → `/fr`.
- Locales: `fr`, `en`
- UI strings: `messages/{en,fr}.json`
- Page content: `content/{en,fr}/pages/*.mdx`
- Routing: `src/i18n/routing.ts` (localized pathnames)
- Navigation: Use `Link` from `@/i18n/navigation` (NOT `next/link`)
- All new pages need both EN + FR versions + `generateStaticParams`

### URL Map

| EN | FR |
|----|-----|
| `/en` | `/fr` |
| `/en/about` | `/fr/a-propos` |
| `/en/services` | `/fr/services` |
| `/en/services/structural-engineering` | `/fr/services/ingenierie-structurale` |
| `/en/services/real-estate-development` | `/fr/services/developpement-immobilier` |
| `/en/services/project-management-consulting` | `/fr/services/gestion-de-projet` |
| `/en/contact` | `/fr/contact` |
| `/en/careers` | `/fr/carrieres` |

## Pages (8 × 2 locales = 16 rendered)

Home, About, Services, Structural Engineering, Real Estate Development, Project Management, Contact, Careers

## Company Facts (DO NOT INVENT)

- **Name:** Metanova (legal: Metanova Experts-Conseils)
- **Founded:** 2022
- **Address:** 7005 boulevard Taschereau, Suite 305, Brossard, QC J4Z 1A7
- **Email:** info@metanova.ca | **Phone:** +1 (514) 222-3444
- **Hours:** Mon–Fri 9:00 AM – 5:00 PM
- **Services:** Structural Engineering, Real Estate Development, Project Management
- **Areas:** Montérégie, Montréal, South Shore, Laval, Greater Montreal, Across Québec
- **Founders:** Suddam Al-Salem ing. (Engineering) + Muhannad Al-Salem (RE Development)

## Design System

- **Font:** Plus Jakarta Sans (weight 500 headings, 400 body)
- **Background:** Warm cream `#F5F0E6`
- **Text:** `#121212` | **Accent:** `#0A5592`
- **Cards:** White on cream, border `#E8E0D0`
- **Footer:** Dark teal `#1B2E37`
- **Buttons:** Square, 12px, `px-5 py-2.5`
- **Spacing:** `py-24` (96px) all sections

## Content Layer

```
content/{en,fr}/pages/*.mdx   — page content (YAML frontmatter)
messages/{en,fr}.json          — UI strings (nav, buttons, labels)
```

Load via: `loadContent("pages/home", locale)`

## Project Structure

```
src/app/[locale]/      — all pages under locale segment
src/components/        — layout/, sections/, ui/, seo/
src/i18n/              — routing, navigation, request config
src/lib/               — content loader, schemas, utils
src/middleware.ts      — locale detection
content/{en,fr}/       — MDX content per locale
messages/              — UI translation JSON
public/metanova-assets/ — images, logos, video
```

## SEO

Sitemap with hreflang, robots.txt, JSON-LD (Organization, WebSite, LocalBusiness, Service), OG tags per page, `llms.txt` for AI crawlers.

## Accessibility

Skip link, `prefers-reduced-motion`, focus-visible styles, form labels, semantic HTML, WCAG AA contrast.
