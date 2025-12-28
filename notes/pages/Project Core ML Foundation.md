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
- [[Iterative and Incremental Development|Iterative]] DFS: Run DFS with level 1. If not found, run DFS with level 2. This may be redundant if not found, but most of the work is spent in the lower level, so it is okay.
- Uniform Cost Search: [[Priority Queue]]. [[Dijkstra]] is a variant of UCS, where there is no goal node; you continue until the [[Priority Queue|PQ]] is empty & extract the minimum distance to all nodes.

### Informed Search

- UCS searches in all direction
- Greedy: Go straight to what you think is the best
- A\*: UCS + Greedy [[Priority Queue|PQ]]. Heuristics should be less than the actual cost. If a heuristic satisfies $0 \leq h(n) \leq h ^{\ast} (n)$, where $h^{\ast}(n)$ is the real-world cost, the heuristic is admissible.

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

## Principal component analysis

Used for dimension reduction; tries to analyze data on a (mostly) 2D plot.

## Cross-Validation

Splits all your data into three parts: training, testing, and validation data.

## Bias

Inconsistencies in Data

## Between Classification and Regression

Classification is used to produce discrete results or categories.
Regression deals with continuous data.

- Easy to implement & Adapts easily & Few hyperparameters
- Does not scale well & Curse of dimensionality & Prone to [[overfitting]]

## Different Types of [[ML]]

## Supervised

**Task Driven**.
Inferring a function from labeled training data.
The training data consists of a set of training examples.

**Support Vector Machines**.
Capable of performing linear or non-linear classification, regression, and even outlier detection.
A data point is a p-dimensional vector.
Can we separate such points with a (p-1)-dimensional hyperplane (linear classifier)?

**Regression**.
Statistical processes for estimating the relationships between a dependent variable and one or more independent variables.
The most common form of regression analysis is linear regression, in which one finds the line (or a more complex linear combination) that most closely fits the data according to a specific mathematical criterion.

**Naive Bayes**.
A supervised learning algorithm.
Assumes that all attributes are independent of each other,
then applies Bayes' theorem; therefore, Naive.

**Decision Trees**.
A tree-like model of decisions and their possible consequences.
Display an algorithm that only contains conditional control statements.

**K-nearest Neighbor Algorithm**.
Supervised learning classifier using proximity to make classifications or predictions.

**Neural Networks**.
An ANN is based on a collection of connected units or nodes called artificial neurons, which loosely model the neurons in a biological brain.

## Unsupervised

**Data-Driven**.
Used to find patterns in the set of data given.
In this, we don't have any dependent variable or label to predict.
[[Clustering]].
Anomaly Detection.
Neural Networks.
Latent Variable Models.
C-Means, K-Means.

**Reinforcement**
Learned to **react** to the environment.

**Q-Learning**.
The agent tries to learn the optimal policy from past experiences.

**Markov Decision Process**.
The agent must take action (A)
to transition from the start state to the end state (S).
Agent receives rewards (R) for each action it takes.
The series of actions taken by the agent defines the policy (π) and the rewards collected to define the value (V).
The main goal here is to maximize rewards by choosing the optimum policy.

## [[Overfitting]]

When capturing the noise of the data

- Splitting the data with cross-validations
- More training data
- Remove irrelevant features
- Early Stop (Don't overprocess)
- Sanitize Data (Regularization)
- Ensemble Model.

## Ref

- [Machine Learning Interview Questions (2023) - InterviewBit](https://www.interviewbit.com/machine-learning-interview-questions/#why-machine-learning-was-introduced)
- [Regression analysis](https://en.wikipedia.org/wiki/Regression_analysis)
- [What is the k-nearest neighbors algorithm?](https://www.ibm.com/topics/knn)
- [Artificial neural network](https://en.wikipedia.org/wiki/Artificial_neural_network)
- [Top 45 Artificial Intelligence (AI) Interview Questions and Answers in 2023](https://www.edureka.co/blog/interview-questions/artificial-intelligence-interview-questions/)
