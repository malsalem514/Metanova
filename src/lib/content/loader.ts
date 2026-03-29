import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";

export interface ContentPage<T = Record<string, unknown>> {
  slug: string;
  frontmatter: T;
  content: string;
}

const contentRoot = resolve(process.cwd(), "content");

/**
 * Reads a single MDX file relative to `content/{locale}/`.
 * Falls back to `content/` (legacy) if locale-specific file is not found.
 * Returns `{ slug, frontmatter, content }` or `null` if the file is missing.
 *
 * @param relativePath - Path relative to locale dir, with or without extension.
 *   E.g. `"pages/home"` or `"pages/home.mdx"`.
 * @param locale - The locale to load content for (defaults to "en").
 */
export function loadContent<T = Record<string, unknown>>(
  relativePath: string,
  locale: string = "en",
): ContentPage<T> | null {
  const localeRoot = join(contentRoot, locale);
  const extensions = relativePath.endsWith(".mdx") || relativePath.endsWith(".md")
    ? [""]
    : [".mdx", ".md"];

  // Try locale-specific path first, then legacy root path
  const candidates = [
    ...extensions.map((ext) => join(localeRoot, `${relativePath}${ext}`)),
    ...extensions.map((ext) => join(contentRoot, `${relativePath}${ext}`)),
  ];

  const filePath = candidates.find((p) => existsSync(p));
  if (filePath === undefined) return null;

  const raw = readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Strip file extension to derive slug, e.g. "pages/home.mdx" -> "pages/home"
  const slug = relativePath.replace(/\.(mdx|md)$/, "");

  return {
    slug,
    frontmatter: data as T,
    content,
  };
}

/**
 * Reads all `.mdx` and `.md` files in a subdirectory of `content/{locale}/`.
 * Falls back to `content/` if locale dir does not exist.
 * Returns an array of `ContentPage<T>`.
 * Returns an empty array if the directory does not exist.
 *
 * @param subdir - Subdirectory name, e.g. `"pages"`.
 * @param locale - The locale to load content for (defaults to "en").
 */
export function loadContentDir<T = Record<string, unknown>>(
  subdir: string,
  locale: string = "en",
): ContentPage<T>[] {
  const localeDirPath = join(contentRoot, locale, subdir);
  const legacyDirPath = join(contentRoot, subdir);
  const dirPath = existsSync(localeDirPath) ? localeDirPath : legacyDirPath;

  if (!existsSync(dirPath)) return [];

  const entries = readdirSync(dirPath);

  return entries
    .filter((entry) => entry.endsWith(".mdx") || entry.endsWith(".md"))
    .map((entry) => {
      const slug = `${subdir}/${entry.replace(/\.(mdx|md)$/, "")}`;
      const raw = readFileSync(join(dirPath, entry), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as T,
        content,
      };
    });
}
