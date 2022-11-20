---
title: 'Crawling with APIs 🪣'
date: 2020-10-30
authors: anaclumos
slug: '/589DF4'
---

Recently I came across The Noun Project's API. With the combination of the `download` function I created in the [past](https://blog.chosunghyun.com/kr-backup-with-rss/), you could download hundreds of icons within seconds.

## Beware

Do not use this tool to pirate others' intellectual property. Beware of what you are doing with this code and The Noun Project's API. Read the license and API documents thoroughly. Unauthorized use cases are listed [here](https://api.thenounproject.com/getting_started.html#unacceptable-uses). This entire post & codes are MIT licensed.

## Importing libraries

```python
import requests
import os
from tqdm import tqdm
from requests_oauthlib import OAuth1
```

You will need to `pip3 download` if you do not have these libraries.

## The `download` function

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

This code fetches the URL and saves it as a file at `pathname`.

## The Noun Project API

```python
# ---

DOWNLOAD_ITERATION = 3
# Returns 50 icons per iteration.
# Three iteration equals 150 icons.

SEARCH_KEY = "tree"  # Search Term
SAVE_LOCATION = "./icons"
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

For more advanced uses, please visit this [docs](https://api.thenounproject.com/documentation.html) page. In addition, you can get your API Key and API secret by registering your app [here](https://thenounproject.com/developers/apps/).

## Result

![I have run some benchmarks and found that downloading ~5k icons shouldn't be a problem.](63EB17.png)
However, The Noun Project's API has a call limit so beware of that.
