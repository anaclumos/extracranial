---
lang: 'en'
slug: '/3E779E'
---

...Server. opposite of [[Microservices Architecture|MSA]]

### [Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%](https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90)

Prime Video, the video streaming service offered by Amazon, implemented a tool to monitor the quality of every stream customer view. The tool automatically identifies perceptual quality issues and triggers a process to fix them. Initially, the service consisted of distributed components orchestrated by AWS Step Functions, but this approach proved expensive and had to scale bottlenecks. Prime Video moved from a distributed microservices architecture to a monolith application to address these challenges. By consolidating all components into a single process, they achieved a larger scale, resilience, and reduced costs. The move eliminated the need for an intermediate storage system, simplified the orchestration logic, and allowed deployment on scalable instances provided by Amazon EC2 and Amazon ECS. This architectural change reduced infrastructure costs by over 90% and increased the service's scaling capabilities, enabling Prime Video to handle thousands of streams and potentially scale further.
