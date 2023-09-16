import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultview from './views/searchResultView.js'
import paginationview from './views/paginationView.js'
import "core-js/stable";
import "regenerator-runtime/runtime"
const controlRecipes= async ()=>{
  try {
    // getting id from url 
    const id=window.location.hash.slice(1);
    // console.log(id)
    if(!id) return;
    recipeView.renderSpinner();
    // fetching recipe data 
    await model.fetchrecipe(id)
    const {recipe}=model.state;
    if(!recipe) return;
    // display the recipe
    recipeView.render(recipe);
    // display the searchresult with active class of preview, when we click to one of the search result
    resultview.render(model.searchResultPage());
   
  } catch (error) {
    recipeView.errorHandler()
  }
} 
const controlServing=(newserving)=>{
  // updating serving and ingriedent quantity
  model.updateServing(newserving);
  // display the  recipe with the new serving n qunatity
  recipeView.render(model.state.recipe)
}
const controlSerachResult=async ()=>{
  try {
    // getting query string from the search input
        const query = searchView.getQuery();
        if(!query) return ;
    // display spinner until the data arrives(either the fullfield or rejected data)
       resultview.renderSpinner();
    // fetch data from the server based on the query
       await model.fetchSearchResult(query);
       const searchresults=model.state.search.results;
       if(!searchresults) return;
    // display the search result with pagination effect
       resultview.render(model.searchResultPage());
    // display the pagination
       paginationview.render(model.state.search)
  } catch (error) {
   resultview.errorHandler() 
  }
}
const controlPagination=(page)=>{
  resultview.render(model.searchResultPage(page));
  paginationview.render(model.state.search)
}
const init= function(){
 recipeView.addLoadHandler(controlRecipes);
 recipeView.addServingHandler(controlServing);
 searchView.searchEventListener(controlSerachResult);
 paginationview.addPageHandler(controlPagination);
}
init();
