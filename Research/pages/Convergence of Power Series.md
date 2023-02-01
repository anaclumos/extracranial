---
lang: 'en'
slug: '/904550'
---

In [[Probability]],

$$
\sum\limits_{j=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots
$$

Find the reason for convergence (RFC) with respect to $x$

- Ratio Test
- Test the boundaries

$$
e^x = \sum\limits_{n=0}^{\infty} {x^n \over{n!}}
$$

give $a_n = {x^n \over n!}$

$$
L \equiv \lim_{n \to \infty} |{x^{n+1} \over {(n+1)!}} \times {n! \over x^n}|
$$

$$
= \lim_{n \to \infty} |{x \over {n+1}}| = |x| \lim_{n \to \infty} |{1 \over {n+1}}| = |x| \times 0 = 0 < 1
$$
