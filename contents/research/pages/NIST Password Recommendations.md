---
lang: 'en'
slug: '/D967B3'
---

https://mastodon.social/@LukaszOlejnik/113193089731407165

GREAT change is approaching. NIST will standardise prohibition of requirement of composing passwords from various character styles, and requirement for periodic password changes. These are harmful and obsolete rules. Now they will be treated as a cybersecurity weakness

> The following requirements apply to passwords:
>
> 1. Verifiers and CSPs SHALL require passwords to be a minimum of eight characters in length and SHOULD require passwords to be a minimum of 15 characters in length.
> 2. Verifiers and CSPs SHOULD permit a maximum password length of at least 64 characters.
> 3. Verifiers and CSPs SHOULD accept all printing ASCII [RFC20] characters and the space character in passwords.
> 4. Verifiers and CSPs SHOULD accept Unicode [ISO/ISC 10646] characters in passwords. Each Unicode code point SHALL be counted as a single character when evaluating password length.
> 5. Verifiers and CSPs SHALL NOT impose other composition rules (e.g., requiring mixtures of different character types) for passwords.
> 6. Verifiers and CSPs SHALL NOT require users to change passwords periodically. However, verifiers SHALL force a change if there is evidence of compromise of the authenticator.
> 7. Verifiers and CSPs SHALL NOT permit the subscriber to store a hint that is accessible to an unauthenticated claimant.
> 8. Verifiers and CSPs SHALL NOT prompt subscribers to use knowledge-based authentication (KBA) (e.g., "What was the name of your first pet?") or security questions when choosing passwords.
> 9. Verifiers SHALL verify the entire submitted password (i.e., not truncate it).
>
> If Unicode characters are accepted in passwords, the verifier SHOULD apply the normalization process for stabilized strings using either the NFKC or NFKD normalization defined in Sec. 12.1 of Unicode Normalization Forms [UAX15]. This process is applied before hashing the byte string that represents the password. Subscribers choosing passwords that contain Unicode characters SHOULD be advised that some endpoints may represent some characters differently, which would affect their ability to authenticate successfully.
