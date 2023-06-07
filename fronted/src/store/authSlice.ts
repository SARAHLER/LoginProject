  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';

  interface User {
    id: string;
    name: string;
    email: string;
  }
  interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }

  interface AuthRequest {
    email: string;
    password: string;
  }

  interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }

  const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  export const login = createAsyncThunk('http://localhost:5000/api/auth/login', async (data: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0].msg);
    }
  });

  export const register = createAsyncThunk('http://localhost:5000/api/auth/register', async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:5000/api/auth/register', data);
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0].msg);
    }
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('token');
        state.token = null;
        state.isAuthenticated = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })
        .addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    },
  });

  export const selectToken = (state: { auth: AuthState }) => state.auth.token;
  export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
  export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
  export const selectError = (state: { auth: AuthState }) => state.auth.error;

  export default authSlice.reducer;


