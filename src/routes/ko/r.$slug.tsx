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
		<div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 lg:py-20">
			<article className="prose max-w-none">
				<header className="not-prose mb-12">
					<h1 className="mb-4 font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
						{frontmatter.title}
					</h1>
					{frontmatter.date && (
						<time className="text-muted-foreground text-sm">
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
		</div>
	);
}

function NotFound() {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
			<h1 className="mb-4 font-semibold text-6xl text-foreground">404</h1>
			<p className="text-lg text-muted-foreground">페이지를 찾을 수 없습니다</p>
		</div>
	);
}
