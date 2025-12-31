import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import type { Root } from "mdast";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
// biome-ignore lint/style/useImportType: required as value for remarkPlugins array
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { z } from "zod";

// Custom remark plugin to transform :::info, :::warning, etc. to Callout components
function remarkCallouts() {
	return (tree: Root) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				const directive = node as {
					name: string;
					type: string;
					data?: { hName?: string; hProperties?: Record<string, unknown> };
					children?: unknown[];
				};
				const calloutTypes = [
					"info",
					"warning",
					"tip",
					"danger",
					"note",
					"caution",
				];
				if (calloutTypes.includes(directive.name)) {
					const data = directive.data || (directive.data = {});
					data.hName = "Callout";
					data.hProperties = {
						type:
							directive.name === "note"
								? "info"
								: directive.name === "caution"
									? "warning"
									: directive.name,
					};
				}
			}
		});
	};
}

const LEADING_SLASH_REGEX = /^\//;
const MD_EXT_REGEX = /\.md$/;
const OBSIDIAN_IMAGE_REGEX = /!\[\[([^\]]+)\]\]/g;
const WIKILINK_ALIAS_REGEX = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
const WIKILINK_SIMPLE_REGEX = /\[\[([^\]]+)\]\]/g;
const WIKILINK_ALL_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
const IMPORT_REGEX = /^import\s+.*$/gm;
const HTML_COMMENT_REGEX = /<!--[\s\S]*?-->/g;
const ANGLE_BRACKET_NUM_REGEX = /<(\d)/g;
const MALFORMED_LATEX_REGEX = /\\\[([^\]]*)\\\]/g;
// Match markdown images with relative paths (not starting with / or http)
const RELATIVE_IMAGE_REGEX = /!\[([^\]]*)\]\((?!\/|https?:\/\/)([^)]+)\)/g;
// Match <source src="./..."> or <video src="./..."> with relative paths
const RELATIVE_VIDEO_SRC_REGEX =
	/(<(?:source|video)[^>]*\ssrc=")(?!\/|https?:\/\/)([^"]+)(")/g;
const LEADING_DOT_SLASH_REGEX = /^\.\//;
// Transform <details> and <summary> to custom components
const DETAILS_OPEN_REGEX = /<details>/gi;
const DETAILS_CLOSE_REGEX = /<\/details>/gi;
const SUMMARY_OPEN_REGEX = /<summary>/gi;
const SUMMARY_CLOSE_REGEX = /<\/summary>/gi;

type TitleToSlugMap = Map<string, string>;

function extractOutgoingLinks(
	content: string,
	titleToSlug: TitleToSlugMap
): Array<{ targetSlug: string; targetTitle: string; excerpt: string }> {
	const links: Array<{
		targetSlug: string;
		targetTitle: string;
		excerpt: string;
	}> = [];
	const seen = new Set<string>();

	// Split content into lines for excerpt extraction
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		let match: RegExpExecArray | null;
		const regex = new RegExp(WIKILINK_ALL_REGEX.source, "g");

		while ((match = regex.exec(line)) !== null) {
			const targetTitle = match[1];
			const targetSlug = (
				titleToSlug.get(targetTitle.toLowerCase()) ?? targetTitle.toLowerCase()
			).toUpperCase();

			if (seen.has(targetSlug)) {
				continue;
			}
			seen.add(targetSlug);

			// Get surrounding context (current line, cleaned up)
			const excerpt = line
				.replace(/^#+\s*/, "") // Remove heading markers
				.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2$1") // Replace wiki links with text
				.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace markdown links with text
				.replace(/[*_`]/g, "") // Remove formatting
				.trim()
				.slice(0, 150);

			links.push({
				targetSlug,
				targetTitle,
				excerpt: excerpt + (excerpt.length >= 150 ? "..." : ""),
			});
		}
	}

	return links;
}

function processContent(
	content: string,
	lang: "en" | "ko",
	titleToSlug: TitleToSlugMap
): string {
	const prefix = lang === "ko" ? "/ko" : "";

	let result = content.replace(OBSIDIAN_IMAGE_REGEX, (_, imageName) => {
		return `![${imageName}](/assets/${encodeURIComponent(imageName)})`;
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

	// Convert malformed \[...\] LaTeX to proper $$...$$ display math
	result = result.replace(MALFORMED_LATEX_REGEX, "$$$1$$");

	// Transform <details>/<summary> to custom Accordion components
	result = result.replace(DETAILS_OPEN_REGEX, "<Details>");
	result = result.replace(DETAILS_CLOSE_REGEX, "</Details>");
	result = result.replace(SUMMARY_OPEN_REGEX, "<Summary>");
	result = result.replace(SUMMARY_CLOSE_REGEX, "</Summary>");

	return result;
}

function processBlogContent(
	content: string,
	lang: "en" | "ko",
	titleToSlug: TitleToSlugMap,
	blogDirectory: string
): string {
	// First, transform relative image paths to absolute paths
	let result = content.replace(RELATIVE_IMAGE_REGEX, (_, alt, imagePath) => {
		const encodedPath = encodeURIComponent(imagePath);
		return `![${alt}](/assets/blog/${blogDirectory}/${encodedPath})`;
	});

	// Transform relative video/source src paths to absolute paths
	result = result.replace(
		RELATIVE_VIDEO_SRC_REGEX,
		(_, prefix, videoPath, suffix) => {
			// Remove leading ./ if present
			const cleanPath = videoPath.replace(LEADING_DOT_SLASH_REGEX, "");
			const encodedPath = encodeURIComponent(cleanPath);
			return `${prefix}/assets/blog/${blogDirectory}/${encodedPath}${suffix}`;
		}
	);

	// Then apply the common content processing
	return processContent(result, lang, titleToSlug);
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
				remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkCallouts],
				rehypePlugins: [
					rehypeSlug,
					[
						rehypeHighlight,
						{
							ignoreMissing: true,
							plainText: [
								"math",
								"mermaid",
								"latex",
								"tex",
								"hbs",
								"handlebars",
								"applescript",
								"docker",
								"nix",
								"dataview",
							],
						},
					],
					[rehypeKatex, { strict: false }],
				],
			}
		);

		const slug = document.slug.replace(LEADING_SLASH_REGEX, "").toUpperCase();
		const outgoingLinks = extractOutgoingLinks(document.content, titleToSlug);

		return {
			slug,
			lang,
			code,
			title:
				document.title || document._meta.fileName.replace(MD_EXT_REGEX, ""),
			date: document.date,
			aliases: document.aliases,
			outgoingLinks,
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
		const blogDirectory = document._meta.directory;
		const processedContent = processBlogContent(
			document.content,
			lang as "en" | "ko",
			titleToSlug,
			blogDirectory
		);

		const code = await compileMDX(
			context,
			{ ...document, content: processedContent },
			{
				remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkCallouts],
				rehypePlugins: [
					rehypeSlug,
					[
						rehypeHighlight,
						{
							ignoreMissing: true,
							plainText: [
								"math",
								"mermaid",
								"latex",
								"tex",
								"hbs",
								"handlebars",
								"applescript",
								"docker",
								"nix",
								"dataview",
							],
						},
					],
					[rehypeKatex, { strict: false }],
				],
			}
		);

		const slug = document.slug.replace(LEADING_SLASH_REGEX, "").toUpperCase();
		const outgoingLinks = extractOutgoingLinks(document.content, titleToSlug);

		return {
			slug,
			lang,
			code,
			title: document.title || document._meta.directory,
			date: document.date,
			outgoingLinks,
			_meta: document._meta,
		};
	},
});

export default defineConfig({
	collections: [research, blog],
});
