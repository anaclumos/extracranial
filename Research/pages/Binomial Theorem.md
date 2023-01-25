---
lang: 'en'
slug: '/B9D8EC'
---

In [[Probability]],

$$
(p+q)^n = \sum\limits_{k=0}^n {n \choose k} p^k q^{n-k}
$$

## Proof

### Base case

Let $n=1$. Then

$$
\sum\limits_{k=0}^1 {1 \choose k }p^k q^{n-k} = {1 \choose 0} p^0 q^1 + {1 \choose 1} p^1 q^0
$$

### Induction Hypothesis

Assume that $(p+q)^m = \sum\limits_{k=0}^m {1 \choose m }p^k q^{m-k}$. Let $n = m+1$. Then

$$
(p+q)^{m+1} = (p+q) (p+q)^m = (p+q) \sum\limits_{k=0}^m {1 \choose m }p^k q^{m-k}
$$

$$
p \sum\limits_{k=0}^m {m \choose k}p^k q^{m-k} + q \sum\limits_{k=0}^m {m \choose k}p^k q^{m-k}
$$

$$
\sum\limits_{k=0}^m {m \choose k}p^{k+1} q^{m-k} + \sum\limits_{k=0}^m {m \choose k}p^k q^{m-k+1}
$$

Let $j+$

$$
\sum\limits_{j=1}^m {m \choose k}p^{k+1} q^{m-k} + \sum\limits_{k=0}^m {m \choose k}p^k q^{m-k+1}
$$
