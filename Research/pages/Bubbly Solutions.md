---
lang: 'en'
slug: '/8A6451'
---

[[SIWOOO]]

_Who knows if dice rolls, paint splashes, yoyo swings, or spinning tops can represent a higher-purpose problem?_

We can often employ analog physics to solve computational problems. The earliest example in history is the millstones in windmills from 17th-century Europe. James Watt later improved this concept to regulate and "smooth out" the steam engine. Typically, it demonstrated the following feedback loop:

If the steam valve outbursts, it would spin the turbine faster

Then, the balls would swing out as the rotational velocity increases

It would then close up the valve more and more, reducing steam output

Consequently, it will slow down the turbine.

Since then, humans have harnessed many simple physical objects, lives, and phenomena to solve "higher-purpose" problems.

Imagine you need to lay a network cable in a new town using the least length of wires. This is a typical Minimum Spanning Tree (MST) problem, and typically, it will take at least linear time to solve it, even after providing that we already know the distance between each point.

But there is an O(1) way of solving such problems: soap films. If you dip in soap water, the membranes created between each point will always take the shortest path possible due to its surface tension. Like this, using physical and natural phenomena often suggested an extremely efficient or reliable way of optimizing and solving "grand" problems.

Bird Flocks → Swarm Intelligence. Birds and insects' collective behavior principles are used in robotics to coordinate multiple robots for search and rescue missions or exploration of unknown environments. Furthermore, stigmergy, indirect coordination between agents by modifying their environments observed in social insects, optimized distributed computing.

Slime Molds → Network Optimization. This simple organism's ability to find the shortest path between food sources in a maze has been used to solve network optimization problems, such as finding the most efficient layout for railway networks or optimizing the design of electrical circuits.

Ant Colony → Pathfinding Optimizations. This algorithm is inspired by ants' behavior when searching for food. As ants move, they leave behind a pheromone trail that other ants follow. Shorter paths tend to have a higher concentration of pheromones, encouraging more ants to follow them. This principle can be applied to optimize routing problems, such as finding the shortest path in a network.

DNAs → Molecular Computing. DNA molecules can store and process information due to their ability to self-assemble and the specificity of base pairing. DNA computing has been used to solve complex computational problems, such as the Hamiltonian path problem, which uses finding a path that visits each vertex in a graph exactly once.

Quantum Fluctuations → Quantum Annealings. Quantum annealing is a method of solving optimization problems using quantum fluctuations. In quantum annealing, a system is initially in a superposition of all possible states and then slowly evolves towards the lowest energy state, corresponding to the optimal solution. This has been used to solve problems such as the traveling salesperson problem and machine learning tasks.

Recently, Extropic announced that it is "building a full-stack hardware platform to harness matter's natural fluctuations as a computational resource for Generative AI."

How can we design a complete AI hardware and software system from the ground up that thrives in an intrinsically noisy environment?

It's a pretty exciting idea. They claim biological systems utilize intrinsically noisy and random processes for efficient computation. Thus, Energy-based models (EBMs) are well-suited for low-data regimes and require sampling, which is demanding on digital hardware. So, they are building analog circuits that directly implement EBMs, achieving significant improvements in runtime and energy efficiency compared to digital computers, starting with nano-fabricated superconducting devices that operate at low temperatures. In contrast, their semiconductor devices operate at room temperature for broader market reach. Extropic is also developing a software layer to compile abstract EBM specifications with the relevant hardware control language, enabling the breakdown and execution of large programs on analog cores.

Nonetheless, many raised concerns that:

Using analog circuits for AI acceleration isn't new; companies like IBM and Intel have been experimenting for years.

Analog circuit design is significantly more complex than digital VLSI design, involving mixed-signal issues, nonlinear behavior, and device-level challenges.

Even with a highly skilled team, yield and variability are significant concerns in stochastic circuits, as each chip will behave differently, making it difficult to ensure consistent performance.

Design verification and testing for these circuits will require new EDA (Electronic Design Automation) flows and methodologies, which have yet to be developed.

Scaling this technology to production will be challenging, as it requires building a new stack from the ground up and competing with the well-established and optimized digital silicon industry.

It is suspicious that Extropic has not released any public software simulations or benchmarks, an essential due diligence step in hardware development.

The superconducting Josephson junction approach may provide some gains in a lab setting, but due to the need for cryogenic cooling, it will face significant hurdles in mass-market packaging.

Is the sampling speedup offered by Extropic's technology truly the bottleneck in achieving AGI?

Extropic, perhaps, is attempting to capitalize on hype around esoteric approaches to justify their valuation.

It poses an interesting question of knowledge on how information is entangled throughout the universe. Perhaps, in the near future, we will have dedicated processing units that do a small physics experiment inside and record the experiment result, then extrapolate the result into a more human-oriented, useful interpretation.

Say, for example,

Your CPU has a dedicated Soap Processing Unit that generates foam bubbles

reads the coordinates of each intersection

and magically solves MST problems in O(1) time.

Who knows if dice rolls, paint splashes, yoyo swings, or spinning tops can represent a higher-purpose problem?

What if the way the spinning top oscillates and swivels represents a spaceship's optimal trajectory?
