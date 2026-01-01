---
lang: 'en'
slug: '/37F33F'
---

[Grammarly Work Note](./../.././docs/pages/Grammarly%20Work%20Note.md)

## Optimal Resource Utilization and Cost Reduction [Strategies](./../.././docs/pages/Strategy.md) for [Databricks](./../.././docs/pages/Databricks.md) Clusters

Today [Grammarly Experimentations Team](./../.././docs/pages/Grammarly%20Experimentations%20Team.md) discussed [strategies](./../.././docs/pages/Strategy.md) to reduce cost in a large-scale [Databricks](./../.././docs/pages/Databricks.md) environment, where we experienced a recent spike in usage.

### Background

[Grammarly Experimentations Team](./../.././docs/pages/Grammarly%20Experimentations%20Team.md) detected a surge in resource usage in our [Databricks](./../.././docs/pages/Databricks.md) environment around May. Since we added five default metrics to each experiment and are conducting around 60 experiments simultaneously, the daily volume of metrics being processed has significantly increased. As a result, we have observed a corresponding rise in costs.

### Solutions to Explore

- **Auto-Scaling Reduction**. Given the considerable setup time, we can reduce the minimum number for auto-scaling from 10 to 1 as we use `4xlarge` nodes.
- **Creation of Instance Pools**. [Grammarly Experimentations Team](./../.././docs/pages/Grammarly%20Experimentations%20Team.md) aim to create instance pools for worker nodes with a minimum item instance set to 0. This configuration will ensure that nodes do not persist after job completion, improving cost efficiency. Instance pools also provide the flexibility to add new jobs on the fly.
- **Utilization of Cheaper [AWS](./../.././docs/pages/AWS.md) Instances**. [Grammarly Experimentations Team](./../.././docs/pages/Grammarly%20Experimentations%20Team.md) plans to explore using more cost-effective [AWS](./../.././docs/pages/AWS.md) instances. Our analysis suggests that the currently utilized `i3` nodes may not be necessary for these jobs. We could save costs by transitioning to more compute-optimized machines instead of the current storage-optimized ones.
- **Reduction of [Cluster](./../.././docs/pages/Clustering.md) Spinning for Non-[GNAR](./../.././docs/pages/GNAR.md) Runtime Jobs**. For tasks that do not use the [GNAR](./../.././docs/pages/GNAR.md) runtime, we can reduce the number of new clusters we spin up.
- **[GNAR](./../.././docs/pages/GNAR.md) Runtime across Multiple Notebooks**. [Grammarly Experimentations Team](./../.././docs/pages/Grammarly%20Experimentations%20Team.md) plan to investigate running [GNAR](./../.././docs/pages/GNAR.md) across multiple notebooks within the same [cluster](./../.././docs/pages/Clustering.md). Currently, the [GNAR](./../.././docs/pages/GNAR.md) object requires reloading with every task, contributing significantly to setup time.

## [Case-Sensitivity](./../.././docs/pages/Case-Sensitivity.md)

Our team encountered a bug related to case sensitivity recently. Despite the common notion that making it insensitive would improve reachability by catching more cases in a fuzzy manner, we discovered that using both sensitive and insensitive systems can lead to unhandled edges, as we experienced today.
