import '../styles.css';
// import fetchGallery from './api.js'
import NewsApiService from "./NewsApiService.js";
 import LoadMoreBtn from "./components/LoadMoreBtn.js";
 import Notiflix, { Notify } from 'notiflix';
//  import { Notify } from 'notiflix/build/notiflix-notify-aio'
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';



const formEl = document.getElementById('search-form');
// const inputEl = document.querySelector('#input')
const galleryEl = document.querySelector('.gallery');
 const loadMoreBtn = document.getElementById('load-more');
const newsApiService = new NewsApiService();
const loadMoreBtnN = new LoadMoreBtn({
  selector: "#load-more",
  isHidden: true
});


formEl.addEventListener('submit', onSubmit);
// loadMoreBtn.addEventListener('click', onFeachHits);
 loadMoreBtnN.button.addEventListener('click', onFeachHits);
// window.addEventListener('scroll', onScrollByPage);

function onSubmit(e){
    e.preventDefault()

    // console.log('hi');
    // let inpValue = '';
    // galleryEl.innerHTML = '';

    const form = e.currentTarget;
    const inpValue = form.searchQuery.value.trim();

    newsApiService.query = inpValue;
  
    newsApiService.resetPage();
     clearNewsList(); 
     loadMoreBtnN.show();
    // console.log(inpValue);
    // console.log(form);

    // newsApiService.getGallery().then((hits)=> {
    //     if(hits.length === 0) throw new Error('!!! Sorry, there are no images matching your search query. Please try again.')
    //     //  console.log(hits);
       
    //     console.log('2')
    //     return hits.reduce(
    //         (markup, hit) => createMarkup(hit) + markup,
    //          '');

    // }).then((markup) => {appendNewsToList(markup);})
    // .catch(onError)
     onFeachHits().finally(()=> form.reset());
    //  onScrollByPage().finally(()=> form.reset());
}

 async function onFeachHits(){
   loadMoreBtnN.disable();

  try{
   const data = await newsApiService.getGallery();
   const hits = data.hits
  
   const totalHits = data.totalHits;
   const totalHitsPage = newsApiService.per_page * (newsApiService.page - 1)
   const totalPege = Math.ceil(totalHits / newsApiService.per_page);
  //  console.log(totalHitsPage);

 
   if(hits.length === 0)throw new Error('!!! Sorry, there are no images matching your search query. Please try again.')
   //   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
   // }

    const markup = hits.reduce(
      (markup, hit) => createMarkup(hit) + markup,
       '');
       appendNewsToList(markup);
       loadMoreBtnN.enable();

     if(newsApiService.page <= totalPege){
      Notiflix.Notify.success(`Hooray! We found ${totalHitsPage} out of ${totalHits} images.`);
     }

     if (newsApiService.page >= totalPege + 1){
        // console.log(newsApiService)
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadMoreBtnN.disable();
      }; 
  }catch(error){
      console.error(error);
       loadMoreBtnN.hide();
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")

  };
 }
//   async function onScrollByPage(){

//   try{
//     const data = await newsApiService.getGallery();
//     const hits = data.hits
  
// const totalHits = data.totalHits;
// const totalHitsPage = newsApiService.per_page * (newsApiService.page - 1)
// const totalPege = Math.ceil(totalHits / newsApiService.per_page);

//   console.log(document.documentElement.getBoundingClientRect())
//   console.log(hits.length)
//       if(hits.length === 0) throw new Error('!!! Sorry, there are no images matching your search query. Please try again.')
//     //    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//     //  }
 
//      const markup = hits.reduce(
//        (markup, hit) => createMarkup(hit) + markup,
//         '');
//         appendNewsToList(markup);
  
//         const { height: cardHeight } = document
//         .querySelector(".gallery").firstElementChild.getBoundingClientRect();
//         console.log({ height: cardHeight });
 
//        window.scrollBy({
//            top: cardHeight * 2,
//            behavior: "smooth",
//        });
//      console.log();
   


//       // if(newsApiService.page <= totalPege){
//       //  Notiflix.Notify.success(`Hooray! We found ${totalHitsPage} out of ${totalHits} images.`);
//       // }
 
//       // if (newsApiService.page >= totalPege + 1){
//       //  //  console.log(newsApiService)
//       //   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//       //   Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//       //  //  loadMoreBtnN.disable();
//       // }
 
//    }catch(error){
//         console.error(error);
      
//       //  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//      // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//    };

// }


//  return newsApiService.getGallery().then((hits)=> {
//     if(hits.length === 0) throw new Error('!!! Sorry, there are no images matching your search query. Please try again.')
//      console.log(hits);
//     return hits.reduce(
//         (markup, hit) => createMarkup(hit) + markup,
//          '');
// }).then((markup) => {
//   appendNewsToList(markup);
//   loadMoreBtnN.enable();
// }).catch(onError)


function appendNewsToList(markup){
  // galleryEl.innerHTML = markup;

  galleryEl.insertAdjacentHTML('beforeend', markup)
  lightbox.refresh();
}

function clearNewsList(){
 galleryEl.innerHTML = '';   //??????????????
}

// function updateNewsList(markup){
//     galleryEl.innerHTML = markup;
//     lightbox.refresh();
// }

function createMarkup({
    largeImageURL,
    webformatURL,
     tags, 
     likes, 
     views, 
     comments, 
     downloads}) {
        //  console.log(views)
  return `<div class="photo-card">
  <a class="gallery__item" href=${largeImageURL}>
  <img  class="gallery__image" src=${webformatURL} alt=${tags} loading="lazy"/></a>
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

let lightbox = {}

lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    scrollZoom: false,
  });
  

function onError(err) {
    console.error(err);
     loadMoreBtnN.hide();
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  
    // appendNewsToList('not hits')
  }
