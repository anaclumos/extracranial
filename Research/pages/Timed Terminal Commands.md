---
lang: 'en'
slug: '/DC60F1'
---

[[Lesser Known Trick]]. Add this to `~/.zshrc` or anything equivalent.

## Mac

```bash

preexec() {
    timer=$(gdate +%s.%N)
}

precmd() {
    if [ -n "$timer" ]; then
        now=$(gdate +%s.%N)
        elapsed=$(echo "$now - $timer" | bc)

        # Convert elapsed time to hours, minutes, and seconds
        hours=$(echo "$elapsed/3600" | bc)
        minutes=$(echo "($elapsed%3600)/60" | bc)
        seconds=$(echo "$elapsed%60" | bc)

        # Format the timer display
        timer_show=$(printf "%02dh %02dm %02ds" $hours $minutes $seconds)

        echo "⌛ Done in ${timer_show}."
        unset timer
    fi
}

```

## Linux

```bash
preexec() {
    timer=$(date +%s.%N)
}
precmd() {
    if [ -n "$timer" ]; then
        now=$(date +%s.%N)
        elapsed=$(echo "scale=3; $now - $timer" | bc)
        # Convert elapsed time to hours, minutes, and seconds
        hours=$(echo "scale=0; $elapsed/3600" | bc)
        minutes=$(echo "scale=0; ($elapsed%3600)/60" | bc)
        seconds=$(echo "scale=3; $elapsed%60" | bc)
        # Format the timer display
        timer_show=$(printf "%02dh %02dm %05.2fs" $hours $minutes $seconds)
        echo "⌛ Done in ${timer_show}."
        unset timer
    fi
}
```
