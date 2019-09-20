function getAndSetImageOfTheDay() {
  const url = 'https://us-central1-my-blog-253414.cloudfunctions.net/get_image_from_bucket';

  var setPic = function(image) { 
    var picOfTheDay = document.getElementsByClassName('picOfTheDayHolder')[0];
    newImg = document.createElement('img');
    newImg.className = 'picOfTheDay';
    newImg.src = image;
    picOfTheDay.appendChild(newImg)
  };

  fetch(url, {mode: 'cors'})
    .then(function(response) {
      return response.text();
    })
    .then(function(image) {
      console.log('Request successful', text);
      setPic(image);
    })
    .catch(function(error) {
      console.log('Request failed', error) 
      const image = "https://storage.cloud.google.com/blog-image-gallery/staring_cat.jpg"
      setPic(image);
    });
}
