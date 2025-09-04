import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const API = "http://localhost:5000/api/notifications";
const API = "https://grabware.onrender.com/api/notifications";
//https://grabware.onrender.com/api/admin/all
// Fetch all
export const fetchNotifications = createAsyncThunk("notifications/fetch", async () => {
  const res = await axios.get(`${API}/view`);
  return res.data;
});

// Add notification
export const addNotification = createAsyncThunk("notifications/add", async (formData) => {
  const res = await axios.post(`${API}/add`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data;
});

// Edit notification
export const editNotification = createAsyncThunk("notifications/edit", async ({ id, formData }) => {
  const res = await axios.put(`${API}/edit/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data;
});

// Delete notification
export const deleteNotification = createAsyncThunk("notifications/delete", async (id) => {
  await axios.delete(`${API}/delete/${id}`);
  return id;
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchNotifications.rejected, (state) => { state.loading = false; })

      .addCase(addNotification.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(editNotification.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n._id !== action.payload);
      });
  }
});

export default notificationSlice.reducer;








