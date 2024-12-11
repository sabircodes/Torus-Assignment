import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { UserState, User } from '../../types';
import { mockUsers } from '../../data/mockData';
import { incrementDeletedUsers } from './analyticsSlice';

// Initial state for user management
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: '',
  activeTab: 'users',
};

// Async thunk to simulate API call for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockUsers;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Handle pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Handle search functionality
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    // Handle user deletion
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

// Thunk middleware to handle user deletion with analytics update
export const deleteUserWithAnalytics = (userId: string) => (dispatch: any) => {
  dispatch(deleteUser(userId));
  dispatch(incrementDeletedUsers());
};

export const { setCurrentPage, setSearchTerm, deleteUser, setActiveTab } =
  userSlice.actions;
export default userSlice.reducer;
