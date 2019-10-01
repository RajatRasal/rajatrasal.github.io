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
  return (
    <div>
      <img className='picture-otd' src={props.image}/>
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
    .then(function(image) {
      console.log('Request successful', image);
      ReactDOM.render(
        <PictureHolder desc='tmp-placeholder' date='date-placeholder' image={image}/>,
        picOfTheDayHolder
      );
    })
    .catch(function(error) {
      console.log('Request failed', error) 
      const defaultImage = "/assets/images/staring_cat.jpg";
      const desc = "Cat Staring out of the Window";
      const date = "July 2018";
      ReactDOM.render(
        <PictureHolder desc={desc} date={date} image={defaultImage}/>,
        picOfTheDayHolder
     );
    });
}
