---
lang: 'en'
slug: '/9C24C1'
---

## [[2023-10-09]]

Finished some working prototypes. Some concerns: It seems like the transcript `MSMessage` is an immutable object. Might have to consider server approaches, such as KV storage.

![[B89B94.gif]]

I really don't want to store any messages, encrypted or decrypted, on the server. So we can consider something as:

- When sending a message
  - encrypt message
  - generate UUID
  - write to KV storage as `UUID` → `DecryptKey`
  - send UUID and encrypted message to iMessage
- When reading the message
  - extract UUID and encrypted message
  - read KV with UUID and delete the `DecryptKey` if any necessary condition is met
  - once expired, user cannot read the message again

### Considerations

- How to store different strategies: After 5 seconds? 10 seconds? 15 seconds?
- Group chats
- Photo / Video Payload
- Screenshot detections & Notifications

## [[Prehistoric]]

- [[Project]]. Disappearing message for [[iMessage]].
- every message self-destructs in 10 seconds
