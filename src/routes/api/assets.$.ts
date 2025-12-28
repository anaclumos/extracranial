import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createFileRoute } from "@tanstack/react-router";

const ASSETS_DIR = join(process.cwd(), "contents/research/assets");
const BLOG_DIR = join(process.cwd(), "contents/blog");

const MIME_TYPES: Record<string, string> = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".pdf": "application/pdf",
};

const EXT_REGEX = /\.[^.]+$/;

function getMimeType(filename: string): string {
	const ext = filename.toLowerCase().match(EXT_REGEX)?.[0] ?? "";
	return MIME_TYPES[ext] ?? "application/octet-stream";
}

export const Route = createFileRoute("/api/assets/$")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const assetPath = params._splat;
				if (!assetPath) {
					return new Response("Not Found", { status: 404 });
				}

				const segments = assetPath.split("/").filter(Boolean);
				let filePath: string;

				if (segments[0] === "blog" && segments.length >= 2) {
					filePath = join(BLOG_DIR, ...segments.slice(1));
				} else {
					filePath = join(ASSETS_DIR, ...segments);
				}

				const normalizedPath = filePath.replace(/\\/g, "/");
				const isUnderAssets = normalizedPath.startsWith(
					ASSETS_DIR.replace(/\\/g, "/")
				);
				const isUnderBlog = normalizedPath.startsWith(
					BLOG_DIR.replace(/\\/g, "/")
				);

				if (!(isUnderAssets || isUnderBlog)) {
					return new Response("Forbidden", { status: 403 });
				}

				if (!existsSync(filePath)) {
					return new Response("Not Found", { status: 404 });
				}

				const content = await readFile(filePath);
				const mimeType = getMimeType(filePath);

				return new Response(content, {
					status: 200,
					headers: {
						"Content-Type": mimeType,
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				});
			},
		},
	},
});
