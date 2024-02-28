---
lang: 'en'
slug: '/46F65C'
---

## Early Search Engines

- **Archie (1990):** Created by Alan Emtage, P. Deutsch, et al., Archie is recognized as the first tool designed to search FTP servers, marking the beginning of search engine technology.
- **Veronica and Jughead (1993):** These tools were developed to search text files on Gopher servers, expanding the capabilities of search beyond FTP servers.
- **Excite (1993):** Founded by Stanford undergraduates, Excite improved search engine technology by incorporating statistical analysis of word relationships, enhancing search results.
- **World Wide Web Wanderer (1993):** Developed by Matthew Gray, this was one of the first efforts to measure the growth of the web.
- **ALIWEB (1993):** Created by Martijn Koster, ALIWEB is considered the first web search engine, allowing users to find web pages.
- **Lycos (1994):** Quickly cataloging millions of documents, Lycos became a significant player in the search engine market.
- **Infoseek (1994):** Achieving prominence by becoming Netscape's default search engine, Infoseek offered efficient search capabilities.
- **Yahoo (1994):** Starting as a directory of websites organized by topic, Yahoo eventually incorporated search engine features.
- **AltaVista (1995):** Known for its advanced search features, AltaVista was a popular search engine in the mid-1990s.
- **Google (1998):** Founded by Larry Page and Sergey Brin, Google revolutionized search engine technology and eventually became the leading search engine worldwide.

## Search Engine Components

A search engine comprises several key components:

- **User:** The individual initiating the search query.
- **Web:** The vast collection of interconnected documents and resources.
- **Crawler (Spider):** A program that traverses the web to collect pages.
- **Indexer:** The component that processes collected pages to create searchable indexes.
- **Ads:** Targeted advertisements relevant to the user's query.
- **Query Processor:** The engine that processes user queries, retrieves relevant results, and ranks them based on relevance and other factors.

## Web Crawler Policies

Web crawlers follow specific policies to dictate page selection, revisit timing, website politeness, and coordination among distributed crawlers. Strategies to maintain freshness include checking `LastModified` indicators and prioritizing dynamic or popular pages. Policies also address the frequency of revisits, with some advocating a uniform approach while others suggest a proportional strategy based on change frequency.

## Search Engine Evaluation

The effectiveness of a search engine is often measured by its precision and recall:

- **Precision:** The ratio of relevant items retrieved to all retrieved items.
- **Recall:** The ratio of relevant items retrieved to all relevant items in the collection.

The F1 score, a harmonic mean of precision and recall, is used to provide a single metric that balances the two. The formula for the F1 score is:

$$
F = {1 \over {1 \over 2} ({1 \over R} + {1 \over P})} = {2RP \over (R+P)}
$$

Additionally, the $F_\beta$ score allows for adjusting the relative importance of recall and precision, accommodating different search scenarios and user needs.

$$
F_\beta = {{(\beta ^ 2 + 1) RP} \over R + \beta^2 P}
$$

## Pythagorean Means

Pythagorean means offer three ways to calculate the average of a set of numbers, each providing different insights:

- **Arithmetic Mean:** The sum of numbers divided by the count. For example, $(3+6+9+12)/4 = 7.5$.
- **Geometric Mean:** The nth root of the product of the numbers. For sets 3, 6, 9, and 12, the geometric mean is the 4th root of 1944, approximately $6.64$.
- **Harmonic Mean:** The reciprocal of the arithmetic mean of the reciprocals. For 3, 6, 9, 12, the harmonic mean is $1 / ((1/3+1/6+1/9+1/12)/4) = 5.88$.

## Evaluation Metrics

Evaluation metrics are crucial for assessing the effectiveness of search engines.

- **Mean Average Precision (MAP):** Assumes that a relevant document not retrieved has a precision of zero, emphasizing the importance of retrieving all relevant documents across queries.

- **Discounted Cumulative Gain (DCG):** Evaluates the quality of the search results based on their order, penalizing relevant documents that appear lower in the search result list. DCG is calculated using the formula:

