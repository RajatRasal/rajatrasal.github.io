---
layout: rajat_cv_redirect
title: Rajat's CV
---
### Redirecting you to my CV...
{% for image in site.static_files %}
  {% if image.name contains 'rajat_cv' %}
If you are not redirected within 5 seconds click <span class="inline-link">[here]({{ image.path }})</span>.
  {% endif %}
{% endfor %}
