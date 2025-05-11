import axios from "axios";
import { useContext, useState } from "react";
import { recipeContext } from "./recipeis-context";
import { initRecipe, Recipe } from "./recipe-model";
import { context } from "./user-context";
import RecipyDetails from "./recipy-details";
import { useNavigate } from "react-router-dom";


const AddRecipy = () => {
    const [newRecipy, setNewRecipy] = useState<Recipe>(initRecipe);
    const { user } = useContext(context);
    const { recipes, setRecipes } = useContext(recipeContext);
    const navigate = useNavigate()

    const addRecipy = (recipy: any) => {
        recipy = { ...recipy, UserId: user.Id };
        delete recipy.Id;
        axios.post("http://localhost:8080/api/recipe", recipy)
            .then(({ data }) => {
                setNewRecipy(data);
                setRecipes([...recipes, data]);
                navigate("/recipes");
            })
            .catch((err) => console.error(err));
    }

    return <>
        <RecipyDetails {...{ recipyDetails: newRecipy,caption: "add", saveChanges: addRecipy }} />
    </>
}
export default AddRecipy;    