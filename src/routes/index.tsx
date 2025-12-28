import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Brain, PenLine } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			<section className="relative overflow-hidden px-6 py-24 text-center">
				<div className="relative mx-auto max-w-4xl">
					<div className="mb-8 flex items-center justify-center">
						<Brain className="h-20 w-20 text-foreground" />
					</div>

					<h1 className="mb-6 font-black text-5xl text-foreground tracking-tight md:text-6xl">
						Extracranial
					</h1>

					<p className="mb-4 text-2xl text-foreground">
						The Exosuit for Superbrains
					</p>

					<p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground leading-relaxed">
						A personal wiki and digital garden. A place for research notes,
						thoughts, and explorations across technology, science, and ideas.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
							to="/r/000000"
						>
							<BookOpen size={20} />
							Start Reading
						</Link>
						<Link
							className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-accent"
							to="/ko/r/000000"
						>
							한국어로 보기
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-6 py-16">
				<div className="grid gap-8 md:grid-cols-2">
					<Link
						className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:bg-accent"
						to="/r/000000"
					>
						<BookOpen className="mb-4 h-10 w-10 text-foreground transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-card-foreground text-xl">
							Research Notes
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							Interconnected notes on programming, algorithms, systems design,
							and various explorations in computer science.
						</p>
					</Link>

					<Link
						className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:bg-accent"
						to="/w/minsapay"
					>
						<PenLine className="mb-4 h-10 w-10 text-foreground transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-card-foreground text-xl">
							Blog
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							Long-form articles, project retrospectives, and deeper dives into
							interesting problems and solutions.
						</p>
					</Link>
				</div>
			</section>
		</div>
	);
}
