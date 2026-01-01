---
lang: 'en'
slug: '/A8782A'
---

- [Federated Learning: Challenges, Methods, and Future Directions](https://arxiv.org/abs/1908.07873)

## Intro

- [Edge Computing](./../.././docs/pages/Edge%20Computing.md) is getting big
  - Fog Computing
- Recent trend: Train centrally, Inference locally
- [FL](./../.././docs/pages/Federated%20Machine%20Learning.md) challenge this

## Challenges

- Expensive communication
  - Reduce comms round
  - Reduce comms size
- System Heterogeneity
  - Everyone uses different phones
- Statistical Heterogeneity
- Privacy Concerns

## Communication Efficiency in Federated Networks

**Communication is a primary bottleneck** in [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md).

#### Local Updating

- Mini-batch optimization methods are used for distributed learning.
- Newer methods focus on **flexible local updating**, leveraging distributed data processing.
- In federated settings, **FedAvg** is a commonly used method for local updating.
- Federated Averaging (FedAvg) has been effective but may only sometimes converge.

#### Compression Schemes

- Model compression schemes like sparsification, subsampling, and quantization reduce message size.
- These methods face unique challenges in federated settings due to device participation variability.

#### Decentralized Training

- [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) often uses a star network topology.
- Decentralized topologies may reduce central server communication costs.
- Hierarchical communication patterns leverage [edge servers](./../.././docs/pages/Edge%20Computing.md) for data aggregation.

## Systems Heterogeneity in Federated Settings

Federated settings exhibit significant systems variability: **hardware, network, battery power**.

#### Asynchronous Communication

- Asynchronous schemes mitigate stragglers but face challenges in federated settings with unpredictable delays.

#### Active Sampling

- Only a subset of devices participate in each training round.
- Active selection of devices can influence outcomes.
- Methods can sample devices based on system resources or data quality.

#### Fault Tolerance

- Essential in federated settings due to potential device dropouts.
- Coded computation introduces redundancy to tolerate failures.

## Statistical Heterogeneity in Federated Models

Statistical heterogeneity creates challenges in federated models when data is not consistently distributed across devices. This heterogeneity impacts both how data is modeled and the analysis of the convergence behavior of training procedures.

### Modeling Heterogeneous Data

#### Literature Backgrounds

Extensive research models statistical heterogeneity through meta-learning and multi-task learning. These concepts have recently been extended to [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md).

- **MOCHA** -- Optimizes federated settings, allowing personalization by learning separate models for each device but also has a shared representation via multi-task learning.
- **Bayesian Networks** -- Models the star topology and performs variational inference.
- **Meta-learning** -- Adopts a within-task learning rate using multi-task information.
- **Transfer Learning** -- Explores personalization by training a global model.

### Challenges

Despite advancements, there are still obstacles in ensuring the methods are robust, scalable, and automated.

#### Fairness in Federated Data

Fairness needs to be considered apart from accuracy. Some devices might get more advantages based on data volume or frequency.

#### Modified Modeling

Some approaches aim to reduce model performance [variance](./../.././docs/pages/Variance.md) across devices.

### Convergence Guarantees for Non-IID Data

#### Challenge

Non-IID (independent and identically distributed) data causes difficulties in analyzing convergence behavior in federated settings.

- **FedAvg** -- A method that's been observed to diverge in practice.
- **FedProx** -- A proposal to modify FedAvg to ensure convergence.

#### Other Approaches

Some approaches tackle statistical heterogeneity by sharing local device data or server-side proxy data. However, this could lead to issues with privacy.

## Privacy in [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

The need for privacy is paramount in federated settings, mainly because raw data remains local on each device. However, sharing information like model updates during training can inadvertently expose sensitive information.

### Privacy in General [Machine Learning](./../.././docs/pages/ML.md)

#### [Strategies](./../.././docs/pages/Strategy.md)

- **[Differential Privacy](./../.././docs/pages/Differential%20Privacy.md)** -- Popular for its strong guarantees, simplicity, and small systems overhead. It ensures changes in input don't drastically alter the output [distribution](./../.././docs/pages/Distribution.md).
- **[Homomorphic Encryption](./../.././docs/pages/Homomorphic%20Encryption.md)** -- Allows computation on encrypted data.
- **Secure Multiparty Computation ([SMC](./../.././docs/pages/Secure%20Multi-Party%20Computation.md))** -- Enables multiple parties to compute functions collaboratively without leaking input data.

#### Trade-offs

A balance between privacy and model accuracy must be struck. The introduction of noise enhances privacy but can compromise accuracy.

### Privacy in [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

#### Challenges

The federated context requires cost-effective methods, efficient communication, and resilience to device dropouts without sacrificing accuracy.

- **Privacy Definitions** -- Global privacy (privacy from external third parties) and local privacy (privacy from the central server).

#### Approaches

- **[Secure Multi-Party Computation](./../.././docs/pages/Secure%20Multi-Party%20Computation.md) ([SMC](./../.././docs/pages/Secure%20Multi-Party%20Computation.md))** -- Protects individual model updates.
- **[Differential Privacy](./../.././docs/pages/Differential%20Privacy.md)** -- Applied to [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md), offers global [differential privacy](./../.././docs/pages/Differential%20Privacy.md). Some methods even propose adaptive gradient clipping to optimize performance.
- **Local Privacy** -- Proposes a more relaxed version that performs better than strict local privacy.
- **Combining Methods** -- [Differential privacy](./../.././docs/pages/Differential%20Privacy.md) can be merged with model compression for privacy and communication benefits.

## Future Directions and Themes

### Communication in [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

#### Extreme Communication Schemes

- Exploration of optimization in [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) regarding communication requirements.
- Analyzing optimization methods' tolerance for precision and the resultant benefits for generalization.
- Evaluation of one-shot/few-shot heuristics in federated settings.

#### Communication Reduction and Pareto Frontier

- Techniques for reducing communication in federated training, e.g., local updating and model compression.
- Analysis of the trade-off between accuracy and communication.
- Assess techniques for their efficiency in achieving the best accuracy under a communication budget.

#### Novel Models of Asynchrony

- Comparison between synchronous and asynchronous communication in distributed optimization.
- Consideration of device-centric communication schemes in federated networks.

### Heterogeneity in [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

#### Heterogeneity Diagnostics

- Methods to quantify statistical heterogeneity.
- Development of diagnostics to gauge the levels of heterogeneity before training.
- Exploration of how heterogeneity can be leveraged for better-federated optimization convergence.

### Privacy Concerns

#### Granular Privacy Constraints

- Examination of local and global privacy definitions in federated networks.
- Proposing methods that respect device-specific or sample-specific privacy constraints.

### Extending the Scope of [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

#### Beyond Supervised Learning

- Addressing scenarios where data in federated networks is unlabeled or weakly labeled.
- Addressing tasks other than model fitting, such as exploratory data analysis, aggregate [statistics](./../.././docs/pages/Statistics.md), or reinforcement learning.

### Operational Challenges

#### Productionizing [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

- Handling practical concerns like concept drift, diurnal variations, and cold start problems.

### Standards and Benchmarks

#### Benchmarks

- Emphasis on grounding [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) research in real-world settings and datasets.
- Enhancing existing benchmarking tools to encourage reproducibility and the dissemination of solutions.
