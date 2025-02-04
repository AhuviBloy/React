import axios, { AxiosError } from "axios";
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
  error: string = ''; 
  openSnackbar: boolean = false;

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

  GetRecipeById(id: number): RecipeType | undefined {
    return this.list.find((t) => t.id === id);
  };

  addRecipe = action(async (newRecipe: Partial<RecipeType>) => {
    try {
      await axios.post("http://localhost:3000/api/recipes", newRecipe, {
        headers: {
          "user-id": newRecipe.authorId,
        },
      });
      this.fetchRecipes();
    }catch (e) {
      
      const error = e as AxiosError;
      this.handleError(error);
    }
  });


  updateRecipe = action(async (newRecipe: Partial<RecipeType>) => {
    try {
      console.log(newRecipe.id);
      
      await axios.put("http://localhost:3000/api/recipes", newRecipe, {
        headers: {
          'recipe-id': newRecipe.id,
        },
      });
      this.fetchRecipes();
     
    } catch (e: any) {
      const error = e as AxiosError;
      this.handleError(error);
    }
  });





  handleError(error: AxiosError) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        this.setError("המייל או הסיסמה לא תקינים.");
      } else if (status === 403) {
        this.setError("יש להתחבר כדי להכניס או לעדכן מתכון.");
      } else if (status === 404) {
        this.setError("המתכון לא נמצא.");
      } else {
        this.setError("בעיה בשרת.");
      }
    } else {
      this.setError("בעיה בקישור לרשת.");
    }
  }

  setError(message: string) {
    this.error = message;
    this.openSnackbar = true;
  }

  handleCloseSnackbar = () => {
    this.openSnackbar = false;
  };
 }

export default new recipeStore();
