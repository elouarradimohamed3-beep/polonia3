import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog engine. Each article is one Markdown file in /content/blog.
 * The file name becomes the URL: content/blog/moj-artykul.md -> /blog/moj-artykul
 *
 * Front matter (top of the file):
 *   ---
 *   title: "Tytuł artykułu"
 *   description: "Opis do Google, około 150 znaków."
 *   date: "2026-09-21"          # publication date, YYYY-MM-DD
 *   updated: "2026-10-05"       # optional, last real update
 *   tags: ["poradnik", "fire tv"]
 *   ---
 */
const DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  readingMinutes: number;
};

export type TocItem = { id: string; text: string };
export type Post = PostMeta & { html: string; toc: TocItem[] };

const POLISH: Record<string, string> = { ł: "l", Ł: "l" };

export function slugify(text: string) {
  return text
    .replace(/[łŁ]/g, (c) => POLISH[c])
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function readFile(file: string) {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Blog file name "${file}" must use only lowercase letters, digits and hyphens.`);
  }
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);

  for (const key of ["title", "description", "date"] as const) {
    if (!data[key]) throw new Error(`Blog post "${file}" is missing "${key}" in its front matter.`);
  }
  const date = new Date(data.date).toISOString().slice(0, 10);
  const updated = data.updated ? new Date(data.updated).toISOString().slice(0, 10) : undefined;
  const words = content.trim().split(/\s+/).length;

  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description),
    date,
    updated,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
  return { meta, content };
}

function files() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

/** All published posts, newest first. Files starting with "_" are drafts and are ignored. */
export function getAllPosts(): PostMeta[] {
  return files()
    .map((f) => readFile(f).meta)
    .filter((p) => new Date(p.date).getTime() <= Date.now() + 24 * 3600 * 1000)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!files().includes(file)) return null;
  const { meta, content } = readFile(file);

  let html = marked.parse(content, { async: false, gfm: true }) as string;

  const toc: TocItem[] = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const text = decode(inner.replace(/<[^>]+>/g, ""));
    let id = slugify(text) || "sekcja";
    while (used.has(id)) id += "-2";
    used.add(id);
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  // Open external links safely in a new tab
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

  return { ...meta, html, toc };
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
}
