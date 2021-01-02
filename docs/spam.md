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

Another effective method of combating spam is to use reCAPTCHA.

1. [Sign up for reCaptcha](https://www.google.com/recaptcha/admin/create) and note your `Site key` and `Secret`
1. Use the [Staticman encryption endpoint](/docs/encrypt) to encrypt the secret and add the [reCAPTCHA options to your site config](http://0.0.0.0:4400/docs/configuration#reCaptcha.enabled)
1. Add the reCAPTCHA credentials to your form
  ``` html
  <input type="hidden" name="options[reCaptcha][siteKey]" value="{SITE-KEY}">
  <input type="hidden" name="options[reCaptcha][secret]" value="{ENCRYPTED-SECRET}">
  ```
1. Add the reCAPTCHA script and DOM element to your static site
  {% highlight html %}{% raw %}
  <div class="g-recaptcha" data-sitekey="YOUR-SITE-KEY"></div>
  <script src='https://www.google.com/recaptcha/api.js'></script>
  {% endraw %}{% endhighlight %}

## Akismet

Another option for dealing with spam is to use the Akismet API. Akismet is a spam detection service offered by Akismet. If you enable Akismet, data from your form submissions will be forwarded to Akismet to determine if it's spam.

1. Sign up for an [Akismet account](https://akismet.com/). Note your Akismet API key and give Akismet your static site's URL
1. Add the Akismet API key and URL to the [API config](/docs/api)

<br>

Note: Staticman currently uses one Akismet account for all its calls as compared to reCAPTCHA which can be configured per site. If many sites use a single Staticman instance this can be problematic.