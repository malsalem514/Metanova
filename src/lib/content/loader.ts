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
 * Reads a single MDX file relative to `content/`.
 * Returns `{ slug, frontmatter, content }` or `null` if the file is missing.
 *
 * @param relativePath - Path relative to `content/`, with or without extension.
 *   E.g. `"pages/home"` or `"pages/home.mdx"`.
 */
export function loadContent<T = Record<string, unknown>>(
  relativePath: string
): ContentPage<T> | null {
  const candidates = relativePath.endsWith(".mdx") || relativePath.endsWith(".md")
    ? [join(contentRoot, relativePath)]
    : [
        join(contentRoot, `${relativePath}.mdx`),
        join(contentRoot, `${relativePath}.md`),
      ];

  const filePath = candidates.find((p) => existsSync(p));
  if (filePath === undefined) return null;

  const raw = readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Strip file extension to derive slug, e.g. "content/pages/home.mdx" → "pages/home"
  const slug = relativePath.replace(/\.(mdx|md)$/, "");

  return {
    slug,
    frontmatter: data as T,
    content,
  };
}

/**
 * Reads all `.mdx` and `.md` files in a subdirectory of `content/`.
 * Returns an array of `ContentPage<T>`.
 * Returns an empty array if the directory does not exist.
 *
 * @param subdir - Subdirectory name relative to `content/`, e.g. `"pages"`.
 */
export function loadContentDir<T = Record<string, unknown>>(
  subdir: string
): ContentPage<T>[] {
  const dirPath = join(contentRoot, subdir);

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
