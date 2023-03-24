---
lang: 'en'
slug: '/BB07BF'
---

When navigating to www.amazon.com, the client asks

- Hey, Root Server! Where is `.com`? Oh, OK, thanks.
- Hey `.com` Server! Where is `amazon.com`? Oh, OK, thanks.
- Hey, `amazon.com` Server! Where is `www.amazon.com`? Oh, OK, thanks.

## Debugging DNS

- USC [[CS Colloquium]]
- DNS debugging are problematic because
  - no one-size-fit-all oracle (detector)
  - does not have a specification
- Domain name abuse (Bot, Phishing, Malware)
  - Can be "revoked" by the domain registrars by delisting & sinkholing
  - DNS software goes under code review
- Can Exploit DNS Cache to return false results
- Ghost Domain Attack
- Phoenix Domain Attack
