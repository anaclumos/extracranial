---
lang: 'en'
slug: '{{hex}}'
---

$$
b(n,~p) \xrightarrow{d} P(\lambda) ~ \text{if} ~ n \gg 1 ~ \& ~ p \ll 1 ~ \& ~ \lambda = np
$$

## Proof

$$
\lim_{n \to \infty} b(n, ~p) = \lim_{n \to \infty} {n \choose x} p^x (1-p) ^{n-x} = \lim_{n \to \infty} {n! \over {(n-x)! ~ x!}} p^x (1-p) ^{n-x}
$$

$$
= \lim_{n \to \infty} {n! \over {x! (n-x)!}} {\lambda^x \over n^x} (1-{\lambda \over n})^{n-x} = {\lambda^x \over x!} \lim_{n \to \infty} {n! \over {(n-x)!}} {1 \over n^x} (1- {\lambda \over n})^{n-x}
$$

$$
= {\lambda^x \over x!} \lim_{n \to \infty} {n \over n} {{n-1} \over n} {{n-2} \over n} \cdots {{n-x+1} \over n} (1 - {\lambda \over n})^n (1 - {\lambda \over n})^{-x}
$$

$$
= {\lambda^x \over x!} \lim_{n \to \infty} 1 \cdot  \lim_{n \to \infty} {{n-1} \over n} \cdots  \lim_{n \to \infty} {{n-x+1} \over n} \lim_{n \to \infty} ({1- {\lambda \over n}})^n  \lim_{n \to \infty} ({1- {\lambda \over n}})^{-x}
$$

$$
= {\lambda^x \over x!} \lim_{n \to \infty} (1+ {-\lambda \over n})^n = {{\lambda^x e^{-\lambda}} \over x!}
$$