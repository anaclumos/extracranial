---
lang: 'ko'
slug: '/E74A5B'
---

- 과거 관찰로 현재의 연속적인 변수(Variable)를 추출하는 것. 예) 가격
- 이것이 선형 관계라면 선형 회귀 (Linear Regression)
- 전체 오류( $(\texttt{prediction}-\texttt{reality})^2$)를 최소화하는 함수/변수를 찾자
- 입력 $x \in \mathbb{R}^D$ (Features, Covariates, Contexts, Predictors, etc)
- 출력 $y \in \mathbb{R}$ (Responses, Targets, Outcomes, etc)
- $f: \mathbb{R}^D \to \mathbb{R}$ with $f(x) = w_0 + \sum^D_{d=1} w_d x_d = w_0 + w^T x$ (superscript $^T$ stands for transpose)
- i.e., hyperplane, parameterized by $w = [w_1 w_2 \cdots w_D]^T$ (weights, weight vector, parameter vector, etc)
- bias $w_0$
