---
lang: 'en'
slug: '/C9987D'
aliases: ['SMPC', 'SMC', 'Secure Multi-Party Computations']
---

Secure Multi-Party Computation (SMC) is a cryptography subfield that allows parties to jointly compute a function over their inputs while keeping those inputs private. In simpler terms, multiple parties can collaborate to compute some result without revealing their data to each other. The result is derived so that, ideally, no particular party can determine any information about the others' private inputs.

### How Does It Work?

The fundamental idea is to split each sensitive input into multiple "shares" distributed among the participants. When viewed individually, these shares are computed to reveal nothing about the original data. The parties then perform computations on these shares, passing them between each other as needed. After the computation is complete, the shares of the result are combined to reveal the final answer, which is made known to all participating parties (or to whichever parties are designated to receive the output). The individual shares are designed so that the original inputs cannot be reconstructed unless a party has access to all (or a quorum of) the claims.

### Examples

1. **Secure Voting**. SMC can be used to tally votes without exposing who voted for whom.

2. **Private Set Intersection**. Two companies might want to find out which customers they have in common without revealing their entire customer lists to each other.

3. **Medical Research**. Multiple hospitals might want to jointly compute statistical data related to disease while preserving the confidentiality of individual patient records.

### Protocols and Techniques

1. **Yao's Garbled Circuits**. A technique to represent any function as an obfuscated "circuit" so that one party can evaluate it without learning additional information.
2. **Secret Sharing Schemes**. Like Shamir's Secret Sharing, a secret is divided into parts and distributed among participants.
3. **[[Homomorphic Encryption]]**. A kind of encryption that allows computations to be performed on encrypted data without decrypting it.
4. **Oblivious Transfer**. A way to allow one party to receive information from another such that the sender does not know which data the receiver obtained.

### Challenges and Limitations

1. **Computational Overhead**. SMC protocols are often computationally intensive, which can be a barrier for large-scale or real-time applications.
2. **Communication Overhead**. In many cases, sending shares and other information between parties can consume significant bandwidth.
3. **Trust Assumptions**. Depending on the specific protocol, some trust may be required among participating parties or in a third-party facilitator.
4. **Error Handling**. Handling errors or dropouts from some parties can be complex.
5. **Adversarial Attacks**. Securing the protocol against malicious actors who might try to subvert the computation is also challenging.
