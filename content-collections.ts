import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { z } from "zod";

const LEADING_SLASH_REGEX = /^\//;
const MD_EXT_REGEX = /\.md$/;
const OBSIDIAN_IMAGE_REGEX = /!\[\[([^\]]+)\]\]/g;
const WIKILINK_ALIAS_REGEX = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
const WIKILINK_SIMPLE_REGEX = /\[\[([^\]]+)\]\]/g;
const IMPORT_REGEX = /^import\s+.*$/gm;
const HTML_COMMENT_REGEX = /<!--[\s\S]*?-->/g;
const ANGLE_BRACKET_NUM_REGEX = /<(\d)/g;

type TitleToSlugMap = Map<string, string>;

function processContent(
	content: string,
	lang: "en" | "ko",
	titleToSlug: TitleToSlugMap
): string {
	const prefix = lang === "ko" ? "/ko" : "";

	let result = content.replace(OBSIDIAN_IMAGE_REGEX, (_, imageName) => {
		return `![${imageName}](/api/assets/${encodeURIComponent(imageName)})`;
	});

	result = result.replace(WIKILINK_ALIAS_REGEX, (_, target, alias) => {
		const slug = titleToSlug.get(target.toLowerCase()) ?? target.toLowerCase();
		return `[${alias}](${prefix}/r/${slug})`;
	});

	result = result.replace(WIKILINK_SIMPLE_REGEX, (_, target) => {
		const slug = titleToSlug.get(target.toLowerCase()) ?? target.toLowerCase();
		return `[${target}](${prefix}/r/${slug})`;
	});

	result = result.replace(IMPORT_REGEX, "");

	// Remove HTML comments (MDX doesn't support them)
	result = result.replace(HTML_COMMENT_REGEX, "");

	// Escape angle brackets followed by numbers (e.g., <1.5)
	result = result.replace(ANGLE_BRACKET_NUM_REGEX, "\\<$1");

	return result;
}

function buildTitleToSlugMap(
	documents: Array<{
		title?: string;
		slug: string;
		aliases?: string[];
		_meta: { fileName: string };
	}>
): TitleToSlugMap {
	const map: TitleToSlugMap = new Map();

	for (const doc of documents) {
		const slug = doc.slug.replace(LEADING_SLASH_REGEX, "").toLowerCase();
		const title = doc.title || doc._meta.fileName.replace(MD_EXT_REGEX, "");

		// Map title to slug
		map.set(title.toLowerCase(), slug);

		// Map aliases to slug
		if (doc.aliases) {
			for (const alias of doc.aliases) {
				map.set(alias.toLowerCase(), slug);
			}
		}
	}

	return map;
}

const research = defineCollection({
	name: "research",
	directory: "contents/research",
	include: ["**/*.md", "!templates/**", "!journals/**"],
	schema: z.object({
		title: z.string().optional(),
		slug: z.string(),
		lang: z.enum(["en", "ko"]).optional().default("en"),
		date: z.string().optional(),
		aliases: z.array(z.string()).optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const allDocs = context.documents(research);
		const titleToSlug = buildTitleToSlugMap(allDocs);

		const lang = (document.lang || "en") as "en" | "ko";
		const processedContent = processContent(
			document.content,
			lang,
			titleToSlug
		);

		const code = await compileMDX(
			context,
			{ ...document, content: processedContent },
			{
				remarkPlugins: [remarkGfm, remarkMath],
				rehypePlugins: [
					rehypeSlug,
					[rehypeHighlight, { plainText: ["math"] }],
					rehypeKatex,
				],
			}
		);

		const slug = document.slug.replace(LEADING_SLASH_REGEX, "").toLowerCase();

		return {
			slug,
			lang,
			code,
			title:
				document.title || document._meta.fileName.replace(MD_EXT_REGEX, ""),
			date: document.date,
			aliases: document.aliases,
			content: document.content,
			_meta: document._meta,
		};
	},
});

const blog = defineCollection({
	name: "blog",
	directory: "contents/blog",
	include: "**/*.md",
	schema: z.object({
		title: z.string().optional(),
		slug: z.string(),
		date: z.coerce.date().optional(),
		authors: z.string().optional(),
		lang: z.enum(["en", "ko"]).optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		// Use research docs for title-to-slug mapping (blog posts may link to research)
		const allDocs = context.documents(research);
		const titleToSlug = buildTitleToSlugMap(allDocs);

		const fileName = document._meta.fileName;
		const lang = fileName === "ko.md" ? "ko" : "en";
		const processedContent = processContent(
			document.content,
			lang as "en" | "ko",
			titleToSlug
		);

		const code = await compileMDX(
			context,
			{ ...document, content: processedContent },
			{
				remarkPlugins: [remarkGfm, remarkMath],
				rehypePlugins: [
					rehypeSlug,
					[rehypeHighlight, { plainText: ["math"] }],
					rehypeKatex,
				],
			}
		);

		const slug = document.slug.replace(LEADING_SLASH_REGEX, "").toLowerCase();

		return {
			slug,
			lang,
			code,
			title: document.title || document._meta.directory,
			date: document.date,
			content: document.content,
			_meta: document._meta,
		};
	},
});

export default defineConfig({
	collections: [research, blog],
});
