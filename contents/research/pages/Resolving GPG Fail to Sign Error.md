---
lang: 'en'
slug: '/43A592'
---

If you get...

```bash
git commit -m "add yarn.lock"
error: gpg failed to sign the data
fatal: failed to write commit object
```

Then...

```bash
brew upgrade gnupg
brew link --overwrite gnupg
brew install pinentry-mac
which pinentry-mac
```

Put the path into the `gpg-agent.conf` file.
If there is no `gpg-agent.conf` file found in the `~/.gnupg/` directory, create one.

```bash
touch ~/.gnupg/gpg-agent.conf
```

```bash
echo "test" | gpg --clearsign
```

```bash
git config --global gpg.program gpg
git config --global commit.gpgsign true
```

```bash
git log --show-signature -1
```

```bash
gpgconf --kill gpg-agent
```

Make sure you didn't delete `~.gnupg`.

## Reference

- [gpg failed to sign the data fatal: failed to write commit object \[Git 2.10.0\] - Stack Overflow](https://stackoverflow.com/questions/39494631/gpg-failed-to-sign-the-data-fatal-failed-to-write-commit-object-git-2-10-0)
