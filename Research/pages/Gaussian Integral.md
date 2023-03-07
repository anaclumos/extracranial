---
lang: 'en'
slug: '/977C5C'
---

The [[Gaussian]] integral is the integral of the function $e^{-x^2}$ over the entire real line, and it is given by:

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

First, we square the integral:

$$\left(\int_{-\infty}^{\infty} e^{-x^2} dx\right)^2 = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} e^{-x^2} e^{-y^2} dx dy$$

Next, we change to polar coordinates:

$$\int_{0}^{\infty} \int_{0}^{2\pi} e^{-r^2} r d\theta dr = \pi$$

To evaluate this integral, we use the substitution $u = r^2$ and $du = 2r dr$, which gives:

$$\frac{1}{2}\int_{0}^{\infty} e^{-u} du = \frac{1}{2}$$

Therefore, we have:

$$\left(\int_{-\infty}^{\infty} e^{-x^2} dx\right)^2 = \pi \quad \Rightarrow \quad \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

And this completes the proof.
