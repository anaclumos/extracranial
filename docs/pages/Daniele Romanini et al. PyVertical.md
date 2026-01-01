---
lang: 'en'
slug: '/B00FD7'
---

The paper introduces the PyVertical framework for [vertical federated learning](./../.././docs/pages/Vertical%20Federated%20Learning.md) using split neural networks (SplitNNs). This framework facilitates training neural networks on vertically distributed data across multiple owners, ensuring that raw data remains on the owner's device. This vertical partitioning means that different entities own different [features](./../.././docs/pages/Feature.md) of the same dataset. Private Set Intersection (PSI) identifies and links common data points across these datasets without compromising privacy. To validate the effectiveness of PyVertical, the authors trained a split neural network on the MNIST dataset, with the data samples being split across two different owners and a third party (data scientist) overseeing the training.

## Introduction

- The challenge of utilizing data in isolated silos for [machine learning](./../.././docs/pages/ML.md) is highlighted. Issues arise, especially when this data is sensitive or legally protected.
- The paper introduces [Vertical Federated Learning](./../.././docs/pages/Vertical%20Federated%20Learning.md) ([VFL](./../.././docs/pages/Vertical%20Federated%20Learning.md)), which differs from the typical [horizontal federated learning](./../.././docs/pages/Horizontal%20Federated%20Learning.md). While horizontal partitioning distributes the same [features](./../.././docs/pages/Feature.md) across different owners, vertical partitioning scatters various [features](./../.././docs/pages/Feature.md) of the same data set. An example provided is a patient's medical data being held by other medical institutions.

## Contributions

- The authors expand on previous works to utilize Split Neural Networks (SplitNNs) and PSI in [Vertical Federated Learning](./../.././docs/pages/Vertical%20Federated%20Learning.md).
- The paper introduces PyVertical, a novel open-source framework for training on vertically partitioned datasets.

## Background and Related Work

### PSI (Private Set Intersection)

A cryptographic technique that lets two parties find common elements in their datasets without revealing any other information.

### Split Neural Networks

Neural networks are trained in parts, with different segments held by other parties.

### [Vertical Federated Learning](./../.././docs/pages/Vertical%20Federated%20Learning.md)

A method for collaboratively training a model on a dataset with its [features](./../.././docs/pages/Feature.md) distributed amongst various stakeholders.

## Framework Description

- PyVertical is a [Python](./../.././docs/pages/Python.md) framework that utilizes SplitNNs and PSI for [vertical federated learning](./../.././docs/pages/Vertical%20Federated%20Learning.md).
- The framework operates with one or more data owners and a data scientist. The scientist can set up a split neural network model, sending segments to the data owners for training.

## Experiment

- To demonstrate the framework's capabilities, the MNIST dataset was partitioned vertically, splitting the images into two halves, each given to different data owners. The neural network was then trained using this split data.

## Evaluation and Conclusion

- PyVertical has been launched as an open-source [project](./../.././docs/pages/Project.md) to help further research in [VFL](./../.././docs/pages/Vertical%20Federated%20Learning.md).
- The authors successfully trained a model using vertically partitioned data, establishing the proposed framework's viability.

## Limitations and Future Work

- The current experiment assumes all parties involved are honest. The authors highlight the need for identity management, ensuring PSI protocol adherence, and agreeing on data ID schemas.
- The work assumes an equal split of data points and identical model segments across data owners. Future endeavors could explore asymmetrical models and datasets.
- Single-headed.
  - The training framework is limited to two data owners and doesn't yet integrate advanced privacy-enhancing techniques like decentralized identities and [differential privacy](./../.././docs/pages/Differential%20Privacy.md).

## PyVertical Protocol

### Figures & Implementation

- **Figure 2** shows the PyVertical protocol applied to the MNIST dataset with just one data owner. This is based on the concept by Angelou et al. (2020), demonstrating [vertical federated learning](./../.././docs/pages/Vertical%20Federated%20Learning.md).
- **Figure 3** outlines a dual-headed PSI data linkage:
  1.  The Data Scientist finds the common elements with Data Owner 1.
  2.  A similar intersection is computed with Data Owner 2.
  3.  The Data Scientist calculates the overall intersection.
  4.  This depiction highlights how the data scientist conducts a single PSI with each data owner, sequentially or simultaneously.

### Experimental Setup

#### Data Owner Model

- It converts a 392-length input into a 64-length intermediate vector.
- Uses ReLU activation, which gives an abstract representation of the data.

#### Data Scientist Model

- Accepts a 128-length vector (made by joining data owner outputs).
- Converts this input into a 10-class vector (using softmax activation) that denotes potential digits in the MNIST dataset.
- Contains a 500-length hidden layer with a ReLU activation.
- All the layers in this model are fully connected.

#### Training Parameters

- Data owner model's learning rate: 0.01.
- Data scientist model's learning rate: 0.1.
- Data is grouped in batches of 128.
- Only the initial 20,000 training images of MNIST are used.
- The model is trained across 30 epochs.
