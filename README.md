# MetaNova Vercel Rebuild

This project is the clean rebuild workspace for the current MetaNova Framer site.

It includes:
- a fresh [Next.js](https://nextjs.org) app ready for Vercel
- a Framer extraction script for pulling page snapshots and media locally
- a simple dashboard homepage that shows what has been exported

## Local setup

Install dependencies, extract the source content, and start the app:

```bash
npm install
npm run extract:framer
npm run curate:assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Framer export outputs

Running `npm run extract:framer` pulls content from the published Framer site and saves:

- `framer-export/manifest.json`
- `framer-export/pages/**/index.html`
- `framer-export/text/**/index.txt`
- `public/framer-assets/**`

Running `npm run curate:assets` creates the named rebuild library in:

- `public/metanova-assets/**`
- `public/metanova-assets/manifest.json`
- `docs/curated-assets.md`

By default the extractor targets:

```bash
https://famous-functions-016357.framer.app
```

You can override that if needed:

```bash
FRAMER_SITE_ORIGIN="https://your-site.framer.app" npm run extract:framer
```

## Deploy to Vercel

This app is already structured for Vercel:

```bash
npm run build
```

Then connect the repo to [Vercel](https://vercel.com/new) and deploy as a standard Next.js project.
