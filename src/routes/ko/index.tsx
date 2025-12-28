import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Brain, PenLine } from "lucide-react";

export const Route = createFileRoute("/ko/")({ component: KoreanHomePage });

function KoreanHomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="relative overflow-hidden px-6 py-24 text-center">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
				<div className="relative mx-auto max-w-4xl">
					<div className="mb-8 flex items-center justify-center">
						<Brain className="h-20 w-20 text-cyan-400" />
					</div>

					<h1 className="mb-6 font-black text-5xl text-white tracking-tight md:text-6xl">
						Extracranial
					</h1>

					<p className="mb-4 text-2xl text-gray-300">
						슈퍼브레인을 위한 엑소슈트
					</p>

					<p className="mx-auto mb-12 max-w-2xl text-gray-400 text-lg leading-relaxed">
						개인 위키이자 디지털 정원입니다. 기술, 과학, 그리고 다양한
						아이디어에 대한 연구 노트와 생각을 정리하는 공간입니다.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							className="flex items-center gap-2 rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white shadow-cyan-600/30 shadow-lg transition-all hover:bg-cyan-500 hover:shadow-cyan-500/40"
							to="/ko/r/Welcome"
						>
							<BookOpen size={20} />
							읽기 시작하기
						</Link>
						<Link
							className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-8 py-3 font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 hover:text-white"
							to="/r/Welcome"
						>
							Read in English
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-6 py-16">
				<div className="grid gap-8 md:grid-cols-2">
					<Link
						className="group rounded-xl border border-slate-700 bg-slate-800/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/50"
						to="/ko/r/Welcome"
					>
						<BookOpen className="mb-4 h-10 w-10 text-cyan-400 transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-white text-xl">연구 노트</h2>
						<p className="text-gray-400 leading-relaxed">
							프로그래밍, 알고리즘, 시스템 설계, 그리고 컴퓨터 과학의 다양한
							탐구에 대한 상호 연결된 노트들입니다.
						</p>
					</Link>

					<Link
						className="group rounded-xl border border-slate-700 bg-slate-800/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/50"
						to="/ko/w/minsapay"
					>
						<PenLine className="mb-4 h-10 w-10 text-cyan-400 transition-transform group-hover:scale-110" />
						<h2 className="mb-3 font-semibold text-white text-xl">블로그</h2>
						<p className="text-gray-400 leading-relaxed">
							장문의 글, 프로젝트 회고, 그리고 흥미로운 문제와 해결책에 대한
							깊은 탐구입니다.
						</p>
					</Link>
				</div>
			</section>
		</div>
	);
}
