---
lang: 'en'
slug: '/F1A12C'
---

[[Grammarly Work Note]]

## Gate vs. Publish

The traditional 'Publish' release method involves rolling out a new application or feature across the entire user base, often through an [[app store]] release. This approach typically takes a considerable amount of time, often due to [[app store]] processes or user uptake. The 'Gate' mechanism, on the other hand, ships all of the code necessary for the new feature all at once, but the interfaces are controlled by the [[back-end]] and gradually enabled throughout the entire demographic. This method is more efficient between the experimental phase and the final roll-out.

## Data Infrastructure Team: Focus on Data Ingestion

Data ingestion, i.e., the process of importing data from existing sources, forms a critical part of the data infrastructure team's role. The team's project, referred to as the CDC project, focuses on transforming existing SQL data into a format usable by data scientists. The previous method for ingesting analytical data, [[GNAR]], is being deprecated by 60% and is being replaced by the end of Summer 2023. The new entity in charge of data ingestion is called '[[Sungari]].' The data ingestion process follows this flow:

- Data Engineering (Extraction)
- Data Processing
- Featurization
- Analytics (Feature Store → Serve data from [[Databricks]])

## Linguistic Data Check and Scaling

Aside from the central data ingestion pipeline, a separate system for Linguistic Data Checks exists. This system may perform quality control or contextual interpretation for linguistic data. The infrastructure deals with significant data logistics, scaling, and cost operations, striving to bridge real-time systems and batch systems. Currently, processes are under a 'Code Red' situation, indicating a challenging period requiring compromises and rapid changes.
