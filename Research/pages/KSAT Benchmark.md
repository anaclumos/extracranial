---
lang: 'en'
slug: '/C72FA0'
---

Let $t$ be a real number. Define the function $f(x)$ by

$$
f(x) =
\begin{cases}
1 - |x - t|, & \text{if } |x - t| \le 1,\\
0, & \text{if } |x - t| > 1.
\end{cases}
$$

For some odd integer $k$, define

$$
g(t) = \int_{k}^{k + 8} f(x)\,\cos(\pi x)\,dx.
$$

Suppose $g(t)$ has a local minimum at $t = \alpha$ with $g(\alpha) < 0$.

List all such $\alpha$ in increasing order as $\alpha_1, \alpha_2, \dots, \alpha_m$ (where $m$ is a positive integer), and assume

$$
\sum_{i=1}^m \alpha_i = 45.
$$

Find the value of

$$
k - \pi^2 \sum_{i=1}^m g(\alpha_i).
$$
