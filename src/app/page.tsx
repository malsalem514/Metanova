import { readFile } from "node:fs/promises";
import path from "node:path";

type RouteSummary = {
  route: string;
  title: string;
  description: string;
  assetCount: number;
  wordCount: number;
  htmlFile: string;
  textFile: string;
  textPreview: string;
};

type AssetSummary = {
  localPath: string;
  kind: string;
  bytes: number;
};

type ExportManifest = {
  exportedAt: string;
  siteOrigin: string;
  totals: {
    routes: number;
    assets: number;
  };
  routes: RouteSummary[];
  assets: AssetSummary[];
};

async function loadManifest() {
  const manifestPath = path.join(process.cwd(), "framer-export", "manifest.json");

  try {
    const file = await readFile(manifestPath, "utf8");

    return JSON.parse(file) as ExportManifest;
  } catch {
    return null;
  }
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${bytes} B`;
}

export default async function Home() {
  const manifest = await loadManifest();
  const routeCount = manifest?.totals.routes ?? 0;
  const assetCount = manifest?.totals.assets ?? 0;
  const imageCount =
    manifest?.assets.filter((asset) => asset.kind === "images").length ?? 0;
  const totalAssetBytes =
    manifest?.assets.reduce((sum, asset) => sum + asset.bytes, 0) ?? 0;
  const assetMix = manifest
    ? Object.entries(
        manifest.assets.reduce<Record<string, number>>((totals, asset) => {
          totals[asset.kind] = (totals[asset.kind] ?? 0) + 1;
          return totals;
        }, {}),
      )
    : [];

  return (
    <main className="flex-1">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_28px_90px_var(--shadow)] backdrop-blur md:p-10">
          <div className="inline-flex rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-[var(--accent)]">
            MetaNova / Rebuild Workspace
          </div>
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Framer content and media pulled into a clean Next.js starter for
              Vercel.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              This workspace keeps the existing Framer site as reference
              material while we rebuild the experience from scratch with local
              assets, route snapshots, and a deploy-ready app shell.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                Routes
              </p>
              <p className="mt-3 text-3xl font-semibold">{routeCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                Assets
              </p>
              <p className="mt-3 text-3xl font-semibold">{assetCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                Images
              </p>
              <p className="mt-3 text-3xl font-semibold">{imageCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                Asset Size
              </p>
              <p className="mt-3 text-3xl font-semibold">
                {formatBytes(totalAssetBytes)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 font-mono">
              npm run extract:framer
            </span>
            <span className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 font-mono">
              npm run dev
            </span>
            <span className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 font-mono">
              npm run build
            </span>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[var(--border)] bg-black/[0.03] p-5 text-sm leading-7 text-[var(--muted)]">
            {manifest ? (
              <>
                <p>
                  Source site:{" "}
                  <span className="font-mono text-[var(--foreground)]">
                    {manifest.siteOrigin}
                  </span>
                </p>
                <p>
                  Last extraction:{" "}
                  <span className="font-mono text-[var(--foreground)]">
                    {manifest.exportedAt}
                  </span>
                </p>
              </>
            ) : (
              <p>
                Run{" "}
                <span className="font-mono text-[var(--foreground)]">
                  npm run extract:framer
                </span>{" "}
                to generate local page snapshots and asset copies before we
                start rebuilding the real site.
              </p>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_24px_70px_var(--shadow)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                  Route Library
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Framer page snapshots
                </h2>
              </div>
              {manifest ? (
                <p className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 font-mono text-xs text-[var(--muted)]">
                  framer-export/pages
                </p>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4">
              {manifest ? (
                manifest.routes.map((route) => (
                  <article
                    key={route.route}
                    className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-sm text-[var(--accent)]">
                        {route.route}
                      </p>
                      <p className="text-sm text-[var(--muted)]">
                        {route.assetCount} assets · {route.wordCount} words
                      </p>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                      {route.title || "Untitled page"}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {route.description || route.textPreview}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                      <span className="rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 font-mono">
                        {route.htmlFile}
                      </span>
                      <span className="rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 font-mono">
                        {route.textFile}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.4rem] border border-dashed border-[var(--border)] bg-black/[0.03] p-6 text-sm leading-7 text-[var(--muted)]">
                  No export manifest yet. The page list will appear here after
                  the first extraction run.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_24px_70px_var(--shadow)] backdrop-blur">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
              Build Notes
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              What this starter already gives us
            </h2>

            <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--muted)]">
              <div className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="font-medium text-[var(--foreground)]">
                  Local media inventory
                </p>
                <p className="mt-2">
                  Downloaded files land in{" "}
                  <span className="font-mono text-[var(--foreground)]">
                    public/framer-assets
                  </span>{" "}
                  so we can swap them into the new design without depending on
                  Framer URLs.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="font-medium text-[var(--foreground)]">
                  Content reference files
                </p>
                <p className="mt-2">
                  Every route is stored as raw HTML and plain text under{" "}
                  <span className="font-mono text-[var(--foreground)]">
                    framer-export
                  </span>{" "}
                  so we can rewrite confidently without losing source copy.
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="font-medium text-[var(--foreground)]">
                  Vercel-ready app shell
                </p>
                <p className="mt-2">
                  This is a standard Next.js app, so once the rebuild is ready
                  we can connect the repo to Vercel and deploy with no Framer
                  dependency.
                </p>
              </div>
            </div>

            {manifest ? (
              <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-black/[0.04] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Asset Mix
                </p>
                <div className="mt-4 grid gap-3">
                  {assetMix.map(([kind, count]) => (
                    <div
                      key={kind}
                      className="flex items-center justify-between rounded-full border border-[var(--border)] bg-white/75 px-4 py-2 text-sm"
                    >
                      <span className="capitalize">{kind}</span>
                      <span className="font-mono text-[var(--foreground)]">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
