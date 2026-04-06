# Client Content Update — Videos, Images & About Page Refresh

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hero videos to all pages (currently only Home has one), replace service card images, update founders photo, refresh About page French+English content, and remove About page redundancies.

**Architecture:** Videos are compressed via ffmpeg to ~1080p/720p web-optimized MP4+WebM, stored in `public/metanova-assets/`. The `HeroSection` component already supports `videoSrc` prop. The `ServiceDetail` component needs a new `videoSrc` prop added. Content updates go through MDX frontmatter files. The About page redundancy fix removes duplicate stats and the redundant "Strategic Approach" 3-card section from `AboutInlineSections`.

**Tech Stack:** Next.js 16, ffmpeg (video compression), sharp/sips (image optimization), MDX content files

---

### Task 1: Compress and prepare all 7 hero videos

**Files:**
- Create: `public/metanova-assets/hero/home-hero-web.mp4` (replace existing)
- Create: `public/metanova-assets/hero/home-hero-web.webm` (replace existing)
- Create: `public/metanova-assets/hero/about-hero.mp4`
- Create: `public/metanova-assets/hero/about-hero.webm`
- Create: `public/metanova-assets/hero/services-hero.mp4`
- Create: `public/metanova-assets/hero/services-hero.webm`
- Create: `public/metanova-assets/hero/structural-hero.mp4`
- Create: `public/metanova-assets/hero/structural-hero.webm`
- Create: `public/metanova-assets/hero/realestate-hero.mp4`
- Create: `public/metanova-assets/hero/realestate-hero.webm`
- Create: `public/metanova-assets/hero/project-mgmt-hero.mp4`
- Create: `public/metanova-assets/hero/project-mgmt-hero.webm`
- Create: `public/metanova-assets/hero/careers-hero.mp4`
- Create: `public/metanova-assets/hero/careers-hero.webm`
- Create: poster JPGs for each (e.g. `about-hero-poster.jpg`)

Source files in `~/Desktop/metanova/new folder/`:
| Source File | Target Name | Notes |
|---|---|---|
| `Home page - top of the page.mp4` | `home-hero-web` | Replaces existing, 4K→720p |
| `about us page - top of page.mp4` | `about-hero` | New |
| `Services - top of page.mp4` | `services-hero` | New |
| `Structure engineering - top of page.mp4` | `structural-hero` | New |
| `Real-estate developement - top of page.mp4` | `realestate-hero` | New |
| `Project management - top of the page.mp4` | `project-mgmt-hero` | Has audio track, strip it |
| `Careers - top pf page.mp4` | `careers-hero` | New |

- [ ] **Step 1: Compress all videos to MP4 (h264, 720p, CRF 28, no audio)**

Use the existing home video as the quality benchmark: 720p, ~1500kbps, 24fps.

```bash
SRC=~/Desktop/metanova/new\ folder
DEST=/Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero

# Home (4K source → 720p)
ffmpeg -y -i "$SRC/Home page - top of the page.mp4" \
  -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/home-hero-web.mp4"

# About (2160x1440 → 720p)
ffmpeg -y -i "$SRC/about us page - top of page.mp4" \
  -vf "scale=1080:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/about-hero.mp4"

# Services (1764x1176 → 720p)
ffmpeg -y -i "$SRC/Services - top of page.mp4" \
  -vf "scale=1080:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/services-hero.mp4"

# Structural Engineering (1764x1176 → 720p)
ffmpeg -y -i "$SRC/Structure engineering - top of page.mp4" \
  -vf "scale=1080:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/structural-hero.mp4"

# Real Estate Development (1920x1080 → 720p, has audio)
ffmpeg -y -i "$SRC/Real-estate developement - top of page.mp4" \
  -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/realestate-hero.mp4"

# Project Management (1920x1080 → 720p, has audio)
ffmpeg -y -i "$SRC/Project management - top of the page.mp4" \
  -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/project-mgmt-hero.mp4"

# Careers (1908x1076 → 720p)
ffmpeg -y -i "$SRC/Careers - top pf page.mp4" \
  -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  "$DEST/careers-hero.mp4"
```

