---
lang: 'ko'
slug: '/954D00'
---

## Essay 1 — What I am building

I am building Coscientist (Coscientist.app), an always-on AI service for knowledge that stays quiet in your attention while working continuously in the background. The tagline is "Not AGI but close enough." It is a practical promise, not a claim about consciousness. I want something that feels like a dependable colleague for thinking and research, present at any moment, never needy, never theatrical.

Coscientist runs constantly. It indexes, organizes, cross-checks, and prepares. It reads what I write and what I read. It keeps track of my personal essays and the moving edges of science. It drafts maps of what is known, what is merely believed, what is unresolved, and what is contradicted. Then it waits. It does not try to outpace me. It does not turn its preparation into action until I verify. The speed is there, but it is intentionally gated behind human judgment.

That design choice comes from a simple observation: AI makes output cheap, and cheap output can quietly destroy the discipline of knowing. In the AI era, the most dangerous failure is not a single wrong answer. It is the slow shift from verification to endorsement. It is when smoothness becomes authority and the human becomes a rubber stamp. Coscientist is built to prevent that shift by construction.

Inside Coscientist, knowledge is treated as more than text. A statement is not "knowledge" because it is well written or widely repeated. A statement becomes knowledge only when it has a responsibility line: who is asserting it, what evidence supports it, which assumptions it depends on, what scope it applies to, what would falsify it, and what uncertainty remains. When evidence is missing, Coscientist does not hide the gap. It downgrades the statement into a hypothesis and makes the missing steps explicit.

I want this to work across the entire range of knowledge work.

For personal writing, Coscientist becomes a living essay archive that preserves my voice, tracks my evolving definitions, and surfaces tensions across years without rewriting history. It can answer questions about my own thinking while staying anchored to the passages I actually wrote.

For frontier research, Coscientist becomes a ScienceOps workspace. It ingests papers, code, datasets, lab notes, and experiment logs. It turns reading into structured claims with provenance. It proposes experiment plans, ablation matrices, and verification strategies. It connects narrative conclusions to runnable artifacts, so that an argument can be tested, reproduced, and improved instead of simply debated.

The core user experience is calm. Coscientist does not beg for attention. It does not compete with the user's mind by trying to fill every silence. It is available instantly, but it is patient. It keeps doing the background work that humans are bad at doing continuously, then hands the critical moment back to the human: the moment of verification, the moment of committing a claim to "known," the moment of deciding what to do next.

If it works, it will feel like a quiet acceleration of life. More clarity, less thrash. Faster learning, less hallucinated confidence. Faster research, more reproducibility. Always working, never intrusive, never pretending that thinking can be outsourced.

## Essay 2 — What I have built previously

My work has been a single thread: building infrastructure that lets thinking and research compound, instead of dissolving into scattered documents and unrepeatable effort.

I began from a personal place. While studying computer science at USC, I met many people with extraordinary potential. The density of talent was not the problem. The gap was the translation from potential into durable output. Even when the ideas were good, turning them into something implemented, verified, and shared felt slower than it needed to be. That gap stayed with me.

I built my own knowledge workspace as a way to understand the problem from the inside. I created cho.sh and used it as a living lab for tools for thought. My early writing about "next‑gen digital brains" focused on reducing friction so I could write more and connect ideas without turning my life into manual knowledge gardening. That phase taught me how much cognitive work is lost to overhead, and how quickly a system collapses when the process is too heavy for daily use.

Then I watched the world change. As generative AI became mainstream, writing became cheap. The bottleneck shifted from producing text to preserving integrity. I developed a more defensive and structured view: the risk is not that knowledge is missing, but that responsibility lines disappear, errors become self-reinforcing, and the human slips into "approval mode." That led to my later work on "은하대백과," including protocols aimed at preventing an "encyclopedia meltdown," where AI-driven content and internal link authority compound into a corpus that looks coherent but cannot be trusted.

