---
title: 'P vs. NP problem'
date: 2022-04-28
excerpt: 'Poly-time Solvable versus Nondeterministic Polynomial Time'
slug: '/4DAB36'
---

## P: Poly-time Solvable

- Class of solvable and verifiable problems in polynomial time by a deterministic Turing machine.

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
