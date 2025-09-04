import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/members";

// 📌 Fetch all members
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📌 Add member (FormData: { name, image })
export const addMember = createAsyncThunk(
  "members/addMember",
  async (memberData, { rejectWithValue }) => {
    try {
      // 🚨 Don't set Content-Type manually, Axios handles FormData
      const res = await axios.post(`${API_URL}/add`, memberData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📌 Edit member (supports FormData OR JSON for inline edits)
export const editMember = createAsyncThunk(
  "members/editMember",
  async ({ id, memberData }, { rejectWithValue }) => {
    try {
      let config = {};
      let payload = memberData;

      // Only set headers if sending JSON, let Axios handle FormData
      if (!(memberData instanceof FormData)) {
        config.headers = { "Content-Type": "application/json" };
      }

      const res = await axios.put(`${API_URL}/edit/${id}`, payload, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📌 Delete member
export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id; // return deleted member id so we can update Redux state
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ADD
      .addCase(addMember.fulfilled, (state, action) => {
        state.members.unshift(action.payload); // add new member at top
      })
      .addCase(addMember.rejected, (state, action) => {
        state.error = action.payload;
      })

      // EDIT
      .addCase(editMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(
          (m) => m._id === action.payload._id
        );
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(editMember.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
