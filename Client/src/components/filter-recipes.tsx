import { useContext, useState } from "react"
import { recipeContext } from "./recipeis-context";

type Filter = {
    byField: string,
    byValue: string
}

const FilterRecipes = () => {
    const [filter, setFilter] = useState<Filter>({ byField: "", byValue: "" });
    const { recipes, setRecipes } = useContext(recipeContext);
    const executeFilterBy = () => {

    }
useEffect((data)=>

    ,[recipes])
    return <>
        <div>
            <label htmlFor="filter-by">Filter by : </label>
            <input list="filter-by" name="filter-by" onChange={({ target }) => setFilter({ ...filter, byField: target.value })} />
            <datalist id="filter-by">
                <option value="Category" />
                <option value="Duration" />
                <option value="Difficulty" />
                <option value="User name" />
            </datalist>
        </div>
        <div>
            <label htmlFor="filter-details">Enter a value : </label>
            <input type="text" name="filter-details" onChange={({ target }) => setFilter({ ...filter, byValue: target.value })} />
        </div>
        <button onClick={executeFilterBy}>Filter</button>
    </>
}
export default FilterRecipes;