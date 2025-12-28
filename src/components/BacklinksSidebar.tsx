import { Link } from "@tanstack/react-router";

interface Backlink {
	slug: string;
	title: string;
}

interface BacklinksSidebarProps {
	backlinks: Backlink[];
	basePath: string;
}

export function BacklinksSidebar({
	backlinks,
	basePath,
}: BacklinksSidebarProps) {
	if (backlinks.length === 0) {
		return (
			<aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto border-border border-l pl-4 xl:block">
				<div className="py-6">
					<h2 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
						Links to this note
					</h2>
					<p className="text-muted-foreground text-sm">No backlinks yet</p>
				</div>
			</aside>
		);
	}

	return (
		<aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto border-border border-l pl-4 xl:block">
			<nav className="py-6">
				<h2 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
					Links to this note
				</h2>
				<ul className="space-y-1">
					{backlinks.map((link) => (
						<li key={link.slug}>
							<Link
								className="block truncate rounded-md px-2 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
								to={`${basePath}/${link.slug}`}
							>
								{link.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
