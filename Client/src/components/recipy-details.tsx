import { useFieldArray, useForm } from "react-hook-form";
import { Recipe } from "./recipe-model";
import { useContext } from "react";
import { categoryContext } from "./categories-context";

type RecipeDetails = {
    recipyDetails: Recipe,
    caption: string,
    saveChanges: Function
}

const RecipyDetails = ({ recipyDetails, caption, saveChanges }: RecipeDetails) => {
    const { categories } = useContext(categoryContext);

    const { register, handleSubmit, control, formState: { errors } } = useForm<Recipe>({
        values: recipyDetails
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'Ingridents'
    });

    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'Instructions'
    });


    const saveDetails = (recipe: Recipe) => {
        saveChanges(recipe);
    }

    return <>
        <form onSubmit={handleSubmit(saveDetails)}>
            <div>
                <label>Name: </label>
                <input {...register("Name", { required: "Name is required" })} />
                {errors.Name && <small>{errors.Name.message}</small>}
            </div>
            <div>
                <label>Img: </label>
                <input {...register("Img", { required: "Image URL is required" })} />
                {errors.Img && <small>{errors.Img.message}</small>}
            </div>
            <div>
                <label>Duration: </label>
                <input type="number" {...register("Duration", {
                    valueAsNumber: true,
                    required: "Duration is required",
                    min: { value: 10, message: "Duration must be at least 10 minutes" }
                })} />
                {errors.Duration && <small>{errors.Duration.message}</small>}
            </div>
            <div>
                <label>Difficulty: </label>
                <input type="number" {...register("Difficulty", {
                    valueAsNumber: true,
                    required: "Difficulty is required",
                    min: { value: 1, message: "Difficulty must be at least 1" }
                })} />
                {errors.Difficulty && <small>{errors.Difficulty.message}</small>}
            </div>
            <div>
                <label>Description: </label>
                <input {...register("Description", { required: "Description is required" })} />
                {errors.Description && <small>{errors.Description.message}</small>}
            </div>
            <div>
                <label>Category ID: </label>
                <input
                    type="number"
                    list="categories"
                    {...register("Categoryid", {
                        valueAsNumber: true,
                        required: "Category ID is required",
                        min: { value: 1, message: "Category ID must be at least 1" }
                    })}
                />
                <datalist id="categories">
                    {categories.map(category => (
                        <option key={category.Id} value={category.Id}>
                            {category.Name}
                        </option>
                    ))}
                </datalist>
                {errors.Categoryid && <small>{errors.Categoryid.message}</small>}
            </div>

            <h2>Ingredients</h2>
            {ingredientFields.map((field, index) => (
                <div key={field.id}>
                    <label>Name: </label>
                    <input
                        {...register(`Ingridents.${index}.Name`, { required: "Ingredient name is required" })}
                        defaultValue={field.Name}
                    />
                    {errors.Ingridents?.[index]?.Name && <small>{errors.Ingridents[index].Name.message}</small>}

                    <label>Count: </label>
                    <input
                        type="number"
                        {...register(`Ingridents.${index}.Count`, {
                            valueAsNumber: true,
                            required: "Count is required",
                            min: { value: 1, message: "Count must be at least 1" }
                        })}
                        defaultValue={field.Count}
                    />
                    {errors.Ingridents?.[index]?.Count && <small>{errors.Ingridents[index].Count.message}</small>}

                    <label>Type: </label>
                    <input
                        {...register(`Ingridents.${index}.Type`, { required: "Ingredient type is required" })}
                        defaultValue={field.Type}
                    />
                    {errors.Ingridents?.[index]?.Type && <small>{errors.Ingridents[index].Type.message}</small>}

                    <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => appendIngredient({ Name: '', Count: 0, Type: '' })}>Add Ingredient</button>

            <h2>Instructions</h2>
            {instructionFields.map((field, index) => (
                <div key={field.id}>
                    <label>Instruction Name: </label>
                    <input
                        {...register(`Instructions.${index}.Name`, { required: "Instruction name is required" })}
                        defaultValue={field.Name}
                    />
                    {errors.Instructions?.[index]?.Name && <small>{errors.Instructions[index].Name.message}</small>}

                    <button type="button" onClick={() => removeInstruction(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={() => appendInstruction({ Id: Date.now(), Name: '' })}>Add Instruction</button>
            <br />
            <button>{caption}</button>
        </form>
    </>
}
export default RecipyDetails;    