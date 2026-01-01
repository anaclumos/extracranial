---
lang: 'en'
slug: '/E412DA'
---

$r = 1$

$X = \text{\# of trials until the 1st success}$

$x \in \mathbb{Z}^{+}$

$P = \text{Probability of Success}$

[[Probability]]

## $P(X=x)$

$P(X=x) = (1-p)^{x-1} p$

Where $(1-p)^{x-1}$ is the $x-1$ trials that failed and $p$ is the $x^{th}$ trial that succeeded. Then,

## $P(X>x)$

$P(X>x) = \sum\limits_{j=x+1}^{\infty} P(x=j) = \sum\limits_{j=x+1}^{\infty} (1-p)^{x-1} p$

Define $q=1-p$

Then

$=\sum\limits_{j=x+1}^{\infty} q^{j-1} p = {p \over q}\sum\limits_{j=x+1}^{\infty} q^{j} = {p \over q} {q^{x+1} \over {1-q}} = q^x$

## $P(X \leq x)$

$P(X \leq x) = 1 - P(X>x) = 1-q^x$

$$
\sum\limits_{x=1}^{\infty} (1-p)^{x-1} p = {p \over {1-p}} \sum\limits_{x=1}^{\infty} (1-p)^x = 1
$$
