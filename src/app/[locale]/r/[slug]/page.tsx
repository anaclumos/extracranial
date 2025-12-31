import { allBlogs, allResearch } from "content-collections";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Backlinks } from "@/components/backlinks";
import { MDXContent } from "@/components/mdx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { routing } from "@/i18n/routing";
import { getBacklinks } from "@/lib/backlinks";

interface Props {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	const params: Array<{ locale: string; slug: string }> = [];
	// Generate all unique slugs for all locales (fallback support)
	const allSlugs = new Set([
		...allResearch.map((doc) => doc.slug),
		...allBlogs.map((doc) => doc.slug),
	]);
	for (const locale of routing.locales) {
		for (const slug of allSlugs) {
			params.push({ locale, slug });
		}
	}
	return params;
}

export default async function ResearchPage({ params }: Props) {
	const { slug, locale } = await params;
	setRequestLocale(locale);

	const upperSlug = slug.toUpperCase();

	// Try current locale first, then fall back to other language
	const doc =
		allResearch.find((d) => d.slug === upperSlug && d.lang === locale) ||
		allBlogs.find((d) => d.slug === upperSlug && d.lang === locale) ||
		allResearch.find((d) => d.slug === upperSlug) ||
		allBlogs.find((d) => d.slug === upperSlug);

	if (!doc) {
		notFound();
	}

	const backlinks = getBacklinks(upperSlug, locale as "en" | "ko");
	const dateLocale = locale === "ko" ? "ko-KR" : "en-US";

	return (
		<>
			<div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 lg:py-16">
				<article className="prose mx-auto max-w-3xl">
					<header className="not-prose mb-12">
						<h1 className="mb-4 font-semibold text-3xl tracking-tight sm:text-4xl">
							{doc.title}
						</h1>
						{doc.date && (
							<time className="text-muted-foreground text-sm">
								{new Date(doc.date).toLocaleDateString(dateLocale, {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						)}
					</header>
					<MDXContent code={doc.code} />
				</article>

				{backlinks.length > 0 && (
					<div className="mx-auto mt-16 max-w-3xl border-t pt-8 lg:hidden">
						<Backlinks backlinks={backlinks} locale={locale as "en" | "ko"} />
					</div>
				)}
			</div>

			<aside className="hidden w-72 shrink-0 border-border border-l lg:flex lg:flex-col">
				<ScrollArea className="flex-1">
					<div className="p-4">
						{backlinks.length > 0 ? (
							<Backlinks backlinks={backlinks} locale={locale as "en" | "ko"} />
						) : (
							<p className="text-muted-foreground text-sm">
								{locale === "ko"
									? "이 문서를 링크한 글이 없습니다"
									: "No pages link to this note"}
							</p>
						)}
					</div>
				</ScrollArea>
			</aside>
		</>
	);
}
