---
lang: 'en'
slug: '/37F33F'
---

[[Grammarly Work Note]]

## Optimal Resource Utilization and Cost Reduction [[Strategy|Strategies]] for [[Databricks]] Clusters

Today [[Grammarly Experimentations Team]] discussed [[Strategy|strategies]] to reduce cost in a large-scale [[Databricks]] environment, where we experienced a recent spike in usage.

### Background

[[Grammarly Experimentations Team]] detected a surge in resource usage in our [[Databricks]] environment around May. Since we added five default metrics to each experiment and are conducting around 60 experiments simultaneously, the daily volume of metrics being processed has significantly increased. As a result, we have observed a corresponding rise in costs.

### Solutions to Explore

- **Auto-Scaling Reduction**. Given the considerable setup time, we can reduce the minimum number for auto-scaling from 10 to 1 as we use `4xlarge` nodes.
- **Creation of Instance Pools**. [[Grammarly Experimentations Team]] aim to create instance pools for worker nodes with a minimum item instance set to 0. This configuration will ensure that nodes do not persist after job completion, improving cost efficiency. Instance pools also provide the flexibility to add new jobs on the fly.
- **Utilization of Cheaper [[AWS]] Instances**. [[Grammarly Experimentations Team]] plans to explore using more cost-effective [[AWS]] instances. Our analysis suggests that the currently utilized `i3` nodes may not be necessary for these jobs. We could save costs by transitioning to more compute-optimized machines instead of the current storage-optimized ones.
- **Reduction of [[Clustering|Cluster]] Spinning for Non-[[GNAR]] Runtime Jobs**. For tasks that do not use the [[GNAR]] runtime, we can reduce the number of new clusters we spin up.
- **[[GNAR]] Runtime across Multiple Notebooks**. [[Grammarly Experimentations Team]] plan to investigate running [[GNAR]] across multiple notebooks within the same [[Clustering|cluster]]. Currently, the [[GNAR]] object requires reloading with every task, contributing significantly to setup time.

## [[Case-Sensitivity]]

Our team encountered a bug related to case sensitivity recently. Despite the common notion that making it insensitive would improve reachability by catching more cases in a fuzzy manner, we discovered that using both sensitive and insensitive systems can lead to unhandled edges, as we experienced today.
