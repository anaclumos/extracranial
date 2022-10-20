---
lang: 'en'
slug: '/4DC268'
---

- [[Simple DirectMedia Layer|SDL]]

## Non-looping Sounds

```cpp
#include <SDL2/SDL.h>
Mix_PlayChannel(-1, game→GetSound("Assets/Sounds/SoundName.wav"), 0);
```

## Looping Sounds

```cpp
Mix_PlayChannel(-1, GetSound("Assets/Sounds/Music.ogg"), -1);
```

## Halt Music

```cpp
Mix_HaltChannel(channel);
```
