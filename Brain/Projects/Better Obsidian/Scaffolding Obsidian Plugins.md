---
title: 'Obsidian 플러그인 스캐폴딩'
slug: '/DAF673'
---

[[2022-07-19]] 저녁에 적당히 공허한 느낌이 들어 미뤄왔던 사이드 프로젝트를 해본다.
이 문서의 제목은 **Obsidian 플러그인 스캐폴딩**이고, 옵시디언 API 문서를 탐독하면서 이런 저런 발견 사항들을 기록할 것이다.
영어로 작성하려다가 옵시디언 플러그인 개발 자료는 한국어로 거의 없어 그냥 한국어로 작성한다.

우선 이 2가지 링크를 확인한다.

- [obsidianmd/obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
- [obsidianmd/obsidian-api](https://github.com/obsidianmd/obsidian-api)

[[Better Obsidian]] 문서를 보면 알 수 있듯이 별별 아이디어들을 다 쌓아뒀는데 오늘 저녁에 적당히 끝낼 수 있을만한 작업이 뭐가 있을까 고민하다가 *Review Page for Daily Notes*를 선택했다. Logseq를 쓸 당시 굉장히 유용하게 썼었는데 옵시디언에는 비슷한 기능이 없어서 아쉬웠다.

일단 옵시디언에서 제공하는 템플릿을 복제해서 저장소를 만들었다.

- [anaclumos/daily-notes-review-for-obsidian: Roam-like Review page for Daily Notes on Obsidian](https://github.com/anaclumos/daily-notes-review-for-obsidian)

스토어에 올라온 몇몇 플러그인을 보니 다음과 같은 간단한 구조였다. Chrome Extension과 유사하게 번들된 `main.js`와 `manifest.json`으로 이루어져 있다.

```bash
/plugin
├── main.js
└── manifest.json
```

패키징을 쉽게 할 수 있도록 `yarn run package` 스크립트를 추가했다.
내 디렉토리 구조에서만 동작하겠지만 당장은 뭐 이 정도로 충분할 것 같다.

```json
{
  "package": "yarn build && rm -rf dist && mkdir dist && cp main.js dist/main.js && cp manifest.json dist/manifest.json && rm -rf ../www/Brain/.obsidian/plugins/review-page-for-daily-notes && mkdir ../www/Brain/.obsidian/plugins/review-page-for-daily-notes && cp -r dist/* ../www/Brain/.obsidian/plugins/review-page-for-daily-notes"
}
```

`manifest.json`에는 다음과 같이 플러그인의 메타데이터를 넣을 수 있다.

```json
{
  "id": "review-page-for-daily-notes",
  "name": "Review Page for Daily Notes",
  "version": "1.0.0",
  "minAppVersion": "0.12.0",
  "description": "Roam-like Review page for Daily Notes for Obsidian",
  "author": "Sunghyun Cho",
  "authorUrl": "https://cho.sh",
  "isDesktopOnly": false,
  "js": "main.js"
}
```

이렇게 하면 다음과 같이 옵시디언이 플러그인을 인식한다.

![[Pasted image 20220719214527.png]]

- [등록할 수 있는 아이콘 리스트](https://forum.obsidian.md/t/list-of-available-icons-for-component-seticon/16332/4)

우선 이와 같이 기본 코드를 작성했다.

```ts
import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from 'obsidian'

interface CustomSettings {
  // relative path to daily notes folder
  dailyNotesFolder: string

  // format of the daily notes file, e.g. 'YYYY-MM-DD'
  dailyNotesFormat: string

  // how many files to load at once?
  dailyNotesOffset: number
}

const DEFAULT_SETTINGS: CustomSettings = {
  dailyNotesFolder: 'Journals',
  dailyNotesFormat: 'YYYY-MM-DD',
  dailyNotesOffset: 10,
}

export default class CustomPlugin extends Plugin {
  settings: CustomSettings
  async onload(): Promise<void> {
    await this.loadSettings()
    this.createRibbon()
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    )
  }
  createRibbon(): HTMLElement {
    const ribbon = this.addRibbonIcon(
      'calendar-with-checkmark',
      'Review Daily Notes',
      (evt: MouseEvent) => {
        new Notice('HELLO!')
      }
    )
    return ribbon
  }
}
```

왼쪽 리본 버튼을 누르면 다음과 같이 옵시디언 안내 문구가 나타난다.

![[Pasted image 20220719220437.png]]

import WIP from '@site/src/components/WIP'

<WIP />
