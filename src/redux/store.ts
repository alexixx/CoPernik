import { configureStore } from '@reduxjs/toolkit';
import player from './slices/playerSlice';
import points from './slices/pointsSlice';
import cities from './slices/citiesSlice';

export const store = configureStore({
  reducer: {
    points,
    player,
    cities,
  },
});

export type RootState = ReturnType<typeof store.getState>;
