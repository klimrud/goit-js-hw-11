// const URL = `https://pixabay.com/api/?key=33583832-ef5cd451b2a0e1292cdfe78fd&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
console.log('eeeee')
// export default class NewApiService {}
function fetchGallery(query){
    const URL = `https://pixabay.com/api/?key=33583832-ef5cd451b2a0e1292cdfe78fd&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
   return fetch(URL)
.then((response) => response.json())
// .then(({hits})=> console.log(hits))
}
export default fetchGallery; 

// URL = https://pixabay.com/api/?key=33583832-ef5cd451b2a0e1292cdfe78fd&q=cat&image_type=photo&orientation=horizontal&safesearch=true
// const axios = require('axios');

// async function getUser() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.