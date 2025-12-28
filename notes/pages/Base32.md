---
lang: 'en'
slug: '/62F568'
---

Base32 is a way to represent binary data in a text format using a restricted set of 32 alphanumeric characters, typically the uppercase letters A through Z and the digits 2 through 7. Defined in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648), it encodes every 5 bits of data into one character, which makes it easy to handle in systems that work best with human-readable text, such as QR codes, DNS, or secret keys in TOTP (Time-based One-Time Password) applications.

One of the main advantages of Base32 (especially compared to Base64) is that it avoids the use of symbols like `+` and `/`, making it safer for certain file systems and URLs. However, it typically produces slightly longer output than Base64 because each encoded character carries fewer bits of information.
