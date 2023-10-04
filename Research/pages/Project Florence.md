---
lang: 'en'
slug: '/8429A4'
---

[[Project]] Florence is a research [[project]] on [[Vertical Federated Learning|VFL]]

- [x] [[Qiang Yang et al. Federated Machine Learning Concept and Applications]]
- [x] [[Tian Li et al. Federated Learning Challenges, Methods, and Future Directions]]
- [x] [[Daniele Romanini et al. PyVertical]]
- [x] Record Linkage
- [x] [FederatedAI/FATE: An Industrial Grade Federated Learning Framework](https://github.com/FederatedAI/FATE): Did they implement [[Vertical Federated Learning|VFL]]. Yes. [FATE/doc/2.0/fate/ml/hetero_secureboost_tutorial.ipynb at v2.0.0-beta · FederatedAI/FATE](https://github.com/FederatedAI/FATE/blob/v2.0.0-beta/doc/2.0/fate/ml/hetero_secureboost_tutorial.ipynb)
- [ ] [[Nicola Rieke et al. The future of digital health with federated learning]]
- [ ] [[Qinbin Li et al. Federated Learning Systems. Vision, Hype, and Reality for Data Privacy and Protection]]
- [ ] [[Peter Kairouz et al. Advances and Open Problems in Federated Learning]]
- [ ] [[Jose Luis Ambite et al. Secure & Private Federated Neuroimaging]]
- [ ] [[Yuncheng Wu et al. Privacy-Preserving Vertical Federated Learning for Tree-based Models]]
- [ ] [[Xinjian Luo et al. Feature Inference Attack on Model Predictions in Vertical Federated Learning]]
- [ ] [[Yang Liu et al. Asymmetrical Vertical Federated Learning]]
- [ ] [[Tianyi Chen et al. VAFL a Method of Vertical Asynchronous Federated Learning]]
- [ ] [[Siwei Feng et al. Multi-Participant Multi-Class Vertical Federated Learning]]
- [ ] [[Yang Liu et al. Vertical Federated Learning]]
- [ ] [[Kang Wei et al. Vertical Federated Learning, Challenges, Methodologies and Experiments]]
- [ ] [[Shengwen Yang et al. Parallel Distributed Logistic Regression for Vertical Federated Learning without Third-Party Coordinator]]
- [ ] [[Qiang Yang et al. Chapter 5 Vertical Federated Learning]]
- [ ] PSI
- [ ] [A federated learning algorithm using a parallel-ensemble method on non-IID datasets | Complex & Intelligent Systems](https://link.springer.com/article/10.1007/s40747-023-01110-7)
- [ ] [A Survey on Vertical Federated Learning: From a Layered Perspective](https://arxiv.org/abs/2304.01829)
- [ ] [Fed-EINI: An Efficient and Interpretable Inference Framework for Decision Tree Ensembles in Federated Learning](https://arxiv.org/abs/2105.09540)
- [ ] [Multi-Participant Vertical Federated Learning Based Time Series Prediction](https://dl.acm.org/doi/abs/10.1145/3532213.3532238)
- [ ] [Federated Auto-Meta-Ensemble Learning Framework for AI-Enabled Military Operations](https://www.mdpi.com/2079-9292/12/2/430)
- [ ] [Online Bagging and Boosting Definition, Online Bagging and Boosting Use in ML](https://www.activeloop.ai/resources/glossary/online-bagging-and-boosting/)
- [ ] [A survey on federated learning: challenges and applications](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9650178/)
- [ ] [Implementing Vertical Federated Learning Using Autoencoders: Practical Application, Generalizability, and Utility Study](https://www.researchgate.net/publication/352268331_Implementing_Vertical_Federated_Learning_Using_Autoencoders_Practical_Application_Generalizability_and_Utility_Study)
- [ ] [Achieving Differential Privacy in Vertically Partitioned Multiparty Learning](https://par.nsf.gov/servlets/purl/10321735)
- [ ] [Federated Learning for NLP](https://idmc.univ-lorraine.fr/wp-content/uploads/2021/09/12Supervised_Project_Bibliography_Final_Copy.pdf)
- [ ] Split Training, Vertical Partitioning, SplitNN-driven Vertical Partitioning
- [ ] [Private federated learning on vertically partitioned data via entity resolution and additively homomorphic encryption](https://arxiv.org/abs/1711.10677)
- [ ] [Split Learning Project: MIT Media Lab](https://splitlearning.mit.edu/)
- [ ] [SplitNN-driven Vertical Partitioning](https://arxiv.org/abs/2008.04137v1)
- [ ] [Iker Ceballos](https://paperswithcode.com/search?q=author:Iker+Ceballos)

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
