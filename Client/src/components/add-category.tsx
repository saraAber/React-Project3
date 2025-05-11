import { useContext, useState } from "react";
import { Category, initCategory } from "./category-model";
import { categoryContext } from "./categories-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                <label htmlFor="category">Category name : </label>
                <input
                    type="text"
                    name="category"
                    onBlur={({ target }) => saveChanges(target.value)}
                />
            </div>
            <button onClick={addCategory}>add</button>
    </>
}
export default AddCategory;