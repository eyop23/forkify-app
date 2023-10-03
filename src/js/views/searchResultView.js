import view from './view.js';
import icons from 'url:../../img/icons.svg'
class resultView extends view{
    _parentElement=document.querySelector('.results');
    _defaultErrorMessage="no search result found";
    _generateMarkup(){
      console.log(this._data)
        return `
        ${this._data.map((result)=>{
          const id=window.location.hash.slice(1);
           return `
          <li class="preview">
            <a class="preview__link ${result.id === id ? "preview__link--active" : ''} " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ${result.key ? '' : 'hidden' }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
          `}
          )}`
       }
}
export default new resultView();