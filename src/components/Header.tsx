import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Moon, PenLine, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const KO_PREFIX_REGEX = /^\/ko/;

export default function Header() {
	const location = useLocation();
	const { theme, toggleTheme } = useTheme();
	const isKorean = location.pathname.startsWith("/ko");
	const currentPath = isKorean
		? location.pathname.replace(KO_PREFIX_REGEX, "") || "/"
		: location.pathname;

	const getLocalizedPath = (lang: "en" | "ko") => {
		if (lang === "ko") {
			return currentPath === "/" ? "/ko" : `/ko${currentPath}`;
		}
		return currentPath;
	};

	return (
		<header className="border-border border-b bg-background">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
				<div className="flex items-center gap-8">
					<Link
						className="font-bold text-foreground text-xl tracking-tight transition-colors hover:text-muted-foreground"
						to="/"
					>
						Extracranial
					</Link>

					<nav className="hidden items-center gap-1 sm:flex">
						<Link
							activeOptions={{ exact: false }}
							activeProps={{ className: "bg-secondary text-foreground" }}
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-secondary hover:text-foreground"
							to={isKorean ? "/ko/r/000000" : "/r/000000"}
						>
							<BookOpen size={16} />
							<span>{isKorean ? "연구노트" : "Research"}</span>
						</Link>
						<Link
							activeOptions={{ exact: false }}
							activeProps={{ className: "bg-secondary text-foreground" }}
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-secondary hover:text-foreground"
							to={isKorean ? "/ko/w/minsapay" : "/w/minsapay"}
						>
							<PenLine size={16} />
							<span>{isKorean ? "블로그" : "Blog"}</span>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<button
						aria-label="Toggle theme"
						className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
						onClick={toggleTheme}
						type="button"
					>
						{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
					</button>

					<div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
						<Link
							className={`rounded px-2 py-1 text-sm transition-colors ${
								isKorean
									? "text-muted-foreground hover:text-foreground"
									: "bg-primary text-primary-foreground"
							}`}
							to={getLocalizedPath("en")}
						>
							EN
						</Link>
						<Link
							className={`rounded px-2 py-1 text-sm transition-colors ${
								isKorean
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							to={getLocalizedPath("ko")}
						>
							KO
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
