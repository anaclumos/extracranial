---
lang: 'en'
slug: '/807ED4'
---

- [Federated Machine Learning: Concept and Applications](https://arxiv.org/abs/1902.04885)

## Intro

- Data exists in isolated islands
- More security required

## First [FML](./../.././docs/pages/Federated%20Machine%20Learning.md) framework by [Google](./../.././docs/pages/Google.md), 2016

- Horizontal [FL](./../.././docs/pages/Federated%20Machine%20Learning.md)
- Vertical [FL](./../.././docs/pages/Federated%20Machine%20Learning.md)
- Federated Transfer Learnings

## Traditional Data Processing Models

- aka Simple Data Transaction Model
- 3 parties
  - Data Collector
  - Data Sanitizer
  - [ML](./../.././docs/pages/ML.md) Trainer
- Privacy concerns

## Overview

- aim to extend to **all privacy-preserving decentralized collaborative [machine learning](./../.././docs/pages/ML.md) techniques.**
- simple definition
  - $N$ parties federate their data without exposing them to each other to attain performance closely comparable to the model trained as if all the information were gathered.
- [Secure Multi-Party Computation](./../.././docs/pages/Secure%20Multi-Party%20Computation.md). jointly compute over their inputs while keeping those inputs private.
- [Differential Privacy](./../.././docs/pages/Differential%20Privacy.md). Add random noise to the data, making identifying any individual's data in the aggregate results difficult.
- [Homomorphic Encryption](./../.././docs/pages/Homomorphic%20Encryption.md). allows computations on encrypted data without requiring decryption
- [Indirect Information Leakage](./../.././docs/pages/Indirect%20Information%20Leakage.md)
  - Considered Blockchained [FL](./../.././docs/pages/Federated%20Machine%20Learning.md) architectures

## Categorization of [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

- [Feature](./../.././docs/pages/Feature.md)
- [Horizontal Federated Learning](./../.././docs/pages/Horizontal%20Federated%20Learning.md). sample-based [FL](./../.././docs/pages/Federated%20Machine%20Learning.md)
  - Deep Gradient Compression to share data efficiently
  - assumes honest participants and security against [honest-but-curious](./../.././docs/pages/honest-but-curious.md) servers.
- [Vertical Federated Learning](./../.././docs/pages/Vertical%20Federated%20Learning.md). [feature](./../.././docs/pages/Feature.md)-based [FL](./../.././docs/pages/Federated%20Machine%20Learning.md)
  - assumes [honest-but-curious](./../.././docs/pages/honest-but-curious.md) participants
- [Federated Transfer Learning](./../.././docs/pages/Federated%20Transfer%20Learning.md)
  - Security measures are similar to [VFL](./../.././docs/pages/Vertical%20Federated%20Learning.md)

## Architecture

## [Horizontal Federated Learning](./../.././docs/pages/Horizontal%20Federated%20Learning.md)

- Participants compute locally, send to server
- Server aggregates global model, distributes to participants
- Participants update their local model

## [Vertical Federated Learning](./../.././docs/pages/Vertical%20Federated%20Learning.md)

- We need an intermediary collaborator.
- Step 1: Collaborator C creates encryption pairs and sends the public key to A and B.
- Step 2: A and B encrypt and exchange the intermediate results for gradient and loss calculations.
- Step 3: A and B compute encrypted gradients and adds additional mask, respectively, and B also calculates encrypted loss; A and B send encrypted values to C.
- Step 4: C decrypts and sends the decrypted gradients and loss back to A and B; A and B unmask the gradients and update the model parameters accordingly.

## Privacy-preserving [Machine Learning](./../.././docs/pages/ML.md)

Privacy-preserving [machine learning](./../.././docs/pages/ML.md) is designed to perform learning while keeping data private.

### Techniques

- [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md). A decentralized collaborative [machine learning](./../.././docs/pages/ML.md) method.
- [Secure multi-party computation](./../.././docs/pages/Secure%20Multi-Party%20Computation.md) ([SMC](./../.././docs/pages/Secure%20Multi-Party%20Computation.md)): Provides privacy guarantees.
- Secure multi-party decision trees, k-means, Naive Bayes classifier, etc.: Algorithms for various [machine learning](./../.././docs/pages/ML.md) tasks with privacy preservation.
- [Homomorphic encryption](./../.././docs/pages/Homomorphic%20Encryption.md). Allows computation on encrypted data without decryption, ensuring privacy.
- Yao's garbled circuits: Another privacy-preserving computation method.

## [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) vs. Other Concepts

### Distributed [Machine Learning](./../.././docs/pages/ML.md)

- Distributed [ML](./../.././docs/pages/ML.md) focuses on distributed storage and operation.
- Uses tools like "Parameter Server" to efficiently store and compute.
- Differences with [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md):
  - Data privacy emphasis in [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md).
  - Distributed [ML](./../.././docs/pages/ML.md) centralizes control, while [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) decentralizes control to data owners.

### [Edge Computing](./../.././docs/pages/Edge%20Computing.md)

- [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) serves as a protocol for [edge computing](./../.././docs/pages/Edge%20Computing.md).
- To optimize learning, focus on determining the best trade-off for local updates and global aggregation.

### Federated [Database](./../.././docs/pages/Database.md) Systems

- These systems integrate multiple databases.
- Differences with [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md):
  - No privacy mechanisms in federated [database](./../.././docs/pages/Database.md) interactions.
  - [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) aims to create a unified model across different data owners with privacy.

## Applications of [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

### Smart Retail

- Personalize services such as product recommendations.
- Challenges: Data privacy, security, and heterogeneity across different entities (e.g., banks, social networks, e-shops).
- Solution: [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) can train models without sharing raw data, thus overcoming privacy barriers.

### [Finance](./../.././docs/pages/Finance.md)

- Detect multi-party borrowing which is a risk to the industry.
- [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) can help find malicious borrowers without exposing user lists.

### Smart Healthcare

- Challenges: Sensitive medical data scattered across isolated centers.
- Solution: [Federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) combined with transfer learning can share model insights without sharing patient data.

## [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) as a Business Model

### Traditional Approach

Aggregate data, use [cloud computing](./../.././docs/pages/Cloud%20Computing.md) to compute models, then use results.

### With [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

- Data stays where it is; only model insights are shared.
- Privacy and data security are prioritized.
- Offers a new paradigm for big data applications.
- Can use [blockchain](./../.././docs/pages/Blockchain.md) for profit allocation in a data alliance.
- Calls for establishing standards for [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) for faster adoption.
