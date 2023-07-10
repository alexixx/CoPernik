import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TYPES

export type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count?: number;
  imageUrl: string;
};

// INTERFACES

interface CartSliceState {
  currentCoords: number[] | null;
  selectedCoords: number[] | null; // !
  finalCoords: number[] | null;
}

const initialState: CartSliceState = {
  currentCoords: null,
  selectedCoords: null,
  finalCoords: null,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setCurrentPoints(state, action: PayloadAction<number[] | null>) {
      state.currentCoords = action.payload;
    },
    setSelectedPoints(state, action: PayloadAction<number[] | null>) {
      state.selectedCoords = action.payload;
    },
    setFinalPoints(state, action: PayloadAction<number[] | null>) {
      state.finalCoords = action.payload;
    },
  },
});

export const { setCurrentPoints, setFinalPoints, setSelectedPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
