import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { locales, other, type Lang } from "@/lib/i18n";
import { blogPath, ROUTES } from "@/lib/routes";

/**
 * File-based blog, one folder per language:
 *   content/blog/en/my-article.md   ->  /blog/my-article
 *   content/blog/pl/moj-artykul.md  ->  /pl/blog/moj-artykul
 *
 * Front matter: title, description, date (required); updated, tags, translationKey (optional).
 * Give an English and a Polish article the same `translationKey` to link them as translations:
 * the language switcher and the hreflang tags then point to each other.
 * Files starting with "_" are drafts; a future date hides the article until that day.
 */
const ROOT = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  translationKey?: string;
  readingMinutes: number;
};
export type TocItem = { id: string; text: string };
export type Post = PostMeta & { html: string; toc: TocItem[] };

export function slugify(text: string) {
  return text
    .replace(/[łŁ]/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const dir = (lang: Lang) => path.join(ROOT, lang);

function files(lang: Lang) {
  if (!fs.existsSync(dir(lang))) return [];
  return fs.readdirSync(dir(lang)).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

function readFile(lang: Lang, file: string) {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Blog file "${lang}/${file}" must use only lowercase letters, digits and hyphens.`);
  }
  const { data, content } = matter(fs.readFileSync(path.join(dir(lang), file), "utf8"));
  for (const key of ["title", "description", "date"] as const) {
    if (!data[key]) throw new Error(`Blog post "${lang}/${file}" is missing "${key}" in its front matter.`);
  }
  const words = content.trim().split(/\s+/).length;
  const meta: PostMeta = {
    lang,
    slug,
    title: String(data.title),
    description: String(data.description),
    date: new Date(data.date).toISOString().slice(0, 10),
    updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    translationKey: data.translationKey ? String(data.translationKey) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
  return { meta, content };
}

export function getAllPosts(lang: Lang): PostMeta[] {
  return files(lang)
    .map((f) => readFile(lang, f).meta)
    .filter((p) => new Date(p.date).getTime() <= Date.now() + 24 * 3600 * 1000)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(lang: Lang, slug: string): Post | null {
  const file = `${slug}.md`;
  if (!files(lang).includes(file)) return null;
  const { meta, content } = readFile(lang, file);

  let html = marked.parse(content, { async: false, gfm: true }) as string;
  const toc: TocItem[] = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const text = decode(inner.replace(/<[^>]+>/g, ""));
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return { ...meta, html, toc };
}

/** The same article in the other language, if it exists. */
export function getTranslation(post: PostMeta): PostMeta | null {
  if (!post.translationKey) return null;
  const target = other(post.lang);
  return getAllPosts(target).find((p) => p.translationKey === post.translationKey) ?? null;
}

/** path -> path in the other language, for every page and article. Used by the language switcher. */
export function buildAltMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const key of Object.keys(ROUTES) as (keyof typeof ROUTES)[]) {
    map[ROUTES[key].en] = ROUTES[key].pl;
    map[ROUTES[key].pl] = ROUTES[key].en;
  }
  for (const lang of ["en", "pl"] as Lang[]) {
    for (const post of getAllPosts(lang)) {
      const t = getTranslation(post);
      if (t) map[blogPath(lang, post.slug)] = blogPath(t.lang, t.slug);
    }
  }
  return map;
}

export function formatDate(lang: Lang, iso: string) {
  return new Intl.DateTimeFormat(locales[lang].intl, { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
}
