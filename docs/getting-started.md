---
layout: docs
title: Getting started
weight: 0
---
Welcome! These instructions walk you through deploying your own instance of Staticman and connecting it to your static site.

## Step 1. Git provider authentication

Staticman currently supports two git providers, GitHub and GitLab. The Staticman service needs to authenticate with the git provider to commit files and handle pull requests. 

### **If using GitLab to host your site repo:**

[Create a personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) with the following scopes:

  - `read_repository`: Necessary to read the Staticman site config
  - `write_repository`: Necessary to merge pull requests

### **If using GitHub to host your site repo:**

#### **Option 1. Authenticate as a GitHub application**

This is the recommended way to authenticate with GitHub. This method will give the most control over what Staticman can and can't access.

[Create a new GitHub application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app). Ensure you use the following:

  - Homepage: `"https://staticman.net/"`
  - Webhook URL: `"<your-staticman-instance-url>/v1/webhook"`
  - Contents: `Read & Write`
  - Pull Requests: `Read & Write`

Generate a private key and note it down along with your app ID.

#### **Option 2. Personal access token on bot**

Register a new GitHub account to run your Staticman bot and create a [personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) for this new account.

Then, from your main GitHub account, [send your bot a collaboration invite](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository).


Return to this step once your Staticman instance is running and send a GET request to

`<your-staticman-instance-url>/v3/connect/<your-github-username>/<your-site-repository-name>`

You should get an `OK!` response and the bot should have accepted the collaboration invitation.

#### **Option 3. Personal access token on main account**

This option is not recommended as it gives Staticman direct and complete access to your primary GitHub account. Simply, create a personal access token on your primary account.

## Step 2. Deploy Staticman

Read through the [Staticman API config values](https://staticman.net/docs/api) and note the config values you wish to use. At a minimum, you must include a way for Staticman to auth with your git provider, as well as an RSA private key. To generate the private key you can use 

``` bash
openssl genrsa
```

If you need the newline literals (for example when using JSON configs since multiline strings are not permitted) you can use

``` bash
openssl genrsa | sed '$!s/$/\\n/' | tr -d '\n'
```

### **Option 1. Deploy to Heroku**

Click the "Deploy to Heroku" button [in the project README](https://github.com/eduardoboucas/staticman).

Then, enter your [Staticman API config values](https://staticman.net/docs/api) as [Heroku config variables](https://devcenter.heroku.com/articles/config-vars).

### **Option 2. Deploy to your own infrastructure**

Clone [the Staticman repo](https://github.com/eduardoboucas/staticman.git).

Use `npm install` to fetch dependencies.

Copy the sample config with `cp config.sample.json config.development.json`

Add your configuration to the newly created development config.

Start the server with `npm start`





## Step 2. Create a configuration file

Staticman will look for a `staticman.yml` file in the root of the repository, where various configuration parameters will be defined.

You can use the [sample config file](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml) as a starting point and check the [available configuration parameters](/docs/configuration) for more information.

## Step 3. Hook up your forms

Forms should `POST` to:

`<your-staticman-instance-url>/v3/entry/<git-service>/<git-service-username>/<git-service-repo-name>/<git-service-branch>/<property (optional)>`

You can view full API docs at `<your-staticman-instance-url>/api-docs` including example values.

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

## Step 4. Approve entries (optional)

If you enable content moderation (by setting `moderation: true` in the site config), Staticman will send a pull request whenever a new entry is submitted. Merge the pull request to approve it, or close to discard.

![Step 2](/assets/images/get-started/step2.png)

Please note that this step will be skipped if you disable moderation, as entries will be pushed to the main branch immediately.