$$
  \text{DCG}_p = \sum_{i=1}^p {\text{rel}_i \over \log(i + 1)} = \text{rel}_1 + \sum_{i=2}^p {\text{rel}_i \over \log(i + 1)}
$$

or a variant that emphasizes retrieving relevant documents:

$$
  \text{DCG}_p = \sum_{i=1}^p {2^{\text{rel}_i} - 1 \over \log{(i+1)}}
$$

## Document Similarity and Deduplication

Efficient handling of document similarity and deduplication is key to maintaining the quality and relevance of search results.

- **Shingling:** Identifies similar documents by comparing sets of contiguous subsequences of words. For instance, the 4-shingling of "a rose is a rose is a rose" produces a set of unique shingles.

- **Jaccard Similarity:** Measures the similarity between two sets, defined as the size of their intersection divided by the size of their union.

- **SimHash:** A technique for approximating the Jaccard similarity by generating a fingerprint for each document. Documents are considered near-duplicates if the Hamming distance between their SimHash values is below a certain threshold.

## Distance Measures

Distance measures are used to quantify how dissimilar two items are, with applications ranging from clustering to anomaly detection.

- **Euclidean Distance:** Measures the straight-line distance between two points in Euclidean space.
- **Jaccard Distance:** Complements the Jaccard similarity, measuring the dissimilarity between two sets.

- **Cosine Distance:** Measures the cosine of the angle between two vectors, often used to determine the orientation similarity between documents.

- **Edit Distance:** Quantifies the minimum number of operations required to transform one string into another, useful for spelling correction and similar applications.

- **Hamming Distance:** Counts the positions at which two strings of equal length differ, applicable in coding theory and data transmission.

## Deduplication Techniques

To manage duplicate content, search engines employ strategies like fingerprinting with cryptographic hashing (e.g., MD5, SHA-1, SHA-2) and selecting random positions in documents for comparison.

## Term Frequency-Inverse Document Frequency (TF-IDF)

### Frequency

**Assumption:** The more frequent terms in a document are more critical, i.e., more indicative of the topic.

- $f_{ij}$ = frequency of term _i_ in document _j_.
- We normalize term frequency ($tf$) across the entire corpus $t_i$ as:

$$
  t_i = \frac{f_{ij}}{max(f_{ij})}
$$

Terms that appear in many different documents are less indicative of the overall topic.

- $df_i$ = document frequency of term _i_ = number of documents containing term _i_.
- $df_i \leq N$. $idf_i = \log_2(\frac{N}{df_i})$.

  An inverse document frequency of term _i_ = $\log_2(\frac{N}{df_i})$. A log is used to indicate a term's discrimination power.

### Combined Term Importance Indicator: TF-IDF Weighting

$$
w_{ij} = tf_{ij} \cdot idf_i = (1 + \log(tf_{ij})) \times \log(\frac{N}{df_i})
$$

A term occurring frequently in the document but rarely in the rest of the collection is given high weight.

### Query Scoring

Given a query $q$, we score the query against a document $d$ using the formula:

$$
Score(q, d) = \sum (tf \cdot idf_{t,d})
$$

where $t$ is in $q \cap d$.

### Example

Given a document containing 3 terms with given frequencies $A(3), B(2), C(1)$. Assume the collection contains 10,000 documents, and document frequencies of these 3 terms are:

- $A(50), B(1300), C(250)$.

Then:

- $A$: $tf = 3/3$; $idf = \log(10000/50) = 5.3$; $tf \cdot idf = 5.3$
- $B$: $tf = 2/3$; $idf = \log(10000/1300) = 2.0$; $tf \cdot idf = 1.3$
- $C$: $tf = 1/3$; $idf = \log(10000/250) = 3.7$; $tf \cdot idf = 1.2$

## Search Engine Similarity Measures

### Frequency

**Assumption** — The more frequent terms in a document are more critical, i.e., more indicative of the topic.

$$
f_{ij} = \text{frequency of term } i \text{ in document } j
$$

We normalize term frequency ($tf$) across the entire corpus $t_i$ as follows:

$$
t_i = \frac{f_{ij}}{\max(f_{ij})}
$$

