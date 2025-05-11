import { useContext, useRef, useState } from "react";
import { recipeContext } from "./recipeis-context";
import { TextField } from "@mui/material";

type Filter = {
    byField: "Categoryid" | "Duration" | "Difficulty" | "UserId",
    byValue: string
}

const FilterRecipes = () => {
    const [filter, setFilter] = useState<Filter>({ byField: "Categoryid", byValue: "" });
    const { recipes, setRecipes } = useContext(recipeContext);

    const executeFilterBy = () => {
        const value = parseInt(filter.byValue);
        const tempRecipes = recipes;
        setTimeout(() => {
            setRecipes(tempRecipes);
            if (inputRefToFilterBy.current?.value != null)
                inputRefToFilterBy.current.value = "";
            if (inputRefToValue.current?.value != null)
                inputRefToValue.current.value = ""
        }, 30000)
        setRecipes(recipes.filter((recipy) => recipy[filter.byField] == value))
    }

    const setFilterByInput = (input: string) => {
        if (input == "Categoryid" || input == "Duration" || input == "Difficulty" || input == "UserId")
            setFilter({ ...filter, byField: input });
    }
    const inputRefToFilterBy = useRef<HTMLInputElement>(null);
    const inputRefToValue = useRef<HTMLInputElement>(null);
    return <>
        <div>
            <label htmlFor="filter-by">Filter by : </label>
            <input
                list="filter-by"
                name="filter-by"
                onChange={({ target }) => setFilterByInput(target.value)}
                ref={inputRefToFilterBy}
            />
            <datalist id="filter-by">
                <option value="Category" />
                <option value="Duration" />
                <option value="Difficulty" />
                <option value="UserId" />
            </datalist>
        </div>
        <div>
            <label htmlFor="filter-details">Enter a value : </label>
            <input
                type="text"
                name="filter-details"
                onChange={({ target }) => setFilter({ ...filter, byValue: target.value })}
                ref={inputRefToValue}
            />
        </div>
        <button onClick={executeFilterBy}>Filter</button>
    </>
}
export default FilterRecipes;