---
lang: 'en'
slug: '/7F10BC'
aliases: ['MLE']
---

$f(\mathbb{D} | \theta)$

$\hat{\theta}_\text{ML} = \text{argmax}_{\theta} g(x|\theta) = \text{argmax}_{\theta} \ln g(x | \theta)$

$\hat{\theta}_\text{ML} = \text{argmax}_{\theta} g(x_1,~x_2,~\cdots,~x_n | \theta)$
$= \text{argmax}_{\theta} \prod\limits_{k=1}^{n} g(x_k|\theta)$ — i.i.d. / r.s.
$= \text{argmax}_{\theta} \sum\limits_{k=1}^{n} \ln g(x_k|\theta)$

${\partial L \over \partial \theta} |_{\theta = \hat\theta_\text{ML}} = 0$

$\therefore$ Check ${\partial L \over \partial \theta} |_{\theta = \hat\theta_\text{ML}} < 0$

$\hat {h(\theta)}^\text{ML} = h(\hat\theta^\text{ML})$

$x_1, \cdots, x_n \sim \text{Geometric} (P)$ $\hat{\sigma^2}^\text{ML}$

$\hat{1 \over p} = \overline{X_n} \Rightarrow \hat{p} = {1 \over \overline{x}}$

${\hat{\sigma^2}}^\text{ML} = {q \over p^2} = {\hat{{1-p} \over p^2}}^\text{ML} = 1 - {{1 \over \overline{x_n}}  \over {{1 \over \overline{x_n}}^2}}$

---

Max-likelihood: Tries to give the best PDF.

Max-likelihood parameter as $\hat \theta$

$$

\hat \theta ^\text{ML} = \text{argmax}_{\theta} f(x_1, x_2, \cdots x^n | \theta)

= \text{argmax}_{\theta} \ln f(x_1, x_2, \cdots x^n | \theta)

= \text{argmax}_{\theta} L


$$

Assuming IID

$$

= \ln \prod_{k=1}^{n} f(x_k | \theta)

= \text{argmax}_{\theta} \sum_{k=1}^{n} \ln f(x_k | \theta)


$$

## Maximum Likelihood Estimation

1. consistent (convergent in [[probability]])
2. Asymptotically Normal
3. Invariance Principle $\hat{g(\theta)_{ML}} = g(\hat\theta_{ML})$
