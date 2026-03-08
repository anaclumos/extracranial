---
lang: 'en'
slug: '/DC5F10'
aliases: ['atproto', 'Authenticated Transfer Protocol', 'AT 프로토콜']
---

The Authenticated Transfer Protocol (AT Protocol or atproto) is a distributed social application framework that enables large-scale federation. It addresses some of the limitations and challenges associated with current social networking technologies and aims to offer better scalability, user choice, data portability, and more robust data security.

1. **Identity:** Users in the AT Protocol are identified by domain names, which [[map]] to cryptographic URLs. This ensures security for the user's account and data.
2. **Data Repositories:** User data is shared and managed in the form of signed data repositories, which can contain various records, including posts, comments, likes, and so forth.
3. **Federation:** The protocol operates on a federated networking model to maintain usability and reliability. It uses standard web technologies like [[HTTP]] and WebSockets to synchronize data between servers.
4. **Interoperation:** The AT Protocol uses a global schemas network known as Lexicon to enable [[interoperability]] across servers, allowing software from different organizations to understand each other's data without needing to exchange rendering code.
5. **Scaling and User Choice:** The protocol's architecture includes Personal Data Servers (PDS) that host user data, manage identity, and facilitate interactions with other services. There are also Big Graph Services (BGS) that handle events like retrieving metrics, content discovery, and user search.
6. **Algorithmic Choice:** Users can select their aggregators, so they can choose how they interact with and discover content.
7. **Account Portability:** The protocol assumes that any PDS can fail at any time; hence it has built-in features to ensure that users can move their account to a new PDS without needing the old server's help. This is achieved through the use of signed data repositories and DIDs, or Decentralized Identifiers, which are secure and independent.
8. **Speech, Reach, and Moderation:** The protocol divides the concept of speech (content creation) and reach (content discovery) into separate layers. This allows for a flexible and scalable architecture that gives everyone a voice.

AT Protocol is not a [[blockchain]] nor uses [[blockchain]] technology. It's also different from existing solutions like [[ActivityPub]] due to a focus on portability and other unique design principles. The AT Protocol utilizes its formats like Lexicon and XRPC over [[Alternative|alternatives]] like [[Resource Description Framework]] and [[JSON-LD]] due to better developer experience and usability. These tools are designed to make distributed systems development easier and more robust.
