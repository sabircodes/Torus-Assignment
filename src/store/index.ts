import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import analyticsReducer from './slices/analyticsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    analytics: analyticsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;