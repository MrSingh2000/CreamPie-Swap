import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokens';
import loadingSlice from './slices/loading';

export const store = configureStore({
  reducer: {
    tokens: tokenSlice,
    loading: loadingSlice,
  },
})