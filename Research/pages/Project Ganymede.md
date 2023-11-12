---
lang: 'en'
slug: /9C24C1
---

- [[The Paradoxical Moon Philosophy]]
- [[Send Separately]]
- Callisto is the code name for MessagesExtension

## [[2023-11-11]]

Used Prisma, Prisma Accelerate, PlanetScale, and Cloudflare Workers to create a simple server for the [[Ganymede Table Structure]]. Prisma layer makes 3 requests to the DB per 1 request to the server, albeit it probably would hit the Prisma Accelerate Layer, we can later optimize it with [this document.](https://planetscale.com/blog/integrate-cloudflare-workers-with-planetscale)

### Composing Messages with 3 People Group Chat (Writer, Reader 1, Reader 2)

![[7A1B12.png]]

### When the Writer Tries to Read (Invalid)

![[E2FC5B.png]]

### When the Reader Tries to Read (Valid)

![[111134.png]]

### When the Reader Re-requests to Read (Invalid)

![[40A9E9.png]]

### When Another Reader Requests to Read (Valid)

![[14FF06.png]]

### When an Unauthorized User Requests to Read (Invalid)

![[A9C91C.png]]

### Also

- [[PhotoPicker]]
- Finished reading the Apple Sign-In UUID from the iMessage Extension side: had to use App Groups and UserDefaults

## [[2023-11-10]]

- ![[2229DC.gif]]

## [[2023-11-08]]

- It is **possible** to limit iMessage forwarding for iMessage Extensions
- It is **possible** to mark the iMessage with `LocalParticipantIdentifier`
- `LocalParticipantIdentifier` is different on all devices
- The simplest way would be marking:
  - Set `LocalParticipantIdentifier` to `true` on reading (on the server)
  - Reject if `LocalParticipantIdentifier` is already `true`
- Problem: If the user deletes and reinstalls the app, `LocalParticipantIdentifier` changes. So the user can read unlimited times if the uninstall & reinstall
- Mitigation: Assign UUID for each message. Each message will have `LocalParticipantIdentifier + RemoteParticipantIdentifiers` count as the `maxRead`. This will at least 'limit' the max read count.
- Problem: on a Group Chat setting, a user can read unlimited times instead of another participant.
- Solution: Sign in with Apple?!

## [[2023-10-20]]

Can attach many images

![[8A52BA.png]]

## [[2023-10-19]]

- [SwiftUI Metal Shader Effects - iOS 17 - WWDC 2023](https://www.youtube.com/watch?v=yBdY0UKBIx0)
- [Embed the Photos Picker in your app - WWDC23 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2023/10107/)
- [Burn Paper with a Single Shader | Blender Tutorial](https://www.youtube.com/watch?v=i0NcvJtTZG8&t=120s)

![[E19673.png]]
![[A09B56.png]]

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
