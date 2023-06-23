---
lang: 'en'
slug: '/60C374'
---

- Expectation of the Sample Mean: $\mathbb{E}[\overline{X^n}]$
- [[Variance]] of the Sample Mean: $\mathbb{V}[\overline{X^n}]$

**Sample Mean** $\hat{\theta}_n$ is converging to **Population Mean** $\theta$: $\lim\limits_{n \to \infty} \mathbb{E}[(\hat{\theta}_n - \theta)^2] = 0$

$\lim\limits_{n \to \infty} \mathbb{V}[\hat{\theta}_n] + (\mathbb{E}[\hat{\theta}_n] - \theta)^2) = 0$

$\lim\limits_{n\to\infty} {\sigma_x^2 \over n} + (\mu_x - \mu_x)^2 = 0$

$\hat{\theta}_n \to \theta$

$\forall \epsilon > 0$, $\lim\limits_{n \to \infty} P(|\hat{\theta}_n - \theta)| > \epsilon) = 0$

$\lim\limits_{n \to \infty} P(|\overline{x_n} - \mu_x| > \epsilon) \leq \lim\limits_{n \to \infty} {\sigma_x^2 \over {n \epsilon^2}}$

### MI

$x \geq 0, c \in \mathbb{R}^+, \mathbb{E}[X] < \infty$

$P(X) \geq C) \leq {\mathbb{E}[X] \over C}$

### CI

$\sigma_x^2 < \infty$

$P(|x - \mu_x| > \epsilon) \leq {\sigma_x^2 \over \epsilon^2}$