In parallel, I worked in machine learning and production engineering, and that is where the operational dimension became unavoidable. I started studying medical AI in 2021 and researched vertical federated learning during my master's program, focusing on ways to train across distributed data without moving it, which is essential in clinical settings where privacy and institutional boundaries are real constraints. That work forced me to respect practical reality: what matters is not a clean paper result but a system that behaves under messy, limited, regulated conditions.

I also worked as a software engineering intern in environments where CI/CD, automation, and reliable deployment are basic hygiene. The contrast with typical ML practice was striking. ML pipelines often rely on manual coordination across preprocessing, experiments, evaluation, and deployment. That mismatch became concrete for me at Lunit, where I designed and built an AI‑Ops system. The lesson was direct: research velocity and model quality are limited by operational infrastructure as much as by clever algorithms.

From there, the concept of ScienceOps became inevitable. I began writing and sketching systems that treat research more like software: reproducible experiments as first-class artifacts, papers as dependency-managed packages, and scientific work as something that can be executed, verified, and iterated through a disciplined pipeline.

Coscientist is the synthesis of that entire path. It takes the personal tools-for-thought lineage seriously, but it also takes the operational and reproducibility gap seriously. It is built from the belief that the fastest way to improve the world is to improve the infrastructure that lets many people test ideas quickly, correctly, and repeatedly.

## Essay 3 — What I hope to gain from OpenAI Grove

Coscientist is being designed around a specific standard: always working, verification-first, provenance-respecting, and calm in the user's attention. Achieving that standard requires not only product design, but model behavior that is stable under long-context, tool-using, evidence-bound workflows.

From OpenAI Grove, I want a tighter loop with the people and the platform that can make those behaviors real.

First, I want to build "structured epistemics" on top of strong models. The tasks that matter most for Coscientist are not generic conversation. They are claim extraction without distortion, faithful binding to evidence spans, disciplined uncertainty expression, rebuttal and undercut search that is not performative, and refusal to turn consensus into authority. These are subtle behaviors that need careful evaluation and iteration.

Second, I want to build an evaluation culture around those behaviors. It is easy to ship a system that feels smart. It is hard to ship a system that remains trustworthy as it scales across personal memory, team knowledge, and scientific research. Grove can help accelerate the creation of test harnesses, failure-mode discovery, and measurement of whether the system is genuinely improving verification rather than merely improving persuasion.

Third, I want reliability guidance for an always-on product. Coscientist runs continuously in the background and waits for the human at the moment of verification. That means the system must be dependable across time: predictable degradation when sources are missing, stable formatting for audit trails, and consistent behavior when operating over large corpora.

Finally, I want alignment on a shared direction: accelerating science and engineering without eroding human judgment. I am building toward ScienceOps as a practical substrate for faster, more reproducible innovation. Grove is meaningful to me because it can reduce the time between an idea and a trustworthy, repeatable result.

## Essay 4 — Anything else you should know

I am not trying to build an AI that wins attention. I am trying to build an AI that deserves trust.

Coscientist is always on, but it is not attention-seeking. It works continuously, then waits. It does not push itself into a user's day. It does not treat engagement as the objective. It does not mistake activity for progress. The system's job is to prepare clarity and verification paths so the human can decide.

I care about responsibility lines because I have watched how easily they disappear. In software, we learned to demand version control, reproducible builds, and deployment logs because "it works on my machine" is not acceptable. In research and knowledge work, we still accept equivalent failures every day. We accept conclusions detached from evidence. We accept citations that cannot be re-run. We accept summaries that sound correct but cannot be audited. In the AI era, those weaknesses become existential because the volume of plausible text explodes.

I also care about culture, not just features. A tool can be perfectly designed and still fail if people use it as an excuse to stop thinking. Coscientist is built to resist that failure by making verification the central act and by refusing to treat fluency as authority. The system is meant to strengthen the habits that make people formidable: definition discipline, scope control, explicit uncertainty, and the ability to search for what would break an idea.

My long horizon is not to be the person who invents everything. It is closer to the Medici role: building environments where exceptional people can run more experiments, take more shots, and share more reproducible results. The world is not short on intelligence. It is short on infrastructure that lets intelligence compound.
