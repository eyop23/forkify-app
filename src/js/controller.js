import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime"
const recipeContainer = document.querySelector('.recipe');

// const spinnerContainer = document.querySelector('.spinner');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const renderSpinner=function(parentElement){
  const markup=`
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `
  parentElement.innerHTML=''
  parentElement.insertAdjacentHTML('afterbegin',markup);
}
const renderRecipe=function(recipeData,parentElement){
  console.log(recipeData.source_url);
  const markup=`
  <figure class="recipe__fig">
 <img src="${recipeData.image_url}" alt="Tomato" class="recipe__img" />
 <h1 class="recipe__title">
   <span>${recipeData.title}</span>
 </h1>
</figure>

<div class="recipe__details">
 <div class="recipe__info">
   <svg class="recipe__info-icon">
     <use href="src/img/icons.svg#icon-clock"></use>
   </svg>
   <span class="recipe__info-data recipe__info-data--minutes">${recipeData.cooking_time}</span>
   <span class="recipe__info-text">minutes</span>
 </div>
 <div class="recipe__info">
   <svg class="recipe__info-icon">
     <use href="${icons}#icon-users"></use>
   </svg>
   <span class="recipe__info-data recipe__info-data--people">${recipeData.servings}</span>
   <span class="recipe__info-text">servings</span>

   <div class="recipe__info-buttons">
     <button class="btn--tiny btn--increase-servings">
       <svg>
         <use href="${icons}#icon-minus-circle"></use>
       </svg>
     </button>
     <button class="btn--tiny btn--increase-servings">
       <svg>
         <use href="${icons}#icon-plus-circle"></use>
       </svg>
     </button>
   </div>
 </div>

 <div class="recipe__user-generated">
   <svg>
     <use href="${icons}#icon-user"></use>
   </svg>
 </div>
 <button class="btn--round">
   <svg class="">
     <use href="${icons}#icon-bookmark-fill"></use>
   </svg>
 </button>
</div>

<div class="recipe__ingredients">
 <h2 class="heading--2">Recipe ingredients</h2>
 <ul class="recipe__ingredient-list">
 ${recipeData.ingredients.map(ing=>{
   return `
   <li class="recipe__ingredient">
     <svg class="recipe__icon">
       <use href="${icons}#icon-check"></use>
     </svg>
     <div class="recipe__quantity">${ing.quantity}</div>
     <div class="recipe__description">
       <span class="recipe__unit">${ing.unit}</span>
       ${ing.description}
     </div>
   </li>
   `;
 }).join('')}
 </ul>
</div>

<div class="recipe__directions">
 <h2 class="heading--2">How to cook it</h2>
 <p class="recipe__directions-text">
   This recipe was carefully designed and tested by
   <span class="recipe__publisher">${recipeData.publisher}</span>. Please check out
   directions at their website.
 </p>
 <a
   class="btn--small recipe__btn"
   href="${recipeData.source_url}"
   target="_blank"
 >
   <span>Directions</span>
   <svg class="search__icon">
     <use href="src/img/icons.svg#icon-arrow-right"></use>
   </svg>
 </a>
</div>
`;
parentElement.innerHTML='';
parentElement.insertAdjacentHTML('afterbegin',markup);
}
const fetchrecipe= async ()=>{
  try {
    renderSpinner(recipeContainer);
    // getting id from url 
    const id=window.location.hash.slice(1);
    console.log(id)
    const response= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data=await response.json();
    // const show= response.ok !== success ? throw new Error("wjecfkj") : "suceeadh";
    if(!response.ok) throw new Error(`${data.message}`);
    console.log(response,data);
    const {recipe}=data.data;
    console.log(recipe);
    if(!recipe) return;
    renderRecipe(recipe,recipeContainer);
    // return recipe;
  } catch (error) {
    alert(error);
  }
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// fetchrecipe("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
// window.addEventListener('hashchange',fetchrecipe)
// window.addEventListener('load',fetchrecipe)
['hashchange','load'].forEach(event=>window.addEventListener(event,fetchrecipe));