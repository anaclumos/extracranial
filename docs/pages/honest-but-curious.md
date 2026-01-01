---
lang: 'en'
slug: '/6E3015'
---

The term "honest-but-curious" is a security model often considered in the context of [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) ([FL](./../.././docs/pages/Federated%20Machine%20Learning.md)) and cryptographic protocols like [Secure Multi-Party Computation](./../.././docs/pages/Secure%20Multi-Party%20Computation.md) ([SMPC](./../.././docs/pages/Secure%20Multi-Party%20Computation.md)). In this model, participants are assumed to follow the protocol rules. Still, they are also curious to learn additional information about other participants' private data if they can do so within the confines of those rules.

### Characteristics of Honest-but-Curious Participants

1. **Protocol Adherence**. They execute the protocol as specified without deviation. This means they won't intentionally corrupt the computation or disseminate false information.
2. **Curiosity**. Although they stick to the protocol, they are curious about learning any additional information that might be gleaned from the data exposed during the protocol's execution.

### Implications for [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md)

In [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md), multiple parties collaborate to build a [machine-learning](./../.././docs/pages/ML.md) model without sharing their raw data. While the focus is to create a collective model that benefits all, each party is also interested in protecting sensitive data.

1. **Data Privacy**. In an honest-but-curious setting, parties would not break the protocol to steal data. However, they may use data exposed during honest protocol execution to learn more about others.
2. **Model Inference**. Even if a participant follows the [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) protocol correctly, they may still attempt to perform model or data inference attacks to understand something about other participants' data based on the model updates they receive.
3. **Risk Mitigation**. Knowing that the participants are honest-but-curious allows for incorporating specific privacy-preserving techniques like [differential privacy](./../.././docs/pages/Differential%20Privacy.md) or secure aggregation, designed to minimize the risk of exposing sensitive data.

### Security Measures

Various cryptographic techniques can be employed to mitigate the risks associated with honest-but-curious behavior:

1. **[Secure Multi-Party Computation](./../.././docs/pages/Secure%20Multi-Party%20Computation.md) ([SMPC](./../.././docs/pages/Secure%20Multi-Party%20Computation.md))**. Allows parties to jointly compute a function over their inputs while keeping those inputs private.
2. **[Homomorphic Encryption](./../.././docs/pages/Homomorphic%20Encryption.md)**. Allows computation on encrypted data, enabling the server to aggregate model updates without seeing individual updates.
3. **[Differential Privacy](./../.././docs/pages/Differential%20Privacy.md)**. Adds noise to the data or query results to guarantee that the output does not reveal sensitive information about any individual data point.

The honest-but-curious model represents a middle ground in the security landscape. It is less stringent than assuming that all parties are entirely trustworthy but more optimistic than considering the possibility of malicious actors who actively seek to undermine the protocol. Designing robust [Federated Learning](./../.././docs/pages/Federated%20Machine%20Learning.md) systems against honest-but-curious participants is a critical aspect of achieving effective and secure collaborative learning.
