---
layout: docs
title: Handling spam
permalink: /docs/spam
weight: 7
---
Whenever you accept user content, you're bound to receive some spam entries that you wish to reject before they end up on your site. Luckily, Staticman offers a few solutions for handling such spam.

## Moderation

The simplest and most effective way to cut down spam is to [enable moderation in your site config](/docs/configuration#moderation). With moderation enabled, Staticman will not automatically add submissions to your site and you will instead have to approve each submission by accepting the pull request created by Staticman.

Of course, moderation won't stop spam from being submitted. If you find yourself receiving a lot of spam pull requests, consider adding a honeypot or additional trivial question field (e.x. 'What is 5 + 2') to your form.

## reCAPTCHA

Another effective method of combating spam is to use reCAPTCHA. If you enable Akismet, Google will collect some telemetry.

1. <a href="https://www.google.com/recaptcha/admin/create" class="cta">Sign up for reCaptcha v2</a> and note your `Site key` and `Secret key`
1. Use the <a href="/docs/encryption" class="cta">Staticman encryption endpoint</a> to encrypt the secret and add the <a href="/docs/configuration#reCaptcha.enabled" class="cta">reCAPTCHA options</a> to your site staticman.yml file
  ``` yaml
    reCaptcha:
      enabled: true
      siteKey: ""
      secret: ""
  ```
1. Add the reCAPTCHA credentials to your form
  ``` html
  <input type="hidden" name="options[reCaptcha][siteKey]" value="{SITE-KEY}">
  <input type="hidden" name="options[reCaptcha][secret]" value="{ENCRYPTED-SECRET}">
  ```
1. Follow the reCAPTCHA documentation to add either a <a href="https://developers.google.com/recaptcha/docs/display#auto_render" class="cta">checkbox</a> or <a href="https://developers.google.com/recaptcha/docs/invisible#auto_render" class="cta">invisible challenge</a> to your form.
<br>
<br>

## Akismet

Another option for dealing with spam is to use the Akismet API. Akismet is a spam detection service offered by WordPress. If you enable Akismet, data from your form submissions will be forwarded to Akismet to determine if it's spam.

1. Sign up for an <a href="https://akismet.com/" class="cta">Akismet account</a>. Note your Akismet API key and give Akismet your static site's URL
1. Add the Akismet API key and URL to the <a href="/docs/api" class="cta">API config</a>
1. Add the Akismet config to your staticman.yml file, making sure that the values below match your form's fields
  ``` yaml
  # Akismet spam detection
    akismet:
      enabled: true
      author: "name"
      authorEmail: "email"
      authorUrl: "website"
      content: "message"
  ```

Note: Staticman currently uses one Akismet account for all its calls as compared to reCAPTCHA which can be configured per site. If many sites use a single Staticman instance this can be problematic.
