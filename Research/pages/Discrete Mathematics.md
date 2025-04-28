---
lang: 'en'
slug: '/21FE92'
---

## Dynamic Programming

- **Optimal substructure**. The optimal solution to a problem consists of optimal solutions to subproblems.
- **Overlapping subproblems**. few subproblems in total, many recurring instances of each.

## Bellman-Ford

shortest path, negative possible.

$$
\text{OPT}[v,k] = \min(\text{OPT}[v, k-1], \text{OPT}[u, v] + w(u,v))
$$

## Chain Matrix Multiplication

$$
\text{OPT}[i, j] = \text{OPT}[i, k] + \text{OPT}[k+1, j] + \text{combine}
$$

## Min Cut

The set of vertices reachable from source s in the residual graph is one part of the [[partition]]. Cut capacity $\text{cap}(A, B) = \sum_{\text{out A}} c(e)$.

$$
|f| = \sum_{e~\text{out of X}} f(e) - \sum_{e~\text{into X}} f(e)
$$

- maxflow = Min $\text{cap}(A, B)$.

## Ford-Fulkerson

Given $(G, s, t, c \in \mathbb{N}+)$, start with $f(u,v)=0$ and $G_f =G$. While an augmenting path is in $G_f$, find a bottleneck. Augment the flow along this path and update the residual graph $G_f$. $\mathcal{O}(|f| (V+E))$.

## Edmond-Karp

Ford-Fulkerson, but choose the shortest augmenting path.

For any flow $f$ and any $(A,B)$ cut, $|f| ≤ \text{cap}(A,B)$. For any flow $f$ and any $(A,B)$ cut, $$|f| = \sum_f (s, v) = \sum_{u \in A,~v \in B} f(u, v) - \sum_{u \in A,~v \in B} f(v, u)$$

## Solving by Reduction

To reduce a problem $Y$ to a problem $X$ ($Y \leq_{p} X$) we want a function $f$ that maps $Y$ to $X$ such that $f$ is a polynomial time computable and $\forall y \in Y$ is solvable if and only if $f(y) \in X$ is solvable.

## Reduction to NF

Describe how to construct a flow network. Claim "This is feasible if and only if the max flow is …". Prove both directions.

## Bipartite to Max Flow

- Max Matching ⟹ Max Flow. If k edges are matched, then there is a flow of value k.
- Max matching ⟸ Max flow. If there is a flow f of value k, there is a matching with k edges.
- $\mathcal{O}(|f| (E' + V'))$
- $|f| = V$
- $V' = 2V + 2$
- $E' = E + 2V$
- $\mathcal{O}(V (E + 2V + 2V + 2)) = \mathcal{O}(V E + V^2) = \mathcal{O}(V E)$

## Circulation

- $d(v) > 0$ if demand
- $d(v) < 0$ if supply
- Capacity Constraint $0 \leq f(e) \leq c(e)$
- Conservation Constraint $f^{\text{in}} (v) - f^{\text{out}} (v) = d(v)$.
- For every feasible circulation $\sum_{v \in V} d(v) = 0$, there is a feasible circulation with demands $d(v)$ in $G$ if and only if the maximum $s-t$ flow in $G'$ has value $D = \sum_{d(v)>0} d(v)$.

## Circulation with Demands and Lower Bounds.

- Capacity Constraint $l(e) \leq f(e) \leq c(e)$
- Conservation Constraint $f^{\text{in}} (v) - f^{\text{out}} (v) = d(v)$
- Given $G$ with lower bounds, we subtract the lower bound $l(e)$ from the capacity of each edge.
- Subtract $f_0^{\text{in}}(v) − f_0^{\text{out}}(v) = L(v)$ from the demand of each node.
- Solve the circulation problem on this new graph to get a flow $f$.
- Add $l(e)$ to every $f(e)$ to get a flow for the original graph.

## Existence of Linear Programming Solution.

