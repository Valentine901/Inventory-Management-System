import axios from "axios";

const BASE_URL = "http://localhost/phpcodes/inventory-management-system/backend/api";

export const API = axios.create({
    baseURL:BASE_URL,
    withCredentials: true
});

export const FILTERS = [
  { value: "all", label: "All", endpoint: "/staff/staffs.php" },
  { value: "active", label: "Active", endpoint: "/staff/active_staffs.php" },
  { value: "inactive", label: "Inactive", endpoint: "/staff/non_active_staffs.php" },
];