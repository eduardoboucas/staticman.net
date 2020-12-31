---
layout: docs
title: Site configuration file
permalink: /docs/configuration
weight: 1
---
The site configuration file for Staticman should be in the root of the repository hosting the static website and named `staticman.yml` (in the now deprecated v1 this file was named `_config.yml`). The following parameters are accepted.

The values of some parameters need to be protected from the public eye, so they're encrypted with a public key associated with the Staticman API instance — these are flagged with the **RSA encrypted field** string. See the [Encryption](/docs/encryption) section for further details. 

{% include partials/doc-list.html data=site.data.siteConfig %}