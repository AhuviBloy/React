
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/RouterComponents/AppLayout";
import RecipeDetails from "./components/Recipes/RecipeDetails";
import AddRecipeForm from "./components/Recipes/AddRecipeForm";
import RecipeList from "./components/Recipes/RecipeList";
import NavBar from "./components/RouterComponents/NavBar";
import UserRecipes from "./components/Recipes/UserRecipes";
import UpdateRecipe from "./components/Recipes/UpdateRecipe";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: '/', element: <NavBar/> },
            {
                path: 'recipes', element: <RecipeList />,children: [ {

                    path: ':id', element: <RecipeDetails />
                }]

            },
            {
                path: 'AddRecipe', element: <AddRecipeForm />
            },
            {
                path: 'MyRecipe', element: <UserRecipes />,children: [ {

                    path: ':id', element: <UpdateRecipe/>
                }]
            },
        ],
    },
]);