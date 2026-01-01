---
lang: 'en'
slug: '/EC9167'
---

[Sungari](https://gitlab.grammarly.io/data/data-ingestion) is a Schema Managed Data Ingestion at [[Grammarly]]. The old system at [[GNAR]] had several significant issues, including low scalability, poor stability, a mix of events in every Kinesis shard, and the use of JSON serialization/deserialization that consumed high amounts of CPU time and caused inconsistencies. The Sungari pipeline addresses these problems:

1. **Scalability and Stability**. The switch to [[Apache Kafka]] from [[Kinesis]], along with decoupling ingestion from indexing, will improve the scalability and stability of the system.
2. **Mixed Events and CPU Consumption**. By replacing JSON with Avro encoding and introducing event-level schema registration, the new pipeline will consume less CPU time and avoid data inconsistencies.
3. **Data Accessibility**. By making data land into rawEventTables at DeltaLake, the new pipeline allows data to be accessible to non-[[GNAR]] query engines and supports [[Upsert]] operations. Also, analytic data will be stored in parquet format in partitioned storage, eliminating the need for [[GNAR]] indexing jobs and further increasing data [[accessibility]].
4. **Consolidation and Simplification**. The new pipeline also plans to migrate all types of ingestion pipelines to the schema-based pipeline, reducing the number of schemas to under 2000 during migration.
