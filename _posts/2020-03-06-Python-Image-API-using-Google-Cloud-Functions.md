---
layout: post
author: Rajat
time: 10
title: Python Image API using Google Cloud Functions
type: blog 
---
I wanted to display some of the photos I've taken on my blog. I didn't really want an existing Bootstrap gallery component because most of the existing examples were quite tacky and would be quite hard to extend. So, I built out a set of React components which I could nicely display some of my pictures, with a caption and date. The images were fetched over a simple API which randomly chooses an image from a gallery.

#### System Architecture 
I'll start by giving an overview of the whole system and then go into implementation details over the rest of the article.
<figure align="center">
  <img src="{{site.url}}/assets/images/image_gallery_article/architecture.jpg"
       class="img_responsive" alt="System architecture"
       style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;">
 <figcaption>System Architecture Diagram</figcaption>
</figure>

<div class="row mt-4 mb-2">
  <div class="list-group list-group-horizontal" id="list-tab" role="tablist" style="width:100%" align="center">
    <a class="list-group-item list-group-item-action list-group-item-success">Key:</a>
    <a class="list-group-item list-group-item-action active" data-toggle="list" href="#key-0" role="tab" aria-controls="home">0</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-1" role="tab" aria-controls="profile">1</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-2" role="tab" aria-controls="messages">2</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-3" role="tab" aria-controls="settings">3</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-4" role="tab" aria-controls="settings">4</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-5" role="tab" aria-controls="settings">5</a>
    <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-6" role="tab" aria-controls="settings">6</a>
  </div>
</div>
<div class="row mb-4">
  <div class="tab-content" id="nav-tabContent">
    <div align="center" class="tab-pane fade show active" id="key-0" role="tabpanel" aria-labelledby="list-home-list">
      I've manually uploaded a bunch of images to a GCP storage bucket.
    </div>
    <div class="tab-pane fade" id="key-1" role="tabpanel" aria-labelledby="list-messages-list">
      The frontend makes a call to the GCP Cloud Function endpoint.
    </div>
    <div class="tab-pane fade" id="key-2" role="tabpanel" aria-labelledby="list-messages-list">
      The function requests a list of all the images from the storage bucket.
    </div>
    <div class="tab-pane fade" id="key-3" role="tabpanel" aria-labelledby="list-settings-list">
      The storage API returns the list of image filenames.
    </div>
    <div class="tab-pane fade" id="key-4" role="tabpanel" aria-labelledby="list-settings-list">
      A filename is randomly choosen and sent to the frontend.
    </div>
    <div class="tab-pane fade" id="key-5" role="tabpanel" aria-labelledby="list-settings-list">
      The frontend can now request the image file directly using the storage buckets API.
    </div>
    <div class="tab-pane fade" id="key-6" role="tabpanel" aria-labelledby="list-settings-list">
      An image is returned and displayed in the browser.
    </div>
  </div>
</div>

#### Serverless Cloud Functions


#### Local Setup


#### GCP Setup


#### Frontend


#### TL;DR
1. API key
2. Create GCP bucket
3. Script to push to GCP bucket, with metadata
4. Create Cloud Function endpoint
5. Write Cloud Function flask code, with project structure.
6. Push code to cloud functions
7. Track hitting the endpoint
8. Caching proxy on client side

#### References
