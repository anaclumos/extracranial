import { allBlogs, allResearch } from "content-collections";

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

const WIKILINK_EXTRACT_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

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
		if (!slugIndex[doc.slug]) {
			slugIndex[doc.slug] = {};
		}
		slugIndex[doc.slug][doc.lang as Lang] = doc;
		wikiIndex[doc.title.toLowerCase()] = doc.slug;

		if (doc.aliases) {
			for (const alias of doc.aliases) {
				wikiIndex[alias.toLowerCase()] = doc.slug;
			}
		}
	}
}

function indexBlogDocs(): void {
	for (const doc of allBlogs) {
		if (!slugIndex[doc.slug]) {
			slugIndex[doc.slug] = {};
		}
		slugIndex[doc.slug][doc.lang as Lang] = doc;

		if (doc.title) {
			wikiIndex[doc.title.toLowerCase()] = doc.slug;
		}
	}
}

function indexBacklinks(): void {
	for (const doc of allResearch) {
		const outgoingLinks = extractWikiLinks(doc.content);

		for (const linkTarget of outgoingLinks) {
			const targetSlug = wikiIndex[linkTarget.toLowerCase()];
			if (targetSlug && targetSlug !== doc.slug) {
				if (!backlinksIndex[targetSlug]) {
					backlinksIndex[targetSlug] = [];
				}
				if (!backlinksIndex[targetSlug].some((b) => b.slug === doc.slug)) {
					backlinksIndex[targetSlug].push({
						slug: doc.slug,
						title: doc.title,
					});
				}
			}
		}
	}
}

function buildContentIndex(): void {
	if (isIndexed) return;

	slugIndex = {};
	wikiIndex = {};
	backlinksIndex = {};

	indexResearchDocs();
	indexBlogDocs();
	indexBacklinks();

	isIndexed = true;
}

export function getContent(slug: string, lang: Lang = "en") {
	buildContentIndex();

	const entry = slugIndex[slug.toLowerCase()];
	if (!entry) return null;

	const doc = entry[lang] ?? entry.en ?? entry.ko;
	if (!doc) return null;

	return {
		code: doc.code,
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
			docs.push({
				slug: doc.slug,
				title: doc.title,
				lastModified: doc.date ? new Date(doc.date).getTime() : 0,
			});
		}
	}

	docs.sort((a, b) => b.lastModified - a.lastModified);
	return docs;
}

interface BlogMeta {
	slug: string;
	title: string;
	date: Date | undefined;
	lang: string;
}

export function getAllBlogPosts(lang: Lang = "en"): BlogMeta[] {
	buildContentIndex();

	const posts: BlogMeta[] = [];
	const seen = new Set<string>();

	for (const doc of allBlogs) {
		if (seen.has(doc.slug)) continue;
		if (doc.lang !== lang) continue;

		seen.add(doc.slug);
		posts.push({
			slug: doc.slug,
			title: doc.title,
			date: doc.date,
			lang: doc.lang,
		});
	}

	posts.sort((a, b) => {
		if (!(a.date || b.date)) return 0;
		if (!a.date) return 1;
		if (!b.date) return -1;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return posts;
}
