---
lang: 'en'
slug: /9C24C1
---

- [[The Paradoxical Moon Philosophy]]
- [[Send Separately]]

## [[2023-10-16]]

![[885554.png]]

## [[2023-10-13]]

I figured out that in iOS 17, Shortcuts can send messages without confirmation. Can we use this for [[Send Separately]] or Ganymede?

## [[2023-10-12]]

- Read notifications
- Screenshot notifications
- Broadcast
- App Clip + Apple Login?
- Therefore, we name it Project Ganymede. You can NEVER win Apple. It is the most massive system, just like Jupiter. Therefore, we choose to become a moon. The moon of Jupiter. And a moon can be bigger than planets. Ganymede is bigger than Mercury.

## [[2023-10-09]]

I finished some working prototypes. Some concerns: It seems like the transcript `MSMessage` is an immutable object. We might consider server approaches, such as KV storage.

![[B89B94.gif]]

I don't want to store any encrypted or decrypted messages on the server. So we can consider something as:

- When sending a message
  - encrypt message
  - generate UUID
  - write to KV storage as `UUID` → `DecryptKey`
  - send UUID and encrypted message to iMessage
- When reading the message
  - extract UUID and encrypted message
  - read KV with UUID and delete the `DecryptKey` if any necessary condition is met
  - once it expired, the user cannot read the message again

### Considerations

- How do you store different strategies (After 5 seconds? 10 seconds? 15 seconds?)
- Group chats
- Photo / Video Payload
- Screenshot detections and notifications

## [[Prehistoric]]

- [[Project]]. Disappearing message for [[iMessage]].
- every message self-destructs in 10 seconds
