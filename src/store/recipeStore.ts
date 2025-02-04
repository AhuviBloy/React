import axios from "axios";
import { makeAutoObservable, action } from "mobx";

export type RecipeType = {
  id: number;
  title: string;
  description: string;
  authorId: string;
  ingredients: string[];
  instructions: string;
};

class recipeStore {
  list: RecipeType[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchRecipes();
  }

  fetchRecipes = action(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/recipes", {});
      this.list = res.data;
    } catch (e) {
      console.error("Error fetching recipes:", e);
    }
  });

  get getRecipes() {
    return this.list;
  }

  addRecipe = action(async (newRecipe: Partial<RecipeType>) => {
    try {
      await axios.post("http://localhost:3000/api/recipes", newRecipe, {
        headers: {
          "user-id": newRecipe.authorId,
        },
      });
      this.fetchRecipes();
    } catch (e) {
      console.error("Error adding recipe:", e);
    }
  });

  updateRecipe = action(async (newRecipe: Partial<RecipeType>) => {
    try {
      await axios.put("http://localhost:3000/api/recipes", newRecipe, {
        headers: {
          'recipe-id': newRecipe.id,
        },
      });
      this.fetchRecipes();
     
    } catch (e) {
      console.error("Error not found recipe:", e);
    }
  });

  GetRecipeById(id: number): RecipeType | undefined {
    return this.list.find((t) => t.id === id);
  }
}

export default new recipeStore();
