import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerAdmin,
  loginAdmin,
  changeAdminPassword,
  getAllAdmins,
  getAdminById,
  updateAdmin,
} from '@/services/adminAPI';

// THUNKS

export const registerAdminThunk = createAsyncThunk(
  'admin/registerAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      return await registerAdmin(adminData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginAdminThunk = createAsyncThunk(
  'admin/loginAdmin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await loginAdmin({ username, password });
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
  }
);

export const changeAdminPasswordThunk = createAsyncThunk(
  'admin/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      return await changeAdminPassword(passwordData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Password change failed');
    }
  }
);

export const fetchAdmins = createAsyncThunk('admin/fetchAdmins', async (_, thunkAPI) => {
  try {
    return await getAllAdmins();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch admins');
  }
});


export const fetchAdminById = createAsyncThunk(
  'admin/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAdminById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetch admin failed');
    }
  }
);


export const editAdmin = createAsyncThunk(
  'admin/edit',
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await updateAdmin(id, formData);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// SLICE

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    currentAdmin: null,
    status: 'idle',
    error: null,
    loading: false,
    success: false,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.currentAdmin = null;
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerAdminThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAdminThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentAdmin = action.payload;
      })
      .addCase(registerAdminThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginAdminThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const admin = action.payload.admin;
        state.currentAdmin = admin;
        localStorage.setItem('admin', JSON.stringify(admin));
      })
      .addCase(loginAdminThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // FETCH ADMINS
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })


      .addCase(fetchAdminById.pending, (state) => {
  state.status = 'loading';
})
.addCase(fetchAdminById.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.currentAdmin = action.payload;
})
.addCase(fetchAdminById.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
})

      // EDIT ADMIN
      .addCase(editAdmin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload.admin;
        state.admins = state.admins.map((a) =>
          a._id === updated._id ? updated : a
        );

        if (state.currentAdmin?._id === updated._id) {
          state.currentAdmin = updated;
          localStorage.setItem('admin', JSON.stringify(updated));
        }
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changeAdminPasswordThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changeAdminPasswordThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;




