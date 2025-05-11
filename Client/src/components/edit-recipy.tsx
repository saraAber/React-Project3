import { useContext, useEffect, useState } from "react";
import RecipyDetails from "./recipy-details";
import { initRecipe, Recipe } from "./recipe-model";
import axios from "axios";
import { recipeContext } from "./recipeis-context";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipy = () => {
    const { id } = useParams();
    let editedId: number;
    const { recipes, setRecipes } = useContext(recipeContext);
    const [recipyDetails, setRecipyDetails] = useState<Recipe>(initRecipe);
    const navigate = useNavigate();

    const editRecipy = () => {
        axios.post("http://localhost:8080/api/recipe/edit", recipyDetails)
            .then(({ data }) => {
                setRecipyDetails(data);
                const updateRecipesArr = recipes.map((recipe) => {
                    return recipe.Id == recipyDetails.Id ? data : recipe;
                });
                setRecipes(updateRecipesArr);
                navigate("/recipes");
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (id != null) {
            editedId = parseInt(id);
            const findTheOrginal = recipes.find((recipe) => {
                return recipe.Id == editedId;
            });
            if (findTheOrginal)
                setRecipyDetails(findTheOrginal);
        }
    }, [])

    return <>
        <RecipyDetails {...{ recipyDetails, setRecipyDetails }} />
        <button onClick={editRecipy}>edit</button>
    </>
}
export default EditRecipy;