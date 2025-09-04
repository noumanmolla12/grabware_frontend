import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const API_BASE = 'http://localhost:5000/api/implinks';
const API_BASE = 'https://grabware-api.onrender.com/api/implinks';
//https://grabware.onrender.com/api/admin/all
export const addImportantLink = createAsyncThunk('implink/add', async (formData) => {
  const res = await axios.post(`${API_BASE}/add`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
});

export const getAllImportantLinks = createAsyncThunk('implink/getAll', async () => {
  const res = await axios.get(`${API_BASE}/all`);
  return res.data;
});

export const getImportantLinkById = createAsyncThunk('implink/getById', async (id) => {
  const res = await axios.get(`${API_BASE}/single/${id}`);
  return res.data;
});

export const updateImportantLink = createAsyncThunk('implink/update', async ({ id, formData }) => {
  const res = await axios.put(`${API_BASE}/edit/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
});

export const deleteImportantLink = createAsyncThunk('implink/delete', async (id) => {
  await axios.delete(`${API_BASE}/delete/${id}`);
  return id;
});

const implinkSlice = createSlice({
  name: 'implink',
  initialState: {
    links: [],
    selectedLink: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedLink: (state) => {
      state.selectedLink = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addImportantLink.fulfilled, (state, action) => {
        state.links.unshift(action.payload);
      })
      .addCase(getAllImportantLinks.fulfilled, (state, action) => {
        state.links = action.payload;
      })
      .addCase(getImportantLinkById.fulfilled, (state, action) => {
        state.selectedLink = action.payload;
      })
      .addCase(updateImportantLink.fulfilled, (state, action) => {
        const index = state.links.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) state.links[index] = action.payload;
      })
      .addCase(deleteImportantLink.fulfilled, (state, action) => {
        state.links = state.links.filter((l) => l._id !== action.payload);
      });
  },
});

export const { clearSelectedLink } = implinkSlice.actions;
export default implinkSlice.reducer;
