import axios from "axios";
import { createContext, ReactElement, useEffect, useState } from "react";
type Category = {
    Id: number,
    Name: string
};

type SystemCategories = {
    categories: Category[],
    setCategories: Function
};

const initCategory: Category = {
    Id: 1,
    Name: "פרווה"
};

const initSCategories = {
    categories: [initCategory],
    setCategories: () => { console.log('categories :' + initSCategories.categories) }
};

export const context = createContext<SystemCategories>(initSCategories);

const CategoriesProvider = ({ children }: { children: ReactElement }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const getAllCategories = () => {
        axios.get("http://localhost:8080/api/category").
            then(({ data }) => setCategories(data));
    };

    useEffect(() => getAllCategories(), []);

    return <context.Provider value={{ categories, setCategories }}>
        {children}
    </context.Provider>
}
export default CategoriesProvider;