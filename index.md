---
layout: default
title: Rajat
---
<h4>😎<span class="not-error">Welcome to my blog!</span>🧐 As you can see this whole thing is <span class="error">still under construction</span> but feel free to browse around anyways.</h4>

<br>

<div align="center">
{% for image in site.static_files %}
  {% if image.name contains "dear_website" %}
    <img src="{{ image.path }}" alt="{{ image.name }}"> 
  {% endif %}
{% endfor %}
</div>

<br>

<div align="center">
  <!--img src="https://storage.cloud.google.com/blog-image-gallery/staring_cat.jpg" width="120" height="120"-->
</div>

<script type="text/javascript">
   getImageOfTheDay(); 
</script>
