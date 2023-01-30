---
lang: 'en'
slug: '/46ED3F'
---

- Your deltaTime calculation is incorrect.
- You have basic type and pointer member variables that are uninitialized at the construction time of the class. You should initialize these either at the declaration or in the constructor. Note that it's a good practice to do this even if you are later setting them to something else in Initialize.
- You have an unused function.
- You can simplify the logic of your Rects by directly passing in the dimensions as parameters.
- Make sure to check if your window and renderer were made! (use a nullptr check)
- Your vector is being returned by value, which creates a copy. You should return by reference or`const`reference.
- Use `SDL_Log` instead of `printf` or `cout`.
- Don't use `using namespace std;`.
- You don't need to call Actor::OnUpdate() in Laser::OnUpdate()
- You don't need to call Actor::OnUpdate() in Ship::OnUpdate()
- You can improve how you implement ship movement on OnProcessInput().

<head>
  <html lang="en-US"/>
</head>
