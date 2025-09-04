import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const API_BASE = 'http://localhost:5000/api/events';
const API_BASE = 'https://grabware.onrender.com/api/events';
//https://grabware.onrender.com/api/admin/all
// Thunks

// CREATE
export const createEvent = createAsyncThunk('event/createEvent', async (formData) => {
  const res = await axios.post(`${API_BASE}/add`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
});

// GET ALL
export const getAllEvents = createAsyncThunk('event/getAllEvents', async () => {
  const res = await axios.get(`${API_BASE}/all`);
  return res.data;
});

// GET ONE BY ID
export const getEventById = createAsyncThunk('event/getEventById', async (id) => {
  const res = await axios.get(`${API_BASE}/edit/${id}`);
  return res.data;
});

// UPDATE
export const updateEvent = createAsyncThunk('event/updateEvent', async ({ id, formData }) => {
  const res = await axios.put(`${API_BASE}/edit/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
});

// DELETE
export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id) => {
  await axios.delete(`${API_BASE}/delete/${id}`);
  return id;
});

// Slice
const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    selectedEvent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.selectedEvent = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
