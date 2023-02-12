import '../styles.css';
import fetchGallery from './api.js'
 import Notiflix from 'notiflix';
//  import { Notify } from 'notiflix/build/notiflix-notify-aio'
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";




const formEl = document.getElementById('search-form');
// const inputEl = document.querySelector('#input')
const galleryEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');


formEl.addEventListener('submit', onSubmit)

function onSubmit(e){
    e.preventDefault()
    console.log('hi');
     let inpValue = '';
    galleryEl.innerHTML = '';
    const form = e.currentTarget;
    inpValue = form.searchQuery.value.trim();
    console.log(inpValue);
    console.log(form);
    fetchGallery(inpValue).then(({hits})=> {
        if(hits.length === 0) throw new Error('!!! Sorry, there are no images matching your search query. Please try again.')
         console.log(hits);
        return hits.reduce(
            (markup, hit) => createMarkup(hit) + markup,
             '');
    }).then((markup) => {updateNewsList(markup);})
    .catch(onError)
    .finally(()=> form.reset());
}

function updateNewsList(markup){
    galleryEl.innerHTML = markup;
}

function createMarkup({
    largeImageURL, 
     tags, 
     likes, 
     views, 
     comments, 
     downloads}) {
        //  console.log(views)
  return `<div class="photo-card">
  <img src=${largeImageURL} alt=${tags} loading="lazy" width="250"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
}


function onError(err) {
    console.error(err)
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
 };




// `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
// <button type="button" class="load-more">Load more</button>` 


// const galleryEl = document.querySelector('.gallery');

// function imageGelleryMarkup(galleryItem) {
//     return  galleryItem.map( ({preview, original, description}) =>{
//     return `<li>
//               <a class="gallery__item" href="${original}">
//                 <img
//                  class="gallery__image"
//                  src="${preview}"
//                  data-source="${original}"
//                  alt="${description}"
//                 />
//              </a>
//              </li>`;
//   }).join('');
  
// };
// // console.log();
 
// //  galleryEl.insertAdjacentHTML('beforeend', imageGelleryMarkup(galleryItems) )
// galleryEl.innerHTML = imageGelleryMarkup(galleryItems) ;
// // console.log(galleryEl);

// //  galleryEl.addEventListener( 'click', returnBigImage);
// let lightbox = {}


// lightbox = new SimpleLightbox(".gallery a", {
//     captionsData: "alt",
//     captionDelay: 250,
//     scrollZoom: false,
//   });
  