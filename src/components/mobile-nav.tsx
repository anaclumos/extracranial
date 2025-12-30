"use client";

import { allBlogs, allResearch } from "content-collections";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
	locale: "en" | "ko";
}

export function MobileNav({ locale }: Props) {
	const [open, setOpen] = useState(false);
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
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetTrigger
				render={<Button className="lg:hidden" size="icon" variant="ghost" />}
			>
				<MenuIcon className="size-5" />
				<span className="sr-only">Toggle menu</span>
			</SheetTrigger>
			<SheetPopup side="left">
				<div className="flex h-16 items-center border-b px-4">
					<SheetTitle>Navigation</SheetTitle>
				</div>
				<div className="flex-1 overflow-y-auto p-4">
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
									<SheetClose
										render={
											<Link
												className="block truncate rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
												href={`${prefix}/w/${blog.slug.toLowerCase()}`}
											/>
										}
									>
										{blog.title}
									</SheetClose>
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
									<SheetClose
										render={
											<Link
												className="block truncate rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
												href={`${prefix}/r/${note.slug.toLowerCase()}`}
											/>
										}
									>
										{note.title}
									</SheetClose>
								</li>
							))}
						</ul>
					</section>
				</div>
			</SheetPopup>
		</Sheet>
	);
}
