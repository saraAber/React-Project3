import { useContext } from "react";
import { context } from "./user-context";
import { recipeContext } from "./recipeis-context";

const Recipes = () => {
    const {recipes} = useContext(recipeContext)
    const { user, connected } = useContext(context);

    // const addRecipe = () => {
    //     axios.post("http://localhost:8080/api/recipe", x)
    //         .then(({ data }) => console.log(data));
    // }

    return <ol>
        {recipes.map((r) =>
            <li key={r.Id}>
                <ul>
                    <li>name : {r.Name}</li>
                    <li>duration : {r.Duration}</li>
                    <li>difficulty : {r.Difficulty}</li>
                </ul>
                {connected && user.Id == r.UserId ?
                    <>
                        <button>delete</button>
                        <button>edit</button>
                    </>
                    :
                    <></>
                }

                <hr />
            </li>
        )}
    </ol>
};
export default Recipes;