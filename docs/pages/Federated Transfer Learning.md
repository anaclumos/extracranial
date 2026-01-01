---
lang: 'en'
slug: '/F5DA51'
aliases: ['FTL']
---

Federated Transfer Learning (FTL) is a technique that can be applied when two datasets differ in their samples and [feature](./../.././docs/pages/Feature.md) space.

- Consider
  - a bank in China
  - an [e-commerce](./../.././docs/pages/e-commerce.md) company in the [United States](./../.././docs/pages/United%20States%20of%20America.md)
- Due to geographical restrictions, the user groups of these two institutions have only a small intersection.
- Because of their different businesses, there is only a tiny overlap in the [feature](./../.././docs/pages/Feature.md) space between the two parties.

To solve this [problem](./../.././docs/pages/Problem.md), transfer learning techniques can create a common representation between the two [feature](./../.././docs/pages/Feature.md) spaces. This is done using limited standard sample sets to learn the joint representation, which can then be used to make predictions for samples with only one-sided [features](./../.././docs/pages/Feature.md). FTL is an essential extension of existing [federated learning](./../.././docs/pages/Federated%20Machine%20Learning.md) systems because it deals with problems beyond existing algorithms' scope.
