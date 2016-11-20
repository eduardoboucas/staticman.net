---
layout: docs
title: Configuration file
permalink: /docs/configuration
weight: 1
---
The configuration file for Staticman should be in the root of the repository and named `staticman.yml` (unless you’re using a v1 endpoint, in which case you should name it `_config.yml` and consider upgrading). The following parameters are accepted.

The values of some parameters need to be protected from the public eye, so they're encrypted with a public key associated with the Staticman API instance — these are flagged with the **RSA encrypted field** string.

[Click here](https://github.com/eduardoboucas/staticman/blob/master/staticman_key.pub) to access the public key for the public Staticman instance.

{% for parameter in site.data.siteConfig %}
  <article class="card">
    <a href="#{{ parameter._key }}">
      <h2 id="{{ parameter._key }}">{{ parameter._key }}</h2>
    </a>

    {% if parameter.encrypted %}
      <p><strong>🔐 RSA encrypted field</strong></p>
    {% endif %}

    <p>{{ parameter.doc | markdownify }}</p>

    {% if parameter.docExample %}
      <p><em>Example:</em></p>

      {% highlight yml %}{{ parameter.docExample }}{% endhighlight %}
    {% endif %}

    {% if parameter.format %}
      <p><em>Possible values:</em></p>

      <ul>
        {% for format in parameter.format %}
          <li><code>{{ format }}</code></li>
        {% endfor %}
      </ul>
    {% endif %}

    {% assign parameterDefault = parameter.default | jsonify %}

    {% if parameter.default != null and parameterDefault != "{}" %}
      <p><em>Default:</em></p>

      {% highlight text %}{{ parameterDefault }}{% endhighlight %}
    {% endif %}
  </article>
{% endfor %}