import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  users: [{
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    status: 'active',
    region: 'North',
    registrationDate: new Date().toISOString(),
  }] as User[],
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface RegisterData extends Omit<User, 'id' | 'status' | 'registrationDate'> {
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    const user = auth.users.find(u => u.email === email);
    
    if (user) {
      return user;
    }
    throw new Error('Invalid credentials');
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    
    if (auth.users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: String(auth.users.length + 1),
      name: userData.name,
      email: userData.email,
      region: userData.region,
      status: 'active',
      registrationDate: new Date().toISOString(),
    };
    
    return newUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;