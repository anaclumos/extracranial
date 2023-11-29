---
lang: 'en'
slug: '/8429A4'
---

- [[Project]] Florence is a research [[project]] on [[Vertical Federated Learning|VFL]]
- [[Project Florence Literature Review]]

## [[2023-11-16]]

![[8C3CC0.png]]

## [[Project Impruneta]]

## [[2023-10-17]]

- [[Project Malmantile]]

## [[2023-10-03]]

- [[Project Fiesole]]

## [[2023-09-22]]

1. Approaches to vertical federated learning
   - Train a network that performs well when given all 20 input parameters
   - Train a network that can make good predictions even with only 10 input parameters
   - Start by testing a simple approach: train on half the data from each site, average the gradients, and repeat
   - Run experiments on MNIST data by splitting images in half and training on the halves separately
1. Challenges
   - Networks trained on half the data may not learn interactions between the two halves
   - Training on single examples at a time is impractical; need to use batches for efficiency
1. Experiments proposed
   - Train a network on full MNIST images to get a baseline performance
   - Train networks on half MNIST images to see performance drop
   - Train networks by alternating between the two halves of examples, averaging the weights, to see if performance improves over training on halves alone
1. The next steps if this approach works
   - Try training on batches instead of single examples
   - Experiment with training for multiple epochs instead of single iterations

## [[2023-09-14]]

Can't we just ensemble them-?

1. Federated learning and split learning
   - Discuss split training versus federated learning
   - Federated learning converges to a better optimization point than ensembling independently trained models
   - Split learning involves training parts of the network at different sites
1. Vertical partitioning of data
   - Vertical partitioning of features across different sites can lead to poor individual predictors
   - Training a model that combines the data in a more sophisticated way may perform better
   - Focus on implementations that do not require training parts of the network at a central node
1. Next steps
   - Look into existing implementations of split learning and vertical partitioning
   - Focus on approaches using deep learning rather than classical models
   - Assume the record linkage problem is solved and focus on the training approach
1. Action items
   - Search for relevant papers that meet the criteria
   - Filter out papers using classical models instead of neural networks

## [[2023-08-28]]

1. [[Vertical Federated Learning]]
   - The goal is to train a model using data from multiple sites without sharing the raw data.
   - Each site may have different [[Feature|features]]/columns in their data, but some overlap.
   - The challenge is training parts of the network using the data available at each site.
1. Record Linkage
   - Matching records across sites to identify which records represent the same entity.
   - Can be done using properties like name, address, phone number, and string similarity.
1. Inference
   - Once the model is trained, inference is done globally using all available data for an entity, not just at one site.
1. Potential Conferences
   - NeurIPS in May 2024 is a good target conference. Earlier deadlines may be too soon.
1. Meeting Plans
   - Thursdays at 2 p.m. at ISI or remotely if needed.
