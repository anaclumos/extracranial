---
lang: 'en'
slug: '/807ED4'
---

- https://doi.org/10.48550/arXiv.1902.04885

## Intro

- Data exists in isolated islands
- More security required

## First [[Federated Machine Learning|FML]] framework by [[Google]], 2016

- Horizontal [[Federated Machine Learning|FL]]
- Vertical [[Federated Machine Learning|FL]]
- Federated Transfer Learnings

## Traditional Data Processing Models

- aka Simple Data Transaction Model
- 3 parties
  - Data Collector
  - Data Sanitizer
  - [[ML]] Trainer
- Privacy concerns

## Overview

- aim to extend to **all privacy-preserving decentralized collaborative [[ML|machine learning]] techniques.**
- simple definition
  - $N$ parties federate their data without exposing them to each other to attain performance closely comparable to the model trained as if all the information were gathered.
- [[Secure Multi-Party Computation]]. jointly compute over their inputs while keeping those inputs private.
- [[Differential Privacy]]. Add random noise to the data, making identifying any individual's data in the aggregate results difficult.
- [[Homomorphic Encryption]]. allows computations on encrypted data without requiring decryption
- [[Indirect Information Leakage]]
  - Considered Blockchained [[Federated Machine Learning|FL]] architectures

## Categorization of [[Federated Machine Learning|Federated Learning]]

- [[Feature]]
- [[Horizontal Federated Learning]]. sample-based [[Federated Machine Learning|FL]]
  - Deep Gradient Compression to share data efficiently
  - assumes honest participants and security against [[honest-but-curious]] servers.
- [[Vertical Federated Learning]]. [[feature]]-based [[Federated Machine Learning|FL]]
  - assumes [[honest-but-curious]] participants
- [[Federated Transfer Learning]]
  - Security measures are similar to [[Vertical Federated Learning|VFL]]

## Architecture

## [[Horizontal Federated Learning]]

- Participants compute locally, send to server
- Server aggregates global model, distributes to participants
- Participants update their local model

## [[Vertical Federated Learning]]

- We need an intermediary collaborator.
- Step 1: Collaborator C creates encryption pairs and sends the public key to A and B.
- Step 2: A and B encrypt and exchange the intermediate results for gradient and loss calculations.
- Step 3: A and B compute encrypted gradients and adds additional mask, respectively, and B also calculates encrypted loss; A and B send encrypted values to C.
- Step 4: C decrypts and sends the decrypted gradients and loss back to A and B; A and B unmask the gradients and update the model parameters accordingly.

## Privacy-preserving [[ML|Machine Learning]]

Privacy-preserving [[ML|machine learning]] is designed to perform learning while keeping data private.

### Techniques

- [[Federated Machine Learning|Federated learning]]. A decentralized collaborative [[ML|machine learning]] method.
- [[Secure multi-party computation]] ([[Secure Multi-Party Computation|SMC]]): Provides privacy guarantees.
- Secure multi-party decision trees, k-means, Naive Bayes classifier, etc.: Algorithms for various [[ML|machine learning]] tasks with privacy preservation.
- [[Homomorphic encryption]]. Allows computation on encrypted data without decryption, ensuring privacy.
- Yao's garbled circuits: Another privacy-preserving computation method.

## [[Federated Machine Learning|Federated Learning]] vs. Other Concepts

### Distributed [[ML|Machine Learning]]

- Distributed [[ML]] focuses on distributed storage and operation.
- Uses tools like "Parameter Server" to efficiently store and compute.
- Differences with [[Federated Machine Learning|Federated Learning]]:
  - Data privacy emphasis in [[Federated Machine Learning|Federated Learning]].
  - Distributed [[ML]] centralizes control, while [[Federated Machine Learning|Federated Learning]] decentralizes control to data owners.

### [[Edge Computing]]

- [[Federated Machine Learning|Federated learning]] serves as a protocol for [[edge computing]].
- To optimize learning, focus on determining the best trade-off for local updates and global aggregation.

### Federated [[Database]] Systems

- These systems integrate multiple databases.
- Differences with [[Federated Machine Learning|Federated Learning]]:
  - No privacy mechanisms in federated [[database]] interactions.
  - [[Federated Machine Learning|Federated learning]] aims to create a unified model across different data owners with privacy.

## Applications of [[Federated Machine Learning|Federated Learning]]

### Smart Retail

- Personalize services such as product recommendations.
- Challenges: Data privacy, security, and heterogeneity across different entities (e.g., banks, social networks, e-shops).
- Solution: [[Federated Machine Learning|Federated learning]] can train models without sharing raw data, thus overcoming privacy barriers.

### [[Finance]]

- Detect multi-party borrowing which is a risk to the industry.
- [[Federated Machine Learning|Federated learning]] can help find malicious borrowers without exposing user lists.

### Smart Healthcare

- Challenges: Sensitive medical data scattered across isolated centers.
- Solution: [[Federated Machine Learning|Federated learning]] combined with transfer learning can share model insights without sharing patient data.

## [[Federated Machine Learning|Federated Learning]] as a Business Model

### Traditional Approach

Aggregate data, use [[cloud computing]] to compute models, then use results.

### With [[Federated Machine Learning|Federated Learning]]

- Data stays where it is; only model insights are shared.
- Privacy and data security are prioritized.
- Offers a new paradigm for big data applications.
- Can use [[blockchain]] for profit allocation in a data alliance.
- Calls for establishing standards for [[Federated Machine Learning|federated learning]] for faster adoption.
