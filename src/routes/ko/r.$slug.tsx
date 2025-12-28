import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

import { AppleMusicSong } from "../../components/mdx/AppleMusicSong";
import { Callout } from "../../components/mdx/Callout";
import { DisplayFlex, Horizontal } from "../../components/mdx/DisplayFlex";
import { Shuffle } from "../../components/mdx/Shuffle";
import { SpotifySong } from "../../components/mdx/SpotifySong";
import { WIP } from "../../components/mdx/Wip";
import { YouTube } from "../../components/mdx/YouTube";
import { getContent } from "../../lib/content.server";

const fetchContent = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const content = await getContent(slug, "ko");
		if (!content) {
			throw new Error("Content not found");
		}
		return content;
	});

export const Route = createFileRoute("/ko/r/$slug")({
	loader: ({ params }) => fetchContent({ data: params.slug }),
	component: ContentPage,
	errorComponent: NotFound,
});

const mdxComponents = {
	AppleMusicSong,
	Callout,
	DisplayFlex,
	Horizontal,
	Shuffle,
	SpotifySong,
	WIP,
	YouTube,
};

function ContentPage() {
	const { code, frontmatter } = Route.useLoaderData();

	const Component = useMemo(() => getMDXComponent(code), [code]);

	return (
		<article className="prose prose-neutral dark:prose-invert max-w-none">
			<header className="mb-8 border-neutral-200 border-b pb-8 dark:border-neutral-800">
				<h1 className="mb-2 font-bold text-3xl">{frontmatter.title}</h1>
				{frontmatter.date && (
					<time className="text-neutral-500 text-sm">
						{new Date(frontmatter.date).toLocaleDateString("ko-KR", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				)}
			</header>
			<Component components={mdxComponents} />
		</article>
	);
}

function NotFound() {
	return (
		<div className="py-20 text-center">
			<h1 className="mb-4 font-bold text-4xl">404</h1>
			<p className="text-neutral-500">페이지를 찾을 수 없습니다</p>
		</div>
	);
}
