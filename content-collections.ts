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

function processContent(content: string, lang: "en" | "ko"): string {
	const prefix = lang === "ko" ? "/ko" : "";

	let result = content.replace(OBSIDIAN_IMAGE_REGEX, (_, imageName) => {
		return `![${imageName}](/api/assets/${encodeURIComponent(imageName)})`;
	});

	result = result.replace(WIKILINK_ALIAS_REGEX, (_, target, alias) => {
		return `[${alias}](${prefix}/r/${target.toLowerCase()})`;
	});

	result = result.replace(WIKILINK_SIMPLE_REGEX, (_, target) => {
		return `[${target}](${prefix}/r/${target.toLowerCase()})`;
	});

	result = result.replace(IMPORT_REGEX, "");

	// Remove HTML comments (MDX doesn't support them)
	result = result.replace(HTML_COMMENT_REGEX, "");

	// Escape angle brackets followed by numbers (e.g., <1.5)
	result = result.replace(ANGLE_BRACKET_NUM_REGEX, "\\<$1");

	return result;
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
		const lang = (document.lang || "en") as "en" | "ko";
		const processedContent = processContent(document.content, lang);

		const code = await compileMDX(
			context,
			{ ...document, content: processedContent },
			{
				remarkPlugins: [remarkGfm, remarkMath],
				rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeKatex],
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
		const fileName = document._meta.fileName;
		const lang = fileName === "ko.md" ? "ko" : "en";
		const processedContent = processContent(
			document.content,
			lang as "en" | "ko"
		);

		const code = await compileMDX(
			context,
			{ ...document, content: processedContent },
			{
				remarkPlugins: [remarkGfm, remarkMath],
				rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeKatex],
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
