---
layout: docs
title: Getting started
weight: 0
---
Welcome! These instructions walk you through deploying your own instance of Staticman and connecting it to your static site.

## Step 1. Git provider authentication

Staticman currently supports the following git providers:

- GitHub
- GitLab

In order to use Staticman, the repository for your static site must be hosted on one of these providers. The Staticman service needs to authenticate with the git provider to commit files and handle pull requests. This step will walk you through obtaining the necessary credentials.

### **If using GitLab to host the static site repo:**

[Create a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) with the following scopes

- `read_repository`: Necessary to read the Staticman site config
- `write_repository`: Necessary to merge pull requests

### **If using GitHub to host the static site repo:**

#### **Option 1. Authenticate as a GitHub application**

This is the recommended way to authenticate with GitHub. This method will give the most control over what Staticman can and can't access.

1. <a href="https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app" class="cta">Create a new GitHub application</a>. Ensure you use the following:
  - Homepage: `"https://staticman.net/"`
  - Webhook URL: `"{STATICMAN_BASE_URL}/v1/webhook"` - e.x. `"https://mystaticmaninstance.herokuapp.com/v1/webhook"`
  - Contents: `Read & Write` - Necessary to read the Staticman site config
  - Pull Requests: `Read & Write` - Necessary to merge pull requests
  - Subscribe to `Pull request` events
1. Generate a private key for the app and note it down along with your app ID.
1. Install the app on your GitHub account. You can limit its access to only the repo from which you host your static site
1. Set Authentication environment variables
```
GITHUB_APP_ID=123
GITHUB_PRIVATE_KEY=$(cat github-app.private-key.pem)
```

<br>

#### **Option 2. Authenticate to GitHub using a personal access token on a bot**

1. Register a new GitHub account to run your Staticman bot and create a <a href="https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token" class="cta">personal access token</a> for this new account.
1. Set Authentication environment variable
```
GITHUB_TOKEN="{personal-access-token}"
```
3. From your main GitHub account, <a href="https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository" class="cta">send your bot a collaboration invite</a>.
4. Return to this step once your Staticman instance is running and send a GET request to
  `{STATICMAN_BASE_URL}/v3/connect/{GIT_PROVIDER_USERNAME}/{REPO}`
  <br>For example:<br>
  `https://staticmaninstance.herokuapp.com/v3/connect/eduardoboucas/staticman.net`
1. You should get an `OK!` response and the bot should have accepted the collaboration invitation.

<br>

#### **Option 3. Authenticate to GitHub using a personal access token on your main account**

This option is not recommended as it gives Staticman direct and complete access to your primary GitHub account. Simply, create a personal access token on your primary account.

## Step 2. Set Private Key

Staticman requires a private key to encrypt any of your secret strings. Create it and set an environment variable for your app instance.

```sh
ssh-keygen -m PEM -t rsa -b 4096 -C "staticman key" -f ~/.ssh/staticman_key
```

```
RSA_PRIVATE_KEY=$(cat ~/.ssh/staticman_key)"
```

## Step 3. Deploy Staticman

Read through the [Staticman API config values](https://staticman.net/docs/api) and note the config values you wish to use. At a minimum, you must include a way for Staticman to auth with a git provider, as well as an RSA private key. To generate the RSA private key you can use 

{% highlight bash %}{% raw %}
openssl genrsa
{% endraw %}{% endhighlight %}

If you need the newline literals (for example when using JSON configs since multiline strings are not permitted) you can use

{% highlight bash %}{% raw %}
openssl genrsa | sed '$!s/$/\\n/' | tr -d '\n'
{% endraw %}{% endhighlight %}

### **Option 1. Deploy to Heroku**

1. Follow <a href="https://heroku.com/deploy?template=https://github.com/eduardoboucas/staticman/tree/master" class="cta">this link</a> to deploy the latest stable Staticman code to Heroku.
1. You can enter your Staticman API config values as <a href="https://devcenter.heroku.com/articles/config-vars" class="cta">Heroku config variables</a>.
1. (Optional) Create a fork of Staticman and set up a Heroku pipeline to deploy from the fork. This will help you to keep your instance up to date with the latest Staticman improvements and bug fixes.

<br>

### **Option 2. Deploy to your own infrastructure**

If you prefer to use Docker, check out the [Docker instructions](https://github.com/eduardoboucas/staticman/blob/master/docs/docker.md). Otherwise continue below

1. Clone <a href="https://github.com/eduardoboucas/staticman.git" class="cta">the Staticman repo</a> and ensure `node` and `npm` are installed.
1. Install the dependencies
  <br>
  `npm install`
1. Create a new config from the sample
  <br>
  `cp config.sample.json config.production.json`
1. Edit the new production config with any values you want, and then start the Staticman server
  <br>
  `npm start`

<br>

## Step 4. Create a site configuration file

Staticman will look for a `staticman.yml` file in the root of the repository, where various configuration parameters will be defined. These configuration values are specific to the site. This means one Staticman instance can be used with many websites and users.

You can use the [sample site config file](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml) as a starting point and check the [available site configuration parameters](/docs/configuration) for more information.

## Step 5. Hook up your forms

Forms on your static site should `POST` to:

`{STATICMAN_BASE_URL}/v3/entry/{GIT_PROVIDER}/{GIT_PROVIDER_USERNAME}/{REPO}/{BRANCH}/{property (optional)}`

e.x. `https://staticmaninstance.herokuapp.com/v3/entry/github/eduardoboucas/staticman/gh-pages/comments`

You can view full API docs at `{STATICMAN_BASE_URL}/api-docs` including example values.

All fields should be nested under a `fields` array. Optionally, a `options` array can be used to pass along additional information, such as the title of a post.

You can specify a redirect URL in a `options[redirect]` field. When the form is submitted, users will be redirected to this URL automatically.

The following markup shows how the form for a simple commenting system would look like:

{% highlight html %}{% raw %}
<form method="POST" action="https://api.staticman.net/v3/entry/github/eduardoboucas/staticman/gh-pages/comments">
  <input name="options[redirect]" type="hidden" value="https://my-site.com">
  <!-- e.g. "2016-01-02-this-is-a-post" -->
  <input name="options[slug]" type="hidden" value="{{ page.slug }}">
  <label><input name="fields[name]" type="text">Name</label>
  <label><input name="fields[email]" type="email">E-mail</label>
  <label><textarea name="fields[message]"></textarea>Message</label>
  
  <button type="submit">Go!</button>
</form>
{% endraw %}{% endhighlight %}

## Step 6. Approve entries (optional)

If you enable content moderation (by setting `moderation: true` in the site config), Staticman will send a pull request whenever a new entry is submitted. Merge the pull request to approve it, or close to discard.

![Step 2](/assets/images/get-started/step2.png)

Please note that this step will be skipped if you disable moderation, as entries will be pushed to the main branch immediately.

Congratulations! You should now have working Staticman setup. Once you've verified this is working, you can start to experiment with more advanced configurations.
