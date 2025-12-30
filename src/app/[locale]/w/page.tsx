import { allBlogs } from "content-collections";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { routing } from "@/i18n/routing";

type Props = {
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogListPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const posts = allBlogs
		.filter((doc) => doc.lang === locale)
		.sort((a, b) => {
			if (!(a.date && b.date)) return 0;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

	const dateLocale = locale === "ko" ? "ko-KR" : "en-US";
	const prefix = locale === "en" ? "" : `/${locale}`;

	return (
		<div className="mx-auto max-w-3xl px-4 py-16">
			<header className="mb-12">
				<h1 className="mb-4 font-semibold text-3xl tracking-tight sm:text-4xl">
					{locale === "ko" ? "블로그" : "Blog"}
				</h1>
				<p className="text-lg text-muted-foreground">
					{locale === "ko"
						? "장문의 글, 프로젝트 회고, 그리고 더 깊은 탐구."
						: "Long-form articles, project retrospectives, and deeper dives."}
				</p>
			</header>

			<div className="space-y-6">
				{posts.map((post) => (
					<Link href={`${prefix}/w/${post.slug}`} key={post.slug}>
						<Card className="transition-colors hover:bg-accent/50">
							<CardHeader>
								<CardTitle>{post.title}</CardTitle>
								{post.date && (
									<CardDescription className="flex items-center gap-2">
										<Calendar size={14} />
										<time>
											{new Date(post.date).toLocaleDateString(dateLocale, {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</time>
									</CardDescription>
								)}
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
