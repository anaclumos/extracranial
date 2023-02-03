---
lang: 'en'
slug: '/0A964E'
---

- [hex.cho.sh](https://hex.cho.sh/)
- If I generate a random 6-digit hex as an ID, how likely is a hash collision?
  - Side note, even if a hash collision occurs, all records remain in the [[Git]] history, so we don't need any collision checks.
- Nonetheless, it seems very unlikely.
- Let's try mathematical and computational approaches to verify this.
- [[XUID]]

## Resource

- [Autolinks with alphanumeric IDs](https://github.blog/changelog/2022-07-01-autolinks-with-alphanumeric-ids/)
- If every person on the planet generates a new UUID4 every second, we'd expect a collision to occur after about 10 years: https://qr.ae/prXSxM
- Only after generating 1 billion UUIDs every second for the next 100 years, the probability of creating just one duplicate would be about 50%. Or, to put it another way, the probability of one duplicate would be about 50% if every person on earth owned 600 million UUIDs.
