import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";
import { z } from "zod";

import {
  assetManifestSchema,
  siteBriefSchema,
  siteManifestSchema,
} from "../src/lib/schemas/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

interface Artifact {
  name: string;
  path: string;
  parse: (raw: string) => unknown;
  schema: z.ZodTypeAny;
}

const artifacts: Artifact[] = [
  {
    name: "site-brief.yaml",
    path: resolve(ROOT, "site-brief.yaml"),
    parse: (raw) => parse(raw) as unknown,
    schema: siteBriefSchema,
  },
  {
    name: "asset-manifest.json",
    path: resolve(ROOT, "public/metanova-assets/manifest.json"),
    parse: (raw) => JSON.parse(raw) as unknown,
    schema: assetManifestSchema,
  },
  {
    name: "site-manifest.json",
    path: resolve(ROOT, "site-manifest.json"),
    parse: (raw) => JSON.parse(raw) as unknown,
    schema: siteManifestSchema,
  },
];

let anyFailed = false;

for (const artifact of artifacts) {
  if (!existsSync(artifact.path)) {
    console.log(`⏭  ${artifact.name} — not yet created, skipping`);
    continue;
  }

  const raw = readFileSync(artifact.path, "utf-8");
  let parsed: unknown;
  try {
    parsed = artifact.parse(raw);
  } catch (err) {
    console.log(`✗  ${artifact.name} — parse error: ${String(err)}`);
    anyFailed = true;
    continue;
  }

  const result = artifact.schema.safeParse(parsed);
  if (result.success) {
    console.log(`✓  ${artifact.name} — valid`);
  } else {
    console.log(`✗  ${artifact.name} — validation errors:`);
    for (const issue of result.error.issues) {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      console.log(`     ${path}: ${issue.message}`);
    }
    anyFailed = true;
  }
}

process.exit(anyFailed ? 1 : 0);
