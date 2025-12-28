---
lang: 'en'
slug: '/62764C'
---

As a part of [[Dynamic Island on the Web]], I reverse-engineered [[Apple Music API]] to get the undocumented Personal Token.
It doesn't mention how to get that token!
[[Apple Music API]] [[DX]] is way worse than Spotify's.

![[DD7F56.png]]

## Registering for [[Apple]] Developer Key

- Create an Identifier for your Service.
- Register a Key.

![[5FE278.png]]

## Creating [[Apple Music API]] Key

- Used [pelauimagineering/apple-music-token-generator](https://github.com/pelauimagineering/apple-music-token-generator) to get the token.

![[E480EA.png]]

## Using MusicKit to extract the User Token

- By creating a demo website, I could authenticate with my [[Apple]] ID and get the User Token.

![[D45B2B.png]]
![[C0AA6C.png]]
![[3C6B0B.png]]

## Testing the [[API]] Key

![[6BB27A.png]]
![[413165.png]]

## Making it into a [[GitHub Actions]]

- [anaclumos/now-playing](https://github.com/anaclumos/now-playing)
- This took me an hour to figure out...

![[3B78C6.png]]
