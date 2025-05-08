import axios from "axios";
import { createContext, ReactElement, useEffect, useState } from "react";
import { Recipe } from "./recipe-model";

type SystemRecipe = {
    recipes: Recipe[],
    setRecipes: Function
};

const initRecipe: Recipe = {
    Id: 9,
    Name: "כדורי שוקולד",
    Img: "גבינה.png",
    Duration: 60,
    Difficulty: 2,
    Description: "עוגה לשבועות",
    Categoryid: 1,
    UserId: 5,
    Ingridents: [],
    Instructions: []
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