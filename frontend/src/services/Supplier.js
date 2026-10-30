import {API} from "../constant/api";

export const createSupplier = async (username, company, email) => {
    const res = await API.post("/supplier/create.php", {username, company, email});
    return res.data;
}

export const updateSupplier = async (supplier_id, username, email, company) => {
    const res = await API.put(`/supplier/update.php?supplier_id=${supplier_id}`, {username, email, company});
    return res.data;
}

export const deleteSupplier = async (supplier_id) => {
    const res = await API.delete(`/supplier/delete.php?supplier_id=${supplier_id}`);
    return res.data;
}

export const getSupplier = async (supplier_id) => {
    const res = await API.get(`/supplier/supplier.php?supplier_id=${supplier_id}`);
    return res.data.supplier;
}

export const getSuppliers = async (page, limit) => {
    const res = await API.get(`/supplier/suppliers.php?page=${page}&limit=${limit}`);
    return res.data;
}

export const getProductSuppliersSelection = async () => {
    const res = await API.get("/supplier/product_suppliers_selection.php");
    return res.data;
}