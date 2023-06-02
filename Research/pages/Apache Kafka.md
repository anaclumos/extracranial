---
lang: 'en'
slug: '/14A712'
---

[[Apache]] Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications. Developed by the [[Apache|Apache Software Foundation]], Kafka was initially developed at LinkedIn and became a part of the [[Apache]] project in 2011. Kafka is designed to handle real-time data feeds with low latency and high efficiency. It is beneficial for tracking service calls (like clicks or page views on a website) or tracking IoT sensor data.

- Kafka can be spread across multiple servers for a higher degree of fault tolerance. The distributed nature of Kafka makes it incredibly scalable — you can increase the capacity of your applications by simply adding more servers to them.
- Kafka works in real time, with the messages available to subscribers immediately after being published.
- Messages in Kafka are redundant and replicated across multiple nodes, making the system resilient to node failures.
- Kafka persists messages on the disk, which provides intra-cluster replication. Hence messages continue on disk as fast as possible, preventing data loss.
- Kafka supports the processing of high volumes of messages to keep real-time data feeds.
