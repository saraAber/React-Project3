import { useContext, useState } from "react";
import { Category, initCategory } from "./category-model";
import { categoryContext } from "./categories-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState<Category>(initCategory);
    const { categories, setCategories } = useContext(categoryContext);
    const navigate = useNavigate();

    const addCategory = () => {
        axios.post("http://localhost:8080/api/category", newCategory)
            .then(({ data }) => {
                setCategories([...categories, data]);
                navigate("/categories");
            })
            .catch((err) => console.error(err));
    }

    const saveChanges = (input: string) => {
        setNewCategory({ Id: Date.now(), Name: input });
    }

    return <>
        <div>
            <TextField
                id="outlined-basic"
                label="Category name"
                variant="outlined"
                onBlur={({ target }) => saveChanges(target.value)}
            />
        </div>
        <Button variant="outlined" onClick={addCategory}>add</Button>
    </>
}
export default AddCategory;