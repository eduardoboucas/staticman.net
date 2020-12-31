---
layout: docs
title: API configuration file
permalink: /docs/api
weight: 1
---
To get a series of configuration parameters, the application will look for a file named `config.{ENVIRONMENT}.json`, with `{ENVIRONMENT}` being replaced by the environment where the app is running (e.g. `config.development.json`). Alternatively, each parameter can be supplied using a corresponding environment variable. These are the configuration values for the Staticman API server.

{% include partials/doc-list.html data=site.data.apiConfig %}