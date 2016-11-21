---
layout: docs
title: Configuration file
permalink: /docs/configuration
weight: 1
---
The configuration file for Staticman should be in the root of the repository and named `staticman.yml` (unless you’re using a v1 endpoint, in which case you should name it `_config.yml` and consider upgrading). The following parameters are accepted.

The values of some parameters need to be protected from the public eye, so they're encrypted with a public key associated with the Staticman API instance — these are flagged with the **RSA encrypted field** string.

[Click here](https://github.com/eduardoboucas/staticman/blob/master/staticman_key.pub) to access the public key for the public Staticman instance.

{% include partials/doc-list.html data=site.data.siteConfig %}