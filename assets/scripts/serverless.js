function getAndSetImageOfTheDay() {
  const url = 'https://europe-west2-my-blog-253414.cloudfunctions.net/get_image_from_bucket';

  var setPic = function(image, desc, date) { 
    console.log('Image:' + image);
    console.log('Desc:' + desc);
    console.log('Date:' + date);
    var picOfTheDayHolder = document.getElementsByClassName('picture-otd-holder')[0];

    /* New Image */
    newImg = document.createElement('img');
    newImg.className = 'picture-otd';
    newImg.src = image;

    /* New Image Description */
    postInfo = document.createElement('span');
    postInfo.className = 'image-information';  // index-page';
    /* Image Description */
    postInfoHeading = document.createElement('h4');
    postInfoHeading.innerHTML = desc;
    /* Image Date */
    postInfoDate = document.createElement('span');
    postInfoDate.className = 'image-date';
    postInfoDate.innerHTML = date;

    /* Inserting all new elements in the right places */
    picOfTheDayHolder.appendChild(newImg)
    picOfTheDayHolder.appendChild(postInfo)
    postInfo.appendChild(postInfoHeading);
    postInfo.appendChild(postInfoDate);

	  /*
	  <span class="post-information"><h3>Sunrise in the Forest! Sort of…..</h3> <span class="date"> July 8, 2019 </span> </span>
	  */
  };

  fetch(url, {mode: 'cors'})
    .then(function(response) {
      return response.text();
    })
    .then(function(image) {
      console.log('Request successful', text);
      setPic(image, 'tmp-placeholder', 'date-placeholder');
    })
    .catch(function(error) {
      console.log('Request failed', error) 
      const image = "https://storage.cloud.google.com/blog-image-gallery/staring_cat.jpg"
      const desc = "Cat Staring out of the Window"
      const date = "July 2018"
      setPic(image, desc, date);
    });
}
