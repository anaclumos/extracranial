import Link from "next/link";

export function Header() {
	return (
		<header className="sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
			<div className="flex h-16 items-center px-4">
				<Link className="font-bold text-xl tracking-tight" href="/">
					Extracranial
				</Link>
			</div>
		</header>
	);
}
