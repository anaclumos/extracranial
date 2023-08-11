---
lang: 'ko'
slug: '/240593'
---

[Swift에서 String을 조작하는 것은 예상보다 엄청 복잡하다.](https://www.quora.com/Why-is-string-manipulation-so-difficult-in-Swift). 몇 가지 공통된 불만사항들:

- String, Substring, Character 데이터 타입이 다 따로 존재한다.
- Integer 타입을 이용해 String을 돌지 못한다. `String.Index`라는 또다른 데이터 타입을 써야 한다.

그래서 Python에서 이렇게 간단한 회문(Palindrome) 검사가

```python
if string[i] != string[length - 1 - i]:
```

Swift에서는 이렇게 써야 한다.

```swift
if String(string[String.Index(string.startIndex, offsetBy: i)]) != String(string[String.Index(string.endIndex, offsetBy: -i)]) // 대체 왜!
```

저 **말 많은** 문법이 보이는가?
근데 Swift String이 이렇게 디자인된 이유가 있다.

- **Substrings**: Swift Strings는 함수에 대입되거나 전달될 때 복사되는 데이터 타입이다. 안정성에는 좋지만 특히 큰 문자열을 사용할 때 효율이 좋지 않다. **Substring** 데이터 유형을 쓰면 새 인스턴스를 생성하지 않아 효율적이다.
- **String.Index, Character**: Swift String은 유니코드 정확(Unicode Correct)하다. 복잡한 이모티콘이 3-4자 길이로 결합된 경우를 본 적 있는가? 여기에는 **é**, **김** 또는 **🇮🇳**와 같은 "확장된 서기소 묶음(Extended grapheme clusters)"이 있는 [[Vocab|단어]]가 포함된다. Integer를 사용하면 각 문자열의 길이가 달라지지만 String.Index와 Character를 사용하면 모두 길이 1이다. [Apple의 예시](https://developer.apple.com/documentation/swift/string):

  ```swift
  let cafe = "Cafe\u{301} du 🌍"
  print(cafe) // Prints "Café du 🌍"
  print(cafe.count) // Prints "9"
  print(Array(cafe)) // Prints ["C", "a", "f", "é", " ", "d", "u", " ", "🌍"]
  ```

항상 모든 것은 타협인 듯 하다.

> 평범한 것과 비범한 것은 딱 한 걸음 차이이다.
>
> – 지미 존슨 (1943—)