- [ ] **Step 2: Generate WebM versions of all 7 videos**

```bash
DEST=/Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero

for name in home-hero-web about-hero services-hero structural-hero realestate-hero project-mgmt-hero careers-hero; do
  ffmpeg -y -i "$DEST/$name.mp4" -c:v libvpx-vp9 -crf 35 -b:v 0 -an "$DEST/$name.webm"
done
```

- [ ] **Step 3: Generate poster JPGs from first frame of each video**

```bash
DEST=/Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero

ffmpeg -y -i "$DEST/home-hero-web.mp4" -frames:v 1 -q:v 2 "$DEST/home-hero-poster.jpg"
ffmpeg -y -i "$DEST/about-hero.mp4" -frames:v 1 -q:v 2 "$DEST/about-hero-poster.jpg"
ffmpeg -y -i "$DEST/services-hero.mp4" -frames:v 1 -q:v 2 "$DEST/services-hero-poster.jpg"
ffmpeg -y -i "$DEST/structural-hero.mp4" -frames:v 1 -q:v 2 "$DEST/structural-hero-poster.jpg"
ffmpeg -y -i "$DEST/realestate-hero.mp4" -frames:v 1 -q:v 2 "$DEST/realestate-hero-poster.jpg"
ffmpeg -y -i "$DEST/project-mgmt-hero.mp4" -frames:v 1 -q:v 2 "$DEST/project-mgmt-hero-poster.jpg"
ffmpeg -y -i "$DEST/careers-hero.mp4" -frames:v 1 -q:v 2 "$DEST/careers-hero-poster.jpg"
```

- [ ] **Step 4: Verify all files exist and check sizes**

```bash
ls -lh /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero/*.mp4 \
       /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero/*.webm \
       /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/hero/*-poster.jpg
```

All MP4s should be under 4 MB. WebMs should be smaller than their MP4 counterparts.

---

### Task 2: Optimize and place the 3 new images

**Files:**
- Create: `public/metanova-assets/services/structural/construction-cranes.webp` (new structural card image)
- Create: `public/metanova-assets/services/development/aerial-masterplan.webp` (new real estate card image)
- Create: `public/metanova-assets/people/founders-portrait-new.jpg` (replace existing)

Source images:
| Source | Target | Action |
|---|---|---|
| `Structure engineering - in services page.png` (2.3MB, 1536x1024) | `services/structural/construction-cranes.webp` | Convert PNG→WebP, quality 80 |
| `Real Estate Development - in services page.JPG` (344KB, 1024x1024) | `services/development/aerial-masterplan.webp` | Convert JPG→WebP, quality 80 |
| `to put in section (BEGINNINGS).png` (1.8MB, 5120x3412) | `people/founders-portrait-new.jpg` | Resize to 1600px wide, quality 85 |

- [ ] **Step 1: Convert structural engineering image to WebP**

```bash
sips -s format webp -s formatOptions 80 \
  ~/Desktop/metanova/new\ folder/Structure\ engineering\ -\ in\ services\ page.png \
  --out /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/services/structural/construction-cranes.webp
```

- [ ] **Step 2: Convert real estate development image to WebP**

```bash
sips -s format webp -s formatOptions 80 \
  ~/Desktop/metanova/new\ folder/Real\ Estate\ Development\ -\ \ in\ services\ page.JPG \
  --out /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/services/development/aerial-masterplan.webp
```

- [ ] **Step 3: Resize and replace founders photo**

```bash
sips -Z 1600 -s format jpeg -s formatOptions 85 \
  ~/Desktop/metanova/new\ folder/to\ put\ in\ section\ \(BEGINNINGS\).png \
  --out /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/people/founders-portrait-new.jpg
```

- [ ] **Step 4: Verify images**

