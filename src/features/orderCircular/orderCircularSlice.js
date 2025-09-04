import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const API_URL = "http://localhost:5000/api/ordercircular";
const API_URL = "https://grabware.onrender.com/api/ordercircular";
//https://grabware.onrender.com/api/admin/all
// Async thunks
export const fetchCirculars = createAsyncThunk("circulars/fetchAll", async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
});

export const addCircular = createAsyncThunk("circulars/add", async (circular) => {
  const res = await axios.post(`${API_URL}/add`, circular);
  return res.data;
});

export const updateCircular = createAsyncThunk("circulars/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/edit/${id}`, data);
  return res.data;
});

export const deleteCircular = createAsyncThunk("circulars/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const orderCircularSlice = createSlice({
  name: "orderCirculars",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCirculars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCirculars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCirculars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCircular.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateCircular.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteCircular.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export default orderCircularSlice.reducer;
