---
date: 2020-10-17
slug: '/383A01'
---

## Primary Objectives

- Implement the Karatsuba Method
- Do not use any `*` operator (like — not at all!)

First, let's import the `math` library.

```python
import math
```

Let's add some util functions for adding zeros. The following operation is super-expensive, and I did this for the sake of removing `*`s.

```python
def addZeros(number: int, zeros: int) -> int:
    s = str(number)
    for _ in range(zeros):
        s += "0"
    return int(s)
```

If you do not care about not using `*`s, you can go with:

```python
def addZeros(number: int, zeros: int) -> int:
    return number * (10 ** zeros)
```

Let's say the standard input provides the value in `string`, with `,` in between the two numbers. I wrote a wrapper class that parses the standard input and feeds the value into the core method.

```python
def karatsuba(input: str) -> str:
    inputList = list(map(str.strip, input.split(',')))
    return str(karatsubaCore(int(inputList[0]), int(inputList[1])))
```

Then we need to finish the actual calculation. For the base calculation (the line after `if min(v1, v2) <= 100:`) you could go with `v1 * v2` if you don't need to remove `*`s.

```python
def karatsubaCore(v1: int, v2: int) -> int:
    if min(v1, v2) <= 100:
        minv = min(v1, v2)
        maxv = max(v1, v2)
        ans = 0
        for _ in range(minv):
            ans += maxv
        return ans

    else:
        n = int(math.log10(max(v1, v2))//2)
        a = int(v1 // pow(10, n))
        b = int(v1 % pow(10, n))
        c = int(v2 // pow(10, n))
        d = int(v2 % pow(10, n))

        val1 = karatsubaCore(a, c)
        val2 = karatsubaCore(b, d)
        val3 = karatsubaCore(a+b, c+d) - val1 - val2

        return addZeros(val1, n+n) + addZeros(val3, n) + val2
```

It is always a good idea to have some validation. Unfortunately, I did not use any testing library; this short script will suffice the purpose of validating the answer.

```python
def karatCheck(input: str) -> str:
    i = list(map(str.strip, input.split(',')))

    # my calculation
    karat: int = karatsubaCore(int(i[0]), int(i[1]))

    # the correct calculation
    correct: int = int(i[0]) * int(i[1])

    print("Correct!" if karat == correct else "Itz... Wrong...")


karatCheck("342345,123943")
karatCheck("342345,0")
karatCheck("00342345 ,   123943129893493")
karatCheck("12030912342345,1239431000192837812")
karatCheck("2,1239431000192837812")
karatCheck("249302570293475092384,0")
karatCheck("  100, 100 ")
```

If you run this, you will get:

    Correct!
    Correct!
    Correct!
