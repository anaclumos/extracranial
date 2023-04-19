---
lang: 'en'
slug: '/7F10BC'
aliases: ['MLE']
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
