import { createFileRoute } from "@tanstack/react-router";

const GITHUB_RAW_BASE =
	"https://raw.githubusercontent.com/anaclumos/extracranial/main";

export const Route = createFileRoute("/api/assets/$")({
	server: {
		handlers: {
			GET: ({ params }) => {
				const assetPath = params._splat;
				if (!assetPath) {
					return new Response("Not Found", { status: 404 });
				}

				const segments = assetPath.split("/").filter(Boolean);
				const isBlogAsset = segments[0] === "blog" && segments.length >= 2;

				const githubPath = isBlogAsset
					? `${GITHUB_RAW_BASE}/contents/blog/${segments.slice(1).join("/")}`
					: `${GITHUB_RAW_BASE}/contents/research/assets/${segments.join("/")}`;

				return new Response(null, {
					status: 302,
					headers: {
						Location: githubPath,
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				});
			},
		},
	},
});
