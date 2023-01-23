import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import points from './slices/pointsSlice';
import pizzas from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    points,
  },
});

export type RootState = ReturnType<typeof store.getState>;
