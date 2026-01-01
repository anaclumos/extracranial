---
lang: 'en'
slug: '/BA45A9'
---

## Logic Table

$P \& Q \rightarrow P$

$P \rightarrow P \vee Q$

$\sim (P \vee Q) \leftrightarrow \sim P \& \sim Q$

$\sim (P \& Q) \leftrightarrow \sim P \vee \sim Q$

## Set Theory

$x \in A \subset \Omega$

$A^C = \{x \in \Omega, ~ x \notin A \}$

$A \cup B = \{x \in \Omega, ~ x \in A \vee ~ x \in B\}$

$A \cap B = \{x \in \Omega, ~ x \in A \& ~ x \in B\}$

$A \subset B \leftrightarrow \forall x \in A, x \in B$

$A = B \leftrightarrow A \subset B, B \subset A$

$A - B = A \cap B^C$

$A \cap B \subset A \subset A \cup B$

## De Morgan's Law

${(A \cup B)}^C = A^C \cap B^C$

${(A \cap B)}^C = A^C \cup B^C$

## Probability

$x \in A \subset \Omega \in \alpha \subset 2^{\Omega}$

$\alpha$ is Sigma Alpha if and only if it is CUT

$(\Omega, \alpha)$ is the measurable space.

$P$, $\alpha \rightarrow [0, 1]$ and CA (Countably Additive)

$P(\cup_{k=1}^{\infty} A_k) = \sum\limits_{k=1}^{\infty}P(A_k)$ if $A_1 \cap A_j = \emptyset, \forall i \neq j, P(\Omega) = 1$

$(P, \alpha, \Omega)$ is the probability space.

$A$ and $B$ are mutually exclusive.

$A \cap B = \emptyset$

$A$ and $B$ are independent

$P(A \cap B) = P(A) P(B)$

$P (A \cup B) = P (A) + P(B) - P (A \cap B)$

## Multiplication Theorem

$P (\cap_{k=1}^{n} A_k) = P(A_1) P(A_2 | A_1) \cdots P(A_n | A_1 \cap A_2 \cdots A_{n-1})$

if independent

$P (\cap_{k=1}^{n} A_k) = \prod\limits_{k=1}^n (A_k)$

$P(A|B) = {P(A \cap B) \over P(B)} {=^{\text{ind}}} P(A)$

## Partition

${H_k}$ is a partition means

$H_1 \cap H_j = \emptyset, \forall i \neq j$

$\cup_{k=1}^{n} A_k = \Omega$

## Total Probability

$P(E) = \sum\limits_k P(H_k) P(E | H_k)$

## Bayes' Theorem

If ${H_k}$ partitions $\Omega$ then

$P(H_j | E) = {{P(E|H_k) P(H_k)} \over {\sum\limits_{j} P(E|H_j) P(H_j)}}$

## Binomial Theorem

$(p + q)^n = \sum\limits_{k=0}^n {n \choose k} p^k q^{n-k}$

$\sum\limits_{j=1}^{\infty} a^j = {a \over {1-a}}, |a| < 1$

$S_N = \sum\limits_{j=1}^N a^j$

$S_N = a + a^2 + \cdots + a^N$ — ①

$aS_N = a^2 + \cdots a^{N+1}$ — ②

If we subtract ② from ①, we get

$S_N = {{a - a^{n+1}} \over {1-a}}$

$\sum\limits_{k=1}^{\infty} k a^k = {a \over (1-a)^2}$

$\lim\limits_{n \to \infty} ({1 + x \over n})^n = e^x$

| Number of Outcomes | With Replacement                                     | Without Replacements        |
| ------------------ | ---------------------------------------------------- | --------------------------- |
| 2                  | Binomial (different when $\text{until}^\text{*}$...) | Hypergeometric              |
| $\geq$ 3           | Multinomial                                          | Multivariate Hypergeometric |

## $\text{until}^\text{*}$

- $1^{\text{st}}$ success → geometric
- $r^{\text{th}}$ success → negative binomial

## Poisson Distribution

$P (\lambda) = {{e^{-\lambda} \lambda^x} \over x!}$

$b \rightarrow^d p$ if $n >> 1$, $p << 1$ and $\lambda = np$

## Continuous

If $X \sim N(0,1)$, then $\mathbb{Z} = X^2 \sim \mathcal{X}^2(1)$

Beta($\alpha$, $\beta$) $0 < x < 1$

Uniform ($\alpha$, $\beta$) $a < x < b$

Gamma $\gamma(\alpha, \beta)$

$f(x) = {x^{\alpha - 1} \over \Gamma(\alpha) \theta^\alpha} e^{-x \over \theta}$

Exponential($\theta$) = $\gamma(\alpha = 1, theta)$

Chi-squared($\gamma$) = $\gamma(\alpha = {\gamma \over 2}, \theta = 2)$

