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

function getHomepageImage(img_holder) {
  const url = 'https://europe-west2-my-blog-253414.cloudfunctions.net/choose_image';
  const picOfTheDayHolder = document.getElementById(img_holder);

  ReactDOM.render(<Loader/>, picOfTheDayHolder);

  try {
  fetch(url, {mode: 'cors'})
    .then(function(response) {
      response.json().then(data => {
        const imageUrl = data.image_url;
        const imageDesc = data.desc;
        const imageDate = data.date;
        ReactDOM.render(
          <PictureHolder desc={imageDesc} date={imageDate} image={imageUrl}/>,
          picOfTheDayHolder
        );
      })
    })
    .catch(function(error) {
      console.log('Request failed', error) 
      const defaultImage = "https://storage.cloud.google.com/blog-image-gallery/staring_cat.jpg";
      const desc = "Cat Staring out of the Window";
      const date = "July 2018";
      ReactDOM.render(
        <PictureHolder desc={desc} date={date} image={defaultImage}/>,
        picOfTheDayHolder
     );
    });
  } catch {
    console.log('CAUGHT');
  }
}

$(document).ready(function() {
  getHomepageImage('picture-holder');
});
