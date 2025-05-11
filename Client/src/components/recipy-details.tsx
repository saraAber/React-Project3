import { useForm } from "react-hook-form";
import { Recipe } from "./recipe-model";

type RecipeDetails = {
    recipyDetails: Recipe,
    setRecipyDetails: Function
}

const RecipyDetails = ({ recipyDetails, setRecipyDetails }: RecipeDetails) => {

    const { register, handleSubmit } = useForm<Recipe>({
        values: recipyDetails
    });

    const saveDetails = (recipe: Recipe) => {
        setRecipyDetails(recipe);
        console.log(recipe)
    }

    return <>
        <form onSubmit={handleSubmit(saveDetails)}>
            <div>
                <label>Name: </label>
                <input {...register("Name")} />
            </div>
            <div>
                <label>Img: </label>
                <input {...register("Img")} />
            </div>
            <div>
                <label>Duration: </label>
                <input type="number" {...register("Duration", { valueAsNumber: true })} />
            </div>
            <div>
                <label>Difficulty: </label>
                <input type="number" {...register("Difficulty", { valueAsNumber: true })} />
            </div>
            <div>
                <label>Description: </label>
                <input {...register("Description")} />
            </div>
            <div>
                <label>Categoryid: </label>
                <input type="number" {...register("Categoryid", { valueAsNumber: true })} />
            </div>
            {/* <div>
                <p>Ingridents: </p>
                <div>
                    <label>Name: </label>
                    <input {...register("Ingridents.0.Name")} />
                </div>
                <div>
                    <label>Count: </label>
                    <input type="number" {...register("Ingridents.0.Count", { valueAsNumber: true })} />
                </div>
                <div>
                    <label>Type: </label>
                    <input {...register("Ingridents.0.Type")} />
                </div>
            </div>
            <div>
                <label>Instructions: </label>
                <input {...register("Instructions")} />
            </div> */}
            <button>add</button>
        </form>
    </>
}
export default RecipyDetails;    