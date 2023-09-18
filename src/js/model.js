import { API_URL,RESULT_PER_PAGE } from './config.js';
import {getJSON } from './helpers.js';

import { async } from "regenerator-runtime";

export const state={
   recipe:{},
   search:{
    results:[],
    page:1,
    resultperpage:RESULT_PER_PAGE,
   },
   bookmark:[],
}
export const fetchrecipe= async (id)=>{
    try {
      const data=await getJSON(`${API_URL}${id}`);
      const {recipe}=data.data;
      state.recipe={
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        sourcelUrl:recipe.source_url,
        image:recipe.image_url,
        servings:recipe.servings,
        cookingTime:recipe.cooking_time,
        ingredients:recipe.ingredients
      }
      if(state.bookmark.some(bookmark=>bookmark.id === id)) state.recipe.bookmarked=true;
      else state.recipe.bookmarked=false;
    } catch (error) {
    throw error;
    }
  }
  export const fetchSearchResult=async (query)=>{
    try{
     const data=await getJSON(`${API_URL}?search=${query}`);
     state.search.results=data.data.recipes.map(result=>{
      return {
        id:result.id,
        title:result.title,
        publisher:result.publisher,
        image:result.image_url,
      }
     })
     state.search.page=1;
    }catch(error){
      console.log(error)
      throw error;
    }
  }
  export const searchResultPage = (page=state.search.page)=>{
    state.search.page=page;
      const start=(page - 1) * state.search.resultperpage;
      const end=page * state.search.resultperpage;
      return state.search.results.slice(start,end);
    
  }
  export const updateServing = (newServings)=>{
    state.recipe.ingredients.forEach(ing=>{
      // doubling the serving also double the quantity
      ing.quantity=ing.quantity * (newServings / state.recipe.servings);
    })
    state.recipe.servings = newServings;
  }
  export const addBookMark = (recipe) => {
   state.bookmark.push(recipe);
   if(state.recipe.id === recipe.id) state.recipe.bookmarked=true;
   setBookmark();
  }
  export const deleteBookMark= (id) => {
    const index=state.bookmark.findIndex(bm=>bm.id===id);
    state.bookmark.splice(index,1);
    if(id === state.recipe.id) state.recipe.bookmarked=false;
    setBookmark();
  }
  const setBookmark = () => {
    // setLocalStorage('bookmarks',state.bookmark.jsonStringify())
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmark))
  }
  const getBookmark = () => {
   const storage=localStorage.getItem('bookmarks');
   if(storage) state.bookmark=JSON.parse(storage);
  }
  const init = () => {
    getBookmark();
  }
  init();