```bash
ls -lh /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/services/structural/construction-cranes.webp \
       /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/services/development/aerial-masterplan.webp \
       /Users/musaalsalem/Projects/MusaOS/metanova-vercel/public/metanova-assets/people/founders-portrait-new.jpg
```

---

### Task 3: Update HeroSection to support per-page poster images

**Files:**
- Modify: `src/components/sections/HeroSection.tsx:103` (poster prop)

Currently the poster is hardcoded to `home-hero-poster.jpg`. We need to derive it from the videoSrc.

- [ ] **Step 1: Update HeroSection to derive poster from videoSrc**

In `src/components/sections/HeroSection.tsx`, change line 103:

```tsx
// OLD:
poster="/metanova-assets/hero/home-hero-poster.jpg"

// NEW:
poster={videoSrc?.replace('.mp4', '-poster.jpg')}
```

This automatically maps `about-hero.mp4` → `about-hero-poster.jpg`, etc.

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 4: Add video support to ServiceDetail component

**Files:**
- Modify: `src/components/sections/ServiceDetail.tsx`

The `ServiceDetail` component (used by structural-engineering, real-estate-development, project-management pages) only supports a static hero image. We need to add optional `videoSrc` prop with the same pattern as `HeroSection`.

- [ ] **Step 1: Add videoSrc prop and video element to ServiceDetail**

In `src/components/sections/ServiceDetail.tsx`:

Add to interface:
```tsx
interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  videoSrc?: string;      // ADD THIS
  points: ServicePoint[];
  ctaText?: string;
}
```

Add `videoSrc` to destructuring:
```tsx
export function ServiceDetail({
  title,
  subtitle,
  description,
  heroImage,
  videoSrc,             // ADD THIS
  points,
  ctaText = "Discuss Your Project",
}: ServiceDetailProps) {
```

Add `useEffect` and `useRef` imports at top (change the existing import):
```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
```

Add `videoRef` and autoplay effect inside the component function (before the return):
```tsx
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  const attemptPlay = () => {
    video.play().catch(() => {});
  };
  attemptPlay();
  const handleInteraction = () => {
    attemptPlay();
    document.removeEventListener("touchstart", handleInteraction);
    document.removeEventListener("click", handleInteraction);
  };
  document.addEventListener("touchstart", handleInteraction, { once: true });
  document.addEventListener("click", handleInteraction, { once: true });
  return () => {
    document.removeEventListener("touchstart", handleInteraction);
    document.removeEventListener("click", handleInteraction);
  };
}, []);
```

Add video element after the `<Image>` tag in the hero section:
```tsx
{videoSrc && (
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    poster={videoSrc.replace('.mp4', '-poster.jpg')}
    className="absolute inset-0 z-[1] h-full w-full object-cover"
    aria-label={`${title} video`}
  >
    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
    <source src={videoSrc} type="video/mp4" />
  </video>
)}
```

Update the overlay div z-index to sit above video:
```tsx
<div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#1B2E37]/50 via-[#1B2E37]/30 to-[#1B2E37]/70" />
```

