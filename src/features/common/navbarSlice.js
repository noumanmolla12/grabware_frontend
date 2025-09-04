import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import headerService from "../../services/navbarService";

export const fetchNavbars = createAsyncThunk("headers/fetchAll", async () => {
  return await headerService.getAll();
});

export const addNavbar = createAsyncThunk("headers/add", async (data) => {
  return await headerService.add(data);
});

export const editNavbar = createAsyncThunk("headers/edit", async ({ id, data }) => {
  return await headerService.update(id, data);
});

export const deleteNavbar = createAsyncThunk("headers/delete", async (id) => {
  await headerService.remove(id);
  return id;
});

const headerSlice = createSlice({
  name: "navbars",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavbars.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addNavbar.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editNavbar.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNavbar.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default headerSlice.reducer;
