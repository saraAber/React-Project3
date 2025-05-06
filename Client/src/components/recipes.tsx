import { useContext } from "react";
import { context } from "./user-context";
import { recipeContext } from "./recipeis-context";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import AddRecipy from "./add-recipy";

const Recipes = () => {
    const { recipes } = useContext(recipeContext)
    const { user, connected } = useContext(context);

    const deleteRecipy = (id: number) => {
        axios.post(`http://localhost:8080/api/recipe/delete/${id}`)
            .then()
            .catch((error) => console.error(error));
    }

    return <><ol>
        {recipes.map((r) =>
            <li key={r.Id}>
                <ul>
                    <li>name : {r.Name}</li>
                    <li>duration : {r.Duration}</li>
                    <li>difficulty : {r.Difficulty}</li>
                </ul>
                {connected && user.Id == r.UserId ?
                    <>
                        <button onClick={() => deleteRecipy(r.Id)}>delete</button>
                        <Link to={"edit"}>edit</Link>
                    </>
                    :
                    <></>
                }
                <hr />
            </li>
        )}
    </ol>
        <Link to={"add"}>add a new recipy</Link>
        <Outlet />
    </>
};
export default Recipes;