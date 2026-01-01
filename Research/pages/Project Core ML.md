---
lang: 'en'
slug: '/77A2F7'
---

- [[AI and ML]]
- [[Photoshop for Text]]

## State-based Models

- Search Problems. You control everything.
- Markov Decision Processes. You battle against nature!
- Adversarial Games: You battle against the opponent

## Variable-based Models

- Constraint Satisfaction Problems. Hard constraints (like Sudoku or Scheduling.)
- Bayesian Networks. Soft dependencies (like tracking cars from sensors)

## Agents

- Reflex Agents. Understands the current situation and adapt. Does not consider future implications.
- Planning Agents. Consider the future implications of the action. Optimal Planning and Complete Planning.

We can use a state space graph to represent the search problem mathematically. This can be linked with a state tree representing the current action and future game states.

## Search Methods

### Uninformed Search

- BFS
- DFS
- Iterative DFS: Run DFS with level 1. If not found, run DFS with level 2. This may be redundant if not found, but most of the work is spent in the lower level, so it is okay.
- Uniform Cost Search: Priority Queue. Dijkstra is a variant of UCS, where there is no goal node; you continue until the PQ is empty & extract the minimum distance to all nodes.

### Informed Search

- UCS searches in all direction
- Greedy: Go straight to what you think is the best
- A\*: UCS + Greedy PQ. Heuristics should be less than the actual cost. If a heuristic satisfies $0 \leq h(n) \leq h ^{\ast} (n)$, where $h^{\ast}(n)$ is the real-world cost, the heuristic is admissible.

## Adversarial Agent

### Different Types of Games

- Zero-sum Game: Fighting over a single value. Minimize the opponent's utility, and maximize mine.
- General Games. Agents have independent utility. They can fight, cooperate, or be indifferent, etc.

### Minimax Tree

A method of calculating zero-sum games.
We can prune some of the nodes if deemed irrelevant to the process.
A structured way of doing this is Alpha-Beta pruning.

### Expectimax Tree

A not-so-pessimistic version of the Minimax tree.
It averages the utility and therefore takes some risk of an outlier (the worst-worst case)

## Constraint Satisfaction Problems

State defined by variables $X_i$ and values from domain $D$.
A goal test is a set of constraints.
Several methods to tackle this:

- Backtracking: Search All
- Forward Checking: Cross out combinations violating constraints
- Constraint propagations: Detect failures early ahead

## Simulated Annealing

- Randomly allows wrong moves, shakes out of the local minimum.
