import { useContext } from "react";
import { context } from "./user-context";
import { recipeContext } from "./recipeis-context";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Recipes = () => {
    const { recipes, setRecipes } = useContext(recipeContext)
    const { user, connected } = useContext(context);

    const deleteRecipy = (id: number) => {
        axios.post(`http://localhost:8080/api/recipe/delete/${id}`)
            .then(() => {
                const recipesWithoutDeleted = recipes.filter((r) => r.Id !== id);
                setRecipes(recipesWithoutDeleted);
            })
            .catch((error) => console.error(error));
    }

    return <>
        {connected && <Link to={"filter"}>filter</Link>}
        <hr />
        {connected && <Link to={"add"}>add a new recipy</Link>}
        <Outlet />
        <ol>
            {recipes.map((r) =>
                <li key={r.Id}>
                    <ul>
                        <li>Recipe name : {r.Name}</li>
                        <li>Duration : {r.Duration}</li>
                        <li>Difficulty : {r.Difficulty}</li>
                        {/* <li>Description : {r.Description}</li>
                        <li>Difficulty level : {r.Difficulty}</li>
                        <li>Category ID : {r.Categoryid}</li>
                        <li>Img : {r.Img}</li> */}
                    </ul>
                    {connected && user.Id == r.UserId &&
                        <>
                            <button onClick={() => deleteRecipy(r.Id)}>delete</button>
                            <br />
                            <Link to={`edit/${r.Id}`}>edit</Link>
                        </>
                    }
                    <hr />
                </li>
            )}
        </ol>
    </>
};
export default Recipes;