import { useMDXComponent } from "@content-collections/mdx/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { BacklinksSidebar } from "../components/BacklinksSidebar";
import { DocSidebar } from "../components/DocSidebar";
import { AccordionItem, Accordions } from "../components/mdx/Accordion";
import { AppleMusicSong } from "../components/mdx/AppleMusicSong";
import { Callout } from "../components/mdx/Callout";
import { DisplayFlex, Horizontal } from "../components/mdx/DisplayFlex";
import { Shuffle } from "../components/mdx/Shuffle";
import { SpotifySong } from "../components/mdx/SpotifySong";
import { WIP } from "../components/mdx/Wip";
import { YouTube } from "../components/mdx/YouTube";
import { getAllDocs, getBacklinks, getContent } from "../lib/content.server";

const fetchContent = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const content = await getContent(slug, "en");
		if (!content) {
			throw new Error("Content not found");
		}
		const backlinks = getBacklinks(slug);
		const allDocs = getAllDocs();
		return { ...content, backlinks, allDocs };
	});

export const Route = createFileRoute("/r/$slug")({
	loader: ({ params }) => {
		const upperSlug = params.slug.toUpperCase();
		if (params.slug !== upperSlug) {
			throw redirect({ to: "/r/$slug", params: { slug: upperSlug } });
		}
		return fetchContent({ data: params.slug });
	},
	component: ContentPage,
	errorComponent: NotFound,
});

const mdxComponents = {
	Accordion: AccordionItem,
	Accordions,
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
	const { code, frontmatter, backlinks, allDocs } = Route.useLoaderData();
	const { slug } = Route.useParams();

	const Component = useMDXComponent(code);

	return (
		<div className="mx-auto flex max-w-7xl px-4">
			<DocSidebar basePath="/r" currentSlug={slug} docs={allDocs} />
			<main className="min-w-0 flex-1 px-6 py-16 sm:px-8 lg:py-20">
				<article className="prose mx-auto max-w-2xl">
					<header className="not-prose mb-12">
						<h1 className="mb-4 font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
							{frontmatter.title}
						</h1>
						{frontmatter.date && (
							<time className="text-muted-foreground text-sm">
								{new Date(frontmatter.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						)}
					</header>
					<Component components={mdxComponents} />
				</article>
			</main>
			<BacklinksSidebar backlinks={backlinks} basePath="/r" />
		</div>
	);
}

function NotFound() {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
			<h1 className="mb-4 font-semibold text-6xl text-foreground">404</h1>
			<p className="text-lg text-muted-foreground">Content not found</p>
		</div>
	);
}
