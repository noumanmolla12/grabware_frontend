import axios from 'axios';
import { ADMIN_API } from '../constants/apiRoutes';

export const registerAdmin = async (adminData) => {
  const response = await axios.post(ADMIN_API.ADD, adminData, { withCredentials: true });
  return response.data;
};





export const loginAdmin = async ({ username, password }) => {
  const response = await axios.post(
    ADMIN_API.LOGIN,
    { username, password },
    { withCredentials: true } // only needed if you're using cookies/session
  );
  return response.data;
};







export const changeAdminPassword = async ({ username, oldPassword, newPassword }) => {
  const res = await axios.put(ADMIN_API.CHANGE_PASSWORD, {
    username,
    oldPassword,
    newPassword,
  });
  return res.data;
};




export const getAllAdmins = async () => {
  const response = await axios.get(ADMIN_API.ALL);
  return response.data;
};

export const getAdminById = async (id) => {
  const response = await axios.get(ADMIN_API.SINGLE(id));
  return response.data;
};

export const updateAdmin = async (id, adminData) => {
  const response = await axios.put(ADMIN_API.EDIT(id), adminData);
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await axios.delete(ADMIN_API.DELETE(id));
  return response.data;
};
