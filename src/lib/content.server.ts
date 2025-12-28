import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const CONTENTS_DIR = path.join(process.cwd(), "contents");
const RESEARCH_DIR = path.join(CONTENTS_DIR, "research");
const BLOG_DIR = path.join(CONTENTS_DIR, "blog");

const OBSIDIAN_IMAGE_REGEX = /!\[\[([^\]]+)\]\]/g;
const WIKILINK_ALIAS_REGEX = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
const WIKILINK_SIMPLE_REGEX = /\[\[([^\]]+)\]\]/g;
const IMPORT_REGEX = /^import\s+.*$/gm;
const LEADING_SLASH_REGEX = /^\//;

export type ContentType = "research" | "blog";
export type Lang = "en" | "ko";

export interface ContentMeta {
	title?: string;
	slug: string;
	lang: Lang;
	date?: string;
	aliases?: string[];
	filePath: string;
	type: ContentType;
}

interface SlugIndex {
	[slug: string]: {
		en?: string;
		ko?: string;
	};
}

interface WikiIndex {
	[titleOrAlias: string]: string;
}

let slugIndex: SlugIndex = {};
let wikiIndex: WikiIndex = {};
let isIndexed = false;

function normalizeSlug(slug: string): string {
	return slug.replace(LEADING_SLASH_REGEX, "").toLowerCase();
}

function getAllMarkdownFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) {
		return [];
	}

	const files: string[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!entry.name.startsWith(".") && entry.name !== "templates") {
				files.push(...getAllMarkdownFiles(fullPath));
			}
		} else if (entry.name.endsWith(".md")) {
			files.push(fullPath);
		}
	}

	return files;
}

function detectLangFromFile(
	filePath: string,
	frontmatter: Record<string, unknown>
): Lang {
	const fileName = path.basename(filePath, ".md");

	if (fileName === "en" || fileName === "ko") {
		return fileName as Lang;
	}

	if (frontmatter.lang === "ko" || frontmatter.lang === "ko-KR") {
		return "ko";
	}

	return "en";
}

function safeReadFile(filePath: string): string | null {
	try {
		return fs.readFileSync(filePath, "utf-8");
	} catch {
		return null;
	}
}

function indexSingleResearchFile(filePath: string): void {
	const content = safeReadFile(filePath);
	if (!content) {
		return;
	}

	const { data } = matter(content);
	if (!data.slug) {
		return;
	}

	const slug = normalizeSlug(data.slug);
	const lang = detectLangFromFile(filePath, data);

	if (!slugIndex[slug]) {
		slugIndex[slug] = {};
	}
	slugIndex[slug][lang] = filePath;

	const title = data.title || path.basename(filePath, ".md");
	wikiIndex[title.toLowerCase()] = slug;

	if (data.aliases && Array.isArray(data.aliases)) {
		for (const alias of data.aliases) {
			wikiIndex[alias.toLowerCase()] = slug;
		}
	}
}

function indexResearchFiles(): void {
	const researchFiles = getAllMarkdownFiles(RESEARCH_DIR);
	for (const filePath of researchFiles) {
		indexSingleResearchFile(filePath);
	}
}

function indexBlogDir(dirPath: string): void {
	const enPath = path.join(dirPath, "en.md");
	const koPath = path.join(dirPath, "ko.md");

	const enContent = safeReadFile(enPath);
	if (enContent) {
		const { data } = matter(enContent);
		if (data.slug) {
			const slug = normalizeSlug(data.slug);
			if (!slugIndex[slug]) {
				slugIndex[slug] = {};
			}
			slugIndex[slug].en = enPath;
			if (data.title) {
				wikiIndex[data.title.toLowerCase()] = slug;
			}
		}
	}

	const koContent = safeReadFile(koPath);
	if (koContent) {
		const { data } = matter(koContent);
		if (data.slug) {
			const slug = normalizeSlug(data.slug);
			if (!slugIndex[slug]) {
				slugIndex[slug] = {};
			}
			slugIndex[slug].ko = koPath;
		}
	}
}

function indexBlogFiles(): void {
	if (!fs.existsSync(BLOG_DIR)) {
		return;
	}

	const blogDirs = fs
		.readdirSync(BLOG_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory());

	for (const dir of blogDirs) {
		indexBlogDir(path.join(BLOG_DIR, dir.name));
	}
}

export function buildContentIndex(): void {
	if (isIndexed) {
		return;
	}

	slugIndex = {};
	wikiIndex = {};

	indexResearchFiles();
	indexBlogFiles();

	isIndexed = true;
}

export function resolveWikiLink(title: string): string | null {
	buildContentIndex();
	const slug = wikiIndex[title.toLowerCase()];
	return slug ?? null;
}

export function getFilePath(slug: string, lang: Lang): string | null {
	buildContentIndex();
	const normalizedSlug = normalizeSlug(slug);
	const entry = slugIndex[normalizedSlug];

	if (!entry) {
		return null;
	}

	return entry[lang] ?? entry.en ?? entry.ko ?? null;
}

export function getContentType(filePath: string): ContentType {
	if (filePath.includes("/blog/")) {
		return "blog";
	}
	return "research";
}

function processWikiLinks(content: string, lang: Lang): string {
	const prefix = lang === "ko" ? "/ko" : "";

	let result = content.replace(OBSIDIAN_IMAGE_REGEX, (_, imageName) => {
		return `![${imageName}](/api/assets/${encodeURIComponent(imageName)})`;
	});

	result = result.replace(WIKILINK_ALIAS_REGEX, (_, target, alias) => {
		const targetSlug = resolveWikiLink(target);
		if (targetSlug) {
			return `[${alias}](${prefix}/r/${targetSlug})`;
		}
		return `[${alias}](#)`;
	});

	result = result.replace(WIKILINK_SIMPLE_REGEX, (_, target) => {
		const targetSlug = resolveWikiLink(target);
		if (targetSlug) {
			return `[${target}](${prefix}/r/${targetSlug})`;
		}
		return `[${target}](#)`;
	});

	result = result.replace(IMPORT_REGEX, "");

	return result;
}

export async function getContent(slug: string, lang: Lang = "en") {
	buildContentIndex();

	const filePath = getFilePath(slug, lang);
	if (!filePath) {
		return null;
	}

	const source = safeReadFile(filePath);
	if (!source) {
		return null;
	}

	const { data: frontmatter, content } = matter(source);

	const contentDir = path.dirname(filePath);
	const processedContent = processWikiLinks(content, lang);

	const { code } = await bundleMDX({
		source: processedContent,
		cwd: contentDir,
		mdxOptions(options) {
			options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				rehypeHighlight,
			];
			return options;
		},
		esbuildOptions(options) {
			options.platform = "node";
			return options;
		},
	});

	return {
		code,
		frontmatter: {
			title: frontmatter.title || path.basename(filePath, ".md"),
			slug: frontmatter.slug,
			lang: detectLangFromFile(filePath, frontmatter),
			date: frontmatter.date,
			...frontmatter,
		},
		type: getContentType(filePath),
	};
}

export function getAllSlugs(): string[] {
	buildContentIndex();
	return Object.keys(slugIndex);
}
