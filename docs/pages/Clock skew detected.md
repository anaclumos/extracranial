---
lang: 'en'
slug: '/6BA2C4'
---

```
make: warning: Clock skew detected. Your build may be incomplete.
```

This can happen when `make`-ing inside a VM and when VM has a different time than the Hosting Machine.

> _That message usually indicates that some of your files have modification times later than the current system time. Since make decides which files to compile when performing an incremental build by checking if a source file has been modified more recently than its object file, this situation can cause unnecessary files to be built, or worse, necessary files to not be built. However, if you are building from scratch \(not doing an incremental build\), you can likely ignore this warning without consequence._ - [makefile - Compiling C++ on remote Linux machine - "clock skew detected" warning - Stack Overflow](https://stackoverflow.com/questions/3824500/compiling-c-on-remote-linux-machine-clock-skew-detected-warning)

<head>
  <html lang="en-US"/>
</head>
