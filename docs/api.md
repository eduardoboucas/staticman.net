---
layout: docs
title: API configuration file
permalink: /docs/api
weight: 1
---
To get a series of configuration parameters, the application will look for a file named `config.{ENVIRONMENT}.json`, with `{ENVIRONMENT}` being the environment variable `NODE_ENV` where the app is running (e.g. `config.development.json`, `config.test.json`, `config.production.json`, etc). Alternatively, each parameter can be supplied using a corresponding environment variable. Below are the available configuration values for the Staticman API server.

See the [sample config file](https://github.com/eduardoboucas/staticman/blob/master/config.sample.json) for an example.

{% include partials/doc-list.html data=site.data.apiConfig %}