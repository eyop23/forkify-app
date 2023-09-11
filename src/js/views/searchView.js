import icons from 'url:../../img/icons.svg'
 class searchView{
  #parentElement=document.querySelector('.search');
  #searchParentElement=document.querySelector('.search-results');
  #searchInput=document.querySelector('.search__field');
  #searchBtn=document.querySelector('.search__btn');
  #data;
  render(data){
    this.#data=data;
    const markup=this.#generateMarkup();
    this.#clear();
    this.#searchParentElement.insertAdjacentHTML('afterbegin',markup);
}
  getQuery(){
    return this.#searchInput.value;
  }
  #clear(){
    this.#searchInput.value='';
  }
  searchEventListener(handler){
    this.#searchBtn.addEventListener('click', function(e){
      e.preventDefault();
      handler();
    })
  }
  
  #generateMarkup(){
    return `
    <ul class="results">
    ${this.#data.map(result=>{
     return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `
           })}
    </ul>
    `
   }
}
export default new searchView();