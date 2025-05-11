import axios from "axios";
import { createContext, ReactElement, useEffect, useState } from "react";
import { Category, initCategory } from "./category-model";

type SystemCategories = {
    categories: Category[],
    setCategories: Function
};

const initSCategories = {
    categories: [initCategory],
    setCategories: () => { console.log('categories :' + initSCategories.categories) }
};

export const categoryContext = createContext<SystemCategories>(initSCategories);

const CategoriesProvider = ({ children }: { children: ReactElement }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const getAllCategories = () => {
        axios.get("http://localhost:8080/api/category").
            then(({ data }) => setCategories(data));
    };

    useEffect(() => getAllCategories(), []);

    return <categoryContext.Provider value={{ categories, setCategories }}>
        {children}
    </categoryContext.Provider>
}
export default CategoriesProvider;