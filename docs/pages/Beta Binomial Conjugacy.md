---
lang: 'en'
slug: '/B56933'
---

Prior $h(\sigma) \sim \text{Beta}(\alpha, \beta)$

Likelihood $g(x|\theta) \sim \text{Binomial}(n, x, \theta)$

Posterior

$f(\theta | x) = {{g(x | \theta) h(\theta)} \over {\int\limits_{\theta} g(x|\theta) h(\theta) d \theta}}$

$\therefore f(\theta | x) \sim \text{Beta}(\alpha + x,~\beta + n - x)$
