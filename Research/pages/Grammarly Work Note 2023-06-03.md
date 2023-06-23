---
lang: 'en'
slug: '/7073A5'
---

[[Grammarly Work Note]]

- Add columns to the result table on Databricks.
- metric results table in data bricks
- Add more tables to `service.prod_experimentation.experiment_metrics_results.`
  and populate data

1. update the table in Databricks
   1. [results_init](https://grammarly-data.cloud.databricks.com/?o=4547565018768595#notebook/2233269491653154/command/2233269491653155) is the notebook to init the table
   2. study 'Databricks Schema enforcement.' By default, doesn't allow updating the schema
2. update how we write to the table
   1. [funnel](https://grammarly-data.cloud.databricks.com/?o=4547565018768595#notebook/2038372024021218/command/2428133841706729) Every notebook ends with `enrich_and_save_to_delta_table`
   2. fix [expmetricsutils](https://grammarly-data.cloud.databricks.com/?o=4547565018768595#notebook/2038372024021187/command/2428133841706674)

- What is MDE? Minimum Detectable Effect.
