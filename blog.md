---
layout: default
title: Blog
---
### <span class="not-error">**Tech and Progamming Blog**</span>

{% for post in site.posts %}
{% if post.type == 'blog' %}
<div class="blogpost-excerpt">
  <h5 class="blogpost-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
  <h6 class="blogpost-date">{{ post.date | date_to_string | upcase }} - {{ post.time }} MINS</h6>
  <p>{{ post.content | strip_html | truncatewords:30 }}</p>
</div>
{% endif %}
{% endfor %}
