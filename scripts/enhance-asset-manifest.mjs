/**
 * enhance-asset-manifest.mjs
 *
 * Reads public/metanova-assets/manifest.json and enriches each asset item with:
 *   - approvedForProduction: false  (FAIL CLOSED — operator must explicitly approve)
 *   - ownership: "unknown"          (operator must classify)
 *   - notes: ""
 *   - assignedTo: item.usedBy || []
 *   - dimensions: { w, h } | null  (via sips — macOS only; null for SVGs and missing files)
 *   - format: file extension string
 *
 * NOTE: sips is a macOS-only CLI tool. Dimensions will always be null on other platforms.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(REPO_ROOT, "public/metanova-assets/manifest.json");

/**
 * Attempts to get pixel dimensions for a raster image using the macOS `sips` CLI.
 * Returns { w, h } on success, or null for SVGs, missing files, or non-macOS platforms.
 */
function getDimensions(targetFile, format) {
  // SVGs are vector — no pixel dimensions
  if (format === "svg") return null;

  const absPath = resolve(REPO_ROOT, targetFile);

  try {
    // execFileSync prevents shell injection — args are passed directly to sips
    const sipsOut = execFileSync(
      "sips",
      ["-g", "pixelWidth", "-g", "pixelHeight", absPath],
      { encoding: "utf-8" }
    );

    const wMatch = sipsOut.match(/pixelWidth:\s*(\d+)/);
    const hMatch = sipsOut.match(/pixelHeight:\s*(\d+)/);

    if (wMatch && hMatch) {
      return { w: parseInt(wMatch[1], 10), h: parseInt(hMatch[1], 10) };
    }
    return null;
  } catch {
    // File missing, sips unavailable (non-macOS), or unrecognised format
    return null;
  }
}

// --- Main ---

const raw = readFileSync(MANIFEST_PATH, "utf-8");
const manifest = JSON.parse(raw);

const enhanced = manifest.items.map((item) => {
  const format = extname(item.target).replace(/^\./, "").toLowerCase();
  const dimensions = getDimensions(item.targetFile, format);

  return {
    ...item,
    approvedForProduction: false,
    ownership: "unknown",
    notes: "",
    assignedTo: item.usedBy ?? [],
    dimensions,
    format,
  };
});

const output = {
  ...manifest,
  items: enhanced,
};

writeFileSync(MANIFEST_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");

console.log(`Enhanced ${enhanced.length} assets with approval fields.`);
