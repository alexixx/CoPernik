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
  selectedCoords: number[];
  finalCoords: number[] | null;
}

const initialState: CartSliceState = {
  currentCoords: null,
  selectedCoords: [0, 0],
  finalCoords: null,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setCurrentPoints(state, action: PayloadAction<number[]>) {
      state.currentCoords = action.payload;
    },
    setSelectedPoints(state, action: PayloadAction<number[]>) {
      state.selectedCoords = action.payload;
    },
    setFinalPoints(state, action: PayloadAction<number[]>) {
      state.finalCoords = action.payload;
    },
  },
});

//cartSlice.actions == cartSlice.reducers
export const { setCurrentPoints, setFinalPoints, setSelectedPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
