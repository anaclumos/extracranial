import { allBlogs, allResearch } from "content-collections";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Backlinks } from "@/components/backlinks";
import { MDXContent } from "@/components/mdx";
import { routing } from "@/i18n/routing";
import { getBacklinks } from "@/lib/backlinks";

interface Props {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	const params: Array<{ locale: string; slug: string }> = [];
	for (const locale of routing.locales) {
		const researchSlugs = allResearch
			.filter((doc) => doc.lang === locale)
			.map((doc) => ({ locale, slug: doc.slug }));
		const blogSlugs = allBlogs
			.filter((doc) => doc.lang === locale)
			.map((doc) => ({ locale, slug: doc.slug }));
		params.push(...researchSlugs, ...blogSlugs);
	}
	return params;
}

export default async function ResearchPage({ params }: Props) {
	const { slug, locale } = await params;
	setRequestLocale(locale);

	const upperSlug = slug.toUpperCase();

	const doc =
		allResearch.find((d) => d.slug === upperSlug && d.lang === locale) ||
		allBlogs.find((d) => d.slug === upperSlug && d.lang === locale);

	if (!doc) {
		notFound();
	}

	const backlinks = getBacklinks(upperSlug, locale as "en" | "ko");
	const dateLocale = locale === "ko" ? "ko-KR" : "en-US";

	return (
		<div className="mx-auto max-w-6xl px-4 py-16">
			<div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
				<article className="prose min-w-0 flex-1">
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
					<aside className="w-full shrink-0 lg:w-72">
						<div className="lg:sticky lg:top-24">
							<Backlinks backlinks={backlinks} locale={locale as "en" | "ko"} />
						</div>
					</aside>
				)}
			</div>
		</div>
	);
}