- Given an Linear Programming problem with a feasible set and an objective function $P$.
- If $S$ is empty, Linear Programming has no solution.``
- If $S$ is unbounded, Linear Programming may or may not have the solution.
- If $S$ is bounded, Linear Programming has one or more solutions.

## Standard Form Linear Programming

- $\max (c_1x_1 + \cdots + c_nx_n)$
- subject to
- $a_{11}x_1 + \cdots + a_{1n}x_n ≤ b_1$
- all the way to
- $a_{m1}x_1 + \cdots + a_{mn}x_n ≤ b_m$.
- Also, $x_1 \geq 0, \cdots, x_n \geq 0$.

## Matrix Form Linear Programming

- $\max(c^T x)$
- subject to
- $Ax \leq b$
- $x \geq 0$
- $x \in \mathbb{R}$

## Integer Linear Program

- all variables $\in \mathbb{N}$
- is NP-Hard

## Dual Program

- $\min(b^T y)$
- subject to
- $A^T y \geq c$
- $y \geq 0$
- $y \in \mathbb{R}$

### Weak Duality

- The optimum of the dual is an upper bound to the optimum of the primal.
- $\text{OPT}(\text{primal}) ≤ \text{OPT}(\text{dual})$.

### Strong duality

- Let P and D be primal and dual Linear Programming correspondingly. If P and D are feasible, then $c^T x = b^T y$.

If a standard problem and its dual are feasible, both are feasibly bounded. If one problem has an unbounded solution, then the dual of that problem is infeasible.

## Possibilities of Feasibility

| P\D                | Feasibly Bounded | Feasibly Unbounded | Infeasible |
| ------------------ | ---------------- | ------------------ | ---------- |
| Feasibly Bounded   | Possible         | Impossible         | Impossible |
| Feasibly Unbounded | Impossible       | Impossible         | Possible   |
| Infeasible         | Impossible       | Possible           | Possible   |

## [[P vs NP|P vs. NP]]

- P = set of poly-time solvable problems.
- NP = set of poly-time verifiable problems.
- Decision Knapsack is NP-complete, whereas undecidable problems like Halting problems are only NP-Hard (not NP).
- X is NP-Hard if $\forall Y \in NP$ and $Y \leq_p X$.
- X is NP-complete if X is NP-Hard and $X \in NP$.
- If P = NP, then P = NP-complete.
- NP Problems can be solved in poly-time with NDTM.
- NP Problems can be verified in poly-time by DTM.

## Polynomial Reduction

To reduce a decision problem Y to a decision problem X ($Y \leq_p X$), find a function $f$ that maps Y to X such that $f$ is poly-time computable and $\forall y \in Y$ is YES if and only if $f(y) \in X$ is YES.

## Proving NP-Complete

Show X is in NP, Pick problem NP-complete Y, and show $Y \leq_p X$.

## Conjunctive Normal Form SAT

- Conjunction of clauses.
- Literal: Variable or its negation.
- Clause: Disjunction of literals.
- [[3-SAT]]. Each clause has at most three literals.
- $(X_1 \lor \neg X_3) \land (X_1 \lor X_2 \lor X_4) \land \cdots$

## Independent Set

- Independent Set is a set of vertices in a graph, no two of which are adjacent.
- The max independent set asks for the size of the largest independent set in a given graph.

## Clique

- Complete graph = every pair of vertices is connected by an edge.
- The max clique asks for the number of vertices in its largest complete subgraph.

## Vertex Cover

- Vertex Cover of a graph is a set of vertices that includes at least one endpoint of every edge.
- The min vertex cover asks for the size of the smallest vertex cover in a graph.

## Hamiltonian Cycle

- A cycle that visits each vertex exactly once.
- Hamiltonian Path visits each vertex exactly once and doesn't need to return to its starting point.

## Graph Coloring

- Given G, can you color the nodes with $<k$ colors such that the end points of every edge are colored differently?
