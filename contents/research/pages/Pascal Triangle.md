---
lang: 'en'
slug: '/FFE63F'
---

In [[Probability]],

$$
{n \choose k} = {n-1 \choose k-1} + {n-1 \choose k}
$$

## Proof

$$
{n-1 \choose k-1} + {n-1 \choose k}
$$

$$
= {(n-1)! \over {(k-1)!~(n-k)!}} + {(n-1)! \over {(n-1-k)!~k!}}
$$

$$
= ({k \over k} {(n-1)! \over {(k-1)!~(n-k)!}}) + ({(n-1)! \over {(n-1-k)!~k!}} {(n-k) \over (n-k)})
$$

$$
= {{{(n-1)!} (k + n - k)} \over {k!~(n-k)!}} = {n! \over {k!~(n-k)!}}
$$

$$
= {n \choose k} ~~~~~~~~~~ \blacksquare
$$
