---
date: 2022-04-18
slug: '/ACC7AB'
---

## When you have...

```
Permissions 0644 for '~/.ssh/key.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
```

## Quick Fix

- Command this for individual keys

```
sudo chmod 600 ~/.ssh/key.pem
```

- Command this for the SSH Key folder

```
sudo chmod 700 ~/.ssh
```

## So what are these random digits?

- Each digit represents the access privilege of **User**, **Group**, and **Other**.

```
  7: 4(r) + 2(w) + 1(x) rwx read, write and execute
  6: 4(r) + 2(w) rw- read and write
  5: 4(r) + 1(x) r-x read and execute
  4: 4(r) r-- read only
  3: 2(w) + 1(x) -wx write and execute
  2: 2(w) -w- write only
  1: 1(x) --x execute only
  0: 0 --- none
```

- Therefore, chmod 600 means giving read and write access to the user and nothing to any other parties.
- Giving 755 means giving full access to the user and read, execute access to any other parties.
- Giving **777 🎰** means giving full access to everyone.

Note that [[Linux]] SSH manual says:

- [`~/.ssh/`](https://linux.die.net/man/1/ssh#:~:text=~/.ssh/%0AThis%20directory%20is%20the%20default%20location%20for%20all%20user%2Dspecific%20configuration%20and%20authentication%20information.%20There%20is%20no%20general%20requirement%20to%20keep%20the%20entire%20contents%20of%20this%20directory%20secret%2C%20but%20the%20recommended%20permissions%20are%20read/write/execute%20for%20the%20user%2C%20and%20not%20accessible%20by%20others.): This directory is the default location for all user-specific configuration and authentication information. There is no general requirement to keep the entire contents of this directory secret, but the recommended permissions are read/write/execute for the user and not accessible by others. (Recommends 700)
- [`~/.ssh/id_rsa`](https://linux.die.net/man/1/ssh#:~:text=~/.ssh/id_rsa%0AContains,file%20using%203DES.): Contains the private key for authentication. These files contain sensitive data and should be readable by the user but not accessible by others (read/write/execute). ssh will simply ignore a private key file if it is accessible by others. It is possible to specify a passphrase when generating the key, which will be used to encrypt the sensitive part of this file using 3DES. (Recommends 600)
