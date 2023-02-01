---
lang: 'en'
slug: '/5CFA0D'
---

In [[Probability]],

## $1$ trial

- 2 possible outcomes,
- 1 trial

$$
P(X=x) = P^x (1-P)^{1-x}
$$

where $X$ is the number of heads and $x \in \{0, ~1\}$. $P$ is the probability of success.

## Bernoulli Trials

- Independent. $P(A_1 \cap A_2 \cap A_3 \cap \cdots \cap A_n) = \prod\limits_{k=1}^n P(A_k)$
- Stationary. Same $P$.

## $n$ trials

- 2 possible outcomes,
- $n$ trial

$$
P(X=x) = {n \choose x} P^x (1-P)^{1-x}
$$

## Things to consider

- Number of Outcomes. Two or More?
- With or Without Replacement?

| Strategies        | With Replacement | Without Replacement         |
| ----------------- | ---------------- | --------------------------- |
| $2$ outcomes      | Binomial         | Hypergeometric              |
| $\geq 3$ outcomes | Multinomial      | Multivariate hypergeometric |

## Multinomial

$k$- outcomes

$N_1$ = # of item 1
$N_2$ = # of item 2
$N_3$ = # of item 3
$N_4$ = # of item 4

...

$N_k$ = # of item $k$

$$
N = N_1 + N_2 + N_3 + \cdots + N_k
$$

$$
n = x_1 + x_2 + x_3 + \cdots + x_k
$$

$$
P_1 = \text{Probability}(\text{Item 1})
$$

$$
P_k = \text{Probability}(\text{Item k})
$$

$$
P_1 + P_2 + P_3 + \cdots + P_k = 1
$$

$$
P(X_1 = x_1, ~ X_2 = x_2, \cdots , ~X_k=x_k) = {n! \over {x_1!~x_2!~x_3!~\cdots~x_k!}} P_1^{x_1} P_2^{x_2} \cdots P_k ^{x_k}
$$

$$
P(X_1 = x_1, ~ X_2 = x_2, \cdots , ~X_k=x_k) = {{{N_1 \choose x_1} {N_2 \choose x_2} \cdots {N_k \choose x_k}} \over {N \choose n}}
$$
