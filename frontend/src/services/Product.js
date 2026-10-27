import {API} from "../constant/api";

export const createProduct = async (name, price, quantity, category_id, supplier_id, images ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category_id", category_id);
    formData.append("supplier_id", supplier_id);
    images.forEach(file => {
        formData.append("images[]", file);
    });
    const res = await API.post("/product/create.php", formData);
    console.log(res.data.messages || res.data);
}


export const getProducts = async (currentPage, limit) => {
    const res = await API.get(`/product/products.php?page=${currentPage}&limit=${limit}`);
    return res.data;
}

export const getProduct = async (id) => {
    const res = await API.get(`/product/product.php?product_id=${id}`);
    return res.data.product;
}

export const deleteProduct = async (id) => {
    const res = await API.delete(`/product/delete.php?product_id=${id}`);
    return res.data;
}

export const updateProduct = async (id, name, price, quantity, category_id, supplier_id) => {
    const res = await API.put(`/product/update.php?product_id=${id}`, {name, price, quantity, category_id, supplier_id});
    return res.data
}