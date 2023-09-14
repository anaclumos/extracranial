---
lang: 'en'
slug: '/8429A4'
---

[[Project]] Florence is a research [[project]] on [[Vertical Federated Learning|VFL]]

- [x] [[Qiang Yang et al. Federated Machine Learning Concept and Applications]]
- [x] [[Tian Li et al. Federated Learning Challenges, Methods, and Future Directions]]
- [x] [[Daniele Romanini et al. PyVertical]]
- [ ] [[Nicola Rieke et al. The future of digital health with federated learning]]
- [ ] [[Qinbin Li et al. Federated Learning Systems. Vision, Hype, and Reality for Data Privacy and Protection]]
- [ ] [[Peter Kairouz et al. Advances and Open Problems in Federated Learning]]
- [ ] Record Linkage
- [ ] LR on [[Vertical Federated Learning|VFL]]
- [ ] Search Conferences
- [ ] [FederatedAI/FATE: An Industrial Grade Federated Learning Framework](https://github.com/FederatedAI/FATE): Did they implement [[Vertical Federated Learning|VFL]]?
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
- [ ] [A survey on federated learning: challenges and applications - PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9650178/)
- [ ] [Implementing Vertical Federated Learning Using Autoencoders: Practical Application, Generalizability, and Utility Study](https://www.researchgate.net/publication/352268331_Implementing_Vertical_Federated_Learning_Using_Autoencoders_Practical_Application_Generalizability_and_Utility_Study)
- [ ] [Achieving Differential Privacy in Vertically Partitioned Multiparty Learning](https://par.nsf.gov/servlets/purl/10321735)
- [ ] [Federated Learning for NLP](https://idmc.univ-lorraine.fr/wp-content/uploads/2021/09/12Supervised_Project_Bibliography_Final_Copy.pdf)

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
