import { async } from "regenerator-runtime";
export const state={
   recipe:{

   }
}
export const fetchrecipe= async (id)=>{
    try {
      const response= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const data=await response.json();
      if(!response.ok) throw new Error(`${data.message}`);
      const {recipe}=data.data;
      state.recipe={
        id:response.id,
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
    }
  }