---
lang: 'en'
slug: /9C24C1
aliases:
  - Ganymede
---

import DisplayFlex from '@site/src/components/DisplayFlex'

- [[The Paradoxical Moon Philosophy]]
- [[Send Separately]]
- Callisto is the code name for MessagesExtension
- Europa is the code name for Encryption Key Exchange Server

## [[2023-12-24]]

<DisplayFlex>

![[8CE3E2.png]]
![[2AEC71.png]]

</DisplayFlex>

## [[2023-12-15]]

![[EEDDA7.gif]]

## [[2023-11-22]]

- There was a property in `MSMessage` of [shouldExpire](https://developer.apple.com/documentation/messages/msmessage/1649741-shouldexpire). The problem is that the recipient can override to keep the message, which we don't want.
- Implemented Message Reading Functionality
- I implemented proper loading view features, with fade-in and fade-out.

![[D7D1B8.gif]]

- Refactored a lot of files

```
Callisto
├── Assets.xcassets
│   ├── Contents.json
│   └── iMessage App Icon.stickersiconset
│       └── Contents.json
├── Base.lproj
│   └── MainInterface.storyboard
├── Callisto.entitlements
├── CallistoLoadingView.swift
├── CallistoMessageReadingView.swift
├── CallistoMessageWritingView.swift
├── CallistoService.swift
├── CallistoView.swift
├── Info.plist
└── MessagesViewController.swift
```

## [[2023-11-18]]

- Linked the client side to
  - request server
  - pack it as `MSMessage`
  - send the message
  - dismiss the keyboard & request a compact presentation style
- Pink Bubble?

![[61B318.jpg]]

## [[2023-11-13]]

- Implemented [[Vitest]] on [[Prisma]] and [[Cloudflare Worker|Cloudflare Workers]]
  - It would be boring to name tests like "A [[Text Message|texts]] B, then C tries to read it" or so, right?

![[FCAC15.png]]

- Implemented CI on [[GitHub Actions]], so that
  - If the [[Vitest]] passes, deploy it to [[Cloudflare Worker|Cloudflare Workers]]

### When Test Fails

- Refuses to Deploy

![[656236.png]]

### When Test Passes

- Deploys

![[C53193.png]]

## [[2023-11-11]]

Used [[Prisma]], [[Prisma Accelerate]], [[PlanetScale]], and [[Cloudflare Worker|Cloudflare Workers]] to create a simple server for the [[Ganymede Table Structure]]. [[Prisma]] layer makes three requests to the [[Database|DB]] per 1 request to the server, albeit it probably would hit the [[Prisma Accelerate]] Layer, we can later optimize it with [this document.](https://planetscale.com/blog/integrate-cloudflare-workers-with-planetscale)

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
- Finished reading the Apple Sign-In [[UUID]] from the [[iMessage App]] side: had to use App Groups and UserDefaults

## [[2023-11-10]]

![[2229DC.gif]]

## [[2023-11-08]]

- It is **possible** to limit [[iMessage]] forwarding for [[iMessage App|iMessage Extensions]]
- It is **possible** to mark the iMessage with `LocalParticipantIdentifier`
- `LocalParticipantIdentifier` is different on all devices
- The most straightforward way would be marking:
  - Set `LocalParticipantIdentifier` to `true` on reading (on the server)
  - Reject if `LocalParticipantIdentifier` is already `true.`
- Problem: If the user deletes and reinstalls the app, `LocalParticipantIdentifier` changes. So the user can read unlimited times if the uninstall & reinstall
- Mitigation: Assign UUID for each message. Each message will have `LocalParticipantIdentifier + RemoteParticipantIdentifiers` count as the `maxRead`. This will at least 'limit' the max read count.
- Problem: on a Group Chat setting, a user can read unlimited times instead of another participant.
- Solution: [[Sign in with Apple]]?!

## [[2023-10-20]]

I can attach many images

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

In iOS 17, [[Shortcuts]] can send [[Text Message|messages]] without confirmation. Can we use this for [[Send Separately]] or Ganymede?

## [[2023-10-12]]

- Read notifications
- Screenshot notifications
- Broadcast
- App Clip + [[Sign in with Apple|Apple Login]]?
- Therefore, we name it [[Project]] Ganymede. You can NEVER win [[Apple]]. It is the most massive system, just like Jupiter. Therefore, we choose to become a moon. The moon of Jupiter. And a moon can be bigger than planets. Ganymede is bigger than Mercury.

## [[2023-10-09]]

I finished some working prototypes. Some concerns: It seems like the transcript `MSMessage` is an immutable object. We might consider server approaches, such as KV storage.

![[B89B94.gif]]

I don't want to store any encrypted or decrypted [[Text Message|messages]] on the server. So we can consider something as:

- When sending a [[Text Message|message]]
  - encrypt [[Text Message|message]]
  - generate [[UUID]]
  - write to KV storage as `UUID` → `DecryptKey`
  - send [[UUID]] and encrypted [[Text Message|message]] to [[iMessage]]
- When reading the [[Text Message|message]]
  - extract [[UUID]] and encrypted [[Text Message|message]]
  - read KV with [[UUID]] and delete the `DecryptKey` if any necessary condition is met
  - once it expires, the user cannot read the [[Text Message|message]] again

### Considerations

- How do you store different [[Strategy|strategies]] (After 5 seconds? 10 seconds? 15 seconds?)
- Group chats
- Photo / Video Payload
- Screenshot detections and notifications

## [[Prehistoric]]

- [[Project]]. Disappearing [[Text Message|message]] for [[iMessage]].
- every [[Text Message|message]] self-destructs in 10 seconds
