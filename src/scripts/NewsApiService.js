console.log('eeeee')

 const ENDPOINT = `https://pixabay.com/api/`;
 const ApiKEY = `33583832-ef5cd451b2a0e1292cdfe78fd` 

export default class NewsApiService {

    constructor(){
        this.page = 1;
        this.query = "";
    }
 getGallery(){
    const URL = `${ENDPOINT}?key=${ApiKEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
   return fetch(URL)
.then((response) => response.json())
.then(({hits})=> {
    this.nextPage(
        // if (page = totalHits/page){

        // }
    );
    return hits;
})
// .then(({hits})=> console.log(hits))
}
nextPage(){
  this.page += 1;
}

resetPage(){
    this.page = 1;
  }
}