Update the content div z-index:
```tsx
<div className="relative z-[3] mx-auto w-full max-w-[1240px] px-6 pb-16 pt-32">
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 5: Wire up videos to all pages

**Files:**
- Modify: `content/en/pages/home.mdx` (update video path)
- Modify: `content/fr/pages/home.mdx` (update video path)
- Modify: `content/en/pages/services.mdx` (add hero_video)
- Modify: `content/fr/pages/services.mdx` (add hero_video)
- Modify: `src/app/[locale]/about/page.tsx` (add videoSrc prop)
- Modify: `src/app/[locale]/careers/page.tsx` (add videoSrc prop)
- Modify: `src/app/[locale]/services/page.tsx` (add videoSrc prop)
- Modify: `src/app/[locale]/services/structural-engineering/page.tsx` (add videoSrc)
- Modify: `src/app/[locale]/services/real-estate-development/page.tsx` (add videoSrc)
- Modify: `src/app/[locale]/services/project-management-consulting/page.tsx` (add videoSrc)

- [ ] **Step 1: Update Home page MDX — both locales set `hero_video` to new path**

Both `content/en/pages/home.mdx` and `content/fr/pages/home.mdx`: change `hero_video` to:
```
hero_video: "/metanova-assets/hero/home-hero-web.mp4"
```
(EN file currently points to `home-hero-video.mp4` — update to match the new compressed file name)

- [ ] **Step 2: Add hero_video to Services MDX files**

In `content/en/pages/services.mdx` and `content/fr/pages/services.mdx`, add after `hero_image`:
```yaml
hero_video: "/metanova-assets/hero/services-hero.mp4"
```

- [ ] **Step 3: Wire videoSrc in Services page.tsx**

In `src/app/[locale]/services/page.tsx`, add `videoSrc` to the HeroSection:
```tsx
<HeroSection
  title={fm?.["hero_headline"] ?? "Our Services"}
  subtitle={fm?.["hero_subline"]}
  backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.png"}
  videoSrc={fm?.["hero_video"]}
/>
```

- [ ] **Step 4: Wire videoSrc in About page.tsx**

In `src/app/[locale]/about/page.tsx`, add `videoSrc`:
```tsx
<HeroSection
  title={fm?.["hero_headline"] ?? "About us"}
  subtitle={fm?.["hero_subline"]}
  backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/montreal-cranes-sunset.jpeg"}
  videoSrc="/metanova-assets/hero/about-hero.mp4"
/>
```

- [ ] **Step 5: Wire videoSrc in Careers page.tsx**

In `src/app/[locale]/careers/page.tsx`, add `videoSrc`:
```tsx
<HeroSection
  title={fm?.["hero_headline"] ?? "Join our team"}
  subtitle={fm?.["hero_subline"]}
  backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.png"}
  videoSrc="/metanova-assets/hero/careers-hero.mp4"
/>
```

- [ ] **Step 6: Wire videoSrc in all 3 ServiceDetail pages**

In `src/app/[locale]/services/structural-engineering/page.tsx`:
```tsx
<ServiceDetail
  ...
  heroImage="/metanova-assets/services/structural/site-inspection.jpg"
  videoSrc="/metanova-assets/hero/structural-hero.mp4"
  ...
/>
```

In `src/app/[locale]/services/real-estate-development/page.tsx`:
```tsx
<ServiceDetail
  ...
  heroImage="/metanova-assets/services/development/model-review.png"
  videoSrc="/metanova-assets/hero/realestate-hero.mp4"
  ...
/>
```

In `src/app/[locale]/services/project-management-consulting/page.tsx`:
```tsx
<ServiceDetail
  ...
  heroImage="/metanova-assets/services/project-management/city-overlay-hardhat.png"
  videoSrc="/metanova-assets/hero/project-mgmt-hero.mp4"
  ...
/>
```

- [ ] **Step 7: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 6: Update service card images on Services page

**Files:**
- Modify: `src/app/[locale]/services/ServicesListSection.tsx:28,54`

- [ ] **Step 1: Update image paths in ServicesListSection**

In `src/app/[locale]/services/ServicesListSection.tsx`:

Change structural engineering image (line 28):
```tsx
// OLD:
image: "/metanova-assets/services/structural/site-inspection.jpg",
// NEW:
image: "/metanova-assets/services/structural/construction-cranes.webp",
```

Change real estate development image (line 54):
```tsx
// OLD:
image: "/metanova-assets/services/development/model-review.png",
// NEW:
image: "/metanova-assets/services/development/aerial-masterplan.webp",
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 7: Fix About page redundancies — remove duplicate stats + strategic cards

**Files:**
- Modify: `src/app/[locale]/about/AboutInlineSections.tsx`

- [ ] **Step 1: Remove the stats section from AboutInlineSections**

