import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const API_URL = 'http://localhost:5000/api/headers';
const API_URL = 'https://grabware.onrender.com/api/headers';
//https://grabware.onrender.com/api/admin/all
// ✅ Fetch all headers
export const fetchHeaders = createAsyncThunk(
  'headers/fetchHeaders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add header (already FormData from frontend)
export const addHeader = createAsyncThunk(
  'headers/addHeader',
  async (headerData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/add`, headerData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Edit header (already FormData from frontend)
// export const editHeader = createAsyncThunk(
//   'headers/editHeader',
//   async ({ id, headerData }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${API_URL}/edit/${id}`, headerData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// ✅ Edit header (supports inline edit with JSON OR FormData)
export const editHeader = createAsyncThunk(
  'headers/editHeader',
  async ({ id, headerData }, { rejectWithValue }) => {
    try {
      let config = {};
      let payload = headerData;

      // If it's FormData (logo/file upload), keep multipart
      if (headerData instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
      } else {
        // Otherwise, send JSON for inline edits
        config.headers = { 'Content-Type': 'application/json' };
      }

      const res = await axios.put(`${API_URL}/edit/${id}`, payload, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);






// ✅ Delete header
export const deleteHeader = createAsyncThunk(
  'headers/deleteHeader',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const headerSlice = createSlice({
  name: 'headers',
  initialState: {
    headers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH HEADERS
      .addCase(fetchHeaders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeaders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.headers = action.payload;
      })
      .addCase(fetchHeaders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ADD HEADER
      .addCase(addHeader.fulfilled, (state, action) => {
        state.headers.push(action.payload);
      })
      .addCase(addHeader.rejected, (state, action) => {
        state.error = action.payload;
      })

      // EDIT HEADER
      .addCase(editHeader.fulfilled, (state, action) => {
        const index = state.headers.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          state.headers[index] = action.payload;
        }
      })
      .addCase(editHeader.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE HEADER
      .addCase(deleteHeader.fulfilled, (state, action) => {
        state.headers = state.headers.filter(h => h._id !== action.payload);
      })
      .addCase(deleteHeader.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default headerSlice.reducer;




