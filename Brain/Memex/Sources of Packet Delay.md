---
lang: 'en'
slug: '/2EEEE4'
---

$$
d_{nodal} = d_{processing} + d_{queueing\:delay} + d_{transmission\:delay} + d_{propagation\:delay}
$$

- $d_{processing}$ is the time checking for bit errors. Typically finishes in milliseconds.
- $d_{queueing\:delay}$ is the time waiting in the memory if the router is busy transmitting something else.
- $d_{transmission\:delay} = {packet\:size \over bandwidth}$
- $d_{propagation\:delay = {cable\:length \over c}}$ is the physical constraint of propagation. $c$ is the speed of connection, usually the speed of light.
