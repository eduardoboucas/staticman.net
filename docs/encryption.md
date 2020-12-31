---
layout: docs
title: Encryption
permalink: /docs/encryption
weight: 6
---
With config files in public repositories being accessible by anyone, it's important to protect any sensitive information (such as keys and passwords) by using encryption. Staticman provides an endpoint that people can use to encrypt any given text, and the result it provides is an encrypted string that is safe to use in a public config.

Imagine that you want to store a reCaptcha secret of `1q2w3e4r`. Hit the following endpoint with a GET request:

```
https://api.staticman.net/v2/encrypt/1q2w3e4r
```

Then add the result to the config file.

```yml
reCaptcha:
  secret: SofS3tlOOQ9k/4x4v/rA3vKjb8rfm9a2fTUdPHgbkCA9M3QDWf4Z452+OWJ5u1EWGY9BlLEk2suoRTv1usYUfPH8LP2VBnPD/r5pQtJwoR3brQtqO1/AVvG6VRISpGGiK6/dyPGY8RvxfQqV6n45b57SnnPVfQpRYFvH9j+jYE8=
```