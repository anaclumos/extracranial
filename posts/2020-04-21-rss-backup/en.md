---
title: 'Backup Everything at Once with RSS 📼'
date: 2020-04-21
authors: anaclumos
slug: '/21E029'
---

My Ghost blog is not serverless. Although it requires continuous management, there are many advantages to operating a blog through a server. However, managing a blog through a server has one major drawback. If the server crashes, it becomes very difficult to restore the posts stored inside. I thought it would be too cumbersome to manually copy and backup each post and photo as the amount of content increases in the future. I wanted to come up with a solution to improve this situation.

## Problems with Ghost's Built-in Backup

Ghost provides a feature to download a blog backup file in `.json` format. It's like a complete **copy of the blog's soul**. Everything that can be set within Ghost, such as the author's name, tags used, post content and format, upload time, and even the summary in the HTML meta tags, is backed up as is.

However, there are two problems.

- Ghost's built-in backup files are difficult for humans to read. Not only are they minified JSON, but the file structure is also complex due to the vast amount of information it contains, and the posts are compressed.
- Also, Ghost's built-in backup does not back up photos. Therefore, when restoring the blog, all photo files will display "not found" (commonly known as **broken images**). If the blog server is alive or you have copied photos, you're in luck, but there may be cases where photos cannot be restored.

## Goals

### Main Goal

- Both posts and photos should be backed up.

### Bonus Goals

- It should be in a human-readable format. (Human-Readable Medium)
- It should be clear which photo goes into which location of which post, in preparation for restoring the blog.
- Backup should be convenient.
- It should be possible to create a replica outside the blog.

## Idea

The answer is RSS. RSS is a technology that emerged in the early 2000s during the blogging boom, serving as a "subscription" service. Sites or blogs that support RSS provide an RSS feed address. The RSS feed address contains updated content from that site in a machine-readable format. When users enter the RSS feed address into an RSS reader, the reader fetches new content from the RSS feed address each time.

In modern times, with the rise of social media, RSS technology has become obsolete, but it is sufficient to achieve my goals. The RSS feed acts as an API for retrieving posts. Since Ghost supports RSS by default, I decided to utilize it.

### General Idea

1. Copy the entire RSS feed by entering the blog's RSS address.
2. Parse the RSS and extract the HTML of each post.
3. Create a folder for each post and save the post's HTML.
4. Download the photos by accessing the `src` address of the `img` tags included in the post's HTML.
5. For posts containing photos, create an `images` folder in each post folder, save the photos, and change the `src` of the `img` tags in the HTML to the relative path of the saved images.

## Development

### Reference

All the examples below are based on v1 of `[anaclumos/backup-with-rss](https://github.com/anaclumos/backup-with-rss)`. By the time you read this post, there may have been new features or bug fixes added.

Also, the code included in this post is intended to show a general flow, not the entire code. If you try to copy and run it as is, it probably won't work! The complete code is available in the [GitHub repository](https://github.com/anaclumos/backup-with-rss).

### 1\. Copying the RSS Feed Using Feedparser

The RSS feed is copied using the Feedparser module in Python.

```python
# -*- coding: utf-8 -*-
import feedparser

class RSSReader:
    origin = ""
    feed = ""

    def __init__(self, URL):
        self.origin = URL
        self.feed = feedparser.parse(URL)

    def parse(self):
        return self.feed.entries
```

RSSReader is used to load the RSS feed and pass the `entries` item.

What this code does is:

1. When the RSSReader Object is created, it stores the RSS address in `self.origin` and parses the RSS address and stores it in `self.feed`.
2. When the `parse()` function is executed, it returns the `entries` from the stored value in `self.feed`.

