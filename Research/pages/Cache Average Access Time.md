---
lang: 'en'
slug: '/D27BDB'
---

- $H$ is the hit rate of cache level $L_i$
- $T_i$ is the access time of level $L_i$
- $R_i$ is the burst rate per word of level $L_i$ (after startup access time)
- $B$ is the block size

## $T_\text{average}$ with $L_1$ cache

Then there are two possible cases.

- We have a hit and only pay $L_1$ cache time.
- We miss and read the whole block to $L_1$

Therefore, Average Access Time $T_\text{average}$ is (Hit Time) $T_1$ + (Miss Ratio) $(1-H_1)$ × (Miss Penalty) $(T_\text{main memory} + B \times R_\text{main memory})$

$$
T_\text{average} =T_1 + (1-H_1) \times [T_\text{main memory} + B \times R_\text{main memory}]
$$

## $T_\text{average}$ with $L_2$ cache

- Hit at $L_1$ cache
- Hit at $L_2$ cache
- We miss and read the whole block from memory

Similarly,

$$
T_\text{average} =T_1 + (1-H_1) \times H_2 \times [T_2 + B \times R_2] + (1-H_1) \times (1-H_2) \times [T_2 + T_\text{main memory} + B \times R_\text{main memory}]
$$
