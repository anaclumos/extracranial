---
lang: 'en'
slug: '/A2C433'
aliases: ['Sample-based Federated Learning', 'Horizontal FL', 'Sample-based FL', 'HFL']
---

Horizontal [[Federated Machine Learning|Federated Learning]], or sample-based [[Federated Machine Learning|federated learning]], is a type of [[Federated Machine Learning|Federated Learning]] where multiple parties collaborate to train a shared [[ML|machine learning]] model without directly exchanging their raw data. In Horizontal [[Federated Machine Learning|Federated Learning]], different parties possess different samples (or data points) but share the same [[feature]] set.

### Example

Let's consider a simple example involving multiple hospitals that want to build a [[ML|machine-learning]] model to predict patient readmission rates. Each hospital has collected data on various patient attributes like age, blood pressure, medical history, etc., which constitute the [[Feature|features]]. While each hospital has its own set of patients (samples), the attributes they collect ([[Feature|features]]) are the same across all hospitals.

### How it Works

1. **Initialization**. A global model is initialized, often on a centralized server.
2. **Local Training**. Each party trains the global model using its local dataset, generating a local model update (e.g., gradient updates).
3. **Model Aggregation**. All local updates are sent to the centralized server, aggregating them to produce an updated global model.
4. **Iteration**. Steps 2 and 3 are iteratively repeated until the model converges or meets other stopping criteria.

### Key Advantages

1. **Data Privacy**. Since raw data doesn't leave the local premises, the risk of data leakage is significantly reduced.
2. **Efficiency**. Horizontal [[Federated Machine Learning|Federated Learning]] enables efficient utilization of decentralized data.
3. **Scalability**. This approach can be easily scaled to include more parties, thus improving the model's predictive performance.

### Challenges

1. **Communication Overhead**. Transmitting local model updates to a centralized server can consume considerable bandwidth and time.
2. **Stragglers**. In a distributed network, some nodes might be slower than others, causing delays in global model updates.
3. **Security**. Although data is not directly shared, there could still be risks like model inversion attacks, potentially exposing information about the local datasets.
4. **Data Skew**. Different parties might have different data distributions, leading to challenges in model aggregation.

### Applications

Horizontal [[Federated Machine Learning|Federated Learning]] is particularly useful when data is naturally distributed across multiple entities, but each entity collects the same information. It is widely used in sectors like healthcare, [[finance]], and telecommunications. Using Horizontal [[Federated Machine Learning|Federated Learning]], organizations can benefit from collaborative [[ML|machine learning]] without compromising data privacy. This enables them to derive meaningful insights from a much larger and more diverse dataset than they would have access to individually.
