 
 class searchView {
  _searchParentElement=document.querySelector('.search');
  // _searchInput=document.querySelector('.search__field');
  // _searchBtn=document.querySelector('.search__btn');
  getQuery(){
    const query=this._searchParentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput(){
    this._searchParentElement.querySelector('.search__field').value='';
  }
  searchEventListener(handler){
    this._searchParentElement.addEventListener('submit', function(e){
      e.preventDefault();
      handler();
    })
  }
  
}
export default new searchView();