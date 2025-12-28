import { allBlogs, allResearch } from "content-collections";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export type ContentType = "research" | "blog";
export type Lang = "en" | "ko";

type ResearchDoc = (typeof allResearch)[number];
type BlogDoc = (typeof allBlogs)[number];
type Doc = ResearchDoc | BlogDoc;

interface SlugIndex {
	[slug: string]: {
		en?: Doc;
		ko?: Doc;
	};
}

interface WikiIndex {
	[titleOrAlias: string]: string;
}

interface BacklinksIndex {
	[slug: string]: Array<{ slug: string; title: string }>;
}

interface DocMeta {
	slug: string;
	title: string;
	lastModified: number;
}

let slugIndex: SlugIndex = {};
let wikiIndex: WikiIndex = {};
let backlinksIndex: BacklinksIndex = {};
let isIndexed = false;

const OBSIDIAN_IMAGE_REGEX = /!\[\[([^\]]+)\]\]/g;
const WIKILINK_ALIAS_REGEX = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
const WIKILINK_SIMPLE_REGEX = /\[\[([^\]]+)\]\]/g;
const WIKILINK_EXTRACT_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
const IMPORT_REGEX = /^import\s+.*$/gm;

function extractWikiLinks(content: string): string[] {
	const links: string[] = [];
	const regex = new RegExp(WIKILINK_EXTRACT_REGEX.source, "g");
	let match: RegExpExecArray | null = regex.exec(content);
	while (match !== null) {
		links.push(match[1]);
		match = regex.exec(content);
	}
	return links;
}

function indexResearchDocs(): void {
	for (const doc of allResearch) {
		const slug = doc.slug;
		const lang = doc.lang as Lang;

		if (!slugIndex[slug]) {
			slugIndex[slug] = {};
		}
		slugIndex[slug][lang] = doc;

		wikiIndex[doc.title.toLowerCase()] = slug;

		if (doc.aliases) {
			for (const alias of doc.aliases) {
				wikiIndex[alias.toLowerCase()] = slug;
			}
		}
	}
}

function indexBlogDocs(): void {
	for (const doc of allBlogs) {
		const slug = doc.slug;
		const lang = doc.lang as Lang;

		if (!slugIndex[slug]) {
			slugIndex[slug] = {};
		}
		slugIndex[slug][lang] = doc;

		if (doc.title) {
			wikiIndex[doc.title.toLowerCase()] = slug;
		}
	}
}

function indexBacklinks(): void {
	for (const doc of allResearch) {
		const sourceSlug = doc.slug;
		const sourceTitle = doc.title;
		const outgoingLinks = extractWikiLinks(doc.content);

		for (const linkTarget of outgoingLinks) {
			const targetSlug = wikiIndex[linkTarget.toLowerCase()];
			if (targetSlug && targetSlug !== sourceSlug) {
				if (!backlinksIndex[targetSlug]) {
					backlinksIndex[targetSlug] = [];
				}
				if (!backlinksIndex[targetSlug].some((b) => b.slug === sourceSlug)) {
					backlinksIndex[targetSlug].push({
						slug: sourceSlug,
						title: sourceTitle,
					});
				}
			}
		}
	}
}

function buildContentIndex(): void {
	if (isIndexed) {
		return;
	}

	slugIndex = {};
	wikiIndex = {};
	backlinksIndex = {};

	indexResearchDocs();
	indexBlogDocs();
	indexBacklinks();

	isIndexed = true;
}

export function resolveWikiLink(title: string): string | null {
	buildContentIndex();
	return wikiIndex[title.toLowerCase()] ?? null;
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

	const entry = slugIndex[slug.toLowerCase()];
	if (!entry) {
		return null;
	}

	const doc = entry[lang] ?? entry.en ?? entry.ko;
	if (!doc) {
		return null;
	}

	const processedContent = processWikiLinks(doc.content, lang as Lang);

	const { code } = await bundleMDX({
		source: processedContent,
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
			title: doc.title,
			slug: doc.slug,
			lang: doc.lang,
			date: "date" in doc ? doc.date : undefined,
		},
		type: doc._meta.filePath.includes("blog") ? "blog" : "research",
	};
}

export function getAllSlugs(): string[] {
	buildContentIndex();
	return Object.keys(slugIndex);
}

export function getBacklinks(
	slug: string
): Array<{ slug: string; title: string }> {
	buildContentIndex();
	return backlinksIndex[slug.toLowerCase()] ?? [];
}

export function getAllDocs(): DocMeta[] {
	buildContentIndex();

	const docs: DocMeta[] = [];

	for (const doc of allResearch) {
		if (doc._meta.filePath.includes("pages/")) {
			const lastModified = doc.date ? new Date(doc.date).getTime() : 0;
			docs.push({
				slug: doc.slug,
				title: doc.title,
				lastModified,
			});
		}
	}

	docs.sort((a, b) => b.lastModified - a.lastModified);
	return docs;
}
