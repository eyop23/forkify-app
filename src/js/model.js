import { API_URL } from './config.js';
import {getJSON } from './helpers.js';

import { async } from "regenerator-runtime";

export const state={
   recipe:{},
   search:{
    results:[],
   },
}
export const fetchrecipe= async (id)=>{
    try {
      const data=await getJSON(`${API_URL}${id}`);
      const {recipe}=data.data;
      console.log(recipe)
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
      console.log(state.recipe)
    } catch (error) {
    //   alert(error);
    console.log(error)
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
    }catch(error){
      console.log(error)
      throw error;
    }
  }