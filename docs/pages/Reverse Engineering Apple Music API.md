---
lang: 'en'
slug: '/62764C'
---

As a part of [Dynamic Island on the Web](./../.././docs/pages/Dynamic%20Island%20on%20the%20Web.md), I reverse-engineered [Apple Music API](./../.././docs/pages/Apple%20Music%20API.md) to get the undocumented Personal Token.
It doesn't mention how to get that token!
[Apple Music API](./../.././docs/pages/Apple%20Music%20API.md) [DX](./../.././docs/pages/DX.md) is way worse than Spotify's.


<figure>

![DD7F56.png](./../.././docs/assets/DD7F56.png)


</figure>

## Registering for Apple Developer Key

- Create an Identifier for your Service.
- Register a Key.


<figure>

![5FE278.png](./../.././docs/assets/5FE278.png)


</figure>

## Creating [Apple Music API](./../.././docs/pages/Apple%20Music%20API.md) Key

- Used [pelauimagineering/apple-music-token-generator](https://github.com/pelauimagineering/apple-music-token-generator) to get the token.


<figure>

![E480EA.png](./../.././docs/assets/E480EA.png)


</figure>

## Using MusicKit to extract the User Token

- By creating a demo website, I could authenticate with my Apple ID and get the User Token.


<figure>

![D45B2B.png](./../.././docs/assets/D45B2B.png)


</figure>

<figure>

![C0AA6C.png](./../.././docs/assets/C0AA6C.png)


</figure>

<figure>

![3C6B0B.png](./../.././docs/assets/3C6B0B.png)


</figure>

## Testing the API Key


<figure>

![6BB27A.png](./../.././docs/assets/6BB27A.png)


</figure>

<figure>

![413165.png](./../.././docs/assets/413165.png)


</figure>

## Making it into a [GitHub Actions](./../.././docs/pages/GitHub%20Actions.md)

- [anaclumos/now-playing](https://github.com/anaclumos/now-playing)
- This took me an hour to figure out...


<figure>

![3B78C6.png](./../.././docs/assets/3B78C6.png)


</figure>

<head>
  <html lang="en-US"/>
</head>