$\mathcal{X} \sim N(\mu, \sigma_x^2)$ → ${1 \over \sqrt{2 \pi} \sigma} e^{-{(x-\mu)^2} \over {2\sigma_x^2}}$

$Y=g(x)$

$f_y(y) = \sum\limits_{x_k} f_x(x_k) |{dx \over dy}|_{\text{@} x = x_k}$

## Moments

$\mathbb{E}[aX+b] = a\mathbb{E}[X] + b$

$\mathbb{V}[aX+b] = a^2 \mathbb{V}{X}$

$X \sim \gamma(\alpha, \theta)$, $\mathbb{E}[X^k] = {\Gamma(\alpha+k) \over \Gamma(\alpha)} \theta^k$

$\Gamma(\alpha+1) = \alpha \Gamma(\alpha)$, $\Gamma(1) = 1,~\Gamma({1 \over 2}) = \sqrt{\pi}$

## Uncertainty Principle

$\sigma_{xy}^2 \leq \sigma_{x}^2 \sigma_{y}^2$

## Covariance

$\sigma_xy = \mathbb{E}[XY] - \mathbb{E}[X] \mathbb{E}[Y]$ where $\mathbb{E}[XY]$ is the correlation.

$\rho_{xy} = {\sigma_{xy} \over {\sigma_x \sigma_y}}$ $-1 \leq \rho_{xy} \leq 1$

## Weak Law of Large Number

- Expectation of the Sample Mean: $\mathbb{E}[\overline{X^n}]$
- Variance of the Sample Mean: $\mathbb{V}[\overline{X^n}]$

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

## Standardizing RV

Subtract the mean and divide by the standard deviation

## Beta Binomial Conjugacy

Prior $h(\sigma) \sim \text{Beta}(\alpha, \beta)$

Likelihood $g(x|\theta) \sim \text{Binomial}(n, x, \theta)$

Posterior

$f(\theta | x) = {{g(x | \theta) h(\theta)} \over {\int\limits_{\theta} g(x|\theta) h(\theta) d \theta}}$

$\therefore f(\theta | x) \sim \text{Beta}(\alpha + x,~\beta + n - x)$

## Maximum Likelihood Estimation

$f(\mathbb{D} | \theta)$

$\hat{\theta}_\text{ML} = \text{argmax}_{\theta} g(x|\theta) = \text{argmax}_{\theta} \ln g(x | \theta)$

$\hat{\theta}_\text{ML} = \text{argmax}_{\theta} g(x_1,~x_2,~\cdots,~x_n | \theta)$
$= \text{argmax}_{\theta} \prod\limits_{k=1}^{n} g(x_k|\theta)$ — i.i.d. / r.s.
$= \text{argmax}_{\theta} \sum\limits_{k=1}^{n} ln g(x_k|\theta)$

${\partial L \over \partial \theta} |_{\theta = \hat\theta_\text{ML}} = 0$

$\therefore \text{Check} {\partial L \over \partial \theta} |_{\theta = \hat\theta_\text{ML}} < 0$

$\hat {h(\theta)}^\text{ML} = h(\hat\theta^\text{ML})$

$x_1, \cdots, x_n \sim \text{Geometric} (P)$ $\hat{\sigma^2}^\text{ML}$

$\hat{1 \over p} = \overline{X_n} \Rightarrow \hat{p} = {1 \over \overline{x}}$

${\hat{\sigma^2}}^text{ML} = {q \over p^2} = {\hat{{1-p} \over p^2}}^\text{ML} = 1 - {1 \over \overline{x_n}}  \over {{1 \over \overline{x_n}}^2}$

## SIT Technique

$\mathbb{E}_x[X] = \mathbb{E}_y [\mathbb{E}[X|Y]]$

$\mathbb{E}[g(x,~y,~z)] = \mathbb{E}_z [\mathbb{E}_{y|z}[ \mathbb{E}_{x|y,z}[g(x,~y,~z)|y,~z]]]$

## Central Limit Theorem

If i.i.d. $x_1, \cdots x_n$ and $\sigma_x^2 < \infty$ then:

$\text{std}(\overline{x_n}) \rightarrow^d \mathbb{Z} \sim \mathbb{N}(0,~1)$

$\text{std}(\sum\limits_{k=1}^n{x_n}) \rightarrow^d \mathbb{Z} \sim \mathbb{N}(0,~1)$

$\text{std}(\overline{x_n}) \rightarrow {{\overline{X_n} - \mu_x} \over {\sigma_x \over \sqrt{n}}}$

${\sum\limits_{k=1}^n X_n - n\mu_x} \over \sigma_x \sqrt{n}$

$\mathbb{V}[\sum\limits_{k=1}^n X_k] = n \sigma_x^2 = n^2 \times {\sigma_x^2 \over n}$
