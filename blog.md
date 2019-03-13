---
layout: default
title: Blog
---
### <span class="not-error">**Blog**</span>
Search bar + topic wise search + posts 

{% for post in site.posts %}
<div class="blogpost-excerpt">
  <h5 class="blogpost-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
  <h6 class="blogpost-date">{{ post.date | date_to_string | upcase }} - {{ post.time }} MINS</h6>
  <p>{{ post.content | strip_html | truncatewords:30 }}</p>
</div>
{% endfor %}
