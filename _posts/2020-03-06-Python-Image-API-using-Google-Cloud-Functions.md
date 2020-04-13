---
layout: post
author: Rajat
time: 10
title: Python Image API using Google Cloud Functions
type: blog 
---
I wanted to display some of the photos I've taken on my blog. I didn't really want an existing Bootstrap gallery component because most of the existing examples were quite tacky and would be quite hard to extend. So, I built out a set of React components which I could nicely display some of my pictures, with a caption and date. The images were fetched over a simple API which randomly chooses an image from a gallery. You can find all the code for this project in this [repo]({{ page.url }}).

#### System Architecture 
I'll start by giving an overview of the whole system and use the rest of the article to go into implementation details.
<figure align="center">
  <img src="{{site.url}}/assets/images/image_gallery_article/architecture.jpg"
       class="img_responsive" alt="System architecture"
       style="max-width: 75%; display: block; margin-left: auto; margin-right: auto;">
  <figcaption class="my-2">System Architecture Diagram</figcaption>
  <div class="my-2 text-center">
    <div class="tab-content">
      <div align="center" class="tab-pane fade show active text-center" id="key-0" aria-labelledby="list-home-list">
        <figcaption>Step 0: I've manually uploaded a bunch of images to a GCP storage bucket.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-1" role="tabpanel" aria-labelledby="list-messages-list">
        <figcaption>Step 1: The frontend makes a call to the GCP Cloud Function endpoint.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-2" role="tabpanel" aria-labelledby="list-messages-list">
        <figcaption>Step 2: The function requests a list of all the images from the storage bucket.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-3" role="tabpanel" aria-labelledby="list-settings-list">
        <figcaption>Step 3: The storage API returns the list of image filenames.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-4" role="tabpanel" aria-labelledby="list-settings-list">
        <figcaption>Step 4: A filename is randomly choosen and sent to the frontend.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-5" role="tabpanel" aria-labelledby="list-settings-list">
        <figcaption>Step 5: The frontend can now request the image file directly using the storage buckets API.</figcaption>
      </div>
      <div class="tab-pane fade" id="key-6" role="tabpanel" aria-labelledby="list-settings-list">
        <figcaption>Step 6: An image is returned and displayed in the browser.</figcaption>
      </div>
    </div>
  </div>
  </figure>
  <div class="row my-4 mb-2">
    <div class="list-group list-group-horizontal" id="list-tab" role="tablist" style="width:100%" align="center">
      <a class="list-group-item list-group-item-action list-group-item-success">Step</a>
      <a class="list-group-item list-group-item-action active" data-toggle="list" href="#key-0" role="tab" aria-controls="home">0</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-1" role="tab" aria-controls="profile">1</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-2" role="tab" aria-controls="messages">2</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-3" role="tab" aria-controls="settings">3</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-4" role="tab" aria-controls="settings">4</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-5" role="tab" aria-controls="settings">5</a>
      <a class="list-group-item list-group-item-action" data-toggle="list" href="#key-6" role="tab" aria-controls="settings">6</a>
    </div>
  </div>

#### Gallery using GCP Storage Buckets
I manually dragged and dropped each image into a GCP storage bucket. I've also included a Python script which automates this process in the project repo.

<figure align="center">
  <img src="{{site.url}}/assets/images/image_gallery_article/storage_bucket.png "
       class="img_responsive" alt="System architecture"
       style="max-width: 75%;">
 <figcaption class="my-2">GCP storage bucket with every photo I want to the display</figcaption>
</figure>

#### Google Cloud Functions
I wrote a simple Python script to randomly select an image from the storage bucket.  

``` python
def choose_image(request):
  # Gets access to bucket using API key
  storage_client = storage.Client()

  bucket = ...  # GCP bucket name
  # Get all image names from bucket
  images = list(storage_client.list_blobs(bucket))
  # Randomly choose an image
  image = random.choice(images)
  image_url = f'https://storage.cloud.google.com/{bucket}/{image.name}'

  response = jsonify(image_url)
  return response
```

I now needed to setup a publicly accessible API to be able retrieve the result of ```choose_image``` in the frontend. Time for a serverless function! From my experience, the easiest way to deploy a serverless function is using Google's Cloud Functions. When compared to AWS Lambda, Cloud functions are far quicker to set up both from the CLI and directly through the online console. GCP's console also provides far fewers configurable options than AWS, so you can setup a basic Python or Node.js API without needing to read (or understand) swathes of documentation. Since the API is doing such minimal computations, the cost incurred so far has been negligible```.

We need to set up the project repo with a ```main.py``` and a ```requirements.txt```. When deployed, GCP uses gunicorn to deploy our application over a flask server.

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

Any details about how to use or set up API keys, storage buckets or cloud functions can be found in the GCP documentation. I have included all project setup steps as part of the ```Makefile``` in the project repo.

#### References
- WSGI for Web Developers (Ryan Wilson-Perkin) - https://www.youtube.com/watch?v=WqrCnVAkLIo
