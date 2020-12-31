---
layout: docs
title: Placeholders
permalink: /docs/placeholders
weight: 4
---

The following placeholders can be used to insert dynamic data in the content files, as well as in config properties like `filename` and `path` to define the file and directory names, respectively.

## `fields`

Replaced with the content of any of the supplied fields.

*Example:*

{% highlight yaml %}
# Generates `entry-some-post-slug`
filename: "entry-{fields.d}"
{% endhighlight %}

## `options`

Replaced with the content of any of the supplied options.

*Example:*

{% highlight yaml %}
# Generates `entry-some-post-category`
filename: "entry-{options.category}"
{% endhighlight %}

## `@timestamp`

Replaced with the current Unix timestamp, in milliseconds.

*Example:*

{% highlight yaml %}
# Generates `entry-1511347137787`
filename: "entry-{@timestamp}"
{% endhighlight %}

## `@id`

Replaced with the unique entry ID.

*Example:*

{% highlight yaml %}
# Generates `_data/results/34127140-c950-11e7-980c-7588ea965edb`
path: "_data/results/{@id}"
{% endhighlight %}

## `@date`

Replaced with the current date formatted by [Moment.js](https://momentjs.com/). It's in the format `@date:MASK`, where `MASK` represents any format string supported by Moment.js.

*Example:*

{% highlight yaml %}
# Generates 2018-31-08-format-used-by-jekyll-posts
filename: "{@date:YYYY-MM-DD}-{fields.title}"
{% endhighlight %}