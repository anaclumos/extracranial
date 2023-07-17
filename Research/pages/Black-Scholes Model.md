---
lang: 'en'
slug: '/9D4B52'
---

- Long story short, you can model the market with [[Standard Normal]].
- Some assumptions: There's a T-bill (US bond, usually) that gives fixed-rate profit with no danger. The market makes random walks, making a [[Standard Normal]]. The same asset possesses the same value. Free trade with minimum transaction fees.
- Very interesting connections with [[Psychohistory]] [[심리역사학]]

The Black-Scholes Model is a mathematical model used in financial markets to calculate the theoretical price of options, including put and call options. It was developed by economists Fischer Black and Myron Scholes, with notable contributions from Robert Merton. The Black-Scholes formula for a European call option $C$ (an option that can only be exercised at the end of its life) is given as:

$$
C = S_0 e^{-qT}N(d_1) - K e^{-rT}N(d_2)
$$

whereas for a European put option $P$, it is given as:

$$
P = K e^{-rT}N(-d_2) - S_0 e^{-qT}N(-d_1)
$$

In these equations:

- $S_0$ is the current price of the underlying asset.
- $K$ is the strike price of the option.
- $T$ is the time to maturity of the option.
- $r$ is the risk-free interest rate.
- $q$ is the rate of continuous dividends paid by the underlying asset.
- $N(\cdot)$ is the standard normal cumulative distribution function.
- $d_1$ and $d_2$ are calculated as follows:

$$
d_1 = \frac{\ln\left(\frac{S_0}{K}\right) + \left(r - q + \frac{\sigma^2}{2}\right)T}{\sigma\sqrt{T}}
$$

$$
d_2 = d_1 - \sigma\sqrt{T}
$$

where:

- $\ln(\cdot)$ is the natural logarithm function.
- $\sigma$ is the standard deviation of the asset's returns (volatility).

The model assumes several things about the market and the asset, such as:

- There are no transaction costs or taxes.
- The risk-free rate and volatility of the underlying are known and constant. (Usually US government bond)
- The returns on the underlying asset are normally distributed.
- The markets are efficient.
