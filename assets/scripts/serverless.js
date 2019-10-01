'use strict';

function Loader(props) {
  return (
    <div className="d-flex justify-content-center mt-2">
      <div className="spinner-border spinner-border-lg" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

function PictureHolder(props) {
  console.log(props.image);
  const image_url = props.image;
  console.log('URL: ' + image_url);
  return (
    <div>
      <img className='picture-otd' src={image_url} />
      <span className='image-information'>
        <h4>{props.desc}</h4>
        <span className='image-date'>{props.date}</span>
      </span>
    </div>
  );
}

function getAndSetHomepageImage() {
  const url = 'https://europe-west2-my-blog-253414.cloudfunctions.net/get_image_from_bucket';
  const picOfTheDayHolder = document.getElementsByClassName('picture-otd-holder')[0];

  ReactDOM.render(<Loader/>, picOfTheDayHolder);

  fetch(url, {mode: 'cors'})
    .then(function(response) {
      return response.text();
    })
    .then(function(response) {
      console.log(typeof response);
      const jsonResponse = JSON.parse(response);
      console.log(typeof jsonResponse);
      jsonResponse.json().then(data => {
        console.log('data: ' + data);
        const imageUrl = data['image_url'];
        console.log('image url: ' + imageUrl);
        ReactDOM.render(
          <PictureHolder desc='tmp-placeholder' date='date-placeholder' image={imageUrl}/>,
          picOfTheDayHolder
	); 
      });
      /*
      console.log('Request successful', response);
      const image_url = response["image_url"];
      console.log('Image URL: ', image_url);
      console.log('Image URL: ', image);
      */
    })
    .catch(function(error) {
      console.log('Request failed', error) 
      // const defaultImage = "/assets/images/staring_cat.jpg";
      const defaultImage = "https://storage.cloud.google.com/blog-image-gallery/staring_cat.jpg"; //"/assets/images/staring_cat.jpg";
      const desc = "Cat Staring out of the Window";
      const date = "July 2018";
      ReactDOM.render(
        <PictureHolder desc={desc} date={date} image={defaultImage}/>,
        picOfTheDayHolder
     );
    });
}
