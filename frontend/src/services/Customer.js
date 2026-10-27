import { API } from "../constant/api";


export const createCustomer = async (full_name, phone, address) => {
    const res = await API.post("/customer/create.php", {full_name: full_name, phone: phone, address: address});
    return res.data;
}

export const updateCustomer = async (customer_id, full_name, phone, address) => {
    const res = await API.put(`/customer/update.php/?customer_id=${customer_id}`, {full_name: full_name, phone: phone, address: address});
    return res.data;
};

export const deleteCustomer = async (customer_id) => {
    const res = await API.delete(`/customer/delete.php?customer_id=${customer_id}`);
    return res.data;
};

export const getCustomers = async (currentPage, limit) => {
    const res = await API.get(`/customer/customers.php?page=${currentPage}&limit=${limit}`);
    return res.data;
}