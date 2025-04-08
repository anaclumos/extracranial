---
lang: 'en'
slug: '/3EEC3A'
---

https://github.com/brannondorsey/mem-isolate

## Purpose

`mem-isolate` allows you to run potentially unsafe or memory-leaking code safely by isolating it in a separate process.

## Core Mechanism

Uses the POSIX ‎`fork()` system call to create a child process that executes a user-supplied function in isolation.

## Guarantee

Ensures memory purity—changes in the child process do not affect the parent process.

## How It Works

1. Creates a ‎`pipe()` for communication.
2. Calls ‎`fork()` to spawn a child process.
3. Executes the function in the child.
4. Sends the result back to the parent via the pipe.
5. Parent waits for the child to finish and returns the result.
