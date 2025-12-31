import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

interface Props {
	children?: React.ReactNode;
}

export function Header({ children }: Props) {
	return (
		<header className="sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
			<div className="flex h-16 items-center gap-2 px-4">
				{children}
				<Link className="font-bold text-xl tracking-tight" href="/">
					Extracranial
				</Link>
				<div className="flex-1" />
				<LanguageSwitcher />
			</div>
		</header>
	);
}
