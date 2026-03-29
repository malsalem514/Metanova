import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SITE_ORIGIN = "https://famous-functions-016357.framer.app";
const USER_AGENT =
  "Mozilla/5.0 (compatible; MetaNova asset extractor/1.0; +https://vercel.com)";

const rootDir = process.cwd();
const siteOrigin = normalizeOrigin(
  process.env.FRAMER_SITE_ORIGIN ?? DEFAULT_SITE_ORIGIN,
);
const exportDir = path.join(rootDir, "framer-export");
const pagesDir = path.join(exportDir, "pages");
const textDir = path.join(exportDir, "text");
const assetsDir = path.join(rootDir, "public", "framer-assets");

function normalizeOrigin(urlString) {
  const url = new URL(urlString);

  return url.origin;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function log(message) {
  console.log(`[extract] ${message}`);
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.text();
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtml(html) {
  return decodeHtmlEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractMetaContent(html, attributeName, attributeValue) {
  const escapedValue = escapeRegex(attributeValue);
  const patterns = [
    new RegExp(
      `<meta[^>]+${attributeName}=["']${escapedValue}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+${attributeName}=["']${escapedValue}["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match) {
      return decodeHtmlEntities(match[1]);
    }
  }

  return "";
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);

  return match ? decodeHtmlEntities(match[1].trim()) : "";
}

function normalizeEscapedMarkup(html) {
  return html
    .replace(/\\u002F/gi, "/")
    .replace(/\\u003A/gi, ":")
    .replace(/\\u003D/gi, "=")
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/")
    .replace(/&amp;/gi, "&");
}

function sanitizeUrl(rawValue) {
  let candidate = rawValue
    .trim()
    .replace(/^url\((.+)\)$/i, "$1")
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\u0026/gi, "&")
    .replace(/&amp;/gi, "&");

  while (candidate && [")", "]", "}", ",", ";"].includes(candidate.at(-1))) {
    candidate = candidate.slice(0, -1);
  }

  try {
    return new URL(candidate).toString();
  } catch {
    return null;
  }
}

function isFramerAsset(urlString) {
  const { hostname } = new URL(urlString);

  return (
    hostname === "framerusercontent.com" ||
    hostname.endsWith(".framerusercontent.com")
  );
}

function canonicalizeAssetUrl(urlString) {
  const url = new URL(urlString);

  if (url.pathname.startsWith("/images/")) {
    url.search = "";
  }

  return url.toString();
}

function collectAssetUrls(html) {
  const candidates = new Set();
  const variants = [html, normalizeEscapedMarkup(html)];
  const urlPattern = /https?:\/\/[^\s"'<>`,]+/g;

  for (const variant of variants) {
    for (const match of variant.matchAll(urlPattern)) {
      const cleaned = sanitizeUrl(match[0]);

      if (cleaned && isFramerAsset(cleaned)) {
        candidates.add(canonicalizeAssetUrl(cleaned));
      }
    }
  }

  return [...candidates].sort();
}

function safeRouteSegment(segment) {
  const normalized = segment
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "index";
}

function routeSegments(pathname) {
  if (pathname === "/") {
    return ["home"];
  }

  return pathname
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((segment) => safeRouteSegment(segment));
}

function routeHtmlFile(pathname) {
  return path.join(pagesDir, ...routeSegments(pathname), "index.html");
}

function routeTextFile(pathname) {
  return path.join(textDir, ...routeSegments(pathname), "index.txt");
}

function extensionFromContentType(contentType) {
  if (contentType.includes("image/svg")) return ".svg";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/avif")) return ".avif";
  if (contentType.includes("image/gif")) return ".gif";
  if (contentType.includes("font/woff2")) return ".woff2";
  if (contentType.includes("font/woff")) return ".woff";
  if (contentType.includes("application/json")) return ".json";
  if (contentType.includes("text/css")) return ".css";
  if (contentType.includes("javascript")) return ".mjs";
  if (contentType.includes("video/mp4")) return ".mp4";
  if (contentType.includes("video/webm")) return ".webm";

  return ".bin";
}

function detectExtension(urlString, contentType) {
  const url = new URL(urlString);
  const parsedExtension = path.extname(url.pathname).toLowerCase();

  return parsedExtension || extensionFromContentType(contentType);
}

function classifyAsset(extension, contentType) {
  if (
    contentType.startsWith("image/") ||
    [".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"].includes(
      extension,
    )
  ) {
    return "images";
  }

  if (
    contentType.startsWith("font/") ||
    [".woff", ".woff2", ".ttf", ".otf"].includes(extension)
  ) {
    return "fonts";
  }

  if (
    contentType.startsWith("video/") ||
    [".mp4", ".webm"].includes(extension)
  ) {
    return "video";
  }

  if (contentType.includes("json") || extension === ".json") {
    return "data";
  }

  if (contentType.includes("css") || extension === ".css") {
    return "styles";
  }

  if (contentType.includes("javascript") || [".js", ".mjs"].includes(extension)) {
    return "scripts";
  }

  return "misc";
}

function buildAssetRelativePath(urlString, contentType) {
  const url = new URL(urlString);
  const extension = detectExtension(urlString, contentType);
  const kind = classifyAsset(extension, contentType);
  const basename = path.basename(url.pathname, path.extname(url.pathname)) || kind;
  const safeBasename =
    basename
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || kind;
  const hash = createHash("sha1").update(urlString).digest("hex").slice(0, 12);

  return {
    kind,
    relativePath: toPosix(path.join(kind, `${safeBasename}-${hash}${extension}`)),
  };
}

async function mapLimit(items, limit, iteratee) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await iteratee(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

async function downloadAsset(urlString) {
  const response = await fetch(urlString, {
    headers: {
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${urlString}: ${response.status}`);
  }

  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";
  const { kind, relativePath } = buildAssetRelativePath(urlString, contentType);
  const filePath = path.join(assetsDir, relativePath);
  const buffer = Buffer.from(await response.arrayBuffer());

  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, buffer);

  return {
    sourceUrl: urlString,
    localPath: `/framer-assets/${relativePath}`,
    filePath: toPosix(path.relative(rootDir, filePath)),
    contentType,
    kind,
    bytes: buffer.byteLength,
  };
}

async function main() {
  await Promise.all([
    ensureDir(exportDir),
    ensureDir(pagesDir),
    ensureDir(textDir),
    ensureDir(assetsDir),
  ]);

  const sitemapUrl = `${siteOrigin}/sitemap.xml`;
  log(`Reading sitemap from ${sitemapUrl}`);

  const pageUrls = parseSitemap(await fetchText(sitemapUrl));
  const pageSummaries = [];
  const assetUsage = new Map();

  for (const pageUrl of pageUrls) {
    const html = await fetchText(pageUrl);
    const url = new URL(pageUrl);
    const htmlFile = routeHtmlFile(url.pathname);
    const textFile = routeTextFile(url.pathname);
    const textContent = stripHtml(html);
    const assetUrls = collectAssetUrls(html);

    await Promise.all([
      ensureDir(path.dirname(htmlFile)),
      ensureDir(path.dirname(textFile)),
    ]);
    await Promise.all([
      writeFile(htmlFile, html),
      writeFile(textFile, `${textContent}\n`),
    ]);

    for (const assetUrl of assetUrls) {
      const usedBy = assetUsage.get(assetUrl) ?? new Set();
      usedBy.add(url.pathname);
      assetUsage.set(assetUrl, usedBy);
    }

    pageSummaries.push({
      route: url.pathname,
      url: pageUrl,
      title: extractTitle(html),
      description: extractMetaContent(html, "name", "description"),
      htmlFile: toPosix(path.relative(rootDir, htmlFile)),
      textFile: toPosix(path.relative(rootDir, textFile)),
      assetCount: assetUrls.length,
      sourceAssets: assetUrls,
      wordCount: textContent ? textContent.split(/\s+/).length : 0,
      textPreview: textContent.slice(0, 280),
    });

    log(`Saved ${url.pathname} with ${assetUrls.length} referenced assets`);
  }

  const uniqueAssetUrls = [...assetUsage.keys()].sort();
  log(`Downloading ${uniqueAssetUrls.length} unique assets`);

  const downloadedAssets = await mapLimit(
    uniqueAssetUrls,
    6,
    async (assetUrl, assetIndex) => {
      const asset = await downloadAsset(assetUrl);
      log(
        `Downloaded ${assetIndex + 1}/${uniqueAssetUrls.length}: ${asset.localPath}`,
      );

      return asset;
    },
  );

  const assetByUrl = new Map(
    downloadedAssets.map((asset) => [asset.sourceUrl, asset]),
  );
  const manifest = {
    exportedAt: new Date().toISOString(),
    siteOrigin,
    totals: {
      routes: pageSummaries.length,
      assets: downloadedAssets.length,
    },
    routes: pageSummaries.map((page) => ({
      ...page,
      downloadedAssets: page.sourceAssets
        .map((assetUrl) => assetByUrl.get(assetUrl)?.localPath)
        .filter(Boolean),
    })),
    assets: downloadedAssets.map((asset) => ({
      ...asset,
      usedBy: [...(assetUsage.get(asset.sourceUrl) ?? [])].sort(),
    })),
  };

  const manifestFile = path.join(exportDir, "manifest.json");
  await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);

  log(
    `Finished. Manifest written to ${toPosix(path.relative(rootDir, manifestFile))}`,
  );
}

main().catch((error) => {
  console.error(
    `[extract] ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
