---
lang: 'en'
slug: '/F36EED'
---

In [Probability](./../.././docs/pages/Probability.md),

$$
\ln n! = \ln \prod\limits_{k=1}^n k = \sum\limits_{k-1}^n \ln k \approx \int_{x=1}^n \ln x ~dx
$$

Using integration by parts

$$
\int u ~dv = uv - \int v~du
$$

$$
d(uv) = v~du + u~dv
$$

$$
u = \ln x,~ dv = 1,~ du = {1 \over x},~v=x
$$

$$
\int_{x=1}^n \ln x~dx = [{x \ln x - \int x {1 \over x} ~dx}]^n_{x=1}
$$

$$
= [x \ln x - x ]^n_{x=1} = n \ln n - n + 1
$$

<head>
  <html lang="en-US"/>
</head>
