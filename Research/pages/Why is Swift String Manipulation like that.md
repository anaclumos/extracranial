---
lang: 'en'
slug: '/9AA043'
---

[String Manipulation is notoriously tricky in Swift](https://www.quora.com/Why-is-string-manipulation-so-difficult-in-Swift). Some common complaints:

- Three different datatypes: String, Substring, and Character.
- Cannot iterate String with Integer. We need to use a separate datatype called `String.Index`.

So a simple palindrome search goes from this in Python:

```python
if string[i] != string[length - 1 - i]:
```

To this in Swift:

```swift
// ...
if String(string[String.Index(string.startIndex, offsetBy: i)]) != String(string[String.Index(string.endIndex, offsetBy: -i)]) // What is wrong with you?
// ...
```

See the **perplexing** syntax?
However, there are several reasons why Swift Strings are designed this way.

- **Substrings**. Swift Strings are value types copied when assigned or passed to a function. This can be good for stability but bad for efficiency, especially when working with large strings. Therefore we have the **substring** datatype, which does not create a new instance.
- **String.Index, Character**. Swift Strings are Unicode-Correct, which means they can handle complex characters and [[Emoji]]; ever experienced where complex [[Emoji]] are 3-4 characters combined in length? These include words with "extended grapheme clusters", such as "é", "김" and "🇮🇳". Using Integer, their length will vary, but in String.Index they are all length 1. [Apple's Example](https://developer.apple.com/documentation/swift/string):

  ```swift
  let cafe = "Cafe\u{301} du 🌍"
  print(cafe) // Prints "Café du 🌍"
  print(cafe.count) // Prints "9"
  print(Array(cafe)) // Prints ["C", "a", "f", "é", " ", "d", "u", " ", "🌍"]
  ```

It's always a compromise, one or the other.

> The difference between ordinary and extraordinary is that little extra.
>
> – Jimmy Johnson (1943—)