Terms appearing in many documents are less indicative of the overall topic.

$$
df_i = \text{document frequency of term } i = \text{number of documents containing term } i
$$

$$
df_i \leq N
$$

$$
idf_i = \log_2 \left( \frac{N}{df_i} \right)
$$

An inverse document frequency of term $i$ indicates a term's discrimination power. A log is used to dampen the effect relative to $tf$.

**Combined term importance indicator, tf-idf weighting**,

$$
w_{ij} = t_{fij} \cdot idf_i = (1 + \log t_{fij}) \times \log \left( \frac{N}{df_i} \right)
$$

A term occurring frequently in the document but rarely in the rest of the collection is given high weight.

**Given a query $q$, we score the query against a document $d$ using the formula**,

$$
\text{Score}(q, d) = \sum (tf \cdot idf_{t,d}) \text{ where } t \text{ is in } q \cap d
$$

### Similarity Measure

The similarity measure is a function that computes the degree of similarity between two vectors.

**Similarity between vectors** for the document $d_j$ and query $q$ can be computed as the vector inner product:

$$
sim(d_j, q) = \mathbf{d}_j \cdot \mathbf{q} = \sum_{i=1}^{t} w_{ij} \cdot w_{iq}
$$

For binary vectors, the inner product is the number of matched query terms in the document (hamming distance). For weighted term vectors, it is the sum of the products of the matched term weights.

### Binary example

- D = [1, 1, 0, 1, 1, 0, 0]
- Q = [1, 0, 1, 0, 0, 1, 1]
- $\text{similarity}(D, Q) = 3$ (the inner product)

### Weighted example

- $\mathbf{D}_1 = 2T_1 + 3T_2 + 5T_3$
- $\mathbf{Q} = 0T_1 + 0T_2 + 2T_3$
- $\text{sim}(\mathbf{D}_1, \mathbf{Q}) = 2*0 + 3*0 + 5*2 = 10$

Cosine similarity measures the cosine of the angle between two vectors.

### Cosine Similarity

$$
\text{CosSim}(d, q) = \frac{\mathbf{d}_j \cdot \mathbf{q}}{||\mathbf{d}_j|| \cdot ||\mathbf{q}||}
$$

$$
\text{CosSim}(\mathbf{D}_1, \mathbf{Q}) = \frac{10}{\sqrt{(4+9+25)} \cdot \sqrt{(0+0+4)}} = 0.81
$$

### Document Conversion

Convert all documents in collection $D$ to $tf \cdot idf$ weighted vectors, $\mathbf{d}_j$, for keywords in vocabulary $V$. Convert each query to a $tf \cdot idf$ weighted vector $q$. For each $\mathbf{d}_j$ in $D$ do, compute score $s_j = \text{CosSim}(\mathbf{d}_j, q)$. Sort documents by decreasing the score. Time complexity is $O(|V| \cdot |D|)$.

### Query Representation

Represent the query as a weighted $tf \cdot idf$ vector. Compute the cosine similarity score for the query vector and each document vector that contains the query term. Rank documents to the query by score. Return the top $k$ (e.g., $k=10$) to the user.

## Preprocess

Pre-compute, for each term, its k nearest docs. Treat each term as a 1-term query. A lot of preprocessing is involved. The result is a "preferred list" for each term.

## Search

For a t-term query, take the union of their preferred lists - call this set S. Compute cosines from the query to only the docs in S, and choose top k. This approach misses semantic and syntactic information and assumes term independence. It lacks the control of Boolean models.

## Standing queries

Examples include Google Alerts.

## Classification Approaches

- Manual Classification
- Hand-coded Rule-based Classifiers
- Supervised Learning

The most straightforward feature selection is to use the most common terms. This works well in scenarios such as Naive Bayes for Spam Filtering. The advantages include speedy learning and testing, low storage requirements, and suitability with many equally important features. This method is robust to many irrelevant features.

## Vector Space Classification

The training set corresponds to a labeled set of points (vectors) in vector space classification.

**Premise 1** — Documents in the same class form a contiguous region of space.

**Premise 2** — Documents from different classes are separate.

