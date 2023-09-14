---
lang: 'en'
slug: '/A8782A'
---

- https://doi.org/10.48550/arXiv.1908.07873

## Intro

- [[Edge Computing]] is getting big
  - Fog Computing
- Recent trend: Train centrally, Inference locally
- [[Federated Machine Learning|FL]] challenge this

## Challenges

- Expensive communication
  - Reduce comms round
  - Reduce comms size
- System Heterogeneity
  - Everyone uses different phones
- Statistical Heterogeneity
- Privacy Concerns

## Communication Efficiency in Federated Networks

**Communication is a primary bottleneck** in [[Federated Machine Learning|federated learning]].

#### Local Updating

- Mini-batch optimization methods are used for distributed learning.
- Newer methods focus on **flexible local updating**, leveraging distributed data processing.
- In federated settings, **FedAvg** is a commonly used method for local updating.
- Federated Averaging (FedAvg) has been effective but may only sometimes converge.

#### Compression Schemes

- Model compression schemes like sparsification, subsampling, and quantization reduce message size.
- These methods face unique challenges in federated settings due to device participation variability.

#### Decentralized Training

- [[Federated Machine Learning|Federated learning]] often uses a star network topology.
- Decentralized topologies may reduce central server communication costs.
- Hierarchical communication patterns leverage [[Edge Computing|edge servers]] for data aggregation.

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

Extensive research models statistical heterogeneity through meta-learning and multi-task learning. These concepts have recently been extended to [[Federated Machine Learning|federated learning]].

- **MOCHA** — Optimizes federated settings, allowing personalization by learning separate models for each device but also has a shared representation via multi-task learning.
- **Bayesian Networks** — Models the star topology and performs variational inference.
- **Meta-learning** — Adopts a within-task learning rate using multi-task information.
- **Transfer Learning** — Explores personalization by training a global model.

#### Challenges

Despite advancements, there are still obstacles in ensuring the methods are robust, scalable, and automated.

#### Fairness in Federated Data

Fairness needs to be considered apart from accuracy. Some devices might get more advantages based on data volume or frequency.

#### Modified Modeling

Some approaches aim to reduce model performance [[variance]] across devices.

### Convergence Guarantees for Non-IID Data

#### Challenge

Non-IID (independent and identically distributed) data causes difficulties in analyzing convergence behavior in federated settings.

- **FedAvg** — A method that's been observed to diverge in practice.
- **FedProx** — A proposal to modify FedAvg to ensure convergence.

#### Other Approaches

Some approaches tackle statistical heterogeneity by sharing local device data or server-side proxy data. However, this could lead to issues with privacy.

## Privacy in[[Federated Machine Learning| Federated Learnin]]g

The need for privacy is paramount in federated settings, mainly because raw data remains local on each device. However, sharing information like model updates during training can inadvertently expose sensitive information.

### Privacy in General [[ML|Machine Learning]]

#### [[Strategy|Strategies]]

- **[[Differential Privacy]]** — Popular for its strong guarantees, simplicity, and small systems overhead. It ensures changes in input don't drastically alter the output [[distribution]].
- **[[Homomorphic Encryption]]** — Allows computation on encrypted data.
- **Secure Multiparty Computation ([[Secure Multi-Party Computation|SMC]])** — Enables multiple parties to compute functions collaboratively without leaking input data.

#### Trade-offs

A balance between privacy and model accuracy must be struck. The introduction of noise enhances privacy but can compromise accuracy.

### Privacy in [[Federated Machine Learning|Federated Learning]]

#### Challenges

The federated context requires cost-effective methods, efficient communication, and resilience to device dropouts without sacrificing accuracy.

- **Privacy Definitions** — Global privacy (privacy from external third parties) and local privacy (privacy from the central server).

#### Approaches

- **[[Secure Multi-Party Computation]] ([[Secure Multi-Party Computation|SMC]])** — Protects individual model updates.
- **[[Differential Privacy]]** — Applied to [[Federated Machine Learning|federated learning]], offers global [[differential privacy]]. Some methods even propose adaptive gradient clipping to optimize performance.
- **Local Privacy** — Proposes a more relaxed version that performs better than strict local privacy.
- **Combining Methods** — [[Differential privacy]] can be merged with model compression for privacy and communication benefits.

## Future Directions and Themes

### Communication in [[Federated Machine Learning|Federated Learning]]

#### Extreme Communication Schemes

- Exploration of optimization in [[Federated Machine Learning|federated learning]] regarding communication requirements.
- Analyzing optimization methods' tolerance for precision and the resultant benefits for generalization.
- Evaluation of one-shot/few-shot heuristics in federated settings.

#### Communication Reduction and Pareto Frontier

- Techniques for reducing communication in federated training, e.g., local updating and model compression.
- Analysis of the trade-off between accuracy and communication.
- Assess techniques for their efficiency in achieving the best accuracy under a communication budget.

#### Novel Models of Asynchrony

- Comparison between synchronous and asynchronous communication in distributed optimization.
- Consideration of device-centric communication schemes in federated networks.

### Heterogeneity in [[Federated Machine Learning|Federated Learning]]

#### Heterogeneity Diagnostics

- Methods to quantify statistical heterogeneity.
- Development of diagnostics to gauge the levels of heterogeneity before training.
- Exploration of how heterogeneity can be leveraged for better-federated optimization convergence.

### Privacy Concerns

#### Granular Privacy Constraints

- Examination of local and global privacy definitions in federated networks.
- Proposing methods that respect device-specific or sample-specific privacy constraints.

### Extending the Scope of [[Federated Machine Learning|Federated Learning]]

#### Beyond Supervised Learning

- Addressing scenarios where data in federated networks is unlabeled or weakly labeled.
- Addressing tasks other than model fitting, such as exploratory data analysis, aggregate [[statistics]], or reinforcement learning.

### Operational Challenges

#### Productionizing [[Federated Machine Learning|Federated Learning]]

- Handling practical concerns like concept drift, diurnal variations, and cold start problems.

### Standards and Benchmarks

#### Benchmarks

- Emphasis on grounding [[Federated Machine Learning|federated learning]] research in real-world settings and datasets.
- Enhancing existing benchmarking tools to encourage reproducibility and the dissemination of solutions.
