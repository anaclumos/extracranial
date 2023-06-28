---
lang: 'en'
slug: '/A659E3'
---

# Databricks AI Summit 2023: Definitive Healthcare Session

Definitive Healthcare, an AI health company, has faced several challenges in managing and optimizing large-scale data. They shared their experiences and the solutions they found in a recent presentation.

### Problems Faced:

Definitive Healthcare encountered a range of complex issues in its data management:

1. The path toward data optimization was complicated and nuanced despite a clear goal.
2. They had hundreds of different assets, each requiring additional ETL processing and moving through various zones from landing to curating.
3. Data governance and compliance need under HIPAA/GDPR necessitated data silos.
4. There were knowledge gaps among end users, particularly concerning query optimization.
5. Humans and machines were constantly querying a significant volume of data.

### Data and Stakeholders:

Definitive Healthcare's data ecosystem was vast, with tables ranging from 111 records for Patient Transactions to 15M Expert Profiles for Scientific Affairs Data. The company had various stakeholders, including product teams, data science teams, custom predictive analytics teams, and data analysts. This meant managing a wide variety of needs, from ETL ingestion to custom predictive modeling.

### Databricks Lakehouse as a Solution:

Databricks' Lakehouse proved to be the right solution for Definitive Healthcare, meeting all the key priorities:

1. Capability to handle robust data pipelines for large-scale daily ETL ingestions.
2. Support for complete database restatements.
3. Provision of an enterprise data warehouse to manage the hundreds of inbound data sources and 24/7 data aggregation.
4. Availability of tooling for all stakeholders - data engineers, data management, data analytics, and data science.
5. Support for different programming languages such as SQL, Python, R, and Scala.
6. Ability to scale as per the requirements for maximizing work efficiencies.

While query performance was identified as critical, it could not compromise data integrity. Striking a balance between data optimization and integrity was essential.

### Key Features and Tools:

Definitive Healthcare leveraged vital features and tools of the Databricks Lakehouse:

1. The Unity Catalog to support data changes and restatements.
2. ACID transaction logs and time travel to monitor data changes and rollback if needed.
3. Dynamic partitions and Z-order to optimize performance as per application requirements.
4. Reserved and on-demand consumption options for flexibility.
5. Multi-level data security features and data sharing with auditing logs and tooling are crucial for compliance and data governance.
