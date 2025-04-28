---
lang: 'en'
slug: '/B4CD83'
---

In [[probability]] theory and [[statistics]], the Q function is the tail [[probability]] of the [[standard normal]] [[distribution]], also known as the complementary cumulative [[distribution]] function (CCDF) of the [[standard normal]] [[distribution]]. The Q function is defined as:

$$
Q(x) = \frac{1}{\sqrt{2\pi}} \int_{x}^{\infty} e^{-t^2\over2} dt
$$

where x is a real number.

The Q function calculates the [[probability]] that a [[random variable]] from a normal [[distribution]] with mean 0 and standard deviation 1 exceeds a certain value, $x$. This [[probability]] can be written as:

$$
P(Z>x) = Q(x)
$$

where Z is a [[standard normal]] variable.

The Q function can be calculated using numerical integration or special functions, such as the complementary error function or the Marcum Q-function.

The Q function is helpful in various applications, such as digital communications and signal processing, where it calculates error probabilities and signal-to-noise ratios. It is also used in [[statistics]] to calculate confidence intervals and hypothesis tests for normal distributions.