In `src/app/[locale]/about/AboutInlineSections.tsx`:

Remove the `stats` array definition (lines 12-16):
```tsx
// DELETE:
const stats = [
  { target: 2022, label: "Founded", suffix: "" },
  { target: 20, label: "Years Combined Experience", suffix: "+" },
  { target: 3, label: "Sectors Served", suffix: "" },
];
```

Remove the `AnimatedCounter` import (line 6):
```tsx
// DELETE from imports:
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
```

Remove the stats rendering block (lines 64-80, the `FadeIn` with `mt-16 grid` containing `AnimatedCounter`).

- [ ] **Step 2: Remove the "Strategic Approach" 3-card section from AboutInlineSections**

Remove the entire third section (lines 126-164) — the one with `strategic_heading`, `strategic_point1_title`, etc. This is the section that starts with `{/* A Practical and Strategic Approach */}`.

- [ ] **Step 3: Remove the `SpotlightCard` import if no longer used**

After removing the strategic cards, check if `SpotlightCard` is still used in the Vision/Mission/Values cards. It IS — so keep the import.

- [ ] **Step 4: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 8: Update About page French content from client's docx

**Files:**
- Modify: `content/fr/pages/about.mdx`

- [ ] **Step 1: Update all French content fields in about.mdx**

Replace the frontmatter in `content/fr/pages/about.mdx` with:

```yaml
---
hero_headline: "Notre firme"
hero_subline: "L'expertise en structure au service du développement stratégique."
hero_image: "/metanova-assets/hero/montreal-cranes-sunset.jpeg"
vision_heading: "Notre vision"
vision_text: "Être un partenaire de référence en génie en structure, en développement immobilier et en gestion intégrée de projets, en contribuant à la réalisation de projets d'envergure à fort impact partout au Québec. Nous intervenons dès les premières étapes afin d'optimiser la conception et la structuration des projets, d'en assurer la viabilité et d'en maximiser le potentiel, dans une approche intégrée axée sur la maîtrise des coûts et la performance globale."
mission_heading: "Notre mission"
mission_text: "Offrir des solutions performantes visant l'optimisation des coûts et la performance globale des projets, afin d'en maximiser la viabilité et d'assurer une gestion efficace ainsi qu'une exécution maîtrisée, de la planification initiale à la réalisation, en intégrant les réalités techniques, financières et opérationnelles propres à chaque projet."
core_value_heading: "Nos valeurs"
core_value_text: "Nous privilégions la clarté, l'efficacité et une approche orientée vers les résultats, en développant des solutions qui assurent une cohérence entre la performance des structures, les objectifs financiers et les réalités du chantier, tout en favorisant une prise de décision éclairée et une exécution rigoureuse à chaque étape."
beginnings_overline: "NOS DÉBUTS"
beginnings_heading: "L'expertise en ingénierie au service du développement immobilier"
beginnings_p1: "Fondée en 2022, Metanova Experts-Conseils réunit plus de 20 ans d'expérience combinée en ingénierie en structure, en développement immobilier et en construction. La firme travaille aux côtés d'investisseurs, de promoteurs et de professionnels du secteur pour soutenir la planification, la structuration et la réalisation de projets à travers le Québec."
beginnings_p2: "Metanova intervient à chaque étape d'un projet, de l'analyse de site et des études de faisabilité à l'optimisation de la conception et à la coordination de la construction. Notre approche combine expertise technique et vision orientée développement pour livrer des projets efficaces, viables et alignés avec les réalités du marché."
cta_banner_heading: "Parlons de votre projet!"
cta_banner_body: "Prêt à franchir le premier pas vers la réalisation de votre projet? Contactez-nous dès aujourd'hui pour une consultation et transformons votre vision en réalité."
cta_banner_button: "DÉMARRER VOTRE PROJET"
---
```

Note: `strategic_*` and `approach_*` fields removed since those sections are now handled solely by `ApproachSection` component.

