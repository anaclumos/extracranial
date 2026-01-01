---
lang: 'en'
slug: '/B4CD83'
---

In [probability](./../.././docs/pages/Probability.md) theory and [statistics](./../.././docs/pages/Statistics.md), the Q function is the tail [probability](./../.././docs/pages/Probability.md) of the [standard normal](./../.././docs/pages/Standard%20Normal.md) [distribution](./../.././docs/pages/Distribution.md), also known as the complementary cumulative [distribution](./../.././docs/pages/Distribution.md) function (CCDF) of the [standard normal](./../.././docs/pages/Standard%20Normal.md) [distribution](./../.././docs/pages/Distribution.md). The Q function is defined as:

$$
Q(x) = \frac{1}{\sqrt{2\pi}} \int_{x}^{\infty} e^{-t^2\over2} dt
$$

where x is a real number.

The Q function calculates the [probability](./../.././docs/pages/Probability.md) that a [random variable](./../.././docs/pages/Random%20Variable.md) from a normal [distribution](./../.././docs/pages/Distribution.md) with mean 0 and standard deviation 1 exceeds a certain value, $x$. This [probability](./../.././docs/pages/Probability.md) can be written as:

$$
P(Z>x) = Q(x)
$$

where Z is a [standard normal](./../.././docs/pages/Standard%20Normal.md) variable.

The Q function can be calculated using numerical integration or special functions, such as the complementary error function or the Marcum Q-function.

The Q function is helpful in various applications, such as digital communications and signal processing, where it calculates error probabilities and signal-to-noise ratios. It is also used in [statistics](./../.././docs/pages/Statistics.md) to calculate confidence intervals and hypothesis tests for normal distributions.
