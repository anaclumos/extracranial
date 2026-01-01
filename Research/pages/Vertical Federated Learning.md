---
lang: 'en'
slug: '/4214F8'
aliases: ['Vertical FL', 'Feature-based Federated Learning', 'Feature-based FL', 'VFL']
---

Vertical [[Federated Machine Learning|Federated Learning]], or [[feature]]-based [[Federated Machine Learning|federated learning]], is a type of [[Federated Machine Learning|Federated Learning]] where multiple parties collaborate to train a shared [[ML|machine learning]] model without directly exchanging their raw data. Unlike [[Horizontal Federated Learning]], where different parties have different samples (or data points) but share the same [[feature]] set, in Vertical [[Federated Machine Learning|Federated Learning]], various parties possess different subsets of [[Feature|features]] for the same collection of samples.

### Example

Consider two companies, a bank, and a retail store, that want to collaborate on a [[ML|machine-learning]] model to predict customer spending behavior. The bank has financial [[Feature|features]] like income, credit score, and loan history, while the retail store has behavioral [[Feature|features]] like purchase history, product preferences, and online engagement metrics. Both companies have data on the same set of customers (i.e., same sample set) but have collected different kinds of information (i.e., different [[feature]] sets).

### How it Works

1. **Initialization**. A global model is initialized, often on a centralized server, or one of the parties acts as a coordinator.
2. **Local Computation**. Each party computes local model updates using its [[feature]] set and the shared model parameters. Since the parties have different [[Feature|features]] but share the same samples, the local computations can be aligned to the same group of individuals.
3. **Secure Aggregation**. The local updates from each party are aggregated securely, often employing advanced cryptographic techniques like [[Secure Multi-Party Computation]] ([[Secure Multi-Party Computation|SMPC]]) or [[Homomorphic Encryption]] to generate an updated global model.
4. **Iteration**. Steps 2 and 3 are repeated until the model converges or other stopping criteria are met.

### Key Advantages

1. **Data Privacy**. Raw data never leaves the local premises, ensuring data privacy.
2. **[[Feature]] Utilization**. Allows for more comprehensive models that utilize [[Feature|features]] from multiple parties, leading to potentially more accurate and insightful results.
3. **Reduced Dimensionality**. Each party only needs to worry about its own set of [[Feature|features]], reducing the computational burden.

### Challenges

1. **Complexity**. Secure aggregation methods like [[Secure Multi-Party Computation|SMPC]] can be computationally expensive and complicated to implement.
2. **Alignment**. All parties must have data on the same set of samples, which might not always be feasible or straightforward to achieve.
3. **Communication Overhead**. Exchanging model updates can be bandwidth-intensive, mainly when secure cryptographic methods are employed.
4. **Trust and Governance**. A secure and mutually agreed-upon protocol ensures no party cheats or gains an unfair advantage.

### Applications

Vertical [[Federated Machine Learning|Federated Learning]] is especially useful in sectors where entities hold different data on the same individuals or items. Examples include collaborations between healthcare providers and research institutions, banks and retail companies, or telecom companies and content providers.

By leveraging Vertical [[Federated Machine Learning|Federated Learning]], organizations can create more comprehensive models than possible using only their data, all while maintaining strict data privacy standards. This enables them to extract richer insights and create more value from their collaborative efforts.
