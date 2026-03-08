---
lang: 'en'
slug: '/8A9CFC'
title: "Parallel Computing's Upper Limit"
---

[[SIWOOO]]

_Does Quadrupling the Threads Quadruples the Speed?_

Yesterday, we got our first hands-on on Bend, which claims to simplify how we write parallel computed codes.

Does this mean we can infinitely speed up our code?

Amdahl's Law dictates that there is a clear upper limit where parallel computing can solve. It states that the maximum improvement to an overall system performance due to parallelization is limited by the portion of the system that cannot be parallelized.

Max 20x speedup when doing normal tasks with multi[core/thread/process]

Max 1000x speedup when doing highly parallelizable machine learning tasks with CUDA

Let's say we need to run six jobs like the following.

If we run things sequentially, it will take eight units of time. We can even give the benefit of not needing a "start" and "end" since the sequential process does not require any fancy setup. Thus, this process runs in 6-8 units of time.

If we parallelize it, however, we do need an explicit "start" and "end" job because of the nature of parallel computing, which requires delegating tasks to each worker and subsequently aggregating the results. Naively put, if we say we can run all six jobs simultaneously, we can finish the entire thing within three units of time.

In this (overly simplified) example, we can see that running six workers simultaneously only results in roughly twice or thrice faster speed.

We can express it as:

Where

P is the proportion of the program that can be parallelized.

N is the number of processors.

(1−P) is the portion of the program that cannot be parallelized.

Beating Amdahl's Law to above the numbers above was exceptionally hard. However, Bend uses a novel approach of interaction combinators, which represent algorithm operations in a discrete graph. We can then use the divide-and-conquer approach, thus parallelizing the computation.

The team behind Bend claims that Bend can make

12.66x faster with multi[core/thread/process]

57.86x faster with CUDA

which, Amdahl's law still stands.