---

### Task 9: Update About page English content to match new French

**Files:**
- Modify: `content/en/pages/about.mdx`

- [ ] **Step 1: Update English content to match expanded French text**

Replace frontmatter in `content/en/pages/about.mdx`:

```yaml
---
hero_headline: "About us"
hero_subline: "Where structural expertise meets strategic development."
hero_image: "/metanova-assets/hero/montreal-cranes-sunset.jpeg"
vision_heading: "Our Vision"
vision_text: "To be a trusted partner in structural engineering, real estate development and integrated project management, contributing to the delivery of large-scale, high-impact projects across Quebec. We engage from the earliest stages to optimize design and project structuring, ensure viability and maximize potential through an integrated approach focused on cost control and overall performance."
mission_heading: "Our Mission"
mission_text: "To deliver high-performance solutions focused on cost optimization and overall project performance, maximizing viability while ensuring efficient management and controlled execution from initial planning through delivery, integrating the technical, financial and operational realities specific to each project."
core_value_heading: "Our Values"
core_value_text: "We prioritize clarity, efficiency and a results-driven approach, developing solutions that ensure alignment between structural performance, financial objectives and site realities, while fostering informed decision-making and rigorous execution at every stage."
beginnings_overline: "BEGINNINGS"
beginnings_heading: "Engineering Expertise Driving Real Estate Development"
beginnings_p1: "Founded in 2022, Metanova Experts-Conseils brings together over 20 years of combined experience in structural engineering, real estate development and construction. The firm works alongside investors, developers and industry professionals to support the planning, structuring and execution of projects across Quebec."
beginnings_p2: "Metanova is involved at every stage of a project, from site analysis and feasibility to design optimization and construction coordination. Our approach combines technical expertise with a development-driven perspective to deliver projects that are efficient, viable and aligned with market realities."
cta_banner_heading: "Let's Talk!"
cta_banner_body: "Ready to take the first step toward realizing your dream project? Contact us today for a consultation and let's turn your vision into a reality."
cta_banner_button: "BUILD PROJECT WITH US"
---
```

---

### Task 10: Update ApproachSection with new client content

**Files:**
- Modify: `src/components/sections/ApproachSection.tsx`

The client provided expanded text for all 4 approach items plus a new heading. Update both FR and EN.

- [ ] **Step 1: Update French approach content**

In `src/components/sections/ApproachSection.tsx`, replace `valuesFr` array:

```tsx
const valuesFr: ValueItem[] = [
  {
    number: "01",
    title: "Optimisation des coûts",
    description:
      "Nous intervenons dès la conception afin d'éliminer les inefficiences, simplifier les solutions structurales et réduire les coûts de construction. Cette approche permet de livrer des projets plus performants, mieux contrôlés et financièrement optimisés, sans compromis sur la qualité ni la constructibilité.",
  },
  {
    number: "02",
    title: "Vision orientée développement",
    description:
      "Chaque projet est analysé comme une opportunité de création de valeur. Nous optimisons le potentiel des sites, validons la viabilité financière et structurons les projets en fonction des réalités du marché et des attentes des investisseurs.",
  },
  {
    number: "03",
    title: "Exécution maîtrisée",
    description:
      "Nous assurons une gestion proactive et rigoureuse des projets, avec un contrôle constant des échéanciers, des coûts et des enjeux de chantier. Cette discipline d'exécution garantit des projets livrés efficacement, avec un haut niveau de prévisibilité et de performance.",
  },
  {
    number: "04",
    title: "Adaptabilité stratégique",
    description:
      "Nous évoluons avec les contraintes techniques, réglementaires et économiques propres à chaque projet. Cette capacité d'adaptation nous permet de sécuriser les projets, de limiter les risques et de maintenir leur performance dans des contextes complexes.",
  },
];
```

- [ ] **Step 2: Update English approach content**

Replace `valuesEn` array:

