import View from "./view";
import icons from 'url:../../img/icons.svg'
class PaginationView extends View{
    _parentElement=document.querySelector('.pagination');
    _currentPage;
    addPageHandler(handler){
     this._parentElement.addEventListener('click',function(e){
        const btn=e.target.closest('.btn--inline');
        const gotoPage=+btn.dataset.goto;
        if(!btn) return;
        handler(gotoPage);
     })
    }
    // _previousBtn(){
    //   return `<button data-goto="${this._currentPage - 1 }" class="btn--inline pagination__btn--prev">
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-left"></use>
    //   </svg>
    //   <span>page ${this._currentPage - 1}</span>
    //   </button>`
    // }
    // _nextBtn(){
    //   return `<button data-goto="${this._currentPage + 1}" class="btn--inline pagination__btn--next">
    //     <span>page ${this._currentPage + 1}</span>
    //     <svg class="search__icon">
    //       <use href="${icons}#icon-arrow-right"></use>
    //     </svg>
    //     </button>`
    // }
    _generateMarkup(){
         this._currentPage=this._data.page;
        const numPage=Math.ceil(this._data.results.length / this._data.resultperpage);
        if( numPage > 1 && this._currentPage === 1){
          return `<button data-goto="${this._currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>page ${this._currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>`
        }
        if( numPage > 1 && this._currentPage === numPage  ){
          return `<button data-goto="${this._currentPage - 1 }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>page ${this._currentPage - 1}</span>
          </button>` 
        }
        if(this._currentPage < numPage){
          return `<button data-goto="${this._currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>page ${this._currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>
          <button data-goto="${this._currentPage - 1 }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>page ${this._currentPage - 1}</span>
          </button>`        }
        return ``
    }
}
export default new PaginationView();

