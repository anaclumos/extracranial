---
lang: 'en'
slug: '/A8398E'
aliases:
  [
    'iMessage Extension',
    'iMessage Extensions',
    'iMessage Apps',
    '아이메시지 앱',
    '아이메시지 익스텐션',
    'iMessage 앱',
    'iMessage 익스텐션',
  ]
---

TODO: USE FUMADOCS I18N

<div lang='en-US'>

An [iMessage](./../.././docs/pages/iMessage.md) App is a type of application within [Apple](./../.././docs/pages/Apple.md)'s Messages app that allows users to interact with various services or perform tasks directly within their [iMessage](./../.././docs/pages/iMessage.md) conversations, while an [iMessage](./../.././docs/pages/iMessage.md) Extension is a feature that developers can use to extend the capabilities of their existing [iOS](./../.././docs/pages/iOS.md) apps to integrate with the [Messages](./../.././docs/pages/Text%20Message.md) app, enabling users to access specific functionalities of the app within the [iMessage](./../.././docs/pages/iMessage.md) interface.

</div>

<div lang='ko-KR'>

[iMessage](./../.././docs/pages/iMessage.md) 앱은 사용자가 다양한 서비스와 상호 작용하거나 [iMessage](./../.././docs/pages/iMessage.md) 대화 내에서 직접 작업을 수행할 수 있는 [Apple](./../.././docs/pages/Apple.md)의 [메시지](./../.././docs/pages/Text%20Message.md) 앱 내 애플리케이션 유형이며, [iMessage](./../.././docs/pages/iMessage.md) 확장 프로그램은 개발자가 기존 [iOS](./../.././docs/pages/iOS.md) 앱의 기능을 확장하여 [메시지](./../.././docs/pages/Text%20Message.md) 앱과 통합하는 데 사용할 수 있는 기능으로, 사용자가 [iMessage](./../.././docs/pages/iMessage.md) 인터페이스 내에서 앱의 특정 기능에 액세스할 수 있게 해준다.

</div>

```swift
override func didBecomeActive(with conversation: MSConversation)
    super.didBecomeActive(with: conversation)
    if let message = conversation.selectedMessage {
        updateUiForSelectedMessage(message)
    } else {
        updateUiForManualOpening()
    }
}
```
