---
lang: 'en'
slug: '/6D79FD'
---

A large portion of ML Engineer's work is focused on handling data, including the sourcing of data, its examination, cleansing, and feature computation. Training, which takes up only small percent of an ML Engineer's time, is generally performed offline. Currently, [[Grammarly]] uses two different feature stores in our operations — one for DynamoDB (suitable for costs) and one for Redis (ideal for speed.) However, the thought of merging these into a single, unified feature store is gaining appeal, given the potential efficiencies it could bring. The availability of an online feature store SDK further adds to this consideration, although our focus will likely be solely on the online part of the process.

In 2015, [[Grammarly]] Experiments transitioned from Mixpanel to a homegrown solution to better address our needs. However, this homegrown solution soon showed its limitations, as it struggled under excessive scale and required constant maintenance. Furthermore, its high degree of coupling posed issues, with more than 3,000 event streams writing to it and a conspicuous absence of schema enforcement. [[Grammarly]] used a demultiplexer to manage the heterogenous events, filter each event type, enforce a schema, and resolve any schema incompatibility between the batch and delta tables. More than 40 clients were utilizing this complex system, adding to its management challenges.
