function getImageOfTheDay() {
  console.log('GETTING IMAGE');
  const Http = new XMLHttpRequest();
  const url='https://us-central1-my-blog-253414.cloudfunctions.net/get_image_from_bucket';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
}
