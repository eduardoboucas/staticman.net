---
layout: docs
title: Generated Fields
permalink: /docs/generated-fields
weight: 3
---
{% assign parameter = site.data.siteConfig | where:"_key","generatedFields" %}
{% include partials/doc.html parameter=parameter.first %}

## type: date

Populate the value with the current date.

Available `options`:

`format`:

- `iso8601` [default] date as a string like: '2017-03-03T23:28:14.272Z'
- `timestamp` milliseconds since 1970/01/01
- `timestamp-seconds` seconds since 1970/01/01

## type: slugify

Transform the value via [slug](https://www.npmjs.com/package/slug) (with the default options), then converting to lower case.

No options available.