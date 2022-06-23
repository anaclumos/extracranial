---
title: 'The Noun Project API로 아이콘 수백 개 단숨에 다운로드하기'
date: 2020-10-30
excerpt: '일일이 다운 받지 않아도 된다.'
---

대부분 정상 동작하지만 앱 기본 단축키에 `⌘ Command`+`L`이 포함되어 있는 경우 일시적으로 동작이 되지 않을 수 있다. 대표적으로 시스템 환경설정은 `⌘ Command`+`L`을 환경 설정 전체 메뉴로 돌아가는 단축키로 사용한다. 전체 메뉴에서 다시 `⌘ Command`+`L` 을 누르면 화면이 잠긴다. 이 외에는 아직 `⌘ Command`+`L` 단축키가 동작하지 않는 경우는 보지 못했다.

- 카카오톡 Mac 버전에서 ⌘ Command+L을 카카오톡 잠금 단축키로 사용한다!
- 만약 어떤 앱에서 기본 단축키로 Command + L을 쓰는 바람에 맥이 제대로 잠기지 않는다면, 그 앱에서 Command + L을 쓰는 단축키를 찾아 다른 단축키로 설정해주면 된다.최근 The Noun Project의 API를 알게 되었다. 얼마 전에 작성한 `download` 함수와 조합하여 사용하면 아이콘 수백 개를 단숨에 다운로드할 수 있다.

## Beware

이 도구를 사용하여 타인의 지적 재산권을 침해하지 마십시오. 이 코드와 The Noun Project API가 자신의 사용 용도에 적합한지 확인한 후에 사용하십시오. 또한 라이선스와 API 문서를 꼼꼼하게 검토하십시오. The Noun Project에서 허가하지 않는 사용 용도들은 [여기](https://api.thenounproject.com/getting_started.html#unacceptable-uses)에서 확인하실 수 있습니다. 또한 이 글과 이 글의 모든 코드는 MIT 라이선스임을 알려드립니다.

## 라이브러리 불러오기

```python
import requests
import os
from tqdm import tqdm
from requests_oauthlib import OAuth1
```

이 라이브러리들이 없다면 `pip3 download` 하여 사용하면 된다.

## `download` 함수

```python
def download(url, pathname):
    if not os.path.isdir(pathname):
        os.makedirs(pathname)
    response = requests.get(url, stream=True)
    file_size = int(response.headers.get("Content-Length", 0))
    filename = os.path.join(pathname, url.split("/")[-1])
    if filename.find("?") > 0:
        filename = filename.split("?")[0]
    progress = tqdm(
        response.iter_content(256),
        f"Downloading {filename}",
        total=file_size,
        unit="B",
        unit_scale=True,
        unit_divisor=1024,
    )
    with open(filename, "wb") as f:
        for data in progress:
            f.write(data)
            progress.update(len(data))
```

이 코드는 URL의 데이터를 불러와 `pathname`에 저장하는 역할을 한다.

## The Noun Project API

```python
# ---

DOWNLOAD_ITERATION = 3
# 1번에 아이콘을 50개씩 불러온다.
# 3번 실행하면 아이콘 150개를 불러온다.

SEARCH_KEY = "tree"  # 검색어
SAVE_LOCATION = "./icons" # 저장할 위치
auth = OAuth1("API_KEY", "API_SECRET")

# ---

for iteration in range(DOWNLOAD_ITERATION):
    endpoint = (
        "http://api.thenounproject.com/icons/"
        + SEARCH_KEY
        + "?offset="
        + str(iteration * 50)
    )
    response = requests.get(endpoint, auth=auth).json()
    for icon in response["icons"]:
        download(icon["preview_url"], SAVE_LOCATION)
```

보다 세부적인 기능은 이 [문서](https://api.thenounproject.com/documentation.html)를 참고하면 된다. API Key와 API Secret은 [여기](https://thenounproject.com/developers/apps/)에서 App을 등록하면 발급할 수 있다.

## 결과

![](images/icons.png)

테스트를 해보았을 때 아이콘 5,000개 정도까지는 가뿐하게 다운로드할 수 있었다. 다만 The Noun Project API는 API 호출 횟수에 제한이 있으니 이를 염두에 두고 활용하면 좋을 것 같다.
