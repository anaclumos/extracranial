---
title: 'Why the halting problem is unsolvable'
date: 2022-05-11
authors: anaclumos
slug: 'FFD937'
---

- Imagine there is a function `bool doesItHalt({function f, input i})` that returns if the parameter function `f(i)` halts or not.
- Now consider the following functions:

```cpp
pair duplicator(input i) {
    return {i, i}
}

bool invertHalt(bool b) {
    if(b) {
        while(true); // hangs forever
        return 0;
    } else {
        return 0;
    }
}
```

- Essentially, if `f(i)` halts, the `invertHalt` will hang (i.e., wouldn't halt), and if `f(i)` hangs, the `invertHalt` will halt.
- Let us consider the composition of the two functions:

```cpp
bool unknown(input i) {
    auto a = duplicator(i) // a = {i, i}
    auto b = doesItHalt(a) // does i(i) halt?
    auto c = invertHalt(b) // hangs if i(i) halts and vice versa.
}
```

- Will `unknown(unknown)` halt? What should `doesItHalt({unknown, unknown})` return?
- Let us suppose it will return `true`. Then, it means that `doesItHalt({unknown, unknown})` returned `false` because `invertHalt(b)` would've hung otherwise. Therefore, this contradicts our supposition that `doesItHalt({unknown, unknown})` returns `true`.
- Let us suppose it will return `false`. Then, it means that `doesItHalt({unknown, unknown})` would return `true` because `invertHalt` wouldn't hang otherwise. Therefore, this contradicts our supposition that `doesItHalt({unknown, unknown})` returns `false`.
- Therefore, `unknown` cannot hang nor halt; therefore, no such `doesItHalt` can exist.
