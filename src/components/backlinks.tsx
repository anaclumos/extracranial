import { LinkIcon } from "lucide-react";
import Link from "next/link";
import type { Backlink } from "@/lib/backlinks";

interface Props {
	backlinks: Backlink[];
	locale: "en" | "ko";
}

export function Backlinks({ backlinks, locale }: Props) {
	if (backlinks.length === 0) {
		return null;
	}

	const prefix = locale === "en" ? "" : `/${locale}`;

	return (
		<section>
			<h2 className="mb-4 flex items-center gap-2 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
				<LinkIcon className="size-4" />
				{locale === "ko" ? "이 문서를 링크한 글" : "Links to this note"}
				<span className="text-xs">({backlinks.length})</span>
			</h2>
			<ul className="space-y-4">
				{backlinks.map((backlink) => (
					<li key={backlink.sourceSlug}>
						<Link
							className="group block"
							href={`${prefix}/${backlink.type === "blog" ? "w" : "r"}/${backlink.sourceSlug.toLowerCase()}`}
						>
							<span className="font-medium text-foreground group-hover:text-primary group-hover:underline">
								{backlink.sourceTitle}
							</span>
							<p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
								{backlink.excerpt}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
