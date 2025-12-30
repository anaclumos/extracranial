"use client";

import { allBlogs, allResearch } from "content-collections";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Props {
	locale: "en" | "ko";
}

export function Sidebar({ locale }: Props) {
	const prefix = locale === "en" ? "" : `/${locale}`;

	const blogs = allBlogs
		.filter((blog) => blog.lang === locale)
		.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0;
			const dateB = b.date ? new Date(b.date).getTime() : 0;
			return dateB - dateA;
		});

	const notes = allResearch
		.filter((note) => note.lang === locale)
		.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0;
			const dateB = b.date ? new Date(b.date).getTime() : 0;
			if (dateA === 0 && dateB === 0) {
				return a.title.localeCompare(b.title);
			}
			return dateB - dateA;
		});

	return (
		<aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-border border-r lg:block">
			<ScrollArea className="h-[calc(100vh-4rem)]">
				<div className="p-4">
					<section className="mb-6">
						<div className="mb-3 flex items-center justify-between">
							<h2 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								{locale === "ko" ? "블로그" : "Blog"}
							</h2>
							<Badge className="text-xs" variant="secondary">
								{blogs.length}
							</Badge>
						</div>
						<ul className="space-y-0.5">
							{blogs.map((blog) => (
								<li key={blog.slug}>
									<Link
										className="block truncate rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
										href={`${prefix}/w/${blog.slug.toLowerCase()}`}
									>
										{blog.title}
									</Link>
								</li>
							))}
						</ul>
					</section>

					<Separator className="my-4" />

					<section>
						<div className="mb-3 flex items-center justify-between">
							<h2 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								{locale === "ko" ? "연구 노트" : "Research Notes"}
							</h2>
							<Badge className="text-xs" variant="secondary">
								{notes.length}
							</Badge>
						</div>
						<ul className="space-y-0.5">
							{notes.map((note) => (
								<li key={note.slug}>
									<Link
										className="block truncate rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
										href={`${prefix}/r/${note.slug.toLowerCase()}`}
									>
										{note.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				</div>
			</ScrollArea>
		</aside>
	);
}