The `entries` contain the posts from the RSS feed in the form of a `list`. The following example is the RSS of [this post](https://blog.chosunghyun.com/apples-easter-egg/).

Structure of `self.feed.entries` in `parse()`

```json
// Some parts omitted
{
  "bozo": 0,
  "encoding": "utf-8",
  "entries": [],
  "feed": {
    "generator": "Ghost 3.13",
    "generator_detail": {
      "name": "Ghost 3.13"
    },
    "image": {
      "href": "https://blog.chosunghyun.com/favicon.png",
      "link": "https://blog.chosunghyun.com/",
      "links": [
        {
          "href": "https://blog.chosunghyun.com/",
          "rel": "alternate",
          "type": "text/html"
        }
      ],
      "title": "Sunghyun Cho",
      "title_detail": {
        "base": "https://blog.chosunghyun.com/rss/",
        "language": "None",
        "type": "text/plain",
        "value": "Sunghyun Cho"
      }
    },
    "link": "https://blog.chosunghyun.com/",
    "links": [
      {
        "href": "https://blog.chosunghyun.com/",
        "rel": "alternate",
        "type": "text/html"
      },
      {
        "href": "https://blog.chosunghyun.com/rss/",
        "rel": "self",
        "type": "application/rss+xml"
      }
    ],
    "subtitle": "Sunghyun Cho's Blog",
    "subtitle_detail": {
      "base": "https://blog.chosunghyun.com/rss/",
      "language": "None",
      "type": "text/html",
      "value": "Sunghyun Cho's Blog"
    },
    "title": "Sunghyun Cho",
    "title_detail": {
      "base": "https://blog.chosunghyun.com/rss/",
      "language": "None",
      "type": "text/plain",
      "value": "Sunghyun Cho"
    },
    "ttl": "60",
    "href": "https://blog.chosunghyun.com/rss/",
    "namespaces": {
      "": "http://www.w3.org/2005/Atom",
      "content": "http://purl.org/rss/1.0/modules/content/",
      "dc": "http://purl.org/dc/elements/1.1/",
      "media": "http://search.yahoo.com/mrss/"
    },
    "status": 200,
    "version": "rss20"
  }
}
```

### 2\. Creating Markdown Files from RSS Data

I thought I could extract only the necessary values from the `self.feed.entries` returned by `RSSReader`. I created an `MDCreator` class to process the information provided by `RSSReader`.

```python
class MDCreator:
    def __init__(self, rawData, blogDomain):
        self.rawData = rawData
        self.blogDomain = blogDomain

    def createFile(self, directory):
        try:
            os.makedirs(directory + "/" + self.rawData.title)
            print('Folder "' + self.rawData.title + '" Created ')
        except FileExistsError:
            print('Folder "' + self.rawData.title + '" already exists')

        self.directory = directory + "/" + self.rawData.title

        MDFile = codecs.open(self.directory + "/README.md", "w", "utf-8")
        MDFile.write(self.render())
        MDFile.close()
```

The `blogDomain` parameter is used later.

What this code does is:

1. When the MDCreator Object is created, it stores the blog address in `self.blogDomain` and the raw RSS feed data in `self.rawData`. This raw RSS feed data is the `self.feed.entries` returned by RSSReader's `parse()`.
2. When the `createFile()` function is executed, it creates a folder for each post in the backup folder. The folder title is the title of the post. It creates a `README.md` in each folder and puts the post content inside.

The reason for creating files using the `codecs` library is to make it use Unicode instead of the CP949 codec on Windows. This way, emojis included in the RSS are displayed correctly 🚀🥊

### 3\. Adding Post Information to the Generated Markdown File

I wanted to use Jekyll-style Front Matter when displaying post information. I thought it would be the easiest way to check the post's title, tags, link, author, etc.

```python
def render(self):
    try:
        postTitle = str(self.rawData.title)
    except AttributeError:
        postTitle = "Post Title Unknown"
        print("Post Title does not exist")

    try:
        postTags = str(self.getValueListOfDictList(self.rawData.tags, "term"))
    except AttributeError:
        postTags = "Post Tags Unknown"
        print("Post Tags does not exist")

    try:
        postLink = "Post Link Unknown"
        postLink = str(self.rawData.link)
    except AttributeError:
        print("Post Link does not exist")

    try:
        postID = str(self.rawData.id)
    except AttributeError:
        postID = "Post ID unknown"
        print("Post ID does not exist")

    try:
        postAuthors = str(self.rawData.authors)
    except AttributeError:
        postAuthors = "Authors Unknown"
        print("Authors does not exist")

    try:
        postPublished = str(self.rawData.published)
    except AttributeError:
        postPublished = "Published Date unknown"
        print("Published Date does not exist")

    self.renderedData = (
        "---\nlayout: post\ntitle: "
        + postTitle
        + "\ntags: "
        + postTags
        + "\nurl: "
        + postLink
        + "\nauthors: "
        + postAuthors
        + "\npublished: "
        + postPublished
        + "\nid: "
        + postID
        + "\n---\n"
    )
```

What this code does is:

1. It checks if the post's title, tags, link, ID, author names, and publication date exist in the RSS code, and if they do, it enters those values into the Front Matter.
2. If a value doesn't exist, it enters `~ Unknown`.

The reason for adding tags using code like `self.getValueListOfDictList(self.rawData.tags, "term")` is because tags are specified in the following format in Ghost. This is the same for Gatsby and WordPress as well.

```json
'tags': [{'label': None, 'scheme': None, 'term': 'English'},
         {'label': None, 'scheme': None, 'term': 'Code'},
         {'label': None, 'scheme': None, 'term': 'Apple'}],
```

```python
def getValueListOfDictList(self, dicList, targetkey):
    arr = []
    for dic in dicList:
        for key, value in dic.items():
            if key == targetkey:
                arr.append(value)
    return arr
```

In this way, only the `term` item is extracted from `tags` and added to the Front Matter. When executed, the following Jekyll-style Front Matter is completed.

```yaml
---
layout: post
title: Apple's Easter Egg
tags: ['English', 'Code', 'Apple']
url: https://blog.chosunghyun.com/apples-easter-egg/
authors: [{ 'name': 'S Cho' }]
published: Sun, 19 Jan 2020 17:00:00 GMT
id: /_ Some Post ID _/
---
```

![Jekyll Style Front Matter on GitHub](9B416C.png)

Front Matter is rendered like this on GitHub.

### 4\. Adding Post Summary and Content to the Generated Markdown File

The Summary and Content items from the RSS data are added to `renderedData`.

```python
self.renderedData += "\n\n# " + postTitle + "\n\n## Summary\n\n"
try:
    self.renderedData += self.rawData.summary
except AttributeError:
    self.renderedData += "RSS summary does not exist."

self.renderedData += "\n\n## Content\n\n"
try:
    for el in self.getValueListOfDictList(self.rawData.content, "value"):
        self.renderedData += "\n" + str(el)
except AttributeError:
    self.renderedData += "RSS content does not exist."
```

One interesting thing was that while Ghost and WordPress-based blogs support both RSS Summary and Content, Jekyll-based GitHub Pages and Tistory put all the post content in the RSS Summary. (...) Ghost basically provides a feature to set the Excerpt of a post, and this Excerpt value is used as the RSS Summary.

### 5\. Adding Images to the Generated Markdown File

For backup, images must be completely preserved. Unless the images are embedded in base64 in the HTML, they are all currently in the form of `img` tags with only `src` specified. If the server goes down, it won't be able to load images from the `img src`, so all images need to be downloaded at the time of backup.

I referred to [How to Download All Images from a Web Page in Python](https://www.thepythoncode.com/article/download-web-page-images-python) by [PythonCode](https://www.thepythoncode.com/).

```python
soup = bs(self.renderedData, features="html.parser")
for img in soup.findAll("img"):
    for imgsrc in ["src", "data-src"]:
        try:
            remoteFile = img[imgsrc]
            break
        except KeyError:
            continue

    if self.isDomain(remoteFile) != True:
        print("remoteFile", remoteFile, "is not a domain.")
        remoteFile = self.blogDomain + "/" + remoteFile
        print("Fixing it to", remoteFile)

    print('Trying to download "' + remoteFile + '" and save it at "' + self.directory + '/images"')
    self.download(remoteFile, self.directory + "/images")

    img["src"] = "images/" + remoteFile.split("/")[-1]
    img["srcset"] = ""
    print(img["src"])

self.renderedData = str(soup)
return self.renderedData
```

What this code does is:

1. It reads the string `renderedData` as HTML and finds all `img` tags.
2. It checks if there are `src` or `data-src` attributes. `data-src` is an attribute for WordPress compatibility.
3. It creates an images folder inside each post folder and saves the images there. The image name is the lowest directory of the img src. For example, if the `img src` is `https://blog.someone.com/images/example.png`, it is saved as `images/example.png`.
4. It changes the existing `img src` to the relative path of the `images` folder.
5. If it has a `srcset` attribute, it removes it (for Gatsby compatibility).

```python
def download(self, url, pathname):
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

One problem is that the image addresses are not consistent. Some sites write the full domain like `<img src = "https://example.png/images/example.png">`, while others write from the subdirectory like `<img src = "/images/example.png">`. There were also places with `<img src = "example.png">`. To handle as many cases as possible, I created a function `isDomain()` to detect the domain. Other libraries recognized file extensions like `.png` as top-level domains like `.com`, so I added some exception handling.

```python
def isDomain(self, string):
    if string.startswith("https://") or string.startswith("http://"):
        return True
    elif string.startswith("/"):
        return False
    else:
        return validators.domain(string.split("/")[0])
```

If it's not a directly accessible domain like `<img src = "/images/example.png">`, I specified to add the domain name in front. This is where the previously set `self.blogDomain` is used.

## Results

I tried backing up this blog. This blog is a self-hosted [Ghost](https://ghost.org) blog. Just running `main.py` will proceed with the backup.

![The backed-up posts. The folder names are set to the post titles.](E3B274.png)

![The appearance of a backed-up post on GitHub. The photos are also stored directly in the folder instead of the blog server.](E98816.png)

![The photos used in the post are saved in the folder.](C55153.png)

Based on testing, the following services are supported. The format or arrangement of posts may be slightly different, but the purpose of **backup** is sufficiently achieved.

- Ghost
- WordPress
- Jekyll-based GitHub Pages
- Gatsby-based GitHub Pages
- Medium
- Tistory

## Goal Achievement Evaluation

### Main Goal

- Both posts and photos should be backed up. ★★★
  The goal was fully achieved. Videos are not backed up, but since videos are usually embedded through YouTube anyway, there is a much lower probability of information loss. That's why it was excluded from the goal from the beginning.

### Bonus Goals

- It should be in a human-readable format. (Human-Readable Medium) ★★☆
  Compared to Ghost's built-in backup, important information can be seen at a glance in the Front Matter, and posts are rendered in almost the same form as the blog. It is also convenient to find desired materials as posts and photos are organized by folder. However, even though Markdown is used, the post body is in HTML, so it is inconvenient to edit posts. It's a backup that achieves just the purpose of _Lots of copies keep stuff safe_.

- It should be clear which photo goes into which location of which post. (In preparation for restoring the blog) ★★★
  It is clear which photo goes into which location of which post.

- Backup should be convenient. ★★☆
  `main.py` needs to be executed manually. I'm thinking of automating it with `crontab` someday.

Also, due to the nature of using RSS, only posts included in the RSS feed are backed up. RSS feeds often include only the latest posts to reduce bandwidth usage, and each blog has an option to adjust this. Ghost blogs include 15 of the latest posts in the RSS feed by default. The number of posts in the RSS feed of a Ghost blog cannot be manipulated within the Ghost CMS and requires modifying the [code of Ghost Core](https://github.com/TryGhost/Ghost/blob/master/core/server/models/plugins/pagination.js#L20).

- It should be possible to create a replica outside the blog. ★★☆
  When repeatedly downloading numerous photos from a WordPress blog, access may be temporarily blocked.

## Future Plans

After completing it and giving it some thought, I realized it could be a good tool for people who are planning to migrate their blog but are struggling with too much accumulated data. I plan to further improve it to become a tool that can help with blog migration.

## References

- [How to Download All Images from a Web Page in Python](https://www.thepythoncode.com/article/download-web-page-images-python) by [PythonCode](https://www.thepythoncode.com/)
- [Ghost Custom RSS Feed](https://ghost.org/tutorials/custom-rss-feed/)
- If the RSS feed contains unsupported Unicode characters, the script will not run properly. This is often caused by errors in the editor or blog, and services such as [Feed Validator](http://www.feedvalidator.org/) can be used to find and fix those characters for normal operation.
