---
layout: docs
title: Notifications
permalink: /docs/notifications
weight: 8
---
You may wish to include an option on your website for users to subscribe to receive notifications when new content is posted. For example, if you respond to an article you may want to receive notifications when other users also respond to that same article. Staticman can enable this!

## Email

Staticman supports integration with [Mailgun](https://www.mailgun.com/) for sending email notifications. Mailgun provides a 3 month trial and then provides a very reasonable usage-based pricing plan.

1. Create a [Mailgun account](https://www.mailgun.com/) and follow the steps to set up the account with your domain. Note the domain you use as well as your `Private API key`
1. Use the [Staticman encrypt endpoint](/docs/encryption) and add both the domain and private api key to the [site config](/docs/configuration#notifications.enabled) and enable notifications