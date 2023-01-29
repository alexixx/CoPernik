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
}

const initialState: FilterSliceState = {
  score: 0,
  level: 0,
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
  },
});

//filterSlice.actions == filterSlice.reducers
export const { addPoints, setNextLevel } = filterSlice.actions;

export default filterSlice.reducer;
