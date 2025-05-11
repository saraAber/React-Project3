import { useContext } from "react";
import { context } from "./user-context";
import { Link, Outlet } from "react-router-dom";
import { categoryContext } from "./categories-context";

const Categories = () => {
    const { connected } = useContext(context);
    const { categories } = useContext(categoryContext);
    return <>
        {connected && <Link to={"add"}>add a new category</Link>}
        <Outlet />
        <ol>
            {categories.map(cat =>
                <li key={cat.Id}>
                    {cat.Name}
                </li>
            )}
        </ol>
    </>
}
export default Categories;