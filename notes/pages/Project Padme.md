---
lang: 'en'
slug: '/A98ACB'
---

Build an **interaction effects calculator** for [[Manakin]].

- Give our PMs a tool to answer:

> For experiments $A$ and $B$ running at the same time, is there an interaction effect relative to some metric $X$, where presence in experiment $A$'s group $G1$ influences the **effect size** between control and treatment in experiment $B$? If so, what is the size and confidence?

## Technologies and Languages

- [[Java]], Spring Boot
- TypeScript, React
- SparkSQL, Scala, Python

## Midpoint Milestone

- Evaluated a Technical Design and confirmed it applies to all metric templates
  - Accounted for any potential refactoring work needed to support this project without excessive tech debt
  - Reviewed the design for future refactoring of our metric structure
- A way to submit a job that takes:
  - two experiment names
  - metric definition
  - range of dates
- A table set up in [[Databricks]] with the proper schema to record the results of each job run
  - should consider multiple runs with the same parameters
  - should consider how the data displays in our UI for efficient layout
- A library that combines given parameters to start a computation job on [[Databricks]]
- Limitations:
  - This could be limited to only one, but not all templates
  - The way to submit the job might be pretty manual

## Desired Outcome

- A workflow that allows a user of our experimentation framework to request calculating interactions between two experiments on one metric
- Interactions calculated in the past are displayed to all users in an easy-to-find place

## Further Improvements

- A user-friendly UI that reflects all past and current pending runs.
- Automated set of jobs that get scheduled for high-impact experiments and a subset of metrics

## Dependencies

- Primarily decoupled from any other projects on the team, however
  - The technical design needs to align with our long-term vision
  - UI design needs to be done by the intern with limited support from [Pasha Krasilnikov](mailto:pasha.krasilnikov@grammarly.com)
