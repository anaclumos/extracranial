---
lang: 'en'
slug: '/6F8BD8'
---

In [Graphics](./../.././docs/pages/Graphics.md), preprocessors are the directives to tell the compiler before turning them into codes.

`#include "file.h"` essentially copy-pastes that file to here. That is why we separate the codes into files. We don't want extra copies of a function.

`#ifdef _DEBUG` and `#endif` also exclude that block when [compiling](./../.././docs/pages/Compiling.md) the production version.

`#define CONSTANT` also copy-pastes.

Rule of thumb — only `#include` the headers you necessarily need.
Or, if you make an `everything.h`, precompile it!

<head>
  <html lang="en-US"/>
</head>
