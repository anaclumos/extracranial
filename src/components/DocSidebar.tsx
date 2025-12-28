import { Link } from "@tanstack/react-router";

interface DocMeta {
	slug: string;
	title: string;
	lastModified: number;
}

interface DocSidebarProps {
	docs: DocMeta[];
	currentSlug: string;
	basePath: string;
}

export function DocSidebar({ docs, currentSlug, basePath }: DocSidebarProps) {
	return (
		<aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto border-border border-r pr-4 lg:block">
			<nav className="py-6">
				<h2 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
					Recent Notes
				</h2>
				<ul className="space-y-1">
					{docs.map((doc) => (
						<li key={doc.slug}>
							<Link
								className={`block truncate rounded-md px-2 py-1.5 text-sm transition-colors ${
									doc.slug === currentSlug
										? "bg-accent font-medium text-accent-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
								}`}
								to={`${basePath}/${doc.slug}`}
							>
								{doc.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
