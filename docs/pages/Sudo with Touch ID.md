---
lang: 'en'
slug: '/88B68D'
---

```
sudo vim /etc/pam.d/sudo
```

```diff
  # sudo: auth account password session
+ auth       sufficient     pam_tid.so
  auth       sufficient     pam_smartcard.so
  auth       required       pam_opendirectory.so
  account    required       pam_permit.so
  password   required       pam_deny.so
  session    required       pam_permit.so
```


<figure>

![97E77D.png](./../.././docs/assets/97E77D.png)


</figure>

<head>
  <html lang="en-US"/>
</head>
