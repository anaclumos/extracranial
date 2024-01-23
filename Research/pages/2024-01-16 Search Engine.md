---
lang: 'en'
slug: '/A87B43'
---

[[2024-01-16]]

- Hyperlinks
- Internet Archive: [Grateful Dead at Internet Archive](https://archive.org/details/GratefulDead)

## Surface Web

- Surface Web: Discoverable by Search Engines
- Deep Web: Not discoverable by Search Engines (Surface-level crawlers). Has 90% of the internet's data
  - Dark Web: Accessible through specific browsers like Tor

## [[Google Pizza Box]]

![[09853B.png]]

See content.

## Web Crawlers with Recursions

Web crawlers recurse with Hyperlinks:

- `call crawler(link) -> Get all hyperlinks in that page -> for link in all links, call_crawler(link)`

## Web Crawling Issues

### How to Crawl?

- **Quality** — find "best" pages
- **Efficiency** — avoid duplications
- **Etiquette** — don't disturb the website's performance (robots.txt includes information on this): [New York Times sues Microsoft and OpenAI for 'billions'](https://www.bbc.com/news/technology-67826601)

### How much to crawl?

- **Coverage** — How many % of the web?
- **Relative Coverage** — How many do competitors have?

### How often do you crawl?

- **Freshness** — How much has changed?
- How much has changed?

## [[Cohere Rerank]]

See content.

## Simplest Crawler Lifecycle

- Begin with known seed pages
- Fetch and parse a page, loop.
  - Whenever you discover a new link, enqueue.
  - Dequeue one by one.
- Not feasible in 1 machine; need to distribute
- Challenges
  - need to filter spam; or spider traps (A spider trap, also known as a crawler trap, is a set of web pages that can cause a web crawler or search bot to enter an infinite loop or other recursive situation, wasting its resources and affecting the crawler's ability to explore a website.)
- Non-malicious sites also have problems
  - Latency and bandwidth of remote servers
  - Robots.txt stipulation prevents web pages from being visited.
  - Mirrored or duplicate content
- Politeness; only visit it occasionally.

## Crawling Strategies

- BFS crawling brings in high-quality pages early in the crawl
- Adding links to the end of the queue (FIFO) results in a BFS
- Adding them to the front of the queue (LIFO) yields a DFS
- Prioritizing links in a certain way can create a "focused crawler" that targets "interesting" pages, such as
  - documents that change frequently
  - those whose content is relevant to a specific topic.
- One method of re-ordering the URLs on the queue is reordering by
  - High In-degree
  - High PageRank.

## Avoid Page Duplications

- Determine if the page is already seen
  - Must store URLs in a "standard" format
  - Must develop a fast way to check if a URL has already been seen: Use trie with `/` as the separator
- Determine if a new page has already been seen,
  - Identify whether a particular page was indexed
  - Identify whether a near-identical page was already indexed

## Anomalies

- Some anchors don't have links
- Some anchors produce dynamic pages with JS, which can lead to looping

## Representing URLs

URLs can be lengthy, with an average length of 80 bytes. Storing 1 trillion URLs would require 80 terabytes of storage space. Using the above calculation, Google found 30 trillion unique URLs, requiring 2400 terabytes (or 2.4 petabytes) of storage space.

One proposed method to determine if a new URL has already been seen involves hashing the host or domain name first, followed by using a trie data structure to check if the path or resource matches one in the URL database.

Another proposed method is to arrange it alphabetically and then save it in a text file using delta encoding. Each URL is stored as the difference (delta) between it and the previous URL. This method significantly reduces storage requirements. However, restoring the URL is slower, as all the deltas must be applied to the initial URL. To improve the speed of this process, periodic checkpointing is done by storing the full URL.

## Normalize URLs

1. Convert the scheme and host to lowercase as it is case-insensitive. Example: HTTP://www.Example.com/ → http://www.example.com/
2. Capitalize letters in escape sequences. All letters within a percent-encoding triplet should be capitalized. Example: http://www.example.com/a%c2%b1b → http://www.example.com/a%C2%B1b
3. Decode percent-encoded octets of unreserved characters. Example: http://www.example.com/%7Eusername/ → http://www.example.com/~username/
4. Remove the default port if it appears. Example: http://www.example.com:80/bar.html → http://www.example.com/bar.html

## Avoiding Spider Traps

A spider trap occurs when a crawler repeatedly visits the same web page. One of the most common types of spider traps is created using session IDs, which J2EE, ASP, .NET, and PHP manage. Session IDs are often used to keep track of visitors, and some websites put a unique ID in the URL. Each user gets a unique ID, and it's often requested from each page. The problem arises when Googlebot visits the page, spiders it, and then leaves. It then goes to another page and finds a link to the previous page, but since it has been given a different session ID, the link shows up as another URL. To avoid such traps, one way is for the crawler to be cautious when the query string "ID=" is present in the URL. Another technique is to monitor the URL length and stop if the length becomes too long.

## Handling Spam Web Pages

In the early days of spam web pages, the first generation of such pages used repeated words to rank high on search engines. They used a technique where the words were made invisible by rendering them the same color as the background. However, these pages still counted as the search engines indexed them.

The second generation of spam web pages used a technique called cloaking. When a web server detected a request from a crawler, it returned a different page than the one returned from a user request. This caused the page to be mistakenly indexed.

A third generation of spam web pages was called a doorway page. These pages contained text and metadata chosen to rank highly on specific search keywords. However, when a browser requests the doorway page, it will get a more "commercially oriented" page with more ads.

## Measuring and Tuning a Crawler

Improving the performance of a crawler essentially involves three main aspects: enhancing the speed of URL parsing, improving network bandwidth speed, and enhancing fault tolerance. There are several other issues that may arise, such as determining how often to restart the process (refresh strategies), detecting duplicate pages, identifying mirror sites, accelerating DNS lookup, normalizing URLs, and handling malformed HTML.

## DNS caching, pre-fetching and resolution

The implementation of DNS lookup in a common operating system may cause blocking, as only one request can be outstanding at a time. To overcome this limitation, there are three possible solutions:

1. DNS caching: Create a caching server that stores previously discovered IP-domain name mappings.
2. Pre-fetching client: Once a web page is parsed, immediately send DNS resolution requests to the caching server. If the request is unresolved, use UDP (User Datagram Protocol) to resolve it from the DNS server.
3. Customize the crawler: Allow the issuance of many resolution requests simultaneously by implementing many DNS resolvers. This will enable the crawler to handle multiple requests efficiently.

## Multi-Threaded Crawling

One of the main issues faced in downloading individual web pages is network delay. To overcome this bottleneck, it is recommended to have multiple threads running in parallel, with each thread requesting a page from a different host. A thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler. In most cases, a thread is a component of a process, and multiple threads can exist within the same process and share resources.

To ensure an equitable distribution of requests across different hosts and maximize throughput while avoiding overloading any single server, URLs should be distributed to threads. In the earlier days of Google, the spider had multiple coordinated crawlers with around 300 threads each. Together, they were able to download over 100 pages per second in 2010. It is estimated that in 2021, Google downloads around 50,000 pages per second, or 4 billion+ in a day.

## Distributed Crawling Approaches

After optimizing the crawler program, the next step is to determine how many crawlers will run simultaneously. Two scenarios can be considered.

In scenario 1, a centralized crawler controls a set of parallel crawlers, which run on a local area network. A parallel crawler comprises multiple crawling processes that communicate through the network, also known as an intra-site parallel crawler.

In scenario 2, a distributed set of crawlers run on widely distributed machines, and may or may not communicate with each other.

When running crawlers in different geographic locations, it's important to organize them effectively. This can be done by country, region, or available bandwidth. Distributed crawlers should periodically update a master index. Fortunately, incremental updates are generally inexpensive due to the ability to compress and send only a differential update, which limits the required communication.

### Benefits

- Scalability: Large-scale web crawls can be easily handled.
- Cost-effectiveness: Cheaper machines can be used.
- Network load reduction: By dividing the web into regions, only the nearest pages are crawled.

### Issues

- Overlap: Multiple downloaded pages should be minimized.
- Quality: The crawl strategy determines the quality of the results.
- Communication bandwidth: Minimization is required to ensure smooth communication.

### Three strategies

#### Independent

No coordination between the processes and each process follows its own extracted links.

#### Dynamic assignment

A central coordinator dynamically divides the web into small partitions and assigns each partition to a process.

#### Static assignment

The web is partitioned and assigned to processes without a central coordinator before the crawl starts.

## Classification of Parallel Crawlers

When using exchange mode for web crawling, there are two ways to limit communication between processes. The first way is through batch communication, where every process collects some URLs and sends them in a batch. The second way is through replication, where the k most popular URLs are replicated at each process and are not exchanged (either from the previous crawl or on the fly).

There are different ways to partition the Web. URL-hash-based partitioning yields many inter-partition links, while site-hash-based partitioning reduces inter-partition links. Hierarchical partitioning can be done by top-level domains (TLDs), such as the .com domain, .net domain, and so on.

In general, based on the research by Cho and Garcia-Molina, firewall crawlers are cost-effective and provide good, general coverage. However, cross-over crawlers ensure 100% quality but suffer from overlap. Replicating URLs and using batch communication can help reduce overhead.

## Freshness

Web crawlers behave according to a set of policies that determine which pages to download, when to check for changes, how to avoid overloading websites, and how to coordinate distributed web crawlers. The web is constantly changing, with new pages, updated pages, and deleted pages. To stay up-to-date, crawlers periodically check crawled pages for updates and deletions, using the LastModified indicator to determine if a page has changed. They only reload the entire page if necessary. Crawlers also track how often each page is updated and preferentially return to pages that are historically more dynamic. To optimize the freshness of more popular pages, they preferentially update pages that are accessed more often.

## Implications for a Web Crawler

Search engines usually use multiple crawlers that run constantly without interruption. When a crawler replaces an old version of a page with a new one, there are two ways to do it - in-place or shadowing.

### Shadowing

If shadowing is used, a new set of pages is collected and stored separately, and all of them are updated simultaneously. This means that queries need to search through two databases - the current database and the database of new pages. Shadowing can slow down query processing or reduce the freshness of the search results. Therefore, it is best to run multiple types of crawlers and update the index in place to ensure it stays current.
