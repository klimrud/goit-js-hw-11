 import axios from "axios";
  // const axios = require('axios').default;
//  const axios = require('axios/dist/node/axios.cjs');

console.log('eeeee')

 const ENDPOINT = `https://pixabay.com/api/`;
  const ApiKEY = `33583832-ef5cd451b2a0e1292cdfe78fd` 

  const OPTIONS =
  `image_type=photo&orientation=horizontal&safesearch=true`

//  const options = {
//   
//     // params: {
//     // "q": `${this.query}`,
//     // "image_type": 'photo',
//     // "orientation": 'horizontal',
//     // "safesearch": "true",
//   },
// };
// console.log(options)
export default class NewsApiService {
 
    constructor(){
        this.page = 1;
        this.per_page = 100;
        this.query = "";
    }

    async getGallery() {
      try {
        const res = await axios.get(
          `${ENDPOINT}?key=${ApiKEY}&q=${this.query}&${OPTIONS}&per_page=${this.per_page}&page=${this.page}`
        );
        const data = await res.data;
       
        this.nextPage();
        return data ;
      } catch (error) {
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        console.log(error.message);//выводит когда закончились картинки
      }
    }


//  getGallery(){
 
//   const URL = `${ENDPOINT}?key=${ApiKEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;
//  return fetch(URL).then((response) => response.json())
//     .then(({hits, totalHits})=> {
//    console.log(this.per_page)
//   //  console.log(totalHits/this.per_page)
//     this.nextPage();
//     return hits;
// })
// // .catch(console.log)
// // .then(({hits})=> console.log(hits))
// }
nextPage(){
  this.page += 1;
}

resetPage(){
    this.page = 1;  //скидываем страницу
}
}
