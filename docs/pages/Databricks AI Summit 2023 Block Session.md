---
lang: 'en'
slug: '/5F1646'
---

- [Block](https://block.xyz/)

Block Company outlined a series of real-world examples from applications like Square (payments), Cash App, Tidal, and TBD.

### Federation

The first building block is federation, which involves abstracting away the complexity by standardizing interfaces, allowing for seamless communication between different apps and databases. In this case, [Databricks](./../.././docs/pages/Databricks.md) serves as an intermediate gateway, similar to the Unity catalog.

### Data Streaming and Computation

Each app is set to send all data to Kafka (provided by Confluent) with computation provided by [Databricks](./../.././docs/pages/Databricks.md). [Databricks](./../.././docs/pages/Databricks.md) not only provides a compute layer but also handles historical data, which fuels the [machine learning](./../.././docs/pages/ML.md) platform.

### Composability

Composability is the concept of having small, interacting components. It allows high-level problems to be broken down into functional pieces, contributing to more efficient problem-solving. Examples mentioned include Marketing [ML](./../.././docs/pages/ML.md) for personalized business experiences and Risk [ML](./../.././docs/pages/ML.md) for fraud detection.

### [Lakehouse](./../.././docs/pages/Datalake.md) Layers

The [Lakehouse](./../.././docs/pages/Datalake.md) model consists of several layers. The foundation is federated storage connected to the compute layer ([Databricks](./../.././docs/pages/Databricks.md) jobs and clusters). This is followed by a feature calculation platform that takes business problems and translates them into actionable values. Then, there is a model training layer and an MLFlow layer for features and model training, providing a standardized method of storing and processing data. The final layer is model serving.

### Examples of [Lakehouse](./../.././docs/pages/Datalake.md) Layers

The compute, and federated storage layers feature payment aggregation, while features such as connected users are used for calculating fraud patterns. Risk training exists on top of the MLFlow layer, and the marketing layer is placed on the model training layer. Several feature providers are involved in the system. The [LLM](./../.././docs/pages/LLM.md), LangChain, enriches the context from data and sits on the model serving layer.

### Support for Open Source Models

The [Lakehouse](./../.././docs/pages/Datalake.md) model supports open-source models, allowing for swapping between [CPU](./../.././docs/pages/CPU.md), [GPU](./../.././docs/pages/GPU.md), and models like MPT.

;

<Horizontal>

<figure>

![51DDDC.jpg](./../.././docs/assets/51DDDC.jpg)

</figure>

<figure>

![CAA9AF.jpg](./../.././docs/assets/CAA9AF.jpg)

</figure>

</Horizontal>

<Horizontal>

<figure>

![1B8E12.jpg](./../.././docs/assets/1B8E12.jpg)

</figure>

<figure>

![F912EE.jpg](./../.././docs/assets/F912EE.jpg)

</figure>

</Horizontal>

### Applications

Among the applications discussed were form filling, code generation, and fine-tuning.
