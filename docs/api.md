---
layout: docs
title: API configuration
permalink: /docs/api
weight: 4
---
You can run your own instance of the Staticman API. To install it, clone the [repository](https://github.com/eduardoboucas/staticman) and run `npm install`.

To get a series of configuration parameters, the application will look for a file named `config.{ENVIRONMENT}.json`, with `{ENVIRONMENT}` being replaced by the environment where the app is running (e.g. `config.development.json`). Alternatively, each parameter can be supplied using a corresponding environment variable.

{% include partials/doc-list.html data=site.data.apiConfig %}