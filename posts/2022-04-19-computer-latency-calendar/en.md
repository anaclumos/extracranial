---
title: 'The Computer Latency Calendar ⏳'
date: 2022-04-19
authors: anaclumos
slug: '/DDA06F'
---

I recently saw this [Gist](https://gist.github.com/hellerbarde/2843375) and [Interactive Page](https://colin-scott.github.io/personal_website/research/interactive_latency.html), so I thought it would be cool to update it for the 2020s. This can serve as a visualization of how fast a modern computer is.

## How to read this calendar

Imagine 1 CPU cycle took 1 second. Compared to that, A modern 4.0 GHz CPU has a CPU cycle of 0.25 ns approx. That's 4,000,000,000 times difference. Now, imagine how that CPU would feel one second in real life.

| Action                                    | Physical Time | CPU Time     |
| ----------------------------------------- | ------------- | ------------ |
| 1 CPU Cycle                               | 0.25ns        | 1 second     |
| L1 cache reference                        | 1ns           | 4 seconds    |
| Branch mispredict                         | 3ns           | 12 seconds   |
| L2 cache reference                        | 4ns           | 16 seconds   |
| Mutex lock                                | 17ns          | 68 seconds   |
| Send 2KB                                  | 44ns          | 2.93 minutes |
| Main memory reference                     | 100ns         | 6.67 minutes |
| Compress 1KB                              | 2μs           | 2.22 hours   |
| Read 1MB from memory                      | 3μs           | 3.33 hours   |
| SSD random read                           | 16μs          | 17.78 hours  |
| Read 1MB from SSD                         | 49μs          | 2.27 days    |
| Round trip in the same data center        | 500μs         | 23.15 days   |
| Read 1MB from the disk                    | 825μs         | 38.20 days   |
| Disk seek                                 | 2ms           | 92.60 days   |
| Packet roundtrip from California to Seoul | 200ms         | 25.35 years  |
| OS virtualization reboot                  | 5s            | 633 years    |
| SCSI command timeout                      | 30s           | 3,802 years  |
| Hardware virtualization reboot            | 40s           | 5,070 years  |
| Physical system reboot                    | 5m            | 38,026 years |
