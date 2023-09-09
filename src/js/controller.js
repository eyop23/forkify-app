import * as model from './model.js'
import recipeView from './views/recipeView.js'

import "core-js/stable";
import "regenerator-runtime/runtime"
const controlRecipes= async ()=>{
  try {
    // getting id from url 
    const id=window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    recipeView.renderSpinner();
    await model.fetchrecipe(id)
    const {recipe}=model.state;
    if(!recipe) return;
    recipeView.render(recipe)
   
  } catch (error) {
    alert(error);
  }
}
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipes));
// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)