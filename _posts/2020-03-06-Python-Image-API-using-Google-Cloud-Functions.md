---
layout: post
author: Rajat
time: 10
title: Python Image API using Google Cloud Functions
type: blog 
---
#### Overview
I've summarised the architecture for the image display in the diagram below:
0. I've manually uploaded a bunch of images to a GCP storage bucket.
1. Make a call to the GCP Cloud Function endpoint.
2. The function requests a list of all the images from the storage bucket.
3. The storage API returns the list of images URLs.
4. An image is randomly choosen and its URL is sent to the frontend.
5. The browser can request the image directly from the bucket.
6. The image is returned and displayed in the webpage. 

<img src="{{site.url}}/assets/images/image_gallery_article/architecture.jpg"
class="img_responsive" alt="System architecture"
style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;">

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
