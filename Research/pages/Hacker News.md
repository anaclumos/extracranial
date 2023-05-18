---
lang: 'en'
slug: '/FA003B'
aliases: ['HN']
---

[Hacker News](https://news.ycombinator.com/)

![[FDAA68.png]]

## [How to hack Hacker News (and consistently hit the front page)](https://www.indiehackers.com/post/how-to-hack-hacker-news-and-consistently-hit-the-front-page-56b4a04e12)

Your content needs to be either:

- Newsworthy
- Investigative (research)

### The War Room

1.  Fetch data from Hacker News API
2.  Set up Google Alerts for your query
3.  Fetch data from Google Alerts XML
4.  Enrich data and store it in an SQLite file with a cronjob
5.  Send alerts with another cronjob to Twist API or Telegram API
6.  Then add chatGPT in the mix and ask for a rating between 0-100 and why the article is getting that rating. We send ourselves alerts when the rating is 30+
