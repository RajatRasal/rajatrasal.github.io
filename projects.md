---
layout: default
title: Projects 
---
### <span class="not-error">**Projects**</span>
Each project should have a nicely annotated picture associated with it.

{% for post in site.posts %}
{% if post.type == 'project' %}
<div class="blogpost-excerpt">
  <h5 class="blogpost-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
  <h6 class="blogpost-date">{{ post.from | date_to_string | date: "%b %Y" | upcase }}
                          - {{ post.to | date_to_string | date: "%b %Y" | upcase }}</h6>
  <p>{{ post.content | strip_html | truncatewords:30 }}</p>
</div>
{% endif %}
{% endfor %}
