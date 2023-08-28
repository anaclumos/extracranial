---
lang: 'en'
slug: '/807ED4'
---

- https://doi.org/10.48550/arXiv.1902.04885

## Intro

- Data exists in isolated islands
- More security required

### First [[Federated Machine Learning|FML]] framework by [[Google]], 2016

- Horizontal [[Federated Machine Learning|FL]]
- Vertical [[Federated Machine Learning|FL]]
- Federated Transfer Learnings

### Traditional Data Processing Models

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

### Categorization of [[Federated Machine Learning|Federated Learning]]

- [[Feature]]
- [[Horizontal Federated Learning]]. sample-based [[Federated Machine Learning|FL]]
  - Deep Gradient Compression to share data efficiently
  - assumes honest participants and security against [[honest-but-curious]] servers.
- [[Vertical Federated Learning]]. [[feature]]-based [[Federated Machine Learning|FL]]
  - assumes [[honest-but-curious]] participants
- [[Federated Transfer Learning]]
  - Security measures are similar to [[Vertical Federated Learning|VFL]]

## Architecture

- [[Horizontal Federated Learning]]
  - Participants compute locally, send to server
  - Server aggregates global model, distributes to participants
  - Participants update their local model
- [[Vertical Federated Learning]]
  - We need an intermediary collaborator.
    - Step 1: Collaborator C creates encryption pairs and sends the public key to A and B.
    - Step 2: A and B encrypt and exchange the intermediate results for gradient and loss calculations.
    - Step 3: A and B compute encrypted gradients and adds additional mask, respectively, and B also calculates encrypted loss; A and B send encrypted values to C.
    - Step 4: C decrypts and sends the decrypted gradients and loss back to A and B; A and B unmask the gradients and update the model parameters accordingly.
