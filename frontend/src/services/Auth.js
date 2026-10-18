import { API } from "../constant/api";

export const login = async (identifier, password) => {
  const isAdmin = identifier.includes("@");
  const endpoint = isAdmin ? "/auth/admin_login.php" : "/auth/staff_login.php";
  const payload = isAdmin
    ? { email: identifier, password }
    : { member_id: identifier, password };

  const res = await API.post(endpoint, payload);
  return { role: isAdmin ? "admin" : "staff", data: res.data };
};