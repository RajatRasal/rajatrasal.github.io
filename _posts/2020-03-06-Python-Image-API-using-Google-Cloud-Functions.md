---
layout: post
author: Rajat
time: 10
title: Python Image API using Google Cloud Functions
type: blog 
---
#### Overview
<figure align="center">
  <img src="{{site.url}}/assets/images/image_gallery_article/architecture.jpg"
       class="img_responsive" alt="System architecture"
       style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;">
 <figcaption>System Architecture diagram for the my image selector API</figcaption>
</figure>
{:start="0"}
0. I've manually uploaded a bunch of images to a GCP storage bucket.
1. The frontend makes a call to the GCP Cloud Function endpoint.
2. The function requests a list of all the images from the storage bucket.
3. The storage API returns the list of image filenames.
4. A filename is randomly choosen and sent to the frontend.
5. The frontend can now request the image file directly using the storage buckets API.
6. An image is returned and displayed in the browser.

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
