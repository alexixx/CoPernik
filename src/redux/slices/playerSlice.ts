import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TYEPS

// export type SortSlice = {
//   name: string;
//   sortType: 'rating' | 'title' | 'price';
//   // sortType: string,
//   sortDirection?: boolean;
// };

// INTERFACES

interface FilterSliceState {
  score: number;
  level: 0;
  polyline: number[][] | null;
}

const initialState: FilterSliceState = {
  score: 0,
  level: 0,
  polyline: null,
};

const filterSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addPoints(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    setNextLevel(state) {
      state.level++;
    },
    setPolyline(state, action) {
      state.polyline = action.payload;
    },
  },
});

//filterSlice.actions == filterSlice.reducers
export const { addPoints, setNextLevel, setPolyline } = filterSlice.actions;

export default filterSlice.reducer;
