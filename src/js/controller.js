import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import "core-js/stable";
import "regenerator-runtime/runtime"
const controlRecipes= async ()=>{
  try {
    // getting id from url 
    const id=window.location.hash.slice(1);
    // console.log(id)
    if(!id) return;
    recipeView.renderSpinner();
    await model.fetchrecipe(id)
    const {recipe}=model.state;
    if(!recipe) return;
    recipeView.render(recipe)
   
  } catch (error) {
    console.log(error)
    recipeView.errorHandler(error)
  }
} 
const controlSerachResult=async ()=>{
  try {
   const query = searchView.getQuery();
   console.log(query)
    if(!query) return ;
    await model.fetchSearchResult(query);
    const searchresults=model.state.search.results;
    console.log(searchresults);
    if(!searchresults) return;
    searchView.render(searchresults);
  } catch (error) {
    console.log(error)
  //  recipeView.errorHandler(error) 
  }
}
// controlSerachResult();
const init= function(){
 recipeView.addLoadHandler(controlRecipes);
 searchView.searchEventListener(controlSerachResult);
}
init();
// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)