To learn a classifier, build surfaces to delineate classes in the space.

## Centroid

The centroid for a class $c$ is calculated as:

$$
\vec{\mathbf{u}}(c) = \frac{1}{|D_c|} \sum_{d \in D_c} \vec{d}
$$

where $D_c$ is the set of all documents that belong to class $c$ and $\vec{d}$ is the vector space representation of $d$. The centroid is generally not a unit vector.

## Rocchio Classification

Rocchio forms a simple representative for each class: the centroid/prototype. Classification is based on the nearest prototype/centroid.

## kNN (k Nearest Neighbor)

To classify a document $d$:

Define k-neighborhood as the k nearest neighbors of $d$. Pick the majority class label in the k-neighborhood. For larger k, we can roughly estimate $P(c|d)$ as $\frac{\#(c)}{k}$. This is based on the contiguity hypothesis.

## Nearest-Neighbor Learning

Learning involves just storing the labeled training examples, $D$.

For a testing instance $x$ (under 1NN), compute the similarity between $x$ and all examples in $D$. Assign $x$ the category of the most similar example in $D$. This method does not compute anything beyond storing the examples and is also called case-based learning and memory-based learning, labeled as lazy learning. It can be erroneous due to a single atypical example or noise. To improve, find k (3, 5, odd) examples and return the majority to improve.

## Inverted Index

An inverted index is typically composed of a vector containing all distinct words of the text collection in lexicographical order (the vocabulary), and for each word in the language, a list of all documents (and text positions) in which that word occurs.

## Case Folding

Convert uppercase letters to lowercase.

## Stemming

Reduce words to their morphological roots.

## Stop Words

Remove prevalent words. Inverted indexes are very sparse, so sorted linked lists are used. Skip pointers are used to make the merge faster.

## Biword Inefficiency

Using biwords for phrase queries can be inefficient. Instead, one can extract inverted entries for each distinct term and merge the document-position lists to identify all positions where phrases occur.

## Part-of-Speech Tagging

By tokenizing text and performing part-of-speech tagging, one can classify terms such as:

- Nouns (N)
- Function words (X), including articles and prepositions

Strings of terms following the pattern NX\*N (where "\*" represents zero or more occurrences) are considered extended by biwords and added to the vocabulary. For example, the phrase "renegotiation of the constitution" becomes "renegotiation constitution" after removing non-nouns.

## N-Grams

An n-gram is a sequence of n consecutive words. They form a Zipf distribution where common n-grams often contain stop words. The inverted index for n-grams includes pointers to all dictionary terms containing them. Note that larger values of n require more storage space for n-grams.

## Dynamic Indexing

The simplest method for dynamic indexing involves the following:

- Maintaining a primary index for existing documents.
- New documents go into a smaller auxiliary index.
- Searches are conducted across both, with results merged periodically.
- Deletions are managed using an invalidation bit-vector to filter out deleted documents.
- Re-indexing is done periodically to merge into one main index.

## Query Box Operations

- The default operation is AND.
- OR and wildcard searches are supported.
- Use "+" to include stop words in a search.
- OR operations are evaluated first.
- Proximity matters: Google prioritizes pages with search terms near each other and in the same order as the query.
- Case insensitivity: Google search is not sensitive to case.
- Certain punctuation and special characters are ignored.

## Special Search Operators

- `filetype`: Specify a particular file type.
- `inanchor`: Search for text in a page's anchor.
- `intext`: Search for text in the body of a document.
- `intitle`: Search for text in the title of a document.
- `inurl`: Search within the URL of a page.
- `site`: Restrict search to a specific site.
- `cache:url`: View the cached version of a site.
- `info`: Show information about a page.
- `stocks`: Search for stock information.
- Note: The `phonebook` feature has been discontinued.

## Mean Reciprocal Rank (MRR)

The mean reciprocal rank (MRR) is a statistical measure used for evaluating systems that return a list of responses to a set of queries, ordered by probability of correctness. The reciprocal rank of a query response is the multiplicative inverse of the rank of the first correct answer. MRR is calculated as the average of the reciprocal ranks of results for a sample of queries.

The formula for MRR is given by:

$$
MRR = \frac{1}{|Q|} \sum_{i=1}^{|Q|} \frac{1}{\text{rank}_i}
$$

where $|Q|$ is the number of queries, and $\text{rank}_i$ is the rank of the correct answer for the $i^{th}$ query.

## Example

Consider a system that translates English words to their plurals, making three guesses for each query. The system ranks these guesses, with the first being the most likely correct. Here's how the MRR is calculated for three sample queries:

| Query | Results              | Correct Response | Rank | Reciprocal Rank |
| ----- | -------------------- | ---------------- | ---- | --------------- |
| Cat   | Catten, cati, cats   | Cats             | 3    | 1/3             |
| tori  | Torii, tori, toruses | tori             | 2    | 1/2             |
| virus | Viruses, virii, viri | viruses          | 1    | 1               |

The MRR, in this case, is calculated as follows:

$$
MRR = \left( \frac{1}{3} + \frac{1}{2} + 1 \right) \div 3 = \frac{11}{18} \approx 0.61
$$

This example demonstrates the calculation of MRR using three queries and their respective reciprocal ranks.

# MapReduce Overview

MapReduce is a programming model designed to efficiently process large datasets across distributed clusters. It simplifies parallel computation, fault tolerance, I/O scheduling, and monitoring.

## Features

- **Automatic Parallelization:** Code is executed across multiple threads and processors without manual intervention.
- **Fault Tolerance:** Provides robustness against the failure of one or more nodes within the system.
- **I/O Scheduling:** Efficiently manages input and output operations across the cluster.
- **Monitoring & Status Updates:** Keeps track of the progress and health of the distributed computing tasks.

## How MapReduce Works

1. **Map Function:** Processes chunks of data, converting them into key-value pairs.
2. **Shuffle Step:** A master controller organizes the key-value pairs, distributing them across reduced tasks based on keys.
3. **Reduce Function:** Each reduce task processes a set of key-value pairs, aggregating the values based on the keys.

### Example

- The Map function parses documents, extracting words as keys and assigning an integer `1` for each occurrence.
- The Reduce function then counts the occurrences of each word across all documents.

## Fault Tolerance Mechanisms

- If a task fails, it is retried on another node; persistent failures result in job failure.
- If a node fails, its current and past map tasks are redistributed to other nodes.
- Slow tasks may be executed in parallel on other nodes for efficiency.

## Cluster Architecture

- Racks contain 16-64 nodes, with intra-rack connections via Ethernet.
- Racks are interconnected through switches.

## Search Result Ranking

### Poisoning Search Results

- Adjust the ranking function to reward or penalize search results based on relevance and position.
- Acceptable ranking functions may include direct proportionality to rank values, such as `rank`, `rank^2`, or `n^rank`.

## Semantic Web and RDF

RDF (Resource Description Framework) triples in the form `Subject - Predicate -> Object`, enabling the linking of disparate data sources and enhancing search result breadth and accuracy.

### Benefits of RDF

- **Data Integration:** Allows data merging even when structures vary.
- **Faceted Search:** Provides facets for filtering and refining search results.
- **Inference:** Enables search engines to infer relationships, enriching search results.

## Performance Optimizations

### Data Structures

Utilize efficient data structures like inverted indexes and hash tables for rapid access and retrieval.

### Computational Machinery

Employ distributed computing and specialized hardware to accelerate data processing.

### Disk Space

Apply data compression and deduplication to optimize storage requirements.

### Bandwidth

Leverage caching and CDNs to minimize bandwidth usage and enhance retrieval speeds.

## Classification Techniques

### Aggregation Methods

- **Rocchio:** Centroid-based aggregation.
- **k-Nearest Neighbors (kNN):** Aggregation based on the closest k documents.

### Geometry

Both Rocchio and kNN utilize a geometry of points within the feature space.

### Robustness

- **Rocchio:** Sensitive to noise and outliers.
- **kNN:** Offers better robustness to noise compared to Rocchio and Nearest Neighbor.
- **Nearest Neighbor (k=1):** Similar to Rocchio in terms of sensitivity to noise.
