---
lang: 'en'
slug: '/4733B8'
---

Suppose

- Total Users: $n$
- Each has a probability of $p$ being active

The probability that exactly $k$ users are present is:

$$
\binom{n}{k} \times (1-p) ^ {n-k}  \times p^k
$$

For example, for a population of 35 independent users, each with a probability 0.1 of being present, the likelihood that > 10 users are current is:

$$
\sum_{k=10}^{n=35} \binom{n}{k} \times (1-p) ^ {n-k}  \times p^k
$$

<head>
  <html lang="en-US"/>
</head>
