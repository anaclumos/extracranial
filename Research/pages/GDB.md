---
lang: 'en'
slug: '/45FE18'
---

- [Debugging Programs with GDB](https://www.cs.rochester.edu/u/nelson/courses/csc_173/review/gdb.html)
- [[Inspecting Assembly]]

| Command      | Description                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `break main` | sets a breakpoint at the start of the main function.                                            |
| `run`        | restarts the program when stopped in mid-execution.                                             |
| `next`       | runs until the next source line is reached.                                                     |
| `where`      | returns a function call trace of how you got to this point and shows line numbers inside files. |
| `list`       | prints surrounding code.                                                                        |
| `cont`       | continues execution from the current location.                                                  |
| `quit`       | quits `gdb`                                                                                     |
