---
lang: 'en'
slug: '/32EC91'
---

Let the three variables:

- $b$ is the bandwidth (bits/s)
- $s$ is the size of a packet (bits)
- $a$ is the arrival rate (count/sec)

Then we can know that:

- $s \times a$ is the traffic arrival rate (bits/s)
- If ${sa \over b} < 1$, the bandwidth is much higher than the traffic. No problem.
- If ${sa \over b} \approx 1$, the bandwidth struggles to digest the traffic. Congestion begins.
- If ${sa \over b} > 1$, more traffic comes than the bandwidth's capability. Congestion piles up.
