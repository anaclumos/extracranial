---
slug: /B56933
last_modified: 2025-04-29T00:00:00.000Z
---

Prior $h(\sigma) \sim \text{Beta}(\alpha, \beta)$

Likelihood $g(x|\theta) \sim \text{Binomial}(n, x, \theta)$

Posterior

$f(\theta | x) = {{g(x | \theta) h(\theta)} \over {\int\limits_{\theta} g(x|\theta) h(\theta) d \theta}}$

$\therefore f(\theta | x) \sim \text{Beta}(\alpha + x,~\beta + n - x)$
