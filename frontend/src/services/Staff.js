import { API } from "../constant/api";

export const getStaffs = async (limit, page, endpoint) => {
  const res = await API.get(`${endpoint}?page=${page}&limit=${limit}`);
  return {
    staffs: res.data.data ?? [],
    totalItems: res.data.totalStaffs ?? 0,
  };
};

export const createStaff = async ({ username, email, memberId, password }) => {
  await API.post("/auth/staff_register.php", {
    username,
    email,
    member_id: memberId,
    password,
  });

};

export const deleteStaff = async (memberId) => {
  const res = await API.delete(`/staff/delete_staff.php?member_id=${memberId}`);
  return res.data;
}


export const updateStaff = async ({ username, email, memberId, role }) => {
  const res = await API.put("/staff/update_staff.php", {username:username, email:email, member_id: memberId, role:role});
  return res.data;
}


export const getStaff = async (memberId) => {
  const res = await API.get(`/staff/staff.php?member_id=${memberId}`);
  return res.data;
}