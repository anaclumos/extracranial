---
lang: 'en'
slug: '/F5DA51'
aliases: ['FTL']
---

Federated Transfer Learning (FTL) is a technique that can be applied when two datasets differ in their samples and [[feature]] space.

- Consider
  - a bank in China
  - an [[e-commerce]] company in the [[United States of America|United States]]
- Due to geographical restrictions, the user groups of these two institutions have only a small intersection.
- Because of their different businesses, there is only a tiny overlap in the [[feature]] space between the two parties.

To solve this [[problem]], transfer learning techniques can create a common representation between the two [[feature]] spaces. This is done using limited standard sample sets to learn the joint representation, which can then be used to make predictions for samples with only one-sided [[Feature|features]]. FTL is an essential extension of existing [[Federated Machine Learning|federated learning]] systems because it deals with problems beyond existing algorithms' scope.
