import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const exportManifestPath = path.join(rootDir, "framer-export", "manifest.json");
const publicDir = path.join(rootDir, "public");
const curatedDir = path.join(publicDir, "metanova-assets");

const curatedAssets = [
  {
    category: "brand",
    title: "Primary color wordmark",
    description: "Full MetaNova wordmark in color for light backgrounds.",
    source: "/framer-assets/images/FlLOYdhHCVNAEjpUzm760ag17z8-be5c6f77bd89.svg",
    target: "brand/logo-wordmark-color.svg",
    tags: ["logo", "wordmark", "brand"],
  },
  {
    category: "brand",
    title: "Primary white wordmark",
    description: "Full MetaNova wordmark in white for dark backgrounds.",
    source: "/framer-assets/images/ZnlDyfs8EfLkyxVHxT600e1WBEQ-3bef32f48342.svg",
    target: "brand/logo-wordmark-white.svg",
    tags: ["logo", "wordmark", "brand", "dark-mode"],
  },
  {
    category: "brand",
    title: "Brand mark dark",
    description: "Icon-only MetaNova mark with dark fill.",
    source: "/framer-assets/images/zwpa6sSr1NMGwDrrXyOxZeWQk-01f312deecc0.svg",
    target: "brand/logo-mark-dark.svg",
    tags: ["logo", "mark", "favicon"],
  },
  {
    category: "brand",
    title: "Brand mark light",
    description: "Icon-only MetaNova mark with light fill.",
    source: "/framer-assets/images/Rw5tRKbLWscCqdBAgDJ1j6BQT4-bdcf8db884a0.svg",
    target: "brand/logo-mark-light.svg",
    tags: ["logo", "mark", "favicon", "dark-mode"],
  },
  {
    category: "brand",
    title: "Apple touch icon",
    description: "Square app icon for iOS home screen usage.",
    source: "/framer-assets/images/o1QbnWGfC76FRGEi1ha1hg0jc8-082380a002af.png",
    target: "brand/apple-touch-icon.png",
    tags: ["logo", "mark", "icon"],
  },
  {
    category: "hero",
    title: "Homepage hero video",
    description: "Primary homepage motion background extracted from Framer.",
    source: "/framer-assets/video/ra4iLmtnF3xtEaBeVaDqXDV0fk-0686fa33e77c.mp4",
    target: "hero/home-hero-video.mp4",
    tags: ["video", "hero", "homepage"],
  },
  {
    category: "hero",
    title: "Construction leadership hero",
    description: "Site walkthrough image showing team leadership on an active build.",
    source: "/framer-assets/images/vHZVZyMsnIb8kyM8Pb0pFOsWH1k-17411c901855.png",
    target: "hero/construction-leadership.png",
    tags: ["hero", "construction", "structural"],
  },
  {
    category: "hero",
    title: "Montreal skyline construction",
    description: "Evening skyline and crane scene suited to homepage or development sections.",
    source: "/framer-assets/images/eLHHklqtfSO6q7xheQtxJ9tg-39b46448f9ee.jpeg",
    target: "hero/montreal-construction-skyline.jpeg",
    tags: ["hero", "city", "development"],
  },
  {
    category: "hero",
    title: "Night crane skyline",
    description: "Nighttime crane and skyline scene for bold section dividers or hero alternates.",
    source: "/framer-assets/images/XKmSiIh8sBrL7Ecg6qfkbAGoCc-a66f8bd6b174.jpg",
    target: "hero/night-cranes-skyline.jpg",
    tags: ["hero", "city", "construction"],
  },
  {
    category: "people",
    title: "Founders portrait",
    description: "Shared portrait of the two managing partners.",
    source: "/framer-assets/images/06ngDO8RaZh8Hu1Alg6B9ZIDI-d316f8a6d691.jpg",
    target: "people/founders-portrait.jpg",
    tags: ["people", "leadership", "portrait"],
  },
  {
    category: "people",
    title: "Suddam Al-Salem portrait",
    description: "Portrait used for the engineering division managing partner.",
    source: "/framer-assets/images/JvHCk1F7UwrtEyCRIHAoWfeE0-0c1b856b3763.jpg",
    target: "people/suddam-al-salem.jpg",
    tags: ["people", "leadership", "portrait"],
  },
  {
    category: "people",
    title: "Muhannad Al-Salem portrait",
    description: "Portrait used for the real estate development managing partner.",
    source: "/framer-assets/images/tBs1Dwsbr618LBCET9TnTujwTrM-74cf9eddc15c.jpg",
    target: "people/muhannad-al-salem.jpg",
    tags: ["people", "leadership", "portrait"],
  },
  {
    category: "people",
    title: "Planning meeting",
    description: "Team conference-room planning session around site drawings.",
    source: "/framer-assets/images/CBr7kqHTBHCDH8IC7ENguLva3Po-4667c4c8747a.png",
    target: "people/planning-meeting.png",
    tags: ["people", "team", "planning"],
  },
  {
    category: "services",
    title: "Structural field team",
    description: "Construction-site image suited to structural engineering overview sections.",
    source: "/framer-assets/images/2S7W3aWQErIHjDGPnLdUMtM3yX8-dfeececefa00.png",
    target: "services/structural/field-team-sunset.png",
    tags: ["services", "structural", "construction"],
  },
  {
    category: "services",
    title: "Site inspection",
    description: "Overhead site inspection image for structural engineering or due diligence copy.",
    source: "/framer-assets/images/bSQ1UciLKs4a6y4oSUz99A-8143adf4bb8f.jpg",
    target: "services/structural/site-inspection.jpg",
    tags: ["services", "structural", "inspection"],
  },
  {
    category: "services",
    title: "Model review",
    description: "Building model and contract image for early-stage development positioning.",
    source: "/framer-assets/images/5aJ8ncjSQmUEV9RmzglF9JUdk0E-a7c66da7779d.png",
    target: "services/development/model-review.png",
    tags: ["services", "development", "planning"],
  },
  {
    category: "services",
    title: "Foundation site review",
    description: "Foundation-stage site review image for development or project oversight messaging.",
    source: "/framer-assets/images/ondRIUpQ87kFGSW0YzcNtvqs-a202c38855bd.png",
    target: "services/development/foundation-site-review.png",
    tags: ["services", "development", "site"],
  },
  {
    category: "services",
    title: "Feasibility estimate",
    description: "Calculator and scale-model image for feasibility, costing, and value engineering content.",
    source: "/framer-assets/images/hP6T0HYJ8CeCoOMY0jE4KyuYwOY-e0e0229e3125.png",
    target: "services/development/feasibility-estimate.png",
    tags: ["services", "development", "costing"],
  },
  {
    category: "services",
    title: "Site model overview",
    description: "Urban site model image useful for planning, density, and concept-development sections.",
    source: "/framer-assets/images/oYu70P5ocn9860SKIWEsuI09A-a39658c1dd23.png",
    target: "services/development/site-model-overview.png",
    tags: ["services", "development", "urban"],
  },
  {
    category: "services",
    title: "Timeline interface",
    description: "Project scheduling visual for project management and milestone tracking sections.",
    source: "/framer-assets/images/LlPXrvOkUR0C6MwWLSZOV46WHeo-6e4769d0ea7a.webp",
    target: "services/project-management/timeline-interface.webp",
    tags: ["services", "project-management", "timeline"],
  },
  {
    category: "services",
    title: "City overlay hardhat",
    description: "Abstract city and hardhat composite for consulting and thought-leadership sections.",
    source: "/framer-assets/images/SaJSbAQjogpPY3D10go3FPySvU-14e006959b7d.png",
    target: "services/project-management/city-overlay-hardhat.png",
    tags: ["services", "project-management", "consulting"],
  },
  {
    category: "projects/residential",
    title: "Condo aerial",
    description: "Finished residential mid-rise development aerial.",
    source: "/framer-assets/images/fNuH6Cy74GmNPzmpHugqLjeXNw-11641ee7c8a8.jpg",
    target: "projects/residential/condo-aerial.jpg",
    tags: ["projects", "residential", "exterior"],
  },
  {
    category: "projects/residential",
    title: "Suburban overview",
    description: "Wide suburban neighborhood and skyline context image.",
    source: "/framer-assets/images/arInt9XiiMy2nhjzr20jlKH4I-22bc65a288e8.png",
    target: "projects/residential/suburban-overview.png",
    tags: ["projects", "residential", "aerial"],
  },
  {
    category: "projects/residential",
    title: "Luxury house pool",
    description: "Residential exterior with pool and glazing.",
    source: "/framer-assets/images/drZj4HSqZGv7w5k7kk7qP3Sr18-8a13f2a6907c.jpg",
    target: "projects/residential/luxury-house-pool.jpg",
    tags: ["projects", "residential", "exterior"],
  },
  {
    category: "projects/residential",
    title: "Modern living room",
    description: "Residential interior living-room scene with modern styling.",
    source: "/framer-assets/images/CvZnXlUuNXErT5nqSuzNSM9QuQA-46c954b993e8.jpg",
    target: "projects/residential/modern-living-room.jpg",
    tags: ["projects", "residential", "interior"],
  },
  {
    category: "projects/residential",
    title: "Open-plan living room",
    description: "Bright open-plan interior for residential feature sections.",
    source: "/framer-assets/images/smFPgEbEQV9HElfPWo3uAXPqc-0f8118712679.jpg",
    target: "projects/residential/open-plan-living-room.jpg",
    tags: ["projects", "residential", "interior"],
  },
  {
    category: "projects/residential",
    title: "Home office",
    description: "Custom residential home-office interior image.",
    source: "/framer-assets/images/pFeSneca936aRUzS0pPoVezkt4-0e1bce605b09.jpg",
    target: "projects/residential/home-office.jpg",
    tags: ["projects", "residential", "interior"],
  },
  {
    category: "projects/residential",
    title: "Modern dining interior",
    description: "Dining and circulation shot from a high-end modern home.",
    source: "/framer-assets/images/lkexNrltY3YY1TZTjqK2i38G9s-d87be03de82e.jpg",
    target: "projects/residential/modern-dining-interior.jpg",
    tags: ["projects", "residential", "interior"],
  },
  {
    category: "projects/hospitality",
    title: "Lakefront lodge",
    description: "Hospitality image with lodge architecture beside water.",
    source: "/framer-assets/images/4ieQgeS8TtR7xMtRMP3BxeckpRU-e3e5f9c14651.jpg",
    target: "projects/hospitality/lakefront-lodge.jpg",
    tags: ["projects", "hospitality", "exterior"],
  },
  {
    category: "projects/hospitality",
    title: "Resort pool day",
    description: "Resort exterior during daylight.",
    source: "/framer-assets/images/LthuLqGqZipHiUNtn3mMZGqPmmU-3d955b1a054f.jpg",
    target: "projects/hospitality/resort-pool-day.jpg",
    tags: ["projects", "hospitality", "exterior"],
  },
  {
    category: "projects/hospitality",
    title: "Resort pool night",
    description: "Evening resort pool and hospitality lighting scene.",
    source: "/framer-assets/images/LrPOPMruPESxPUh66J076aaxTD4-7deb44aa0569.jpg",
    target: "projects/hospitality/resort-pool-night.jpg",
    tags: ["projects", "hospitality", "exterior"],
  },
  {
    category: "projects/hospitality",
    title: "Sauna interior",
    description: "Warm hospitality wellness interior.",
    source: "/framer-assets/images/5wLWse0NAEV8SalOlbFKLJnHpo-b99cc8024e32.jpg",
    target: "projects/hospitality/sauna-interior.jpg",
    tags: ["projects", "hospitality", "interior"],
  },
  {
    category: "projects/commercial",
    title: "Glass atrium",
    description: "Bright glazed public/commercial atrium.",
    source: "/framer-assets/images/mHHcvN9nHDbHbRBWCjKhOI6EI-d98a5b4a16f4.jpg",
    target: "projects/commercial/glass-atrium.jpg",
    tags: ["projects", "commercial", "interior"],
  },
  {
    category: "projects/commercial",
    title: "Coworking office",
    description: "Office corridor and shared desk environment.",
    source: "/framer-assets/images/lFKZnTDPaQkGH17oTPokDKoM5I-5c1694703f32.jpg",
    target: "projects/commercial/coworking-office.jpg",
    tags: ["projects", "commercial", "interior"],
  },
  {
    category: "projects/commercial",
    title: "Civic facade",
    description: "Minimal white facade suited to mixed-use or public-project storytelling.",
    source: "/framer-assets/images/s3YaCMzQIdIj0m1ejKDFZhluTeo-426b4e38cbbd.jpg",
    target: "projects/commercial/civic-facade.jpg",
    tags: ["projects", "commercial", "exterior"],
  },
  {
    category: "projects/commercial",
    title: "Moody corridor",
    description: "Dark corridor image for premium commercial interiors.",
    source: "/framer-assets/images/nt1eTHwsDpfxDePq7x9vLe9MWo-e2bcebb23fc6.png",
    target: "projects/commercial/moody-corridor.png",
    tags: ["projects", "commercial", "interior"],
  },
];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function main() {
  const exportManifest = JSON.parse(await readFile(exportManifestPath, "utf8"));
  const assetByLocalPath = new Map(
    exportManifest.assets.map((asset) => [asset.localPath, asset]),
  );
  const items = [];

  for (const asset of curatedAssets) {
    const sourceAbsolutePath = path.join(publicDir, asset.source.replace(/^\/+/, ""));
    const targetAbsolutePath = path.join(curatedDir, asset.target);
    const exportAsset = assetByLocalPath.get(asset.source);
    const fileStats = await stat(sourceAbsolutePath);

    await ensureDir(path.dirname(targetAbsolutePath));
    await copyFile(sourceAbsolutePath, targetAbsolutePath);

    items.push({
      ...asset,
      sourceFile: toPosix(path.relative(rootDir, sourceAbsolutePath)),
      targetFile: toPosix(path.relative(rootDir, targetAbsolutePath)),
      bytes: fileStats.size,
      usedBy: exportAsset?.usedBy ?? [],
    });
  }

  const categories = items.reduce((totals, item) => {
    totals[item.category] = (totals[item.category] ?? 0) + 1;
    return totals;
  }, {});

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalItems: items.length,
    categories,
    items,
  };

  await writeFile(
    path.join(curatedDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(
    `[curate] Copied ${items.length} curated assets into ${toPosix(
      path.relative(rootDir, curatedDir),
    )}`,
  );
}

main().catch((error) => {
  console.error(
    `[curate] ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
