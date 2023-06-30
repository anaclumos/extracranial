---
lang: 'en'
slug: '/5F1646'
---

- [Block](https://block.xyz/)

Block Company outlined a series of real-world examples from applications like Square (payments), Cash App, Tidal, and TBD.

### Federation

The first building block is federation, which involves abstracting away the complexity by standardizing interfaces, allowing for seamless communication between different apps and databases. In this case, [[Databricks]] serves as an intermediate gateway, similar to the Unity catalog.

### Data Streaming and Computation

Each app is set to send all data to Kafka (provided by Confluent) with computation provided by [[Databricks]]. [[Databricks]] not only provides a compute layer but also handles historical data, which fuels the machine learning platform.

### Composability

Composability is the concept of having small, interacting components. It allows high-level problems to be broken down into functional pieces, contributing to more efficient problem-solving. Examples mentioned include Marketing ML for personalized business experiences and Risk ML for fraud detection.

### [[Datalake|Lakehouse]] Layers

The [[Datalake|Lakehouse]] model consists of several layers. The foundation is federated storage connected to the compute layer ([[Databricks]] jobs and clusters). This is followed by a feature calculation platform that takes business problems and translates them into actionable values. Then, there is a model training layer and an MLFlow layer for features and model training, providing a standardized method of storing and processing data. The final layer is model serving.

### Examples of [[Datalake|Lakehouse]] Layers

The compute, and federated storage layers feature payment aggregation, while features such as connected users are used for calculating fraud patterns. Risk training exists on top of the MLFlow layer, and the marketing layer is placed on the model training layer. Several feature providers are involved in the system. The LLM, LangChain, enriches the context from data and sits on the model serving layer.

### Support for Open Source Models

The [[Datalake|Lakehouse]] model supports open-source models, allowing for swapping between CPU, GPU, and models like MPT.

import DisplayFlex from '@site/src/components/DisplayFlex'

<DisplayFlex>

![[51DDDC.jpg]]
![[CAA9AF.jpg]]

</DisplayFlex>

<DisplayFlex>

![[1B8E12.jpg]]
![[F912EE.jpg]]

</DisplayFlex>

### Applications

Among the applications discussed were form filling, code generation, and fine-tuning.
