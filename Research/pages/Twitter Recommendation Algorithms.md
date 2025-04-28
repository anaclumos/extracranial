---
lang: 'en'
slug: '/B128EE'
---

## [Twitter's Recommendation Algorithm](https://blog.twitter.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm) ([GitHub](https://github.com/twitter/the-algorithm))

![[BF2F47.png]]

1. Fetch the best Tweets from different recommendation sources in a process called **candidate sourcing**.
2. **Rank** each tweet using a machine learning model.
3. Apply **heuristics and filters**, such as filtering out Tweets from users you've blocked, NSFW content, and Tweets you've already seen.

Home Mixer is built on Product Mixer, a custom Scala framework that facilitates building feeds of content, and the service responsible for constructing and serving the For You timeline is called Home Mixer. This service acts as the software backbone connecting different candidate sources, scoring functions, heuristics, and filters.
