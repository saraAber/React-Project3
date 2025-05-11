import axios from "axios";
import { createContext, ReactElement, useEffect, useState } from "react";
import { initRecipe, Recipe } from "./recipe-model";

type SystemRecipe = {
    recipes: Recipe[],
    setRecipes: Function
};

const initSRecipe: SystemRecipe = {
    recipes: [initRecipe],
    setRecipes: () => { console.log("recipes : " + initSRecipe.recipes) }
};

export const recipeContext = createContext<SystemRecipe>(initSRecipe);
const RecipesProvider = ({ children }: { children: ReactElement }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getAllRecipes = () => {
        axios.get("http://localhost:8080/api/recipe").
            then((res) => setRecipes(res.data));
    };
    useEffect(() => getAllRecipes(), []);
    
    return <recipeContext.Provider value={{ recipes, setRecipes }}>
        {children}
    </recipeContext.Provider>
}
export default RecipesProvider;