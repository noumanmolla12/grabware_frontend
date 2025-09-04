//export const BASE_URL = 'http://localhost:5000/api';
export const BASE_URL = 'https://grabware.onrender.com/api';
//https://grabware.onrender.com/api/admin/all


export const ADMIN_API = {
  BASE: `${BASE_URL}/admin`,
  ADD: `${BASE_URL}/admin/add/`,
  LOGIN: `${BASE_URL}/admin/login`,
  ALL: `${BASE_URL}/admin/all/`,
  SINGLE: (id) => `${BASE_URL}/admin/single/${id}`,
  EDIT: (id) => `${BASE_URL}/admin/edit/${id}`,
  DELETE: (id) => `${BASE_URL}/admin/delete/${id}`,
  CHANGE_PASSWORD: `${BASE_URL}/admin/change-password`, // ✅ Add this line
};
