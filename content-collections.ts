import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

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
	transform: (document) => {
		const slug = document.slug.replace(/^\//, "").toLowerCase();
		return {
			...document,
			slug,
			lang: document.lang || "en",
			title: document.title || document._meta.fileName.replace(/\.md$/, ""),
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
	transform: (document) => {
		const fileName = document._meta.fileName;
		const lang = fileName === "ko.md" ? "ko" : "en";
		const slug = document.slug.replace(/^\//, "").toLowerCase();
		return {
			...document,
			slug,
			lang,
			title: document.title || document._meta.directory,
		};
	},
});

export default defineConfig({
	collections: [research, blog],
});
