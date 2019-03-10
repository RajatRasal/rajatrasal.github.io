---
layout: default
title: Blog
---
## **Blog**
Search bar + topic wise search + posts 

{% for post in site.posts %}
<div class="blogpost-excerpt">
  <h5 class="blogpost-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
  <h6 class="blogpost-date">{{ post.date | date_to_string }} - {{ post.time }} mins</h6>
  <p>{{ post.content | strip_html | truncatewords:30 }}</p>
</div>
{% endfor %}
