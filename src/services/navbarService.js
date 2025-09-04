import axios from "axios";

//const API_URL = "http://localhost:5000/api/navbar";
const API_URL = "https://grabware.onrender.com/navbar";

const getAll = async () => (await axios.get(`${API_URL}/all`)).data;
const add = async (data) => (await axios.post(`${API_URL}/add`, data)).data;
const update = async (id, data) => (await axios.put(`${API_URL}/edit/${id}`, data)).data;
const remove = async (id) => (await axios.delete(`${API_URL}/delete/${id}`)).data;

export default { getAll, add, update, remove };
