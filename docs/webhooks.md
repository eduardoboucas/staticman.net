---
layout: docs
title: Webhooks
permalink: /docs/webhooks
weight: 5
---
When using moderation, Staticman will push content to a new branch and create a PR for your approval. The branches created by Staticman are just like any other branch in the repository, and it's up to you to manage it, including deleting it after the PR has been merged or closed. The webhook is also used if you've enabled email notifications.

To avoid inactive branches from piling up, Staticman can automatically delete these branches for you after a PR has been merged or closed. To allow Staticman to listen for these events you have to set up a webhook.

## Setting up a webhook

Go to the **Settings** page of your GitHub repository, then select **Webhooks & services**. Click on **Add webhook** and use the following options:

- **Payload URL**: `https://api.staticman.net/v1/webhook`
    - Yes 
- **Content type**: `application/json`
- **Secret**: (empty)
- **Which events would you like to trigger this webhook?**: "Let me select individual events" and then select the "Pull request" event
- **Active**: Checked.