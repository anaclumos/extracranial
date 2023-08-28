---
lang: 'en'
slug: '/3624C1'
---

Homomorphic encryption is a specialized form that allows computations on encrypted data without requiring decryption. The computation result is also encrypted and can be decrypted to reveal the correct output. This enables secure data analysis and manipulation in encrypted form, protecting the data from unauthorized access even during computation.

### Types of Homomorphic Encryption

1. **Partially Homomorphic Encryption (PHE)**. Allows addition or multiplication operations, but not both, to be performed on encrypted data. RSA encryption, for example, is multiplicatively homomorphic.
2. **Somewhat Homomorphic Encryption (SHE)**. Allows both addition and multiplication, but only to a limited extent, due to issues like noise growth, which limits the number of operations that can be performed.
3. **Fully Homomorphic Encryption (FHE)**. Allows both addition and multiplication on encrypted data an unlimited number of times. FHE is the most flexible but also the most computationally intensive.

### How It Works

1. Alice encrypts a number $x$ into $\text{Enc}(x)$ and another number $y$ into $\text{Enc}(y)$.
2. Alice sends $\text{Enc}(x)$ and $\text{Enc}(y)$ to Bob, who does not have the decryption key.
3. Bob performs an encrypted addition operation: $\text{Enc}(x) \oplus \text{Enc}(y)$, and gets $\text{Enc}(x + y)$.
4. Bob sends $\text{Enc}(x + y)$ back to Alice.
5. Alice decrypts $\text{Enc}(x + y)$ to get $x+y$, the correct sum of $x$ and $y$.

Throughout the process, Bob never needs to know the actual values of $x$ and $y$ to perform the computation.

### Applications

1. **Secure Data Analysis**. Companies can analyze user data without access to the sensitive data.
2. **Privacy-Preserving Medical Research**. Researchers can perform computations on encrypted medical data without compromising patient privacy.
3. **Secure Voting Systems**. Homomorphic encryption can tally votes without revealing who voted for whom.
4. **[[Cloud Computing]]**. Users can store encrypted data in the cloud and run computations on it directly without needing to decrypt it first.

### Challenges

1. **Computational Cost**. Fully Homomorphic Encryption is computationally intensive, which limits its practical applicability.
2. **Noise Growth**. Operations on encrypted data introduce "noise," which can eventually make the data undecryptable if not correctly managed.
3. **Complexity**. Implementing and maintaining homomorphic encryption systems can be complex and requires specialized knowledge.
