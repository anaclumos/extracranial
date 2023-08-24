---
lang: 'en'
slug: '/A796F1'
aliases: ['information density']
---

> In information theory, the entropy of a random variable is the average level of "information", "surprise", or "uncertainty" inherent to the variable's possible outcomes. Given a discrete random variable $X$, which takes values in the alphabet $\mathcal{X}$ and is distributed according to $p: \mathcal{X}\to[0, 1]$:
>
> $E(X) := -\sum\limits_{x \in \mathcal{X}} p(x) \log p(x) = \mathbb{E}[-\log p(X)] ,$
>
> [Entropy (information theory)](<https://en.wikipedia.org/wiki/Entropy_(information_theory)>)

If $P = 0$, the code will be all zero.

What information can we send to the friend? Very little. The Entropy $H$ is very low, and the information $I$ is also very low.

If $P = 1$, the code will be all one—also very low $H$ and $I$.

$$
H(x) -\sum\limits_{x \in \mathcal{X}} p(x) \ln p(x)
$$

The joint entropy of random variable $X$ and $Y$ will be

$$
H(x, y) = -\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}} p(x, y) \ln p(x, y)
$$

- Log base-2 for computer science.
- Log base-$e$ for Physics and Mathematics.

The conditional entropy is also similar.

$$
H(y|x) = -\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}} p(x, y) \ln p(y|x)
$$

Then we can calculate the mutual information:

$$
I(x, y) = -\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}} p(x, y) \ln{p(x, y) \over {p(x) p(y)}}
$$

This is closer to the KL distance between p and q: $KL(p || q)$

> How close are $X$ and $Y$ being independent? If the mutual information is small, then they are almost independent.

Also, $I(X,Y) = H(Y) - H(Y|X)$
