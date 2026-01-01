---
lang: 'en'
slug: '/23630B'
---

[Grammarly Work Note](./../.././docs/pages/Grammarly%20Work%20Note.md)

A growth engineer's primary objective is to enhance product offerings and crucial metrics by analyzing data and conducting experiments. A growth engineer's specialization is in [back-end](./../.././docs/pages/Back-end.md) development, which includes creating integrations and data pipelines. They are consistently seeking ways to upgrade data ingestion and access it rapidly and effectively. [Grammarly](./../.././docs/pages/Grammarly.md)'s journey started with a JSON ingestion machine, enabling the input of all data. Since then, we have assisted numerous clients and experienced significant growth.

We offer data access by utilizing various data schemas for reading and writing. The process for providing access is through the use of a Document [DB](./../.././docs/pages/Database.md), which houses 6000 different tables. Additionally, we use the concept of a [Datalake](./../.././docs/pages/Datalake.md) for ingesting data and defining schemas separately. From there, we query the data in our [Datahouse](./../.././docs/pages/Datahouse.md) and index [metadata](./../.././docs/pages/Metadata.md). Our system is built on Apache Spark with everything integrated within it. Finally, we implement [GNAR](./../.././docs/pages/GNAR.md) and GQL on top of the [meta store](./../.././docs/pages/Metastore.md) and Spark.
