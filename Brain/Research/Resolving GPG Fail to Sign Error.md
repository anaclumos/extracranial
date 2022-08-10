---
title: 'Resolving GPG Fail to Sign Error'
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

Make sure you didn't delete `~.gnupg`.

## Reference

- [gpg failed to sign the data fatal: failed to write commit object \[Git 2.10.0\] - Stack Overflow](https://stackoverflow.com/questions/39494631/gpg-failed-to-sign-the-data-fatal-failed-to-write-commit-object-git-2-10-0)
