---
lang: 'en'
slug: '/BF967C'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs groupId="lang">
<TabItem value="en" label="English" default>

## When to Use Each

### Use traditional functions

- When you need to use function hoisting (arrow functions are not hoisted).
- If you need to access the `arguments` object.
- When using methods that will be added to an object's prototype.
- If you need a dynamic context (`this`), such as in event handlers.

### Use arrow functions

- For shorter syntax in functional programming scenarios.
- When working with higher-order functions that expect a function callback.
- In cases where you want to retain the lexical `this` scope (e.g., in nested functions or event handlers).
- For single-line functions with implicit returns.

## Differences

### **Syntax**

Arrow functions provide a shorter syntax. They are written with an arrow rather than the `function` keyword.

#### Traditional function

```ts
function add(a, b) {
  return a + b
}
```

#### Arrow function:

```
const add = (a, b) => a + b;
```

### `this` Binding

One of the most significant differences is how `this` is handled. In traditional functions, `this` is dynamic and can change depending on the context in which the function is called. In arrow functions, `this` is lexically scoped, meaning it uses `this` from the surrounding code where the function is defined.

### No Binding of `arguments`

Arrow functions do not have their own `arguments` object. Instead, they access the `arguments` object of the closest non-arrow parent function.

### Cannot be used as Constructors

Arrow functions cannot be used as constructor functions. They cannot be called with `new`.

### No Duplicate Named Parameters

Traditional functions allow duplicate named parameters in non-strict mode, while arrow functions do not, regardless of strict mode.

### No `prototype` Property

Arrow functions do not have a `prototype` property.

### Implicit Return

In arrow functions, if you have a single expression, you can omit the curly braces `{}` and the `return` statement. The expression automatically returns its result.

</TabItem>
<TabItem value="ko" label="한국어">

## 각각 사용할 때

### 전통적인 함수 사용

- 함수 호이스팅을 사용해야 할 때 (화살표 함수는 호이스팅되지 않는다).
- `arguments` 객체에 접근해야 할 때.
- 객체의 프로토타입에 추가될 메소드를 사용할 때.
- 동적 맥락(`this`)이 필요할 때, 예를 들어 이벤트 핸들러에서.

### 화살표 함수 사용

- 함수형 프로그래밍 상황에서 더 짧은 문법이 필요할 때.
- 함수 콜백을 기대하는 고차 함수와 함께 작업할 때.
- 어휘적 `this` 범위를 유지하고자 할 때 (예: 중첩 함수나 이벤트 핸들러에서).
- 암시적 반환을 가진 단일 줄 함수에 대해.

## 차이점

### **문법**

화살표 함수는 더 짧은 문법을 제공한다. `function` 키워드 대신 화살표로 작성된다.

#### 전통적인 함수

```ts
function add(a, b) {
  return a + b
}
```

#### 화살표 함수:

```
const add = (a, b) => a + b;
```

### `this` 바인딩

가장 중요한 차이점 중 하나는 `this`가 어떻게 처리되는지에 있다. 전통적인 함수에서는 `this`가 동적이며 함수가 호출되는 맥락에 따라 변경될 수 있다. 화살표 함수에서는 `this`가 어휘적으로 범위가 지정되며, 함수가 정의된 주변 코드의 `this`를 사용한다.

### `arguments` 바인딩 없음

화살표 함수는 자체 `arguments` 객체가 없다. 대신, 가장 가까운 비-화살표 부모 함수의 `arguments` 객체에 접근한다.

### 생성자로 사용 불가

화살표 함수는 생성자 함수로 사용할 수 없다. `new`와 함께 호출할 수 없다.

### 중복된 이름의 매개변수 금지

전통적인 함수는 비엄격 모드에서 중복된 이름의 매개변수를 허용하지만, 화살표 함수는 엄격 모드와 관계없이 이를 허용하지 않는다.

### `prototype` 속성 없음

화살표 함수는 `prototype` 속성이 없다.

### 암시적 반환

화살표 함수에서는 단일 표현식을 사용할 경우, 중괄호 `{}`와 `return` 문을 생략할 수 있다. 표현식은 자동으로 그 결과를 반환한다.

</TabItem>
</Tabs>
