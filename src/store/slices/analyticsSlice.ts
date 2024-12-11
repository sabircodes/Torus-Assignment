import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AnalyticsState } from '../../types';
import { mockUsers } from '../../data/mockData';

// Initial state with mock data for demonstration
const initialState: AnalyticsState = {
  metrics: {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(user => user.status === 'active').length,
    deletedUsers: 0,
  },
  filters: {
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
    },
    region: 'all',
  },
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // Update metrics when users are modified
    updateMetrics: (state, action: PayloadAction<typeof initialState.metrics>) => {
      state.metrics = action.payload;
    },
    // Increment deleted users counter
    incrementDeletedUsers: (state) => {
      state.metrics.deletedUsers += 1;
      state.metrics.totalUsers -= 1;
    },
    // Update date range filter
    setDateRange: (state, action) => {
      state.filters.dateRange = action.payload;
    },
    // Update region filter
    setRegion: (state, action) => {
      state.filters.region = action.payload;
    },
  },
});

export const { updateMetrics, incrementDeletedUsers, setDateRange, setRegion } = analyticsSlice.actions;
export default analyticsSlice.reducer;