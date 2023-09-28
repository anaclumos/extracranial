---
lang: 'en'
slug: '/7AA207'
---

| Reduction | Gist                                                   | Training Time             | Prediction Time         | Remark                                |
| --------- | ------------------------------------------------------ | ------------------------- | ----------------------- | ------------------------------------- |
| OvA       | Is it $k$ or not?                                      | $CN$                      | $C$                     | Not robust                            |
| OvO       | Is it $k$ or $k'$?                                     | $(C-1)N$                  | $\mathcal{O}(C^2)$      | can achieve very small training error |
| ECOC      | Assign bits per class. Is this specific bit on or off? | $LN$                      | $L$                     | Needs diversity when designing code   |
| Tree      | Which half does it belong to?                          | $\mathcal{O}(N \log_2 C)$ | $\mathcal{O}(\log_2 C)$ | Good for extreme classifications      |

## OvA (One-vs-All or One-vs-Rest)

- A binary classifier is trained against each category's combined classes. So, if there are $K$ classes, $K$ binary classifiers are trained.
- For prediction, all $K$ classifiers predict the class. The class with the highest confidence score is selected as the final prediction.

## OvO (One-vs-One)

- A binary classifier is trained for every pair of classes. So, if there are $K$ classes, $\frac{K(K-1)}{2}$ classifiers are trained.
- For prediction, the class that gets voted for the most across all classifiers is chosen.

## ECOC (Error-Correcting Output Codes)

- This method represents each class with a unique binary length code $L$. The aim is to train binary classifiers not just based on separating types but also based on distinguishing these binary codes.
- During prediction, the class code closest to the predicted code (in terms of Hamming distance or other metrics) is selected.

## Decision Trees

- Instead of converting the multiclass problem to multiple binary problems, decision trees handle multiclass classification directly by splitting data points at each node based on feature values, eventually leading them to a leaf node representing a class.
- Random Forests, gradient-boosted trees, and other ensemble tree methods can also be used for multiclass classification.

## Comparison

### Efficiency

- **OvA** — Requires training $K$ classifiers.
- **OvO** — Requires training $\frac{K(K-1)}{2}$ classifiers, which can be computationally expensive as $K$ grows.
- **ECOC** — The number of classifiers is determined by the length $L$ of the code, which is generally less than $K$ and $\frac{K(K-1)}{2}$.
- **Tree** — A single tree is trained, but ensemble methods like Random Forests would involve teaching multiple trees.

### Scalability

- **OvA** — Scales linearly with the number of classes.
- **OvO** — Quadratic scalability with the number of classes can be inefficient for an enormous $K$.
- **ECOC** — Scalability can vary depending on the coding design.
- **Tree** — Scales well with the number of classes, but tree depth might increase.

### Decision Boundary

- **OvA** — This can lead to imbalanced decision boundaries since one class is always compared against all others combined.
- **OvO** — Often results in more balanced decision boundaries since it considers every pair of classes separately.
- **ECOC** — The coding design determines the decision boundary.
- **Tree** — Produces orthogonal decision boundaries based on feature splits.

### Complexity

- **OvA and OvO** — Relatively straightforward to understand.
- **ECOC** — Requires an additional step of designing and decoding the binary codes for classes.
- **Tree** — Interpretable as it offers hierarchical decisions based on features.
