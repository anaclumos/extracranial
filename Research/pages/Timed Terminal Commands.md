---
lang: 'en'
slug: '/DC60F1'
---

[[Lesser Known Trick]]. Add this to `~/.zshrc` or anything equivalent.

```bash
preexec() {
  timer=$(gdate +%s.%N)
}

precmd() {
  if [ -n "$timer" ]; then
    now=$(gdate +%s.%N)
    elapsed=$(echo "$now - $timer" | bc)
    timer_show=$(printf "%.2f" $elapsed)
    echo "⏱  ${timer_show}s"
    unset timer
  fi
}

```
