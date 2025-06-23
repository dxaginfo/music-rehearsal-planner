import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import bandReducer from './band/bandSlice';
import rehearsalReducer from './rehearsal/rehearsalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;