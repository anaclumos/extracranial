import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Brain, PenLine } from "lucide-react";

export const Route = createFileRoute("/ko/")({ component: KoreanHomePage });

function KoreanHomePage() {
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
						슈퍼브레인을 위한 엑소슈트
					</p>

					<p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground leading-relaxed">
						개인 위키이자 디지털 정원입니다. 기술, 과학, 그리고 다양한
						아이디어에 대한 연구 노트와 생각을 정리하는 공간입니다.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
							to="/ko/r/000000"
						>
							<BookOpen size={20} />
							읽기 시작하기
						</Link>
						<Link
							className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-accent"
							to="/r/000000"
						>
							Read in English
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-6 py-16">
				<div className="grid gap-8 md:grid-cols-2">
					<Link
						className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:bg-accent"
						to="/ko/r/000000"
					>
						<BookOpen className="mb-4 h-10 w-10 text-foreground transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-card-foreground text-xl">
							연구 노트
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							프로그래밍, 알고리즘, 시스템 설계, 그리고 컴퓨터 과학의 다양한
							탐구에 대한 상호 연결된 노트들입니다.
						</p>
					</Link>

					<Link
						className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:bg-accent"
						to="/ko/w"
					>
						<PenLine className="mb-4 h-10 w-10 text-foreground transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-card-foreground text-xl">
							블로그
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							장문의 글, 프로젝트 회고, 그리고 흥미로운 문제와 해결책에 대한
							깊은 탐구입니다.
						</p>
					</Link>
				</div>
			</section>
		</div>
	);
}
