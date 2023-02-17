export default class LoadMoreBtn {
    constructor ({selector, isHidden}){
     this.button = this.getButton(selector);
     if (isHidden ) this.hide();
     else this.show();
     }

   getButton(selector){
    return document.querySelector(selector)
   } 

   hide(){
    this.button.classList.add("hidden");
   }
   show(){
    this.button.classList.remove("hidden");
   }
   disable(){
    this.button.disabled = true;
    this.button.textContent = 'Loading ....'
   }
   enable(){
    this.button.disabled = false;
    // console.log(this.per_page);
    // console.log(this.page);
    this.button.textContent = 'Load morre'
    // this.button.textContent = `Hooray! We found ${totalHits} images.`;
   }

}


// "We're sorry, but you've reached the end of search results."