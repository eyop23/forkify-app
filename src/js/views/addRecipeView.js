import view from './view.js';
import icons from 'url:../../img/icons.svg'
class addRecipe extends view{
    _parentElement=document.querySelector('.upload');
    _btnOpen=document.querySelector('.nav__btn--add-recipe');
    _btnClose=document.querySelector('.btn--close-modal');
    _window=document.querySelector('.add-recipe-window');
    _overlay=document.querySelector('.overlay');
    _uploadBtn=document.querySelector('.upload__btn')
    _defaultErrorMessage="no bookmark yet! Add a bookmark";
    // remove(){
    //   this._window.classList.remove('hidden');
    //   this._overlay.classList.remove('hidden');
    // }
    // addd(){
    //   this._window.classList.add('hidden');
    //   this._overlay.classList.add('hidden');
    // }
    toggleWindow(){
      this._window.classList.toggle('hidden')
      this._overlay.classList.toggle('hidden')
    }
    constructor(){
      super();
      this._addshowModalHandler();
      this._addHideModalHandler();
    }
    _addshowModalHandler(){
      this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }
    _addHideModalHandler(){
      this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
      this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }
   uploadRecipeHandler(handler){
    this._parentElement.addEventListener('submit',function(e){
      e.preventDefault();
      const dataArr=[...new FormData(this)];
      // convert array to obejct
      const data=Object.fromEntries(dataArr);
      handler(data)
    })
   }
    _generateMarkup(){
    }
}
export default new addRecipe();