```tsx
const valuesEn: ValueItem[] = [
  {
    number: "01",
    title: "Cost Optimization",
    description:
      "We engage from the design phase to eliminate inefficiencies, simplify structural solutions and reduce construction costs. This approach delivers higher-performing, better-controlled and financially optimized projects without compromising quality or constructability.",
  },
  {
    number: "02",
    title: "Development-Driven Vision",
    description:
      "Every project is analyzed as a value-creation opportunity. We optimize site potential, validate financial viability and structure projects based on market realities and investor expectations.",
  },
  {
    number: "03",
    title: "Controlled Execution",
    description:
      "We ensure proactive and rigorous project management with constant control over timelines, costs and site challenges. This execution discipline guarantees efficient delivery with a high level of predictability and performance.",
  },
  {
    number: "04",
    title: "Strategic Adaptability",
    description:
      "We evolve with the technical, regulatory and economic constraints specific to each project. This adaptability allows us to secure projects, mitigate risks and maintain performance in complex environments.",
  },
];
```

- [ ] **Step 3: Update the section heading text**

Update the default heading in the component (around line 102-104):

```tsx
// FR heading:
"Metanova intègre le génie en structure, le développement immobilier et la gestion de projets dans une approche unifiée, permettant d'intervenir en amont, de maîtriser les coûts et de maximiser la valeur des projets à chaque étape."

// EN heading:
"Metanova integrates structural engineering, real estate development and project management into a unified approach, enabling early-stage involvement, cost control and value maximization at every project stage."
```

- [ ] **Step 4: Update the commitment/closing line**

Update the italic line (around line 133):

```tsx
// FR:
"Une approche intégrée axée sur la maîtrise des coûts, la réduction des risques et la création de valeur durable."

// EN:
"An integrated approach focused on cost control, risk reduction and lasting value creation."
```

- [ ] **Step 5: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

---

### Task 11: Contact page — animate existing hero image with Ken Burns effect

**Files:**
- Modify: `src/app/[locale]/contact/page.tsx`

Since no video is available yet for Contact, we add a subtle Ken Burns (slow zoom + pan) CSS animation to the hero background image to give it life. This is done by adding a className to the HeroSection via a wrapper, or by adding a `heroClassName` prop. Simplest approach: just override at the page level with a CSS animation on the existing image.

Actually, the simplest approach is to use the existing HeroSection as-is — it already renders an `<Image>` with `object-cover`. We can't easily add CSS to it without modifying HeroSection. Instead, we'll skip this for now since the client said the video is "coming later". No changes needed.

- [ ] **Step 1: No changes — Contact video coming later from client**

Document this as a known gap. Contact page keeps its current static hero image.

---

### Task 12: Final build, visual verification, and commit

- [ ] **Step 1: Full build verification**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

- [ ] **Step 2: Start dev server and visually verify all pages**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run dev
```

Check all 8 pages × 2 locales:
- [ ] Home (EN/FR) — new hero video plays
- [ ] About (EN/FR) — new hero video, updated content, no redundancy
- [ ] Services (EN/FR) — new hero video, new card images
- [ ] Structural Engineering (EN/FR) — new hero video
- [ ] Real Estate Development (EN/FR) — new hero video
- [ ] Project Management (EN/FR) — new hero video
- [ ] Careers (EN/FR) — new hero video
- [ ] Contact (EN/FR) — unchanged (video coming later)

- [ ] **Step 3: Git add and commit**

```bash
git add -A
git commit -m "feat: add hero videos to all pages, update About content, fix redundancies

- Compress and add 7 hero videos (MP4+WebM+poster) for all pages
- Add video support to ServiceDetail component
- Replace structural engineering and real estate card images
- Update founders photo in Beginnings section
- Update About page French content from client's revised copy
- Match English About content to new French text
- Remove duplicate stats and redundant strategic cards from About page
- Update ApproachSection with client's expanded approach text"
```

- [ ] **Step 4: Push and deploy**

```bash
git push origin main
```
