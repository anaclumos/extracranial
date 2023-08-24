---
lang: 'en'
slug: '/7A2A8B'
aliases: ['Federated Learning', 'Federative Training', 'FL', 'FML']
---

```
Repeat For each client (in parallel):
	1. Receive global model (R1 - R3)
	2. Train global model on a local dataset
	3. Reply local model (R4 - R6)
	Aggregate local models into a new global model
For T rounds
```

Federated learning is a privacy-preserving [[ML|machine learning]] approach that enables multiple parties to train a [[ML|machine learning]] model collaboratively without sharing their data with a central server. The goal is to allow the parties to jointly learn a model representative of their collective data while preserving the privacy of individual data points. In federated learning, each party trains a local model on their data then sends updates of the model's parameters to a central server, aggregating the updates to create a new global model. The process is repeated iteratively until the global model converges to a satisfactory level of accuracy.

To preserve privacy, [[differential privacy]] adds noise to the updates before they are sent to the central server. This makes it difficult for any party to learn anything about the data of the other parties from the updates while still allowing the server to aggregate the updates and learn from the collective data.

1. Privacy preservation: Federated learning with [[differential privacy]] allows parties to train [[ML|machine learning]] models on their private data without sharing it with others or a central server.
2. Data locality: Federated learning with [[differential privacy]] enables parties to train models on their local data without transferring it to a central server, reducing the risk of data breaches and data leaks.
3. Increased model accuracy: By training on a more extensive and diverse dataset, federated learning can lead to more accurate models than training on individual datasets.
4. Resource efficiency: Federated learning can be more resource-efficient than traditional centralized [[ML|machine learning]], as it reduces the need for data transfer and storage.
