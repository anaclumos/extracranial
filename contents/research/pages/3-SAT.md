---
lang: 'en'
slug: '/DCB869'
---

TODO: USE FUMADOCS I18N

<div lang='en-US'>

The 3-SAT (3-Satisfiability) problem is a classic problem in computer science, particularly in the field of computational complexity theory. It's a specific type of Boolean satisfiability problem (SAT), which is foundational in the study of algorithmic logic and has significant implications in various areas like cryptography, artificial intelligence, and algorithm design.

1. **Boolean Variables** -- The problem involves a set of Boolean variables. Each variable can take on one of two values: true or false.

2. **Clauses** -- The heart of the problem lies in a series of clauses. Each clause is a disjunction (logical OR) of exactly three literals. A literal is either a variable or its negation. For example, a clause might be $(x \lor \neg y \lor z)$, where $x, y,$ and $z$ are Boolean variables, and $\neg y$ represents the negation of $y$.

3. **Satisfiability** -- The question posed by the 3-SAT problem is whether there exists an assignment of values to the variables that makes the entire Boolean expression true. In other words, can we assign true/false values to each variable in such a way that every clause has at least one true literal?

4. **NP-Completeness** -- The 3-SAT problem is famously known for being NP-complete, which means two things:
   - It's in NP (nondeterministic polynomial time), meaning that if a solution exists, it can be verified quickly (in polynomial time).
   - Every problem in NP can be reduced to it in polynomial time. This makes 3-SAT a central problem in complexity theory, as finding a polynomial-time algorithm for it (if one exists) would imply P = NP, solving a major open question in computer science.

The importance of 3-SAT and other SAT problems lies in their applicability to real-world scenarios where complex decision-making is required. They are used in various domains like electronic design automation, model checking, software verification, scheduling, and more. The challenge in solving these problems efficiently has driven much of the research in algorithm development and complexity theory.

</div>

<div lang='ko-KR'>

3-SAT(3-만족가능성) 문제는 컴퓨터 과학, 특히 계산 복잡성 이론 분야에서의 고전적인 문제이다. 이는 Boolean 만족 가능성 문제(SAT)의 특정 유형으로, 알고리즘 논리 연구와 암호학, 인공지능, 알고리즘 설계와 같은 다양한 분야에서 중요한 의미를 가지고 있다.

1. **Boolean 변수** -- 이 문제에는 Boolean 변수들의 집합이 포함된다. 각 변수는 참 또는 거짓, 두 가지 값 중 하나를 가질 수 있다.

2. **Clause** -- 문제의 핵심은 여러 Clause들에 있다. 각 Clause은 정확히 세 개의 리터럴의 논리합(또는 연산)이다. 리터럴은 변수 또는 그 부정이다. 예를 들어, 하나의 Clause은 $(x \lor \neg y \lor z)$일 수 있는데, 여기서 $x, y,$ 그리고 $z$는 Boolean 변수이며, $\neg y$는 $y$의 부정을 나타낸다.

3. **만족 가능성** -- 3-SAT 문제에서 제기되는 질문은 변수에 값을 할당하여 전체 Boolean 표현식을 참으로 만들 수 있는지의 여부이다. 즉, 각 변수에 참/거짓 값을 할당하여 모든 Clause에 적어도 하나의 참 리터럴이 있게 할 수 있는가?

4. **NP-완전성** -- 3-SAT 문제는 NP-완전이라고 유명하며, 이는 두 가지를 의미한다:
   - NP(비결정적 다항 시간)에 속한다는 것, 즉 해결책이 존재한다면 빠르게(다항 시간 안에) 확인될 수 있다.
   - NP에 속하는 모든 문제가 다항 시간 안에 이 문제로 환원될 수 있다는 것이다. 이는 3-SAT에 대한 다항 시간 알고리즘을 찾는 것(만약 존재한다면)이 컴퓨터 과학에서 주요한 미해결 질문인 P = NP를 해결할 수 있음을 의미한다.

3-SAT 및 기타 SAT 문제들의 중요성은 복잡한 의사결정이 필요한 실제 시나리오에 적용될 수 있기 때문이다. 이들은 전자 설계 자동화, 모델 체킹, 소프트웨어 검증, 스케줄링 등 다양한 분야에서 사용되며, 이러한 문제들을 효율적으로 해결하는 도전은 알고리즘 개발과 복잡성 이론 연구를 크게 촉진시켰다.

</div>
