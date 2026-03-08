---
lang: 'en'
slug: '/A6DBE3'
---

- [[Assembly]]

| Command                | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| [[gdb]] `executable`   | starts executable                                                                               |
| `layout asm`           | prints [[Assembly]] codes                                                                       |
| CTRL+L                 | reformats terminal                                                                              |
| `b function_name`      | sets a breakpoint at function_name                                                              |
| `b *0x555555555712`    | sets a breakpoint at specified address                                                          |
| `run 1 (phase number)` | run with input                                                                                  |
| `x/x $register`        | prints register in hex                                                                          |
| `x/s $register`        | prints register in string                                                                       |
| `si`                   | step instruction                                                                                |
| `ni`                   | next instruction                                                                                |
| `finish`               | finishes current steps and go to next instruction                                               |
| `x/d $register`        | prints register in digit                                                                        |
| `break main`           | sets a breakpoint at the start of the main function.                                            |
| `run`                  | restarts the program when stopped in mid-execution.                                             |
| `next`                 | runs until the next source line is reached.                                                     |
| `where`                | returns a function call trace of how you got to this point and shows line numbers inside files. |
| `list`                 | prints surrounding code.                                                                        |
| `cont`                 | continues execution from the current location.                                                  |
| `quit`                 | quits [[gdb]]                                                                                   |
| `"%d %[^\n]"`          | integer + string                                                                                |
| `layout regs`          | layout all registers                                                                            |
| `disas function`       | jump to that function                                                                           |
| `x/1gx $rsp`           | print word from $rsp                                                                            |
| `x/32xb $rsp`          | print 32 bytes from memory address inside $rsp                                                  |
