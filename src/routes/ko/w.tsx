import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Calendar } from "lucide-react";
import { getAllBlogPosts } from "../../lib/content.server";

const fetchBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
	return getAllBlogPosts("ko");
});

export const Route = createFileRoute("/ko/w")({
	loader: () => fetchBlogPosts(),
	component: BlogListPage,
});

function BlogListPage() {
	const posts = Route.useLoaderData();

	return (
		<div className="mx-auto max-w-3xl px-4 py-16">
			<header className="mb-12">
				<h1 className="mb-4 font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
					블로그
				</h1>
				<p className="text-lg text-muted-foreground">
					긴 글, 프로젝트 회고, 흥미로운 문제와 해결책에 대한 깊은 탐구.
				</p>
			</header>

			<div className="space-y-6">
				{posts.map((post) => (
					<Link
						className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						key={post.slug}
						params={{ slug: post.slug }}
						to="/ko/r/$slug"
					>
						<h2 className="mb-2 font-medium text-card-foreground text-xl group-hover:text-foreground">
							{post.title}
						</h2>
						{post.date && (
							<div className="flex items-center gap-2 text-muted-foreground text-sm">
								<Calendar size={14} />
								<time>
									{new Date(post.date).toLocaleDateString("ko-KR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							</div>
						)}
					</Link>
				))}
			</div>
		</div>
	);
}
