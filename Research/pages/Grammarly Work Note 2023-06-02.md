---
lang: 'en'
slug: '/23630B'
---

A growth engineer's primary objective is to enhance product offerings and crucial metrics by analyzing data and conducting experiments. A growth engineer's specialization is in back-end development, which includes creating integrations and data pipelines. They are consistently seeking ways to upgrade data ingestion and access it rapidly and effectively. Grammarly's journey started with a JSON ingestion machine, enabling the input of all data. Since then, we have assisted numerous clients and experienced significant growth.

We offer data access by utilizing various data schemas for reading and writing. The process for providing access is through the use of a Document [[Database|DB]], which houses 6000 different tables. Additionally, we use the concept of a [[Datalake]] for ingesting data and defining schemas separately. From there, we query the data in our [[Datahouse]] and index metadata. Our system is built on Apache Spark with everything integrated within it. Finally, we implement GNAR and GQL on top of the meta store and Spark.
