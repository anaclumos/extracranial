---
lang: 'en'
slug: '/A9E773'
aliases: ['P vs. NP', 'P 대 NP', 'P-NP Problem', 'P-NP', 'P-NP 문제']
---

> If P=NP, then the world would be a profoundly different place than we usually assume it to be. There would be no special value in "creative leaps," no fundamental gap between solving a problem and recognizing a solution once it's found. Everyone who could appreciate a symphony would be Mozart; everyone who could follow a step-by-step argument would be Gauss. — Scott Aaronson

> Simplicity is the final achievement. After one has played a vast quantity of notes and more notes, it is simplicity that emerges as the crowning reward of art. — Chopin

> One day, I will find the right words, and they will be simple. — Jack Kerouac

### [Hard to Compute, Simple to Verify](https://matt-rickard.ghost.io/hard-to-compute-simple-to-verify/)

- But relaxing the definition of "hard to compute, simple to verify" lets us make some interesting analogies across different emerging technologies.
- There's public-key cryptography, which relies on things hard to compute, easy-to-verify problems like factorization of large integers, or [elliptic curve cryptography](https://matt-rickard.com/elliptic-curve-cryptography)
- There are also [zero-knowledge proofs](https://matt-rickard.com/zero-knowledge-proofs), which let counterparties prove that they know ng without revealing the actual secret
- Before [[LLM|LLMs]], generating the associated image took time if you were given a prompt. A talented artist could take a few hours (minutes, days, etc.) to create a polished piece. Once created, it would be easy to verify if it fits the criteria - is this an image of a horse wearing sunglasses?
- There are no problems that are easy to compute yet hard to verify. If such a problem existed, you could just re-run the computation again.

One such thing of **easy to compute yet hard to verify** can be tracking the time-based hash [[seed]], but this is only true depending on the definition of **confirming**. If verifying means giving input and comparing the output, yes, it is easy. It will be hard if verifying includes _finding_ the information **and** comparing the production. But then again, it also falls into another _hard-to-compute_ problem.

## P: Poly-time Solvable

- Class of solvable and verifiable problems in polynomial time by a deterministic [[Turing machine]].

## NP: Nondeterministic Polynomial Time

- Class of problems that are not sure if it's solvable in polynomial time but verifiable in polynomial time.

- To prove that a problem is in NP, we need an efficient certification: a certificate (a potential solution to the problem) and a certifier (a way to verify the answer in polynomial time).

## NP-Hard: Nondeterministic Polynomial Time-Hard

- It means "at least as hard as the hardest problems in NP."

- Not sure if it's solvable in poly-time.

- Not sure if it's verifiable in poly-time.

- To prove that a problem is NP-hard, we need to show that it is poly-time reducible to another NP-hard problem. That is, reduce another NP-hard problem in it.

## NP-Complete

Both NP and NP-Hard.
