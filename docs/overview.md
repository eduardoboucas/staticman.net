---
layout: docs
title: Overview
permalink: /docs/index.html
weight: -1
---

## What is Staticman

Staticman is an Open Source application which enables *static* websites to accept *dynamic* content submissions, including things like comments. A simple REST API is exposed which accepts content and publishes it to the site. While many comment solutions for static websites require embedding arbitrary JavaScript (and often privacy invading trackers), Staticman works with a simple REST form submission. This means it can even work with bare HTML pages!

## How does it work

A Staticman instance accepts content submissions via REST requests and makes pull requests (and optionally completes the merges) on the repository from which the static site is hosted.

Staticman is most frequently used for submitting comments. The basic flow is shown below:

![Simple Staticman flow diagram](http://www.plantuml.com/plantuml/png/TP1DQiD038NtFiKZ-rx0Yn98ImXTn3I1hlsZkeAnnXrf6dBxZkDnWXS1BupUq_VPsghLmUBWYit9QkCMNzGe6srGAwONlBmYPqCjE4ZQa3RdoxX4TJoTqNen4eF6Pc1LzbBSApVEdWrLy7_SKRWHUhOI-_SpBhCM3rE2VNDVfCQq-b0zhIvwNKidHVwyGBKHnkWS0lr6KhlZ4x1S9RdTuVYHHZfwKPhR6JdP0ZVHV41wTeVT6mOAFIcgpnLtpZeQdR_cexAqBdOiFUo787Hnr_bgbfJBZnHRaYuExXy0)


Staticman is highly configurable and supports many advanced use cases including

- [spam detection](/docs/spam)
- [notifications](/docs/notifications)
- authentication

Staticman allows for a single instance to be securely used by multiple users so you can share your Staticman instance with others provided you have sufficient resources. Staticman also supports multiple configurations per site (e.x. forum posts and comments can be handled differently).

## How do I host a Staticman instance?

Staticman can be hosted on any platform that runs a relatively recent NodeJS runtime and can bind its TCP/IP port to the public Internet.

We recommend [Heroku](https://www.heroku.com/) which offers straightforward setup and provides a generous free tier which should be sufficient for most use cases.

Please continue to the [Getting Started](/docs/getting-started) section for instructions on how to set up your personal Staticman instance
