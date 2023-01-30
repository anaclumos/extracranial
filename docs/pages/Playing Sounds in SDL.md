---
lang: 'en'
slug: '/4DC268'
---

- [SDL](./../.././docs/pages/Simple%20DirectMedia%20Layer.md)

## Non-looping Sounds

```cpp
#include <SDL2/SDL.h>
Mix_PlayChannel(-1, game→GetSound("assets/Sounds/SoundName.wav"), 0);
```

## Looping Sounds

```cpp
Mix_PlayChannel(-1, GetSound("assets/Sounds/Music.ogg"), -1);
```

## Halt Music

```cpp
Mix_HaltChannel(channel);
```

<head>
  <html lang="en-US"/>
</head>
