import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

const KO_PREFIX_REGEX = /^\/ko/;

export default function Header() {
	const location = useLocation();
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
		<header className="border-slate-800 border-b bg-slate-900">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
				<div className="flex items-center gap-8">
					<Link
						className="font-bold text-white text-xl tracking-tight transition-colors hover:text-cyan-400"
						to="/"
					>
						Extracranial
					</Link>

					<nav className="hidden items-center gap-1 sm:flex">
						<Link
							activeOptions={{ exact: false }}
							activeProps={{ className: "bg-slate-800 text-cyan-400" }}
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 text-sm transition-colors hover:bg-slate-800 hover:text-white"
							to={isKorean ? "/ko/r/000000" : "/r/000000"}
						>
							<BookOpen size={16} />
							<span>{isKorean ? "연구노트" : "Research"}</span>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1 rounded-lg bg-slate-800 p-1">
						<Link
							className={`rounded px-2 py-1 text-sm transition-colors ${
								isKorean
									? "text-slate-400 hover:text-white"
									: "bg-cyan-600 text-white"
							}`}
							to={getLocalizedPath("en")}
						>
							EN
						</Link>
						<Link
							className={`rounded px-2 py-1 text-sm transition-colors ${
								isKorean
									? "bg-cyan-600 text-white"
									: "text-slate-400 hover:text-white"
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
