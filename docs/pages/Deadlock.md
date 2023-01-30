---
lang: 'en'
slug: '/FA1348'
---

> In concurrent computing, deadlock is any situation in which no member of some group of entities can proceed because each waits for another member, including itself, to take action, such as sending a message or, more commonly, releasing a lock. Deadlocks are a common problem in multiprocessing systems, parallel computing, and distributed systems. In these contexts, systems often use software or hardware locks to arbitrate shared resources and implement process synchronization. [Deadlock](https://en.wikipedia.org/wiki/Deadlock)

When all of the following happen:

- bounded resource: a finite number of access
- everyone is waiting without anyone releasing the resource from hold
- no preemption (resource cannot be revoked)
- Circular wait. _What? I was waiting for you. And you were waiting for me?_

<head>
  <html lang="en-US"/>
</head>
