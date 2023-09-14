import View from "./view";
import icons from 'url:../../img/icons.svg'
class PaginationView extends View{
    _parentElement=document.querySelector('.pagination');
    addPageHandler(handler){
     this._parentElement.addEventListener('click',function(e){
        const btn=e.target.closest('btn--inline');
        const gotoPage=+btn.dataset.goto;
        if(!btn) return;
        handler(gotoPage);
     })
    }
    _generateMarkup(){
        const currentPage=this._data.page;
        const numPage=Math.ceil(this._data.results.length / this._data.resultperpage);
        if( numPage > 1 && currentPage === 1){
        return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`
        }
        if( numPage > 1 && currentPage === numPage  ){
            return `<button data-goto="${currentPage - 1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
            </button>`
        }
        if(currentPage < numPage){
            return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            <button data-goto="${currentPage - 1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1 }</span>
            </button>
            `
        }
        return ``
    }
}
export default new PaginationView();

