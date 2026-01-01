---
lang: 'en'
slug: '/664F0C'
---

- Attended [CS Colloquium](./../.././docs/pages/CS%20Colloquium.md) on [2023-03-28](./../.././docs/journals/2023-03-28.md).
- [[2012.08680] Trex: Learning Execution Semantics from Micro-Traces for Binary Similarity](https://arxiv.org/abs/2012.08680)
- In [Natural Language](./../.././docs/pages/Natural%20Language.md), semantics usually release info about surroundings
- In Binary, not so much.
- We can't do Dynamic Analysis due to Scalability problems.
- Teach [AI](./../.././docs/pages/AI.md) approximate learning on binary code instructions and make mental executions.
  - Dynamic Execution has coverage problems.
  - So here, we set arbitrary registers to run small code. This is for pre-training purposes, not to make accurate extrapolations.
- Masked [Language](./../.././docs/pages/Language.md) Modeling. Mask certain portions of binaries and make the [AI](./../.././docs/pages/AI.md) guess.
- Questions may arise in Microexecutions and Logical reasoning. Employing Higher level programming [language](./../.././docs/pages/Language.md) mapping is possible often, but not researched through.
- Now, fine-tune this to use static analysis.
- Can analyze Semantically Similar Binary Functions
- Function Dependencies and Signatures are also predictable
- Can find vulnerabilities
- Limitations: in-code only. Cannot find multimodal programming vulnerabilities. i.e., involving many interacting components.
