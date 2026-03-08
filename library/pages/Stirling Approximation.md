---
lang: 'en'
slug: '/BC8DA5'
---

## Example

$$
b(n, ~2n, ~p) \approx {(4pq) \over \sqrt{\pi n}}
$$

where $n$ is the number of heads, $2n$ is the number of trials, and $p$ is the [[probability]] of success.

$$
b(n, ~2n, ~p) = {2n \choose n} p^n (1-p)^{2n-n}
$$

$$
= {(2n)! \over {n!n!}} p^n q^n
$$

By Stirling's approximation,

$$
\approx {{\sqrt{2\pi ~ 2n} ~ {2n}^{2n} ~ e^{-2n} ~ p^n ~ q^n} \over {\sqrt{2 \pi n} ~ n^n ~ e^{-n}}}
$$

Cleaning up,

$$
= {(4pq) \over \sqrt{\pi n}} ~~~~~~~~~~ \blacksquare
$$
