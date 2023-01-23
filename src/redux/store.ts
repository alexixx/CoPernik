import { configureStore } from '@reduxjs/toolkit';
import player from './slices/playerSlice';
import points from './slices/pointsSlice';
import pizzas from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    points,
    player,
  },
});

export type RootState = ReturnType<typeof store.getState>;
