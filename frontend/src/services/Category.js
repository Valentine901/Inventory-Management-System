import { API } from "../constant/api";


export const create = async ({ name }) => {
    const res = await API.post("/category/create.php", {name: name});
    return res.data;
}

export const getCategories = async () => {
    const res = await API.get("/category/categories.php");
    return res.data.categories;
}

export const deleteCategory = async (id) => {
    const res = await API.delete(`/category/delete.php?category_id=${id}`);
    return res.data;
}

export const getCategory = async (id) => {
    const res = await API.get(`/category/category.php?category_id=${id}`);
    return res.data;
}